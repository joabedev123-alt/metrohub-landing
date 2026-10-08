import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { siteConfig } from './src/config/site'

/**
 * Injects Organization structured data built only from the values in
 * src/config/site.ts. Email and phone are included only once configured.
 */
function structuredData(): Plugin {
  return {
    name: 'metrohub-structured-data',
    transformIndexHtml(html) {
      const { contact, location } = siteConfig
      const organization: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.legalName,
        legalName: siteConfig.legalName,
        description: siteConfig.description,
        address: {
          '@type': 'PostalAddress',
          addressLocality: location.city,
          addressRegion: location.stateCode,
          addressCountry: location.countryCode,
        },
      }
      if (contact.email) organization.email = contact.email
      if (contact.phone) organization.telephone = contact.phone
      if (siteConfig.siteUrl) organization.url = siteConfig.siteUrl

      const json = JSON.stringify(organization).replace(/</g, '\u003c')
      return html.replace(
        '<!-- structured-data -->',
        `<script type="application/ld+json">${json}</script>`,
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), structuredData()],
})
