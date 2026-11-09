import { interestOptions } from "@/content/services";

/**
 * Validation shared by the browser form and the API route, so both enforce
 * exactly the same rules. The server never trusts the browser result.
 */

export type LeadFields = {
  fullName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  consent: boolean;
};

export type LeadErrors = Partial<Record<keyof LeadFields, string>>;

export const LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMax: 254,
  phoneDigitsMin: 7,
  phoneDigitsMax: 15,
  messageMax: 2000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARS = /^\+?[\d\s().-]+$/;

export function validateLead(fields: LeadFields): LeadErrors {
  const errors: LeadErrors = {};

  const name = fields.fullName.trim();
  if (name.length < LIMITS.nameMin || !/\p{L}/u.test(name)) {
    errors.fullName = "Enter your full name.";
  } else if (name.length > LIMITS.nameMax) {
    errors.fullName = `Keep your name under ${LIMITS.nameMax} characters.`;
  }

  const email = fields.email.trim();
  if (!EMAIL_PATTERN.test(email) || email.length > LIMITS.emailMax) {
    errors.email = "Enter a valid email address, such as name@example.com.";
  }

  const phone = fields.phone.trim();
  const digits = phone.replace(/\D/g, "");
  if (
    !PHONE_CHARS.test(phone) ||
    digits.length < LIMITS.phoneDigitsMin ||
    digits.length > LIMITS.phoneDigitsMax
  ) {
    errors.phone = "Enter a valid phone number, including the country code if outside India.";
  }

  if (!(interestOptions as readonly string[]).includes(fields.interest)) {
    errors.interest = "Choose an area of interest from the list.";
  }

  if (fields.message.trim().length > LIMITS.messageMax) {
    errors.message = `Keep your message under ${LIMITS.messageMax.toLocaleString("en-IN")} characters.`;
  }

  if (!fields.consent) {
    errors.consent = "Please confirm that we may contact you about this enquiry.";
  }

  return errors;
}

/** Narrow an unknown JSON body into typed fields without trusting its shape. */
export function readLeadFields(body: unknown): LeadFields {
  const source = (typeof body === "object" && body !== null ? body : {}) as Record<
    string,
    unknown
  >;
  const text = (key: string) =>
    typeof source[key] === "string" ? (source[key] as string) : "";
  return {
    fullName: text("fullName"),
    email: text("email"),
    phone: text("phone"),
    interest: text("interest"),
    message: text("message"),
    consent: source.consent === true,
  };
}
