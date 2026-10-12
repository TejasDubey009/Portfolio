// Ninefold — a fictional contemporary art gallery. Artists, works and
// exhibitions are all invented; the works themselves are drawn in Art.jsx.

import { addDays, startOfDay } from '../shared/dates'

export const brand = {
  name: 'Ninefold',
  place: 'Fort Kochi',
  address: ['Ninefold, 9 Calvathy Road', 'Fort Kochi, Kerala 682001'],
  phone: '+91 484 555 0109',
  email: 'desk@ninefold.example',
}

export const hours = [
  { day: 'Tuesday – Saturday', time: '11:00 – 19:00' },
  { day: 'Sunday', time: '12:00 – 17:00' },
  { day: 'Monday', time: 'Closed' },
]

export const artists = [
  { id: 'vasanth', name: 'Ira Vasanth', born: 1984, based: 'Kochi', bio: 'Works in ink and long-exposure drawing; her line studies are made in a single sitting, without lifting the pen from the sheet.' },
  { id: 'okafor', name: 'Tobias Okafor-Rao', born: 1979, based: 'Lagos and Bengaluru', bio: 'A printmaker concerned with standard units — the brick, the tile, the page — and what happens when they are miscounted.' },
  { id: 'kurup', name: 'Meenal Kurup', born: 1991, based: 'Thrissur', bio: 'Paints in distemper on handloom cotton, building colour in thin washes the way the cloth itself is dyed.' },
  { id: 'aldecott', name: 'Jonas Aldecott', born: 1968, based: 'Glasgow', bio: 'Thirty years of circles. Aldecott draws with a beam compass and treats every overlap as a negotiation.' },
  { id: 'lindqvist', name: 'Sahana Iyer-Lindqvist', born: 1987, based: 'Stockholm', bio: 'Trained as a weaver; her works on paper translate warp and weft into overlaid, translucent bands.' },
  { id: 'thampi', name: 'Devika Thampi', born: 1995, based: 'Kochi', bio: 'Makes large halftone fields by hand, one dot at a time, from photographs of the backwaters she grew up on.' },
  { id: 'montiel', name: 'Rafael Montiel', born: 1973, based: 'Oaxaca', bio: 'Landscape reduced to ridgeline. Montiel prints from carved cedar blocks, palest layer first.' },
  { id: 'aziz', name: 'Noor Aziz', born: 1989, based: 'Karachi and Dubai', bio: 'Divides and subdivides. Each painting begins as one rectangle and ends when a cut would no longer change anything.' },
]

// w and h are in centimetres. price is in rupees; null means "on request".
export const works = [
  { id: 'w01', artist: 'vasanth', title: 'Low Tide, Counted', year: 2025, medium: 'Ink on cotton rag', w: 120, h: 90, edition: 'Unique', price: 420000, status: 'available', style: 'lines', seed: 11, palette: 'ink', show: 'weight' },
  { id: 'w02', artist: 'vasanth', title: 'Breath Held for Forty Lines', year: 2024, medium: 'Ink on cotton rag', w: 76, h: 102, edition: 'Unique', price: 310000, status: 'hold', style: 'lines', seed: 47, palette: 'chalk', show: 'weight' },
  { id: 'w03', artist: 'okafor', title: 'Miscount (Brick)', year: 2025, medium: 'Screenprint on paper', w: 100, h: 100, edition: 'Edition of 12', price: 95000, status: 'available', style: 'arcs', seed: 5, palette: 'kiln', show: 'weight' },
  { id: 'w04', artist: 'okafor', title: 'Miscount (Tile)', year: 2025, medium: 'Screenprint on paper', w: 100, h: 100, edition: 'Edition of 12', price: 95000, status: 'available', style: 'arcs', seed: 23, palette: 'tide', show: 'weight' },
  { id: 'w05', artist: 'kurup', title: 'Monsoon Ledger', year: 2024, medium: 'Distemper on handloom cotton', w: 150, h: 180, edition: 'Unique', price: 680000, status: 'available', style: 'fields', seed: 8, palette: 'moss', show: 'weight' },
  { id: 'w06', artist: 'kurup', title: 'Second Wash, Dusk', year: 2025, medium: 'Distemper on handloom cotton', w: 120, h: 150, edition: 'Unique', price: 540000, status: 'sold', style: 'fields', seed: 31, palette: 'dusk', show: 'weight' },
  { id: 'w07', artist: 'aldecott', title: 'Negotiation No. 114', year: 2023, medium: 'Graphite and gouache on paper', w: 110, h: 110, edition: 'Unique', price: null, status: 'available', style: 'rings', seed: 14, palette: 'tide', show: 'weight' },
  { id: 'w08', artist: 'aldecott', title: 'Negotiation No. 121', year: 2024, medium: 'Graphite and gouache on paper', w: 140, h: 100, edition: 'Unique', price: null, status: 'available', style: 'rings', seed: 62, palette: 'kiln', show: 'rooms' },
  { id: 'w09', artist: 'lindqvist', title: 'Warp, Loosened', year: 2025, medium: 'Monotype on kozo', w: 90, h: 120, edition: 'Unique', price: 275000, status: 'available', style: 'weave', seed: 19, palette: 'salt', show: 'weight' },
  { id: 'w10', artist: 'lindqvist', title: 'Selvedge', year: 2024, medium: 'Monotype on kozo', w: 90, h: 120, edition: 'Unique', price: 275000, status: 'available', style: 'weave', seed: 77, palette: 'dusk', show: 'rooms' },
  { id: 'w11', artist: 'thampi', title: 'Vembanad, 5:40 am', year: 2025, medium: 'Hand-stippled ink on paper', w: 160, h: 110, edition: 'Unique', price: 390000, status: 'available', style: 'dots', seed: 3, palette: 'ink', show: 'tide' },
  { id: 'w12', artist: 'thampi', title: 'Ferry Light', year: 2025, medium: 'Hand-stippled ink on paper', w: 100, h: 130, edition: 'Unique', price: 320000, status: 'hold', style: 'dots', seed: 41, palette: 'salt', show: 'tide' },
  { id: 'w13', artist: 'montiel', title: 'Seven Ridges, Morning', year: 2022, medium: 'Woodcut on mulberry paper', w: 130, h: 80, edition: 'Edition of 20', price: 140000, status: 'available', style: 'horizon', seed: 9, palette: 'moss', show: 'rooms' },
  { id: 'w14', artist: 'montiel', title: 'Seven Ridges, Smoke', year: 2022, medium: 'Woodcut on mulberry paper', w: 130, h: 80, edition: 'Edition of 20', price: 140000, status: 'sold', style: 'horizon', seed: 55, palette: 'dusk', show: 'rooms' },
  { id: 'w15', artist: 'aziz', title: 'Until a Cut Changes Nothing', year: 2025, medium: 'Acrylic on linen', w: 150, h: 150, edition: 'Unique', price: 760000, status: 'available', style: 'blocks', seed: 27, palette: 'salt', show: 'weight' },
  { id: 'w16', artist: 'aziz', title: 'Inheritance, Divided', year: 2024, medium: 'Acrylic on linen', w: 100, h: 140, edition: 'Unique', price: 520000, status: 'available', style: 'blocks', seed: 71, palette: 'kiln', show: 'tide' },
  { id: 'w17', artist: 'okafor', title: 'Standard Unit, Unstandard', year: 2023, medium: 'Screenprint on paper', w: 70, h: 100, edition: 'Edition of 30', price: 48000, status: 'available', style: 'arcs', seed: 88, palette: 'chalk', show: 'rooms' },
  { id: 'w18', artist: 'kurup', title: 'Dye Lot 14', year: 2023, medium: 'Distemper on handloom cotton', w: 90, h: 120, edition: 'Unique', price: 360000, status: 'available', style: 'fields', seed: 64, palette: 'kiln', show: 'tide' },
]

