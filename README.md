# Movena marketing site

The production website is a Next.js App Router application deployed to the
`movena-site` project on Vercel and served at `https://movena.com.au`.

## Local Next.js commands

```sh
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run test:http
```

`public/assets/` is an exact copy of the legacy root `assets/` directory so the
Next.js app can serve the existing `/assets/...` URLs without moving or deleting
anything required by GitHub Pages.

## Visual design guidance

The approved homepage is the visual source of truth for every public marketing
page and the shared site shell. Use the existing design tokens rather than
creating page-specific colour palettes.

See [Movena visual design and approved colour palette](docs/design-guidelines.md)
before changing colours, surfaces, branded integrations, or shared components.

## Contact form configuration

The `/contact/` form posts to the server-only `/api/contact/` route. The route
creates or updates the visitor as a Brevo contact and sends a Brevo
transactional notification to Movena. It does not add marketing consent.

Configure these variables in both Vercel Preview and Production before testing
or releasing the form:

- `BREVO_API_KEY` — Brevo API key with contact and transactional-email access.
- `BREVO_SENDER_EMAIL` — a sender address verified for Brevo transactional
  email.
- `BREVO_NOTIFICATION_EMAIL` — the fixed Movena inbox that receives enquiries.

Optional:

- `BREVO_CONTACT_LIST_ID` — a positive numeric ID for a dedicated enquiry list.
  Leave it unset unless that list is used only for enquiry management rather
  than promotional marketing.

Do not commit real values. Preview and Production values are managed separately
in Vercel. The lightweight in-process submission limit is best-effort on
serverless instances; no durable rate-limit service is currently configured.
