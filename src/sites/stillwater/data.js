// Stillwater — a fictional bathhouse and apothecary.

import { hash01, toKey } from '../shared/dates'

export const brand = {
  name: 'Stillwater',
  descriptor: 'Bathhouse & Apothecary',
  address: ['House 212, Bairo Alto', 'Assagao, North Goa 403507'],
  phone: '+91 832 555 0164',
  email: 'hello@stillwater.example',
}

export const photos = {
  hero: '1488345979593-09db0f85545f',
  hall: '1764057145833-8baa3efbe58f',
  sauna: '1757940807425-5d2afa01ddd0',
  massage: '1745327883508-b6cd32e5dde5',
  ritual: '1620733723572-11c53f73a416',
  water: '1527904188605-3424bcc2d107',
  bath: '1782805134604-8fc2b02c67a4',
}

/* ------------------------------------------------------------- The circuit */

export const pools = [
  { id: 'warm', name: 'Warm pool', temp: '38°C', note: 'Begin here. Let your shoulders drop below the surface.' },
  { id: 'hot', name: 'Hot pool', temp: '41°C', note: 'Short and still. Leave before you want to.' },
  { id: 'cold', name: 'Cold plunge', temp: '12°C', note: 'Breathe out as you go in. Count slowly.' },
  { id: 'rest', name: 'Rest', temp: 'Warm stone', note: 'Lie down, drink water, do nothing at all.' },
]

// Minutes in each pool, per round.
export const profiles = [
  { id: 'first', label: 'First visit', rounds: 2, minutes: { warm: 10, hot: 4, cold: 1, rest: 10 } },
  { id: 'regular', label: 'Regular', rounds: 3, minutes: { warm: 8, hot: 8, cold: 2, rest: 8 } },
  { id: 'recovery', label: 'After training', rounds: 3, minutes: { warm: 5, hot: 10, cold: 3, rest: 6 } },
]

/* -------------------------------------------------------------- Treatments */

export const categories = [
  { id: 'bathing', label: 'Bathing' },
  { id: 'massage', label: 'Massage' },
  { id: 'facial', label: 'Facials' },
  { id: 'body', label: 'Body rituals' },
]

export const treatments = [
  { id: 'session', cat: 'bathing', name: 'Bathing session', blurb: 'Two unhurried hours in the four pools, sauna and steam. Robe, towels and tea included.', options: [{ mins: 120, price: 1800 }] },
  { id: 'private-bath', cat: 'bathing', name: 'Private bath for two', blurb: 'A cedar soaking tub in its own courtyard, drawn with salts of your choosing.', options: [{ mins: 75, price: 4200 }] },
  { id: 'aufguss', cat: 'bathing', name: 'Guided sauna ritual', blurb: 'Three rounds of heat and scent led by a sauna master, with a cold rinse between each.', options: [{ mins: 45, price: 1200 }] },

  { id: 'deep-tissue', cat: 'massage', name: 'Deep tissue', blurb: 'Slow, firm work for backs that sit at desks and legs that run on roads.', options: [{ mins: 60, price: 3800 }, { mins: 90, price: 5200 }] },
  { id: 'abhyanga', cat: 'massage', name: 'Abhyanga', blurb: 'A traditional warm-oil massage in long, rhythmic strokes. Sesame or coconut, your choice.', options: [{ mins: 75, price: 4400 }] },
  { id: 'head-neck', cat: 'massage', name: 'Scalp, neck and shoulders', blurb: 'For everything you carry above the collarbone. Seated or lying down.', options: [{ mins: 45, price: 2400 }] },
  { id: 'prenatal', cat: 'massage', name: 'Prenatal', blurb: 'Side-lying and fully supported, from the second trimester onward.', options: [{ mins: 60, price: 3800 }] },

  { id: 'house-facial', cat: 'facial', name: 'The Stillwater facial', blurb: 'Cleanse, steam, clay and a long facial massage with our blue lotus oil.', options: [{ mins: 60, price: 4200 }, { mins: 90, price: 5600 }] },
  { id: 'cold-stone', cat: 'facial', name: 'Cold-stone facial', blurb: 'Chilled river stones and lymphatic strokes to settle puffiness and heat.', options: [{ mins: 45, price: 3400 }] },
  { id: 'clarifying', cat: 'facial', name: 'Clarifying facial', blurb: 'Gentle extraction and a calming mask for skin that is having opinions.', options: [{ mins: 60, price: 3900 }] },

  { id: 'salt-scrub', cat: 'body', name: 'Sea-salt scrub', blurb: 'Coarse Goan salt and coconut oil, head to heel, rinsed under warm water.', options: [{ mins: 45, price: 2800 }] },
  { id: 'clay-wrap', cat: 'body', name: 'Clay and steam wrap', blurb: 'Warm green clay, a linen cocoon and twenty minutes of quiet steam.', options: [{ mins: 75, price: 4600 }] },
  { id: 'hammam', cat: 'body', name: 'Hammam ritual', blurb: 'Black soap, a kessa mitt, a great deal of water. You will leave a size lighter.', options: [{ mins: 90, price: 5800 }] },
]

export const therapists = [
  { id: 'any', name: 'No preference', note: 'Shows the most times' },
  { id: 'anjali', name: 'Anjali', note: 'Deep tissue, prenatal' },
  { id: 'tomas', name: 'Tomás', note: 'Sauna master, hammam' },
  { id: 'reva', name: 'Reva', note: 'Facials, lymphatic work' },
  { id: 'ibrahim', name: 'Ibrahim', note: 'Abhyanga, scalp' },
]

