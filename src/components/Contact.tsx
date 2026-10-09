import { Reveal } from './Reveal'
import { VendorForm } from './VendorForm'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="on-dark section relative isolate overflow-hidden bg-graphite text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-40 h-[420px] w-[620px] bg-[radial-gradient(closest-side,rgb(52_74_178/0.28),transparent)]" />
        <div className="absolute right-[-15%] bottom-[-25%] h-[380px] w-[520px] bg-[radial-gradient(closest-side,rgb(211_38_138/0.12),transparent)]" />
      </div>

      <div className="container-page">
        <Reveal>
          <h2
            id="contact-title"
            className="text-center text-[clamp(1.95rem,1.4rem+1.9vw,2.85rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance"
          >
            Let&rsquo;s Build a Partnership
          </h2>
        </Reveal>

        <Reveal delay={100} className="mx-auto mt-10 max-w-3xl md:mt-12">
          <VendorForm />
        </Reveal>
      </div>
    </section>
  )
}
