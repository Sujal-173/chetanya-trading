import "server-only";
import { getTurnstileSecret } from "./env";

export const isTurnstileEnabled = () => getTurnstileSecret() !== null;

export async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = getTurnstileSecret();
  if (!secret) return true; // Not configured: the honeypot and timing checks still apply.
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip !== "unknown") body.set("remoteip", ip);
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(5000),
    });
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}
