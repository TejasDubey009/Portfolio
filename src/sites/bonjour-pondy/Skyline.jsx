/* -------------------------------------------------------------------------
   The hero illustration: an architectural panorama of Pondicherry standing
   on a huge blue circle, fanning out along the horizon curve.
   Features handcrafted, finished 2D architectural models:
   - French Colonial Hotel Particulier (White Town)
   - Traditional Tamil Heritage Illam (Tamil Quarter)
   - Old French Lighthouse (1836 Goubert Avenue)
   - Eglise de Notre Dame des Anges
   - Neoclassical Aayi Mandapam (Bharathi Park)
   - Matrimandir Golden Geodesic Dome (Auroville)
   - Royal Coconut Palms, Traveller's Palms, and Samanea Rain Trees
   ------------------------------------------------------------------------- */

const CX = 720
const CY = 2180
const R = 1820
const TOP = CY - R // y of the horizon at the centre

export const ink = '#1d1d1b'
export const white = '#ffffff'
export const cream = '#fff5d6'
export const ochre = '#e8be48'
export const terracotta = '#d94b28'
export const frenchTeal = '#1b7060'
export const rosePink = '#e6988f'
export const gold = '#f5b000'
export const pink = '#ff5fa2'
export const teal = '#0b9c9c'
export const leaf = '#17854f'

