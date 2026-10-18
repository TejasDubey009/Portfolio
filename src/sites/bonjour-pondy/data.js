// Bonjour Pondy — a trip planner for Puducherry (Pondicherry).
// Places are real; timings and prices are indicative and should be checked
// locally. Coordinates are approximate, good enough to draw a route.

export const interests = [
  { id: 'heritage', label: 'Heritage walks' },
  { id: 'beach', label: 'Beaches' },
  { id: 'food', label: 'Cafés & food' },
  { id: 'spirit', label: 'Ashram & Auroville' },
  { id: 'nature', label: 'Nature & outdoors' },
  { id: 'shop', label: 'Markets & craft' },
]

export const paces = [
  { id: 'easy', label: 'Easy', stops: 3, note: 'Long lunches' },
  { id: 'balanced', label: 'Balanced', stops: 5, note: 'A full day, unhurried' },
  { id: 'full', label: 'Packed', stops: 7, note: 'See it all' },
]

export const zones = {
  white: { label: 'White Town', theme: 'White Town on foot', centre: [11.9318, 79.8345] },
  tamil: { label: 'Tamil Quarter', theme: 'Tamil Quarter & the markets', centre: [11.9318, 79.8285] },
  north: { label: 'Auroville & north', theme: 'Auroville & the north shore', centre: [11.99, 79.83] },
  south: { label: 'South & backwaters', theme: 'Backwaters & Paradise Beach', centre: [11.892, 79.812] },
  west: { label: 'Ousteri', theme: 'Ousteri Lake & a slow afternoon', centre: [11.95, 79.745] },
  far: { label: 'Day trip', theme: 'Day trip out of town', centre: [11.9318, 79.8345] },
}

export const slotLabels = {
  sunrise: 'Sunrise',
  morning: 'Morning',
  midday: 'Midday',
  afternoon: 'Afternoon',
  sunset: 'Sunset',
  evening: 'Evening',
}

