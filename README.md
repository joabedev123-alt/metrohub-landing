# Metrohub — Corporate Identity & Verification Page

Single-page site built with React, TypeScript, Vite, and Tailwind CSS.

```bash
npm install
npm run dev      # local development
npm run build    # type-check + production build (dist/)
```

## Before publishing

1. **Logo** — the source file is `public/logo.png`; `public/brand/metrohub-logo.png` / `.webp` (the WebP is used on the page) and the favicons (`favicon-48.png`, `favicon-192.png`, `apple-touch-icon.png`, `icon-512.png`) are derived from it. Regenerate them if the logo changes.
2. **Business email / phone** — set `contact.email` and `contact.phone` in `src/config/site.ts`. Placeholders are shown (never linked) while they are `null`. They also feed the structured data and privacy policy.
3. **Form delivery** — copy `.env.example` to `.env` and set `VITE_FORM_ENDPOINT` to an endpoint that accepts a JSON POST (`companyName`, `contactName`, `productCategory`, `message`, `_subject`). Without it, the form reports that the message was **not** sent.
4. **Privacy policy** — review the text in `src/components/PrivacyDialog.tsx`, then set `privacyPolicy.reviewed: true` and `privacyPolicy.lastUpdated` in the config.
5. **Domain** — set `siteUrl` in the config once known; consider adding an `og:image`.