// 1. French Colonial Mansion (White Town Hotel Particulier)
export const FrenchMansion = ({ wall = ochre, shutters = frenchTeal, width = 132, height = 114 }) => (
  <g>
    {/* Base shadow */}
    <ellipse cx="0" cy="0" rx={width * 0.52} ry="4" fill="rgba(0,0,0,0.18)" />

    {/* Main Facade */}
    <rect x={-width / 2} y={-height} width={width} height={height} fill={wall} />

    {/* Rusticated White Quoins (Corner Stones) */}
    {[-width / 2, width / 2 - 8].map((qx, i) => (
      <g key={`quoin-${i}`}>
        {[0, 14, 28, 42, 56, 70, 84, 98].map((qy) => (
          <rect
            key={qy}
            x={qx}
            y={-height + qy}
            width={qy % 28 === 0 ? 10 : 7}
            height="11"
            fill="#fffcf2"
            stroke="#e0d4be"
            strokeWidth="0.6"
          />
        ))}
      </g>
    ))}

    {/* Floor Dividing Stringcourse Cornice */}
    <rect x={-width / 2 - 4} y={-height * 0.52} width={width + 8} height="7" fill="#fffcf2" stroke="#d5c7ad" strokeWidth="0.8" />
    <rect x={-width / 2 - 2} y={-height * 0.52 + 5} width={width + 4} height="2" fill="#c4b497" />

    {/* Top Classical Cornice & Parapet */}
    <rect x={-width / 2 - 6} y={-height - 10} width={width + 12} height="10" fill="#fffcf2" stroke="#d5c7ad" strokeWidth="0.8" />
    {/* Dentils under the cornice */}
    {Array.from({ length: 14 }).map((_, di) => (
      <rect key={di} x={-width / 2 + 3 + di * 9} y={-height - 3} width="4.5" height="3" fill="#c4b497" />
    ))}
    {/* Roof terrace balustrade */}
    <rect x={-width / 2 - 2} y={-height - 20} width={width + 4} height="10" fill="none" stroke="#fffcf2" strokeWidth="2" />
    {Array.from({ length: 13 }).map((_, bi) => (
      <rect key={bi} x={-width / 2 + 5 + bi * 9.5} y={-height - 18} width="3" height="7" fill="#fffcf2" rx="0.5" />
    ))}

    {/* Upper Floor French Windows with Louvered Shutters (Persiennes) & Iron Balconies */}
    {[-42, 0, 42].map((wx) => (
      <g key={`win-${wx}`}>
        {/* Recessed Window Opening */}
        <rect x={wx - 10} y={-height + 14} width="20" height="32" rx="1" fill="#1b2420" />
        <path d={`M${wx - 10} ${-height + 20} Q${wx} ${-height + 12} ${wx + 10} ${-height + 20}`} fill="#2f3b35" />
        {/* Stucco Surround */}
        <rect x={wx - 12} y={-height + 12} width="24" height="36" rx="2" fill="none" stroke="#fffcf2" strokeWidth="2" />
        <rect x={wx - 14} y={-height + 10} width="28" height="3" fill="#fffcf2" />

        {/* Louvered French Shutters (Open slightly ajar) */}
        {/* Left shutter */}
        <g transform={`translate(${wx - 17} ${-height + 14})`}>
          <rect x="0" y="0" width="8" height="32" rx="1" fill={shutters} stroke="#114f44" strokeWidth="0.7" />
          {[5, 9, 13, 17, 21, 25, 29].map((sy) => (
            <line key={sy} x1="1.5" y1={sy} x2="6.5" y2={sy - 1} stroke="#114f44" strokeWidth="0.8" />
          ))}
        </g>
        {/* Right shutter */}
        <g transform={`translate(${wx + 9} ${-height + 14})`}>
          <rect x="0" y="0" width="8" height="32" rx="1" fill={shutters} stroke="#114f44" strokeWidth="0.7" />
          {[5, 9, 13, 17, 21, 25, 29].map((sy) => (
            <line key={sy} x1="1.5" y1={sy - 1} x2="6.5" y2={sy} stroke="#114f44" strokeWidth="0.8" />
          ))}
        </g>

        {/* Wrought Iron Filigree Balcony (Garde-corps en fer forge) */}
        <rect x={wx - 13} y={-height + 34} width="26" height="13" fill="none" stroke="#222" strokeWidth="1.2" />
        {/* Balcony scrollwork pattern */}
        <circle cx={wx - 7} cy={-height + 40} r="3" fill="none" stroke="#222" strokeWidth="0.8" />
        <circle cx={wx + 7} cy={-height + 40} r="3" fill="none" stroke="#222" strokeWidth="0.8" />
        <circle cx={wx} cy={-height + 40} r="3" fill="none" stroke="#222" strokeWidth="0.8" />
      </g>
    ))}

    {/* Ground Floor Arched Entrance & Side Windows */}
    {/* Central Arched Portico */}
    <g>
      <rect x="-15" y="-48" width="30" height="48" fill="#1b2420" />
      <path d="M-15 -32 A15 15 0 0 1 15 -32 L15 0 L-15 0 Z" fill="#24302a" />
      {/* Classical Arch Surround with Keystone */}
      <path d="M-17 -32 A17 17 0 0 1 17 -32 L17 0 L-17 0 Z" fill="none" stroke="#fffcf2" strokeWidth="3" />
      <rect x="-3" y="-51" width="6" height="6" fill="#fffcf2" stroke="#d5c7ad" strokeWidth="0.6" />
      {/* Louvered Double Doors */}
      <rect x="-13" y="-30" width="12" height="30" fill={shutters} stroke="#114f44" strokeWidth="0.8" />
      <rect x="1" y="-30" width="12" height="30" fill={shutters} stroke="#114f44" strokeWidth="0.8" />
      {/* Fanlight transom */}
      <path d="M-12 -32 A12 12 0 0 1 12 -32 Z" fill="#ffd54f" opacity="0.6" />
      <line x1="0" y1="-32" x2="0" y2="-44" stroke="#fffcf2" strokeWidth="1" />
      <line x1="0" y1="-32" x2="-8.5" y2="-40" stroke="#fffcf2" strokeWidth="1" />
      <line x1="0" y1="-32" x2="8.5" y2="-40" stroke="#fffcf2" strokeWidth="1" />
      {/* Polished Brass Doorknobs */}
      <circle cx="-2" cy="-14" r="1.4" fill="#ffd700" />
      <circle cx="2" cy="-14" r="1.4" fill="#ffd700" />
    </g>

    {/* Ground Floor Flanking Windows */}
    {[-42, 42].map((gx) => (
      <g key={`g-win-${gx}`}>
        <rect x={gx - 10} y="-44" width="20" height="30" fill="#1b2420" />
        <rect x={gx - 12} y="-46" width="24" height="34" rx="1.5" fill="none" stroke="#fffcf2" strokeWidth="2" />
        {/* Shutters */}
        <rect x={gx - 16} y="-44" width="7" height="30" rx="1" fill={shutters} stroke="#114f44" strokeWidth="0.7" />
        <rect x={gx + 9} y="-44" width="7" height="30" rx="1" fill={shutters} stroke="#114f44" strokeWidth="0.7" />
        {/* Window box with blooming flowers */}
        <rect x={gx - 13} y="-16" width="26" height="6" rx="1" fill="#fffcf2" stroke="#d5c7ad" strokeWidth="0.6" />
        <circle cx={gx - 8} cy="-17" r="3" fill="#e91e63" />
        <circle cx={gx - 3} cy="-18" r="3.2" fill="#ff4081" />
        <circle cx={gx + 3} cy="-17" r="3" fill="#f44336" />
        <circle cx={gx + 8} cy="-18" r="2.8" fill="#e91e63" />
      </g>
    ))}

    {/* Cascading Magenta Bougainvillea Vine spilling over the parapet */}
    <g transform={`translate(${width / 2 - 20} ${-height - 18})`}>
      <path d="M 0 0 Q 15 18 10 38 Q 6 52 14 68" fill="none" stroke="#2d6a3f" strokeWidth="2.5" strokeLinecap="round" />
      {/* Blossom clusters */}
      {[
        { x: -2, y: 4, r: 6, c: '#e01662' },
        { x: 6, y: 12, r: 7.5, c: '#c2185b' },
        { x: 14, y: 20, r: 7, c: '#e01662' },
        { x: 8, y: 30, r: 6.5, c: '#f06292' },
        { x: 12, y: 42, r: 6, c: '#c2185b' },
        { x: 6, y: 52, r: 5.5, c: '#e01662' },
        { x: 14, y: 64, r: 5, c: '#f06292' },
      ].map((b, bi) => (
        <circle key={bi} cx={b.x} cy={b.y} r={b.r} fill={b.c} />
      ))}
      {/* Leaf accents */}
      <circle cx="2" cy="18" r="3.2" fill="#2d6a3f" />
      <circle cx="16" cy="34" r="3" fill="#388e3c" />
      <circle cx="4" cy="46" r="2.8" fill="#2d6a3f" />
    </g>
  </g>
)

