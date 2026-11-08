import { google } from "googleapis";
import type { LeadFormValues } from "@/lib/lead-schema";

function getA1Range(tabName: string) {
  const escaped = tabName.replace(/'/g, "''");
  return `'${escaped}'!A:I`;
}

export async function appendLeadToGoogleSheet(
  lead: LeadFormValues,
  metadata: { page: string; source: string },
) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();
  const tabName = process.env.GOOGLE_SHEETS_TAB_NAME?.trim() || "Lead Enquiries";
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n").trim();

  if (!spreadsheetId || !clientEmail || !privateKey) {
    throw new Error("Google Sheets credentials are not configured.");
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const createdAt = new Date().toISOString();
  const values = [
    createdAt,
    lead.fullName,
    lead.email,
    lead.phone,
    lead.interest,
    lead.message,
    metadata.page,
    metadata.source,
    lead.consent ? "Yes" : "No",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: getA1Range(tabName),
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [values] },
  });
}
