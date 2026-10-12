// Small date helpers shared by the booking flows. Everything works on local
// midnight so "tonight" means the visitor's tonight, wherever they are.

export const DAY_MS = 86_400_000

export function startOfDay(date = new Date()) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function addDays(date, amount) {
  const d = new Date(date)
  d.setDate(d.getDate() + amount)
  return d
}

export function addMonths(date, amount) {
  const d = new Date(date)
  d.setDate(1)
  d.setMonth(d.getMonth() + amount)
  return d
}

export const isSameDay = (a, b) => Boolean(a && b) && startOfDay(a).getTime() === startOfDay(b).getTime()

export const isBefore = (a, b) => startOfDay(a).getTime() < startOfDay(b).getTime()

export const nightsBetween = (from, to) =>
  Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / DAY_MS)

/** YYYY-MM-DD in local time — stable key for storage and hashing. */
export function toKey(date) {
  const d = new Date(date)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${month}-${day}`
}

export function fromKey(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const formatDate = (date, options = { weekday: 'short', day: 'numeric', month: 'short' }) =>
  new Intl.DateTimeFormat('en-IN', options).format(new Date(date))

/** Calendar grid for a month: weeks of 7, padded with nulls, Monday first. */
export function monthGrid(year, month) {
  const first = new Date(year, month, 1)
  const days = new Date(year, month + 1, 0).getDate()
  const lead = (first.getDay() + 6) % 7
  const cells = [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: days }, (_, i) => new Date(year, month, i + 1)),
  ]
  while (cells.length % 7) cells.push(null)
  return cells
}

/**
 * Deterministic 0–1 value from a string. The demo sites use it to decide
 * availability, so a given date always shows the same answer on every visit.
 */
export function hash01(input) {
  let h = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return ((h >>> 0) % 10_000) / 10_000
}

export const inr = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

/** Six-character reference such as "K7Q2MX". Avoids look-alike characters. */
export function makeReference(prefix = '') {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let out = ''
  const random = new Uint32Array(6)
  window.crypto.getRandomValues(random)
  random.forEach((n) => {
    out += alphabet[n % alphabet.length]
  })
  return prefix ? `${prefix}-${out}` : out
}

/** Builds an .ics data URL so a confirmation can be added to any calendar. */
export function calendarLink({ title, start, end, location, description }) {
  const stamp = (date) =>
    new Date(date)
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '')
  const escape = (text = '') => text.replace(/([,;])/g, '\\$1').replace(/\n/g, '\\n')
  const body = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sample site//EN',
    'BEGIN:VEVENT',
    `UID:${stamp(start)}-${Math.random().toString(36).slice(2)}@sample`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${escape(title)}`,
    `LOCATION:${escape(location)}`,
    `DESCRIPTION:${escape(description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`
}