// 2. Tamil Heritage Illam (Chettiar / Vysial Street Mansion)
export const TamilIllam = ({ width = 124, height = 98 }) => (
  <g>
    {/* Base ground shadow */}
    <ellipse cx="0" cy="0" rx={width * 0.54} ry="4" fill="rgba(0,0,0,0.18)" />

    {/* Sloping Mangalore Terracotta Tile Roof */}
    <path
      d={`M ${-width / 2 - 14} -52 L ${-width / 2 + 10} ${-height} L ${width / 2 - 10} ${-height} L ${width / 2 + 14} -52 Z`}
      fill="#ba3f1d"
      stroke="#8a270c"
      strokeWidth="1.2"
    />
    {/* Overlapping clay tile ridges */}
    {Array.from({ length: 15 }).map((_, ti) => {
      const topX = -width / 2 + 16 + ti * 6.2
      const botX = -width / 2 - 10 + ti * 9.5
      return (
        <line
          key={ti}
          x1={topX}
          y1={-height}
          x2={botX}
          y2="-52"
          stroke="#8a270c"
          strokeWidth="1.4"
          strokeOpacity="0.8"
        />
      )
    })}
    {/* Roof ridge cresting */}
    <rect x={-width / 2 + 8} y={-height - 4} width={width - 16} height="5" rx="1.5" fill="#e05834" stroke="#8a270c" strokeWidth="0.8" />
    {/* Carved exposed wooden rafters under eaves */}
    <rect x={-width / 2 - 16} y="-52" width={width + 32} height="5" fill="#4a2e1b" />
    {Array.from({ length: 18 }).map((_, ri) => (
      <rect key={ri} x={-width / 2 - 14 + ri * 8.5} y="-52" width="3" height="5" fill="#2a180c" />
    ))}

    {/* Main wall beneath the veranda */}
    <rect x={-width / 2} y="-52" width={width} height="40" fill="#f5ede0" />

    {/* Raised Stone Thinnai Veranda Plinth */}
    <rect x={-width / 2 - 4} y="-14" width={width + 8} height="14" fill="#dcd1c2" stroke="#b5a794" strokeWidth="0.8" />
    {/* Thinnai smooth stone bench top */}
    <rect x={-width / 2 - 6} y="-16" width={width + 12} height="4" fill="#756d63" />

    {/* Turned Teak Wooden Columns (Thoon) with Carved Capitals */}
    {[-48, -24, 0, 24, 48].map((cx) => (
      <g key={`thoon-${cx}`}>
        {/* Column stone base */}
        <rect x={cx - 4.5} y="-15" width="9" height="3" fill="#524d45" />
        {/* Turned teak column shaft */}
        <rect x={cx - 3} y="-48" width="6" height="33" fill="#4d2f19" />
        <ellipse cx={cx} cy="-36" rx="4" ry="1.5" fill="#6d4425" />
        <ellipse cx={cx} cy="-24" rx="4" ry="1.5" fill="#6d4425" />
        {/* Carved double-bracket capital supporting the eaves */}
        <path d={`M${cx - 7} -48 L${cx + 7} -48 L${cx + 4} -44 L${cx - 4} -44 Z`} fill="#36200f" />
        <rect x={cx - 8} y="-51" width="16" height="3" fill="#2a180c" />
      </g>
    ))}

    {/* Stately Carved Burma Teak Double Doors */}
    <g>
      {/* Doorway frame */}
      <rect x="-16" y="-48" width="32" height="34" fill="#301c0f" stroke="#1d1008" strokeWidth="1" />
      <path d="M-18 -48 L18 -48 L15 -44 L-15 -44 Z" fill="#ffd54f" />
      {/* Left leaf */}
      <rect x="-14" y="-46" width="13" height="31" fill="#4d2f19" stroke="#2a180c" strokeWidth="0.7" />
      {/* Right leaf */}
      <rect x="1" y="-46" width="13" height="31" fill="#4d2f19" stroke="#2a180c" strokeWidth="0.7" />
      {/* Carved wooden panels */}
      <rect x="-12" y="-43" width="9" height="11" fill="#382110" />
      <rect x="-12" y="-28" width="9" height="11" fill="#382110" />
      <rect x="3" y="-43" width="9" height="11" fill="#382110" />
      <rect x="3" y="-28" width="9" height="11" fill="#382110" />
      {/* Polished brass doorknobs and studs */}
      <circle cx="-2" cy="-30" r="1.5" fill="#ffd700" />
      <circle cx="2" cy="-30" r="1.5" fill="#ffd700" />
    </g>

    {/* Potted Banana Palm on the Veranda */}
    <g transform="translate(-46 -15)">
      {/* Brass planter */}
      <path d="M-6 0 L6 0 L4.5 -9 L-4.5 -9 Z" fill="#d4af37" stroke="#997a15" strokeWidth="0.6" />
      {/* Broad tropical leaves */}
      <path d="M0 -9 Q -14 -22 -18 -18 Q -10 -14 0 -9" fill="#2d6a3f" />
      <path d="M0 -9 Q 14 -24 20 -20 Q 12 -14 0 -9" fill="#388e3c" />
      <path d="M0 -9 Q -4 -30 2 -32 Q 4 -22 0 -9" fill="#4caf50" />
    </g>
  </g>
)