// mins: time on the ground. cost: rupees per person. weight: how essential.
export const places = [
  // White Town
  { id: 'promenade', name: 'Promenade Beach at first light', zone: 'white', cats: ['beach', 'heritage'], lat: 11.9316, lng: 79.8362, mins: 60, best: ['sunrise'], cost: 0, weight: 10, photo: '/images/bonjour-pondy/promenade.jpg', blurb: 'A kilometre and a half of sea wall along Goubert Avenue. The road is closed to traffic in the early morning and evening, which is exactly when the whole town comes out to walk.', tip: 'Be on the rocks by 5:45. The light is over by 6:30 and so is the cool.' },
  { id: 'frenchquarter', name: 'French Quarter walk', zone: 'white', cats: ['heritage'], lat: 11.93, lng: 79.8345, mins: 120, best: ['morning', 'afternoon'], cost: 0, weight: 10, photo: '/images/bonjour-pondy/frenchquarter.jpg', blurb: 'Mustard walls, white trim, bougainvillea over every gate, and street signs in French and Tamil. Start on Rue Dumas, drift north, and let the side streets win.', tip: 'Walk it before ten or after four. At noon the streets are empty for a reason.' },
  { id: 'ashram', name: 'Sri Aurobindo Ashram', zone: 'white', cats: ['spirit'], lat: 11.9368, lng: 79.8343, mins: 45, best: ['morning'], cost: 0, weight: 8, photo: '/images/bonjour-pondy/ashram.jpg', blurb: 'The quiet centre of the town: a courtyard, a frangipani tree and the flower-covered samadhi. Visitors sit in silence for as long as they like.', tip: 'Phones off and shoes at the gate. Visiting hours are limited — typically mornings and mid-afternoon.' },
  { id: 'manakula', name: 'Manakula Vinayagar Temple', zone: 'white', cats: ['spirit', 'heritage'], lat: 11.9363, lng: 79.8334, mins: 30, best: ['morning', 'evening'], cost: 0, weight: 6, photo: '/images/bonjour-pondy/manakula.jpg', blurb: 'A Ganesha temple older than the French town built around it, with a painted ceiling and a gold-plated tower.', tip: 'A two-minute walk from the ashram; do them together.' },
  { id: 'museum', name: 'Puducherry Museum', zone: 'white', cats: ['heritage'], lat: 11.934, lng: 79.8347, mins: 60, best: ['midday'], cost: 50, weight: 5, closed: 1, photo: '/images/bonjour-pondy/museum.jpg', blurb: 'Roman pottery and beads dug from Arikamedu, Chola bronzes, and a floor of French colonial furniture nobody has moved in decades.', tip: 'Usually closed on Mondays. A good place to hide from the midday sun.' },
  { id: 'cafes', name: 'Café hour on Rue Suffren', zone: 'white', cats: ['food'], lat: 11.9312, lng: 79.8338, mins: 75, best: ['midday', 'afternoon'], cost: 500, weight: 8, photo: '/images/bonjour-pondy/cafes.jpg', blurb: 'Pondicherry runs on croissants and filter coffee. The French Quarter’s cafés sit in old courtyards with slow fans and slower service.', tip: 'Order the cold coffee and whatever came out of the oven last.' },
  { id: 'gandhi', name: 'Gandhi Statue & the old lighthouse', zone: 'white', cats: ['heritage'], lat: 11.9328, lng: 79.8361, mins: 30, best: ['sunset', 'morning'], cost: 0, weight: 6, photo: '/images/bonjour-pondy/gandhi.jpg', blurb: 'The middle of the Promenade: a four-metre Gandhi ringed by carved pillars, with the 1836 lighthouse just behind.', tip: 'The pillars were brought from Gingee Fort, seventy kilometres inland.' },
  { id: 'dusk', name: 'The Promenade at dusk', zone: 'white', cats: ['beach', 'food'], lat: 11.9305, lng: 79.836, mins: 75, best: ['sunset'], cost: 150, weight: 9, photo: '/images/bonjour-pondy/dusk.jpg', blurb: 'The evening walk. Families, ice cream, roasted peanuts in paper cones, and the sea going from silver to slate.', tip: 'Traffic stops around six. Walk north to south so the breeze is in your face.' },
  { id: 'cycle', name: 'Dawn cycle through White Town', zone: 'white', cats: ['heritage', 'nature'], lat: 11.9296, lng: 79.8336, mins: 90, best: ['sunrise'], cost: 300, weight: 6, photo: '/images/bonjour-pondy/cycle.jpg', blurb: 'Empty streets, long shadows, and every door photographed without a scooter parked in front of it.', tip: 'Guesthouses rent cycles by the day. Check the brakes before you leave.' },
  { id: 'notredame', name: 'Notre-Dame des Anges', zone: 'white', cats: ['heritage', 'spirit'], lat: 11.9291, lng: 79.8352, mins: 20, best: ['afternoon'], cost: 0, weight: 5, photo: '/images/bonjour-pondy/notredame.jpg', blurb: 'A pale pink church facing the sea, built in the 1850s with a limestone-and-eggshell plaster that still glows in late light.', tip: 'Mass is still said here in French, Tamil and English.' },
  { id: 'bharathi', name: 'Bharathi Park', zone: 'white', cats: ['nature', 'heritage'], lat: 11.9331, lng: 79.8343, mins: 30, best: ['afternoon'], cost: 0, weight: 4, photo: '/images/bonjour-pondy/bharathi.jpg', blurb: 'The shaded square at the centre of the French grid, built around the white Aayi Mandapam monument.', tip: 'The benches under the rain trees are the coolest seats in town at three o’clock.' },

  // Tamil Quarter
  { id: 'tamilwalk', name: 'Tamil Quarter heritage walk', zone: 'tamil', cats: ['heritage'], lat: 11.9338, lng: 79.8285, mins: 90, best: ['morning'], cost: 0, weight: 8, photo: '/images/bonjour-pondy/tamilwalk.jpg', blurb: 'Across the canal the architecture changes completely: deep verandas, carved teak doors and thinnai benches where neighbours still sit at dusk.', tip: 'Vysial Street has the best-preserved run of houses.' },
  { id: 'goubert', name: 'Goubert Market', zone: 'tamil', cats: ['shop', 'food'], lat: 11.9342, lng: 79.8293, mins: 60, best: ['morning'], cost: 200, weight: 7, photo: '/images/bonjour-pondy/goubert.jpg', blurb: 'The Grand Bazaar: fish on ice, jasmine by the metre, bananas by the cartload and spices sold from brass scoops.', tip: 'Go before nine, wear closed shoes, and bring small notes.' },
  { id: 'basilica', name: 'Basilica of the Sacred Heart', zone: 'tamil', cats: ['heritage', 'spirit'], lat: 11.9263, lng: 79.826, mins: 30, best: ['morning', 'afternoon'], cost: 0, weight: 7, photo: '/images/bonjour-pondy/basilica.jpg', blurb: 'A red-and-white Gothic church with stained glass that throws colour across the nave in the late morning.', tip: 'It sits at the south end of the boulevard — an easy stop on the way to the Botanical Garden.' },
  { id: 'cathedral', name: 'Immaculate Conception Cathedral', zone: 'tamil', cats: ['heritage', 'spirit'], lat: 11.9326, lng: 79.8303, mins: 20, best: ['morning'], cost: 0, weight: 4, photo: '/images/bonjour-pondy/cathedral.jpg', blurb: 'The mother church of the town, finished in 1791, with a blue-and-gold interior worth five quiet minutes.', tip: 'On Mission Street, between the market and the canal.' },
  { id: 'mission', name: 'Mission Street shopping', zone: 'tamil', cats: ['shop'], lat: 11.9316, lng: 79.8312, mins: 90, best: ['afternoon', 'evening'], cost: 1500, weight: 6, photo: '/images/bonjour-pondy/mission.jpg', blurb: 'Handmade paper, hand-poured incense, leather sandals made to measure, and linen cut by the metre.', tip: 'Most shops shut for lunch and reopen around four.' },
  { id: 'paper', name: 'Handmade paper workshop', zone: 'tamil', cats: ['shop', 'heritage'], lat: 11.9412, lng: 79.8318, mins: 45, best: ['morning', 'midday'], cost: 0, weight: 4, closed: 0, photo: '/images/bonjour-pondy/paper.jpg', blurb: 'Watch cotton rag become marbled paper, sheet by sheet, in a workshop that has been at it since 1959.', tip: 'Usually closed on Sundays. The seconds bin is the bargain.' },
  { id: 'botanical', name: 'Botanical Garden', zone: 'tamil', cats: ['nature'], lat: 11.9296, lng: 79.8226, mins: 60, best: ['afternoon'], cost: 20, weight: 4, photo: '/images/bonjour-pondy/botanical.jpg', blurb: 'Laid out by the French in 1826: old trees, a small aquarium and paths wide enough for an unhurried loop.', tip: 'Go for the shade, not the flowerbeds.' },

  // Auroville and the north shore
  { id: 'matrimandir', name: 'Matrimandir viewing point', zone: 'north', cats: ['spirit', 'nature'], lat: 12.0058, lng: 79.8112, mins: 75, best: ['morning'], cost: 0, weight: 10, photo: '/images/bonjour-pondy/matrimandir.jpg', blurb: 'A golden sphere in a red-earth clearing, a kilometre’s walk through the trees from the Visitors Centre.', tip: 'Free passes for the viewing point are issued at the Visitors Centre. The inner chamber must be booked in person, at least a day ahead.' },
  { id: 'auroville', name: 'Auroville Visitors Centre', zone: 'north', cats: ['spirit', 'shop'], lat: 12.0069, lng: 79.8085, mins: 60, best: ['morning', 'midday'], cost: 0, weight: 8, photo: '/images/bonjour-pondy/auroville.jpg', blurb: 'Start here: a short film, an exhibition on the township, and boutiques selling what its workshops make.', tip: 'Arrive by 9:30 — passes for the viewing point stop mid-afternoon and it is shut on some afternoons.' },
  { id: 'aurolunch', name: 'Lunch at an Auroville bakery', zone: 'north', cats: ['food'], lat: 12.0032, lng: 79.8128, mins: 60, best: ['midday'], cost: 600, weight: 6, photo: '/images/bonjour-pondy/aurolunch.jpg', blurb: 'Sourdough, salads from the farms next door, and kombucha before it was fashionable.', tip: 'Many kitchens close by three.' },
  { id: 'serenity', name: 'Serenity Beach', zone: 'north', cats: ['beach'], lat: 11.9697, lng: 79.8459, mins: 90, best: ['afternoon', 'sunset', 'sunrise'], cost: 0, weight: 8, photo: '/images/bonjour-pondy/serenity.jpg', blurb: 'A working fishing beach with painted boats at one end and surf schools at the other.', tip: 'Swim only where the locals do; the current runs hard off the breakwater.' },
  { id: 'surf', name: 'Surf lesson at Serenity', zone: 'north', cats: ['beach', 'nature'], lat: 11.9688, lng: 79.8457, mins: 120, best: ['sunrise', 'morning'], cost: 1800, weight: 5, photo: '/images/bonjour-pondy/surf.jpg', blurb: 'Soft boards, patient instructors, and a beach break gentle enough to stand up on by the second hour.', tip: 'Lessons run early, when the swell is clean. Book the evening before.' },
  { id: 'aurobeach', name: 'Auro Beach at sunset', zone: 'north', cats: ['beach'], lat: 11.9869, lng: 79.848, mins: 75, best: ['sunset'], cost: 0, weight: 6, photo: '/images/bonjour-pondy/aurobeach.jpg', blurb: 'Wide, palm-backed and quieter than anything in town. The sun sets behind you; watch the colour on the water instead.', tip: 'No lights after dark — leave while you can still see the path.' },

  // South: backwaters
  { id: 'paradise', name: 'Boat to Paradise Beach', zone: 'south', cats: ['beach', 'nature'], lat: 11.885, lng: 79.804, mins: 180, best: ['morning'], cost: 400, weight: 9, photo: '/images/bonjour-pondy/paradise.jpg', blurb: 'A twenty-minute ferry down the Chunnambar backwater to a sandbar with the sea on one side and the river on the other.', tip: 'Boats leave when full. Go on a weekday, and carry water and a hat — there is almost no shade.' },
  { id: 'kayak', name: 'Backwater kayak', zone: 'south', cats: ['nature'], lat: 11.888, lng: 79.81, mins: 90, best: ['afternoon', 'sunset'], cost: 800, weight: 6, photo: '/images/bonjour-pondy/kayak.jpg', blurb: 'Flat water, mangrove edges, kingfishers on every post. Paddle out on the tide and drift back.', tip: 'The last hour before sunset is the best light and the least wind.' },
  { id: 'arikamedu', name: 'Arikamedu', zone: 'south', cats: ['heritage', 'nature'], lat: 11.9005, lng: 79.8205, mins: 60, best: ['afternoon'], cost: 0, weight: 5, photo: '/images/bonjour-pondy/arikamedu.jpg', blurb: 'A Roman trading post from two thousand years ago. What survives is a brick gateway in a mango grove above the river — and the sense that Pondicherry has always been a port.', tip: 'There is no signage. Read up before you go, or the ruins are just walls.' },
  { id: 'fishing', name: 'Veerampattinam fishing village', zone: 'south', cats: ['heritage', 'beach'], lat: 11.9012, lng: 79.8282, mins: 45, best: ['afternoon'], cost: 0, weight: 4, photo: '/images/bonjour-pondy/fishing.jpg', blurb: 'Hundreds of fibreglass boats pulled up on the sand, nets being mended, and the catch auctioned on the beach.', tip: 'Ask before you photograph people at work.' },

  // West
  { id: 'ousteri', name: 'Ousteri Lake birdwatching', zone: 'west', cats: ['nature'], lat: 11.9502, lng: 79.744, mins: 120, best: ['sunrise', 'morning'], cost: 100, weight: 6, photo: '/images/bonjour-pondy/ousteri.jpg', blurb: 'A wide, shallow wetland ten kilometres inland. In winter it fills with painted storks, pelicans and visiting ducks.', tip: 'Bring binoculars. Best from November to February.' },

  // Further out
  { id: 'pichavaram', name: 'Pichavaram mangrove forest', zone: 'far', cats: ['nature'], lat: 11.431, lng: 79.781, mins: 150, best: ['morning'], cost: 1500, weight: 8, photo: '/images/bonjour-pondy/pichavaram.jpg', blurb: 'One of the largest mangrove forests in India. A rowboat takes you through green tunnels barely wider than the oars.', tip: 'About two hours south by road. Leave by seven and take the rowboat, not the motorboat — only it fits the narrow channels.' },
  { id: 'gingee', name: 'Gingee Fort', zone: 'far', cats: ['heritage', 'nature'], lat: 12.253, lng: 79.417, mins: 180, best: ['morning'], cost: 800, weight: 6, photo: '/images/bonjour-pondy/gingee.jpg', blurb: 'Three citadels on three granite hills, seventy kilometres inland. A stiff climb with enormous views and almost nobody else there.', tip: 'Start the climb before nine. Carry more water than you think.' },
]