const DAYPARTS = [
  { id: 'morning', label: 'Morning', times: ['08:00', '08:45', '09:30', '10:15', '11:00'] },
  { id: 'afternoon', label: 'Afternoon', times: ['12:30', '13:15', '14:00', '15:30', '16:15'] },
  { id: 'evening', label: 'Evening', times: ['17:30', '18:15', '19:00', '19:45', '20:30'] },
]

/** Open times for a date. Derived from the date so the diary is stable. */
export function slotsFor(date, therapistId, now = new Date()) {
  const key = toKey(date)
  // Roughly one day in six is fully booked.
  if (hash01(`full|${key}`) < 0.16) return []
  const isToday = toKey(now) === key
  const cutoff = now.getHours() * 60 + now.getMinutes() + 45
  const tightness = therapistId === 'any' ? 0.3 : 0.52

  return DAYPARTS.map((part) => ({
    ...part,
    times: part.times.filter((time) => {
      const [h, m] = time.split(':').map(Number)
      if (isToday && h * 60 + m < cutoff) return false
      return hash01(`${key}|${time}|${therapistId}`) > tightness
    }),
  })).filter((part) => part.times.length)
}

export function friendlyTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}${m ? `:${String(m).padStart(2, '0')}` : ''} ${suffix}`
}

export function friendlyDuration(mins) {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  if (!h) return `${m} min`
  return m ? `${h} h ${m} min` : `${h} h`
}

/* -------------------------------------------------------------- Apothecary */

export const shopFilters = ['All', 'Bath', 'Body', 'Face']

export const products = [
  { id: 'clay-cleanser', type: 'Face', name: 'Clay Cleanser', detail: 'Green clay and rice bran · 100 ml', price: 1250, photo: '1616750819456-5cdee9b85d22', badge: 'New' },
  { id: 'lotus-oil', type: 'Face', name: 'Blue Lotus Face Oil', detail: 'Cold-pressed, unscented · 30 ml', price: 2400, photo: '1576426863848-c21f53c60b19', badge: 'Used in our facials' },
  { id: 'vetiver-wash', type: 'Body', name: 'Vetiver Body Wash', detail: 'Vetiver root and black pepper · 300 ml', price: 1350, photo: '1597931752949-98c74b5b159f' },
  { id: 'after-bath', type: 'Body', name: 'After-Bath Balm', detail: 'Shea, kokum and neroli · 120 ml', price: 1650, photo: '1616750819574-7e38aa8046fa' },
  { id: 'bathing-duo', type: 'Bath', name: 'The Bathing Duo', detail: 'Salt soak and body oil · set of two', price: 2600, photo: '1786171140425-d9180dc18c8a', badge: 'Gift-ready' },
  { id: 'night-salve', type: 'Face', name: 'Night Salve', detail: 'Beeswax, ghee and saffron · 50 g', price: 1900, photo: '1768235146447-26b1549f845a' },
]

export const passes = [
  { id: 'single', name: 'Single session', price: 1800, per: 'one visit', points: ['Two hours in the baths', 'Robe, towels and tea', 'Valid for six months'] },
  { id: 'ten', name: 'Ten sessions', price: 15000, per: '₹1,500 a visit', points: ['Share with a friend', 'Book up to 30 days ahead', 'Valid for a year'], featured: true },
  { id: 'monthly', name: 'Monthly', price: 9500, per: 'every month', points: ['Unlimited weekday bathing', '15% off treatments', 'Pause any time'] },
]

export const giftAmounts = [2000, 5000, 10000]
export const FREE_DELIVERY = 3000
export const DELIVERY = 120

export const etiquette = [
  'Shower before you enter the pools. Soap is by the door.',
  'Voices low. The halls carry sound further than you think.',
  'Phones stay in the lockers. There is a clock on every wall.',
  'Swimwear in the shared pools; the private baths are yours.',
  'Arrive ten minutes early. Leave whenever you remember to.',
  'Drink the tea. It is there for a reason.',
]

export const faqs = [
  { q: 'I have never been to a bathhouse. What do I do?', a: 'Shower, then follow the order on the wall: warm, hot, cold, rest. Repeat. A host walks every first-time guest through the halls, and nobody is watching to see whether you get it right.' },
  { q: 'What should I bring?', a: 'Swimwear and yourself. We provide robes, towels, sandals, lockers, and everything in the showers. Leave jewellery at home — the mineral pools tarnish silver.' },
  { q: 'Can I come if I am pregnant?', a: 'Yes, with care. The warm pool and our prenatal massage are suitable from the second trimester. We ask you to skip the hot pool, sauna and cold plunge, and to check with your doctor first.' },
  { q: 'How do cancellations work?', a: 'Move or cancel free of charge up to 12 hours before. Inside 12 hours we charge half; if you simply do not arrive, the full amount.' },
  { q: 'Is there an age limit?', a: 'The baths are for guests aged 16 and over. On Sunday mornings we run a family hour from 8 to 10 for children of six and up.' },
]

export const hours = [
  { day: 'Monday – Thursday', time: '8 am – 9 pm' },
  { day: 'Friday – Saturday', time: '8 am – 10 pm' },
  { day: 'Sunday', time: '8 am – 8 pm' },
  { day: 'Family hour', time: 'Sunday, 8 – 10 am' },
]
