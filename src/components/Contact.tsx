import { siteConfig } from '../config/site'
import { Reveal } from './Reveal'
import { VendorForm } from './VendorForm'
import { Icon, type IconName } from './Icon'

function Placeholder({ text }: { text: string }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span className="text-white/60 italic">{text}</span>
      <span className="rounded-md border border-dashed border-white/25 px-1.5 py-0.5 text-[11px] font-medium tracking-wide text-white/60 not-italic">
        Pending
      </span>
    </span>
  )
}

export function Contact() {
  const { contact, location, legalName } = siteConfig
  const telHref = contact.phone ? `tel:${contact.phone.replace(/[^\d+]/g, '')}` : null

  const details: { icon: IconName; term: string; value: React.ReactNode }[] = [
    { icon: 'building', term: 'Legal Entity', value: legalName },
    { icon: 'geo-alt', term: 'Location', value: `${location.city}, ${location.stateCode} – ${location.country}` },
    {
      icon: 'envelope',
      term: 'Email',
      value: contact.email ? (
        <a href={`mailto:${contact.email}`} className="text-white underline decoration-white/25 underline-offset-4 hover:decoration-brand-cyan">
          {contact.email}
        </a>
      ) : (
        <Placeholder text={contact.emailPlaceholder} />
      ),
    },
    {
      icon: 'telephone',
      term: 'Phone',
      value:
        contact.phone && telHref ? (
          <a href={telHref} className="text-white underline decoration-white/25 underline-offset-4 hover:decoration-brand-cyan">
            {contact.phone}
          </a>
        ) : (
          <Placeholder text={contact.phonePlaceholder} />
        ),
    },
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="on-dark section relative isolate overflow-hidden bg-graphite text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-40 h-[420px] w-[620px] bg-[radial-gradient(closest-side,rgb(52_74_178/0.28),transparent)]" />
        <div className="absolute right-[-15%] bottom-[-25%] h-[380px] w-[520px] bg-[radial-gradient(closest-side,rgb(211_38_138/0.12),transparent)]" />
      </div>

      <div className="container-page grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow text-brand-cyan">Contact</p>
          <h2
            id="contact-title"
            className="mt-5 text-[clamp(1.95rem,1.4rem+1.9vw,2.85rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance"
          >
            Let&rsquo;s Build a Partnership
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted-dark">
            Suppliers, wholesale distributors, and brand partners can reach our team through the
            details below or the vendor inquiry form.
          </p>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
            <h3 className="text-xs font-semibold tracking-[0.16em] text-white/60 uppercase">Company Details</h3>
            <dl className="mt-5 divide-y divide-white/[0.08]">
              {details.map((item) => (
                <div key={item.term} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink text-brand-cyan">
                    <Icon name={item.icon} />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-[13px] text-muted-dark">{item.term}</dt>
                    <dd className="mt-0.5 text-[15px] font-medium break-words text-white">{item.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <VendorForm />
        </Reveal>
      </div>
    </section>
  )
}
