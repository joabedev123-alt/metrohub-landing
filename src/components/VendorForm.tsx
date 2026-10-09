import { useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { siteConfig } from '../config/site'
import { InquiryNotConfiguredError, submitInquiry, type InquiryPayload } from '../lib/submitInquiry'
import { Icon } from './Icon'

type FieldName = keyof InquiryPayload
type Values = Record<FieldName, string>
type Errors = Partial<Record<FieldName, string>>
type Status = 'idle' | 'submitting' | 'success' | 'error'

type FieldConfig = {
  name: FieldName
  label: string
  type: 'text' | 'email' | 'tel'
  autoComplete: string
  autoCapitalize: string
  maxLength: number
  required: boolean
  multiline?: boolean
  fullWidth?: boolean
}

const FIELDS: FieldConfig[] = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', autoCapitalize: 'words', maxLength: 100, required: true },
  { name: 'company', label: 'Company', type: 'text', autoComplete: 'organization', autoCapitalize: 'words', maxLength: 120, required: false },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', autoCapitalize: 'off', maxLength: 30, required: false },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', autoCapitalize: 'off', maxLength: 160, required: true },
  {
    name: 'message',
    label: 'Message',
    type: 'text',
    autoComplete: 'off',
    autoCapitalize: 'sentences',
    maxLength: 2000,
    required: true,
    multiline: true,
    fullWidth: true,
  },
]

const EMPTY: Values = { name: '', company: '', phone: '', email: '', message: '' }
const MESSAGE_MIN_LENGTH = 10
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validateField(name: FieldName, raw: string): string | undefined {
  const value = raw.trim()
  switch (name) {
    case 'name':
      if (!value) return 'Enter your name.'
      if (value.length < 2) return 'Name must be at least 2 characters.'
      return
    case 'company':
      return
    case 'phone': {
      if (!value) return
      const digits = value.replace(/\D/g, '')
      if (!/^[\d\s()+.\-x]+$/i.test(value) || digits.length < 7 || digits.length > 15)
        return 'Enter a valid phone number, e.g. (914) 555-0100.'
      return
    }
    case 'email':
      if (!value) return 'Enter your email address.'
      if (!EMAIL_PATTERN.test(value)) return 'Enter a valid email address, e.g. name@company.com.'
      return
    case 'message':
      if (!value) return 'Enter your message.'
      if (value.length < MESSAGE_MIN_LENGTH)
        return `Your message must be at least ${MESSAGE_MIN_LENGTH} characters.`
      return
  }
}

function validateAll(values: Values): Errors {
  const errors: Errors = {}
  for (const field of FIELDS) {
    const error = validateField(field.name, values[field.name])
    if (error) errors[field.name] = error
  }
  return errors
}