// 3. Old French Lighthouse (1836 Promenade)
export const OldLighthouse = () => (
  <g>
    {/* Base shadow */}
    <ellipse cx="0" cy="0" rx="28" ry="4.5" fill="rgba(0,0,0,0.22)" />

    {/* Heavy Stone Ashlar Plinth Course */}
    <rect x="-24" y="-12" width="48" height="12" fill="#ded7ca" stroke="#b5aca0" strokeWidth="0.8" />
    <rect x="-21" y="-22" width="42" height="10" fill="#eae4d8" stroke="#b5aca0" strokeWidth="0.8" />
    {/* Arched entryway */}
    <path d="M-6 -2 A6 6 0 0 1 6 -2 L6 0 L-6 0 Z" fill="#222" />

    {/* Round Masonry Tower (Tapering with shading) */}
    <defs>
      <linearGradient id="lh-shaft" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#d5d0c5" />
        <stop offset="35%" stopColor="#ffffff" />
        <stop offset="70%" stopColor="#f5f2eb" />
        <stop offset="100%" stopColor="#bfb8a8" />
      </linearGradient>
      <linearGradient id="lh-terracotta" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ba3f1d" />
        <stop offset="40%" stopColor="#e2532e" />
        <stop offset="100%" stopColor="#8a270c" />
      </linearGradient>
      <radialGradient id="beacon-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fff9c4" stopOpacity="1" />
        <stop offset="40%" stopColor="#ffd54f" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#ffb300" stopOpacity="0" />
      </radialGradient>
    </defs>

    <path d="M-19 -22 L-13 -152 L13 -152 L19 -22 Z" fill="url(#lh-shaft)" stroke="#b0a898" strokeWidth="0.8" />

    {/* Classic Terracotta Banding Course */}
    <path d="M-17 -62 L-15.5 -86 L15.5 -86 L17 -62 Z" fill="url(#lh-terracotta)" />
    {/* Slit Windows */}
    {[-42, -108, -132].map((wy) => (
      <rect key={wy} x="-2.5" y={wy} width="5" height="12" rx="1.5" fill="#1b2420" stroke="#fff" strokeWidth="0.8" />
    ))}

    {/* Stone Cornice Corbel Ring supporting Gallery */}
    <rect x="-16" y="-156" width="32" height="4" fill="#ded7ca" stroke="#a69d8f" strokeWidth="0.6" />
    <rect x="-19" y="-163" width="38" height="7" fill="#eae4d8" stroke="#a69d8f" strokeWidth="0.8" />
    {/* Corbel brackets */}
    {[-14, -7, 0, 7, 14].map((bx) => (
      <polygon key={bx} points={`${bx - 2},-156 ${bx + 2},-156 ${bx},-152`} fill="#7d7465" />
    ))}

    {/* Wrought Iron Catwalk Gallery Railing */}
    <rect x="-18" y="-174" width="36" height="11" fill="none" stroke="#222" strokeWidth="1.2" />
    {[-14, -8, -2, 4, 10, 14].map((rx) => (
      <line key={rx} x1={rx} y1="-174" x2={rx} y2="-163" stroke="#222" strokeWidth="1" />
    ))}

    {/* Cylindrical Glass Lantern Housing */}
    <rect x="-12" y="-192" width="24" height="20" fill="#fff9c4" stroke="#222" strokeWidth="1.2" />
    {/* Lantern glass panes */}
    <line x1="-4" y1="-192" x2="-4" y2="-172" stroke="#222" strokeWidth="0.9" />
    <line x1="4" y1="-192" x2="4" y2="-172" stroke="#222" strokeWidth="0.9" />
    {/* Glowing Beacon Lamp */}
    <circle cx="0" cy="-182" r="10" fill="url(#beacon-glow)" />
    <circle cx="0" cy="-182" r="3.5" fill="#fff" />

    {/* Hemispherical Copper Cupola & Lightning Rod */}
    <path d="M-13 -192 Q0 -214 13 -192 Z" fill="url(#lh-terracotta)" stroke="#222" strokeWidth="1" />
    <circle cx="0" cy="-214" r="2.2" fill="#ffd700" />
    <line x1="0" y1="-214" x2="0" y2="-226" stroke="#222" strokeWidth="1.2" />
  </g>
)

