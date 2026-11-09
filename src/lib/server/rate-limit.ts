import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getUpstashEnv } from "./env";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

let limiter: Ratelimit | null = null;
let warned = false;
const memory = new Map<string, { count: number; resetAt: number }>();

function getLimiter(): Ratelimit | null {
  const env = getUpstashEnv();
  if (!env) return null;
  limiter ??= new Ratelimit({
    redis: new Redis(env),
    limiter: Ratelimit.slidingWindow(MAX_REQUESTS, "10 m"),
    analytics: false,
    prefix: "chaitanya:lead-form",
  });
  return limiter;
}

export type RateLimitResult = { allowed: boolean; retryAfterSeconds: number };

/**
 * Shared Redis limiter when Upstash is configured; otherwise a per-instance
 * in-memory limiter. The fallback is weaker on serverless platforms, but it is
 * far better than rejecting every enquiry, so it logs one warning and carries on.
 */
export async function checkLeadRateLimit(identifier: string): Promise<RateLimitResult> {
  const shared = getLimiter();
  if (shared) {
    try {
      const result = await shared.limit(identifier);
      return {
        allowed: result.success,
        retryAfterSeconds: Math.max(1, Math.ceil((result.reset - Date.now()) / 1000)),
      };
    } catch {
      // Redis outage: degrade to the local limiter rather than blocking leads.
    }
  } else if (!warned && process.env.NODE_ENV === "production") {
    warned = true;
    console.warn("[leads] Upstash Redis is not configured; using per-instance rate limiting.");
  }

  const now = Date.now();
  if (memory.size > 5000) {
    for (const [key, entry] of memory) if (entry.resetAt <= now) memory.delete(key);
  }
  const entry = memory.get(identifier);
  if (!entry || entry.resetAt <= now) {
    memory.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  entry.count += 1;
  return {
    allowed: entry.count <= MAX_REQUESTS,
    retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
  };
}
