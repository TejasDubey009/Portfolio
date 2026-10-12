import { Boat, Church, Palm, Pavilion, Shopfront, Villa, cream, gold, ink, leaf, pink, teal, terracotta, white } from './Skyline'

/* -------------------------------------------------------------------------
   A small drawing that stands in for a place we have no photograph of, in the
   same hand as the hero: flat shapes standing on the blue curve.
   ------------------------------------------------------------------------- */

const GROUND = 232

const Gopuram = () => (
  <g>
    <rect x="-58" y="-38" width="116" height="38" fill={cream} />
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} x={-48 + i * 8} y={-38 - (i + 1) * 26} width={96 - i * 16} height="24" fill={i % 2 ? gold : terracotta} />
    ))}
    <path d="M-16 -168 A16 14 0 0 1 16 -168 Z" fill={teal} />
    <rect x="-1.5" y="-194" width="3" height="14" fill={ink} />
    <path d="M-12 0 L-12 -24 A12 12 0 0 1 12 -24 L12 0 Z" fill={ink} />
  </g>
)

const Hills = () => (
  <g>
    <path d="M-190 0 Q-120 -150 -40 0 Z" fill={gold} />
    <path d="M-70 0 Q30 -210 130 0 Z" fill={terracotta} />
    <path d="M70 0 Q140 -120 210 0 Z" fill={gold} />
    <path d="M2 -106 h56 v-18 h-8 v8 h-8 v-8 h-8 v8 h-8 v-8 h-8 v8 h-8 v-8 h-8 Z" fill={white} />
    <rect x="24" y="-142" width="3" height="20" fill={ink} />
    <path d="M27 -142 l16 6 l-16 6 Z" fill={ink} />
  </g>
)

const Sun = ({ x = 310, y = 74, r = 30 }) => <circle cx={x} cy={y} r={r} fill={white} />

const Birds = () => (
  <g fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M96 88 q12 -12 22 0 q10 -12 22 0" />
    <path d="M168 58 q9 -9 16 0 q8 -9 16 0" />
    <path d="M214 104 q8 -8 14 0 q7 -8 14 0" />
  </g>
)

const Waves = ({ y }) => (
  <g fill="none" stroke={white} strokeWidth="4" strokeLinecap="round" opacity="0.65">
    <path d={`M60 ${y} q12 -9 24 0 t24 0 t24 0`} />
    <path d={`M250 ${y + 22} q12 -9 24 0 t24 0 t24 0`} />
    <path d={`M130 ${y + 44} q12 -9 24 0 t24 0`} />
  </g>
)

