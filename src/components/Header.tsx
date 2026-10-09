import { useCallback, useEffect, useRef, useState } from 'react'
import { Logo } from './Logo'
import { Icon } from './Icon'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#contact', label: 'Contact Us' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = useCallback((restoreFocus = false) => {
    setMenuOpen(false)
    if (restoreFocus) toggleRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    menuRef.current?.querySelector<HTMLElement>('a')?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu(true)
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!(event.target as Element).closest('header')) closeMenu()
    }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onBreakpoint = () => desktop.matches && closeMenu()

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    desktop.addEventListener('change', onBreakpoint)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [menuOpen, closeMenu])

  const solid = scrolled || menuOpen

  return (
    <>
      {menuOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm lg:hidden"
          onClick={() => closeMenu()}
        />
      )}
      <header
        className={`on-dark fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
          solid
            ? 'border-white/10 bg-ink/85 backdrop-blur-xl backdrop-saturate-150'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a
          href="#main"
          className="sr-only rounded-lg bg-white px-4 py-2 text-sm font-medium text-ink focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
        >
          Skip to main content
        </a>

        <div className="container-page flex h-[98px] items-center lg:h-[114px] [@media(max-height:500px)]:h-[72px] justify-between gap-6">
          <a href="#top" className="flex shrink-0 items-center" aria-label="Metrohub — back to top">
            <Logo className="h-[86px] lg:h-[98px] [@media(max-height:500px)]:h-[60px]" priority />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[14px] font-medium text-white/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden h-11 items-center gap-2 rounded-xl bg-brand-blue px-4 text-[14px] font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.14)] transition-colors hover:bg-brand-blue-bright sm:inline-flex"
            >
              Partner With Us
            </a>

            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white transition-colors hover:bg-white/5 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Icon name={menuOpen ? 'x-lg' : 'list'} className="text-xl" />
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          ref={menuRef}
          hidden={!menuOpen}
          className="border-t border-white/10 bg-ink lg:hidden"
        >
          <nav aria-label="Mobile" className="container-page py-4">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => closeMenu()}
                    className="flex min-h-12 items-center justify-between border-b border-white/[0.07] text-[15px] font-medium text-white/85 hover:text-white"
                  >
                    {link.label}
                    <Icon name="arrow-right" className="text-sm text-white/40" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}
