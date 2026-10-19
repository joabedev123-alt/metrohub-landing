# Metrohub — Corporate Identity & Verification Page

Single-page site built with React, TypeScript, Vite, and Tailwind CSS.

```bash
npm install
npm run dev      # local development
npm run build    # type-check + production build (dist/)
```

## Before publishing

1. **Logo** — the source file is `public/logo.png`; `public/brand/metrohub-logo.png` / `.webp` (the WebP is used on the page) and the favicons (`favicon-48.png`, `favicon-192.png`, `apple-touch-icon.png`, `icon-512.png`) are derived from it. Regenerate them if the logo changes.
2. **Business email / phone** — set in `contact` in `src/config/site.ts` (currently contact@metrohubusa.com / (914) 507-6361). They feed the contact section, footer, privacy policy, and structured data.
3. **Form delivery** — by default the form posts to [FormSubmit](https://formsubmit.co), which forwards each message to `contact.email` in `src/config/site.ts` (no server needed). The **first** submission after deploy sends a one-time activation email to that address; click the link in it, then resend. To use another service, set `VITE_FORM_ENDPOINT` (see `.env.example`) to an endpoint that accepts a JSON POST (`name`, `company`, `phone`, `email`, `message`, `_replyto`, `_subject`).
4. **Privacy policy** — text lives in `src/components/PrivacyDialog.tsx`; the "Last updated" date is `privacyPolicy.lastUpdated` in the config.
5. **Domain** — set `siteUrl` in the config once known; consider adding an `og:image`.
