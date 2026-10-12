import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PortfolioBadge from '../shared/PortfolioBadge'
import { formatDate, inr } from '../shared/dates'
import { useDialog, useLocalStorage } from '../shared/hooks'
import Artwork from './Art'
import Room from './Room'
import {
  artistById,
  artists,
  brand,
  exhibitions,
  hours,
  inches,
  programme,
  showStatus,
  statusLabel,
  workById,
  works,
} from './data'

const sections = [
  { id: 'now', label: 'Now showing' },
  { id: 'exhibitions', label: 'Exhibitions' },
  { id: 'works', label: 'Works' },
  { id: 'artists', label: 'Artists' },
  { id: 'programme', label: 'Programme' },
  { id: 'visit', label: 'Visit' },
]

const current = exhibitions.find((show) => ['current', 'closing'].includes(showStatus(show).key)) ?? exhibitions[0]
const currentWorks = works.filter((w) => w.show === current.id)
const span = (show) =>
  `${formatDate(show.start, { day: 'numeric', month: 'short' })} – ${formatDate(show.end, { day: 'numeric', month: 'short', year: 'numeric' })}`

const priceOf = (work) => (work.status === 'sold' ? 'Sold' : work.price ? inr(work.price) : 'Price on request')

export default function App() {
  const [shortlist, setShortlist] = useLocalStorage('ninefold:shortlist', [])
  const [openId, setOpenId] = useState(null)
  const [listOpen, setListOpen] = useState(false)
  const [roomIndex, setRoomIndex] = useState(0)
  const [artistFilter, setArtistFilter] = useState('all')
  const active = useActiveSection()

  const toggleShortlist = (id) =>
    setShortlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const viewInRoom = (id) => {
    const index = currentWorks.findIndex((w) => w.id === id)
    setOpenId(null)
    if (index >= 0) setRoomIndex(index)
    document.getElementById('room')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const showArtist = (id) => {
    setArtistFilter(id)
    document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <aside className="rail" aria-label="Sections">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'is-active' : undefined}>
            {s.label}
          </a>
        ))}
      </aside>

      <header className="top">
        <a className="top__mark" href="#now">
          Ninefold
        </a>
        <p className="top__meta">
          {brand.place} · <OpenNow />
        </p>
        <button type="button" className="ghost" onClick={() => setListOpen(true)}>
          Shortlist ({shortlist.length})
        </button>
      </header>

      <main>
        <Now roomIndex={roomIndex} onRoomIndex={setRoomIndex} onOpen={setOpenId} />
        <Exhibitions onOpen={setOpenId} />
        <Works
          artistFilter={artistFilter}
          onArtistFilter={setArtistFilter}
          shortlist={shortlist}
          onToggle={toggleShortlist}
          onOpen={setOpenId}
        />
        <Artists onShow={showArtist} />
        <Programme />
        <Visit />
      </main>

      <footer className="foot">
        <p>© {new Date().getFullYear()} Ninefold</p>
        <p>A concept site. The gallery, its artists and their works are invented; the works are generated in code.</p>
        <p>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
        </p>
      </footer>

      <Detail
        id={openId}
        onClose={() => setOpenId(null)}
        onStep={setOpenId}
        saved={shortlist.includes(openId)}
        onToggle={toggleShortlist}
        onRoom={viewInRoom}
      />
      <Shortlist
        open={listOpen}
        ids={shortlist}
        onClose={() => setListOpen(false)}
        onRemove={toggleShortlist}
        onOpen={(id) => {
          setListOpen(false)
          setOpenId(id)
        }}
      />
      <PortfolioBadge />
    </>
  )
}

/** Which section the reader is in, for the rotated rail on the left. */
function useActiveSection() {
  const [active, setActive] = useState('now')
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id))
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return active
}

function OpenNow() {
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours() + now.getMinutes() / 60
  const [open, close] = day === 1 ? [0, 0] : day === 0 ? [12, 17] : [11, 19]
  const isOpen = hour >= open && hour < close
  return (
    <span className={isOpen ? 'flag' : undefined}>
      {isOpen ? `Open until ${close}:00` : day === 1 ? 'Closed Mondays' : hour < open ? `Opens ${open}:00` : 'Closed for today'}
    </span>
  )
}

function Status({ show }) {
  const status = showStatus(show)
  return <span className={status.key === 'past' ? 'muted' : 'flag'}>{status.label}</span>
}

/* --------------------------------------------------------------- Now showing */

