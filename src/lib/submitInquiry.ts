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
 * Sends a contact form message to the endpoint defined in VITE_FORM_ENDPOINT.
 * Throws when the endpoint is missing or the request does not succeed, so the
 * UI never reports a delivery that did not happen.
 */
export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT?.trim()
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
  } finally {
    window.clearTimeout(timeout)
  }
}