export const placeById = Object.fromEntries(places.map((p) => [p.id, p]))

// Meal stops for each part of town. `at` is roughly where you would eat; a day
// trip's lunch has none, because it happens wherever the trip is.
const rooftops = [11.9283, 79.8342]

export const meals = {
  white: { lunch: { name: 'Lunch in a White Town courtyard', cost: 800, at: [11.9347, 79.8353] }, dinner: { name: 'Dinner on a French Quarter rooftop', cost: 1200, at: rooftops } },
  tamil: { lunch: { name: 'Meals on a banana leaf near Mission Street', cost: 250, at: [11.9316, 79.8299] }, dinner: { name: 'Dosa, parotta and kaapi in the Tamil Quarter', cost: 300, at: [11.9354, 79.8272] } },
  north: { lunch: { name: 'Lunch at an Auroville café', cost: 600, at: [12.0022, 79.8138] }, dinner: { name: 'Wood-fired dinner on the Auroville road', cost: 900, at: [11.9835, 79.8362] } },
  south: { lunch: { name: 'Fish curry lunch near the boat house', cost: 500, at: [11.8872, 79.8068] }, dinner: { name: 'Seafood dinner back in town', cost: 1100, at: rooftops } },
  west: { lunch: { name: 'Lunch back in the Tamil Quarter', cost: 300, at: [11.9316, 79.8299] }, dinner: { name: 'Dinner in White Town', cost: 1000, at: rooftops } },
  far: { lunch: { name: 'Roadside lunch — carry snacks too', cost: 350 }, dinner: { name: 'Late dinner back in White Town', cost: 1000, at: rooftops } },
}

