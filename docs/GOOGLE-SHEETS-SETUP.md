# Google Sheets lead capture: setup

Every valid enquiry is appended as a row to a Google Sheet through the Google
Sheets API, using a **service account**. The credentials stay on the server and
are never sent to the browser.

Time needed: about 10 minutes.

## 1. Create a Google Cloud project

1. Open <https://console.cloud.google.com/> and sign in with the business Google account.
2. Click the project picker at the top, then **New project**. Name it, for example, `chaitanya-website`. Create it and make sure it is selected.

## 2. Enable the Google Sheets API

1. Go to **APIs & Services > Library**.
2. Search for **Google Sheets API**, open it and click **Enable**.

## 3. Create the service account and key

1. Go to **IAM & Admin > Service Accounts > Create service account**.
2. Name it `website-leads`. Skip the optional role steps (no project role is needed) and click **Done**.
3. Open the new service account, go to the **Keys** tab, then **Add key > Create new key > JSON**. A `.json` file downloads.
4. Treat this file like a password. Do not commit it, email it or paste it in chat. If it is ever exposed, delete the key and create a new one.

## 4. Create the spreadsheet and share it

1. Create a new Google Sheet, for example "Chaitanya Enquiries".
2. Copy the spreadsheet ID from the address bar: `https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`.
3. Click **Share** and add the service account's email (the `client_email` value in the JSON, which looks like `website-leads@chaitanya-website.iam.gserviceaccount.com`) as an **Editor**.
4. Keep general access **Restricted**. Do not use "Anyone with the link".

## 5. Add the environment variables

| Variable | Value |
| --- | --- |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | the ID from step 4 |
| `GOOGLE_SHEETS_TAB_NAME` | `Lead Enquiries` (or any tab name; it is created if missing) |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `client_email` from the JSON |
| `GOOGLE_PRIVATE_KEY` | `private_key` from the JSON, in double quotes, keeping the `\n` characters |

On Vercel, paste these under **Project > Settings > Environment Variables**, then redeploy.

The first submission creates the tab if needed and writes the header row:

`Lead ID | Submission Date | Full Name | Email | Phone | Area of Interest | Message | Page Source | Campaign Source | Lead Status | Consent to Contact`

New leads get `Lead Status = New`. In the sheet you can select column J and use
**Data > Data validation** to offer a dropdown such as New, Contacted, In discussion, Closed.

## 6. Test it

1. Open the live site and submit the contact form with a test name.
2. A row should appear within a few seconds. Delete the test row afterwards.

## Troubleshooting

| Symptom (server logs show `[leads] ... sheet write failed`) | Cause and fix |
| --- | --- |
| `The caller does not have permission` (403) | The sheet is not shared with the service account email as Editor. |
| `Requested entity was not found` (404) | Wrong spreadsheet ID. |
| `Google Sheets API has not been used in project ...` | Step 2 not done for this project, or wait a minute after enabling. |
| `error:1E08010C:DECODER routines` or `invalid_grant` | The private key was pasted without its `\n` characters, or is truncated. Paste it again exactly as in the JSON. |
| `Google Sheets is not configured` | One of the four variables is missing or malformed. |

## What happens if Google is unavailable

1. The server retries transient errors (rate limits, 5xx, timeouts) up to three times.
2. If it still fails, the enquiry is pushed to a **durable Redis queue** (Upstash), and the visitor still receives a truthful confirmation because the lead is saved.
3. If neither Sheets nor Redis can store it (and there is no persistent disk), the visitor is told clearly that the enquiry **was not saved** and is shown the business email if configured. A false success message is never shown.

### Upstash Redis (recommended)

1. Create a free database at <https://upstash.com/>, then copy the **REST URL** and **REST token** into `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
2. This also enables shared rate limiting (5 enquiries per IP per 10 minutes) and 24-hour duplicate detection across all server instances.
3. To see queued leads: in the Upstash console CLI run `LRANGE chaitanya:leads:unsynced 0 -1`. Each item is a JSON lead; copy the rows into the sheet, then `DEL chaitanya:leads:unsynced`.

On a normal server with a disk (not serverless), a last-resort fallback appends to `.data/leads-fallback.jsonl`.

## Privacy note

The sheet will contain personal data (names, emails, phone numbers). Share it only with people who need it, and keep the privacy policy accurate if how leads are stored changes.
