import { useState } from 'react'
import { siteConfig } from '../config/site'

type LogoProps = {
  className?: string
  /** Load eagerly (above the fold). */
  priority?: boolean
}

/**
 * Renders the original Metrohub logo file (public/brand/). The image is never
 * recreated; if the file is missing, a plain-text name is shown so the page
 * remains usable while the asset is pending.
 */
export function Logo({ className = 'h-8', priority = false }: LogoProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className="text-[15px] font-semibold tracking-[0.2em] text-white uppercase">
        {siteConfig.brandName}
      </span>
    )
  }

  return (
    <img
      src={siteConfig.logo.src}
      alt={siteConfig.logo.alt}
      width={siteConfig.logo.width}
      height={siteConfig.logo.height}
      loading={priority ? 'eager' : 'lazy'}
      className={`${className} w-auto select-none`}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