/* ------------------------------------------------------------ When to go */

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Long-run averages, rounded. Pondicherry's rain comes late, with the
// north-east monsoon in October to December.
export const climate = {
  high: [29, 30, 32, 34, 37, 37, 35, 35, 34, 32, 29, 28],
  rain: [20, 12, 10, 14, 48, 46, 84, 132, 124, 268, 352, 186],
  verdict: [
    { rating: 'Best', text: 'Cool mornings, dry days, clear sea. The best month to be here — and everyone knows it.' },
    { rating: 'Best', text: 'Still dry, a touch warmer, and the January crowds have gone home.' },
    { rating: 'Good', text: 'Getting hot by noon. Plan around long lunches and you will be fine.' },
    { rating: 'Warm', text: 'Properly hot. Walk at dawn, hide at midday, come out again at five.' },
    { rating: 'Hot', text: 'The hottest stretch of the year. Rooms are cheap; shade is priceless.' },
    { rating: 'Hot', text: 'Hot and humid with the odd evening thunderstorm. Good for surfing, hard for walking.' },
    { rating: 'Mixed', text: 'Showers break the heat. Auroville is green and the town is quiet.' },
    { rating: 'Mixed', text: 'Warm, with rain most weeks. Carry an umbrella and keep plans loose.' },
    { rating: 'Mixed', text: 'Similar to August, with better sunsets after the afternoon rain.' },
    { rating: 'Wet', text: 'The monsoon proper arrives. Moody, dramatic, and frequently soaked.' },
    { rating: 'Wet', text: 'The wettest month. Boats to Paradise Beach often stop; cafés do not.' },
    { rating: 'Good', text: 'Rain eases, the air cools, and the town dresses up for Christmas.' },
  ],
}

