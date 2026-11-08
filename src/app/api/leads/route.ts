import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";
import { appendLeadToGoogleSheet } from "@/lib/google-sheets";
import { checkLeadRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json({ success: false, message: "Unsupported request format." }, { status: 415 });
  }

  const origin = request.headers.get("origin");
  const requestHost = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (origin && requestHost) {
    try {
      if (new URL(origin).host !== requestHost) {
        return NextResponse.json({ success: false, message: "This request could not be verified." }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ success: false, message: "Invalid request origin." }, { status: 403 });
    }
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 12_000) {
      return NextResponse.json({ success: false, message: "Your message is too long." }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ success: false, message: "Please check the form and try again." }, { status: 400 });
  }

  if (body && typeof body === "object" && "companyWebsite" in body && String(body.companyWebsite ?? "").length > 0) {
    // Quietly accept bot submissions without storing them.
    return NextResponse.json({ success: true, message: "Enquiry received." }, { status: 201 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, message: "Some details are missing or invalid. Please review the form." }, { status: 400 });
  }

  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  try {
    const limit = await checkLeadRateLimit(ip);
    if (!limit.allowed) {
      return NextResponse.json({ success: false, message: "Too many enquiries were sent from this connection. Please try again later." }, { status: 429 });
    }
  } catch (error) {
    console.error("Lead rate-limit check failed:", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ success: false, message: "The enquiry service is temporarily unavailable. Please try again shortly." }, { status: 503 });
  }

  const record = body as Record<string, unknown>;
  const page = typeof record.page === "string" ? record.page.slice(0, 120) : "/";
  const source = typeof record.source === "string" ? record.source.slice(0, 80) : "website_form";

  try {
    await appendLeadToGoogleSheet(parsed.data, { page, source });
    return NextResponse.json({ success: true, message: "Your enquiry has been submitted." }, { status: 201 });
  } catch (error) {
    console.error("Lead storage failed:", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json(
      { success: false, message: "We could not save your enquiry right now. Please try again shortly." },
      { status: 503 },
    );
  }
}