// 4. Eglise de Notre Dame des Anges (Neoclassical Church)
export const Church = () => (
  <g>
    {/* Ground shadow */}
    <ellipse cx="0" cy="0" rx="58" ry="4.5" fill="rgba(0,0,0,0.18)" />

    {/* Base Plinth */}
    <rect x="-48" y="-8" width="96" height="8" fill="#ded7ca" stroke="#b5aca0" strokeWidth="0.8" />

    {/* Main Facade in Pastel Rose Pink */}
    <rect x="-42" y="-108" width="84" height="100" fill={rosePink} />

    {/* Twin Bell Towers */}
    {[-36, 18].map((tx) => (
      <g key={`tower-${tx}`}>
        {/* Tower shaft */}
        <rect x={tx} y="-168" width="18" height="60" fill={rosePink} stroke="#fff" strokeWidth="1" />
        {/* Arched Belfry Opening */}
        <path d={`M${tx + 3} -136 A6 6 0 0 1 ${tx + 15} -136 L${tx + 15} -116 L${tx + 3} -116 Z`} fill="#1c2420" />
        {/* Hanging Bronze Bell */}
        <path d={`M${tx + 6} -128 Q${tx + 9} -132 ${tx + 12} -128 L${tx + 13} -121 L${tx + 5} -121 Z`} fill="#d4af37" />
        {/* Tower Classical Entablature & Urn Finial */}
        <rect x={tx - 2} y="-172" width="22" height="4" fill="#fff" />
        <rect x={tx} y="-178" width="18" height="6" fill="#fff" />
        <circle cx={tx + 9} cy="-182" r="2.8" fill="#ffd700" />
      </g>
    ))}

    {/* Central Classical Triangular Pediment */}
    <path d="M-22 -108 L0 -138 L22 -108 Z" fill="#fff" stroke="#d5c7ad" strokeWidth="1" />
    {/* Carved Cross Finial */}
    <rect x="-1.5" y="-154" width="3" height="16" fill="#ffd700" />
    <rect x="-6" y="-148" width="12" height="3" fill="#ffd700" />

    {/* Central Stained-Glass Rose Window */}
    <circle cx="0" cy="-84" r="14" fill="#1b5e20" stroke="#fff" strokeWidth="2" />
    <circle cx="0" cy="-84" r="8" fill="#0288d1" stroke="#ffd700" strokeWidth="1" />
    <circle cx="0" cy="-84" r="3" fill="#ffd700" />

    {/* Arched Portico Entryway */}
    <path d="M-14 -42 A14 14 0 0 1 14 -42 L14 0 L-14 0 Z" fill="#1c2420" />
    <path d="M-16 -42 A16 16 0 0 1 16 -42 L16 0 L-16 0 Z" fill="none" stroke="#fff" strokeWidth="2.5" />
    {/* Panelled wooden double doors */}
    <rect x="-12" y="-36" width="11" height="36" fill="#4a2e1b" />
    <rect x="1" y="-36" width="11" height="36" fill="#4a2e1b" />
  </g>
)

