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
  siteUrl: null as string | null,

  location: {
    city: 'Bethel',
    stateCode: 'CT',
    state: 'Connecticut',
    country: 'USA',
    countryCode: 'US',
  },

  contact: {
    /** Business email, e.g. "partners@yourdomain.com". */
    email: null as string | null,
    /** Business phone in display format, e.g. "+1 (203) 555-0100". */
    phone: null as string | null,
    emailPlaceholder: '[Your Business Email]',
    phonePlaceholder: '[Your Business Phone]',
  },

  logo: {
    /** Trimmed copy of public/logo.png (original kept untouched). */
    src: '/brand/metrohub-logo.webp',
    width: 206,
    height: 240,
    alt: 'Metrohub',
  },

  privacyPolicy: {
    /** Set to true once the policy text has been reviewed for publication. */
    reviewed: false,
    /** Effective date shown in the policy, e.g. "January 15, 2027". */
    lastUpdated: null as string | null,
  },

  copyrightYear: 2026,
} as const
