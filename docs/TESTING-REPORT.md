# Testing report

Run on 9 November 2026 against a production build (`next build` + `next start`)
in a Linux sandbox using headless Chromium (Playwright) and Lighthouse. These are
the actual results, including limits.

## Static checks

| Check | Result |
| --- | --- |
| `tsc --noEmit` | Pass, 0 errors |
| ESLint | Pass, 0 errors, 0 warnings |
| `next build` | Pass; 24 routes generated; all pages static except `/api/leads` |
| `npm audit --omit=dev` | 0 vulnerabilities in production dependencies |
| `npm audit` (all) | 8 moderate, all in the ESLint dev-tooling chain; not shipped |

## Responsive (every route listed below at 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920 px)

Routes: `/`, `/about`, `/services`, `/approach`, `/insights`, an article, `/contact`,
`/disclaimer`, `/privacy-policy`, `/terms`.

Result: **no horizontal overflow, no broken images, no console errors, no failed
requests** at any width. One real bug was found and fixed: the services index
list stretched its grid column below 1024 px and caused page-wide overflow.
Layouts were also reviewed visually from screenshots at 1440, 768 and 390 px.

## Behaviour (browser automation)

All passed (18/18): popup absent at load, opens after delay, locks scroll, has an
accessible name and `aria-modal`, traps Tab and Shift+Tab, validates inline,
focuses the first invalid field, closes on Escape, restores scroll, remembers
dismissal across reload, reopens from buttons, never auto-opens on `/contact`,
mobile drawer touch targets at least 44 px, drawer returns focus on close, the
mobile sheet fits the viewport, and reduced-motion leaves nothing hidden.

Form end-to-end: validation on blur, success shows a real reference ID and takes
focus, UTM campaign and page captured, a server 503 shows an error (never
success) and keeps typed values, and a network failure is reported honestly.

## API (curl)

Verified: valid submission 201; duplicate 200 (not stored twice); honeypot
returns neutral success and stores nothing; too-fast 400; invalid fields 400 with
per-field errors; cross-origin 403; wrong content type 415; oversized body 413;
GET 405; rate limit returns 429 on the sixth request; with no Sheets, no Redis
and no disk the API returns **503** and logs only the lead ID (no personal data).

## SEO

All 13 sampled pages: unique title and description, absolute canonical, exactly
one H1, Open Graph and X metadata, every `<img>` has `alt`, JSON-LD parses, heading
order is valid. Sitemap (15 URLs), robots, llms.txt, manifest, app icon and Open
Graph image return 200. All security headers present; `X-Powered-By` removed.
Case-insensitive scan found no "Chetanya" or "academy" in rendered pages.

## Lighthouse (headless Chromium, default simulated throttling)

| Page | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Home, mobile (3 runs) | 75, 85, 86 | 100 | 100 | 100 |
| Services, mobile (3 runs) | 83, 88, 89 | 100 | 100 | 100 |
| Approach, mobile (3 runs) | 84, 90, 92 | 100 | 100 | 100 |
| Contact, mobile (3 runs) | 84, 87, 87 | 100 | 100 | 100 |
| Home, desktop | 87 to 98 across runs | 100 | 100 | 100 |
| Services, desktop | 96 | 100 | 100 | 100 |

CLS was 0 on every run. **Accessibility, Best Practices and SEO exceed their
targets. Performance does not reliably reach 90 on mobile in this environment.**
Repeated runs of the same page varied by up to 18 points (Total Blocking Time
ranged 330 to 1,050 ms on the home page), so this sandbox is too noisy to judge
precisely. Main costs are React and Next runtime plus hydration, and the mobile
LCP (2.4 to 3.1 s on home) is the hero image under simulated slow 4G. Please
measure the deployed site with PageSpeed Insights before treating the number as
final. Work already done: Motion loads lazily, the drawer and popup load on
demand, scroll reveals use one shared observer with no per-element client JS,
fonts are self-hosted, images are statically imported with blur placeholders.

An earlier run caught a real accessibility issue (skipped heading levels on the
Approach and Insights pages); it was fixed and verified on all routes.

## Not tested, and why

- **A real write to Google Sheets.** No credentials were available. The code path (tab and header creation, append, retry, formula neutralisation) is implemented but has not run against Google. Follow `docs/GOOGLE-SHEETS-SETUP.md` and submit a test enquiry on the deployed site before launch.
- **Upstash Redis** (shared rate limit, dedupe, fallback queue) and **Cloudflare Turnstile**: implemented, not exercised without accounts. In-memory and file fallbacks were tested.
- **Browsers other than Chromium**, and real phones. Safari/iOS especially (dynamic viewport units, `scrollbar-gutter`, `<dialog>`-style focus handling) should be checked by hand.
- **Screen readers** (NVDA, VoiceOver). Automated checks and keyboard behaviour passed; a manual pass is still advised.
- **Google's Rich Results Test and Search Console**, which need the live domain.
- **Real photography.** The supplied images are AI-style renders and were not replaced; see `docs/BUSINESS-INFO-REQUIRED.md`.
