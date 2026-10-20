import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PortfolioBadge from '../shared/PortfolioBadge'
import { Photo } from '../shared/img'
import { inr } from '../shared/dates'
import { useDialog, useFlash, useLocalStorage } from '../shared/hooks'
import {
  climate,
  eats,
  interests,
  months,
  paces,
  placeById,
  places,
  rides,
  routes,
  slotLabels,
  stays,
  tips,
  zones,
} from './data'
import {
  addStop,
  buildPlan,
  clock,
  duration,
  moveStop,
  planAsText,
  removeStop,
  schedule,
  swapStop,
  usedPlaceIds,
} from './planner'
import TripMap from './Map'
import { onMap } from './geo'
import Tile from './Tile'

const defaultPrefs = {
  days: 3,
  pace: 'balanced',
  interests: ['heritage', 'beach', 'food'],
  month: new Date().getMonth(),
}

export default function App() {
  const [prefs, setPrefs] = useLocalStorage('pondy:prefs', defaultPrefs)
  const [seed, setSeed] = useLocalStorage('pondy:seed', 1)
  const [plan, setPlan] = useLocalStorage('pondy:plan', null)
  const [dayIndex, setDayIndex] = useState(0)
  const [sheet, setSheet] = useState(null)
  const built = useRef(false)

  // First visit: draw up a plan straight away so the page is never empty.
  useEffect(() => {
    if (!plan && !built.current) {
      built.current = true
      setPlan(buildPlan(prefs, seed))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const rebuild = (nextPrefs, nextSeed = seed) => {
    setPrefs(nextPrefs)
    setSeed(nextSeed)
    setPlan(buildPlan(nextPrefs, nextSeed))
    setDayIndex((i) => Math.min(i, nextPrefs.days - 1))
  }

  const days = plan ?? []
  const safeIndex = Math.min(dayIndex, Math.max(0, days.length - 1))
  const updateDay = (index, fn) => setPlan((prev) => prev.map((d, i) => (i === index ? fn(d) : d)))

  const goToPlanner = () => document.getElementById('plan')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <nav className="topnav" aria-label="Sections">
        <a className="topnav__mark" href="#top">
          Bonjour Pondy
        </a>
        <div className="topnav__links">
          <a href="#places">Places</a>
          <a href="#when">When to go</a>
          <a href="#budget">Budget</a>
          <a href="#arrive">Getting there</a>
        </div>
        <a className="topnav__cta" href="#plan">
          Your plan
        </a>
      </nav>

      <Hero
        prefs={prefs}
        onBuild={(next) => {
          rebuild(next, seed + 1)
          goToPlanner()
        }}
      />

      <main>
        <Planner
          prefs={prefs}
          days={days}
          dayIndex={safeIndex}
          onDay={setDayIndex}
          onPrefs={(next) => rebuild(next)}
          onShuffle={() => rebuild(prefs, seed + 1)}
          onUpdateDay={updateDay}
          onSwap={(uid) => setPlan((prev) => swapStop(prev, safeIndex, uid, prefs))}
          onOpen={setSheet}
        />
        <Directory days={days} onOpen={setSheet} />
        <Seasons month={prefs.month} onMonth={(month) => setPrefs({ ...prefs, month })} />
        <Budget days={days} prefs={prefs} />
        <Arrive />
      </main>

      <footer className="foot">
        <div className="wrap foot__in">
          <p className="foot__mark">Bonjour Pondy</p>
          <p>
            Opening hours, ferry timings and prices change with the season. Treat everything here as a
            starting point and check locally before you set out.
          </p>
          <p>
            A concept site by Tejaswi Dubey. Photography via Unsplash; map and illustrations drawn for
            this project.
          </p>
        </div>
      </footer>

      <PlaceSheet
        place={sheet}
        days={days}
        onClose={() => setSheet(null)}
        onAdd={(index) => {
          updateDay(index, (d) => addStop(d, sheet.id))
          setDayIndex(index)
          setSheet(null)
          goToPlanner()
        }}
      />
      <PortfolioBadge />
    </>
  )
}

const iconPaths = {
  up: 'M8 13V3M3.5 7.5 8 3l4.5 4.5',
  down: 'M8 3v10M3.5 8.5 8 13l4.5-4.5',
  swap: 'M2.5 5.5h10m0 0L10 3m2.5 2.5L10 8M13.5 10.5h-10m0 0L6 8m-2.5 2.5L6 13',
  close: 'M3.5 3.5l9 9m0-9l-9 9',
}

const Icon = ({ name }) => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={iconPaths[name]} />
  </svg>
)

const bestPhrase = {
  sunrise: 'at sunrise',
  morning: 'in the morning',
  midday: 'around midday',
  afternoon: 'in the afternoon',
  sunset: 'at sunset',
  evening: 'in the evening',
}

const legText = (leg) => {
  const how = leg.mode === 'walk' ? 'walk' : leg.mode === 'car' ? 'by car' : 'by scooter'
  const far =
    leg.km < 1 ? `${Math.round((leg.km * 1000) / 50) * 50} m` : leg.km < 20 ? `${leg.km.toFixed(1)} km` : `${Math.round(leg.km)} km`
  return `${duration(leg.mins)} ${how} · ${far}`
}

const monthName = (index) => new Date(2024, index, 1).toLocaleString('en', { month: 'long' })

const categoryIcons = {
  heritage: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18M4 18h16M4 10h16M12 3l9 5H3l9-5zM6 10v8M10 10v8M14 10v8M18 10v8" />
    </svg>
  ),
  beach: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 11c2.5-2 5-2 7.5 0s5 2 7.5 0 5-2 7 0" />
      <path d="M2 16c2.5-2 5-2 7.5 0s5 2 7.5 0 5-2 7 0" />
    </svg>
  ),
  food: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  spirit: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4c1.5 3 2.5 6 0 10-2.5-4-1.5-7 0-10z" />
      <path d="M12 14c-3-2-6-1.5-8 1 2 2.5 5 2.5 8-1z" />
      <path d="M12 14c3-2 6-1.5 8 1-2 2.5-5 2.5-8-1z" />
      <path d="M12 14c-4-4-7-3-9-1 1 3.5 5 4 9 1z" />
      <path d="M12 14c4-4 7-3 9-1-1 3.5-5 4-9 1z" />
    </svg>
  ),
  nature: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  ),
  shop: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
}

