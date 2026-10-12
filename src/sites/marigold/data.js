// Marigold Canteen — a fictional all-day South Indian canteen and kaapi bar.
// Every string and price on the site lives here.

export const brand = {
  name: 'Marigold Canteen',
  short: 'Marigold',
  tagline: 'All-day South Indian canteen & kaapi bar',
  phone: '+91 80 5550 0142',
  email: 'hello@marigoldcanteen.example',
  address: ['14 Lakeview Lane', 'Indiranagar, Bengaluru 560038'],
  closedDay: 1, // Monday
  opens: '07:30',
  closes: '22:30',
}

export const ticker = [
  'Stone-ground batter, twice a day',
  'Kaapi happy hour 3–5 pm',
  'Closed Mondays, sorry',
  'Ghee podi idli is back',
  'Sunday sadya — book ahead',
  'Walk-ins always welcome',
]

export const photos = {
  hero: '1668236543090-82eba5ee5976',
  kaapi: '1758387941825-a6ecaec9c14d',
  kaapiBrass: '1668236482744-b48b28650f12',
  room: '1712730642507-d4ad0904e997',
  mural: '1788618260557-0911b38e250d',
  griddle: '1763952180307-f018f9c41453',
}

export const categories = [
  { id: 'dosa', label: 'Dosa' },
  { id: 'idli', label: 'Idli & Vada' },
  { id: 'meals', label: 'Rice & Meals' },
  { id: 'plates', label: 'Small Plates' },
  { id: 'sweets', label: 'Sweets' },
  { id: 'drinks', label: 'Kaapi & Coolers' },
]

