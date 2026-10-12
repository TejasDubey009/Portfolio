import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PortfolioBadge from '../shared/PortfolioBadge'
import { Photo } from '../shared/img'
import { addDays, formatDate, fromKey, inr, startOfDay } from '../shared/dates'
import { useDialog, useInView, useLocalStorage } from '../shared/hooks'
import {
  brand,
  cancelReasons,
  days,
  facts,
  faqs,
  journeys,
  notes,
  photos,
  rooms,
  seasons,
} from './data'
import Booking, { Input } from './Booking'

export default function App() {
  const [bookings, setBookings] = useLocalStorage('kurinji:bookings', [])
  const [engine, setEngine] = useState({ open: false, preset: null })
  const [roomOpen, setRoomOpen] = useState(null)

  const book = (preset = null) => {
    setRoomOpen(null)
    setEngine({ open: true, preset })
  }

  return (
    <>
      <Nav onBook={() => book()} />

      <main>
        <Hero onBook={() => book()} />
        <Intro />
        <Rooms onView={setRoomOpen} onBook={book} />
        <Days />
        <Table />
        <Journey />
        <GuestBook />
        <Faq />
      </main>

      <Footer
        bookings={bookings}
        onCancel={(ref, reason) =>
          setBookings((prev) =>
            prev.map((b) => (b.ref === ref ? { ...b, status: 'cancelled', reason } : b)),
          )
        }
        onBook={() => book()}
      />

      <RoomSheet room={roomOpen} onClose={() => setRoomOpen(null)} onBook={book} />
      <Booking
        open={engine.open}
        preset={engine.preset}
        onClose={() => setEngine({ open: false, preset: null })}
        onBooked={(record) => setBookings((prev) => [record, ...prev])}
      />

      <PortfolioBadge />
    </>
  )
}

/** Fades content up a few pixels the first time it scrolls into view. */
function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag ref={ref} className={`reveal${inView ? ' is-in' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

/* --------------------------------------------------------------------- Nav */

function Nav({ onBook }) {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${solid ? ' is-solid' : ''}`}>
      <div className="wrap nav__inner">
        <a className="nav__brand" href="#top">
          Kurinji House
        </a>
        <nav className="nav__links" aria-label="Sections">
          <a href="#house">The house</a>
          <a href="#rooms">Rooms</a>
          <a href="#days">Days here</a>
          <a href="#table">The table</a>
          <a href="#journey">Getting here</a>
        </nav>
        <button type="button" className="pill pill--nav" onClick={onBook}>
          Check availability
        </button>
      </div>
    </header>
  )
}

/* -------------------------------------------------------------------- Hero */