export function VendorForm() {
  const formId = useId()
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const inFlight = useRef(false)
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLInputElement | HTMLTextAreaElement | null>>>({})
  const successRef = useRef<HTMLHeadingElement>(null)

  const fieldId = (name: FieldName) => `${formId}-${name}`

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name as FieldName
    const value = event.target.value
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (name: FieldName) => {
    setTouched((current) => ({ ...current, [name]: true }))
    if (touched[name] || values[name].trim()) {
      setErrors((current) => ({ ...current, [name]: validateField(name, values[name]) }))
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inFlight.current) return

    const nextErrors = validateAll(values)
    setErrors(nextErrors)
    setTouched({ name: true, company: true, phone: true, email: true, message: true })

    const firstInvalid = FIELDS.find((field) => nextErrors[field.name])
    if (firstInvalid) {
      const count = Object.keys(nextErrors).length
      setStatus('error')
      setStatusMessage(
        count === 1
          ? 'Please correct the highlighted field and try again.'
          : `Please correct the ${count} highlighted fields and try again.`,
      )
      fieldRefs.current[firstInvalid.name]?.focus()
      return
    }

    inFlight.current = true
    setStatus('submitting')
    setStatusMessage('Sending your message…')

    try {
      await submitInquiry({
        name: values.name.trim(),
        company: values.company.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      })
      setValues(EMPTY)
      setTouched({})
      setErrors({})
      setStatus('success')
      setStatusMessage('')
      requestAnimationFrame(() => successRef.current?.focus())
    } catch (error) {
      setStatus('error')
      if (error instanceof InquiryNotConfiguredError) {
        setStatusMessage(
          siteConfig.contact.email
            ? `The contact form is not available yet, so your message was not sent. Please email us at ${siteConfig.contact.email}.`
            : 'The contact form is not available yet, so your message was not sent. Your information has been kept on this page.',
        )
        if (import.meta.env.DEV) {
          console.warn('[VendorForm] VITE_FORM_ENDPOINT is not set. See .env.example.')
        }
      } else {
        setStatusMessage(
          'We could not send your message. Please check your connection and try again — your information has been kept.',
        )
      }
    } finally {
      inFlight.current = false
    }
  }

  if (status === 'success') {
    return (
      <div className="on-light flex min-h-[420px] flex-col items-start justify-center rounded-2xl bg-white p-8 text-ink sm:p-10" role="status">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/[0.08] text-2xl text-brand-blue">
          <Icon name="check2-circle" />
        </span>
        <h3 ref={successRef} tabIndex={-1} className="mt-6 text-2xl font-semibold tracking-[-0.01em] focus:outline-none">
          Thank you. Your message has been sent.
        </h3>
        <p className="mt-3 max-w-md leading-relaxed text-muted">
          Our team will review your message and get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle')
            requestAnimationFrame(() => fieldRefs.current.name?.focus())
          }}
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-xl border border-line px-5 text-sm font-semibold text-ink transition-colors hover:border-brand-blue/40 hover:text-brand-blue"
        >
          Send another message
        </button>
      </div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby={`${formId}-title`}
      aria-busy={submitting}
      className="on-light rounded-2xl bg-white p-5 text-ink min-[400px]:p-6 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] sm:p-9"
    >
      <h3 id={`${formId}-title`} className="text-xl font-semibold tracking-[-0.01em]">
        Get in Touch
      </h3>

      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {FIELDS.map((field) => {
          const id = fieldId(field.name)
          const error = touched[field.name] ? errors[field.name] : undefined
          const describedBy = error ? `${id}-error` : undefined
          const control =
            'w-full rounded-xl border bg-white px-4 text-base text-ink placeholder:text-[#8a8f9c] transition-[border-color,box-shadow] focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-mist ' +
            (error
              ? 'border-error focus:border-error focus:ring-4 focus:ring-error/15'
              : 'border-[#cfd5df] hover:border-[#b5bdcb] focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15')

          return (
            <div key={field.name} className={field.fullWidth ? 'sm:col-span-2' : ''}>
              <label htmlFor={id} className="mb-2 block text-[14px] font-medium text-ink">
                {field.label}
                {field.required && (
                  <span aria-hidden="true" className="ml-0.5 text-brand-blue">
                    *
                  </span>
                )}
              </label>
              {field.multiline ? (
                <textarea
                  id={id}
                  name={field.name}
                  ref={(node) => {
                    fieldRefs.current[field.name] = node
                  }}
                  rows={5}
                  required={field.required}
                  minLength={MESSAGE_MIN_LENGTH}
                  maxLength={field.maxLength}
                  autoComplete={field.autoComplete}
                  autoCapitalize={field.autoCapitalize}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={() => handleBlur(field.name)}
                  disabled={submitting}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy}
                  className={`${control} min-h-[140px] resize-y py-3 leading-relaxed`}
                />
              ) : (
                <input
                  id={id}
                  name={field.name}
                  type={field.type}
                  inputMode={field.type === 'tel' ? 'tel' : field.type === 'email' ? 'email' : undefined}
                  spellCheck={field.type === 'text'}
                  ref={(node) => {
                    fieldRefs.current[field.name] = node
                  }}
                  required={field.required}
                  maxLength={field.maxLength}
                  autoComplete={field.autoComplete}
                  autoCapitalize={field.autoCapitalize}
                  enterKeyHint="next"
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={() => handleBlur(field.name)}
                  disabled={submitting}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy}
                  className={`${control} h-12`}
                />
              )}
              {error && (
                <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-error">
                  <Icon name="exclamation-circle" />
                  {error}
                </p>
              )}
            </div>
          )
        })}
      </div>

      <div
        role={status === 'error' ? 'alert' : 'status'}
        aria-live={status === 'error' ? 'assertive' : 'polite'}
        className="empty:hidden"
      >
        {statusMessage && (
          <p
            className={`mt-6 flex gap-2.5 rounded-xl border px-4 py-3 text-[14px] leading-snug ${
              status === 'error'
                ? 'border-error/25 bg-error/[0.05] text-error'
                : 'border-line bg-mist text-muted'
            }`}
          >
            <Icon name={status === 'error' ? 'exclamation-triangle' : 'hourglass-split'} className="mt-0.5" />
            {statusMessage}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-7 inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-brand-blue px-6 text-[15px] font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.16)] transition-colors hover:bg-brand-blue-deep disabled:cursor-wait disabled:opacity-75 sm:w-auto"
      >
        {submitting ? (
          <>
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
              aria-hidden="true"
            />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <Icon name="send" />
          </>
        )}
      </button>
    </form>
  )
}
