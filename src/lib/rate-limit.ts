import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let upstashLimiter: Ratelimit | null = null;
const localHits = new Map<string, { count: number; resetAt: number }>();

function getUpstashLimiter() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  if (!upstashLimiter) {
    upstashLimiter = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      analytics: false,
      prefix: "chaitanya:lead-form",
    });
  }
  return upstashLimiter;
}

export async function checkLeadRateLimit(identifier: string) {
  const limiter = getUpstashLimiter();
  if (limiter) {
    const result = await limiter.limit(identifier);
    return { allowed: result.success, remaining: result.remaining };
  }

  // Production must use a shared limiter; process memory is not shared across instances.
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Configure Upstash Redis rate limiting before enabling production lead capture.",
    );
  }

  // Local fallback keeps the form testable during development.
  const now = Date.now();
  const current = localHits.get(identifier);
  if (!current || current.resetAt <= now) {
    localHits.set(identifier, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return { allowed: true, remaining: 4 };
  }
  if (current.count >= 5) return { allowed: false, remaining: 0 };
  current.count += 1;
  return { allowed: true, remaining: Math.max(0, 5 - current.count) };
}