/* -------------------------------------------------------------------- Hero */

function Hero({ prefs, onBuild }) {
  const [draft, setDraft] = useState(prefs)

  const toggle = (id) =>
    setDraft((d) => ({
      ...d,
      interests: d.interests.includes(id) ? d.interests.filter((x) => x !== id) : [...d.interests, id],
    }))

  return (
    <header className="hero" id="top">
      <div className="wrap hero__in">
        <h1 className="hero__title">
          <span>Pondy, planned</span>
          <span>in one minute.</span>
        </h1>
        <p className="hero__lede">
          Tell us how long you have and what you like. We will lay out the French Quarter, Auroville
          and the beaches into days that actually fit — on a map you can rearrange.
        </p>

        <form
          className="quick"
          onSubmit={(e) => {
            e.preventDefault()
            onBuild(draft)
          }}
        >
          <fieldset className="quick__days">
            <legend>How many days?</legend>
            <div className="stepper">
              <button
                type="button"
                onClick={() => setDraft((d) => ({ ...d, days: Math.max(1, d.days - 1) }))}
                disabled={draft.days <= 1}
                aria-label="Fewer days"
              >
                −
              </button>
              <output aria-live="polite">{draft.days}</output>
              <button
                type="button"
                onClick={() => setDraft((d) => ({ ...d, days: Math.min(5, d.days + 1) }))}
                disabled={draft.days >= 5}
                aria-label="More days"
              >
                +
              </button>
            </div>
          </fieldset>

          <label className="quick__month">
            <span>Which month?</span>
            <div className="quick__select-box">
              <select
                value={draft.month}
                onChange={(e) => setDraft((d) => ({ ...d, month: Number(e.target.value) }))}
              >
                {months.map((label, i) => (
                  <option key={label} value={i}>
                    {monthName(i)}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <fieldset className="quick__likes">
            <legend>What are you here for?</legend>
            <div className="chips chips--grid">
              {interests.map((item) => {
                const on = draft.interests.includes(item.id)
                return (
                  <button
                    type="button"
                    key={item.id}
                    className={`chip${on ? ' is-on' : ''}`}
                    aria-pressed={on}
                    onClick={() => toggle(item.id)}
                  >
                    <span className="chip__icon">{categoryIcons[item.id]}</span>
                    <span className="chip__label">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <button type="submit" className="btn btn--go btn--hero-go">
            <span>Build my trip</span>
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </button>
        </form>
      </div>
    </header>
  )
}

/* ----------------------------------------------------------------- Planner */

function Planner({ prefs, days, dayIndex, onDay, onPrefs, onShuffle, onUpdateDay, onSwap, onOpen }) {
  const [activeUid, setActiveUid] = useState(null)
  const [adding, setAdding] = useState(false)
  const [message, flash] = useFlash()
  const rowRefs = useRef({})

  const day = days[dayIndex]
  const timetable = useMemo(() => (day ? schedule(day) : null), [day])

  const mapStops = useMemo(
    () =>
      timetable
        ? timetable.rows.map((row, i) => ({
            uid: row.stop.uid,
            kind: row.stop.kind,
            order: i + 1,
            name: row.stop.kind === 'meal' ? row.stop.meal.name : row.point.name,
            point: row.point,
          }))
        : [],
    [timetable],
  )
  const offMap = mapStops.filter((s) => s.kind === 'place' && !onMap(s.point)).map((s) => s.name)

  const pick = (uid) => {
    setActiveUid(uid)
    rowRefs.current[uid]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(planAsText(days))
      flash('Copied to your clipboard')
    } catch {
      flash('Copying is blocked in this browser')
    }
  }

  const toggleInterest = (id) =>
    onPrefs({
      ...prefs,
      interests: prefs.interests.includes(id) ? prefs.interests.filter((x) => x !== id) : [...prefs.interests, id],
    })

  return (
    <section className="plan" id="plan">
      <div className="wrap">
        <header className="plan__head">
          <h2 className="title title--light">Your {days.length || prefs.days} days in Pondicherry</h2>
          <div className="plan__actions">
            <span className="flash" role="status">
              {message}
            </span>
            <button type="button" className="btn btn--line" onClick={onShuffle}>
              Shuffle
            </button>
            <button type="button" className="btn btn--line" onClick={copy}>
              Copy plan
            </button>
            <button type="button" className="btn btn--line" onClick={() => window.print()}>
              Print
            </button>
          </div>
        </header>

        <p className="season">
          <b>
            {monthName(prefs.month)} · {climate.verdict[prefs.month].rating}
          </b>
          {climate.verdict[prefs.month].text} <a href="#when">Compare months</a>
        </p>

        <div className="board">
          <div className="board__controls">
            <div className="control">
              <span className="control__label">Days</span>
              <div className="stepper stepper--sm">
                <button type="button" onClick={() => onPrefs({ ...prefs, days: prefs.days - 1 })} disabled={prefs.days <= 1} aria-label="Fewer days">
                  −
                </button>
                <output>{prefs.days}</output>
                <button type="button" onClick={() => onPrefs({ ...prefs, days: prefs.days + 1 })} disabled={prefs.days >= 5} aria-label="More days">
                  +
                </button>
              </div>
            </div>

            <div className="control">
              <span className="control__label">Pace</span>
              <div className="tabs" role="group" aria-label="Pace">
                {paces.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    className={p.id === prefs.pace ? 'is-on' : undefined}
                    aria-pressed={p.id === prefs.pace}
                    title={p.note}
                    onClick={() => onPrefs({ ...prefs, pace: p.id })}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="control control--wide">
              <span className="control__label">Interests</span>
              <div className="chips chips--sm">
                {interests.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className={`chip${prefs.interests.includes(item.id) ? ' is-on' : ''}`}
                    aria-pressed={prefs.interests.includes(item.id)}
                    onClick={() => toggleInterest(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="board__body">
            <div className="board__list">
              <div className="daytabs" role="tablist" aria-label="Days">
                {days.map((d, i) => (
                  <button
                    type="button"
                    key={i}
                    role="tab"
                    aria-selected={i === dayIndex}
                    className={i === dayIndex ? 'is-on' : undefined}
                    onClick={() => {
                      onDay(i)
                      setActiveUid(null)
                      setAdding(false)
                    }}
                  >
                    <span>Day {i + 1}</span>
                    {zones[d.zone].label}
                  </button>
                ))}
              </div>

              {day && timetable && (
                <div role="tabpanel">
                  <div className="dayhead">
                    <h3>{day.title}</h3>
                    <p>
                      {clock(timetable.start)} – {clock(timetable.end)} · {timetable.km < 20 ? timetable.km.toFixed(1) : Math.round(timetable.km)} km ·{' '}
                      {timetable.mode === 'foot' ? 'all on foot' : timetable.mode === 'car' ? 'car and driver' : 'scooter and walking'} · about{' '}
                      {inr(timetable.cost + timetable.transport)} each
                    </p>
                  </div>

                  {timetable.outbound && (
                    <p className="hop hop--out">
                      <b>Leave town by {clock(timetable.start)}</b>
                      {legText(timetable.outbound)}
                    </p>
                  )}

                  <ol className="stops">
                    {timetable.rows.map((row, i) => {
                      const isMeal = row.stop.kind === 'meal'
                      const name = isMeal ? row.stop.meal.name : row.point.name
                      return (
                        <li key={row.stop.uid}>
                          {row.leg && row.leg.mode !== 'here' && (
                            <p className="hop">
                              {legText(row.leg)}
                              {row.free > 0 && <em>then {duration(row.free)} free</em>}
                            </p>
                          )}

                          <div
                            className={`stop${row.stop.uid === activeUid ? ' is-active' : ''}${isMeal ? ' stop--meal' : ''}`}
                            ref={(el) => {
                              rowRefs.current[row.stop.uid] = el
                            }}
                          >
                            <button type="button" className="stop__no" onClick={() => setActiveUid(row.stop.uid)} aria-label={`Show stop ${i + 1} on the map`}>
                              {i + 1}
                            </button>

                            <div className="stop__main">
                              <p className="stop__time">
                                {clock(row.start)} <span>· {duration(row.point.mins)}</span>
                              </p>
                              {isMeal ? (
                                <h4>{name}</h4>
                              ) : (
                                <h4>
                                  <button type="button" onClick={() => onOpen(row.point)}>
                                    {name}
                                  </button>
                                </h4>
                              )}
                              <p className="stop__meta">
                                <span className="tag">{slotLabels[row.stop.slot]}</span>
                                <span>{(isMeal ? row.stop.meal.cost : row.point.cost) ? `about ${inr(isMeal ? row.stop.meal.cost : row.point.cost)}` : 'Free'}</span>
                              </p>
                              {!isMeal && row.stop.uid === activeUid && <p className="stop__tip">{row.point.tip}</p>}
                            </div>

                            <div className="stop__tools">
                              <button type="button" onClick={() => onUpdateDay(dayIndex, (d) => moveStop(d, row.stop.uid, -1))} disabled={i === 0} aria-label={`Move ${name} earlier`}>
                                <Icon name="up" />
                              </button>
                              <button type="button" onClick={() => onUpdateDay(dayIndex, (d) => moveStop(d, row.stop.uid, 1))} disabled={i === timetable.rows.length - 1} aria-label={`Move ${name} later`}>
                                <Icon name="down" />
                              </button>
                              {!isMeal && (
                                <button type="button" onClick={() => onSwap(row.stop.uid)} aria-label={`Swap ${name} for something else`} title="Swap for something else">
                                  <Icon name="swap" />
                                </button>
                              )}
                              <button type="button" onClick={() => onUpdateDay(dayIndex, (d) => removeStop(d, row.stop.uid))} aria-label={`Remove ${name}`}>
                                <Icon name="close" />
                              </button>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ol>

                  <AddStop
                    open={adding}
                    onToggle={() => setAdding((v) => !v)}
                    used={usedPlaceIds(days)}
                    onAdd={(id) => {
                      onUpdateDay(dayIndex, (d) => addStop(d, id))
                      setAdding(false)
                    }}
                  />
                </div>
              )}
            </div>

            <div className="board__map">
              <TripMap stops={mapStops} activeUid={activeUid} onPick={pick} offMap={offMap} caption={day ? `Day ${dayIndex + 1} · ${zones[day.zone].label}` : null} />
            </div>
          </div>
        </div>

        {/* The whole trip on paper; only shown when printing. */}
        <div className="printout">
          <h1>Bonjour Pondy — {days.length} {days.length === 1 ? 'day' : 'days'} in Pondicherry</h1>
          {days.map((d, i) => (
            <section key={i}>
              <h2>
                Day {i + 1} · {d.title}
              </h2>
              <ol>
                {schedule(d).rows.map((row) => (
                  <li key={row.stop.uid}>
                    <b>{clock(row.start)}</b>
                    <span>{row.stop.kind === 'meal' ? row.stop.meal.name : row.point.name}</span>
                    <i>{duration(row.point.mins)}</i>
                  </li>
                ))}
              </ol>
            </section>
          ))}
          <p>Timings and prices are indicative. Check locally before you set out.</p>
        </div>
      </div>
    </section>
  )
}

function AddStop({ open, onToggle, used, onAdd }) {
  const [query, setQuery] = useState('')
  const term = query.trim().toLowerCase()
  const options = places
    .filter((p) => !used.has(p.id))
    .filter((p) => !term || `${p.name} ${zones[p.zone].label}`.toLowerCase().includes(term))
    .slice(0, 8)

  return (
    <div className="addstop">
      <button type="button" className="btn btn--ghost" aria-expanded={open} onClick={onToggle}>
        {open ? 'Close' : '+ Add a stop'}
      </button>
      {open && (
        <div className="addstop__panel">
          <label>
            <span className="sr-only">Search places</span>
            <input type="search" placeholder="Search places…" value={query} onChange={(e) => setQuery(e.target.value)} autoFocus />
          </label>
          {options.length === 0 ? (
            <p className="addstop__none">Everything matching is already in your plan.</p>
          ) : (
            <ul>
              {options.map((p) => (
                <li key={p.id}>
                  <button type="button" onClick={() => onAdd(p.id)}>
                    <b>{p.name}</b>
                    <span>
                      {zones[p.zone].label} · {duration(p.mins)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

/* --------------------------------------------------------------- Directory */

function Directory({ days, onOpen }) {
  const [filter, setFilter] = useState('all')
  const [showAll, setShowAll] = useState(false)
  const used = usedPlaceIds(days)
  const matching = places.filter((p) => filter === 'all' || p.cats.includes(filter))
  const list = showAll ? matching : matching.slice(0, 8)

  return (
    <section className="places" id="places">
      <div className="wrap">
        <header className="sectionhead">
          <h2 className="title">Every stop worth making</h2>
          <div className="chips" role="group" aria-label="Filter places">
            <button type="button" className={`chip${filter === 'all' ? ' is-on' : ''}`} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
              All {places.length}
            </button>
            {interests.map((item) => (
              <button type="button" key={item.id} className={`chip${filter === item.id ? ' is-on' : ''}`} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        </header>

        <ul className="cards">
          {list.map((place) => (
            <li key={place.id}>
              <button type="button" className="card" onClick={() => onOpen(place)}>
                <div className="card__media">
                  {place.photo ? (
                    <Photo id={place.photo} alt="" ratio={4 / 3} widths={[360, 640]} sizes="(max-width: 700px) 100vw, 30vw" />
                  ) : (
                    <Tile place={place} />
                  )}
                  {used.has(place.id) && <span className="card__flag">In your plan</span>}
                </div>
                <p className="card__zone">{zones[place.zone].label}</p>
                <h3>{place.name}</h3>
                <p className="card__meta">
                  {duration(place.mins)} · {place.cost ? `about ${inr(place.cost)}` : 'Free'} · best {bestPhrase[place.best[0]]}
                </p>
              </button>
            </li>
          ))}
        </ul>

        {matching.length > list.length && (
          <button type="button" className="btn btn--dark places__more" onClick={() => setShowAll(true)}>
            Show all {matching.length} places
          </button>
        )}
      </div>
    </section>
  )
}

function PlaceSheet({ place, days, onClose, onAdd }) {
  const ref = useDialog(Boolean(place), onClose)
  const already = place ? days.findIndex((d) => d.stops.some((s) => s.id === place.id)) : -1

  return (
    <AnimatePresence>
      {place && (
        <motion.div
          className="veil"
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
            transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
          >
            <button type="button" className="sheet__close" onClick={onClose} aria-label="Close">
              <Icon name="close" />
            </button>
            <div className="sheet__media">
              {place.photo ? (
                <Photo id={place.photo} alt={place.name} ratio={3 / 2} widths={[600, 1000]} sizes="(max-width: 600px) 100vw, 520px" eager />
              ) : (
                <Tile place={place} />
              )}
            </div>
            <div className="sheet__body">
              <p className="card__zone">{zones[place.zone].label}</p>
              <h2 id="sheet-title">{place.name}</h2>
              <p className="sheet__blurb">{place.blurb}</p>

              <dl className="sheet__facts">
                <div>
                  <dt>Allow</dt>
                  <dd>{duration(place.mins)}</dd>
                </div>
                <div>
                  <dt>Best at</dt>
                  <dd>{place.best.map((s) => slotLabels[s]).join(', ')}</dd>
                </div>
                <div>
                  <dt>Cost</dt>
                  <dd>{place.cost ? `About ${inr(place.cost)} each` : 'Free'}</dd>
                </div>
              </dl>

              <p className="sheet__tip">
                <b>Worth knowing</b>
                {place.tip}
              </p>

              {already >= 0 ? (
                <p className="sheet__in">Already on Day {already + 1} of your plan.</p>
              ) : (
                <div className="sheet__add">
                  <p>Add to</p>
                  {days.map((d, i) => (
                    <button type="button" key={i} className="btn btn--go btn--sm" onClick={() => onAdd(i)}>
                      Day {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ------------------------------------------------------------- When to go */

function Seasons({ month, onMonth }) {
  const maxRain = Math.max(...climate.rain)
  const verdict = climate.verdict[month]
  const tempY = (t) => 140 - ((t - 26) / 12) * 110
  const line = climate.high.map((t, i) => `${i ? 'L' : 'M'}${i * 60 + 30} ${tempY(t).toFixed(1)}`).join(' ')

  return (
    <section className="when" id="when">
      <div className="wrap when__grid">
        <div>
          <h2 className="title title--light">When should you go?</h2>
          <p className="when__lede">
            Tap a month. Pondicherry’s rain arrives late — the north-east monsoon breaks in October —
            so the classic season runs from December to March.
          </p>

          <div className="verdict" aria-live="polite">
            <p className="verdict__month">{monthName(month)}</p>
            <p className="verdict__rating">{verdict.rating}</p>
            <p className="verdict__text">{verdict.text}</p>
            <dl>
              <div>
                <dt>Daytime high</dt>
                <dd>{climate.high[month]}°C</dd>
              </div>
              <div>
                <dt>Rainfall</dt>
                <dd>{climate.rain[month]} mm</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="chart">
          <div className="chart__plot">
            <svg viewBox="0 0 720 150" preserveAspectRatio="none" aria-hidden="true">
              <path d={line} className="chart__line" />
            </svg>
            <span
              className="chart__dot"
              style={{
                left: `${((month + 0.5) / 12) * 100}%`,
                top: `calc((100% - 34px) * ${(tempY(climate.high[month]) / 150).toFixed(4)})`,
              }}
            >
              <b>{climate.high[month]}°</b>
            </span>
            <div className="chart__bars">
              {months.map((label, i) => (
                <button
                  type="button"
                  key={label}
                  className={i === month ? 'is-on' : undefined}
                  aria-pressed={i === month}
                  aria-label={`${label}: high ${climate.high[i]} degrees, ${climate.rain[i]} millimetres of rain`}
                  onClick={() => onMonth(i)}
                >
                  <i style={{ height: `calc((100% - 34px) * ${Math.max(0.03, climate.rain[i] / maxRain).toFixed(3)})` }} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
          <p className="chart__key">
            <span className="key key--bar" /> Rainfall <span className="key key--line" /> Daytime high
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Budget */

function Budget({ days, prefs }) {
  const [people, setPeople] = useState(2)
  const [stay, setStay] = useState('guesthouse')
  const [eat, setEat] = useState('cafes')
  const [ride, setRide] = useState('scooter')

  const nights = Math.max(1, prefs.days - 1)
  const s = stays.find((x) => x.id === stay)
  const e = eats.find((x) => x.id === eat)
  const r = rides.find((x) => x.id === ride)

  const activities =
    days.reduce(
      (sum, d) => sum + d.stops.filter((x) => x.kind === 'place').reduce((a, x) => a + placeById[x.id].cost, 0),
      0,
    ) * people

  const parts = [
    { label: 'Stay', amount: s.perRoom * Math.ceil(people / 2) * nights, note: `${nights} ${nights === 1 ? 'night' : 'nights'}, ${Math.ceil(people / 2)} ${Math.ceil(people / 2) === 1 ? 'room' : 'rooms'}` },
    { label: 'Food', amount: e.perDay * people * prefs.days, note: `${prefs.days} days` },
    { label: 'Getting around', amount: r.perDay * Math.ceil(people / r.shared) * prefs.days, note: r.label.toLowerCase() },
    { label: 'Entry and activities', amount: activities, note: 'from your plan' },
  ]
  const total = parts.reduce((sum, p) => sum + p.amount, 0)

  return (
    <section className="budget" id="budget">
      <div className="wrap budget__grid">
        <div className="budget__form">
          <h2 className="title">What will it cost?</h2>
          <p className="budget__lede">
            A rough figure for {prefs.days} {prefs.days === 1 ? 'day' : 'days'} on the ground, not counting how you get
            here. It updates as you change your plan.
          </p>

          <div className="control">
            <span className="control__label">Travellers</span>
            <div className="stepper stepper--sm">
              <button type="button" onClick={() => setPeople((p) => p - 1)} disabled={people <= 1} aria-label="Fewer travellers">
                −
              </button>
              <output>{people}</output>
              <button type="button" onClick={() => setPeople((p) => p + 1)} disabled={people >= 8} aria-label="More travellers">
                +
              </button>
            </div>
          </div>

          <Choice legend="Where you sleep" options={stays} value={stay} onChange={setStay} />
          <Choice legend="How you eat" options={eats} value={eat} onChange={setEat} />
          <Choice legend="How you get about" options={rides} value={ride} onChange={setRide} />
        </div>

        <div className="receipt" aria-live="polite">
          <p className="receipt__label">Estimated total</p>
          <p className="receipt__total">
            <span>₹</span>
            {(Math.round(total / 100) * 100).toLocaleString('en-IN')}
          </p>
          <p className="receipt__each">about {inr(Math.round(total / people / 100) * 100)} each</p>

          <div className="receipt__bar" aria-hidden="true">
            {parts.map((p, i) => (
              <i key={p.label} className={`seg-${i}`} style={{ width: `${(p.amount / total) * 100}%` }} />
            ))}
          </div>

          <ul>
            {parts.map((p, i) => (
              <li key={p.label}>
                <span className={`key seg-${i}`} />
                <span>
                  {p.label}
                  <small>{p.note}</small>
                </span>
                <b>{inr(p.amount)}</b>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Choice({ legend, options, value, onChange }) {
  return (
    <fieldset className="choice">
      <legend>{legend}</legend>
      {options.map((o) => (
        <label key={o.id} className={o.id === value ? 'is-on' : undefined}>
          <input type="radio" name={legend} value={o.id} checked={o.id === value} onChange={() => onChange(o.id)} />
          <span>{o.label}</span>
          <small>{inr(o.perRoom ?? o.perDay)} {o.perRoom ? 'a night' : 'a day'}</small>
        </label>
      ))}
    </fieldset>
  )
}

/* ----------------------------------------------------------- Getting there */

function Arrive() {
  return (
    <section className="arrive" id="arrive">
      <div className="wrap">
        <h2 className="title">Getting there, and getting it right</h2>

        <ul className="routes">
          {routes.map((route) => (
            <li key={route.from}>
              <p className="routes__from">{route.from}</p>
              <p className="routes__big">{route.time}</p>
              <p className="routes__how">
                {route.how} · {route.distance}
              </p>
              <p>{route.note}</p>
            </li>
          ))}
        </ul>

        <ul className="tips">
          {tips.map((tip, i) => (
            <li key={tip.title}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{tip.title}</h3>
                <p>{tip.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