function Now({ roomIndex, onRoomIndex, onOpen }) {
  return (
    <section className="block now" id="now">
      <div className="block__label">
        <span>01</span>
        <span>Now showing</span>
      </div>

      <div className="now__head">
        <h1 className="mega">{current.title}</h1>
        <dl className="spec">
          <div>
            <dt>Dates</dt>
            <dd>{span(current)}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <Status show={current} />
            </dd>
          </div>
          <div>
            <dt>Artists</dt>
            <dd>{current.artists.map((id) => artistById[id].name).join(', ')}</dd>
          </div>
          <div>
            <dt>Admission</dt>
            <dd>Free</dd>
          </div>
        </dl>
        <p className="now__text">{current.text}</p>
      </div>

      <div className="now__room" id="room">
        <Room works={currentWorks} index={roomIndex} onIndex={onRoomIndex} onOpen={onOpen} />
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- Exhibitions */

function Exhibitions({ onOpen }) {
  const ordered = [...exhibitions].sort((a, b) => b.start - a.start)

  return (
    <section className="block" id="exhibitions">
      <div className="block__label">
        <span>02</span>
        <span>Exhibitions</span>
      </div>

      <ul className="index">
        {ordered.map((show) => {
          const pieces = works.filter((w) => w.show === show.id).slice(0, 3)
          return (
            <li key={show.id}>
              <p className="index__dates">
                {span(show)}
                <Status show={show} />
              </p>
              <div className="index__main">
                <h2>{show.title}</h2>
                <p className="muted">{show.kind} · {show.artists.map((id) => artistById[id].name).join(', ')}</p>
                <p className="index__text">{show.text}</p>
              </div>
              <div className="index__thumbs">
                {pieces.map((work) => (
                  <button type="button" key={work.id} onClick={() => onOpen(work.id)} aria-label={`Open ${work.title}`}>
                    <Artwork work={work} />
                  </button>
                ))}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/* -------------------------------------------------------------------- Works */

const sorts = {
  recent: { label: 'Most recent', fn: (a, b) => b.year - a.year },
  low: { label: 'Price, low to high', fn: (a, b) => (a.price ?? Infinity) - (b.price ?? Infinity) },
  high: { label: 'Price, high to low', fn: (a, b) => (b.price ?? -1) - (a.price ?? -1) },
  size: { label: 'Largest first', fn: (a, b) => b.w * b.h - a.w * a.h },
}

function Works({ artistFilter, onArtistFilter, shortlist, onToggle, onOpen }) {
  const [medium, setMedium] = useState('all')
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [sort, setSort] = useState('recent')

  const mediums = useMemo(() => [...new Set(works.map((w) => w.medium))].sort(), [])
  const list = useMemo(
    () =>
      works
        .filter((w) => artistFilter === 'all' || w.artist === artistFilter)
        .filter((w) => medium === 'all' || w.medium === medium)
        .filter((w) => !onlyAvailable || w.status === 'available')
        .sort(sorts[sort].fn),
    [artistFilter, medium, onlyAvailable, sort],
  )

  const reset = () => {
    onArtistFilter('all')
    setMedium('all')
    setOnlyAvailable(false)
  }

  return (
    <section className="block" id="works">
      <div className="block__label">
        <span>03</span>
        <span>Works</span>
      </div>

      <div className="filterbar">
        <label>
          <span>Artist</span>
          <select value={artistFilter} onChange={(e) => onArtistFilter(e.target.value)}>
            <option value="all">All artists</option>
            {artists.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Medium</span>
          <select value={medium} onChange={(e) => setMedium(e.target.value)}>
            <option value="all">All media</option>
            {mediums.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {Object.entries(sorts).map(([key, s]) => (
              <option key={key} value={key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label className="filterbar__check">
          <input type="checkbox" checked={onlyAvailable} onChange={(e) => setOnlyAvailable(e.target.checked)} />
          <span>Available only</span>
        </label>
        <p className="filterbar__count" aria-live="polite">
          {list.length} {list.length === 1 ? 'work' : 'works'}
        </p>
      </div>

      {list.length === 0 ? (
        <div className="empty">
          <p>No works match those filters.</p>
          <button type="button" className="ghost" onClick={reset}>
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="grid">
          {list.map((work) => {
            const saved = shortlist.includes(work.id)
            return (
              <li key={work.id}>
                <button type="button" className="grid__art" onClick={() => onOpen(work.id)} aria-label={`Open ${work.title}`}>
                  <Artwork work={work} />
                </button>
                <div className="grid__cap">
                  <p>
                    {artistById[work.artist].name}
                    <br />
                    <i>{work.title}</i>, {work.year}
                  </p>
                  <p className="muted">
                    {work.medium}
                    <br />
                    {work.w} × {work.h} cm
                  </p>
                  <p className="grid__price">
                    <span className={`dot dot--${work.status}`} aria-hidden="true" />
                    {work.status === 'hold' ? <span className="flag">On hold</span> : priceOf(work)}
                  </p>
                  <button type="button" className="ghost" aria-pressed={saved} onClick={() => onToggle(work.id)}>
                    {saved ? 'Shortlisted' : 'Shortlist +'}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

/* ------------------------------------------------------------------ Artists */

function Artists({ onShow }) {
  const sorted = [...artists].sort((a, b) => a.name.split(' ').pop().localeCompare(b.name.split(' ').pop()))

  return (
    <section className="block" id="artists">
      <div className="block__label">
        <span>04</span>
        <span>Artists</span>
      </div>

      <ul className="roster">
        {sorted.map((artist) => {
          const count = works.filter((w) => w.artist === artist.id).length
          return (
            <li key={artist.id}>
              <h2>{artist.name}</h2>
              <p className="muted">
                b. {artist.born}
                <br />
                {artist.based}
              </p>
              <p className="roster__bio">{artist.bio}</p>
              <button type="button" className="ghost" onClick={() => onShow(artist.id)}>
                {count} {count === 1 ? 'work' : 'works'} →
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/* ---------------------------------------------------------------- Programme */

function Programme() {
  const [openId, setOpenId] = useState(null)
  const [done, setDone] = useLocalStorage('ninefold:rsvp', [])
  const [form, setForm] = useState({ name: '', email: '' })
  const [error, setError] = useState('')

  const submit = (event, id) => {
    event.preventDefault()
    if (form.name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Enter your name and a valid email address.')
      return
    }
    setDone((prev) => [...prev, id])
    setOpenId(null)
    setError('')
  }

  return (
    <section className="block" id="programme">
      <div className="block__label">
        <span>05</span>
        <span>Programme</span>
      </div>

      <ul className="events">
        {programme.map((event) => {
          const booked = done.includes(event.id)
          const isOpen = openId === event.id
          return (
            <li key={event.id}>
              <p className="events__date">
                {formatDate(event.date, { weekday: 'short', day: 'numeric', month: 'short' })}
                <span className="muted">{event.time}</span>
              </p>
              <div className="events__main">
                <p className="muted">{event.type}</p>
                <h2>{event.title}</h2>
              </div>
              <p className="events__meta">
                {event.free ? 'Free' : inr(event.price)}
                <span className={event.places <= 6 ? 'flag' : 'muted'}>
                  {booked ? 'You are on the list' : `${event.places} places left`}
                </span>
              </p>
              {booked ? (
                <span className="events__done">Reserved</span>
              ) : (
                <button type="button" className="ghost" aria-expanded={isOpen} onClick={() => setOpenId(isOpen ? null : event.id)}>
                  {isOpen ? 'Cancel' : 'RSVP'}
                </button>
              )}

              {isOpen && (
                <form className="events__form" onSubmit={(e) => submit(e, event.id)} noValidate>
                  <label>
                    <span>Name</span>
                    <input type="text" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoFocus />
                  </label>
                  <label>
                    <span>Email</span>
                    <input type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </label>
                  <button type="submit" className="solid">
                    Reserve a place
                  </button>
                  {error && <p className="alert">{error}</p>}
                </form>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/* -------------------------------------------------------------------- Visit */

function Visit() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  return (
    <section className="block" id="visit">
      <div className="block__label">
        <span>06</span>
        <span>Visit</span>
      </div>

      <div className="visit">
        <div>
          <h2 className="visit__lead">
            A former spice godown on the harbour road, nine rooms deep. Admission is always free.
          </h2>
        </div>
        <dl className="spec spec--wide">
          {hours.map((row) => (
            <div key={row.day}>
              <dt>{row.day}</dt>
              <dd>{row.time}</dd>
            </div>
          ))}
          <div>
            <dt>Address</dt>
            <dd>
              {brand.address[0]}
              <br />
              {brand.address[1]}
            </dd>
          </div>
          <div>
            <dt>Getting here</dt>
            <dd>Ten minutes on foot from the Fort Kochi ferry jetty. No parking on Calvathy Road; use the lot by the bus stand.</dd>
          </div>
          <div>
            <dt>Access</dt>
            <dd>Step-free from the street to rooms one to six. Rooms seven to nine are up a short flight; a film of those rooms plays in room six.</dd>
          </div>
          <div>
            <dt>Enquiries</dt>
            <dd>
              <a href={`tel:${brand.phone.replace(/\s/g, '')}`}>{brand.phone}</a>
              <br />
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </dd>
          </div>
        </dl>

        <form
          className="letter"
          onSubmit={(e) => {
            e.preventDefault()
            if (/^\S+@\S+\.\S+$/.test(email)) setJoined(true)
          }}
          noValidate
        >
          {joined ? (
            <p>Thank you. Invitations go out a fortnight before each opening.</p>
          ) : (
            <>
              <label>
                <span>Opening invitations by email</span>
                <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <button type="submit" className="ghost">
                Subscribe →
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- Detail */

function Detail({ id, onClose, onStep, saved, onToggle, onRoom }) {
  const work = id ? workById[id] : null
  const ref = useDialog(Boolean(work), onClose)
  const [zoom, setZoom] = useState(false)
  const [origin, setOrigin] = useState('50% 50%')
  const [enquiring, setEnquiring] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [error, setError] = useState('')
  const stage = useRef(null)

  useEffect(() => {
    setZoom(false)
    setEnquiring(false)
    setSent(false)
    setError('')
    if (id) setForm((prev) => ({ ...prev, message: `I would like to know more about “${workById[id].title}”.` }))
  }, [id])

  // Arrow keys step through the collection while the overlay is open.
  useEffect(() => {
    if (!work) return undefined
    const onKey = (event) => {
      if (event.target?.closest?.('input, textarea')) return
      const index = works.findIndex((w) => w.id === work.id)
      if (event.key === 'ArrowRight') onStep(works[(index + 1) % works.length].id)
      if (event.key === 'ArrowLeft') onStep(works[(index - 1 + works.length) % works.length].id)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [work, onStep])

  const track = (event) => {
    if (!zoom || !stage.current) return
    const rect = stage.current.getBoundingClientRect()
    setOrigin(`${((event.clientX - rect.left) / rect.width) * 100}% ${((event.clientY - rect.top) / rect.height) * 100}%`)
  }

  const send = (event) => {
    event.preventDefault()
    if (form.name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Enter your name and a valid email address.')
      return
    }
    setSent(true)
  }

  return (
    <AnimatePresence>
      {work && (
        <motion.div
          ref={ref}
          className="detail"
          role="dialog"
          aria-modal="true"
          aria-label={`${work.title} by ${artistById[work.artist].name}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <header className="detail__bar">
            <p>
              {String(works.findIndex((w) => w.id === work.id) + 1).padStart(2, '0')} / {works.length}
            </p>
            <div>
              <button type="button" className="ghost" onClick={() => onStep(works[(works.findIndex((w) => w.id === work.id) - 1 + works.length) % works.length].id)}>
                ← Previous
              </button>
              <button type="button" className="ghost" onClick={() => onStep(works[(works.findIndex((w) => w.id === work.id) + 1) % works.length].id)}>
                Next →
              </button>
              <button type="button" className="ghost" onClick={onClose} data-autofocus>
                Close ✕
              </button>
            </div>
          </header>

          <div className="detail__body">
            <div
              className={`detail__stage${zoom ? ' is-zoomed' : ''}`}
              ref={stage}
              onClick={() => setZoom((z) => !z)}
              onPointerMove={track}
              role="button"
              tabIndex={0}
              aria-label={zoom ? 'Zoom out' : 'Zoom in'}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setZoom((z) => !z)}
            >
              <div
                style={{
                  '--ar': work.w / work.h,
                  aspectRatio: `${work.w} / ${work.h}`,
                  transformOrigin: origin,
                  transform: zoom ? 'scale(2.4)' : 'none',
                }}
              >
                <Artwork work={work} />
              </div>
            </div>

            <div className="detail__side">
              <p className="detail__artist">{artistById[work.artist].name}</p>
              <h2 className="detail__title">
                <i>{work.title}</i>, {work.year}
              </h2>

              <dl className="spec spec--tight">
                <div>
                  <dt>Medium</dt>
                  <dd>{work.medium}</dd>
                </div>
                <div>
                  <dt>Dimensions</dt>
                  <dd>
                    {work.w} × {work.h} cm
                    <br />
                    {inches(work.w)} × {inches(work.h)} in
                  </dd>
                </div>
                <div>
                  <dt>Edition</dt>
                  <dd>{work.edition}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>
                    <span className={`dot dot--${work.status}`} aria-hidden="true" />
                    {work.status === 'hold' ? <span className="flag">On hold</span> : statusLabel[work.status]}
                  </dd>
                </div>
                <div>
                  <dt>Price</dt>
                  <dd>{priceOf(work)}</dd>
                </div>
              </dl>

              <p className="detail__bio">{artistById[work.artist].bio}</p>

              {sent ? (
                <p className="detail__sent">
                  Thank you, {form.name.trim().split(' ')[0]}. The desk will reply within one working day.
                </p>
              ) : enquiring ? (
                <form className="enquiry" onSubmit={send} noValidate>
                  <label>
                    <span>Name</span>
                    <input type="text" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoFocus />
                  </label>
                  <label>
                    <span>Email</span>
                    <input type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </label>
                  <label>
                    <span>Message</span>
                    <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </label>
                  {error && <p className="alert">{error}</p>}
                  <div className="detail__actions">
                    <button type="submit" className="solid">
                      Send enquiry
                    </button>
                    <button type="button" className="ghost" onClick={() => setEnquiring(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="detail__actions">
                  <button type="button" className="solid" disabled={work.status === 'sold'} onClick={() => setEnquiring(true)}>
                    {work.status === 'sold' ? 'Sold' : 'Enquire'}
                  </button>
                  <button type="button" className="ghost" aria-pressed={saved} onClick={() => onToggle(work.id)}>
                    {saved ? 'Shortlisted ✓' : 'Add to shortlist'}
                  </button>
                  {work.show === current.id && (
                    <button type="button" className="ghost" onClick={() => onRoom(work.id)}>
                      View in the room
                    </button>
                  )}
                </div>
              )}
              <p className="muted detail__hint">Click the work to zoom. Use ← → to move through the collection.</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------------------------------------------------------------- Shortlist */

function Shortlist({ open, ids, onClose, onRemove, onOpen }) {
  const ref = useDialog(open, onClose)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const list = ids.map((id) => workById[id]).filter(Boolean)
  const total = list.reduce((sum, w) => sum + (w.status !== 'sold' && w.price ? w.price : 0), 0)
  const unpriced = list.some((w) => !w.price && w.status !== 'sold')

  useEffect(() => {
    if (open) {
      setSent(false)
      setError('')
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="shade"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.aside
            ref={ref}
            className="list"
            role="dialog"
            aria-modal="true"
            aria-labelledby="list-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0, 0, 0.2, 1] }}
          >
            <header>
              <h2 id="list-title">Shortlist ({list.length})</h2>
              <button type="button" className="ghost" onClick={onClose}>
                Close ✕
              </button>
            </header>

            {list.length === 0 ? (
              <p className="list__empty">
                Nothing shortlisted yet. Use “Shortlist +” under any work to keep it here while you look.
              </p>
            ) : (
              <>
                <ul>
                  {list.map((work) => (
                    <li key={work.id}>
                      <button type="button" className="list__art" onClick={() => onOpen(work.id)} aria-label={`Open ${work.title}`}>
                        <Artwork work={work} />
                      </button>
                      <p>
                        {artistById[work.artist].name}
                        <br />
                        <i>{work.title}</i>
                        <span className="muted">{priceOf(work)}</span>
                      </p>
                      <button type="button" className="ghost" onClick={() => onRemove(work.id)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>

                <p className="list__total">
                  <span>Listed total</span>
                  {inr(total)}
                  {unpriced && <span className="muted">plus works priced on request</span>}
                </p>

                {sent ? (
                  <p className="list__sent">Sent. The desk will come back to you about all {list.length} works.</p>
                ) : (
                  <form
                    className="enquiry"
                    onSubmit={(e) => {
                      e.preventDefault()
                      if (!/^\S+@\S+\.\S+$/.test(email)) {
                        setError('Enter a valid email address.')
                        return
                      }
                      setSent(true)
                    }}
                    noValidate
                  >
                    <label>
                      <span>Email</span>
                      <input type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setError('') }} />
                    </label>
                    {error && <p className="alert">{error}</p>}
                    <button type="submit" className="solid">
                      Enquire about all {list.length}
                    </button>
                  </form>
                )}
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
