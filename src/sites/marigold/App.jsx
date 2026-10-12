import { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import PortfolioBadge from '../shared/PortfolioBadge'
import { Photo } from '../shared/img'
import { formatDate, inr } from '../shared/dates'
import { useLocalStorage, usePrefersReducedMotion } from '../shared/hooks'
import {
  brand,
  categories,
  events,
  hours,
  kaapiOptions,
  menu,
  photos,
  specialIds,
  tagLabels,
  ticker,
} from './data'
import { friendlyTime, hoursFor, nextWeekday, openStatus } from './util'
import { Arrow, Burst, Chilli, Minus, Plus, Search, Tray as TrayIcon } from './icons'
import Reserve from './Reserve'
import Tray from './Tray'

const byId = Object.fromEntries(menu.map((item) => [item.id, item]))

export default function App() {
  const [tray, setTray] = useLocalStorage('marigold:tray', [])
  const [reservation, setReservation] = useLocalStorage('marigold:reservation', null)
  const [reserve, setReserve] = useState({ open: false, preset: null })
  const [trayOpen, setTrayOpen] = useState(false)
  const [status, setStatus] = useState(() => openStatus())

  // The header pill says "Open till 10:30 pm" — keep it honest as time passes.
  useEffect(() => {
    const id = window.setInterval(() => setStatus(openStatus()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  const count = tray.reduce((sum, line) => sum + line.qty, 0)
  const qtyOf = (key) => tray.find((line) => line.key === key)?.qty ?? 0

  const add = (line) =>
    setTray((prev) => {
      const existing = prev.find((l) => l.key === line.key)
      if (existing) return prev.map((l) => (l.key === line.key ? { ...l, qty: l.qty + 1 } : l))
      return [...prev, { ...line, qty: 1 }]
    })

  const setQty = (key, qty) =>
    setTray((prev) =>
      qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l)),
    )

  const addItem = (item) => add({ key: item.id, name: item.name, price: item.price })
  const openReserve = (preset = null) => setReserve({ open: true, preset })

  return (
    <>
      <Ticker />
      <Nav
        status={status}
        count={count}
        reservation={reservation}
        onReserve={() => openReserve()}
        onTray={() => setTrayOpen(true)}
      />

      <main>
        <Hero status={status} onReserve={() => openReserve()} />
        <Specials qtyOf={qtyOf} onAdd={addItem} onQty={setQty} />
        <Menu qtyOf={qtyOf} onAdd={addItem} onQty={setQty} />
        <KaapiBar onAdd={add} />
        <Room />
        <Events onBook={openReserve} />
      </main>

      <Footer onReserve={() => openReserve()} />

      <Reserve
        open={reserve.open}
        preset={reserve.preset}
        reservation={reservation}
        onReservation={setReservation}
        onClose={() => setReserve({ open: false, preset: null })}
      />
      <Tray
        open={trayOpen}
        lines={tray}
        onQty={setQty}
        onClear={() => setTray([])}
        onClose={() => setTrayOpen(false)}
      />

      <PortfolioBadge />
    </>
  )
}

/* ------------------------------------------------------------------ Ticker */

function Ticker() {
  const run = [...ticker, ...ticker]
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {run.map((line, i) => (
          <span key={i}>{line}</span>
        ))}
      </div>
    </div>
  )
}

/* --------------------------------------------------------------------- Nav */

function Nav({ status, count, reservation, onReserve, onTray }) {
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <a className="nav__brand" href="#top" aria-label={`${brand.name} — home`}>
          Marigold<span>Canteen</span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          <a href="#menu">Menu</a>
          <a href="#kaapi">Kaapi bar</a>
          <a href="#visit">Visit</a>
          <a href="#events">What’s on</a>
        </nav>

        <div className="nav__actions">
          <span className={`status${status.open ? ' is-open' : ''}`}>
            <i aria-hidden="true" />
            {status.label}
          </span>
          <button type="button" className="btn btn--blue" onClick={onReserve}>
            {reservation ? 'Your table' : 'Book a table'}
          </button>
          <button type="button" className="traybtn" onClick={onTray} aria-label={`Order tray, ${count} items`}>
            <TrayIcon />
            {count > 0 && <b>{count}</b>}
          </button>
        </div>
      </div>
    </header>
  )
}

/* -------------------------------------------------------------------- Hero */

function Hero({ status, onReserve }) {
  const reduced = usePrefersReducedMotion()
  const { scrollY } = useScroll()
  const rotate = useTransform(scrollY, [0, 900], [0, reduced ? 0 : 70])
  const today = hoursFor(new Date())

  return (
    <section className="hero" id="top">
      <div className="wrap hero__stage">
        <h1 className="hero__title">
          <span className="hero__line hero__line--back">Tiffin,</span>{' '}
          <span className="hero__line hero__line--back">turned up</span>{' '}
          <span className="hero__line hero__line--front">loud.</span>
        </h1>

        <motion.div className="hero__plate" style={{ rotate }}>
          <Photo
            id={photos.hero}
            alt="A crisp masala dosa with sambar and three chutneys, seen from above"
            ratio={1}
            widths={[420, 720, 1100]}
            sizes="(max-width: 760px) 70vw, 42vw"
            crop="entropy"
            eager
          />
        </motion.div>

        <Burst className="hero__burst">
          Crisp
          <br />
          since
          <br />
          2019
        </Burst>
      </div>

      <div className="wrap hero__foot">
        <p className="hero__lede">
          An all-day South Indian canteen and kaapi bar. Batter stone-ground twice a day, coffee pulled
          a metre high, and absolutely no reservations about ghee.
        </p>

        <div className="hero__cta">
          <a className="btn btn--ink" href="#menu">
            See the menu <Arrow />
          </a>
          <button type="button" className="btn" onClick={onReserve}>
            Book a table
          </button>
        </div>

        <dl className="hero__facts">
          <div>
            <dt>Today</dt>
            <dd>{today.closed ? 'Closed' : `${friendlyTime(today.open)} – ${friendlyTime(today.close)}`}</dd>
          </div>
          <div>
            <dt>Right now</dt>
            <dd>{status.label}</dd>
          </div>
          <div>
            <dt>Find us</dt>
            <dd>{brand.address[0]}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ Add control */

function AddControl({ item, qty, onAdd, onQty, label }) {
  if (qty > 0) {
    return (
      <div className="stepper" role="group" aria-label={`${item.name} quantity`}>
        <button type="button" onClick={() => onQty(item.id, qty - 1)} aria-label="Remove one">
          <Minus width={16} height={16} />
        </button>
        <output aria-live="polite">{qty}</output>
        <button type="button" onClick={() => onQty(item.id, qty + 1)} aria-label="Add one more">
          <Plus width={16} height={16} />
        </button>
      </div>
    )
  }
  return (
    <button type="button" className="add" onClick={() => onAdd(item)} aria-label={`Add ${item.name} to tray`}>
      <Plus width={18} height={18} />
      {label && <span>{label}</span>}
    </button>
  )
}

/* ---------------------------------------------------------------- Specials */

function Specials({ qtyOf, onAdd, onQty }) {
  const today = formatDate(new Date(), { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <section className="specials">
      <div className="wrap">
        <header className="blockhead">
          <h2 className="blockhead__title">On the counter today</h2>
          <p className="blockhead__meta">{today}</p>
        </header>

        <ol className="specials__list">
          {specialIds.map((id, i) => {
            const item = byId[id]
            return (
              <li className="special" key={id}>
                <span className="special__no">{String(i + 1).padStart(2, '0')}</span>
                <div className="special__plate">
                  <Photo
                    id={item.photo}
                    alt={item.name}
                    ratio={1}
                    widths={[320, 560]}
                    sizes="(max-width: 760px) 60vw, 22vw"
                    crop="entropy"
                  />
                </div>
                <h3 className="special__name">{item.name}</h3>
                <p className="special__blurb">{item.blurb}</p>
                <div className="special__foot">
                  <span className="price">{inr(item.price)}</span>
                  <AddControl item={item} qty={qtyOf(id)} onAdd={onAdd} onQty={onQty} label="Add" />
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- Menu */

const filterDefs = [
  { id: 'vg', label: 'Vegan' },
  { id: 'gf', label: 'Gluten-free' },
  { id: 'jain', label: 'No onion or garlic' },
  { id: 'mild', label: 'Mild only' },
]

function Menu({ qtyOf, onAdd, onQty }) {
  const [category, setCategory] = useState('dosa')
  const [filters, setFilters] = useState([])
  const [query, setQuery] = useState('')

  const toggle = (id) =>
    setFilters((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))

  const passes = (item) =>
    filters.every((f) => (f === 'mild' ? item.heat <= 1 : item.tags.includes(f)))

  const term = query.trim().toLowerCase()
  const searching = term.length > 0

  const visible = useMemo(() => {
    const pool = searching
      ? menu.filter((item) => `${item.name} ${item.blurb}`.toLowerCase().includes(term))
      : menu.filter((item) => item.cat === category)
    return pool.filter(passes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, filters, term, searching])

  const countFor = (cat) => menu.filter((item) => item.cat === cat && passes(item)).length
  const heading = searching
    ? `“${query.trim()}”`
    : categories.find((c) => c.id === category).label

  return (
    <section className="menu" id="menu">
      <div className="wrap menu__grid">
        <aside className="menu__side">
          <h2 className="menu__title">
            The whole
            <br />
            menu
          </h2>

          <label className="search">
            <Search width={18} height={18} />
            <span className="sr-only">Search the menu</span>
            <input
              type="search"
              placeholder="Search dosa, kaapi, podi…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>

          <ul className="menu__cats" aria-label="Menu sections">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  type="button"
                  className={!searching && cat.id === category ? 'is-active' : undefined}
                  aria-pressed={!searching && cat.id === category}
                  onClick={() => {
                    setCategory(cat.id)
                    setQuery('')
                  }}
                >
                  <span>{cat.label}</span>
                  <i>{countFor(cat.id)}</i>
                </button>
              </li>
            ))}
          </ul>

          <fieldset className="menu__filters">
            <legend>Dietary</legend>
            {filterDefs.map((f) => (
              <button
                type="button"
                key={f.id}
                className={`chip${filters.includes(f.id) ? ' is-on' : ''}`}
                aria-pressed={filters.includes(f.id)}
                onClick={() => toggle(f.id)}
              >
                {f.label}
              </button>
            ))}
          </fieldset>

          <p className="menu__note">
            Our kitchen is fully vegetarian. Tell your server about allergies — batters and chutneys
            share grinders.
          </p>
        </aside>

        <div className="menu__main">
          <header className="menu__head">
            <h3>{heading}</h3>
            <p aria-live="polite">
              {visible.length} {visible.length === 1 ? 'dish' : 'dishes'}
            </p>
          </header>

          {visible.length === 0 ? (
            <div className="menu__empty">
              <p>Nothing matches that — yet.</p>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setFilters([])
                  setQuery('')
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <ul className="menu__list">
              {visible.map((item) => (
                <li className="dish" key={item.id}>
                  {item.photo ? (
                    <div className="dish__thumb">
                      <Photo id={item.photo} alt="" ratio={1} widths={[160, 320]} sizes="88px" crop="entropy" />
                    </div>
                  ) : (
                    <div className="dish__thumb dish__thumb--blank" aria-hidden="true" />
                  )}

                  <div className="dish__body">
                    <h4 className="dish__name">
                      {item.name}
                      {item.signature && <em>House favourite</em>}
                    </h4>
                    <p className="dish__blurb">{item.blurb}</p>
                    <div className="dish__tags">
                      {item.heat > 0 && <Chilli level={item.heat} />}
                      {item.tags.map((tag) => (
                        <span key={tag}>{tagLabels[tag]}</span>
                      ))}
                    </div>
                  </div>

                  <div className="dish__buy">
                    <span className="price">{inr(item.price)}</span>
                    <AddControl item={item} qty={qtyOf(item.id)} onAdd={onAdd} onQty={onQty} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- Kaapi bar */

function KaapiBar({ onAdd }) {
  const [strength, setStrength] = useState('classic')
  const [milk, setMilk] = useState('dairy')
  const [sweet, setSweet] = useState('classic')
  const [size, setSize] = useState('tumbler')
  const [added, setAdded] = useState(false)

  const s = kaapiOptions.strength.find((o) => o.id === strength)
  const m = kaapiOptions.milk.find((o) => o.id === milk)
  const z = kaapiOptions.size.find((o) => o.id === size)
  const sw = kaapiOptions.sweet.find((o) => o.id === sweet)
  const price = z.price + m.price

  const addCup = () => {
    onAdd({
      key: `kaapi:${strength}:${milk}:${sweet}:${size}`,
      name: 'Filter Kaapi',
      detail: `${s.label} · ${m.label} · ${sw.label} · ${z.label.split(' · ')[0]}`,
      price,
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  return (
    <section className="kaapi" id="kaapi">
      <div className="wrap kaapi__grid">
        <div className="kaapi__media">
          <div className="kaapi__photo">
            <Photo
              id={photos.kaapi}
              alt="Frothy filter coffee in a brass davara and tumbler"
              ratio={1}
              widths={[420, 720, 1000]}
              sizes="(max-width: 900px) 80vw, 40vw"
              crop="entropy"
            />
          </div>
          <Burst className="kaapi__burst">
            Pulled
            <br />
            a metre
            <br />
            high
          </Burst>
        </div>

        <div className="kaapi__copy">
          <h2 className="kaapi__title">
            Metre
            <br />
            kaapi.
          </h2>
          <p className="kaapi__lede">
            Peaberry and plantation beans from Chikkamagaluru, a pinch of chicory, and a brass filter
            that drips for exactly as long as it wants to. Build yours.
          </p>

          <div className="builder">
            <div className="builder__glass" aria-hidden="true">
              <Tumbler ratio={s.ratio} oat={milk === 'oat'} />
              <span>{Math.round(s.ratio * 100)}% decoction</span>
            </div>

            <div className="builder__opts">
              <OptionRow
                legend="Strength"
                options={kaapiOptions.strength}
                value={strength}
                onChange={setStrength}
                hint={s.note}
              />
              <OptionRow legend="Milk" options={kaapiOptions.milk} value={milk} onChange={setMilk} />
              <OptionRow legend="Sweet" options={kaapiOptions.sweet} value={sweet} onChange={setSweet} />
              <OptionRow legend="Size" options={kaapiOptions.size} value={size} onChange={setSize} />

              <div className="builder__foot">
                <span className="price price--xl">{inr(price)}</span>
                <button type="button" className="btn btn--ink" onClick={addCup}>
                  {added ? 'In your tray' : 'Add to tray'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function OptionRow({ legend, options, value, onChange, hint }) {
  return (
    <fieldset className="optrow">
      <legend>
        {legend}
        {hint && <span>{hint}</span>}
      </legend>
      <div>
        {options.map((option) => (
          <button
            type="button"
            key={option.id}
            className={`chip${option.id === value ? ' is-on' : ''}`}
            aria-pressed={option.id === value}
            onClick={() => onChange(option.id)}
          >
            {option.label}
            {option.price > 0 && legend === 'Milk' && ` +${inr(option.price)}`}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

/** A steel tumbler in section: the dark band is decoction, the pale one is milk. */
function Tumbler({ ratio, oat }) {
  const top = 22
  const bottom = 132
  const fill = bottom - top - 14
  const coffee = fill * ratio
  return (
    <svg viewBox="0 0 100 150" className="tumbler">
      <defs>
        <clipPath id="tumbler-clip">
          <path d="M22 22h56l-7 110H29z" />
        </clipPath>
      </defs>
      <g clipPath="url(#tumbler-clip)">
        <rect x="0" y={top + 14} width="100" height={fill} className={oat ? 'tumbler__milk is-oat' : 'tumbler__milk'} />
        <rect
          x="0"
          y={bottom - coffee}
          width="100"
          height={coffee}
          className="tumbler__coffee"
          style={{ transition: 'y 240ms cubic-bezier(.4,0,.2,1), height 240ms cubic-bezier(.4,0,.2,1)' }}
        />
        <rect x="0" y={top + 4} width="100" height="12" className="tumbler__froth" />
      </g>
      <path d="M22 22h56l-7 110H29z" className="tumbler__body" />
      <path d="M16 22h68" className="tumbler__rim" />
    </svg>
  )
}

/* ------------------------------------------------------------------- Visit */

function Room() {
  const todayIndex = (new Date().getDay() + 6) % 7

  return (
    <section className="room" id="visit">
      <div className="wrap room__grid">
        <div className="room__photos">
          <div className="room__photo room__photo--main">
            <Photo
              id={photos.room}
              alt="The canteen dining room: yellow walls, pale wood tables and a staircase"
              ratio={4 / 5}
              widths={[480, 800, 1100]}
              sizes="(max-width: 900px) 100vw, 44vw"
            />
          </div>
          <div className="room__photo room__photo--inset">
            <Photo
              id={photos.griddle}
              alt="A cook spreading dosa batter on a large cast-iron griddle"
              ratio={1}
              widths={[320, 560]}
              sizes="(max-width: 900px) 46vw, 20vw"
            />
          </div>
        </div>

        <div className="room__copy">
          <h2 className="room__title">
            Come
            <br />
            hungry.
          </h2>
          <p className="room__lede">
            Sixty seats, one long steel counter, and a tawa you can watch from every table. Walk in
            whenever — we hold half the room for people who did not plan ahead.
          </p>

          <table className="hours">
            <caption>Opening hours</caption>
            <tbody>
              {hours.map((row, i) => (
                <tr key={row.day} className={i === todayIndex ? 'is-today' : undefined}>
                  <th scope="row">
                    {row.day}
                    {i === todayIndex && <span>Today</span>}
                  </th>
                  <td>{row.closed ? 'Closed' : `${friendlyTime(row.open)} – ${friendlyTime(row.close)}`}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <address className="room__address">
            <p>
              {brand.address[0]}
              <br />
              {brand.address[1]}
            </p>
            <p>
              <a href={`tel:${brand.phone.replace(/\s/g, '')}`}>{brand.phone}</a>
              <br />
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </p>
          </address>

          <p className="room__fine">
            Five minutes from Indiranagar metro, exit B. Two-wheeler parking out front; cars, try the
            lane behind the bakery.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Events */

function Events({ onBook }) {
  const upcoming = useMemo(
    () =>
      events
        .map((event) => ({ ...event, date: nextWeekday(event.weekday) }))
        .sort((a, b) => a.date - b.date),
    [],
  )

  return (
    <section className="events" id="events">
      <div className="wrap">
        <header className="blockhead">
          <h2 className="blockhead__title">What’s on</h2>
          <p className="blockhead__meta">Small rooms, limited seats</p>
        </header>

        <ul className="events__list">
          {upcoming.map((event) => (
            <li className="event" key={event.id}>
              <div className="event__date">
                <span>{formatDate(event.date, { weekday: 'short' })}</span>
                <b>{formatDate(event.date, { day: 'numeric' })}</b>
                <span>{formatDate(event.date, { month: 'short' })}</span>
              </div>
              <div className="event__body">
                <h3>{event.title}</h3>
                <p>{event.blurb}</p>
              </div>
              <dl className="event__meta">
                <div>
                  <dt>Starts</dt>
                  <dd>{friendlyTime(event.time)}</dd>
                </div>
                <div>
                  <dt>Per person</dt>
                  <dd>{inr(event.price)}</dd>
                </div>
                <div>
                  <dt>Seats</dt>
                  <dd>{event.seats}</dd>
                </div>
              </dl>
              <button
                type="button"
                className="btn"
                onClick={() => onBook({ date: event.date, time: event.time, note: event.title })}
              >
                Book a seat
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Footer */

function Footer({ onReserve }) {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const join = (event) => {
    event.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return
    setJoined(true)
  }

  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__col footer__col--wide">
          <h2>Hot off the tawa</h2>
          {joined ? (
            <p className="footer__thanks">You’re on the list. First email lands Sunday morning.</p>
          ) : (
            <form className="signup" onSubmit={join} noValidate>
              <label className="sr-only" htmlFor="signup-email">
                Email address
              </label>
              <input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" aria-label="Join the mailing list">
                <Arrow />
              </button>
            </form>
          )}
          <p className="footer__small">Specials, events and the occasional recipe. One email a week.</p>
        </div>

        <div className="footer__col">
          <h3>Eat</h3>
          <a href="#menu">Menu</a>
          <a href="#kaapi">Kaapi bar</a>
          <button type="button" onClick={onReserve}>
            Book a table
          </button>
          <a href="#events">Events</a>
        </div>

        <div className="footer__col">
          <h3>Find</h3>
          <p>
            {brand.address[0]}
            <br />
            {brand.address[1]}
          </p>
          <a href={`tel:${brand.phone.replace(/\s/g, '')}`}>{brand.phone}</a>
        </div>

        <div className="footer__col">
          <h3>Follow</h3>
          <a href="#top">Instagram</a>
          <a href="#top">Spotify — the kitchen playlist</a>
          <a href="#top">Careers</a>
        </div>
      </div>

      <p className="footer__mark" aria-hidden="true">
        Marigold
      </p>

      <div className="wrap footer__base">
        <span>© {new Date().getFullYear()} Marigold Canteen</span>
        <span>A concept site — the canteen is fictional, sadly.</span>
        <span>Photography via Unsplash</span>
      </div>
    </footer>
  )
}