// 5. Aayi Mandapam (Bharathi Park Greco-Roman Pavilion)
export const Pavilion = () => (
  <g>
    {/* Base shadow */}
    <ellipse cx="0" cy="0" rx="46" ry="4" fill="rgba(0,0,0,0.18)" />

    {/* Stepped Plinth */}
    <rect x="-42" y="-7" width="84" height="7" fill="#e8e2d5" stroke="#b5aca0" strokeWidth="0.8" />
    <rect x="-38" y="-14" width="76" height="7" fill="#fffcf2" stroke="#b5aca0" strokeWidth="0.8" />

    {/* 4 Fluted Classical Columns */}
    {[-28, -9, 9, 28].map((px) => (
      <g key={`col-${px}`}>
        <rect x={px - 4} y="-16" width="8" height="2" fill="#fffcf2" />
        <rect x={px - 3} y="-72" width="6" height="56" fill="#fffcf2" stroke="#d5c7ad" strokeWidth="0.7" />
        {/* Fluting */}
        <line x1={px - 1} y1="-70" x2={px - 1} y2="-18" stroke="#d5c7ad" strokeWidth="0.8" />
        <line x1={px + 1} y1="-70" x2={px + 1} y2="-18" stroke="#d5c7ad" strokeWidth="0.8" />
        {/* Ionic/Corinthian Capital */}
        <rect x={px - 4.5} y="-75" width="9" height="3" fill="#fffcf2" />
        <ellipse cx={px - 3.5} cy="-74" rx="2" ry="1.2" fill="#d5c7ad" />
        <ellipse cx={px + 3.5} cy="-74" rx="2" ry="1.2" fill="#d5c7ad" />
      </g>
    ))}

    {/* Central Archway */}
    <path d="M-12 -54 A12 12 0 0 1 12 -54 L12 -14 L-12 -14 Z" fill="#24302a" />

    {/* Classical Entablature & Pediment */}
    <rect x="-38" y="-81" width="76" height="6" fill="#fffcf2" stroke="#d5c7ad" strokeWidth="0.8" />
    <path d="M-40 -81 L0 -105 L40 -81 Z" fill="#fffcf2" stroke="#d5c7ad" strokeWidth="1" />
    {/* Pediment Relief Carving */}
    <circle cx="0" cy="-91" r="4.5" fill="#e8e2d5" stroke="#c4b497" strokeWidth="0.8" />

    {/* Neoclassical Domed Urn Finial */}
    <ellipse cx="0" cy="-108" rx="4.5" ry="3.5" fill="#ffd700" />
    <line x1="0" y1="-105" x2="0" y2="-114" stroke="#ffd700" strokeWidth="1.5" />
  </g>
)

// 6. Matrimandir Golden Geodesic Sphere
export const Sphere = () => (
  <g>
    {/* Base shadow */}
    <ellipse cx="0" cy="0" rx="58" ry="5" fill="rgba(0,0,0,0.22)" />

    {/* White Marble Lotus Petals at the Base */}
    {[-44, -22, 0, 22, 44].map((lx) => (
      <path
        key={lx}
        d={`M${lx - 12} 0 Q${lx} -18 ${lx + 12} 0 Z`}
        fill="#ffffff"
        stroke="#d5e8d4"
        strokeWidth="1"
      />
    ))}

    {/* Golden Geodesic Faceted Sphere */}
    <defs>
      <radialGradient id="skyline-matri-gold" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#fff8b5" />
        <stop offset="30%" stopColor="#ffd54f" />
        <stop offset="70%" stopColor="#f57f17" />
        <stop offset="100%" stopColor="#9e4d00" />
      </radialGradient>
    </defs>

    <circle cx="0" cy="-60" r="48" fill="url(#skyline-matri-gold)" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.25))" />

    {/* Triangular/Hexagonal Geodesic Facets */}
    <circle cx="0" cy="-60" r="34" fill="none" stroke="#fff" strokeWidth="1" opacity="0.45" />
    <circle cx="0" cy="-60" r="18" fill="none" stroke="#fff" strokeWidth="1" opacity="0.6" />
    <circle cx="0" cy="-60" r="6" fill="#fff" opacity="0.9" />
    {[-24, 0, 24].map((fx) => (
      <circle key={fx} cx={fx} cy="-60" r="3" fill="#fff" opacity="0.8" />
    ))}
    {[-14, 14].map((fx) => (
      <g key={fx}>
        <circle cx={fx} cy="-78" r="2.8" fill="#fff" opacity="0.8" />
        <circle cx={fx} cy="-42" r="2.8" fill="#fff" opacity="0.8" />
      </g>
    ))}
  </g>
)