/* ---------------------------------------------------------------- Budget */

export const stays = [
  { id: 'hostel', label: 'Hostel or homestay', perRoom: 1100 },
  { id: 'guesthouse', label: 'Ashram guesthouse or B&B', perRoom: 3200 },
  { id: 'heritage', label: 'Heritage hotel', perRoom: 8500 },
]

export const eats = [
  { id: 'tiffin', label: 'Tiffin rooms and messes', perDay: 500 },
  { id: 'cafes', label: 'Cafés and bistros', perDay: 1400 },
  { id: 'fine', label: 'The good restaurants', perDay: 2800 },
]

export const rides = [
  { id: 'cycle', label: 'Bicycle', perDay: 150, shared: 1 },
  { id: 'scooter', label: 'Scooter', perDay: 450, shared: 2 },
  { id: 'cab', label: 'Autos and cabs', perDay: 1100, shared: 4 },
]

export const routes = [
  { from: 'Chennai', how: 'East Coast Road', distance: '150 km', time: '3 – 3½ h', note: 'The scenic way, with the sea on your left. Buses leave every half hour; a cab is a comfortable half-day.' },
  { from: 'Bengaluru', how: 'Overnight bus or train', distance: '310 km', time: '6 – 7 h', note: 'Sleeper buses arrive around dawn — just in time for the Promenade.' },
  { from: 'By air', how: 'Fly to Chennai (MAA)', distance: '135 km', time: '3 h onward', note: 'Puducherry’s own airport has only a handful of flights. Chennai is the practical gateway.' },
]

export const tips = [
  { title: 'Rent a scooter', body: 'The town is small and flat, and Auroville is a twenty-minute ride. Carry your licence; you will be asked for it.' },
  { title: 'Plan around the heat', body: 'Walk at dawn and after four. Use the middle of the day for museums, lunch and a fan.' },
  { title: 'Mondays are quiet', body: 'The museum and several cafés take the day off. The beaches do not.' },
  { title: 'Book Auroville properly', body: 'The viewing point is easy. The inner chamber of the Matrimandir needs a visit in person a day or two ahead.' },
  { title: 'Respect the water', body: 'The sea is rough for most of the year. Swim where others are swimming, and never off the Promenade rocks.' },
  { title: 'Carry cash', body: 'Markets, autos and most small cafés prefer it. ATMs cluster around Mission Street.' },
]
