# CHAITANYA Trading Consultancy: website

A Next.js 16 (App Router, React 19, TypeScript) website for **CHAITANYA Trading
Consultancy**: a research-led trading consultancy. It is deliberately **not** a
trading academy, course seller or signal service, and it makes no performance
or regulatory claims it cannot support.

## Quick start

```bash
npm install
cp .env.example .env.local     # then fill in what you have
npm run dev                    # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |

Requires Node 20.9 or newer.

## Pages

`/` Home, `/about`, `/services`, `/approach`, `/insights` (index, `/insights/[slug]`,
`/insights/category/[category]`), `/contact`, `/disclaimer` (risk disclosure),
`/privacy-policy`, `/terms`. Also generated: `/sitemap.xml`, `/robots.txt`,
`/llms.txt`, `/manifest.webmanifest`, `/opengraph-image`.

## Where to change things

Nothing about the business is hardcoded in components.

| To change | Edit |
| --- | --- |
| Company name, contact details, address, hours, social links, legal fields, navigation, popup delay, SEO defaults | `src/config/site.ts` (values come from `NEXT_PUBLIC_*` env vars; see `.env.example`) |
| Service descriptions | `src/content/services.ts` |
| The four-step process | `src/content/approach.ts` |
| FAQs (also feed the FAQ structured data) | `src/content/faqs.ts` |
| Home and About copy | `src/content/home.ts`, `src/content/about.ts` |
| Policy pages | `src/app/privacy-policy`, `terms`, `disclaimer` |
| Colours, spacing, type scale | `src/app/styles/tokens.css` |

### Publishing an article

Add an object to the array in `src/content/insights/articles.ts` (slug, title,
excerpt, category, `publishedAt`, sections). The listing, article page, category
page, related articles, sitemap, JSON-LD and `llms.txt` all update automatically.
Add an `author` only when the person's identity is verified; otherwise the article
is credited to the consultancy. Do not publish live market commentary or
performance claims unless verified.

## Enquiry forms and Google Sheets

Both forms (popup and contact) post to `/api/leads`. Setup is in
[`docs/GOOGLE-SHEETS-SETUP.md`](docs/GOOGLE-SHEETS-SETUP.md).

The route validates on the server with the same rules as the browser, sanitises
input (including spreadsheet formula injection), and applies, in order: JSON-only
and same-origin checks, a 12 KB body limit, a hidden honeypot field, a minimum
fill-time check, optional Cloudflare Turnstile, per-IP rate limiting (5 per 10
minutes) and 24-hour duplicate detection. Each lead gets an ID such as
`CTC-20261108-4D76E8`, an IST timestamp, page source, campaign source (from UTM
parameters or referrer) and `Lead Status = New`.

If Google Sheets fails, it retries, then saves to a durable Redis queue. If
nothing can store the lead, the visitor is told it was **not** saved. A fake
success message is never shown. Server logs contain the lead ID and a short error
only, never personal data.

## First-visit popup

Opens once after `NEXT_PUBLIC_POPUP_DELAY_MS` (extra 5 s on phones), never on
`/contact`, never again after it is closed (remembered in localStorage), and can
be reopened from any "Discuss your requirements" button. It traps focus, closes
on Escape, locks background scroll, returns focus to what opened it, becomes a
bottom sheet on phones, and respects reduced-motion settings. Disable with
`NEXT_PUBLIC_POPUP_ENABLED=false`.

## Design system and performance notes

- Palette from the brief. The brief's secondary text colour `#65748B` is about 4.4:1 on the light background, just under WCAG AA, so `--fg-muted` is `#5B6B83`.
- The official logo has light lettering, so the header and footer stay navy.
- Headings Manrope, body Inter, both **self-hosted** (`src/app/fonts/`), so builds and visitors make no requests to Google Fonts.
- Server Components by default. Client components are limited to header, drawer, popup, forms, timeline, services index and one shared scroll-reveal controller. Motion loads lazily (`LazyMotion`), and the drawer and popup code load only when opened.
- Hero entrance and page entrance are CSS-only, so nothing waits on JavaScript.
- Security headers are set in `next.config.ts`. `script-src` is intentionally not restricted (Next.js and JSON-LD use inline scripts and a nonce-based policy would force dynamic rendering); `frame-ancestors`, `base-uri`, `form-action` and `object-src` are locked down.

### Replacing images

Images live in `src/assets/images/` and are imported statically, so Next.js knows
their dimensions (no layout shift) and generates blur placeholders and AVIF/WebP
sizes. To replace one, drop a new file over it (keep the file name, or update the
import) and update the `alt` text where it is used. Use real, licensed photography.

## Search visibility (SEO, AEO, GEO)

Unique titles and descriptions per page, canonical URLs, Open Graph and X cards,
sitemap, robots, visible breadcrumbs with `BreadcrumbList`, and JSON-LD for
`Organization`, `WebSite`, `WebPage`/`AboutPage`/`ContactPage`/`CollectionPage`,
`Service`, `Article` and `FAQPage` (only for visible FAQs). `LocalBusiness` is
intentionally **not** used: it should only be added once a verified street address
and Google Business Profile exist. `llms.txt` is generated from the same config
and content as the site and is a supplementary aid only. None of this guarantees
rankings or AI citations.

After launch: verify the domain in Google Search Console and submit
`/sitemap.xml`, test key pages with Google's Rich Results Test, and run
PageSpeed Insights on the live URL.

## Deployment (Vercel)

1. Push the repository to GitHub and import it in Vercel (framework: Next.js; no build overrides).
2. Add the environment variables from `.env.example`. At minimum: `NEXT_PUBLIC_SITE_URL`, the contact details you have, the four `GOOGLE_*` values, and (recommended) the two `UPSTASH_*` values.
3. Deploy, then submit a test enquiry and confirm a row appears in the sheet.
4. Add the custom domain, and make sure `NEXT_PUBLIC_SITE_URL` matches it exactly.

Any Node host works too: `npm run build && npm start` behind HTTPS.

At start-up in production the server logs a warning for any missing critical
configuration (site URL, Sheets credentials, Redis). Check the deployment logs
after the first deploy.

## Documentation

- [`docs/GOOGLE-SHEETS-SETUP.md`](docs/GOOGLE-SHEETS-SETUP.md): exact Google Cloud and spreadsheet steps
- [`docs/BUSINESS-INFO-REQUIRED.md`](docs/BUSINESS-INFO-REQUIRED.md): details the business still needs to supply, and the regulatory review
- [`docs/TESTING-REPORT.md`](docs/TESTING-REPORT.md): what was tested, how, and what was not
