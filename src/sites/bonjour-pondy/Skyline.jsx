/* -------------------------------------------------------------------------
   The hero illustration: a slice of the town standing on a huge blue circle,
   so the buildings fan out along the curve of the horizon. Each building is
   drawn upright at the top of the circle, then rotated into place about the
   circle's centre.
   ------------------------------------------------------------------------- */

const CX = 720
const CY = 2180
const R = 1820
const TOP = CY - R // y of the horizon at the centre

export const ink = '#1d1d1b'
export const white = '#ffffff'
export const cream = '#fff3c4'
export const pink = '#ff5fa2'
export const terracotta = '#e2502c'
export const teal = '#0b9c9c'
export const leaf = '#17854f'
export const gold = '#f5a300'

// Everything below is drawn with its base on y = 0 and centred on x = 0.

export const Lighthouse = () => (
  <g>
    <path d="M-22 0 L-13 -150 L13 -150 L22 0 Z" fill={white} />
    <path d="M-19 -50 L19 -50 L17 -84 L-17 -84 Z" fill={terracotta} />
    <rect x="-19" y="-162" width="38" height="12" fill={ink} />
    <rect x="-11" y="-190" width="22" height="28" fill={cream} />
    <path d="M-15 -190 L0 -212 L15 -190 Z" fill={terracotta} />
    <rect x="-4" y="-34" width="8" height="34" rx="4" fill={ink} />
  </g>
)

export const Villa = ({ wall = cream, trim = white, door = teal }) => (
  <g>
    <rect x="-64" y="-104" width="128" height="104" fill={wall} />
    <rect x="-70" y="-112" width="140" height="10" fill={trim} />
    <rect x="-70" y="-58" width="140" height="6" fill={trim} />
    {[-44, 0, 44].map((x) => (
      <g key={x}>
        <path d={`M${x - 11} -66 L${x - 11} -88 A11 11 0 0 1 ${x + 11} -88 L${x + 11} -66 Z`} fill={door} />
        <rect x={x - 14} y="-66" width="28" height="4" fill={trim} />
      </g>
    ))}
    {[-44, 44].map((x) => (
      <path key={x} d={`M${x - 11} 0 L${x - 11} -30 A11 11 0 0 1 ${x + 11} -30 L${x + 11} 0 Z`} fill={door} />
    ))}
    <path d="M-12 0 L-12 -36 A12 12 0 0 1 12 -36 L12 0 Z" fill={ink} />
    {[-64, -22, 22, 64].map((x) => (
      <rect key={x} x={x - 3} y="-104" width="6" height="104" fill={trim} />
    ))}
  </g>
)

export const Church = ({ wall = white }) => (
  <g>
    <rect x="-38" y="-96" width="76" height="96" fill={wall} />
    <path d="M-38 -96 L0 -134 L38 -96 Z" fill={terracotta} />
    {[-52, 52].map((x) => (
      <g key={x}>
        <rect x={x - 15} y="-150" width="30" height="150" fill={wall} />
        <path d={`M${x - 17} -150 L${x} -196 L${x + 17} -150 Z`} fill={terracotta} />
        <rect x={x - 1.5} y="-214" width="3" height="20" fill={ink} />
        <rect x={x - 7} y="-208" width="14" height="3" fill={ink} />
        <path d={`M${x - 6} -96 L${x - 6} -118 A6 6 0 0 1 ${x + 6} -118 L${x + 6} -96 Z`} fill={ink} />
      </g>
    ))}
    <circle cx="0" cy="-74" r="13" fill={teal} />
    <path d="M-11 0 L-11 -34 A11 11 0 0 1 11 -34 L11 0 Z" fill={ink} />
    <rect x="-67" y="-58" width="134" height="5" fill={terracotta} />
  </g>
)

export const Pavilion = () => (
  <g>
    <rect x="-48" y="-12" width="96" height="12" fill={white} />
    {[-38, -19, 0, 19, 38].map((x) => (
      <rect key={x} x={x - 3} y="-74" width="6" height="62" fill={white} />
    ))}
    <rect x="-46" y="-84" width="92" height="10" fill={white} />
    <path d="M-30 -84 A30 30 0 0 1 30 -84 Z" fill={cream} />
    <rect x="-1.5" y="-126" width="3" height="14" fill={ink} />
    <rect x="-5" y="-60" width="10" height="48" rx="5" fill={ink} />
  </g>
)

