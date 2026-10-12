import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  addDays,
  calendarLink,
  formatDate,
  fromKey,
  isSameDay,
  makeReference,
  startOfDay,
  toKey,
} from '../shared/dates'
import { useDialog } from '../shared/hooks'
import { brand, occasions } from './data'
import { friendlyTime, isClosedOn, slotsFor, toMinutes } from './util'
import { Close } from './icons'

const GUESTS = [1, 2, 3, 4, 5, 6, 7, 8]
const emptyForm = { name: '', phone: '', email: '', occasion: occasions[0], notes: '', terms: false }

/**
 * Table booking, as a side drawer. Guests → date → time are chosen in place;
 * contact details follow; the drawer ends on a confirmation that survives a
 * reload so the visitor can come back to it.
 */
export default function Reserve({ open, preset, reservation, onReservation, onClose }) {
  const ref = useDialog(open, onClose)
  const [step, setStep] = useState('pick')
  const [guests, setGuests] = useState(2)
  const [date, setDate] = useState(() => firstOpenDay())
  const [time, setTime] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [confirmCancel, setConfirmCancel] = useState(false)

  // Each time the drawer opens, start from the right place.
  useEffect(() => {
    if (!open) return
    setErrors({})
    setConfirmCancel(false)
    if (preset) {
      setStep('pick')
      setDate(startOfDay(preset.date))
      setTime(preset.time ?? null)
      setForm((prev) => ({ ...prev, notes: preset.note ? `Booking for: ${preset.note}` : prev.notes }))
    } else {
      setStep(reservation ? 'done' : 'pick')
    }
  }, [open, preset, reservation])

  const days = useMemo(() => Array.from({ length: 21 }, (_, i) => addDays(startOfDay(), i)), [])
  const sittings = useMemo(() => slotsFor(date, guests), [date, guests])

  // A slot that was free for two may be gone for six — drop a stale choice.
  useEffect(() => {
    if (!time) return
    const stillThere = sittings.some((s) => s.times.some((t) => t.time === time && t.state !== 'full'))
    if (!stillThere) setTime(null)
  }, [sittings, time])

  const update = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const submit = (event) => {
    event.preventDefault()
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Tell us who the table is for.'
    if (form.phone.replace(/\D/g, '').length < 8) next.phone = 'We need a number to reach you on the day.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'That email does not look right.'
    if (!form.terms) next.terms = 'Please accept the booking terms.'
    setErrors(next)
    if (Object.keys(next).length) return

    onReservation({
      ref: makeReference('MC'),
      dateKey: toKey(date),
      time,
      guests,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      occasion: form.occasion,
      notes: form.notes.trim(),
    })
    setStep('done')
  }

  const startOver = () => {
    onReservation(null)
    setForm(emptyForm)
    setTime(null)
    setConfirmCancel(false)
    setStep('pick')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="scrim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.aside
            ref={ref}
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reserve-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0, 0, 0.2, 1] }}
          >
            <header className="drawer__head">
              <h2 id="reserve-title">{step === 'done' ? 'Your table' : 'Book a table'}</h2>
              <button type="button" className="drawer__close" onClick={onClose} aria-label="Close booking">
                <Close />
              </button>
            </header>

            {step === 'pick' && (
              <div className="drawer__body">
                <section className="pick">
                  <h3>
                    Guests <span>{guests}</span>
                  </h3>
                  <div className="keypad">
                    {GUESTS.map((n) => (
                      <button
                        type="button"
                        key={n}
                        className={n === guests ? 'is-on' : undefined}
                        aria-pressed={n === guests}
                        onClick={() => setGuests(n)}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <p className="pick__hint">
                    Nine or more? Call <a href={`tel:${brand.phone.replace(/\s/g, '')}`}>{brand.phone}</a>{' '}
                    and we will push some tables together.
                  </p>
                </section>

                <section className="pick">
                  <h3>
                    Date <span>{formatDate(date)}</span>
                  </h3>
                  <div className="daystrip">
                    {days.map((day) => {
                      const closed = isClosedOn(day)
                      const selected = isSameDay(day, date)
                      return (
                        <button
                          type="button"
                          key={day.getTime()}
                          className={selected ? 'is-on' : undefined}
                          aria-pressed={selected}
                          disabled={closed}
                          onClick={() => {
                            setDate(day)
                            setTime(null)
                          }}
                        >
                          <span>{formatDate(day, { weekday: 'short' })}</span>
                          <b>{day.getDate()}</b>
                          <span>{closed ? 'Closed' : formatDate(day, { month: 'short' })}</span>
                        </button>
                      )
                    })}
                  </div>
                </section>

                <section className="pick">
                  <h3>
                    Time <span>{time ? friendlyTime(time) : 'Choose one'}</span>
                  </h3>
                  {sittings.length === 0 ? (
                    <p className="pick__hint">
                      Nothing left for this day. Try tomorrow — breakfast is the easy one.
                    </p>
                  ) : (
                    sittings.map((sitting) => (
                      <div className="sitting" key={sitting.id}>
                        <h4>{sitting.label}</h4>
                        <div className="slots">
                          {sitting.times.map((slot) => (
                            <button
                              type="button"
                              key={slot.time}
                              className={slot.time === time ? 'is-on' : undefined}
                              aria-pressed={slot.time === time}
                              disabled={slot.state === 'full'}
                              onClick={() => setTime(slot.time)}
                            >
                              {friendlyTime(slot.time)}
                              {slot.state === 'few' && <i>2 left</i>}
                              {slot.state === 'full' && <i>Full</i>}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </section>
              </div>
            )}

            {step === 'details' && (
              <form className="drawer__body" onSubmit={submit} noValidate>
                <Summary guests={guests} date={date} time={time} onEdit={() => setStep('pick')} />

                <Field label="Name" error={errors.name}>
                  <input
                    data-autofocus
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={update('name')}
                    aria-invalid={Boolean(errors.name)}
                  />
                </Field>
                <div className="fieldrow">
                  <Field label="Phone" error={errors.phone}>
                    <input
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      aria-invalid={Boolean(errors.phone)}
                    />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={update('email')}
                      aria-invalid={Boolean(errors.email)}
                    />
                  </Field>
                </div>
                <Field label="Occasion">
                  <select value={form.occasion} onChange={update('occasion')}>
                    {occasions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Anything we should know?" optional>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={update('notes')}
                    placeholder="Allergies, a high chair, a window seat…"
                  />
                </Field>

                <label className={`check${errors.terms ? ' has-error' : ''}`}>
                  <input type="checkbox" checked={form.terms} onChange={update('terms')} />
                  <span>We hold tables for 15 minutes. I’ll call if I’m running late.</span>
                </label>
                {errors.terms && <p className="field__error">{errors.terms}</p>}
              </form>
            )}

            {step === 'done' && reservation && (
              <div className="drawer__body">
                <div className="confirm">
                  <p className="confirm__kicker">Booked. See you soon, {reservation.name.split(' ')[0]}.</p>
                  <p className="confirm__ref">{reservation.ref}</p>
                  <dl className="confirm__list">
                    <div>
                      <dt>When</dt>
                      <dd>
                        {formatDate(fromKey(reservation.dateKey), {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                        })}
                        , {friendlyTime(reservation.time)}
                      </dd>
                    </div>
                    <div>
                      <dt>Table for</dt>
                      <dd>{reservation.guests}</dd>
                    </div>
                    <div>
                      <dt>Where</dt>
                      <dd>
                        {brand.address[0]}, {brand.address[1]}
                      </dd>
                    </div>
                    {reservation.notes && (
                      <div>
                        <dt>Notes</dt>
                        <dd>{reservation.notes}</dd>
                      </div>
                    )}
                  </dl>
                  <p className="confirm__note">
                    A confirmation is on its way to {reservation.email}. Quote the reference at the door.
                  </p>

                  <a
                    className="btn btn--light btn--block"
                    href={icsFor(reservation)}
                    download="marigold-canteen-table.ics"
                  >
                    Add to calendar
                  </a>

                  {confirmCancel ? (
                    <div className="confirm__cancel">
                      <p>Release this table?</p>
                      <button type="button" className="btn btn--light" onClick={startOver}>
                        Yes, cancel it
                      </button>
                      <button type="button" className="linkbtn" onClick={() => setConfirmCancel(false)}>
                        Keep it
                      </button>
                    </div>
                  ) : (
                    <button type="button" className="linkbtn" onClick={() => setConfirmCancel(true)}>
                      Cancel or change this booking
                    </button>
                  )}
                </div>
              </div>
            )}

            <footer className="drawer__foot">
              {step === 'pick' && (
                <button
                  type="button"
                  className="btn btn--light btn--block"
                  disabled={!time}
                  onClick={() => setStep('details')}
                >
                  {time
                    ? `Continue — ${guests} at ${friendlyTime(time)}`
                    : 'Pick a time to continue'}
                </button>
              )}
              {step === 'details' && (
                <button type="button" className="btn btn--light btn--block" onClick={submit}>
                  Confirm booking
                </button>
              )}
              {step === 'done' && (
                <button type="button" className="btn btn--light btn--block" onClick={onClose}>
                  Done
                </button>
              )}
            </footer>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Summary({ guests, date, time, onEdit }) {
  return (
    <div className="summary">
      <p>
        <b>{guests}</b> {guests === 1 ? 'guest' : 'guests'} · <b>{formatDate(date)}</b> ·{' '}
        <b>{friendlyTime(time)}</b>
      </p>
      <button type="button" className="linkbtn" onClick={onEdit}>
        Change
      </button>
    </div>
  )
}

export function Field({ label, error, optional, children }) {
  return (
    <label className={`field${error ? ' has-error' : ''}`}>
      <span className="field__label">
        {label}
        {optional && <i>Optional</i>}
      </span>
      {children}
      {error && <span className="field__error">{error}</span>}
    </label>
  )
}

function firstOpenDay() {
  let day = startOfDay()
  while (isClosedOn(day)) day = addDays(day, 1)
  return day
}

function icsFor(reservation) {
  const start = fromKey(reservation.dateKey)
  const minutes = toMinutes(reservation.time)
  start.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0)
  const end = new Date(start.getTime() + 90 * 60_000)
  return calendarLink({
    title: `Table for ${reservation.guests} at ${brand.name}`,
    start,
    end,
    location: brand.address.join(', '),
    description: `Reference ${reservation.ref}`,
  })
}