// tags: vg = vegan, gf = gluten-free, nut = contains nuts, jain = no onion or garlic
// heat: 0–3
export const menu = [
  // Dosa
  { id: 'ghee-roast', cat: 'dosa', name: 'Ghee Roast', price: 165, heat: 0, tags: ['gf'], photo: '1743517894265-c86ab035adef', blurb: 'Paper-thin, cone-rolled, brushed with cultured ghee. Arrives taller than your water glass.' },
  { id: 'masala-dosa', cat: 'dosa', name: 'Mysore Masala', price: 185, heat: 2, tags: ['gf'], photo: '1668236543090-82eba5ee5976', blurb: 'Red chilli-garlic chutney smeared inside, turmeric potato, three chutneys and a bowl of sambar.', signature: true },
  { id: 'podi-dosa', cat: 'dosa', name: 'Gunpowder Podi', price: 175, heat: 3, tags: ['vg', 'gf'], blurb: 'Roasted lentil and chilli podi with cold-pressed sesame oil. The loud one.' },
  { id: 'benne-dosa', cat: 'dosa', name: 'Davangere Benne', price: 195, heat: 1, tags: ['gf'], photo: '1694849789325-914b71ab4075', blurb: 'Thick, soft-centred, crisp-edged. An honest amount of white butter.' },
  { id: 'rava-dosa', cat: 'dosa', name: 'Onion Rava', price: 180, heat: 1, tags: ['vg'], blurb: 'Lacy semolina crêpe with green chilli, curry leaf and cracked pepper. Takes eight minutes — worth every one.' },
  { id: 'neer-dosa', cat: 'dosa', name: 'Neer Dosa & Stew', price: 210, heat: 1, tags: ['vg', 'gf', 'jain'], blurb: 'Three silk-soft rice crêpes with a coconut milk vegetable stew.' },
  { id: 'pesarattu', cat: 'dosa', name: 'Pesarattu Upma', price: 190, heat: 2, tags: ['vg'], blurb: 'Green moong crêpe from Andhra, stuffed with ginger upma. Allam chutney on the side.' },

  // Idli & vada
  { id: 'steamed-idli', cat: 'idli', name: 'Steamed Idli (3)', price: 95, heat: 0, tags: ['vg', 'gf', 'jain'], photo: '1632104667384-06f58cb7ad44', blurb: 'Cloud-soft, steamed to order. Sambar, coconut and tomato chutneys.' },
  { id: 'ghee-podi-idli', cat: 'idli', name: 'Ghee Podi Idli', price: 145, heat: 2, tags: ['gf'], photo: '1680359871322-aabe6b33eff5', blurb: 'Button idlis tossed in ghee and podi until they blush.', signature: true },
  { id: 'medu-vada', cat: 'idli', name: 'Medu Vada (2)', price: 110, heat: 1, tags: ['vg', 'gf'], photo: '1730191843435-073792ba22bc', blurb: 'Crisp shell, fluffy middle, peppercorn and curry leaf. Fried in small batches.' },
  { id: 'sambar-vada', cat: 'idli', name: 'Sambar Vada', price: 130, heat: 2, tags: ['vg', 'gf'], blurb: 'Vada drowned in hot sambar with raw onion and a spoon of ghee on request.' },
  { id: 'thatte-idli', cat: 'idli', name: 'Thatte Idli', price: 120, heat: 0, tags: ['vg', 'gf', 'jain'], blurb: 'Plate-sized Bidadi idli with a knob of butter and chutney pudi.' },
  { id: 'idli-vada-combo', cat: 'idli', name: 'Idli–Vada Combo', price: 150, heat: 1, tags: ['vg', 'gf'], photo: '1630383249896-424e482df921', blurb: 'Two idlis, one vada, the full set of chutneys. The canteen classic.' },

  // Rice & meals
  { id: 'canteen-thali', cat: 'meals', name: 'The Canteen Thali', price: 345, heat: 2, tags: [], photo: '1742281257687-092746ad6021', blurb: 'Eleven bowls that change daily: kootu, poriyal, sambar, rasam, curd, payasam and friends. Unlimited rice.', signature: true },
  { id: 'banana-leaf', cat: 'meals', name: 'Banana Leaf Meals', price: 395, heat: 2, tags: ['gf'], photo: '1742281258189-3b933879867a', blurb: 'Served on the leaf, lunch only. We keep ladling until you fold it shut.' },
  { id: 'bisi-bele', cat: 'meals', name: 'Bisi Bele Bath', price: 225, heat: 2, tags: ['gf'], photo: '1668236534990-73c4ed23043c', blurb: 'Rice, lentils and vegetables cooked down with our own masala. Boondi and ghee on top.' },
  { id: 'curd-rice', cat: 'meals', name: 'Thayir Sadam', price: 165, heat: 0, tags: ['gf', 'jain'], photo: '1633383718081-22ac93e3db65', blurb: 'Cold curd rice, pomegranate, mustard tempering. The correct way to end a meal.' },
  { id: 'lemon-rice', cat: 'meals', name: 'Chitranna', price: 175, heat: 1, tags: ['vg', 'gf', 'nut'], blurb: 'Lemon rice with peanuts, curry leaf and green chilli. Travels beautifully.' },
  { id: 'veg-biryani', cat: 'meals', name: 'Donne Vegetable Biryani', price: 265, heat: 3, tags: ['gf'], photo: '1633945274309-2c16c9682a8c', blurb: 'Short-grain seeraga samba rice, mint, green masala. Served in a leaf cup with raita.' },

  // Small plates
  { id: 'bonda', cat: 'plates', name: 'Mangalore Bonda', price: 125, heat: 1, tags: [], photo: '1657196118354-f25f29fe636d', blurb: 'Golden, tangy, a little chewy. Six to a plate with coconut chutney.' },
  { id: 'crispy-plate', cat: 'plates', name: 'The Crispy Plate', price: 215, heat: 2, tags: ['vg'], photo: '1668236499396-a62d2d1cb0cf', blurb: 'Pepper cauliflower fry with three chutneys. Built for sharing, rarely shared.' },
  { id: 'paniyaram', cat: 'plates', name: 'Kuzhi Paniyaram', price: 140, heat: 1, tags: ['vg', 'gf'], blurb: 'Dimpled batter dumplings, crisp outside, with onion-tomato chutney.' },
  { id: 'sundal', cat: 'plates', name: 'Beach Sundal', price: 95, heat: 1, tags: ['vg', 'gf', 'jain'], blurb: 'Warm chickpeas, raw mango, fresh coconut. Marina Beach in a paper cone.' },
  { id: 'masala-vada', cat: 'plates', name: 'Masala Vada', price: 115, heat: 2, tags: ['vg', 'gf'], photo: '1683533678059-63c6a0e9e3ef', blurb: 'Coarse chana dal fritters with fennel and dill. Best with a kaapi.' },

  // Sweets
  { id: 'jalebi', cat: 'sweets', name: 'Hot Jalebi', price: 120, heat: 0, tags: [], photo: '1695568181440-aca4dac18650', blurb: 'Fried to order, dunked in saffron syrup. Dangerous with rabri (+₹40).' },
  { id: 'kesari', cat: 'sweets', name: 'Pineapple Kesari', price: 110, heat: 0, tags: ['nut'], photo: '1517244683847-7456b63c5969', blurb: 'Semolina, ghee, pineapple and cashew. Served warm in a brass cup.' },
  { id: 'payasam', cat: 'sweets', name: 'Elaneer Payasam', price: 135, heat: 0, tags: ['gf', 'jain'], blurb: 'Tender coconut and coconut milk, served cold. Not too sweet on purpose.' },
  { id: 'mysore-pak', cat: 'sweets', name: 'Soft Mysore Pak', price: 95, heat: 0, tags: ['gf'], blurb: 'Two pieces, made in-house every morning with more ghee than we should admit.' },

  // Drinks
  { id: 'filter-kaapi', cat: 'drinks', name: 'Filter Kaapi', price: 70, heat: 0, tags: ['gf', 'jain'], photo: '1758387941825-a6ecaec9c14d', blurb: 'Peaberry and chicory, brass-filter decoction, pulled a metre high.', signature: true },
  { id: 'black-kaapi', cat: 'drinks', name: 'Kattan Kaapi', price: 60, heat: 0, tags: ['vg', 'gf', 'jain'], photo: '1757918391899-1341f7b285fb', blurb: 'Black, strong, a touch of jaggery.' },
  { id: 'masala-chai', cat: 'drinks', name: 'Canteen Chai', price: 65, heat: 0, tags: ['gf', 'jain'], photo: '1636920272028-c27f1ae474c3', blurb: 'Assam leaf, ginger, cardamom, star anise.' },
  { id: 'mango-lassi', cat: 'drinks', name: 'Alphonso Lassi', price: 145, heat: 0, tags: ['gf', 'jain'], photo: '1623065422902-30a2d299bbe4', blurb: 'Thick enough to hold a straw upright. In season only.' },
  { id: 'buttermilk', cat: 'drinks', name: 'Neer Mor', price: 75, heat: 1, tags: ['gf'], blurb: 'Spiced buttermilk with ginger, curry leaf and green chilli.' },
  { id: 'panakam', cat: 'drinks', name: 'Panakam', price: 85, heat: 0, tags: ['vg', 'gf', 'jain'], blurb: 'Jaggery, dry ginger, cardamom and lime over ice.' },
]

