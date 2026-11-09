"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";
import { interestOptions } from "@/content/services";
import { LIMITS, validateLead, type LeadErrors, type LeadFields } from "@/lib/lead-validation";
import { readCampaign } from "@/lib/campaign";
import { Turnstile } from "./turnstile";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  /** Where the form lives, stored with the lead (for example "contact_page"). */
  source: string;
  variant?: "page" | "modal";
  /** Called when the visitor closes the confirmation inside the popup. */
  onFinished?: () => void;
};

const EMPTY: LeadFields = {
  fullName: "",
  email: "",
  phone: "",
  interest: "",
  message: "",
  consent: false,
};

const FIELD_ORDER: Array<keyof LeadFields> = [
  "fullName",
  "email",
  "phone",
  "interest",
  "message",
  "consent",
];

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "";

export function LeadForm({ source, variant = "page", onFinished }: Props) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(0);

  const [values, setValues] = useState<LeadFields>(EMPTY);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof LeadFields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [leadId, setLeadId] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const fieldId = (name: keyof LeadFields) => `${uid}-${name}`;
  const errorId = (name: keyof LeadFields) => `${uid}-${name}-error`;

  const update = <K extends keyof LeadFields>(name: K, value: LeadFields[K]) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setErrors((current) => ({ ...current, [name]: validateLead(next)[name] }));
  };

  const blur = (name: keyof LeadFields) => {
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({ ...current, [name]: validateLead(values)[name] }));
  };

  const handleToken = useCallback((token: string) => setTurnstileToken(token), []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const found = validateLead(values);
    setTouched({ fullName: true, email: true, phone: true, interest: true, message: true, consent: true });
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((name) => found[name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(firstInvalid))}`)?.focus();
      return;
    }
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setStatus("error");
      setServerMessage("Please complete the security check before sending.");
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          companyWebsite: honeypot,
          startedAt: startedAt.current,
          page: window.location.pathname,
          campaign: readCampaign(),
          source,
          turnstileToken,
        }),
      });
      const payload = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
        leadId?: string;
        errors?: LeadErrors;
      } | null;

      if (response.ok && payload?.success) {
        setLeadId(payload.leadId ?? "");
        setServerMessage(payload.message ?? "Thank you. Your enquiry has been received.");
        setStatus("success");
        setValues(EMPTY);
        setTouched({});
        setErrors({});
        return;
      }

      if (payload?.errors) setErrors(payload.errors);
      setServerMessage(payload?.message ?? "We could not send your enquiry. Please try again.");
      setStatus("error");
    } catch {
      setServerMessage("We could not reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status" ref={successRef} tabIndex={-1}>
        <CheckCircle2 size={28} aria-hidden="true" className="form-success__icon" />
        <h3 className="form-success__title">Enquiry received</h3>
        <p>{serverMessage}</p>
        {leadId ? (
          <p className="form-success__ref">
            Reference: <strong>{leadId}</strong>
          </p>
        ) : null}
        <p className="form-success__next">We will reply using the email address or phone number you gave us.</p>
        <div className="form-success__actions">
          {variant === "modal" && onFinished ? (
            <button type="button" className="btn btn--primary" onClick={onFinished}>
              Close
            </button>
          ) : (
            <button type="button" className="btn btn--secondary" onClick={() => setStatus("idle")}>
              Send another enquiry
            </button>
          )}
        </div>
      </div>
    );
  }

  const describe = (name: keyof LeadFields) => (errors[name] ? errorId(name) : undefined);

  return (
    <form ref={formRef} className={`form form--${variant}`} onSubmit={onSubmit} noValidate>
      <div className="form__grid">
        <div className="field">
          <label htmlFor={fieldId("fullName")}>Full name</label>
          <input
            id={fieldId("fullName")}
            name="fullName"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.nameMax + 20}
            value={values.fullName}
            onChange={(event) => update("fullName", event.target.value)}
            onBlur={() => blur("fullName")}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={describe("fullName")}
            required
          />
          {errors.fullName ? <p id={errorId("fullName")} className="field__error">{errors.fullName}</p> : null}
        </div>

        <div className="field">
          <label htmlFor={fieldId("email")}>Email address</label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describe("email")}
            required
          />
          {errors.email ? <p id={errorId("email")} className="field__error">{errors.email}</p> : null}
        </div>

        <div className="field">
          <label htmlFor={fieldId("phone")}>Phone number</label>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            onBlur={() => blur("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describe("phone")}
            required
          />
          {errors.phone ? <p id={errorId("phone")} className="field__error">{errors.phone}</p> : null}
        </div>

        <div className="field">
          <label htmlFor={fieldId("interest")}>Area of interest</label>
          <select
            id={fieldId("interest")}
            name="interest"
            value={values.interest}
            onChange={(event) => update("interest", event.target.value)}
            onBlur={() => blur("interest")}
            aria-invalid={Boolean(errors.interest)}
            aria-describedby={describe("interest")}
            required
          >
            <option value="" disabled>
              Select one
            </option>
            {interestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.interest ? <p id={errorId("interest")} className="field__error">{errors.interest}</p> : null}
        </div>

        <div className="field field--wide">
          <label htmlFor={fieldId("message")}>
            Message <span className="field__optional">(optional)</span>
          </label>
          <textarea
            id={fieldId("message")}
            name="message"
            rows={variant === "modal" ? 3 : 4}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            onBlur={() => blur("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describe("message")}
          />
          {errors.message ? <p id={errorId("message")} className="field__error">{errors.message}</p> : null}
        </div>
      </div>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div className="form__trap" aria-hidden="true">
        <label htmlFor={`${uid}-company`}>Company website</label>
        <input
          id={`${uid}-company`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="field field--check">
        <input
          id={fieldId("consent")}
          name="consent"
          type="checkbox"
          checked={values.consent}
          onChange={(event) => update("consent", event.target.checked)}
          onBlur={() => blur("consent")}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={describe("consent")}
        />
        <label htmlFor={fieldId("consent")}>
          I agree that CHAITANYA Trading Consultancy may contact me about this enquiry, as described in
          the <Link href="/privacy-policy">privacy policy</Link>.
        </label>
      </div>
      {errors.consent ? <p id={errorId("consent")} className="field__error">{errors.consent}</p> : null}

      {TURNSTILE_SITE_KEY ? <Turnstile siteKey={TURNSTILE_SITE_KEY} onToken={handleToken} /> : null}

      {status === "error" && serverMessage ? (
        <div className="form__alert" role="alert">
          <AlertCircle size={18} aria-hidden="true" />
          <p>{serverMessage}</p>
        </div>
      ) : null}

      <button type="submit" className="btn btn--primary form__submit" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <LoaderCircle size={18} className="spin" aria-hidden="true" /> Sending
          </>
        ) : (
          "Send enquiry"
        )}
      </button>
      <p className="form__note" aria-live="polite">
        {status === "submitting" ? "Sending your enquiry." : "We use your details only to respond to this enquiry."}
      </p>
    </form>
  );
}
