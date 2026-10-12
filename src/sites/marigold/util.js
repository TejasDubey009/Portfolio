import { addDays, hash01, startOfDay, toKey } from '../shared/dates'
import { brand, hours, sittings } from './data'

export const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export const toClock = (minutes) => {
  const h = Math.floor(minutes / 60) % 24
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

/** "19:30" → "7:30 pm" */
export function friendlyTime(hhmm) {
  const total = toMinutes(hhmm)
  const h = Math.floor(total / 60)
  const m = total % 60
  const suffix = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}${m ? `:${String(m).padStart(2, '0')}` : ''} ${suffix}`
}

// hours[] starts on Monday; Date#getDay starts on Sunday.
export const hoursFor = (date) => hours[(new Date(date).getDay() + 6) % 7]

/** What the status pill in the header should say right now. */
export function openStatus(now = new Date()) {
  const today = hoursFor(now)
  const minutes = now.getHours() * 60 + now.getMinutes()

  if (!today.closed) {
    const open = toMinutes(today.open)
    const close = toMinutes(today.close)
    if (minutes >= open && minutes < close) {
      const left = close - minutes
      return {
        open: true,
        label: left <= 45 ? `Closing in ${left} min` : `Open till ${friendlyTime(today.close)}`,
      }
    }
    if (minutes < open) return { open: false, label: `Opens ${friendlyTime(today.open)}` }
  }

  for (let i = 1; i <= 7; i += 1) {
    const next = hoursFor(addDays(now, i))
    if (!next.closed) {
      const when = i === 1 ? 'tomorrow' : next.short
      return { open: false, label: `Opens ${when} ${friendlyTime(next.open)}` }
    }
  }
  return { open: false, label: 'Closed' }
}

export const isClosedOn = (date) => new Date(date).getDay() === brand.closedDay

/**
 * Bookable times for a date, grouped by sitting. Availability is derived from
 * the date itself, so the same evening shows the same gaps on every visit.
 */
export function slotsFor(date, guests, now = new Date()) {
  if (isClosedOn(date)) return []
  const key = toKey(date)
  const isToday = startOfDay(date).getTime() === startOfDay(now).getTime()
  const cutoff = now.getHours() * 60 + now.getMinutes() + 30
  const size = guests > 4 ? 'large' : 'small'

  return sittings
    .map((sitting) => {
      const times = []
      for (let t = toMinutes(sitting.from); t <= toMinutes(sitting.to); t += 30) {
        if (isToday && t < cutoff) continue
        const clock = toClock(t)
        const roll = hash01(`${key}|${clock}|${size}`)
        // Prime dinner slots and big tables fill faster.
        const pressure = (sitting.id === 'dinner' ? 0.1 : 0) + (size === 'large' ? 0.12 : 0)
        times.push({
          time: clock,
          state: roll < 0.16 + pressure ? 'full' : roll < 0.34 + pressure ? 'few' : 'open',
        })
      }
      return { ...sitting, times }
    })
    .filter((sitting) => sitting.times.length)
}

/** Pickup windows for the order tray: every 15 minutes while the kitchen is on. */
export function pickupTimes(now = new Date()) {
  const today = hoursFor(now)
  if (today.closed) return []
  const minutes = now.getHours() * 60 + now.getMinutes()
  const start = Math.max(Math.ceil((minutes + 20) / 15) * 15, toMinutes(today.open) + 15)
  const end = toMinutes(today.close) - 30
  const out = []
  for (let t = start; t <= end && out.length < 10; t += 15) out.push(toClock(t))
  return out
}

/** The next calendar date that falls on a given weekday (0 = Sunday). */
export function nextWeekday(weekday, now = new Date()) {
  const today = startOfDay(now)
  const diff = (weekday - today.getDay() + 7) % 7
  return addDays(today, diff === 0 ? 7 : diff)
}
