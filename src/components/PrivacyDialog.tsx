import { useEffect, useRef } from 'react'
import { siteConfig } from '../config/site'
import { Icon } from './Icon'

type PrivacyDialogProps = {
  open: boolean
  onClose: () => void
}

export function PrivacyDialog({ open, onClose }: PrivacyDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      returnFocusRef.current = document.activeElement as HTMLElement | null
      dialog.showModal()
      document.documentElement.classList.add('has-modal')
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  const handleClose = () => {
    document.documentElement.classList.remove('has-modal')
    onClose()
    returnFocusRef.current?.focus()
  }

  const { contact, legalName, location, privacyPolicy } = siteConfig

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="privacy-title"
      onClose={handleClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close()
      }}
      className="m-auto max-h-[min(88dvh,820px)] w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-2xl border border-line bg-white p-0 text-ink shadow-[0_40px_120px_-30px_rgb(0_0_0/0.55)] backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex max-h-[min(88dvh,820px)] flex-col">
        <div className="flex items-start justify-between gap-6 border-b border-line px-6 py-5 sm:px-8">
          <div>
            <h2 id="privacy-title" className="text-xl font-semibold tracking-[-0.01em]">
              Privacy Policy
            </h2>
            <p className="mt-1 text-[13px] text-muted">
              {legalName} · Last updated: {privacyPolicy.lastUpdated ?? '[Effective date]'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line text-muted transition-colors hover:text-ink"
            aria-label="Close privacy policy"
          >
            <Icon name="x-lg" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6 text-[15px] leading-relaxed text-muted sm:px-8 [&_h3]:mt-7 [&_h3]:mb-2 [&_h3]:text-[15px] [&_h3]:font-semibold [&_h3]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-3 [&_ul+p]:mt-3 [&_ul]:mt-2 [&_ul]:space-y-1">
          <p>
            This Privacy Policy explains how {legalName} (&ldquo;Metrohub,&rdquo; &ldquo;we,&rdquo; or
            &ldquo;us&rdquo;) handles information submitted through this website. This site is
            intended for business-to-business communication with suppliers, distributors, and brand
            partners.
          </p>

          <h3>Information We Collect</h3>
          <p>We collect only the information you choose to submit through the contact form:</p>
          <ul>
            <li>Name</li>
            <li>Company (optional)</li>
            <li>Phone number (optional)</li>
            <li>Email address</li>
            <li>Your message</li>
          </ul>
          <p>
            This website does not use advertising or analytics cookies. As with most websites, the
            hosting provider may process standard technical information, such as IP addresses, to
            deliver the site.
          </p>

          <h3>How We Use Your Information</h3>
          <p>
            We use the information you submit to review and respond to your message, evaluate
            potential business relationships, and communicate with you about them.
          </p>

          <h3>How Information Is Shared</h3>
          <p>
            We do not sell your information. Form submissions are delivered to Metrohub through the
            service we use to receive website messages. We may also disclose information when
            required by law.
          </p>

          <h3>Retention</h3>
          <p>
            We keep contact form information only as long as reasonably needed to respond to you, manage
            any resulting business relationship, or meet legal obligations.
          </p>

          <h3>Your Choices</h3>
          <p>
            You may ask us to access, correct, or delete the information you submitted by contacting
            us using the details below.
          </p>

          <h3>Changes to This Policy</h3>
          <p>We may update this policy from time to time. The date above reflects the latest version.</p>

          <h3>Contact</h3>
          <p>
            {legalName}
            <br />
            {location.street}
            <br />
            {location.city}, {location.state} {location.postalCode}, {location.country}
            <br />
            {contact.email ? (
              <a href={'mailto:' + contact.email} className="-my-3 inline-block py-3 text-brand-blue underline underline-offset-4">
                {contact.email}
              </a>
            ) : (
              contact.emailPlaceholder
            )}
            <br />
            {contact.phone ? (
              <a href={'tel:' + contact.phoneE164} className="-my-3 inline-block py-3 text-brand-blue underline underline-offset-4">
                {contact.phone}
              </a>
            ) : (
              contact.phonePlaceholder
            )}
          </p>
        </div>
      </div>
    </dialog>
  )
}