// 7. Royal Coconut Palm (Detailed Botanic Model)
export const Palm = ({ h = 130, lean = 8 }) => {
  const topY = -h
  const midX = lean * 0.65
  const topX = lean
  return (
    <g>
      {/* Ground contact shadow */}
      <ellipse cx="0" cy="0" rx="14" ry="3" fill="rgba(0,0,0,0.2)" />

      {/* Curved, Segmented Bark Trunk */}
      <path
        d={`M -5 0 Q ${midX - 3} ${topY * 0.5} ${topX - 2.8} ${topY} L ${topX + 2.8} ${topY} Q ${midX + 4.5} ${topY * 0.5} 5 0 Z`}
        fill="#5a3d24"
        stroke="#362211"
        strokeWidth="0.8"
      />
      {/* Bark relief rings */}
      {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((pct, i) => (
        <ellipse
          key={i}
          cx={midX * pct}
          cy={topY * pct}
          rx={4.8 - pct * 1.8}
          ry="1.4"
          fill="#362211"
        />
      ))}

      {/* Cluster of Coconuts at Crown */}
      <circle cx={topX - 4.5} cy={topY + 4} r="4.5" fill="#362211" />
      <circle cx={topX + 3.5} cy={topY + 5} r="4.5" fill="#4a301a" />
      <circle cx={topX} cy={topY + 2.5} r="4.2" fill="#6d4827" />

      {/* Multi-layered Cascading Fronds with Pinnae Leaflets */}
      <g transform={`translate(${topX} ${topY})`}>
        {/* Back Fronds (Dark Forest Green) */}
        {[
          { angle: -145, len: 52, bend: -22, col: '#145228' },
          { angle: -35, len: 52, bend: 22, col: '#145228' },
          { angle: -90, len: 56, bend: 0, col: '#1e6835' },
        ].map((f, idx) => (
          <g key={`b-${idx}`} transform={`rotate(${f.angle})`}>
            <path
              d={`M 0 0 Q ${f.bend * 0.6} ${-f.len * 0.5} ${f.bend} ${-f.len}`}
              fill="none"
              stroke={f.col}
              strokeWidth="5"
              strokeLinecap="round"
            />
            {[-12, -22, -32, -44].map((dist, k) => (
              <path
                key={k}
                d={`M ${f.bend * (dist / -f.len)} ${dist} L ${f.bend * (dist / -f.len) - 10} ${dist + 7} M ${f.bend * (dist / -f.len)} ${dist} L ${f.bend * (dist / -f.len) + 10} ${dist + 7}`}
                stroke={f.col}
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            ))}
          </g>
        ))}

        {/* Front Fronds (Vibrant Sunlit Emerald & Lime Green) */}
        {[
          { angle: -170, len: 58, bend: -26, col: '#228b45' },
          { angle: -115, len: 54, bend: -15, col: '#2ea85c' },
          { angle: -65, len: 54, bend: 15, col: '#2ea85c' },
          { angle: -10, len: 58, bend: 26, col: '#228b45' },
        ].map((f, idx) => (
          <g key={`f-${idx}`} transform={`rotate(${f.angle})`}>
            <path
              d={`M 0 0 Q ${f.bend * 0.6} ${-f.len * 0.5} ${f.bend} ${-f.len}`}
              fill="none"
              stroke={f.col}
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            {[-12, -22, -32, -44].map((dist, k) => (
              <path
                key={k}
                d={`M ${f.bend * (dist / -f.len)} ${dist} L ${f.bend * (dist / -f.len) - 12} ${dist + 8} M ${f.bend * (dist / -f.len)} ${dist} L ${f.bend * (dist / -f.len) + 12} ${dist + 8}`}
                stroke={f.col}
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            ))}
          </g>
        ))}
        {/* Tender crown shoot */}
        <circle cx="0" cy="0" r="3.5" fill="#76d275" />
      </g>
    </g>
  )
}

