import { Reveal } from './Reveal'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section bg-white">
      <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow text-brand-blue">About</p>
          <h2
            id="about-title"
            className="mt-5 text-[clamp(1.85rem,1.4rem+1.6vw,2.6rem)] leading-[1.12] font-semibold tracking-[-0.02em] text-ink text-balance"
          >
            Built for Wholesale Partnerships
          </h2>
        </Reveal>
        <Reveal delay={80} className="lg:pt-11">
          <p className="text-lg leading-[1.75] text-muted sm:text-[19px]">
            Metrohub LLC is a Bethel, Connecticut-based consumer goods enterprise focused on wholesale
            sourcing, marketplace distribution, and streamlined operations across retail and
            e-commerce channels.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
