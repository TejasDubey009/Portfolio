import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  addDays,
  calendarLink,
  formatDate,
  inr,
  isSameDay,
  makeReference,
  startOfDay,
} from '../shared/dates'
import { useDialog } from '../shared/hooks'
import { brand, friendlyDuration, friendlyTime, slotsFor, therapists } from './data'

const STEPS = ['Therapist', 'Time', 'Details']
const emptyForm = { name: '', email: '', phone: '', notes: '', first: false }

/**
 * Appointment booking. A wide step column on the left, a summary card on the
 * right that keeps the running total in view the whole way through.
 */
export default function Flow({ open, visit, onClose, onDone }) {
  const ref = useDialog(open, onClose)
  const [step, setStep] = useState(0)
  const [therapist, setTherapist] = useState('any')
  const [date, setDate] = useState(() => startOfDay())
  const [time, setTime] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [booking, setBooking] = useState(null)
  const strip = useRef(null)

  useEffect(() => {
    if (!open) return
    setStep(0)
    setTime(null)
    setErrors({})
    setBooking(null)
  }, [open])

  const days = useMemo(() => Array.from({ length: 21 }, (_, i) => addDays(startOfDay(), i)), [])
  const parts = useMemo(() => slotsFor(date, therapist), [date, therapist])
  const minutes = visit.reduce((sum, v) => sum + v.mins, 0)
  const total = visit.reduce((sum, v) => sum + v.price, 0)

  useEffect(() => {
    if (time && !parts.some((p) => p.times.includes(time))) setTime(null)
  }, [parts, time])

  const nextOpen = useMemo(() => {
    if (parts.length) return null
    return days.find((d) => d > date && slotsFor(d, therapist).length) ?? null
  }, [parts, days, date, therapist])

  const update = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const confirm = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Please enter a valid email address.'
    if (form.phone.replace(/\D/g, '').length < 8) next.phone = 'Please enter a phone number.'
    setErrors(next)
    if (Object.keys(next).length) return

    const [h, m] = time.split(':').map(Number)
    const start = new Date(date)
    start.setHours(h, m, 0, 0)
    setBooking({
      ref: makeReference('SW'),
      start,
      end: new Date(start.getTime() + minutes * 60_000),
      therapist: therapists.find((t) => t.id === therapist),
      name: form.name.trim().split(' ')[0],
      email: form.email.trim(),
      visit,
      total,
    })
    onDone()
  }

  const canContinue = step === 0 || (step === 1 && Boolean(time)) || step === 2
  const advance = () => (step === 2 ? confirm() : setStep((s) => s + 1))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          className="flow"
          role="dialog"
          aria-modal="true"
          aria-label="Book your visit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: [0, 0, 0.2, 1] }}
        >
          <header className="flow__bar">
            {booking ? (
              <span className="flow__crumbs">Confirmed</span>
            ) : (
              <ol className="flow__crumbs" aria-label="Booking steps">
                {STEPS.map((label, i) => (
                  <li key={label} className={i === step ? 'is-current' : undefined}>
                    <button type="button" disabled={i >= step} onClick={() => setStep(i)}>
                      {label}
                    </button>
                  </li>
                ))}
              </ol>
            )}
            <button type="button" className="textbtn" onClick={onClose}>
              Close
            </button>
          </header>

          {booking ? (
            <div className="flow__done">
              <p className="eyebrow">Your visit is booked</p>
              <h1 className="display">See you in the water, {booking.name}.</h1>
              <p className="lede">
                A confirmation has been sent to {booking.email}. Please arrive ten minutes early; the
                tea will be waiting.
              </p>
              <dl className="receipt">
                <div>
                  <dt>Reference</dt>
                  <dd>{booking.ref}</dd>
                </div>
                <div>
                  <dt>When</dt>
                  <dd>
                    {formatDate(booking.start, { weekday: 'long', day: 'numeric', month: 'long' })},{' '}
                    {friendlyTime(`${booking.start.getHours()}:${String(booking.start.getMinutes()).padStart(2, '0')}`)}
                  </dd>
                </div>
                <div>
                  <dt>With</dt>
                  <dd>{booking.therapist.id === 'any' ? 'First available therapist' : booking.therapist.name}</dd>
                </div>
                <div>
                  <dt>Your visit</dt>
                  <dd>{booking.visit.map((v) => v.name).join(', ')}</dd>
                </div>
                <div>
                  <dt>To pay on the day</dt>
                  <dd>{inr(booking.total)}</dd>
                </div>
              </dl>
              <div className="flow__actions">
                <a
                  className="btn"
                  download="stillwater-visit.ics"
                  href={calendarLink({
                    title: `${brand.name} — ${booking.visit[0].name}`,
                    start: booking.start,
                    end: booking.end,
                    location: brand.address.join(', '),
                    description: `Reference ${booking.ref}`,
                  })}
                >
                  Add to calendar
                </a>
                <button type="button" className="btn btn--ghost" onClick={onClose}>
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div className="flow__body">
              <div className="flow__main">
                {step === 0 && (
                  <section>
                    <h1 className="display display--sm">Who would you like to see?</h1>
                    <ul className="people">
                      {therapists.map((person) => (
                        <li key={person.id}>
                          <button
                            type="button"
                            className={person.id === therapist ? 'is-on' : undefined}
                            aria-pressed={person.id === therapist}
                            onClick={() => setTherapist(person.id)}
                          >
                            <span className="people__mark" aria-hidden="true">
                              {person.id === 'any' ? '∗' : person.name[0]}
                            </span>
                            <span>
                              <b>{person.name}</b>
                              <small>{person.note}</small>
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {step === 1 && (
                  <section>
                    <h1 className="display display--sm">Select a time</h1>
                    <p className="flow__month">{formatDate(date, { month: 'long', year: 'numeric' })}</p>

                    <div className="dates" ref={strip}>
                      {days.map((day) => {
                        const on = isSameDay(day, date)
                        return (
                          <button
                            type="button"
                            key={day.getTime()}
                            className={on ? 'is-on' : undefined}
                            aria-pressed={on}
                            aria-label={formatDate(day, { weekday: 'long', day: 'numeric', month: 'long' })}
                            onClick={() => setDate(day)}
                          >
                            <b>{day.getDate()}</b>
                            <span>{formatDate(day, { weekday: 'short' })}</span>
                          </button>
                        )
                      })}
                    </div>

                    <div aria-live="polite">
                      {parts.length === 0 ? (
                        <div className="fullday">
                          <p>
                            <b>{formatDate(date, { weekday: 'long', day: 'numeric', month: 'long' })} is fully booked.</b>
                          </p>
                          {nextOpen && (
                            <button type="button" className="btn btn--ghost" onClick={() => setDate(nextOpen)}>
                              Go to next available — {formatDate(nextOpen)}
                            </button>
                          )}
                        </div>
                      ) : (
                        parts.map((part) => (
                          <div className="daypart" key={part.id}>
                            <h2>{part.label}</h2>
                            <div>
                              {part.times.map((slot) => (
                                <button
                                  type="button"
                                  key={slot}
                                  className={slot === time ? 'is-on' : undefined}
                                  aria-pressed={slot === time}
                                  onClick={() => setTime(slot)}
                                >
                                  {friendlyTime(slot)}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </section>
                )}

                {step === 2 && (
                  <section>
                    <h1 className="display display--sm">Your details</h1>
                    <div className="fields">
                      <Line label="Full name" error={errors.name}>
                        <input data-autofocus type="text" autoComplete="name" value={form.name} onChange={update('name')} aria-invalid={Boolean(errors.name)} />
                      </Line>
                      <Line label="Email" error={errors.email}>
                        <input type="email" autoComplete="email" value={form.email} onChange={update('email')} aria-invalid={Boolean(errors.email)} />
                      </Line>
                      <Line label="Phone" error={errors.phone}>
                        <input type="tel" autoComplete="tel" value={form.phone} onChange={update('phone')} aria-invalid={Boolean(errors.phone)} />
                      </Line>
                      <Line label="Anything we should know" wide>
                        <textarea rows={3} value={form.notes} onChange={update('notes')} placeholder="Injuries, allergies, pressure you prefer…" />
                      </Line>
                    </div>
                    <label className="tick">
                      <input type="checkbox" checked={form.first} onChange={update('first')} />
                      <span>This is my first visit — please show me round.</span>
                    </label>
                    <p className="fine">
                      Move or cancel free of charge up to 12 hours before your visit. No card needed to
                      book; you pay at the desk.
                    </p>
                  </section>
                )}
              </div>

              <aside className="ticket" aria-label="Your visit">
                <h2>Your visit</h2>
                <ul>
                  {visit.map((item) => (
                    <li key={item.key}>
                      <span>
                        {item.name}
                        <small>{friendlyDuration(item.mins)}</small>
                      </span>
                      <span>{inr(item.price)}</span>
                    </li>
                  ))}
                </ul>
                <dl>
                  <div>
                    <dt>With</dt>
                    <dd>{therapists.find((t) => t.id === therapist).name}</dd>
                  </div>
                  <div>
                    <dt>When</dt>
                    <dd>{time ? `${formatDate(date)}, ${friendlyTime(time)}` : 'Not chosen yet'}</dd>
                  </div>
                  <div>
                    <dt>Time in house</dt>
                    <dd>{friendlyDuration(minutes)}</dd>
                  </div>
                </dl>
                <p className="ticket__total">
                  <span>Total</span>
                  <b>{inr(total)}</b>
                </p>
                <button type="button" className="btn btn--block" disabled={!canContinue} onClick={advance}>
                  {step === 2 ? 'Confirm booking' : 'Continue'}
                </button>
              </aside>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Line({ label, error, wide, children }) {
  return (
    <label className={`line${wide ? ' line--wide' : ''}${error ? ' has-error' : ''}`}>
      <span>{label}</span>
      {children}
      {error && <em>{error}</em>}
    </label>
  )
}