// 8. Samanea Rain Tree (Shady White Town Canopy with Bougainvillea)
export const RainTree = ({ h = 105 }) => (
  <g>
    {/* Ground shadow */}
    <ellipse cx="0" cy="0" rx="36" ry="5" fill="rgba(0,0,0,0.2)" />

    {/* Mature Textured Hardwood Trunk & Primary Boughs */}
    <path
      d={`M -7 0 Q -4 ${-h * 0.35} 0 ${-h * 0.62} Q 4 ${-h * 0.35} 7 0 Z`}
      fill="#4a301a"
      stroke="#2e1a0b"
      strokeWidth="1"
    />
    <path
      d={`M 0 ${-h * 0.62} Q -16 ${-h * 0.78} -32 ${-h * 0.9} M 0 ${-h * 0.62} Q 16 ${-h * 0.78} 32 ${-h * 0.9} M 0 ${-h * 0.62} L 0 ${-h * 0.88}`}
      fill="none"
      stroke="#4a301a"
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* Layered Umbrella Canopy Clouds */}
    <ellipse cx="-28" cy={-h * 0.92} rx="34" ry="22" fill="#145228" />
    <ellipse cx="28" cy={-h * 0.92} rx="34" ry="22" fill="#1b5e20" />
    <ellipse cx="0" cy={-h * 1.04} rx="44" ry="26" fill="#2e7d32" />
    <ellipse cx="-12" cy={-h * 1.1} rx="30" ry="18" fill="#43a047" />
    <ellipse cx="14" cy={-h * 1.08} rx="26" ry="16" fill="#4caf50" />

    {/* Silk-Tree Blossom Sprays */}
    {[
      { x: -22, y: -h * 0.95, r: 4 },
      { x: 18, y: -h * 0.9, r: 4.2 },
      { x: -4, y: -h * 1.12, r: 4.5 },
      { x: 12, y: -h * 1.15, r: 3.8 },
      { x: -16, y: -h * 1.18, r: 3.5 },
    ].map((fl, fi) => (
      <g key={fi}>
        <circle cx={fl.x} cy={fl.y} r={fl.r} fill="#e91e63" />
        <circle cx={fl.x + 1} cy={fl.y - 1} r={fl.r * 0.5} fill="#ff80ab" />
      </g>
    ))}
  </g>
)

// Heritage Colonial Villa export for Tile.jsx
export const Villa = ({ wall = cream, _trim = white, door = teal }) => (
  <FrenchMansion wall={wall} shutters={door} />
)

// Shopfront export for Tile.jsx
export const Shopfront = ({ wall = pink, stripe = terracotta, bloom = '#e0106f' }) => (
  <g>
    <rect x="-46" y="-78" width="92" height="78" fill={wall} />
    {[-38, -12, 14, 38].map((x) => (
      <rect key={x} x={x - 4} y="-78" width="8" height="78" fill={white} opacity="0.25" />
    ))}
    <path d="M-50 -78 L0 -96 L50 -78 Z" fill={stripe} />
    <rect x="-24" y="-48" width="48" height="48" rx="4" fill={ink} />
    <circle cx="0" cy="-68" r="8" fill={bloom} />
  </g>
)

// Traditional Catamaran Fishing Boat on the sea
export const Boat = () => (
  <g>
    <path d="M-32 0 L32 0 L24 16 L-24 16 Z" fill="#ffffff" stroke="#1d1d1b" strokeWidth="1.2" />
    {/* Blue and yellow hull stripe */}
    <path d="M-28 6 L28 6 L26 11 L-26 11 Z" fill="#ffd54f" />
    {/* Dual Triangular Sails */}
    <path d="M-2 -6 L-2 -58 L28 -6 Z" fill="#fff9c4" stroke="#d5c7ad" strokeWidth="0.8" />
    <path d="M-4 -6 L-4 -48 L-22 -6 Z" fill="#ffe082" stroke="#d5c7ad" strokeWidth="0.8" />
    <rect x="-3" y="-60" width="2.5" height="60" fill="#2d2d2b" />
  </g>
)

// Angle distribution across the horizon circle (0 is center of page)
const scene = [
  { a: -20.5, el: <Palm h={135} lean={-10} /> },
  { a: -17.2, el: <TamilIllam />, s: 0.94 },
  { a: -13.1, el: <OldLighthouse /> },
  { a: -10.5, el: <RainTree h={100} /> },
  { a: -6.8, el: <FrenchMansion wall={ochre} shutters={frenchTeal} /> },
  { a: -2.4, el: <TamilIllam width={118} height={92} />, s: 0.9 },
  { a: 1.8, el: <Church />, s: 1.05 },
  { a: 5.6, el: <Palm h={122} lean={6} /> },
  { a: 8.6, el: <Pavilion /> },
  { a: 12.2, el: <FrenchMansion wall="#f2e2bd" shutters="#2e7d32" />, s: 0.92 },
  { a: 15.6, el: <RainTree h={112} /> },
  { a: 18.6, el: <Sphere />, s: 0.92 },
  { a: 21.8, el: <Palm h={108} lean={-8} /> },
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

      {/* Ocean Horizon Circle */}
      <circle cx={CX} cy={CY} r={R} fill="#0a66ff" />

      {/* Boats and ocean ripples on the water */}
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

