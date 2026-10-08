import { Reveal } from './Reveal'
import { Icon, type IconName } from './Icon'

const CAPABILITIES: { icon: IconName; title: string; description: string; tags: string[] }[] = [
  {
    icon: 'box-seam',
    title: 'Wholesale Sourcing',
    description: 'Partnering with authorized brand distributors and manufacturers.',
    tags: ['Reliable Volume', 'Streamlined Purchasing'],
  },
  {
    icon: 'shop',
    title: 'Marketplace Distribution',
    description: 'Authorized distribution and compliant Amazon FBA fulfillment.',
    tags: ['Brand Protection', 'MAP Enforcement'],
  },
  {
    icon: 'truck',
    title: 'Logistics & Operations',
    description: 'Streamlined fulfillment, inventory management, and reliable operations.',
    tags: ['Efficiency', 'Transparency', 'Partnership'],
  },
]

export function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="section border-y border-line bg-mist">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-brand-blue">What We Do</p>
          <h2
            id="capabilities-title"
            className="mt-5 text-[clamp(1.85rem,1.4rem+1.6vw,2.6rem)] leading-[1.12] font-semibold tracking-[-0.02em] text-ink"
          >
            Core Capabilities
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-5 md:mt-14 md:grid-cols-3 lg:gap-6">
          {CAPABILITIES.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 80} className="flex">
              <article className="group flex w-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card min-[400px]:p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-card-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:p-8">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand-blue/15 bg-brand-blue/[0.06] text-[22px] text-brand-blue">
                  <Icon name={item.icon} />
                </span>
                <h3 className="mt-7 text-xl font-semibold tracking-[-0.01em] text-ink">{item.title}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{item.description}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-7" aria-label={`${item.title} focus areas`}>
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-line bg-mist px-2.5 py-1 text-[12.5px] font-medium text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