function Hero({ onBook }) {
  const arrive = addDays(startOfDay(), 14)
  const leave = addDays(arrive, 3)

  return (
    <section className="hero" id="top">
      <Photo
        className="hero__img"
        id={photos.hero}
        alt="Tea gardens rolling over misty hills in early light"
        ratio={16 / 9}
        widths={[800, 1400, 2200]}
        sizes="100vw"
        eager
      />
      <div className="hero__veil" aria-hidden="true" />

      <div className="wrap hero__inner">
        <p className="label label--light">{brand.place} · since 1924</p>
        <h1 className="hero__title">A planter’s bungalow, kept the way it was.</h1>
        <p className="hero__lede">
          Five rooms on a working tea estate above Coonoor. 1,850 metres up, wood fires at dusk, and
          nothing on the schedule unless you ask.
        </p>
      </div>

      <div className="wrap">
        <button type="button" className="quickbook" onClick={onBook} aria-label="Check availability">
          <span>
            <small>Arrive</small>
            {formatDate(arrive)}
          </span>
          <span>
            <small>Leave</small>
            {formatDate(leave)}
          </span>
          <span>
            <small>Guests</small>2 adults
          </span>
          <span className="quickbook__go">Check availability →</span>
        </button>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- Intro */

function Intro() {
  return (
    <section className="intro" id="house">
      <div className="wrap intro__grid">
        <Reveal className="intro__copy">
          <p className="label">The house</p>
          <h2 className="h2">Built for the estate manager. Never really modernised — on purpose.</h2>
          <p className="body">
            The floors still creak, the bathtubs are still cast iron, and tea is still served on the
            veranda at four. We added better mattresses, hot water that actually arrives, and Wi-Fi
            that reaches most of the house. The rest we have left alone for a hundred years.
          </p>
          <p className="body">
            The Achaiah family has kept the house since 1971. Three generations of us still live at
            the bottom of the drive, which is why dinner tastes like somebody’s grandmother made it.
          </p>

          <dl className="facts">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dd>{fact.value}</dd>
                <dt>{fact.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="intro__photos">
          <div className="intro__photo intro__photo--a">
            <Photo
              id={photos.house}
              alt="The bungalow seen across its lawn, with a deep veranda and tiled roof"
              ratio={4 / 5}
              widths={[480, 800, 1100]}
              sizes="(max-width: 900px) 80vw, 36vw"
            />
          </div>
          <div className="intro__photo intro__photo--b">
            <Photo
              id={photos.veranda}
              alt="Two cane chairs and a table on the white-painted veranda"
              ratio={1}
              widths={[320, 560, 800]}
              sizes="(max-width: 900px) 50vw, 22vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- Rooms */

function Rooms({ onView, onBook }) {
  return (
    <section className="rooms" id="rooms">
      <div className="wrap">
        <Reveal className="sectionhead">
          <p className="label">Rooms</p>
          <h2 className="h2">Five rooms. No two alike, and no room numbers.</h2>
        </Reveal>

        <ul className="rooms__list">
          {rooms.map((room, i) => (
            <Reveal as="li" className={`room${i % 2 ? ' room--flip' : ''}`} key={room.id}>
              <button type="button" className="room__photo" onClick={() => onView(room)} aria-label={`View ${room.name}`}>
                <Photo
                  id={room.photo}
                  alt={`${room.name}: ${room.bed.toLowerCase()} bed`}
                  ratio={3 / 2}
                  widths={[480, 800, 1200]}
                  sizes="(max-width: 900px) 100vw, 55vw"
                />
              </button>
              <div className="room__copy">
                <p className="room__no">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="h3">{room.name}</h3>
                <p className="room__meta">
                  {room.size} m² · {room.bed} · {room.view} · Sleeps {room.sleeps}
                </p>
                <p className="body">{room.blurb}</p>
                <p className="room__rate">
                  From <b>{inr(room.base)}</b> a night, breakfast included
                </p>
                <div className="room__actions">
                  <button type="button" className="pill" onClick={() => onBook({ roomId: room.id })}>
                    Check dates
                  </button>
                  <button type="button" className="textlink" onClick={() => onView(room)}>
                    See the room
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function RoomSheet({ room, onClose, onBook }) {
  const open = Boolean(room)
  const ref = useDialog(open, onClose)
  const [shot, setShot] = useState(0)

  useEffect(() => setShot(0), [room])

  return (
    <AnimatePresence>
      {room && (
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
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0, 0, 0.2, 1] }}
          >
            <button type="button" className="sheet__close" onClick={onClose}>
              Close <span aria-hidden="true">✕</span>
            </button>

            <div className="sheet__gallery">
              <Photo
                key={room.gallery[shot]}
                id={room.gallery[shot]}
                alt={`${room.name}, view ${shot + 1}`}
                ratio={3 / 2}
                widths={[600, 1000]}
                sizes="(max-width: 700px) 100vw, 560px"
                eager
              />
              <div className="sheet__thumbs">
                {room.gallery.map((id, i) => (
                  <button
                    type="button"
                    key={id}
                    className={i === shot ? 'is-on' : undefined}
                    aria-label={`Photo ${i + 1} of ${room.gallery.length}`}
                    aria-pressed={i === shot}
                    onClick={() => setShot(i)}
                  >
                    <Photo id={id} alt="" ratio={1} widths={[120]} sizes="64px" />
                  </button>
                ))}
              </div>
            </div>

            <div className="sheet__body">
              <h2 className="h3" id="sheet-title">
                {room.name}
              </h2>
              <p className="room__meta">
                {room.size} m² · {room.bed} · {room.view} · Sleeps {room.sleeps}
              </p>
              <p className="body">{room.blurb}</p>

              <h3 className="label">In the room</h3>
              <ul className="sheet__list">
                {room.amenities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>

              <h3 className="label">In every room</h3>
              <ul className="sheet__list">
                <li>Estate tea and a kettle</li>
                <li>Wool blankets, feather duvet</li>
                <li>Wi-Fi (mostly)</li>
                <li>Breakfast and veranda tea</li>
              </ul>
            </div>

            <footer className="sheet__foot">
              <p>
                From <b>{inr(room.base)}</b> a night
              </p>
              <button type="button" className="pill pill--solid" onClick={() => onBook({ roomId: room.id })}>
                Check dates
              </button>
            </footer>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* -------------------------------------------------------------------- Days */

function Days() {
  return (
    <section className="days" id="days">
      <div className="wrap days__grid">
        <Reveal className="days__head">
          <p className="label label--gold">Days here</p>
          <h2 className="h2">A day at the house has a shape. You may ignore all of it.</h2>
          <div className="days__photo">
            <Photo
              id={photos.plucking}
              alt="A tea plucker working along a row of bushes on the estate"
              ratio={4 / 3}
              widths={[480, 800]}
              sizes="(max-width: 900px) 100vw, 36vw"
            />
          </div>
        </Reveal>

        <ol className="days__list">
          {days.map((item) => (
            <Reveal as="li" key={item.time}>
              <time>{item.time}</time>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- Table */

function Table() {
  return (
    <section className="table" id="table">
      <div className="wrap table__grid">
        <Reveal className="table__photo">
          <Photo
            id={photos.table}
            alt="A breakfast table laid with fruit, pastries and juice, seen from above"
            ratio={5 / 4}
            widths={[480, 800, 1200]}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </Reveal>
        <Reveal className="table__copy">
          <p className="label">The table</p>
          <h2 className="h2">Breakfast is included, and unhurried.</h2>
          <p className="body">
            Appam and stew, estate honey, eggs from the hens you can hear. Dinner is one sitting at
            the long table: Badaga and Tamil home cooking, vegetables from the kitchen garden, and a
            pudding the British left behind. We cook around what you don’t eat.
          </p>
          <ul className="plans">
            <li>
              <span>Breakfast and veranda tea</span>
              <span>Included</span>
            </li>
            <li>
              <span>Dinner at the long table</span>
              <span>{inr(1400)} per guest</span>
            </li>
            <li>
              <span>Estate picnic hamper</span>
              <span>{inr(1600)}</span>
            </li>
            <li>
              <span>Bonfire and barbecue</span>
              <span>{inr(2200)} per evening</span>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- Journey */

function Journey() {
  return (
    <section className="journey" id="journey">
      <div className="wrap">
        <Reveal className="sectionhead">
          <p className="label">Getting here</p>
          <h2 className="h2">Thirty-six hairpin bends, and then the gate.</h2>
        </Reveal>

        <div className="journey__grid">
          <Reveal>
            <table className="routes">
              <caption className="sr-only">Distances to Kurinji House</caption>
              <thead>
                <tr>
                  <th scope="col">From</th>
                  <th scope="col">Distance</th>
                  <th scope="col">By road</th>
                </tr>
              </thead>
              <tbody>
                {journeys.map((j) => (
                  <tr key={j.code}>
                    <th scope="row">
                      {j.from} <span>{j.code}</span>
                    </th>
                    <td>{j.distance}</td>
                    <td>{j.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="body body--small">
              We can send a car to Coimbatore or Mettupalayam; add it while booking. Self-driving?
              The last four kilometres are narrow and unlit — arrive before dark if you can.
            </p>
          </Reveal>

          <ul className="seasons">
            {seasons.map((s) => (
              <Reveal as="li" key={s.months}>
                <p className="label">{s.months}</p>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- Guest book */

function GuestBook() {
  return (
    <section className="guestbook">
      <div className="wrap">
        <Reveal className="sectionhead sectionhead--center">
          <p className="label label--gold">From the guest book</p>
          <p className="guestbook__score">
            <b>4.9</b> out of 5 across 212 stays
          </p>
        </Reveal>
        <ul className="guestbook__list">
          {notes.map((note) => (
            <Reveal as="li" key={note.who}>
              <blockquote>“{note.quote}”</blockquote>
              <p>
                {note.who}, {note.when}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------- FAQ */

function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="faq">
      <div className="wrap faq__grid">
        <Reveal>
          <p className="label">Before you come</p>
          <h2 className="h2">The things people ask.</h2>
        </Reveal>
        <div className="faq__list">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div className={`faq__item${isOpen ? ' is-open' : ''}`} key={item.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    {item.q}
                    <span aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq__answer" id={`faq-${i}`} role="region" hidden={!isOpen}>
                  <p>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Footer */

function Footer({ bookings, onCancel, onBook }) {
  const [query, setQuery] = useState('')
  const [lookup, setLookup] = useState(null)
  const [reason, setReason] = useState(cancelReasons[0])
  const [cancelling, setCancelling] = useState(false)

  const latest = bookings[0]
  const found = lookup ? bookings.find((b) => b.ref === lookup) : null

  const search = (event) => {
    event.preventDefault()
    setCancelling(false)
    setLookup(query.trim().toUpperCase() || ' ')
  }

  return (
    <footer className="footer">
      <div className="wrap footer__top">
        <div>
          <h2 className="footer__title">Come up for air.</h2>
          <button type="button" className="pill pill--light" onClick={onBook}>
            Check availability
          </button>
        </div>

        <div className="manage">
          <h3 className="label label--gold">Manage a booking</h3>
          <form onSubmit={search}>
            <Input label="Booking reference">
              <input
                type="text"
                placeholder="KH-XXXXXX"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoCapitalize="characters"
                spellCheck="false"
              />
            </Input>
            <button type="submit" className="pill pill--light">
              Find
            </button>
          </form>

          {latest && !lookup && (
            <p className="manage__hint">
              Your most recent booking is{' '}
              <button type="button" className="textlink textlink--light" onClick={() => { setQuery(latest.ref); setLookup(latest.ref) }}>
                {latest.ref}
              </button>
              .
            </p>
          )}

          <div aria-live="polite">
            {lookup && !found && (
              <p className="manage__hint">
                We could not find that reference. It is on your confirmation, and looks like KH-7Q2MXA.
              </p>
            )}

            {found && (
              <div className="manage__card">
                <p className={`manage__status${found.status === 'cancelled' ? ' is-off' : ''}`}>
                  {found.status === 'cancelled' ? 'Cancelled' : 'Confirmed'}
                </p>
                <p className="manage__room">{found.roomName}</p>
                <p>
                  {formatDate(fromKey(found.from))} – {formatDate(fromKey(found.to))} · {found.nights}{' '}
                  {found.nights === 1 ? 'night' : 'nights'} · {found.adults + found.children} guests
                </p>
                <p>
                  {found.status === 'cancelled'
                    ? `Nothing to pay. Reason given: ${found.reason}.`
                    : `${inr(found.total)} to pay at the house.`}
                </p>

                {found.status !== 'cancelled' &&
                  (cancelling ? (
                    <div className="manage__cancel">
                      <Input label="Why are you cancelling?">
                        <select value={reason} onChange={(e) => setReason(e.target.value)}>
                          {cancelReasons.map((r) => (
                            <option key={r}>{r}</option>
                          ))}
                        </select>
                      </Input>
                      <button
                        type="button"
                        className="pill pill--light"
                        onClick={() => {
                          onCancel(found.ref, reason)
                          setCancelling(false)
                        }}
                      >
                        Cancel this stay
                      </button>
                      <button type="button" className="textlink textlink--light" onClick={() => setCancelling(false)}>
                        Keep it
                      </button>
                    </div>
                  ) : (
                    <button type="button" className="textlink textlink--light" onClick={() => setCancelling(true)}>
                      Cancel this booking
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="wrap footer__base">
        <address>
          {brand.address[0]}
          <br />
          {brand.address[1]}
        </address>
        <p>
          <a href={`tel:${brand.phone.replace(/\s/g, '')}`}>{brand.phone}</a>
          <br />
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
        </p>
        <p className="footer__fine">
          © {new Date().getFullYear()} Kurinji House. A concept site — the house is fictional.
          <br />
          Photography via Unsplash.
        </p>
      </div>
    </footer>
  )
}
