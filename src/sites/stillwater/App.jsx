import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PortfolioBadge from '../shared/PortfolioBadge'
import { Photo } from '../shared/img'
import { inr, makeReference } from '../shared/dates'
import { useDialog, useLocalStorage, usePrefersReducedMotion } from '../shared/hooks'
import {
  DELIVERY,
  FREE_DELIVERY,
  brand,
  categories,
  etiquette,
  faqs,
  friendlyDuration,
  giftAmounts,
  hours,
  passes,
  photos,
  pools,
  products,
  profiles,
  shopFilters,
  treatments,
} from './data'
import Flow, { Line } from './Flow'

export default function App() {
  const [visit, setVisit] = useState([])
  const [bag, setBag] = useLocalStorage('stillwater:bag', [])
  const [flowOpen, setFlowOpen] = useState(false)
  const [bagOpen, setBagOpen] = useState(false)

  const toggleVisit = (item) =>
    setVisit((prev) =>
      prev.some((v) => v.id === item.id) ? prev.filter((v) => v.id !== item.id) : [...prev, item],
    )

  const addToBag = (line) => {
    setBag((prev) => {
      const existing = prev.find((l) => l.key === line.key)
      if (existing) return prev.map((l) => (l.key === line.key ? { ...l, qty: l.qty + 1 } : l))
      return [...prev, { ...line, qty: 1 }]
    })
    setBagOpen(true)
  }

  const setQty = (key, qty) =>
    setBag((prev) => (qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l))))

  const bagCount = bag.reduce((sum, l) => sum + l.qty, 0)

  // The "Reserve" buttons should always lead somewhere useful.
  const reserve = () => {
    if (visit.length === 0) {
      const session = treatments[0]
      setVisit([{ id: session.id, key: session.id, name: session.name, ...session.options[0] }])
    }
    setFlowOpen(true)
  }

  return (
    <>
      <p className="strip">Winter hours: the baths stay open until ten on Fridays and Saturdays.</p>
      <Nav bagCount={bagCount} onBag={() => setBagOpen(true)} onReserve={reserve} />

      <main>
        <Hero onReserve={reserve} />
        <Circuit />
        <Hall />
        <Treatments visit={visit} onToggle={toggleVisit} onBook={() => setFlowOpen(true)} />
        <Passes onAdd={addToBag} />
        <Apothecary onAdd={addToBag} />
        <GiftCard onAdd={addToBag} />
        <HouseNotes />
        <Visit />
      </main>

      <Footer />

      <Flow open={flowOpen} visit={visit} onClose={() => setFlowOpen(false)} onDone={() => {}} />
      <Bag open={bagOpen} lines={bag} onQty={setQty} onClear={() => setBag([])} onClose={() => setBagOpen(false)} />
      <PortfolioBadge />
    </>
  )
}

/* --------------------------------------------------------------------- Nav */

function Nav({ bagCount, onBag, onReserve }) {
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <nav className="nav__side" aria-label="Sections">
          <a href="#circuit">Bathhouse</a>
          <a href="#treatments">Treatments</a>
          <a href="#apothecary">Apothecary</a>
        </nav>
        <a className="nav__mark" href="#top" aria-label="Stillwater — home">
          Stillwater
        </a>
        <div className="nav__side nav__side--end">
          <a href="#gift">Gift cards</a>
          <a href="#visit">Visit</a>
          <button type="button" className="textbtn" onClick={onBag}>
            Bag ({bagCount})
          </button>
          <button type="button" className="btn btn--sm" onClick={onReserve}>
            Book
          </button>
        </div>
      </div>
    </header>
  )
}

/* -------------------------------------------------------------------- Hero */

