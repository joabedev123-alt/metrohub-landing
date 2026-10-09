import { siteConfig } from '../config/site'
import { Icon, type IconName } from './Icon'
import { Logo } from './Logo'

type FooterProps = {
  onOpenPrivacy: () => void
}

const NAV_LINKS = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#contact', label: 'Contact Us' },
]

const CAPABILITY_LINKS = ['Wholesale Sourcing', 'Marketplace Distribution', 'Logistics & Operations']

const linkClass = 'inline-flex min-h-11 items-center text-left lg:min-h-8 text-[14px] text-white/70 transition-colors hover:text-white'

function ColumnTitle({ children }: { children: string }) {
  return <h2 className="text-xs font-semibold tracking-[0.16em] text-white/50 uppercase">{children}</h2>
}

export function Footer({ onOpenPrivacy }: FooterProps) {
  const { contact, location, legalName } = siteConfig

  const details: { icon: IconName; label: string; value: string; href?: string; external?: boolean; pending?: boolean }[] = [
    { icon: 'building', label: 'Legal Entity', value: legalName },
    {
      icon: 'geo-alt',
      label: 'Address',
      value: `${location.street}, ${location.city}, ${location.stateCode} ${location.postalCode} – ${location.country}`,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.street}, ${location.city}, ${location.stateCode} ${location.postalCode}`)}`,
      external: true,
    },
    contact.email
      ? { icon: 'envelope', label: 'Email', value: contact.email, href: `mailto:${contact.email}` }
      : { icon: 'envelope', label: 'Email', value: contact.emailPlaceholder, pending: true },
    contact.phone
      ? { icon: 'telephone', label: 'Phone', value: contact.phone, href: `tel:${contact.phoneE164}` }
      : { icon: 'telephone', label: 'Phone', value: contact.phonePlaceholder, pending: true },
  ]

  return (
    <footer className="on-dark relative isolate overflow-hidden border-t border-white/[0.08] bg-ink text-white">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/60 to-transparent"
      />

      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-12 pt-16 pb-14 md:grid-cols-3 md:gap-x-10 lg:flex lg:items-start lg:justify-between lg:gap-12 lg:pt-20 lg:pb-20">
        {/* Brand */}
        <div className="col-span-2 md:col-span-3 lg:shrink-0">
          <a href="#top" aria-label="Metrohub — back to top" className="inline-flex">
            <Logo className="h-[118px]" />
          </a>
        </div>

        {/* Navigation */}
        <nav aria-label="Footer">
          <ColumnTitle>Navigate</ColumnTitle>
          <ul className="mt-5 space-y-0.5 lg:mt-6 lg:space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button type="button" onClick={onOpenPrivacy} aria-haspopup="dialog" className={linkClass}>
                Privacy Policy
              </button>
            </li>
          </ul>
        </nav>

        {/* Capabilities */}
        <div>
          <ColumnTitle>Capabilities</ColumnTitle>
          <ul className="mt-5 space-y-0.5 lg:mt-6 lg:space-y-2">
            {CAPABILITY_LINKS.map((label) => (
              <li key={label}>
                <a href="#capabilities" className={linkClass}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company details */}
        <div className="col-span-2 md:col-span-1">
          <ColumnTitle>Company</ColumnTitle>
          <dl className="mt-6 space-y-5">
            {details.map((item) => (
              <div key={item.label} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[14px] text-brand-cyan">
                  <Icon name={item.icon} />
                </span>
                <div className="min-w-0">
                  <dt className="text-[12px] text-white/50">{item.label}</dt>
                  <dd className="text-[14px] break-words text-white/85">
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
                        className="-my-3 inline-block py-3 transition-colors hover:text-brand-cyan"
                      >
                        {item.value}
                      </a>
                    ) : item.pending ? (
                      <span className="text-white/55 italic">{item.value}</span>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.08]">
        <div className="container-page flex justify-center py-6 text-center text-[13px]">
            <a
              href="https://camaly.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-1.5 text-white/60 transition-colors hover:text-white"
            >
              Made with{' '}
              <span role="img" aria-label="love">
                💚
              </span>{' '}
              by
              <span className="bg-[linear-gradient(90deg,#29B8CD,#4B63D6_35%,#B145D8_68%,#ED344D)] bg-clip-text font-bold tracking-[0.08em] text-transparent transition-[filter] group-hover:brightness-125">
                CAMALY
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
        </div>
      </div>
    </footer>
  )
}