const scenes = {
  villa: (
    <>
      <g transform={`translate(182 ${GROUND}) scale(1.22)`}>
        <Villa />
      </g>
      <g transform={`translate(330 ${GROUND + 4})`}>
        <Palm h={132} />
      </g>
    </>
  ),
  ashram: (
    <>
      <g transform={`translate(64 ${GROUND + 6})`}>
        <Palm h={110} />
      </g>
      <g transform={`translate(214 ${GROUND}) scale(1.22)`}>
        <Villa wall="#e9e6df" trim={white} door={ink} />
      </g>
    </>
  ),
  church: (
    <>
      <g transform={`translate(196 ${GROUND}) scale(0.96)`}>
        <Church />
      </g>
      <g transform={`translate(338 ${GROUND + 6})`}>
        <Palm h={104} />
      </g>
    </>
  ),
  chapel: (
    <>
      <g transform={`translate(62 ${GROUND + 6})`}>
        <Palm h={122} />
      </g>
      <g transform={`translate(214 ${GROUND}) scale(0.96)`}>
        <Church wall="#ffc7dd" />
      </g>
    </>
  ),
  pavilion: (
    <>
      <g transform={`translate(62 ${GROUND + 6})`}>
        <Palm h={118} />
      </g>
      <g transform={`translate(200 ${GROUND}) scale(1.5)`}>
        <Pavilion />
      </g>
      <g transform={`translate(344 ${GROUND + 6})`}>
        <Palm h={96} />
      </g>
    </>
  ),
  temple: (
    <>
      <g transform={`translate(200 ${GROUND}) scale(1.08)`}>
        <Gopuram />
      </g>
      <g transform={`translate(330 ${GROUND + 4})`}>
        <Palm h={104} />
      </g>
    </>
  ),
  shop: (
    <>
      <g transform={`translate(190 ${GROUND}) scale(1.55)`}>
        <Shopfront />
      </g>
      <g transform={`translate(338 ${GROUND + 4})`}>
        <Palm h={126} />
      </g>
    </>
  ),
  market: (
    <>
      <g transform={`translate(128 ${GROUND}) scale(1.3)`}>
        <Shopfront wall={teal} stripe={gold} bloom={terracotta} />
      </g>
      <g transform={`translate(282 ${GROUND}) scale(1.3)`}>
        <Shopfront wall={terracotta} stripe={teal} bloom={gold} />
      </g>
    </>
  ),
  workshop: (
    <>
      <g transform={`translate(60 ${GROUND + 6})`}>
        <Palm h={114} />
      </g>
      <g transform={`translate(214 ${GROUND}) scale(1.55)`}>
        <Shopfront wall={white} stripe={teal} bloom={leaf} />
      </g>
    </>
  ),
  bakery: (
    <>
      <g transform={`translate(196 ${GROUND}) scale(1.55)`}>
        <Shopfront wall={leaf} stripe={gold} bloom={pink} />
      </g>
      <g transform={`translate(336 ${GROUND + 4})`}>
        <Palm h={110} />
      </g>
      <g transform={`translate(58 ${GROUND + 6})`}>
        <Palm h={84} />
      </g>
    </>
  ),
  grove: (
    <>
      <Sun x={308} y={70} />
      {[
        [84, 128],
        [152, 176],
        [226, 142],
        [300, 108],
      ].map(([x, h]) => (
        <g key={x} transform={`translate(${x} ${GROUND + 6})`}>
          <Palm h={h} />
        </g>
      ))}
    </>
  ),
  boat: (
    <>
      <Sun x={300} y={78} r={34} />
      <g transform="translate(176 196) scale(1.9)">
        <Boat />
      </g>
    </>
  ),
  lake: (
    <>
      <Sun x={318} y={66} r={26} />
      <Birds />
      <g transform="translate(52 190)">
        <Palm h={112} />
      </g>
    </>
  ),
  hills: (
    <>
      <Sun x={72} y={64} r={26} />
      <g transform={`translate(200 ${GROUND + 6})`}>
        <Hills />
      </g>
    </>
  ),
}

const byPlace = {
  ashram: 'ashram',
  museum: 'villa',
  bharathi: 'pavilion',
  manakula: 'temple',
  notredame: 'chapel',
  basilica: 'church',
  goubert: 'market',
  mission: 'shop',
  paper: 'workshop',
  botanical: 'grove',
  aurolunch: 'bakery',
  surf: 'boat',
  arikamedu: 'pavilion',
  ousteri: 'lake',
  gingee: 'hills',
}

const byCategory = { heritage: 'villa', beach: 'boat', food: 'shop', spirit: 'pavilion', nature: 'grove', shop: 'shop' }

// Scenes set on the water sit lower, with more sea in the frame.
const afloat = ['boat', 'lake']

export default function Tile({ place }) {
  const scene = byPlace[place.id] ?? byCategory[place.cats[0]]
  const water = afloat.includes(scene)
  const top = water ? 176 : GROUND

  return (
    <svg className="tile" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="300" fill="#ffd400" />
      {!water && scenes[scene]}
      <circle cx="200" cy={top + 900} r="900" fill="#0a66ff" />
      {water && scenes[scene]}
      {water && <Waves y={236} />}
    </svg>
  )
}
