import { z } from "zod";

export const interestOptions = [
  "Market Insights",
  "Trading Consultation",
  "Strategy Discussion",
  "Risk & Trade Planning",
  "General Enquiry",
] as const;

export const leadSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(80, "Name is too long."),
  email: z.string().trim().email("Enter a valid email address.").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9][0-9\s()-]{6,18}$/, "Enter a valid phone number."),
  interest: z.enum(interestOptions),
  message: z.string().trim().max(2000, "Please keep your message under 2,000 characters."),
  consent: z.boolean().refine((value) => value, { error: "Please agree to be contacted about this enquiry." }),
  companyWebsite: z.string().max(0).optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
