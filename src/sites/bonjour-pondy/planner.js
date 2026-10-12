import { meals, paces, placeById, places, zones } from './data'

/* -------------------------------------------------------------------------
   The itinerary engine. Given a few preferences it picks a part of town for
   each day, fills the day with the stops that best match, orders them by time
   of day and then by distance, and works out when you would actually arrive.
   ------------------------------------------------------------------------- */

const SLOTS = ['sunrise', 'morning', 'midday', 'afternoon', 'sunset', 'evening']

// Earliest sensible start for each part of the day, in minutes from midnight.
const SLOT_START = {
  sunrise: 5 * 60 + 45,
  morning: 9 * 60,
  midday: 12 * 60 + 30,
  afternoon: 14 * 60 + 45,
  sunset: 17 * 60 + 15,
  evening: 19 * 60 + 30,
}

const CAPACITY = {
  easy: { sunrise: 1, morning: 1, midday: 1, afternoon: 1, sunset: 1 },
  balanced: { sunrise: 1, morning: 2, midday: 1, afternoon: 2, sunset: 1 },
  full: { sunrise: 1, morning: 3, midday: 1, afternoon: 3, sunset: 1 },
}

/** Small seeded generator so "Shuffle" gives a different but repeatable plan. */
function seeded(seed) {
  let a = (seed * 2654435761) >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const score = (place, prefs, rand) =>
  place.weight + place.cats.filter((c) => prefs.interests.includes(c)).length * 3.5 + rand() * 1.6

const TOWN = { lat: 11.9318, lng: 79.8345 }

/* ------------------------------------------------------------- Distances */

export function kmBetween(a, b) {
  const rad = Math.PI / 180
  const dLat = (b.lat - a.lat) * rad
  const dLng = (b.lng - a.lng) * rad
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2
  // Roads are never straight: pad the great-circle distance.
  return 6371 * 2 * Math.asin(Math.sqrt(h)) * 1.3
}

export function hop(a, b) {
  const km = kmBetween(a, b)
  if (km < 0.12) return { km, mins: 0, mode: 'here' }
  if (km < 1.1) return { km, mins: Math.max(3, Math.round(km * 13)), mode: 'walk' }
  if (km < 22) return { km, mins: Math.round((km / 24) * 60 + 4), mode: 'scooter' }
  return { km, mins: Math.round((km / 46) * 60 + 10), mode: 'car' }
}

/* -------------------------------------------------------------- Building */

let uid = 0
const nextUid = () => `s${Date.now().toString(36)}${(uid += 1)}`

const stopFor = (place, slot) => ({ uid: nextUid(), kind: 'place', id: place.id, slot })

function mealStop(zone, which, near) {
  const meal = meals[zone][which]
  const [lat, lng] = meal.at ?? (near ? [near.lat, near.lng] : zones[zone].centre)
  return {
    uid: nextUid(),
    kind: 'meal',
    id: `${zone}-${which}`,
    slot: which === 'lunch' ? 'midday' : 'evening',
    meal: { name: meal.name, cost: meal.cost, lat, lng, mins: which === 'lunch' ? 70 : 90 },
  }
}

/** Which part of town each day goes to, most relevant first. */
function chooseZones(prefs, rand) {
  const affinity = (zone) =>
    places
      .filter((p) => p.zone === zone)
      .reduce((sum, p) => sum + score(p, prefs, rand), 0) /
    // Day trips cost a whole day of travel; make them earn it.
    (zone === 'far' ? 1.6 : 1)

  const others = ['north', 'south', 'tamil', 'west', 'far'].sort((a, b) => affinity(b) - affinity(a))
  // Short trips should not spend a day on the road.
  const eligible = prefs.days < 4 ? others.filter((z) => z !== 'far' && z !== 'west') : others
  return ['white', ...eligible].slice(0, prefs.days)
}

function buildDay(zone, prefs, used, rand) {
  // One day in town covers both sides of the canal.
  const pool = prefs.days === 1 ? ['white', 'tamil'] : zone === 'west' ? ['west', 'tamil', 'white'] : [zone]
  const target = paces.find((p) => p.id === prefs.pace).stops

  if (zone === 'far') {
    const trip = places
      .filter((p) => p.zone === 'far' && !used.has(p.id))
      .sort((a, b) => score(b, prefs, rand) - score(a, prefs, rand))[0]
    if (!trip) return null
    used.add(trip.id)
    return {
      zone,
      title: `Day trip: ${trip.name}`,
      stops: [stopFor(trip, 'morning'), mealStop('far', 'lunch', trip), mealStop('far', 'dinner')],
    }
  }

  const capacity = { ...CAPACITY[prefs.pace] }
  const ranked = places
    .filter((p) => pool.includes(p.zone) && !used.has(p.id))
    // A stop in the day's own zone outranks a filler from next door.
    .map((p) => ({ place: p, value: score(p, prefs, rand) + (p.zone === pool[0] ? 4 : 0) }))
    .sort((a, b) => b.value - a.value)

  const chosen = []
  for (const { place } of ranked) {
    if (chosen.length >= target) break
    const slot = place.best.find((s) => capacity[s] > 0)
    if (!slot) continue
    capacity[slot] -= 1
    used.add(place.id)
    chosen.push(stopFor(place, slot))
  }
  if (!chosen.length) return null

  const hasFoodAt = (slot) =>
    chosen.some((s) => s.slot === slot && placeById[s.id].cats.includes('food'))
  if (!hasFoodAt('midday')) chosen.push(mealStop(pool[0] === 'west' ? 'west' : zone, 'lunch'))
  chosen.push(mealStop(zone, 'dinner'))

  return { zone, title: zones[zone].theme, stops: orderStops(chosen) }
}

const pointOf = (stop) => (stop.kind === 'meal' ? stop.meal : placeById[stop.id])

/** By time of day first; within a slot, always go to the nearest stop next. */
function orderStops(stops) {
  const out = []
  SLOTS.forEach((slot) => {
    const group = stops.filter((s) => s.slot === slot)
    while (group.length) {
      const from = out.length ? pointOf(out[out.length - 1]) : null
      let best = 0
      if (from) {
        group.forEach((s, i) => {
          if (kmBetween(from, pointOf(s)) < kmBetween(from, pointOf(group[best]))) best = i
        })
      }
      out.push(group.splice(best, 1)[0])
    }
  })
  return out
}

export function buildPlan(prefs, seed = 1) {
  const rand = seeded(seed)
  const used = new Set()
  return chooseZones(prefs, rand)
    .map((zone) => buildDay(zone, prefs, used, rand))
    .filter(Boolean)
}

/* --------------------------------------------------------------- Timing */

export const clock = (mins) => {
  const h = Math.floor(mins / 60) % 24
  const m = Math.round(mins % 60)
  const suffix = h >= 12 ? 'pm' : 'am'
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, '0')} ${suffix}`
}

export const duration = (mins) => {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  if (!h) return `${m} min`
  return m ? `${h} h ${m} min` : `${h} h`
}

/**
 * Turns an ordered list of stops into a timetable: when you leave, how you get
 * there, when you arrive, and any slack left over. A stop never starts before
 * its part of the day — sunset stays at sunset however the list is reordered.
 */
export function schedule(day) {
  let cursor = null
  let previous = null
  const rows = []
  let km = 0
  let cost = 0
  let travel = 0
  let usesScooter = false
  let usesCar = false

  day.stops.forEach((stop) => {
    const point = pointOf(stop)
    const leg = previous ? hop(previous, point) : null
    const earliest = SLOT_START[stop.slot]
    const arrive = cursor === null ? earliest : Math.max(cursor + (leg?.mins ?? 0), earliest)
    const free = cursor === null ? 0 : arrive - cursor - (leg?.mins ?? 0)

    if (leg) {
      km += leg.km
      travel += leg.mins
      usesScooter = usesScooter || leg.mode === 'scooter'
      usesCar = usesCar || leg.mode === 'car'
    }
    cost += stop.kind === 'meal' ? stop.meal.cost : point.cost

    rows.push({ stop, point, leg, free: free > 40 ? free : 0, start: arrive, end: arrive + point.mins })
    cursor = arrive + point.mins
    previous = point
  })

  // A day trip begins with the drive out of town.
  const outbound = day.zone === 'far' && rows.length ? hop(TOWN, rows[0].point) : null
  if (outbound) {
    km += outbound.km
    travel += outbound.mins
    usesCar = true
  }

  const transport = usesCar ? 3800 : usesScooter ? 450 : 0
  return {
    rows,
    km,
    travel,
    cost,
    transport,
    outbound,
    start: (rows[0]?.start ?? 0) - (outbound?.mins ?? 0),
    end: rows[rows.length - 1]?.end ?? 0,
    mode: usesCar ? 'car' : usesScooter ? 'scooter' : 'foot',
  }
}

/* ---------------------------------------------------------------- Editing */

export const removeStop = (day, uidToRemove) => ({
  ...day,
  stops: day.stops.filter((s) => s.uid !== uidToRemove),
})

export function moveStop(day, uidToMove, delta) {
  const index = day.stops.findIndex((s) => s.uid === uidToMove)
  const target = index + delta
  if (index < 0 || target < 0 || target >= day.stops.length) return day
  const stops = [...day.stops]
  const [moved] = stops.splice(index, 1)
  stops.splice(target, 0, moved)
  return { ...day, stops }
}

/** Adds a place and re-sorts the day so it lands at a sensible hour. */
export function addStop(day, placeId) {
  const place = placeById[placeId]
  const taken = Object.fromEntries(SLOTS.map((s) => [s, day.stops.filter((x) => x.slot === s).length]))
  const slot = [...place.best].sort((a, b) => taken[a] - taken[b])[0]
  return { ...day, stops: orderStops([...day.stops, stopFor(place, slot)]) }
}

/** Replaces a stop with the next-best unused place for the same part of the day. */
export function swapStop(plan, dayIndex, uidToSwap, prefs) {
  const day = plan[dayIndex]
  const stop = day.stops.find((s) => s.uid === uidToSwap)
  if (!stop || stop.kind !== 'place') return plan
  const used = new Set(plan.flatMap((d) => d.stops.filter((s) => s.kind === 'place').map((s) => s.id)))
  const current = placeById[stop.id]
  const flat = () => 0.5
  const candidate = places
    .filter((p) => !used.has(p.id) && p.zone === current.zone && p.best.includes(stop.slot))
    .sort((a, b) => score(b, prefs, flat) - score(a, prefs, flat))[0]
    ?? places
      .filter((p) => !used.has(p.id) && p.zone === current.zone)
      .sort((a, b) => score(b, prefs, flat) - score(a, prefs, flat))[0]
  if (!candidate) return plan

  const stops = day.stops.map((s) =>
    s.uid === uidToSwap ? stopFor(candidate, candidate.best.includes(stop.slot) ? stop.slot : candidate.best[0]) : s,
  )
  return plan.map((d, i) => (i === dayIndex ? { ...d, stops } : d))
}

export const usedPlaceIds = (plan) =>
  new Set(plan.flatMap((d) => d.stops.filter((s) => s.kind === 'place').map((s) => s.id)))

/** Plain-text version of the plan, for copying into a message or notes app. */
export function planAsText(plan) {
  return plan
    .map((day, i) => {
      const s = schedule(day)
      const lines = s.rows.map((row) => `  ${clock(row.start)}  ${row.stop.kind === 'meal' ? row.stop.meal.name : row.point.name}`)
      if (s.outbound) lines.unshift(`  ${clock(s.start)}  Leave Pondicherry (${duration(s.outbound.mins)} by car)`)
      return `Day ${i + 1} — ${day.title}\n${lines.join('\n')}`
    })
    .join('\n\n')
}