function Hero({ onReserve }) {
  return (
    <section className="hero" id="top">
      <Photo
        className="hero__img"
        id={photos.hero}
        alt="A bather resting at the edge of a pool, looking out over calm blue water"
        ratio={16 / 9}
        widths={[800, 1400, 2200]}
        sizes="100vw"
        eager
      />
      <div className="hero__copy">
        <p className="eyebrow eyebrow--light">{brand.descriptor} · Assagao, Goa</p>
        <h1 className="display display--xl">Warm water. Cold water. Nothing else to do.</h1>
        <div className="hero__cta">
          <button type="button" className="btn" onClick={onReserve}>
            Reserve a bathing session
          </button>
          <a className="textbtn textbtn--light" href="#treatments">
            See treatments
          </a>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- Circuit */

function Circuit() {
  const [profileId, setProfileId] = useState('first')
  const profile = profiles.find((p) => p.id === profileId)
  const longest = Math.max(...profiles.flatMap((p) => Object.values(p.minutes)))
  const round = Object.values(profile.minutes).reduce((a, b) => a + b, 0)

  return (
    <section className="circuit" id="circuit">
      <div className="wrap circuit__grid">
        <div className="circuit__copy">
          <p className="eyebrow">The circuit</p>
          <h2 className="display">Four stations, in an order that works.</h2>
          <p className="body">
            Heat opens you up, cold closes you down, rest lets it land. People have bathed this way
            for two thousand years; we have only added better towels. Tell us how you are arriving and
            we will suggest a rhythm.
          </p>
          <div className="tabs" role="tablist" aria-label="Choose a rhythm">
            {profiles.map((p) => (
              <button
                type="button"
                key={p.id}
                role="tab"
                aria-selected={p.id === profileId}
                className={p.id === profileId ? 'is-on' : undefined}
                onClick={() => setProfileId(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="circuit__rail" role="tabpanel" aria-live="polite">
          <ol>
            {pools.map((pool, i) => {
              const mins = profile.minutes[pool.id]
              return (
                <li key={pool.id}>
                  <span className="circuit__no">{String(i + 1).padStart(2, '0')}</span>
                  <div className="circuit__what">
                    <h3>
                      {pool.name} <span>{pool.temp}</span>
                    </h3>
                    <p>{pool.note}</p>
                    <div className="circuit__bar" aria-hidden="true">
                      <i style={{ width: `${(mins / longest) * 100}%` }} />
                    </div>
                  </div>
                  <p className="circuit__mins">
                    <b>{mins}</b> min
                  </p>
                </li>
              )
            })}
          </ol>
          <p className="circuit__sum">
            Repeat {profile.rounds === 2 ? 'twice' : 'three times'} — about{' '}
            <b>{friendlyDuration(round * profile.rounds)}</b> in all.
          </p>
        </div>
      </div>
    </section>
  )
}

function Hall() {
  return (
    <figure className="hall">
      <Photo
        id={photos.hall}
        alt="Cedar soaking tubs set into a timber deck in the bathing hall"
        ratio={21 / 9}
        widths={[800, 1400, 2200]}
        sizes="100vw"
      />
      <figcaption className="wrap">
        The bathing hall, built from reclaimed cedar in the shell of a 1930s salt store.
      </figcaption>
    </figure>
  )
}

/* -------------------------------------------------------------- Treatments */

function Treatments({ visit, onToggle, onBook }) {
  const [cat, setCat] = useState('bathing')
  const [chosen, setChosen] = useState({})

  const list = treatments.filter((t) => t.cat === cat)
  const minutes = visit.reduce((sum, v) => sum + v.mins, 0)
  const total = visit.reduce((sum, v) => sum + v.price, 0)

  return (
    <section className="treatments" id="treatments">
      <div className="wrap">
        <header className="head">
          <p className="eyebrow">Treatments</p>
          <h2 className="display">Build your visit.</h2>
        </header>

        <div className="treatments__grid">
          <div>
            <div className="tabs tabs--wide" role="tablist" aria-label="Treatment types">
              {categories.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  role="tab"
                  aria-selected={c.id === cat}
                  className={c.id === cat ? 'is-on' : undefined}
                  onClick={() => setCat(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <ul className="menu">
              {list.map((t) => {
                const index = chosen[t.id] ?? 0
                const option = t.options[index]
                const added = visit.some((v) => v.id === t.id)
                return (
                  <li key={t.id} className={added ? 'is-added' : undefined}>
                    <div className="menu__text">
                      <h3>{t.name}</h3>
                      <p>{t.blurb}</p>
                      {t.options.length > 1 ? (
                        <div className="menu__opts" role="group" aria-label={`${t.name} duration`}>
                          {t.options.map((o, i) => (
                            <button
                              type="button"
                              key={o.mins}
                              className={i === index ? 'is-on' : undefined}
                              aria-pressed={i === index}
                              disabled={added}
                              onClick={() => setChosen((prev) => ({ ...prev, [t.id]: i }))}
                            >
                              {friendlyDuration(o.mins)}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="menu__mins">{friendlyDuration(option.mins)}</p>
                      )}
                    </div>
                    <div className="menu__buy">
                      <p>{inr(option.price)}</p>
                      <button
                        type="button"
                        className={`btn btn--sm${added ? ' btn--ghost' : ''}`}
                        aria-pressed={added}
                        onClick={() => onToggle({ id: t.id, key: t.id, name: t.name, ...option })}
                      >
                        {added ? 'Remove' : 'Add'}
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <aside className="ticket ticket--sticky" aria-label="Your visit">
            <h2>Your visit</h2>
            {visit.length === 0 ? (
              <p className="ticket__empty">
                Add a bathing session or a treatment to see times. Most guests bathe first and are
                treated after.
              </p>
            ) : (
              <>
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
                    <dt>Time in house</dt>
                    <dd>{friendlyDuration(minutes)}</dd>
                  </div>
                </dl>
                <p className="ticket__total">
                  <span>Total</span>
                  <b>{inr(total)}</b>
                </p>
              </>
            )}
            <button type="button" className="btn btn--block" disabled={visit.length === 0} onClick={onBook}>
              Choose a time
            </button>
          </aside>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Passes */

function Passes({ onAdd }) {
  return (
    <section className="passes">
      <div className="wrap">
        <header className="head head--center">
          <p className="eyebrow">Passes</p>
          <h2 className="display">Come often. It works better that way.</h2>
        </header>
        <ul className="passes__list">
          {passes.map((pass) => (
            <li key={pass.id}>
              <h3>{pass.name}</h3>
              <p className="passes__price">
                {inr(pass.price)} <span>{pass.per}</span>
              </p>
              <ul>
                {pass.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <button
                type="button"
                className={`btn${pass.featured ? '' : ' btn--ghost'}`}
                onClick={() => onAdd({ key: `pass:${pass.id}`, name: `${pass.name} pass`, detail: 'Bathing pass', price: pass.price })}
              >
                Add to bag
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- Apothecary */

function Apothecary({ onAdd }) {
  const [filter, setFilter] = useState('All')
  const list = filter === 'All' ? products : products.filter((p) => p.type === filter)

  return (
    <section className="shop" id="apothecary">
      <div className="wrap">
        <header className="head head--split">
          <div>
            <p className="eyebrow">Apothecary</p>
            <h2 className="display">What we use in the halls, bottled.</h2>
          </div>
          <div className="filters" role="group" aria-label="Filter products">
            {shopFilters.map((f) => (
              <button
                type="button"
                key={f}
                className={f === filter ? 'is-on' : undefined}
                aria-pressed={f === filter}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </header>

        <ul className="shelf">
          {list.map((p) => (
            <li className="specimen" key={p.id}>
              <div className="specimen__img">
                <Photo id={p.photo} alt={p.name} ratio={4 / 5} widths={[360, 640]} sizes="(max-width: 700px) 50vw, 30vw" />
              </div>
              <p className="specimen__badge">{p.badge ?? p.type}</p>
              <h3>{p.name}</h3>
              <p className="specimen__detail">{p.detail}</p>
              <p className="specimen__price">{inr(p.price)}</p>
              <button
                type="button"
                className="textbtn"
                onClick={() => onAdd({ key: `product:${p.id}`, name: p.name, detail: p.detail, price: p.price, ships: true })}
              >
                Add to bag
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- Gift card */

function GiftCard({ onAdd }) {
  const reduced = usePrefersReducedMotion()
  const [amount, setAmount] = useState(5000)
  const [custom, setCustom] = useState('')
  const [to, setTo] = useState('')
  const [note, setNote] = useState('')
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 30 })
  const stage = useRef(null)

  const value = custom ? Math.max(0, Number(custom)) : amount
  const valid = value >= 500 && value <= 50000

  // The card leans toward the pointer; a soft highlight follows it.
  const onMove = (event) => {
    if (reduced || !stage.current) return
    const rect = stage.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    setTilt({ x: (0.5 - py) * 14, y: (px - 0.5) * 18, gx: px * 100, gy: py * 100 })
  }

  return (
    <section className="gift" id="gift">
      <div className="wrap gift__grid">
        <div
          className="gift__stage"
          ref={stage}
          onPointerMove={onMove}
          onPointerLeave={() => setTilt({ x: 0, y: 0, gx: 50, gy: 30 })}
        >
          <div
            className="card3d"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              '--gx': `${tilt.gx}%`,
              '--gy': `${tilt.gy}%`,
            }}
          >
            <svg className="card3d__ripples" viewBox="0 0 400 250" aria-hidden="true">
              {[18, 42, 70, 102, 138, 178, 222].map((r) => (
                <circle key={r} cx="310" cy="64" r={r} />
              ))}
            </svg>
            <p className="card3d__mark">Stillwater</p>
            <p className="card3d__amount">{valid ? inr(value) : '—'}</p>
            <p className="card3d__to">
              <span>For</span>
              {to.trim() || 'Someone who needs it'}
            </p>
            {note.trim() && <p className="card3d__note">“{note.trim()}”</p>}
          </div>
        </div>

        <div className="gift__form">
          <p className="eyebrow">Gift cards</p>
          <h2 className="display">Give someone an afternoon off.</h2>
          <p className="body">Sent by email in minutes, good for baths, treatments and the apothecary.</p>

          <fieldset className="amounts">
            <legend>Amount</legend>
            {giftAmounts.map((a) => (
              <button
                type="button"
                key={a}
                className={!custom && a === amount ? 'is-on' : undefined}
                aria-pressed={!custom && a === amount}
                onClick={() => {
                  setAmount(a)
                  setCustom('')
                }}
              >
                {inr(a)}
              </button>
            ))}
            <label className="amounts__custom">
              <span className="sr-only">Custom amount in rupees</span>
              <input
                type="number"
                inputMode="numeric"
                min="500"
                max="50000"
                step="100"
                placeholder="Other"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
              />
            </label>
          </fieldset>
          {!valid && <p className="fine fine--alert">Choose an amount between ₹500 and ₹50,000.</p>}

          <div className="fields">
            <Line label="Recipient’s name">
              <input type="text" value={to} maxLength={28} onChange={(e) => setTo(e.target.value)} />
            </Line>
            <Line label={`A short note (${60 - note.length} left)`} wide>
              <input type="text" value={note} maxLength={60} onChange={(e) => setNote(e.target.value)} />
            </Line>
          </div>

          <button
            type="button"
            className="btn"
            disabled={!valid}
            onClick={() =>
              onAdd({
                key: `gift:${value}:${to.trim()}:${note.trim()}`,
                name: `Gift card — ${inr(value)}`,
                detail: to.trim() ? `For ${to.trim()}` : 'Sent by email',
                price: value,
              })
            }
          >
            Add gift card to bag
          </button>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- House notes */

function HouseNotes() {
  const [open, setOpen] = useState(0)

  return (
    <section className="notes">
      <div className="wrap notes__grid">
        <div>
          <p className="eyebrow">House notes</p>
          <h2 className="display">A few quiet rules.</h2>
          <ol className="rules">
            {etiquette.map((rule, i) => (
              <li key={rule}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {rule}
              </li>
            ))}
          </ol>
        </div>

        <div className="accordion">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className={isOpen ? 'is-open' : undefined}>
                <h3>
                  <button type="button" aria-expanded={isOpen} aria-controls={`note-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    {item.q}
                    <span aria-hidden="true">{isOpen ? '–' : '+'}</span>
                  </button>
                </h3>
                <p id={`note-${i}`} hidden={!isOpen}>
                  {item.a}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- Visit */

function Visit() {
  return (
    <section className="visit" id="visit">
      <div className="wrap visit__grid">
        <div className="visit__img">
          <Photo
            id={photos.bath}
            alt="A ribbed stone bathtub beside a slatted timber wall"
            ratio={4 / 5}
            widths={[480, 800, 1100]}
            sizes="(max-width: 900px) 100vw, 42vw"
          />
        </div>
        <div className="visit__copy">
          <p className="eyebrow">Visit</p>
          <h2 className="display">Ten minutes from the sea, a world from the road.</h2>
          <table className="times">
            <caption className="sr-only">Opening hours</caption>
            <tbody>
              {hours.map((row) => (
                <tr key={row.day}>
                  <th scope="row">{row.day}</th>
                  <td>{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <address>
            {brand.address[0]}
            <br />
            {brand.address[1]}
            <br />
            <a href={`tel:${brand.phone.replace(/\s/g, '')}`}>{brand.phone}</a> ·{' '}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
          <p className="fine">
            Parking in the mango grove behind the house. Step-free entry to the reception, changing
            rooms and warm pool; a hoist is available with a day’s notice.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Footer */

function Footer() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <p className="footer__mark">Stillwater</p>
          <p className="fine">
            {brand.descriptor}
            <br />
            {brand.address.join(', ')}
          </p>
        </div>
        <nav aria-label="Footer">
          <a href="#circuit">The circuit</a>
          <a href="#treatments">Treatments</a>
          <a href="#apothecary">Apothecary</a>
          <a href="#gift">Gift cards</a>
          <a href="#visit">Visit</a>
        </nav>
        <form
          className="footer__join"
          onSubmit={(e) => {
            e.preventDefault()
            if (/^\S+@\S+\.\S+$/.test(email)) setJoined(true)
          }}
          noValidate
        >
          {joined ? (
            <p className="body">Thank you. We write once a month, never more.</p>
          ) : (
            <>
              <Line label="Monthly letter">
                <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Line>
              <button type="submit" className="textbtn">
                Subscribe
              </button>
            </>
          )}
        </form>
      </div>
      <p className="wrap footer__fine">
        © {new Date().getFullYear()} Stillwater. A concept site — the bathhouse is fictional. Photography
        via Unsplash.
      </p>
    </footer>
  )
}

/* --------------------------------------------------------------------- Bag */

function Bag({ open, lines, onQty, onClear, onClose }) {
  const ref = useDialog(open, onClose)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [order, setOrder] = useState(null)

  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0)
  const shippable = lines.filter((l) => l.ships).reduce((sum, l) => sum + l.price * l.qty, 0)
  const delivery = shippable > 0 && shippable < FREE_DELIVERY ? DELIVERY : 0
  const toFree = Math.max(0, FREE_DELIVERY - shippable)

  const checkout = (event) => {
    event.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter an email address for your receipt.')
      return
    }
    setOrder({ ref: makeReference('SW'), total: subtotal + delivery, email })
    onClear()
  }

  const close = () => {
    setOrder(null)
    setError('')
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="veil"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.aside
            ref={ref}
            className="bag"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bag-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
          >
            <header>
              <h2 id="bag-title">{order ? 'Thank you' : `Your bag (${lines.reduce((s, l) => s + l.qty, 0)})`}</h2>
              <button type="button" className="textbtn" onClick={close}>
                Close
              </button>
            </header>

            {order ? (
              <div className="bag__body">
                <p className="display display--sm">Order placed.</p>
                <p className="body">
                  Reference <b>{order.ref}</b>. A receipt for {inr(order.total)} is on its way to{' '}
                  {order.email}. Gift cards and passes arrive by email; everything else ships in two
                  working days.
                </p>
                <button type="button" className="btn" onClick={close}>
                  Back to the house
                </button>
              </div>
            ) : lines.length === 0 ? (
              <div className="bag__body">
                <p className="body">Your bag is empty.</p>
                <a className="btn btn--ghost" href="#apothecary" onClick={close}>
                  Visit the apothecary
                </a>
              </div>
            ) : (
              <form className="bag__body" onSubmit={checkout} noValidate>
                {shippable > 0 && (
                  <div className="bag__meter">
                    <p>
                      {toFree > 0 ? `${inr(toFree)} away from free delivery` : 'Delivery is on us'}
                    </p>
                    <div aria-hidden="true">
                      <i style={{ width: `${Math.min(100, (shippable / FREE_DELIVERY) * 100)}%` }} />
                    </div>
                  </div>
                )}

                <ul className="bag__lines">
                  {lines.map((line) => (
                    <li key={line.key}>
                      <div>
                        <b>{line.name}</b>
                        <small>{line.detail}</small>
                      </div>
                      <div className="qty" role="group" aria-label={`${line.name} quantity`}>
                        <button type="button" onClick={() => onQty(line.key, line.qty - 1)} aria-label="Remove one">
                          −
                        </button>
                        <output>{line.qty}</output>
                        <button type="button" onClick={() => onQty(line.key, line.qty + 1)} aria-label="Add one">
                          +
                        </button>
                      </div>
                      <span>{inr(line.price * line.qty)}</span>
                    </li>
                  ))}
                </ul>

                <dl className="bag__sums">
                  <div>
                    <dt>Subtotal</dt>
                    <dd>{inr(subtotal)}</dd>
                  </div>
                  {shippable > 0 && (
                    <div>
                      <dt>Delivery</dt>
                      <dd>{delivery ? inr(delivery) : 'Free'}</dd>
                    </div>
                  )}
                  <div className="bag__total">
                    <dt>Total</dt>
                    <dd>{inr(subtotal + delivery)}</dd>
                  </div>
                </dl>

                <Line label="Email for your receipt" error={error}>
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    aria-invalid={Boolean(error)}
                  />
                </Line>
                <button type="submit" className="btn btn--block">
                  Place order — {inr(subtotal + delivery)}
                </button>
                <p className="fine">This is a demonstration checkout. Nothing is charged.</p>
              </form>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
