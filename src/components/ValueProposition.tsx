import { Reveal } from './Reveal'
import { Icon, type IconName } from './Icon'

const POINTS: { icon: IconName; text: string }[] = [
  { icon: 'diagram-3', text: 'Proven E-Commerce Reach & Multi-Channel Distribution' },
  { icon: 'shield-check', text: 'Strict Compliance & Brand MAP Enforcement' },
  { icon: 'calendar2-check', text: 'Timely Payments & Consistent Purchase Orders' },
]

export function ValueProposition() {
  return (
    <section aria-labelledby="value-title" className="section bg-white">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[18px] border border-line bg-white shadow-card">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-magenta opacity-80"
          />
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal className="border-b border-line p-6 min-[400px]:p-8 sm:p-10 lg:border-r lg:border-b-0 lg:p-14">
              <p className="eyebrow text-brand-blue">Partnership Value</p>
              <h2
                id="value-title"
                className="mt-5 text-[clamp(1.85rem,1.4rem+1.6vw,2.6rem)] leading-[1.12] font-semibold tracking-[-0.02em] text-ink text-balance"
              >
                Why Partner with Metrohub?
              </h2>
              <p className="mt-5 max-w-sm leading-relaxed text-muted">
                What Metrohub brings to every supplier, distributor, and brand relationship.
              </p>
            </Reveal>

            <ol className="divide-y divide-line">
              {POINTS.map((point, index) => (
                <Reveal
                  as="li"
                  key={point.text}
                  delay={index * 80}
                  className="flex items-center gap-4 px-6 py-6 min-[400px]:px-8 sm:gap-6 sm:py-7 sm:px-10 lg:px-12 lg:py-9"
                >
                  <span className="hidden w-7 shrink-0 sm:inline text-[13px] font-semibold tracking-wider text-[#6b7080] tabular-nums" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-lg text-brand-cyan">
                    <Icon name={point.icon} />
                  </span>
                  <p className="text-[17px] leading-snug font-semibold tracking-[-0.01em] text-ink sm:text-lg">
                    {point.text}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
