// Kurinji House — a fictional heritage homestay on a tea estate in the Nilgiris.

import { hash01, toKey } from '../shared/dates'

export const brand = {
  name: 'Kurinji House',
  place: 'Coonoor, the Nilgiris',
  address: ['Kurinji House, Brooklands Road', 'Coonoor 643101, Tamil Nadu'],
  phone: '+91 423 555 0188',
  email: 'stay@kurinjihouse.example',
}

export const photos = {
  hero: '1491497895121-1334fc14d8c9',
  house: '1670959241159-605681e9addd',
  houseAlt: '1788145749384-f91374d3bb99',
  veranda: '1720706439286-a642d2cd0db2',
  table: '1687877465634-a7599027966c',
  bath: '1778731660076-f446d59aa1d0',
  lounge: '1696814543693-31fcf942ccb7',
  estate: '1674498260932-6f7d8eed6d9f',
  plucking: '1533268722164-c7323ba5690c',
  road: '1753247185885-98ee34468c4f',
  slopes: '1455157823797-3019317cbcf0',
}

export const facts = [
  { value: '1924', label: 'Built' },
  { value: '5', label: 'Rooms' },
  { value: '1,850 m', label: 'Above sea level' },
  { value: '12', label: 'Acres of tea' },
]

export const rooms = [
  {
    id: 'planters-suite',
    name: 'The Planter’s Suite',
    size: 52,
    bed: 'King four-poster',
    view: 'Valley, west',
    sleeps: 3,
    base: 14500,
    photo: '1780245996099-aa03ab9244c0',
    gallery: ['1780245996099-aa03ab9244c0', '1696814543693-31fcf942ccb7', '1778731660076-f446d59aa1d0'],
    blurb:
      'The original master bedroom, with its own fireplace, a dressing room and the best sunset in the house. The writing desk faces the valley; very little writing gets done.',
    amenities: ['Working fireplace', 'Cast-iron bathtub', 'Dressing room', 'Private sit-out', 'Extra bed on request', 'Valley sunset'],
  },
  {
    id: 'kurinji',
    name: 'Kurinji Room',
    size: 38,
    bed: 'King',
    view: 'Garden veranda',
    sleeps: 2,
    base: 10800,
    photo: '1761757821641-3b347c034042',
    gallery: ['1761757821641-3b347c034042', '1720706439286-a642d2cd0db2', '1778731660076-f446d59aa1d0'],
    blurb:
      'Opens straight onto the front veranda through French doors. Named for the flower that turns these hills blue once every twelve years — next due in 2030.',
    amenities: ['Veranda access', 'Rain shower', 'Step-free entry', 'Reading chairs', 'Garden view', 'Hot-water bottles'],
  },
  {
    id: 'blue-mountain',
    name: 'Blue Mountain Room',
    size: 34,
    bed: 'Queen four-poster',
    view: 'Bay window, east',
    sleeps: 2,
    base: 9200,
    photo: '1767050371633-675072d4bed7',
    gallery: ['1767050371633-675072d4bed7', '1778731660076-f446d59aa1d0', '1696814543693-31fcf942ccb7'],
    blurb:
      'A bay window seat built for two and a view of the first light on Dolphin’s Nose. Early risers ask for this one by name.',
    amenities: ['Bay window seat', 'Sunrise view', 'Bathtub', 'Antique four-poster', 'Writing desk', 'Hot-water bottles'],
  },
  {
    id: 'silver-oak',
    name: 'Silver Oak Twin',
    size: 32,
    bed: 'Two singles',
    view: 'Estate',
    sleeps: 2,
    base: 8600,
    photo: '1629230324981-0293a8ae17e9',
    gallery: ['1629230324981-0293a8ae17e9', '1674498260932-6f7d8eed6d9f', '1778731660076-f446d59aa1d0'],
    blurb:
      'Twin teak beds that push together on request, and a window onto the tea rows where the pluckers start at seven. The quietest room in the house.',
    amenities: ['Twin or double', 'Estate view', 'Rain shower', 'Step-free entry', 'Quietest room', 'Hot-water bottles'],
  },
  {
    id: 'loft',
    name: 'The Loft',
    size: 44,
    bed: 'King and a daybed',
    view: 'Treetops',
    sleeps: 4,
    base: 12400,
    photo: '1669043962136-224323f6fa1a',
    gallery: ['1669043962136-224323f6fa1a', '1696814543693-31fcf942ccb7', '1720706439286-a642d2cd0db2'],
    blurb:
      'Up the back stairs under the old rafters, with room for two children on the daybed and a trunk of board games that predates most of our guests.',
    amenities: ['Sleeps four', 'Board-game trunk', 'Rain shower', 'Rafter ceiling', 'Treetop view', 'Children welcome'],
  },
]

export const days = [
  { time: '06:30', title: 'The dawn walk', body: 'Mani has plucked these slopes for thirty-one years. He walks slowly and notices everything. Back by eight, in time for appam.' },
  { time: '10:00', title: 'Tea tasting', body: 'Six teas from the estate factory, from silver tips to the strong dust the pluckers drink themselves.' },
  { time: '12:15', title: 'The toy train', body: 'We hold first-class seats on the Nilgiri Mountain Railway up to Ooty. A car brings you home.' },
  { time: '16:00', title: 'Veranda tea', body: 'Every day, rain or not. Fruit cake on Sundays, and the good cups.' },
  { time: '19:30', title: 'The long table', body: 'One sitting, one menu, everyone together. Badaga and Tamil home cooking — tell us what you don’t eat.' },
]

