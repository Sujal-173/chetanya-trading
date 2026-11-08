"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  UserRound,
} from "lucide-react";
import {
  interestOptions,
  leadSchema,
  type LeadFormValues,
} from "@/lib/lead-schema";

export function LeadForm({
  source = "contact_page",
  onSuccess,
  compact = false,
}: {
  source?: string;
  onSuccess?: () => void;
  compact?: boolean;
}) {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      interest: "General Enquiry",
      message: "",
      consent: false,
      companyWebsite: "",
    },
  });

  async function submitLead(values: LeadFormValues) {
    setServerError("");
    setSuccess(false);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          page: window.location.pathname,
          source,
        }),
      });
      const payload = (await response.json()) as {
        success?: boolean;
        message?: string;
      };
      if (!response.ok || !payload.success) {
        throw new Error(
          payload.message ||
            "We could not submit your enquiry. Please try again.",
        );
      }
      setSuccess(true);
      reset();
      onSuccess?.();
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  if (success) {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <span className="form-success__icon">
          <CheckCircle2 size={28} aria-hidden="true" />
        </span>
        <h3>Enquiry received</h3>
        <p>
          Thank you for contacting chaitanya Trading Consultancy. Your details
          have been submitted successfully.
        </p>
        <button
          className="text-button"
          type="button"
          onClick={() => setSuccess(false)}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      className={`lead-form${compact ? " lead-form--compact" : ""}`}
      onSubmit={handleSubmit(submitLead)}
      noValidate
    >
      <div className="form-field">
        <label htmlFor={`fullName-${source}`}>
          Full Name <span aria-hidden="true">*</span>
        </label>
        <div className="form-input-wrap">
          <UserRound size={17} aria-hidden="true" />
          <input
            id={`fullName-${source}`}
            autoComplete="name"
            placeholder="Your full name"
            {...register("fullName")}
            aria-invalid={Boolean(errors.fullName)}
          />
        </div>
        {errors.fullName ? (
          <small className="field-error">{errors.fullName.message}</small>
        ) : null}
      </div>
      <div className="form-grid-two">
        <div className="form-field">
          <label htmlFor={`email-${source}`}>
            Email Address <span aria-hidden="true">*</span>
          </label>
          <div className="form-input-wrap">
            <Mail size={17} aria-hidden="true" />
            <input
              id={`email-${source}`}
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              {...register("email")}
              aria-invalid={Boolean(errors.email)}
            />
          </div>
          {errors.email ? (
            <small className="field-error">{errors.email.message}</small>
          ) : null}
        </div>
        <div className="form-field">
          <label htmlFor={`phone-${source}`}>
            Phone Number <span aria-hidden="true">*</span>
          </label>
          <div className="form-input-wrap">
            <Phone size={17} aria-hidden="true" />
            <input
              id={`phone-${source}`}
              type="tel"
              autoComplete="tel"
              placeholder="Include country code if needed"
              {...register("phone")}
              aria-invalid={Boolean(errors.phone)}
            />
          </div>
          {errors.phone ? (
            <small className="field-error">{errors.phone.message}</small>
          ) : null}
        </div>
      </div>
      <div className="form-field">
        <label htmlFor={`interest-${source}`}>
          What would you like to discuss?
        </label>
        <select id={`interest-${source}`} {...register("interest")}>
          {interestOptions.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label htmlFor={`message-${source}`}>
          Message <span className="label-optional">(Optional)</span>
        </label>
        <div className="form-input-wrap form-input-wrap--textarea">
          <MessageSquare size={17} aria-hidden="true" />
          <textarea
            id={`message-${source}`}
            rows={compact ? 3 : 4}
            placeholder="Tell us briefly what you would like to discuss..."
            {...register("message")}
            aria-invalid={Boolean(errors.message)}
          />
        </div>
        {errors.message ? (
          <small className="field-error">{errors.message.message}</small>
        ) : null}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`companyWebsite-${source}`}>Company website</label>
        <input
          id={`companyWebsite-${source}`}
          tabIndex={-1}
          autoComplete="off"
          {...register("companyWebsite")}
        />
      </div>
      <div className="form-consent">
        <input
          type="checkbox"
          id={`consent-${source}`}
          {...register("consent")}
          aria-invalid={Boolean(errors.consent)}
        />
        <label htmlFor={`consent-${source}`}>
          I agree to be contacted about this enquiry and have read the{" "}
          <a href="/privacy-policy" target="_blank" rel="noreferrer">
            Privacy Policy
          </a>
          .
        </label>
      </div>
      {errors.consent ? (
        <small className="field-error">{errors.consent.message}</small>
      ) : null}
      {serverError ? (
        <div className="form-error" role="alert">
          <AlertCircle size={17} />
          {serverError}
        </div>
      ) : null}
      <button
        className="button button--primary button--wide form-submit"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Enquiry"}
        {!isSubmitting ? <Send size={16} aria-hidden="true" /> : null}
      </button>
      <p className="form-note">
        Your details are used only to respond to this enquiry. Trading involves
        risk; no returns are promised.
      </p>
    </form>
  );
}
