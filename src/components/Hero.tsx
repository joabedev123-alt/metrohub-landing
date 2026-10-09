import { HeroGraphic, HeroGraphicCompact } from './HeroGraphic'
import { Reveal } from './Reveal'
import { Icon } from './Icon'

export function Hero() {
  return (
    <section id="top" className="on-dark relative isolate overflow-hidden bg-ink text-white">
      {/* Restrained accent lighting */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(52_74_178/0.26),transparent)]" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[360px] w-[480px] bg-[radial-gradient(closest-side,rgb(117_39_170/0.18),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="container-page grid grid-cols-1 items-center gap-12 pt-[132px] pb-20 sm:pt-[144px] md:pb-24 lg:min-h-[min(100svh,860px)] lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 lg:pt-[160px] lg:pb-28">
        <div className="max-w-[640px]">
          <Reveal>
            <h1 className="text-[clamp(1.85rem,1.2rem+3.4vw,3.85rem)] leading-[1.06] font-semibold tracking-[-0.025em] text-balance">
              Building, Scaling &amp; Managing{' '}
              <span className="text-white/60">Wholesale Distribution Networks</span>
            </h1>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-muted-dark sm:text-lg">
              A US-based e-commerce &amp; wholesale enterprise managing multi-channel product distribution.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
              <a
                href="#contact"
                className="group inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl bg-brand-blue px-7 text-[15px] font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.16),0_10px_30px_-10px_rgb(52_74_178/0.7)] transition-colors hover:bg-brand-blue-bright"
              >
                Partner With Us
                <Icon name="arrow-right" className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </a>
            </div>
          </Reveal>

          <div className="mt-14 border-t border-white/10 pt-6 lg:hidden">
            <HeroGraphicCompact />
          </div>
        </div>

        <Reveal delay={120} className="hidden lg:block">
          <div className="mx-auto max-w-[500px]">
            <HeroGraphic />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
