import { NextResponse, type NextRequest } from "next/server";
import { LIMITS, readLeadFields, validateLead } from "@/lib/lead-validation";
import { cleanText } from "@/lib/server/sanitize";
import { checkLeadRateLimit } from "@/lib/server/rate-limit";
import { fingerprint, isDuplicate, rememberLead } from "@/lib/server/dedupe";
import { verifyTurnstile } from "@/lib/server/turnstile";
import {
  createLeadId,
  initialLeadStatus,
  istTimestamp,
  storeLead,
  type LeadRecord,
} from "@/lib/server/lead-store";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 12_000;
const MIN_FILL_MS = 1500;

type ApiBody =
  | { success: true; message: string; leadId?: string }
  | { success: false; message: string; errors?: Record<string, string> };

const reply = (body: ApiBody, status: number, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return request.headers.get("sec-fetch-site") !== "cross-site";
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return reply({ success: false, message: "Unsupported request format." }, 415);
  }
  if (!isSameOrigin(request)) {
    return reply({ success: false, message: "This request could not be verified." }, 403);
  }

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return reply({ success: false, message: "Your message is too long to send." }, 413);
    }
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw new Error("shape");
    body = parsed as Record<string, unknown>;
  } catch {
    return reply({ success: false, message: "The form could not be read. Please reload the page and try again." }, 400);
  }

  // Bot traps. A filled honeypot gets a neutral success and nothing is stored.
  if (typeof body.companyWebsite === "string" && body.companyWebsite.length > 0) {
    return reply({ success: true, message: "Thank you. Your enquiry has been received." }, 201);
  }
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
  if (!startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return reply({ success: false, message: "That was sent a little too quickly. Please check the form and send it again." }, 400);
  }

  const fields = readLeadFields(body);
  const errors = validateLead(fields);
  if (Object.keys(errors).length > 0) {
    return reply({ success: false, message: "Some details need attention. Please review the form.", errors }, 400);
  }

  const ip = getClientIp(request);
  const turnstileToken = typeof body.turnstileToken === "string" ? body.turnstileToken : undefined;
  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return reply({ success: false, message: "We could not confirm that you are not a bot. Please try again." }, 400);
  }

  const limit = await checkLeadRateLimit(ip);
  if (!limit.allowed) {
    return reply(
      { success: false, message: "Too many enquiries were sent from this connection. Please try again in a few minutes." },
      429,
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  const leadId = createLeadId();
  const record: LeadRecord = {
    leadId,
    submittedAt: istTimestamp(),
    fullName: cleanText(fields.fullName, LIMITS.nameMax),
    email: cleanText(fields.email, LIMITS.emailMax).toLowerCase(),
    phone: cleanText(fields.phone, 24),
    interest: cleanText(fields.interest, 80),
    message: cleanText(fields.message, LIMITS.messageMax, true),
    page: cleanText(typeof body.page === "string" ? body.page : "/", 160),
    campaign: cleanText(typeof body.campaign === "string" ? body.campaign : "", 200) || "Direct",
    status: initialLeadStatus,
    consent: fields.consent,
  };

  const key = fingerprint(record.email, record.interest, record.message);
  if (await isDuplicate(key)) {
    return reply({ success: true, message: "We already have this enquiry and will be in touch." }, 200);
  }

  const outcome = await storeLead(record);
  if (!outcome.stored) {
    const contact = siteConfig.contact.email ? ` You can also write to ${siteConfig.contact.email}.` : "";
    return reply(
      { success: false, message: `We could not save your enquiry. Please try again in a few minutes.${contact}` },
      503,
    );
  }

  await rememberLead(key, leadId);
  return reply({ success: true, message: "Thank you. Your enquiry has been received.", leadId }, 201);
}
