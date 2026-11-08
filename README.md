# chaitanya Trading Consultancy

A responsive multi-page consultancy website built with the Next.js App Router, TypeScript, React, Tailwind CSS v4.3, React Hook Form 7, Zod 4, Lucide icons and Google Sheets lead capture.

## Included

- Responsive home, About, Services, Approach, Insights, Contact and legal pages.
- The supplied chaitanya logo, prepared as a transparent horizontal brand lockup for the site header and footer.
- Locally hosted WebP workspace images. These generated visual assets are illustrative, not photographs of the actual company premises or team; replace them with verified business photography when available. The layout uses `next/image`, fixed aspect-ratio containers, `fill`, `sizes` and `object-fit: cover` so images resize without stretching or breaking the layout.
- A first-visit enquiry modal that opens after a short delay, remembers dismissal in browser storage and can be reopened from the navigation and page CTAs.
- Form validation on both client and server, a honeypot field, same-origin checking and rate limiting.
- Server-side Google Sheets API integration. Credentials stay on the server and are never exposed through `NEXT_PUBLIC_` variables.
- SEO metadata, canonical URLs, Open Graph and Twitter metadata, generated social share image, sitemap, robots rules, web manifest, organization/website/article/FAQ structured data and an `llms.txt` reference file.
- Privacy, Terms and Disclaimer pages. No return guarantees, fabricated statistics, or invented contact details are included.

## Stack

- Next.js `16.4.5` App Router
- React `19.3.1` and TypeScript
- Tailwind CSS v4.3 through `@tailwindcss/postcss`, with custom design tokens and responsive component styles
- React Hook Form + Zod
- Lucide React
- Google Sheets API via `googleapis`
- Upstash Redis rate limiting (required for production; a local in-memory fallback is provided for development)

## 1. Install and run

Use Node.js 20.19+ (Node.js 22 LTS is recommended) and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## 2. Configure the business information

Edit `.env.local` before launch:

```env
NEXT_PUBLIC_SITE_URL=https://your-real-domain.in
NEXT_PUBLIC_SITE_NAME=chaitanya Trading Consultancy
NEXT_PUBLIC_CITY=Indore
NEXT_PUBLIC_REGION=Madhya Pradesh
NEXT_PUBLIC_COUNTRY=India
NEXT_PUBLIC_PHONE=+91XXXXXXXXXX
NEXT_PUBLIC_EMAIL=verified-business-email@example.com
NEXT_PUBLIC_WHATSAPP=91XXXXXXXXXX
NEXT_PUBLIC_LINKEDIN_URL=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_YOUTUBE_URL=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

Only enter contact details and social profiles controlled by the business. The phone, email, WhatsApp number and social links are deliberately blank in `.env.example`; the project does not use sample contact numbers.

## 3. Connect Google Sheets for leads

The website uses Google Sheets because the supplied design reference calls for a spreadsheet lead inbox. The page copy and service definitions are centralized in `src/content/site-content.ts`; business contact details and site-specific settings are environment-driven in `src/config/site.ts`. The spreadsheet must be online in Google Drive; a local `.xlsx` file on a laptop cannot receive live website submissions by itself.

1. Create or select a Google Cloud project.
2. Enable the **Google Sheets API**.
3. Create a service account and generate a JSON key.
4. Create a Google spreadsheet and add a tab named `Lead Enquiries` (or set another tab name in the environment).
5. Share the spreadsheet with the service account email and grant **Editor** access.
6. Add these values to `.env.local` or your hosting provider's server environment:

```env
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
GOOGLE_SHEETS_TAB_NAME=Lead Enquiries
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"
```

7. Add this header row to row 1 of the spreadsheet:

| Created At | Full Name | Email | Phone | Interest | Message | Page | Source | Consent |
| ---------- | --------- | ----- | ----- | -------- | ------- | ---- | ------ | ------- |

The API appends each valid enquiry as a new row using the `RAW` input mode to reduce spreadsheet formula-injection risk. If the credentials or spreadsheet access are not configured, the form returns an error instead of falsely claiming that the enquiry was saved.

Google Sheets API reference: https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/append

## 4. Production rate limiting

Before enabling lead capture in production, configure an Upstash Redis database and set:

```env
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-secret-token
```

The included local in-memory rate limiter is development-only. The API refuses production submissions until the shared rate limiter is configured, because process memory is not shared across serverless instances.

## 5. SEO, AEO and local/GEO setup

The code provides the technical foundation, but no code can guarantee rankings or AI-search citations. Before launch:

1. Set `NEXT_PUBLIC_SITE_URL` to the canonical production domain.
2. Add the exact verified phone, email, service area and official social URLs.
3. Verify the domain in Google Search Console and add the verification token.
4. Submit `https://your-real-domain.in/sitemap.xml` in Search Console and inspect `https://your-real-domain.in/robots.txt`.
5. Create and verify the business's Google Business Profile if it serves customers at an eligible real location. Use the exact real business name, address/service area, phone and website consistently.
6. Add real business photos, actual staff/founder details and accurate service descriptions when the owner supplies them. Do not add fabricated testimonials, years of experience, performance numbers or star ratings.
7. Publish genuinely useful, reviewed market explainers on a consistent schedule. Keep article dates and authorship accurate.
8. Add an analytics/consent setup only after selecting the provider and updating the Privacy Policy.

The project includes page-specific metadata, canonical URLs, Open Graph/Twitter cards, Organization and WebSite structured data, FAQ and Article structured data, accessible question-and-answer content, sitemap/robots and `public/llms.txt`. These make the site easier to understand; they do not guarantee rich results, ranking positions or generative-search inclusion.

## 6. Legal and regulatory review — required before launch

This is a website implementation, not legal or regulatory approval. In India, the SEBI Investment Adviser framework can apply based on what a person actually provides and whether it is provided for consideration; the label “consultancy” does not automatically remove regulatory obligations. Review the actual service model, client communications, fee model, marketing claims, public research and any security-specific/personalised advice against both the Investment Adviser and Research Analyst frameworks with an appropriately qualified compliance professional before publishing or accepting engagements. The IA regulations were last amended on November 25, 2025, the IA Master Circular is dated February 6, 2026, and SEBI lists the Research Analyst regulations as amended on October 10, 2026. Do not claim SEBI registration or show a registration number unless it is genuine and verified.

Official references:

- SEBI Investment Advisers Regulations: https://www.sebi.gov.in/legal/regulations/nov-2025/securities-and-exchange-board-of-india-investment-advisers-regulations-2013-and-securities-last-amended-on-november-25-2025-_98246.html
- SEBI Master Circular for Investment Advisers (6 February 2026): https://www.sebi.gov.in/legal/master-circulars/feb-2026/master-circular-for-investment-advisers_99569.html
- SEBI Research Analysts regulations (current regulation list): https://www.sebi.gov.in/legal/regulations/oct-2026/securities-and-exchange-board-of-india-research-analysts-regulations-2014-last-amended-on-october-10-2026-_105294.html
- SEBI investor information on investment advisers: https://investor.sebi.gov.in/investment_advisor.html

## 7. Quality checks

```bash
npm run typecheck
npm run lint
npm run build
npm run start
```

Also test the actual form submission after Google Sheets credentials are set, and test the site on a narrow mobile screen, tablet and desktop. Check all phone/social links, legal copy, page titles, contact information, Search Console verification and the live spreadsheet permissions before launch.
