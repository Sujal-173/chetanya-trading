import "server-only";
import { z } from "zod";

/**
 * Server-side environment validation. Nothing here is ever sent to the
 * browser. Values are validated lazily so a missing optional integration does
 * not break the build; the lead API reports a clear failure instead.
 */

const sheetsSchema = z.object({
  spreadsheetId: z.string().min(10, "GOOGLE_SHEETS_SPREADSHEET_ID looks too short"),
  tabName: z.string().min(1).default("Lead Enquiries"),
  clientEmail: z.email("GOOGLE_SERVICE_ACCOUNT_EMAIL must be an email address"),
  privateKey: z
    .string()
    .refine((key) => key.includes("BEGIN PRIVATE KEY"), "GOOGLE_PRIVATE_KEY is not a PEM private key"),
});

export type SheetsEnv = z.infer<typeof sheetsSchema>;

const normaliseKey = (raw: string) =>
  raw
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/\\n/g, "\n");

export function getSheetsEnv(): SheetsEnv | null {
  const parsed = sheetsSchema.safeParse({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim() ?? "",
    tabName: process.env.GOOGLE_SHEETS_TAB_NAME?.trim() || undefined,
    clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() ?? "",
    privateKey: normaliseKey(process.env.GOOGLE_PRIVATE_KEY ?? ""),
  });
  return parsed.success ? parsed.data : null;
}

export function getUpstashEnv(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  return url && token ? { url, token } : null;
}

export function getTurnstileSecret(): string | null {
  return process.env.TURNSTILE_SECRET_KEY?.trim() || null;
}

/** Human-readable list of configuration gaps, used for start-up warnings. */
export function describeConfigurationGaps(): string[] {
  const gaps: string[] = [];
  if (!process.env.NEXT_PUBLIC_SITE_URL?.trim() && !process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    gaps.push("NEXT_PUBLIC_SITE_URL is not set; canonical URLs and the sitemap will use localhost.");
  }
  if (!getSheetsEnv()) {
    gaps.push("Google Sheets credentials are missing or invalid; enquiries cannot be saved to the sheet.");
  }
  if (!getUpstashEnv()) {
    gaps.push("Upstash Redis is not configured; rate limiting, duplicate detection and the durable fallback queue are per-instance only.");
  }
  return gaps;
}
