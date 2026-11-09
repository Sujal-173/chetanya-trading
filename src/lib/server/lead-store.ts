import "server-only";
import { randomBytes } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { google, type sheets_v4 } from "googleapis";
import { Redis } from "@upstash/redis";
import { siteConfig } from "@/config/site";
import { getSheetsEnv, getUpstashEnv, type SheetsEnv } from "./env";
import { neutraliseFormula, safeErrorMessage } from "./sanitize";

export const SHEET_HEADERS = [
  "Lead ID",
  "Submission Date",
  "Full Name",
  "Email",
  "Phone",
  "Area of Interest",
  "Message",
  "Page Source",
  "Campaign Source",
  "Lead Status",
  "Consent to Contact",
] as const;

const LAST_COLUMN = "K";
const FALLBACK_QUEUE_KEY = "chaitanya:leads:unsynced";

export type LeadRecord = {
  leadId: string;
  submittedAt: string;
  fullName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  page: string;
  campaign: string;
  status: string;
  consent: boolean;
};

export type StoreOutcome =
  | { stored: true; destination: "google-sheets" | "redis-fallback" | "file-fallback" }
  | { stored: false };

export function createLeadId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `CTC-${date}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

/** ISO 8601 timestamp in India Standard Time, e.g. 2026-11-08T14:32:10+05:30 */
export function istTimestamp(now = new Date()): string {
  return new Date(now.getTime() + 330 * 60_000)
    .toISOString()
    .replace(/\.\d{3}Z$/, "+05:30");
}

function toRow(lead: LeadRecord): string[] {
  return [
    lead.leadId,
    lead.submittedAt,
    neutraliseFormula(lead.fullName),
    neutraliseFormula(lead.email),
    lead.phone, // validated to digits and + ( ) - . only
    neutraliseFormula(lead.interest),
    neutraliseFormula(lead.message),
    neutraliseFormula(lead.page),
    neutraliseFormula(lead.campaign),
    lead.status,
    lead.consent ? "Yes" : "No",
  ];
}

const quote = (tab: string) => `'${tab.replace(/'/g, "''")}'`;

// Setup checks (tab exists, header row present) run once per server instance.
let setupDone = false;

async function ensureSheetReady(sheets: sheets_v4.Sheets, env: SheetsEnv) {
  if (setupDone) return;

  const meta = await sheets.spreadsheets.get({
    spreadsheetId: env.spreadsheetId,
    fields: "sheets.properties.title",
  });
  const titles = meta.data.sheets?.map((sheet) => sheet.properties?.title) ?? [];
  if (!titles.includes(env.tabName)) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: env.spreadsheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: env.tabName } } }] },
    });
  }

  const header = await sheets.spreadsheets.values.get({
    spreadsheetId: env.spreadsheetId,
    range: `${quote(env.tabName)}!A1:${LAST_COLUMN}1`,
  });
  if (!header.data.values?.[0]?.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: env.spreadsheetId,
      range: `${quote(env.tabName)}!A1:${LAST_COLUMN}1`,
      valueInputOption: "RAW",
      requestBody: { values: [[...SHEET_HEADERS]] },
    });
  }
  setupDone = true;
}

const isTransient = (error: unknown) => {
  const code = (error as { code?: number | string }).code;
  return code === undefined || code === 429 || (typeof code === "number" && code >= 500) || code === "ECONNRESET" || code === "ETIMEDOUT";
};

async function appendToSheet(lead: LeadRecord, env: SheetsEnv) {
  const auth = new google.auth.JWT({
    email: env.clientEmail,
    key: env.privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      await ensureSheetReady(sheets, env);
      await sheets.spreadsheets.values.append({
        spreadsheetId: env.spreadsheetId,
        range: `${quote(env.tabName)}!A:${LAST_COLUMN}`,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values: [toRow(lead)] },
      });
      return;
    } catch (error) {
      lastError = error;
      if (!isTransient(error)) break;
      await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
    }
  }
  throw lastError;
}

async function pushToRedisQueue(lead: LeadRecord) {
  const env = getUpstashEnv();
  if (!env) throw new Error("Redis fallback not configured");
  await new Redis(env).lpush(FALLBACK_QUEUE_KEY, JSON.stringify(lead));
}

const isServerless = () =>
  Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY);

async function writeFallbackFile(lead: LeadRecord) {
  // Only meaningful on a long-running server with a persistent disk.
  if (isServerless()) throw new Error("No persistent disk on serverless platforms");
  const directory = path.join(process.cwd(), ".data");
  await mkdir(directory, { recursive: true });
  await appendFile(path.join(directory, "leads-fallback.jsonl"), `${JSON.stringify(lead)}\n`, {
    mode: 0o600,
  });
}

/**
 * Store an enquiry durably. Tries Google Sheets first (with retries), then a
 * persistent fallback. Returns `stored: false` only when every destination
 * failed, so the caller can tell the visitor honestly that nothing was saved.
 */
export async function storeLead(lead: LeadRecord): Promise<StoreOutcome> {
  const sheetsEnv = getSheetsEnv();
  if (sheetsEnv) {
    try {
      await appendToSheet(lead, sheetsEnv);
      return { stored: true, destination: "google-sheets" };
    } catch (error) {
      console.error(`[leads] ${lead.leadId} sheet write failed: ${safeErrorMessage(error)}`);
    }
  } else {
    console.error(`[leads] ${lead.leadId} Google Sheets is not configured.`);
  }

  try {
    await pushToRedisQueue(lead);
    console.warn(`[leads] ${lead.leadId} saved to Redis fallback queue ${FALLBACK_QUEUE_KEY}.`);
    return { stored: true, destination: "redis-fallback" };
  } catch (error) {
    console.error(`[leads] ${lead.leadId} redis fallback failed: ${safeErrorMessage(error)}`);
  }

  try {
    await writeFallbackFile(lead);
    console.warn(`[leads] ${lead.leadId} saved to local fallback file.`);
    return { stored: true, destination: "file-fallback" };
  } catch (error) {
    console.error(`[leads] ${lead.leadId} file fallback failed: ${safeErrorMessage(error)}`);
  }

  return { stored: false };
}

export const initialLeadStatus = siteConfig.leadStatus.initial;