export const journeys = [
  { from: 'Coimbatore airport', code: 'CJB', distance: '70 km', time: '2 h 30' },
  { from: 'Mettupalayam station', code: 'MTP', distance: '36 km', time: '1 h 15' },
  { from: 'Ooty', code: 'UAM', distance: '22 km', time: '50 min' },
  { from: 'Coonoor town', code: 'ONR', distance: '6 km', time: '20 min' },
]

export const seasons = [
  { months: 'March – May', title: 'Clear and bright', body: 'Warm days, long views, the estate at full flush. Our busiest months — book early.' },
  { months: 'June – September', title: 'The monsoon', body: 'Mist through the house by afternoon, waterfalls everywhere, lower rates and a lot of reading.' },
  { months: 'October – February', title: 'Fire season', body: 'Cold, clear nights. Every fireplace lit by six and hot-water bottles in the beds.' },
]

export const notes = [
  { quote: 'We came for two nights and rearranged a week of meetings to stay for five. Nobody at the office believed the photographs.', who: 'Priya', when: 'stayed in March' },
  { quote: 'The children still talk about Mani and the dawn walk. So do we, honestly.', who: 'Arjun & Leela', when: 'stayed in October' },
  { quote: 'I have stayed in grander places. I have never slept as well as I did in the Blue Mountain Room.', who: 'Henrik', when: 'stayed in January' },
]

export const faqs = [
  { q: 'When can we arrive and leave?', a: 'Rooms are ready from 2 pm and we ask for them back by 11 am. Arrive early and we will keep your bags and give you tea; the veranda has never refused anyone.' },
  { q: 'Are children welcome?', a: 'Very. The Loft sleeps a family of four, and children under six stay free in any room. The estate has steep slopes, so small explorers need a grown-up.' },
  { q: 'What if we need to cancel?', a: 'Free until seven days before arrival. Inside seven days we charge the first night, unless we can re-let the room — in which case we charge nothing.' },
  { q: 'Is the house heated?', a: 'By wood fires, thick walls and hot-water bottles, as it has been for a century. Nights drop to 5°C in January; we light the fires before you ask.' },
  { q: 'How accessible is it?', a: 'The Kurinji Room and Silver Oak Twin are step-free from the drive, with wide doors. The Loft and the Planter’s Suite are up stairs. Tell us what you need and we will be honest about it.' },
  { q: 'Can we bring our dog?', a: 'One well-mannered dog per booking, with notice. There are two resident Rajapalayams who will want to be consulted.' },
]

export const extras = [
  { id: 'walk', title: 'Dawn estate walk with Mani', price: 0, unit: 'Included', note: 'Tell us which morning on arrival.' },
  { id: 'dinner', title: 'Dinner at the long table', price: 1400, unit: 'per guest, per night', note: 'Four courses, one sitting at 7:30 pm.' },
  { id: 'bonfire', title: 'Bonfire and barbecue evening', price: 2200, unit: 'per stay', note: 'On the lower lawn, weather permitting.' },
  { id: 'picnic', title: 'Estate picnic hamper', price: 1600, unit: 'per stay', note: 'Carried to the viewpoint for you.' },
]

export const TRANSFER_PRICE = 4200
export const GST = 0.12
export const arrivalTimes = ['Before 2 pm', '2 – 4 pm', '4 – 6 pm', '6 – 8 pm', 'After 8 pm']
export const cancelReasons = ['Change of plans', 'Found other dates', 'Travelling with more people', 'Weather', 'Something else']

/* ----------------------------------------------------------------- Pricing */

const PEAK = [3, 4, 11] // April, May, December
const MONSOON = [5, 6, 7] // June – August

/** Rate for one room on one night, rounded to the nearest ₹100. */
export function nightlyRate(room, date) {
  const d = new Date(date)
  const weekend = d.getDay() === 5 || d.getDay() === 6 ? 1.18 : 1
  const season = PEAK.includes(d.getMonth()) ? 1.15 : MONSOON.includes(d.getMonth()) ? 0.88 : 1
  return Math.round((room.base * weekend * season) / 100) * 100
}

/** Derived from the date itself, so the calendar reads the same on every visit. */
export const roomFree = (roomId, date) => hash01(`${roomId}|${toKey(date)}`) > 0.22

export function nightState(date) {
  const free = rooms.filter((room) => roomFree(room.id, date))
  if (free.length === 0) return { state: 'sold', from: null }
  return {
    state: free.length <= 2 ? 'few' : 'open',
    left: free.length,
    from: Math.min(...free.map((room) => nightlyRate(room, date))),
  }
}

export function stayNights(from, to) {
  const nights = []
  const cursor = new Date(from)
  while (cursor < to) {
    nights.push(new Date(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }
  return nights
}

export function quoteRoom(room, from, to) {
  const nights = stayNights(from, to)
  return {
    available: nights.every((night) => roomFree(room.id, night)),
    total: nights.reduce((sum, night) => sum + nightlyRate(room, night), 0),
    nights: nights.length,
  }
}
