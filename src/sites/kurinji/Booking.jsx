import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  addMonths,
  calendarLink,
  formatDate,
  inr,
  isBefore,
  isSameDay,
  makeReference,
  monthGrid,
  nightsBetween,
  startOfDay,
  toKey,
} from '../shared/dates'
import { useDialog } from '../shared/hooks'
import { Photo } from '../shared/img'
import {
  GST,
  TRANSFER_PRICE,
  arrivalTimes,
  brand,
  extras as extraList,
  nightState,
  quoteRoom,
  rooms,
  stayNights,
} from './data'

const STEPS = ['Dates', 'Room', 'Extras', 'Details']
const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const emptyGuest = { first: '', last: '', email: '', phone: '', arrival: arrivalTimes[1], requests: '', terms: false }

/**
 * The booking engine. Five screens in one overlay: dates (with nightly prices
 * and availability), room, extras, guest details, confirmation. The summary
 * rail on the right re-prices on every change.
 */
export default function Booking({ open, preset, onClose, onBooked }) {
  const ref = useDialog(open, onClose)
  const [step, setStep] = useState(0)
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [roomId, setRoomId] = useState(null)
  const [picked, setPicked] = useState({ walk: true })
  const [transfers, setTransfers] = useState(0)
  const [guest, setGuest] = useState(emptyGuest)
  const [errors, setErrors] = useState({})
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    if (!open) return
    setStep(0)
    setBooking(null)
    setErrors({})
    if (preset?.roomId) setRoomId(preset.roomId)
  }, [open, preset])

  const guests = adults + children
  const nights = from && to ? nightsBetween(from, to) : 0
  const room = rooms.find((r) => r.id === roomId) ?? null
  const quote = room && nights ? quoteRoom(room, from, to) : null

  // A room picked earlier may not suit new dates or a bigger party.
  useEffect(() => {
    if (!room || !nights) return
    if (!quote.available || room.sleeps < guests) setRoomId(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, guests])

  const lines = useMemo(() => {
    if (!quote) return []
    const out = [{ label: `${room.name} × ${nights} ${nights === 1 ? 'night' : 'nights'}`, amount: quote.total }]
    extraList.forEach((extra) => {
      if (!picked[extra.id] || extra.price === 0) return
      const amount = extra.id === 'dinner' ? extra.price * guests * nights : extra.price
      out.push({ label: extra.title, amount })
    })
    if (transfers > 0) {
      out.push({ label: `Airport transfer × ${transfers}`, amount: transfers * TRANSFER_PRICE })
    }
    return out
  }, [quote, room, nights, picked, transfers, guests])

  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0)
  const tax = Math.round(subtotal * GST)
  const total = subtotal + tax

  const weekendShort = nights === 1 && from && [5, 6].includes(from.getDay())
  const canContinue =
    step === 0 ? nights > 0 && !weekendShort : step === 1 ? Boolean(room) : true

  const updateGuest = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setGuest((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const confirm = () => {
    const next = {}
    if (guest.first.trim().length < 2) next.first = 'Please enter your first name.'
    if (guest.last.trim().length < 2) next.last = 'Please enter your surname.'
    if (!/^\S+@\S+\.\S+$/.test(guest.email)) next.email = 'We need a valid email to send your confirmation.'
    if (guest.phone.replace(/\D/g, '').length < 8) next.phone = 'A number we can reach you on while you travel.'
    if (!guest.terms) next.terms = 'Please accept the house terms to continue.'
    setErrors(next)
    if (Object.keys(next).length) return

    const record = {
      ref: makeReference('KH'),
      status: 'confirmed',
      from: toKey(from),
      to: toKey(to),
      nights,
      adults,
      children,
      roomId: room.id,
      roomName: room.name,
      lines,
      tax,
      total,
      guest: { ...guest, first: guest.first.trim(), last: guest.last.trim() },
      createdAt: Date.now(),
    }
    setBooking(record)
    onBooked(record)
    setStep(4)
  }

  const next = () => {
    if (step === 3) confirm()
    else setStep((s) => s + 1)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          className="engine"
          role="dialog"
          aria-modal="true"
          aria-label="Book your stay"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
        >
          <header className="engine__bar">
            <span className="engine__brand">{brand.name}</span>

            {step < 4 && (
              <ol className="steps" aria-label="Booking progress">
                {STEPS.map((label, i) => (
                  <li key={label} className={i === step ? 'is-current' : i < step ? 'is-done' : undefined}>
                    <button
                      type="button"
                      disabled={i >= step}
                      aria-current={i === step ? 'step' : undefined}
                      onClick={() => setStep(i)}
                    >
                      <span>{i + 1}</span>
                      {label}
                    </button>
                  </li>
                ))}
              </ol>
            )}

            <button type="button" className="engine__close" onClick={onClose}>
              Close <span aria-hidden="true">✕</span>
            </button>
          </header>

          {step === 4 && booking ? (
            <Confirmed booking={booking} onClose={onClose} />
          ) : (
            <div className="engine__body">
              <div className="engine__main">
                {step === 0 && (
                  <DatesStep
                    from={from}
                    to={to}
                    onRange={(a, b) => {
                      setFrom(a)
                      setTo(b)
                    }}
                    adults={adults}
                    kids={children}
                    onAdults={setAdults}
                    onChildren={setChildren}
                    weekendShort={weekendShort}
                  />
                )}

                {step === 1 && (
                  <RoomStep from={from} to={to} guests={guests} roomId={roomId} onPick={setRoomId} />
                )}

                {step === 2 && (
                  <ExtrasStep
                    picked={picked}
                    onToggle={(id) => setPicked((prev) => ({ ...prev, [id]: !prev[id] }))}
                    transfers={transfers}
                    onTransfers={setTransfers}
                    guests={guests}
                    nights={nights}
                  />
                )}

                {step === 3 && <DetailsStep guest={guest} errors={errors} onChange={updateGuest} />}
              </div>

              <aside className="rail" aria-label="Your stay">
                <h2>Your stay</h2>

                <dl className="rail__facts">
                  <div>
                    <dt>Arrive</dt>
                    <dd>{from ? formatDate(from) : '—'}</dd>
                  </div>
                  <div>
                    <dt>Leave</dt>
                    <dd>{to ? formatDate(to) : '—'}</dd>
                  </div>
                  <div>
                    <dt>Guests</dt>
                    <dd>
                      {adults} {adults === 1 ? 'adult' : 'adults'}
                      {children > 0 && `, ${children} ${children === 1 ? 'child' : 'children'}`}
                    </dd>
                  </div>
                </dl>

                {lines.length > 0 ? (
                  <>
                    <ul className="rail__lines">
                      {lines.map((line) => (
                        <li key={line.label}>
                          <span>{line.label}</span>
                          <span>{inr(line.amount)}</span>
                        </li>
                      ))}
                      <li>
                        <span>Taxes (GST 12%)</span>
                        <span>{inr(tax)}</span>
                      </li>
                    </ul>
                    <p className="rail__total">
                      <span>Total</span>
                      <b>{inr(total)}</b>
                    </p>
                    <p className="rail__fine">Breakfast and veranda tea are always included.</p>
                  </>
                ) : (
                  <p className="rail__fine">
                    {nights > 0
                      ? 'Choose a room to see your total.'
                      : 'Pick your arrival and departure dates to see what is free.'}
                  </p>
                )}

                <button type="button" className="pill pill--solid pill--block" disabled={!canContinue} onClick={next}>
                  {step === 3 ? 'Confirm booking' : step === 0 ? 'See available rooms' : 'Continue'}
                </button>
                {step === 3 && <p className="rail__fine">No card needed — you pay at the house.</p>}
              </aside>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ------------------------------------------------------------------- Dates */

function DatesStep({ from, to, onRange, adults, kids, onAdults, onChildren, weekendShort }) {
  const today = useMemo(() => startOfDay(), [])
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [hover, setHover] = useState(null)
  const [warning, setWarning] = useState('')

  const pick = (day) => {
    setWarning('')
    // First click, or starting again after a complete range.
    if (!from || to || !isBefore(from, day)) {
      if (nightState(day).state === 'sold') {
        setWarning('The house is full that night. Try the day after, or leave that morning instead.')
        return
      }
      onRange(day, null)
      return
    }
    // Second click: every night in between must have a room.
    const blocked = stayNights(from, day).find((night) => nightState(night).state === 'sold')
    if (blocked) {
      setWarning(`We are full on ${formatDate(blocked)}. Choose a shorter stay or different dates.`)
      return
    }
    onRange(from, day)
  }

  const months = [cursor, addMonths(cursor, 1)]
  const atStart = cursor.getFullYear() === today.getFullYear() && cursor.getMonth() === today.getMonth()
  const previewEnd = from && !to && hover && isBefore(from, hover) ? hover : to

  return (
    <section>
      <h1 className="engine__title">How long would you like to stay?</h1>
      <p className="engine__lede">
        Prices are per night for the least expensive room still free. Select your arrival, then your
        departure.
      </p>

      <div className="cal">
        <div className="cal__nav">
          <button type="button" onClick={() => setCursor(addMonths(cursor, -1))} disabled={atStart} aria-label="Earlier months">
            ←
          </button>
          <button type="button" onClick={() => setCursor(addMonths(cursor, 1))} aria-label="Later months">
            →
          </button>
        </div>

        <div className="cal__months" onMouseLeave={() => setHover(null)}>
          {months.map((month) => (
            <div className="cal__month" key={month.getTime()}>
              <h2>{formatDate(month, { month: 'long', year: 'numeric' })}</h2>
              <div className="cal__grid" role="grid">
                {WEEKDAYS.map((d) => (
                  <span className="cal__dow" key={d} aria-hidden="true">
                    {d}
                  </span>
                ))}
                {monthGrid(month.getFullYear(), month.getMonth()).map((day, i) => {
                  if (!day) return <span key={`pad-${i}`} />
                  const past = isBefore(day, today)
                  const night = nightState(day)
                  const isFrom = isSameDay(day, from)
                  const isTo = isSameDay(day, previewEnd)
                  const inRange = from && previewEnd && isBefore(from, day) && isBefore(day, previewEnd)
                  // A sold-out night can still be a departure day.
                  const departureOnly = night.state === 'sold' && from && !to && isBefore(from, day)
                  const disabled = past || (night.state === 'sold' && !departureOnly)

                  return (
                    <button
                      type="button"
                      key={day.getTime()}
                      role="gridcell"
                      className={[
                        'cal__day',
                        isFrom && 'is-from',
                        isTo && 'is-to',
                        inRange && 'is-between',
                        night.state === 'sold' && 'is-sold',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      disabled={disabled}
                      aria-pressed={isFrom || isTo}
                      aria-label={`${formatDate(day, { weekday: 'long', day: 'numeric', month: 'long' })}${
                        night.from ? `, from ${inr(night.from)}` : ', full'
                      }`}
                      onClick={() => pick(day)}
                      onMouseEnter={() => setHover(day)}
                      onFocus={() => setHover(day)}
                    >
                      <b>{day.getDate()}</b>
                      {!past && (
                        <small>{night.from ? `${(night.from / 1000).toFixed(1)}k` : 'Full'}</small>
                      )}
                      {!past && night.state === 'few' && <i aria-hidden="true" />}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <ul className="cal__legend">
          <li>
            <i className="dot dot--few" /> Two rooms or fewer left
          </li>
          <li>
            <i className="dot dot--sold" /> House full
          </li>
          <li>Prices in ₹ thousands, per night</li>
        </ul>
      </div>

      <div aria-live="polite">
        {warning && <p className="notice">{warning}</p>}
        {weekendShort && (
          <p className="notice">Weekend stays are two nights or more. Add a night to continue.</p>
        )}
      </div>

      <div className="party">
        <Counter label="Adults" hint="Aged 13 and over" value={adults} min={1} max={4} onChange={onAdults} />
        <Counter label="Children" hint="Under 13 · under 6 stay free" value={kids} min={0} max={3} onChange={onChildren} />
      </div>
    </section>
  )
}

function Counter({ label, hint, value, min, max, onChange }) {
  return (
    <div className="counter">
      <div>
        <b>{label}</b>
        <span>{hint}</span>
      </div>
      <div className="counter__ctl" role="group" aria-label={label}>
        <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Fewer ${label.toLowerCase()}`}>
          −
        </button>
        <output aria-live="polite">{value}</output>
        <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`More ${label.toLowerCase()}`}>
          +
        </button>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------- Room */

function RoomStep({ from, to, guests, roomId, onPick }) {
  const options = rooms.map((room) => ({ room, quote: quoteRoom(room, from, to) }))
  const nights = nightsBetween(from, to)

  return (
    <section>
      <h1 className="engine__title">Choose your room</h1>
      <p className="engine__lede">
        {formatDate(from)} to {formatDate(to)} · {nights} {nights === 1 ? 'night' : 'nights'} · {guests}{' '}
        {guests === 1 ? 'guest' : 'guests'}
      </p>

      <ul className="choices">
        {options.map(({ room, quote }) => {
          const tooSmall = room.sleeps < guests
          const unavailable = !quote.available || tooSmall
          const selected = room.id === roomId

          return (
            <li key={room.id} className={`choice${selected ? ' is-selected' : ''}${unavailable ? ' is-off' : ''}`}>
              <div className="choice__photo">
                <Photo id={room.photo} alt={room.name} ratio={4 / 3} widths={[320, 560]} sizes="220px" />
              </div>
              <div className="choice__body">
                <h2>{room.name}</h2>
                <p className="choice__meta">
                  {room.size} m² · {room.bed} · {room.view} · sleeps {room.sleeps}
                </p>
                <p className="choice__blurb">{room.blurb}</p>
              </div>
              <div className="choice__buy">
                {unavailable ? (
                  <p className="choice__off">
                    {tooSmall ? `Sleeps ${room.sleeps} at most` : 'Not free for these dates'}
                  </p>
                ) : (
                  <>
                    <p className="choice__price">
                      {inr(quote.total)}
                      <span>
                        {inr(Math.round(quote.total / quote.nights))} a night on average
                      </span>
                    </p>
                    <button
                      type="button"
                      className={`pill${selected ? ' pill--solid' : ''}`}
                      aria-pressed={selected}
                      onClick={() => onPick(room.id)}
                    >
                      {selected ? 'Selected' : 'Select'}
                    </button>
                  </>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ Extras */

function ExtrasStep({ picked, onToggle, transfers, onTransfers, guests, nights }) {
  return (
    <section>
      <h1 className="engine__title">Anything to add?</h1>
      <p className="engine__lede">All optional, and all changeable once you are here.</p>

      <ul className="addons">
        {extraList.map((extra) => {
          const on = Boolean(picked[extra.id])
          const amount = extra.id === 'dinner' ? extra.price * guests * nights : extra.price
          return (
            <li key={extra.id} className={on ? 'is-on' : undefined}>
              <div>
                <h2>{extra.title}</h2>
                <p>{extra.note}</p>
              </div>
              <p className="addons__price">
                {extra.price === 0 ? 'Included' : inr(amount)}
                {extra.price > 0 && <span>{inr(extra.price)} {extra.unit}</span>}
              </p>
              <button type="button" className={`pill${on ? ' pill--solid' : ''}`} aria-pressed={on} onClick={() => onToggle(extra.id)}>
                {on ? 'Added' : 'Add'}
              </button>
            </li>
          )
        })}

        <li className={transfers > 0 ? 'is-on' : undefined}>
          <div>
            <h2>Coimbatore airport transfer</h2>
            <p>A car and a driver who knows the thirty-six hairpins. 2 h 30 each way.</p>
          </div>
          <p className="addons__price">
            {transfers > 0 ? inr(transfers * TRANSFER_PRICE) : inr(TRANSFER_PRICE)}
            <span>{inr(TRANSFER_PRICE)} each way</span>
          </p>
          <div className="counter__ctl" role="group" aria-label="Airport transfers">
            <button type="button" onClick={() => onTransfers(transfers - 1)} disabled={transfers <= 0} aria-label="Fewer transfers">
              −
            </button>
            <output aria-live="polite">{transfers}</output>
            <button type="button" onClick={() => onTransfers(transfers + 1)} disabled={transfers >= 2} aria-label="More transfers">
              +
            </button>
          </div>
        </li>
      </ul>
    </section>
  )
}

/* ----------------------------------------------------------------- Details */

function DetailsStep({ guest, errors, onChange }) {
  return (
    <section>
      <h1 className="engine__title">Who is coming to stay?</h1>
      <p className="engine__lede">We will send the confirmation and directions to this address.</p>

      <div className="form">
        <Input label="First name" error={errors.first}>
          <input data-autofocus type="text" autoComplete="given-name" value={guest.first} onChange={onChange('first')} aria-invalid={Boolean(errors.first)} />
        </Input>
        <Input label="Surname" error={errors.last}>
          <input type="text" autoComplete="family-name" value={guest.last} onChange={onChange('last')} aria-invalid={Boolean(errors.last)} />
        </Input>
        <Input label="Email" error={errors.email}>
          <input type="email" autoComplete="email" value={guest.email} onChange={onChange('email')} aria-invalid={Boolean(errors.email)} />
        </Input>
        <Input label="Phone" error={errors.phone}>
          <input type="tel" autoComplete="tel" value={guest.phone} onChange={onChange('phone')} aria-invalid={Boolean(errors.phone)} />
        </Input>
        <Input label="Arriving around">
          <select value={guest.arrival} onChange={onChange('arrival')}>
            {arrivalTimes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Input>
        <Input label="Anything we should know" wide optional>
          <textarea rows={3} value={guest.requests} onChange={onChange('requests')} placeholder="Diets, an anniversary, a dog, a fear of heights…" />
        </Input>
      </div>

      <label className={`agree${errors.terms ? ' has-error' : ''}`}>
        <input type="checkbox" checked={guest.terms} onChange={onChange('terms')} />
        <span>
          I have read the house terms: free cancellation until seven days before arrival, and the first
          night charged after that.
        </span>
      </label>
      {errors.terms && <p className="input__error">{errors.terms}</p>}
    </section>
  )
}

export function Input({ label, error, wide, optional, children }) {
  return (
    <label className={`input${wide ? ' input--wide' : ''}${error ? ' has-error' : ''}`}>
      <span className="input__label">
        {label}
        {optional && <i>Optional</i>}
      </span>
      {children}
      {error && <span className="input__error">{error}</span>}
    </label>
  )
}

/* --------------------------------------------------------------- Confirmed */

function Confirmed({ booking, onClose }) {
  const from = new Date(`${booking.from}T14:00:00`)
  const to = new Date(`${booking.to}T11:00:00`)

  return (
    <div className="done">
      <p className="done__kicker">Booking confirmed</p>
      <h1 className="done__title">We’ll light the fire, {booking.guest.first}.</h1>
      <p className="done__lede">
        Your room is held. A confirmation with directions is on its way to {booking.guest.email}.
      </p>

      <div className="done__card">
        <p className="done__ref">
          <span>Reference</span>
          {booking.ref}
        </p>
        <dl>
          <div>
            <dt>Room</dt>
            <dd>{booking.roomName}</dd>
          </div>
          <div>
            <dt>Arrive</dt>
            <dd>{formatDate(from, { weekday: 'long', day: 'numeric', month: 'long' })}, from 2 pm</dd>
          </div>
          <div>
            <dt>Leave</dt>
            <dd>{formatDate(to, { weekday: 'long', day: 'numeric', month: 'long' })}, by 11 am</dd>
          </div>
          <div>
            <dt>Guests</dt>
            <dd>
              {booking.adults + booking.children} · {booking.nights} {booking.nights === 1 ? 'night' : 'nights'}
            </dd>
          </div>
          <div>
            <dt>To pay at the house</dt>
            <dd>{inr(booking.total)}</dd>
          </div>
        </dl>
      </div>

      <div className="done__actions">
        <a
          className="pill pill--solid"
          download="kurinji-house-stay.ics"
          href={calendarLink({
            title: `Stay at ${brand.name}`,
            start: from,
            end: to,
            location: brand.address.join(', '),
            description: `Reference ${booking.ref} · ${booking.roomName}`,
          })}
        >
          Add to calendar
        </a>
        <button type="button" className="pill" onClick={() => window.print()}>
          Print
        </button>
        <button type="button" className="pill" onClick={onClose}>
          Back to the house
        </button>
      </div>

      <p className="done__fine">
        Need to change something? Use “Manage a booking” at the foot of the page with your reference, or
        call {brand.phone}. Arriving after dark? Tell us — the last four kilometres are unlit, and we
        will send someone down to meet you.
      </p>
    </div>
  )
}
