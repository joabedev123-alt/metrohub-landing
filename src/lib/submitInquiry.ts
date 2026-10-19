import { siteConfig } from '../config/site'

export type InquiryPayload = {
  name: string
  company: string
  phone: string
  email: string
  message: string
}

export class InquiryNotConfiguredError extends Error {
  constructor() {
    super('Form endpoint is not configured.')
    this.name = 'InquiryNotConfiguredError'
  }
}

const REQUEST_TIMEOUT_MS = 15000

/**
 * Sends a contact form message to VITE_FORM_ENDPOINT, or, when unset, to
 * FormSubmit (no server needed), which forwards it to the business email.
 * The first submission triggers a one-time activation email to that address.
 * Throws when the endpoint is missing or the request does not succeed, so the
 * UI never reports a delivery that did not happen.
 */
export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  const email = siteConfig.contact.email
  const endpoint =
    import.meta.env.VITE_FORM_ENDPOINT?.trim() || (email && `https://formsubmit.co/ajax/${email}`)
  if (!endpoint) throw new InquiryNotConfiguredError()

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...payload,
        _replyto: payload.email,
        _subject: `Website message from ${payload.name}${payload.company ? ` (${payload.company})` : ''}`,
      }),
      signal: controller.signal,
    })
    if (!response.ok) {
      throw new Error(`Inquiry request failed with status ${response.status}.`)
    }
    // FormSubmit answers 200 with { success: "false" } when the form is not activated yet.
    const result = await response.json().catch(() => null)
    if (result?.success === false || result?.success === 'false') {
      throw new Error(result.message ?? 'Inquiry was rejected by the form service.')
    }
  } finally {
    window.clearTimeout(timeout)
  }
}
