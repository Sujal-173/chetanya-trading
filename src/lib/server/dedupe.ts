import "server-only";
import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";
import { getUpstashEnv } from "./env";

const TTL_SECONDS = 24 * 60 * 60;
const memory = new Map<string, number>();
let redis: Redis | null = null;

function client(): Redis | null {
  const env = getUpstashEnv();
  if (!env) return null;
  redis ??= new Redis(env);
  return redis;
}

export function fingerprint(email: string, interest: string, message: string): string {
  const normalised = [email.toLowerCase(), interest, message.toLowerCase().replace(/\s+/g, " ")].join("|");
  return `chaitanya:lead-dedupe:${createHash("sha256").update(normalised).digest("hex")}`;
}

/** Returns true when an identical enquiry was already stored in the last 24 hours. */
export async function isDuplicate(key: string): Promise<boolean> {
  const shared = client();
  if (shared) {
    try {
      return (await shared.get(key)) !== null;
    } catch {
      // fall through to the local map
    }
  }
  const expiresAt = memory.get(key);
  if (expiresAt && expiresAt > Date.now()) return true;
  memory.delete(key);
  return false;
}

/** Call only after an enquiry has been stored, so a failed attempt can be retried. */
export async function rememberLead(key: string, leadId: string): Promise<void> {
  memory.set(key, Date.now() + TTL_SECONDS * 1000);
  const shared = client();
  if (!shared) return;
  try {
    await shared.set(key, leadId, { ex: TTL_SECONDS });
  } catch {
    // The local entry still protects this instance.
  }
}