export const artistById = Object.fromEntries(artists.map((a) => [a.id, a]))
export const workById = Object.fromEntries(works.map((w) => [w.id, w]))

/* ------------------------------------------------------------- Exhibitions */

const today = startOfDay()

// Dates are set relative to today so the programme always reads as current.
export const exhibitions = [
  {
    id: 'weight',
    title: 'The Weight of a Line',
    kind: 'Group exhibition',
    artists: ['vasanth', 'okafor', 'kurup', 'aldecott', 'lindqvist', 'aziz'],
    start: addDays(today, -24),
    end: addDays(today, 19),
    text: 'Six artists who work by rule: a line drawn until the breath runs out, a rectangle cut until cutting stops mattering, a circle repeated for thirty years. The exhibition asks what a constraint weighs, and who is carrying it.',
  },
  {
    id: 'tide',
    title: 'Low Tide Arithmetic',
    kind: 'Three artists',
    artists: ['thampi', 'aziz', 'kurup'],
    start: addDays(today, 33),
    end: addDays(today, 82),
    text: 'New work made on and about the Kerala backwaters: counting, measuring, and what the water does to both.',
  },
  {
    id: 'rooms',
    title: 'Rooms for Slow Light',
    kind: 'Group exhibition',
    artists: ['aldecott', 'lindqvist', 'montiel', 'okafor'],
    start: addDays(today, -112),
    end: addDays(today, -38),
    text: 'Prints and works on paper chosen for how they change between eleven in the morning and five in the afternoon.',
  },
]

export function showStatus(show, now = today) {
  if (now < show.start) return { key: 'upcoming', label: 'Opening soon' }
  if (now > show.end) return { key: 'past', label: 'Past' }
  const left = Math.round((show.end - now) / 86_400_000)
  return left <= 21 ? { key: 'closing', label: `Closing in ${left} days` } : { key: 'current', label: 'Now on' }
}

/* --------------------------------------------------------------- Programme */

export const programme = [
  { id: 'walk', type: 'Walkthrough', title: 'Curator’s walkthrough: The Weight of a Line', in: 3, time: '17:30', places: 14, free: true },
  { id: 'talk', type: 'Conversation', title: 'Ira Vasanth and Noor Aziz on working by rule', in: 9, time: '18:30', places: 6, free: true },
  { id: 'workshop', type: 'Workshop', title: 'One line, one breath: a drawing morning', in: 16, time: '10:00', places: 3, free: false, price: 1200 },
  { id: 'opening', type: 'Opening', title: 'Low Tide Arithmetic — opening evening', in: 33, time: '18:00', places: 60, free: true },
].map((event) => ({ ...event, date: addDays(today, event.in) }))

export const statusLabel = { available: 'Available', hold: 'On hold', sold: 'Sold' }

export const inches = (cm) => (cm / 2.54).toFixed(1).replace(/\.0$/, '')
