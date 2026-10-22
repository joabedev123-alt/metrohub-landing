/**
 * Central business details for the Metrohub page.
 *
 * Replace the `null` values below once the information is confirmed.
 * Placeholders are displayed (never linked) while a value is `null`.
 */
export const siteConfig = {
  brandName: 'Metrohub',
  legalName: 'Metrohub LLC',
  description:
    'Metrohub LLC is a Bethel, Connecticut-based consumer goods enterprise focused on wholesale sourcing, marketplace distribution, and logistics operations.',

  /** Public site URL (e.g. "https://www.example.com"). Leave null until the domain is confirmed. */
  siteUrl: 'https://metrohubusa.com' as string | null,

  location: {
    street: '18 Hudson St',
    postalCode: '06801',
    /** Google Maps place link. */
    mapsUrl: 'https://maps.app.goo.gl/dHEyBA5SGFGsJVBs9',
    city: 'Bethel',
    stateCode: 'CT',
    state: 'Connecticut',
    country: 'USA',
    countryCode: 'US',
  },

  contact: {
    email: 'contact@metrohubusa.com' as string | null,
    /** Display format. */
    phone: '(914) 507-6361' as string | null,
    /** E.164 format, used for tel: links and structured data. */
    phoneE164: '+19145076361',
    emailPlaceholder: '[Your Business Email]',
    phonePlaceholder: '[Your Business Phone]',
  },

  logo: {
    /** Trimmed copy of public/logo.png (original kept untouched). */
    src: '/brand/metrohub-logo.webp',
    width: 332,
    height: 386,
    alt: 'Metrohub',
  },

  privacyPolicy: {
    /** Set to true once the policy text has been reviewed for publication. */
    reviewed: true,
    /** Effective date shown in the policy, e.g. "January 15, 2027". */
    lastUpdated: 'October 2026' as string | null,
  },

  copyrightYear: 2026,
} as const