export const Sphere = () => (
  <g>
    {[-58, -34, 34, 58].map((x) => (
      <path key={x} d={`M${x - 16} 0 Q${x} -34 ${x + 16} 0 Z`} fill={terracotta} />
    ))}
    <ellipse cx="0" cy="-58" rx="62" ry="54" fill={gold} />
    {[-36, -12, 12, 36].map((x) => (
      <ellipse key={x} cx={x} cy="-58" rx="5" ry="48" fill="none" stroke={ink} strokeOpacity="0.16" strokeWidth="2" />
    ))}
    <ellipse cx="-20" cy="-80" rx="16" ry="10" fill={white} opacity="0.4" />
  </g>
)

export const Palm = ({ h = 120 }) => (
  <g>
    <path d={`M-3 0 Q6 ${-h / 2} 0 ${-h}`} fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round" />
    {[-150, -115, -65, -30, 205, 240].map((a) => (
      <path
        key={a}
        d="M0 0 Q26 -16 52 4"
        fill="none"
        stroke={leaf}
        strokeWidth="9"
        strokeLinecap="round"
        transform={`translate(0 ${-h}) rotate(${a})`}
      />
    ))}
  </g>
)

export const Shopfront = ({ wall = pink, stripe = terracotta, bloom = '#e0106f' }) => (
  <g>
    <rect x="-46" y="-78" width="92" height="78" fill={wall} />
    <rect x="-52" y="-86" width="104" height="10" fill={white} />
    <path d="M-52 -50 L52 -50 L44 -34 L-44 -34 Z" fill={white} />
    {[-33, -11, 11, 33].map((x) => (
      <path key={x} d={`M${x - 11} -50 L${x + 11} -50 L${x + 9.3} -34 L${x - 9.3} -34 Z`} fill={x % 22 ? stripe : white} />
    ))}
    <rect x="-34" y="-28" width="28" height="28" fill={ink} />
    <rect x="6" y="-28" width="28" height="18" fill={cream} />
    <circle cx="-40" cy="-92" r="13" fill={bloom} />
    <circle cx="-22" cy="-98" r="10" fill={bloom} />
  </g>
)

export const Boat = () => (
  <g>
    <path d="M-30 0 L30 0 L20 14 L-22 14 Z" fill={white} />
    <path d="M-2 -4 L-2 -50 L24 -4 Z" fill={cream} />
    <rect x="-3.5" y="-52" width="3" height="52" fill={ink} />
  </g>
)

// angle in degrees along the horizon; 0 is the centre of the page.
const scene = [
  { a: -20.5, el: <Palm h={130} /> },
  { a: -17.4, el: <Villa wall={white} trim={cream} door={terracotta} />, s: 0.92 },
  { a: -13.1, el: <Lighthouse /> },
  { a: -10.9, el: <Palm h={96} /> },
  { a: -7.6, el: <Villa /> },
  { a: -3.2, el: <Shopfront /> },
  { a: 0.6, el: <Church />, s: 1.04 },
  { a: 4.4, el: <Palm h={112} /> },
  { a: 7.2, el: <Pavilion /> },
  { a: 10.9, el: <Villa wall={pink} trim={white} door={ink} />, s: 0.94 },
  { a: 14.6, el: <Palm h={124} /> },
  { a: 17.8, el: <Sphere />, s: 0.9 },
  { a: 21.2, el: <Palm h={92} /> },
]

export default function Skyline({ className }) {
  return (
    <svg className={className} viewBox="0 0 1440 520" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {scene.map(({ a, el, s = 1 }, i) => (
        <g key={i} transform={`rotate(${a} ${CX} ${CY}) translate(${CX} ${TOP + 2}) scale(${s})`}>
          <g className="rise" style={{ animationDelay: `${120 + i * 45}ms` }}>
            {el}
          </g>
        </g>
      ))}

      <circle cx={CX} cy={CY} r={R} fill="#0a66ff" />

      {/* A few things on the water */}
      {[
        { a: -6.4, d: 62 },
        { a: 3.1, d: 96 },
        { a: 9.8, d: 54 },
      ].map(({ a, d }) => (
        <g key={a} transform={`rotate(${a} ${CX} ${CY}) translate(${CX} ${TOP + d})`}>
          <g className="bob" style={{ animationDelay: `${Math.round(a * -300)}ms` }}>
            <Boat />
          </g>
        </g>
      ))}
      {[
        { a: -12, d: 44, w: 70 },
        { a: -1.5, d: 132, w: 96 },
        { a: 6, d: 30, w: 60 },
        { a: 14.5, d: 84, w: 82 },
      ].map(({ a, d, w }) => (
        <path
          key={a}
          transform={`rotate(${a} ${CX} ${CY}) translate(${CX - w / 2} ${TOP + d})`}
          d={`M0 0 q${w / 8} -8 ${w / 4} 0 t${w / 4} 0 t${w / 4} 0 t${w / 4} 0`}
          fill="none"
          stroke={white}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
      ))}
    </svg>
  )
}