export const specialIds = ['masala-dosa', 'canteen-thali', 'ghee-podi-idli']

export const tagLabels = {
  vg: 'Vegan',
  gf: 'Gluten-free',
  nut: 'Contains nuts',
  jain: 'No onion or garlic',
}

export const kaapiOptions = {
  strength: [
    { id: 'light', label: 'Light', ratio: 0.22, note: 'Milky and mellow' },
    { id: 'classic', label: 'Classic', ratio: 0.34, note: 'The house pour' },
    { id: 'strong', label: 'Strong', ratio: 0.48, note: 'Double decoction' },
  ],
  milk: [
    { id: 'dairy', label: 'Full-cream', price: 0 },
    { id: 'oat', label: 'Oat', price: 30 },
  ],
  sweet: [
    { id: 'none', label: 'No sugar' },
    { id: 'less', label: 'Less' },
    { id: 'classic', label: 'Classic' },
    { id: 'jaggery', label: 'Jaggery' },
  ],
  size: [
    { id: 'tumbler', label: 'Tumbler · 120 ml', price: 70 },
    { id: 'double', label: 'Double · 220 ml', price: 110 },
  ],
}

export const hours = [
  { day: 'Monday', short: 'Mon', closed: true },
  { day: 'Tuesday', short: 'Tue', open: '07:30', close: '22:30' },
  { day: 'Wednesday', short: 'Wed', open: '07:30', close: '22:30' },
  { day: 'Thursday', short: 'Thu', open: '07:30', close: '22:30' },
  { day: 'Friday', short: 'Fri', open: '07:30', close: '23:00' },
  { day: 'Saturday', short: 'Sat', open: '07:00', close: '23:00' },
  { day: 'Sunday', short: 'Sun', open: '07:00', close: '22:30' },
]

export const sittings = [
  { id: 'breakfast', label: 'Breakfast', from: '07:30', to: '11:00' },
  { id: 'lunch', label: 'Lunch', from: '12:00', to: '15:00' },
  { id: 'dinner', label: 'Dinner', from: '18:30', to: '21:30' },
]

// `weekday` is 0 (Sun) – 6 (Sat); dates are resolved to the next occurrence.
export const events = [
  { id: 'sadya', weekday: 0, time: '12:30', title: 'Sunday Sadya', price: 695, seats: 40, blurb: 'Twenty-four dishes on a banana leaf, served in order, the way it is done at a Kerala wedding. One seating.' },
  { id: 'cupping', weekday: 3, time: '16:00', title: 'Kaapi Cupping', price: 450, seats: 12, blurb: 'Taste four estates side by side, learn the brass filter, take home 100 g of the blend you liked most.' },
  { id: 'dosa-class', weekday: 6, time: '09:00', title: 'The Dosa Flip', price: 950, seats: 8, blurb: 'A morning at the tawa with our dosa master. You will ruin three and nail the fourth.' },
]

export const occasions = ['Just eating', 'Birthday', 'Anniversary', 'Work lunch', 'First time here']
