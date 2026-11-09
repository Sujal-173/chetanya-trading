# Information still required from CHAITANYA Trading Consultancy

The site deliberately shows **nothing** for items below until real, verified
values are supplied. Set them as environment variables (see `.env.example`) or
in `src/config/site.ts` / `src/content/*`. Nothing here has been invented.

## Must have before launch

| Item | Where it goes | Why it matters |
| --- | --- | --- |
| Production domain | `NEXT_PUBLIC_SITE_URL` | Canonicals, sitemap, social cards and structured data currently fall back to localhost. |
| Business email | `NEXT_PUBLIC_EMAIL` | Shown on Contact and footer; used in the failure message if a lead cannot be saved. |
| Business phone | `NEXT_PUBLIC_PHONE` | Contact page, footer, structured data. |
| Google Sheets + (recommended) Upstash credentials | see `docs/GOOGLE-SHEETS-SETUP.md` | Without Sheets, enquiries cannot be stored in the sheet. |
| Regulatory review | n/a | See "Regulatory" below. This is the most important item. |
| Legal review of the three policy pages | `src/app/privacy-policy`, `terms`, `disclaimer` | Drafted as sensible defaults, not legal advice. |
| Privacy contact email | `NEXT_PUBLIC_PRIVACY_EMAIL` | Falls back to the business email. |

## Regulatory (please do not skip)

In India, giving investment advice or publishing research analysis on securities
generally requires registration with SEBI as an Investment Adviser or Research
Analyst. The site is written as **general information and discussion** and says
it makes **no** registration claim. Before launch, have a qualified professional
confirm that the services described on the Services page, and the way enquiries
are handled, are permitted for the business as it is registered. If the business
is registered, add the details in `NEXT_PUBLIC_REGULATORY_*` so they appear in the
footer and risk disclosure. Do not add a number that has not been verified on
the regulator's official register.

## Should have

| Item | Where |
| --- | --- |
| Legal business name and registered address | `NEXT_PUBLIC_LEGAL_NAME`, `NEXT_PUBLIC_REGISTERED_ADDRESS` |
| Public office address (street) | `NEXT_PUBLIC_ADDRESS_LINES`, `NEXT_PUBLIC_POSTAL_CODE` (only the city and state are shown today, taken from the original project configuration; please confirm Indore is correct) |
| Business hours | `NEXT_PUBLIC_BUSINESS_HOURS` |
| Social profile URLs | `NEXT_PUBLIC_LINKEDIN_URL`, `..._INSTAGRAM_URL`, `..._YOUTUBE_URL`, `..._X_URL` |
| WhatsApp number (optional) | `NEXT_PUBLIC_WHATSAPP` |
| Whether "Ongoing Market Guidance" is actually offered | `NEXT_PUBLIC_OFFER_ONGOING_GUIDANCE=true` |
| Verified team members (names, roles, bios) | `team` array in `src/config/site.ts`; an About-page section appears automatically |
| Google Search Console verification token | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` |

## Content to review

- All copy was written fresh for this build. Please read it for tone and accuracy, especially statements about the process (for example, "we will reply to confirm what a consultation can cover" and "nothing starts until the scope is clear"). Change anything that does not match how the business actually works.
- The three articles in `src/content/insights/articles.ts` are original, general explainers dated 8 November 2026. Replace the dates when you publish, and have a qualified person review them before they go live.
- The FAQ entry "How can someone contact the consultancy?" refers to the form; update it if you publish other channels.

## Images

The three supplied photos look like AI-generated renders, and two of them are near-duplicates (same desk, same bull statue). The third (`research-notes`) is green and brown, which sits outside the navy palette. They are usable, but for a financial-services brand, replace them with licensed real photography of your own office, desk or team when you can. See the README ("Replacing images").
