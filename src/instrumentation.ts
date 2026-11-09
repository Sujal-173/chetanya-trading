export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs" || process.env.NODE_ENV !== "production") return;
  const { describeConfigurationGaps } = await import("@/lib/server/env");
  for (const gap of describeConfigurationGaps()) console.warn(`[config] ${gap}`);
}
