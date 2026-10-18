/* -------------------------------------------------------------------------
   Hero Architectural Doodle Art for Bonjour Pondy.
   Handcrafted, highly detailed, and consistent architectural vector illustration:
   - Curated landmarks with generous breathing room
   - Consistent stroke weights (1.2px / 1.4px dark slate) & unified palette
   - Meticulous micro-details: individual leaves, overlapping terracotta tiles,
     louvered French shutters, wrought-iron balconies, turned teak pillars
   ------------------------------------------------------------------------- */

const CX = 720
const CY = 2400
const R = 2040
const TOP = CY - R // y = 360 at the crest of the ocean arc

export const ink = '#1e242b'
export const white = '#ffffff'
export const cream = '#fffcf2'
export const ochre = '#e5ba45'
export const ochreDark = '#c99c26'
export const terracotta = '#c84b2c'
export const terracottaDark = '#8e2e16'
export const frenchTeal = '#246b5a'
export const frenchTealDark = '#15483c'
export const rosePink = '#e6988f'
export const gold = '#f5b000'
export const pink = '#ff5fa2'
export const teal = '#0b9c9c'
export const leaf = '#1e6f42'
export const leafLight = '#2ea85c'
export const leafDark = '#124727'

/* =========================================================================
   1. French Colonial Villa (White Town Hotel Particulier)
   Features authentic 2-story stucco facade, louvered persiennes shutters,
   filigree wrought-iron balconies, parapet balustrade, and cascading bougainvillea.
   ========================================================================= */
export const FrenchMansion = ({ wall = ochre, shutters = frenchTeal, width = 138, height = 118 }) => (
  <g>
    {/* Ground shadow */}
    <ellipse cx="0" cy="0" rx={width * 0.54} ry="4" fill="rgba(20, 25, 30, 0.2)" />

    {/* Main Facade */}
    <rect x={-width / 2} y={-height} width={width} height={height} fill={wall} stroke={ink} strokeWidth="1.3" />

    {/* Rusticated White Quoins (Corner Stones) */}
    {[-width / 2, width / 2 - 9].map((qx, i) => (
      <g key={`quoin-${i}`}>
        {[0, 15, 30, 45, 60, 75, 90, 105].map((qy) => (
          <rect
            key={qy}
            x={qx}
            y={-height + qy}
            width={qy % 30 === 0 ? 9 : 6.5}
            height="12"
            fill={cream}
            stroke={ink}
            strokeWidth="0.8"
          />
        ))}
      </g>
    ))}

    {/* Floor Dividing Stringcourse Cornice */}
    <rect x={-width / 2 - 4} y={-height * 0.52} width={width + 8} height="6.5" fill={cream} stroke={ink} strokeWidth="1" />
    <line x1={-width / 2 - 4} y1={-height * 0.52 + 4.5} x2={width / 2 + 4} y2={-height * 0.52 + 4.5} stroke="#dcd2be" strokeWidth="0.8" />

    {/* Top Classical Cornice & Dentils */}
    <rect x={-width / 2 - 6} y={-height - 8} width={width + 12} height="8" fill={cream} stroke={ink} strokeWidth="1" />
    {Array.from({ length: 15 }).map((_, di) => (
      <rect key={di} x={-width / 2 + 3 + di * 9} y={-height - 3} width="4.5" height="3" fill="#cfc4ab" />
    ))}

    {/* Roof Terrace Balustrade */}
    <rect x={-width / 2 - 2} y={-height - 18} width={width + 4} height="10" fill="none" stroke={ink} strokeWidth="1.2" />
    <rect x={-width / 2 - 3} y={-height - 19} width={width + 6} height="3" fill={cream} stroke={ink} strokeWidth="1" />
    {Array.from({ length: 13 }).map((_, bi) => (
      <rect key={bi} x={-width / 2 + 5 + bi * 10} y={-height - 16} width="3.2" height="6" fill={cream} stroke={ink} strokeWidth="0.8" rx="0.5" />
    ))}

    {/* Upper Floor French Windows with Louvered Shutters (Persiennes) */}
    {[-44, 0, 44].map((wx) => (
      <g key={`win-${wx}`}>
        {/* Recessed Window Opening */}
        <rect x={wx - 10} y={-height + 15} width="20" height="32" rx="1.5" fill="#1b2420" stroke={ink} strokeWidth="1" />
        {/* White Stucco Architrave Surround */}
        <rect x={wx - 12} y={-height + 13} width="24" height="36" rx="2" fill="none" stroke={cream} strokeWidth="2.2" />
        <rect x={wx - 14} y={-height + 11} width="28" height="3" fill={cream} stroke={ink} strokeWidth="0.8" />

        {/* Left Louvered Shutter */}
        <g transform={`translate(${wx - 18} ${-height + 15})`}>
          <rect x="0" y="0" width="8" height="32" rx="1" fill={shutters} stroke={ink} strokeWidth="0.9" />
          {[5, 9, 13, 17, 21, 25, 29].map((sy) => (
            <line key={sy} x1="1.2" y1={sy} x2="6.8" y2={sy - 0.8} stroke={frenchTealDark} strokeWidth="0.9" />
          ))}
        </g>
        {/* Right Louvered Shutter */}
        <g transform={`translate(${wx + 10} ${-height + 15})`}>
          <rect x="0" y="0" width="8" height="32" rx="1" fill={shutters} stroke={ink} strokeWidth="0.9" />
          {[5, 9, 13, 17, 21, 25, 29].map((sy) => (
            <line key={sy} x1="1.2" y1={sy - 0.8} x2="6.8" y2={sy} stroke={frenchTealDark} strokeWidth="0.9" />
          ))}
        </g>

        {/* Wrought Iron Filigree Balcony (Garde-corps en fer forgé) */}
        <rect x={wx - 13} y={-height + 34} width="26" height="13" fill="none" stroke={ink} strokeWidth="1.2" />
        <circle cx={wx - 7} cy={-height + 40.5} r="3" fill="none" stroke={ink} strokeWidth="0.8" />
        <circle cx={wx + 7} cy={-height + 40.5} r="3" fill="none" stroke={ink} strokeWidth="0.8" />
        <circle cx={wx} cy={-height + 40.5} r="3" fill="none" stroke={ink} strokeWidth="0.8" />
      </g>
    ))}

    {/* Ground Floor Central Arched Carriage Portico */}
    <g>
      <rect x="-16" y="-50" width="32" height="50" fill="#1b2420" stroke={ink} strokeWidth="1" />
      <path d="M-16 -34 A16 16 0 0 1 16 -34 L16 0 L-16 0 Z" fill="#24302a" />
      {/* Molded Arch Surround with Keystone */}
      <path d="M-18 -34 A18 18 0 0 1 18 -34 L18 0 L-18 0 Z" fill="none" stroke={cream} strokeWidth="3" />
      <rect x="-3" y="-53.5" width="6" height="5.5" fill={cream} stroke={ink} strokeWidth="0.8" />
      {/* Double Doors with Panels */}
      <rect x="-14" y="-32" width="13" height="32" fill={shutters} stroke={ink} strokeWidth="0.8" />
      <rect x="1" y="-32" width="13" height="32" fill={shutters} stroke={ink} strokeWidth="0.8" />
      {/* Fanlight transom */}
      <path d="M-13 -34 A13 13 0 0 1 13 -34 Z" fill="#ffe082" opacity="0.6" stroke={ink} strokeWidth="0.8" />
      <line x1="0" y1="-34" x2="0" y2="-47" stroke={ink} strokeWidth="0.9" />
      <line x1="0" y1="-34" x2="-9" y2="-43" stroke={ink} strokeWidth="0.9" />
      <line x1="0" y1="-34" x2="9" y2="-43" stroke={ink} strokeWidth="0.9" />
      {/* Brass Doorknobs */}
      <circle cx="-2" cy="-15" r="1.5" fill="#ffd700" stroke={ink} strokeWidth="0.5" />
      <circle cx="2" cy="-15" r="1.5" fill="#ffd700" stroke={ink} strokeWidth="0.5" />
    </g>

    {/* Ground Floor Flanking Windows with Flowerboxes */}
    {[-44, 44].map((gx) => (
      <g key={`g-win-${gx}`}>
        <rect x={gx - 10} y="-45" width="20" height="30" fill="#1b2420" stroke={ink} strokeWidth="0.9" />
        <rect x={gx - 12} y="-47" width="24" height="34" rx="1.5" fill="none" stroke={cream} strokeWidth="2" />
        {/* Shutters */}
        <rect x={gx - 17} y="-45" width="7" height="30" rx="1" fill={shutters} stroke={ink} strokeWidth="0.8" />
        <rect x={gx + 10} y="-45" width="7" height="30" rx="1" fill={shutters} stroke={ink} strokeWidth="0.8" />
        {/* Window box with blossoming bougainvillea */}
        <rect x={gx - 14} y="-17" width="28" height="6.5" rx="1" fill={cream} stroke={ink} strokeWidth="0.8" />
        <circle cx={gx - 9} cy="-18" r="3.2" fill="#e01662" />
        <circle cx={gx - 4} cy="-19" r="3.5" fill="#ff4081" />
        <circle cx={gx + 3} cy="-18" r="3.2" fill="#e01662" />
        <circle cx={gx + 8} cy="-19" r="3" fill="#ff4081" />
        <circle cx={gx} cy="-16" r="2.2" fill="#1e6f42" />
      </g>
    ))}

    {/* Cascading Magenta Bougainvillea Vine spilling over the parapet with individual leaves and petals */}
    <g transform={`translate(${width / 2 - 22} ${-height - 18})`}>
      <path d="M 0 0 Q 16 20 10 40 Q 5 54 14 70" fill="none" stroke="#245432" strokeWidth="2.2" strokeLinecap="round" />
      {/* Detailed Botanical Flower Clusters */}
      {[
        { x: -3, y: 5, r: 6, c: '#e01662' },
        { x: 7, y: 14, r: 7.5, c: '#c2185b' },
        { x: 15, y: 23, r: 7, c: '#e01662' },
        { x: 9, y: 34, r: 6.5, c: '#f06292' },
        { x: 13, y: 46, r: 6, c: '#c2185b' },
        { x: 6, y: 56, r: 5.5, c: '#e01662' },
        { x: 14, y: 68, r: 4.8, c: '#f06292' },
      ].map((b, bi) => (
        <g key={bi}>
          <circle cx={b.x} cy={b.y} r={b.r} fill={b.c} stroke={ink} strokeWidth="0.6" />
          <circle cx={b.x - 1} cy={b.y - 1} r={b.r * 0.45} fill="#ff80ab" />
        </g>
      ))}
      {/* Individual Leaves */}
      {[
        { x: 1, y: 20, rot: -25 },
        { x: 18, y: 36, rot: 35 },
        { x: 4, y: 48, rot: -20 },
        { x: 16, y: 60, rot: 30 },
      ].map((lf, li) => (
        <path
          key={li}
          d={`M ${lf.x} ${lf.y} C ${lf.x + 6} ${lf.y - 4} ${lf.x + 8} ${lf.y + 4} ${lf.x} ${lf.y + 6} C ${lf.x - 4} ${lf.y + 4} ${lf.x - 4} ${lf.y - 2} ${lf.x} ${lf.y} Z`}
          fill="#2e7d32"
          stroke={ink}
          strokeWidth="0.6"
          transform={`rotate(${lf.rot} ${lf.x} ${lf.y})`}
        />
      ))}
    </g>
  </g>
)

/* =========================================================================
   2. Traditional Tamil Heritage Illam (Vysial / Chettiar Street)
   Features sloping Mangalore terracotta tiled roof, carved teak wooden rafters,
   stone thinnai plinth veranda, turned teak pillars, and brass-studded door.
   ========================================================================= */
export const TamilIllam = ({ width = 126, height = 98 }) => (
  <g>
    {/* Ground shadow */}
    <ellipse cx="0" cy="0" rx={width * 0.54} ry="4" fill="rgba(20, 25, 30, 0.2)" />

    {/* Sloping Mangalore Terracotta Tile Roof */}
    <path
      d={`M ${-width / 2 - 14} -52 L ${-width / 2 + 10} ${-height} L ${width / 2 - 10} ${-height} L ${width / 2 + 14} -52 Z`}
      fill={terracotta}
      stroke={ink}
      strokeWidth="1.3"
    />
    {/* Overlapping Clay Tile Grooves with authentic ridge shadows */}
    {Array.from({ length: 16 }).map((_, ti) => {
      const topX = -width / 2 + 14 + ti * 6.2
      const botX = -width / 2 - 11 + ti * 9.6
      return (
        <g key={ti}>
          <line x1={topX} y1={-height} x2={botX} y2="-52" stroke={terracottaDark} strokeWidth="1.6" />
          <line x1={topX + 0.8} y1={-height} x2={botX + 0.8} y2="-52" stroke="#e07255" strokeWidth="0.8" opacity="0.7" />
        </g>
      )
    })}

    {/* Clay Ridge Cresting Tiles along the Roof Peak */}
    <rect x={-width / 2 + 8} y={-height - 4} width={width - 16} height="5" rx="1.5" fill="#e05834" stroke={ink} strokeWidth="1" />
    {Array.from({ length: 14 }).map((_, ri) => (
      <circle key={ri} cx={-width / 2 + 12 + ri * 7.5} cy={-height - 2} r="2" fill="#ba3f1d" />
    ))}

    {/* Carved Exposed Wooden Rafter Tails under the Eaves */}
    <rect x={-width / 2 - 16} y="-52" width={width + 32} height="5.5" fill="#4a2e1b" stroke={ink} strokeWidth="1" />
    {Array.from({ length: 18 }).map((_, ri) => (
      <rect key={ri} x={-width / 2 - 14 + ri * 8.6} y="-52" width="3" height="5.5" fill="#2a180c" />
    ))}

    {/* Main Wall beneath the Veranda */}
    <rect x={-width / 2} y="-52" width={width} height="40" fill="#f6efe4" stroke={ink} strokeWidth="1" />

    {/* Raised Stone Thinnai Veranda Plinth */}
    <rect x={-width / 2 - 4} y="-14" width={width + 8} height="14" fill="#dcd1c2" stroke={ink} strokeWidth="1" />
    {/* Thinnai Smooth Stone Bench Top */}
    <rect x={-width / 2 - 6} y="-16" width={width + 12} height="4" fill="#756d63" stroke={ink} strokeWidth="0.8" />

    {/* Turned Teak Wooden Pillars (Thoon) with Carved Bracket Capitals */}
    {[-48, -24, 0, 24, 48].map((cx) => (
      <g key={`thoon-${cx}`}>
        {/* Stone base */}
        <rect x={cx - 4.5} y="-15" width="9" height="3" fill="#524d45" stroke={ink} strokeWidth="0.7" />
        {/* Turned teak column shaft */}
        <rect x={cx - 3} y="-48" width="6" height="33" fill="#4d2f19" stroke={ink} strokeWidth="0.8" />
        <ellipse cx={cx} cy="-36" rx="4" ry="1.4" fill="#6d4425" stroke={ink} strokeWidth="0.6" />
        <ellipse cx={cx} cy="-24" rx="4" ry="1.4" fill="#6d4425" stroke={ink} strokeWidth="0.6" />
        {/* Carved bracket capital */}
        <path d={`M${cx - 7} -48 L${cx + 7} -48 L${cx + 4} -44 L${cx - 4} -44 Z`} fill="#36200f" stroke={ink} strokeWidth="0.8" />
        <rect x={cx - 8} y="-51" width="16" height="3" fill="#2a180c" stroke={ink} strokeWidth="0.8" />
      </g>
    ))}

    {/* Burma Teak Double Doors with Brass Studs */}
    <g>
      <rect x="-16" y="-48" width="32" height="34" fill="#301c0f" stroke={ink} strokeWidth="1.2" />
      <path d="M-18 -48 L18 -48 L15 -44 L-15 -44 Z" fill="#ffd54f" stroke={ink} strokeWidth="0.8" />
      {/* Left Leaf */}
      <rect x="-14" y="-46" width="13" height="31" fill="#4d2f19" stroke={ink} strokeWidth="0.8" />
      {/* Right Leaf */}
      <rect x="1" y="-46" width="13" height="31" fill="#4d2f19" stroke={ink} strokeWidth="0.8" />
      {/* Carved Panels */}
      <rect x="-12" y="-43" width="9" height="11" fill="#382110" stroke={ink} strokeWidth="0.5" />
      <rect x="-12" y="-28" width="9" height="11" fill="#382110" stroke={ink} strokeWidth="0.5" />
      <rect x="3" y="-43" width="9" height="11" fill="#382110" stroke={ink} strokeWidth="0.5" />
      <rect x="3" y="-28" width="9" height="11" fill="#382110" stroke={ink} strokeWidth="0.5" />
      {/* Brass Doorknobs & Studs */}
      <circle cx="-2" cy="-30" r="1.5" fill="#ffd700" stroke={ink} strokeWidth="0.5" />
      <circle cx="2" cy="-30" r="1.5" fill="#ffd700" stroke={ink} strokeWidth="0.5" />
      {[-40, -34, -22, -16].map((sy) => (
        <g key={sy}>
          <circle cx="-8" cy={sy} r="0.8" fill="#ffd700" />
          <circle cx="8" cy={sy} r="0.8" fill="#ffd700" />
        </g>
      ))}
    </g>

    {/* Potted Banana Palm on the Veranda */}
    <g transform="translate(-46 -15)">
      <path d="M-6 0 L6 0 L4.5 -9 L-4.5 -9 Z" fill="#d4af37" stroke={ink} strokeWidth="0.8" />
      {/* Broad Tropical Leaves with Center Vein */}
      <path d="M0 -9 Q -14 -22 -18 -18 Q -10 -14 0 -9" fill="#2d6a3f" stroke={ink} strokeWidth="0.7" />
      <line x1="0" y1="-9" x2="-16" y2="-17" stroke="#1b4d2c" strokeWidth="0.6" />
      <path d="M0 -9 Q 14 -24 20 -20 Q 12 -14 0 -9" fill="#388e3c" stroke={ink} strokeWidth="0.7" />
      <line x1="0" y1="-9" x2="18" y2="-19" stroke="#1b4d2c" strokeWidth="0.6" />
      <path d="M0 -9 Q -4 -30 2 -32 Q 4 -22 0 -9" fill="#4caf50" stroke={ink} strokeWidth="0.7" />
      <line x1="0" y1="-9" x2="1" y2="-30" stroke="#1b4d2c" strokeWidth="0.6" />
    </g>
  </g>
)

/* =========================================================================
   3. Old French Lighthouse (1836 Promenade)
   Features round tapering stone masonry tower, terracotta banding course,
   corbel modillions supporting the gallery, wrought-iron railing, and glass lantern.
   ========================================================================= */
export const OldLighthouse = () => (
  <g>
    {/* Ground shadow */}
    <ellipse cx="0" cy="0" rx="30" ry="4.5" fill="rgba(20, 25, 30, 0.2)" />

    {/* Stepped Ashlar Stone Plinth Courses */}
    <rect x="-24" y="-12" width="48" height="12" fill="#ded7ca" stroke={ink} strokeWidth="1.2" />
    <rect x="-21" y="-22" width="42" height="10" fill="#eae4d8" stroke={ink} strokeWidth="1" />
    {/* Arched Entry Doorway */}
    <path d="M-6 -2 A6 6 0 0 1 6 -2 L6 0 L-6 0 Z" fill="#222" stroke={ink} strokeWidth="0.8" />

    {/* Round Masonry Tower (Tapering) */}
    <path d="M-19 -22 L-13 -152 L13 -152 L19 -22 Z" fill="#fffdf7" stroke={ink} strokeWidth="1.3" />

    {/* Terracotta Banding Course */}
    <path d="M-17 -62 L-15.5 -86 L15.5 -86 L17 -62 Z" fill={terracotta} stroke={ink} strokeWidth="1" />

    {/* Slit Windows */}
    {[-42, -108, -132].map((wy) => (
      <rect key={wy} x="-2.5" y={wy} width="5" height="12" rx="1.5" fill="#1b2420" stroke={ink} strokeWidth="0.9" />
    ))}

    {/* Stone Cornice Corbel Ring supporting Gallery */}
    <rect x="-16" y="-156" width="32" height="4" fill="#ded7ca" stroke={ink} strokeWidth="1" />
    <rect x="-19" y="-163" width="38" height="7" fill="#eae4d8" stroke={ink} strokeWidth="1.1" />
    {/* Corbel brackets */}
    {[-14, -7, 0, 7, 14].map((bx) => (
      <polygon key={bx} points={`${bx - 2},-156 ${bx + 2},-156 ${bx},-152`} fill="#7d7465" stroke={ink} strokeWidth="0.6" />
    ))}

    {/* Wrought Iron Catwalk Gallery Railing */}
    <rect x="-18" y="-174" width="36" height="11" fill="none" stroke={ink} strokeWidth="1.3" />
    {[-14, -8, -2, 4, 10, 14].map((rx) => (
      <line key={rx} x1={rx} y1="-174" x2={rx} y2="-163" stroke={ink} strokeWidth="1" />
    ))}

    {/* Cylindrical Glass Lantern Room */}
    <rect x="-12" y="-192" width="24" height="20" fill="#fff9c4" stroke={ink} strokeWidth="1.3" />
    <line x1="-4" y1="-192" x2="-4" y2="-172" stroke={ink} strokeWidth="1" />
    <line x1="4" y1="-192" x2="4" y2="-172" stroke={ink} strokeWidth="1" />

    {/* Glowing Beacon Lamp */}
    <circle cx="0" cy="-182" r="7" fill="#ffd54f" opacity="0.8" />
    <circle cx="0" cy="-182" r="3.5" fill="#ffffff" stroke={ink} strokeWidth="0.6" />

    {/* Copper Cupola & Weather Vane */}
    <path d="M-13 -192 Q0 -214 13 -192 Z" fill={terracotta} stroke={ink} strokeWidth="1.2" />
    <circle cx="0" cy="-214" r="2.2" fill="#ffd700" stroke={ink} strokeWidth="0.6" />
    <line x1="0" y1="-214" x2="0" y2="-226" stroke={ink} strokeWidth="1.2" />
  </g>
)

/* =========================================================================
   4. Aayi Mandapam (Bharathi Park Greco-Roman Pavilion)
   Features stepped plinth, 4 fluted Ionic columns, pediment relief, and urn finial.
   ========================================================================= */
export const Pavilion = () => (
  <g>
    {/* Ground shadow */}
    <ellipse cx="0" cy="0" rx="46" ry="4" fill="rgba(20, 25, 30, 0.2)" />

    {/* Stepped Plinth Courses */}
    <rect x="-42" y="-7" width="84" height="7" fill="#e8e2d5" stroke={ink} strokeWidth="1.1" />
    <rect x="-38" y="-14" width="76" height="7" fill="#fffcf2" stroke={ink} strokeWidth="1" />

    {/* 4 Fluted Classical Columns */}
    {[-28, -9, 9, 28].map((px) => (
      <g key={`col-${px}`}>
        <rect x={px - 4} y="-16" width="8" height="2" fill="#fffcf2" stroke={ink} strokeWidth="0.7" />
        <rect x={px - 3} y="-72" width="6" height="56" fill="#fffcf2" stroke={ink} strokeWidth="1" />
        {/* Fluting lines */}
        <line x1={px - 1} y1="-70" x2={px - 1} y2="-18" stroke="#d5c7ad" strokeWidth="0.8" />
        <line x1={px + 1} y1="-70" x2={px + 1} y2="-18" stroke="#d5c7ad" strokeWidth="0.8" />
        {/* Ionic Capital */}
        <rect x={px - 4.5} y="-75" width="9" height="3" fill="#fffcf2" stroke={ink} strokeWidth="0.8" />
        <ellipse cx={px - 3.5} cy="-74" rx="2" ry="1.2" fill="#d5c7ad" />
        <ellipse cx={px + 3.5} cy="-74" rx="2" ry="1.2" fill="#d5c7ad" />
      </g>
    ))}

    {/* Central Archway */}
    <path d="M-12 -54 A12 12 0 0 1 12 -54 L12 -14 L-12 -14 Z" fill="#24302a" stroke={ink} strokeWidth="1" />

    {/* Classical Entablature & Pediment */}
    <rect x="-38" y="-81" width="76" height="6" fill="#fffcf2" stroke={ink} strokeWidth="1.1" />
    <path d="M-40 -81 L0 -105 L40 -81 Z" fill="#fffcf2" stroke={ink} strokeWidth="1.3" />
    {/* Pediment Relief Carving */}
    <circle cx="0" cy="-91" r="4.5" fill="#e8e2d5" stroke={ink} strokeWidth="0.8" />

    {/* Neoclassical Domed Urn Finial */}
    <ellipse cx="0" cy="-108" rx="4.5" ry="3.5" fill="#ffd700" stroke={ink} strokeWidth="0.8" />
    <line x1="0" y1="-105" x2="0" y2="-114" stroke={ink} strokeWidth="1.4" />
  </g>
)

/* =========================================================================
   5. Royal Coconut Palm (Detailed Botanical Model)
   Features curved trunk with natural bark rings, coconut cluster, and
   arching fronds with delicate individual pinnate leaflets.
   ========================================================================= */
export const Palm = ({ h = 135, lean = 8 }) => {
  const topY = -h
  const midX = lean * 0.65
  const topX = lean
  return (
    <g>
      {/* Ground shadow */}
      <ellipse cx="0" cy="0" rx="16" ry="3.5" fill="rgba(20, 25, 30, 0.2)" />

      {/* Textured Curved Trunk */}
      <path
        d={`M -5 0 Q ${midX - 3.5} ${topY * 0.5} ${topX - 2.8} ${topY} L ${topX + 2.8} ${topY} Q ${midX + 4.5} ${topY * 0.5} 5 0 Z`}
        fill="#5a3d24"
        stroke={ink}
        strokeWidth="1.1"
      />
      {/* Bark Ring Segments */}
      {[0.12, 0.24, 0.36, 0.48, 0.6, 0.72, 0.84].map((pct, i) => (
        <ellipse
          key={i}
          cx={midX * pct}
          cy={topY * pct}
          rx={4.8 - pct * 1.8}
          ry="1.4"
          fill="#3c2412"
          stroke={ink}
          strokeWidth="0.5"
        />
      ))}

      {/* Cluster of Coconuts at the Crown */}
      <circle cx={topX - 4.5} cy={topY + 4} r="4.5" fill="#362211" stroke={ink} strokeWidth="0.7" />
      <circle cx={topX + 3.5} cy={topY + 5} r="4.5" fill="#4a301a" stroke={ink} strokeWidth="0.7" />
      <circle cx={topX} cy={topY + 2.5} r="4.2" fill="#5c3818" stroke={ink} strokeWidth="0.7" />

      {/* Fronds with Individual Botanical Leaflets */}
      <g transform={`translate(${topX} ${topY})`}>
        {/* Back Fronds */}
        {[
          { angle: -145, len: 54, bend: -22, col: leafDark },
          { angle: -35, len: 54, bend: 22, col: leafDark },
          { angle: -90, len: 58, bend: 0, col: leaf },
        ].map((f, idx) => (
          <g key={`b-${idx}`} transform={`rotate(${f.angle})`}>
            {/* Main Rachis (Frond Stem) */}
            <path
              d={`M 0 0 Q ${f.bend * 0.6} ${-f.len * 0.5} ${f.bend} ${-f.len}`}
              fill="none"
              stroke={ink}
              strokeWidth="1.4"
            />
            {/* Individual Leaflets */}
            {[-10, -18, -26, -34, -42, -50].map((dist, k) => {
              const stemX = f.bend * (dist / -f.len)
              return (
                <g key={k}>
                  {/* Left leaflet */}
                  <line x1={stemX} y1={dist} x2={stemX - 11} y2={dist + 7} stroke={f.col} strokeWidth="2.2" strokeLinecap="round" />
                  <line x1={stemX} y1={dist} x2={stemX - 11} y2={dist + 7} stroke={ink} strokeWidth="0.6" strokeLinecap="round" />
                  {/* Right leaflet */}
                  <line x1={stemX} y1={dist} x2={stemX + 11} y2={dist + 7} stroke={f.col} strokeWidth="2.2" strokeLinecap="round" />
                  <line x1={stemX} y1={dist} x2={stemX + 11} y2={dist + 7} stroke={ink} strokeWidth="0.6" strokeLinecap="round" />
                </g>
              )
            })}
          </g>
        ))}

        {/* Front Sunlit Fronds */}
        {[
          { angle: -170, len: 60, bend: -26, col: leaf },
          { angle: -115, len: 56, bend: -15, col: leafLight },
          { angle: -65, len: 56, bend: 15, col: leafLight },
          { angle: -10, len: 60, bend: 26, col: leaf },
        ].map((f, idx) => (
          <g key={`f-${idx}`} transform={`rotate(${f.angle})`}>
            {/* Main Rachis */}
            <path
              d={`M 0 0 Q ${f.bend * 0.6} ${-f.len * 0.5} ${f.bend} ${-f.len}`}
              fill="none"
              stroke={ink}
              strokeWidth="1.5"
            />
            {/* Individual Leaflets */}
            {[-10, -18, -26, -34, -42, -50, -56].map((dist, k) => {
              const stemX = f.bend * (dist / -f.len)
              return (
                <g key={k}>
                  {/* Left leaflet */}
                  <line x1={stemX} y1={dist} x2={stemX - 13} y2={dist + 8} stroke={f.col} strokeWidth="2.4" strokeLinecap="round" />
                  <line x1={stemX} y1={dist} x2={stemX - 13} y2={dist + 8} stroke={ink} strokeWidth="0.6" strokeLinecap="round" />
                  {/* Right leaflet */}
                  <line x1={stemX} y1={dist} x2={stemX + 13} y2={dist + 8} stroke={f.col} strokeWidth="2.4" strokeLinecap="round" />
                  <line x1={stemX} y1={dist} x2={stemX + 13} y2={dist + 8} stroke={ink} strokeWidth="0.6" strokeLinecap="round" />
                </g>
              )
            })}
          </g>
        ))}

        {/* Tender Crown Shoot */}
        <circle cx="0" cy="0" r="3.5" fill="#76d275" stroke={ink} strokeWidth="0.7" />
      </g>
    </g>
  )
}

/* =========================================================================
   6. Samanea Rain Tree (Shady White Town Canopy with Silk Blossoms)
   Features twisting boughs, layered foliage composed of detailed overlapping
   leaf clusters, and delicate silk tree flower powder-puffs.
   ========================================================================= */
export const RainTree = ({ h = 110 }) => (
  <g>
    {/* Ground shadow */}
    <ellipse cx="0" cy="0" rx="38" ry="5" fill="rgba(20, 25, 30, 0.2)" />

    {/* Sculpted Mature Hardwood Trunk & Primary Boughs */}
    <path
      d={`M -7 0 Q -4 ${-h * 0.35} 0 ${-h * 0.62} Q 4 ${-h * 0.35} 7 0 Z`}
      fill="#4a301a"
      stroke={ink}
      strokeWidth="1.2"
    />
    <path
      d={`M 0 ${-h * 0.62} Q -16 ${-h * 0.78} -32 ${-h * 0.9} M 0 ${-h * 0.62} Q 16 ${-h * 0.78} 32 ${-h * 0.9} M 0 ${-h * 0.62} L 0 ${-h * 0.88}`}
      fill="none"
      stroke="#4a301a"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d={`M 0 ${-h * 0.62} Q -16 ${-h * 0.78} -32 ${-h * 0.9} M 0 ${-h * 0.62} Q 16 ${-h * 0.78} 32 ${-h * 0.9} M 0 ${-h * 0.62} L 0 ${-h * 0.88}`}
      fill="none"
      stroke={ink}
      strokeWidth="1.2"
      strokeLinecap="round"
    />

    {/* Layered Leaf Clouds with Outline Definition */}
    <ellipse cx="-28" cy={-h * 0.92} rx="34" ry="22" fill={leafDark} stroke={ink} strokeWidth="1.2" />
    <ellipse cx="28" cy={-h * 0.92} rx="34" ry="22" fill={leaf} stroke={ink} strokeWidth="1.2" />
    <ellipse cx="0" cy={-h * 1.04} rx="44" ry="26" fill="#2d8a54" stroke={ink} strokeWidth="1.2" />
    <ellipse cx="-12" cy={-h * 1.1} rx="30" ry="18" fill="#38a363" stroke={ink} strokeWidth="1.1" />
    <ellipse cx="14" cy={-h * 1.08} rx="26" ry="16" fill="#48be74" stroke={ink} strokeWidth="1.1" />

    {/* Clusters of Detailed Individual Leaves on Canopy */}
    {[
      { x: -32, y: -h * 0.88, rot: 15 },
      { x: -18, y: -h * 1.02, rot: -20 },
      { x: 4, y: -h * 1.18, rot: 10 },
      { x: 26, y: -h * 1.04, rot: 30 },
      { x: 34, y: -h * 0.88, rot: -15 },
      { x: -8, y: -h * 0.96, rot: 5 },
    ].map((cl, ci) => (
      <g key={ci} transform={`translate(${cl.x} ${cl.y}) rotate(${cl.rot})`}>
        <circle cx="-4" cy="-2" r="3" fill="#247545" stroke={ink} strokeWidth="0.5" />
        <circle cx="0" cy="-4" r="3.2" fill="#329658" stroke={ink} strokeWidth="0.5" />
        <circle cx="4" cy="-2" r="3" fill="#42b069" stroke={ink} strokeWidth="0.5" />
        <circle cx="0" cy="0" r="2.8" fill="#1b5a34" stroke={ink} strokeWidth="0.5" />
      </g>
    ))}

    {/* Silk-Tree Blossom Sprays (Delicate Pink Powder-puffs) */}
    {[
      { x: -22, y: -h * 0.95, r: 4.5 },
      { x: 18, y: -h * 0.9, r: 4.8 },
      { x: -4, y: -h * 1.12, r: 5 },
      { x: 14, y: -h * 1.15, r: 4.2 },
      { x: -16, y: -h * 1.2, r: 3.8 },
    ].map((fl, fi) => (
      <g key={fi}>
        <circle cx={fl.x} cy={fl.y} r={fl.r} fill="#e91e63" stroke={ink} strokeWidth="0.6" />
        <circle cx={fl.x + 1} cy={fl.y - 1} r={fl.r * 0.55} fill="#ff80ab" />
      </g>
    ))}
  </g>
)

/* =========================================================================
   7. Traditional Catamaran Sailboat on the Azure Horizon
   ========================================================================= */
export const Boat = () => (
  <g>
    {/* Wooden Hull with crisp outline */}
    <path d="M-30 0 L30 0 L22 14 L-22 14 Z" fill="#ffffff" stroke={ink} strokeWidth="1.3" />
    <path d="M-26 4 L26 4 L24 9 L-24 9 Z" fill="#ffd54f" stroke={ink} strokeWidth="0.7" />
    {/* Dual Canvas Sails with Seam Detail */}
    <path d="M-2 -6 L-2 -58 L28 -6 Z" fill="#fffdf7" stroke={ink} strokeWidth="1.2" />
    <line x1="8" y1="-22" x2="8" y2="-6" stroke="#e0d6c3" strokeWidth="0.8" />
    <line x1="18" y1="-12" x2="18" y2="-6" stroke="#e0d6c3" strokeWidth="0.8" />
    <path d="M-4 -6 L-4 -48 L-22 -6 Z" fill="#ffe082" stroke={ink} strokeWidth="1.1" />
    <line x1="-12" y1="-18" x2="-12" y2="-6" stroke="#d5c7ad" strokeWidth="0.8" />
    {/* Central Mast */}
    <rect x="-3" y="-60" width="2.5" height="60" fill="#2d2d2b" stroke={ink} strokeWidth="0.6" />
  </g>
)

/* =========================================================================
   Backward Compatibility Exports for Tile.jsx
   ========================================================================= */
export const Villa = ({ wall = cream, door = teal }) => (
  <FrenchMansion wall={wall} shutters={door} />
)

export const Church = () => (
  <g>
    <rect x="-42" y="-108" width="84" height="100" fill={rosePink} stroke={ink} strokeWidth="1.2" />
    <rect x="-36" y="-168" width="18" height="60" fill={rosePink} stroke={ink} strokeWidth="1" />
    <rect x="18" y="-168" width="18" height="60" fill={rosePink} stroke={ink} strokeWidth="1" />
    <path d="M-22 -108 L0 -138 L22 -108 Z" fill="#fff" stroke={ink} strokeWidth="1.2" />
    <circle cx="0" cy="-84" r="14" fill="#1b5e20" stroke={ink} strokeWidth="1.2" />
    <path d="M-14 -42 A14 14 0 0 1 14 -42 L14 0 L-14 0 Z" fill="#1c2420" stroke={ink} strokeWidth="1.2" />
  </g>
)

export const Shopfront = ({ wall = pink, stripe = terracotta, bloom = '#e0106f' }) => (
  <g>
    <rect x="-46" y="-78" width="92" height="78" fill={wall} stroke={ink} strokeWidth="1.2" />
    <path d="M-50 -78 L0 -96 L50 -78 Z" fill={stripe} stroke={ink} strokeWidth="1.2" />
    <rect x="-24" y="-48" width="48" height="48" rx="4" fill={ink} />
    <circle cx="0" cy="-68" r="8" fill={bloom} />
  </g>
)

/* =========================================================================
   Hero Skyline Scene Composition
   Curated, balanced rhythm of 6 iconic Pondicherry subjects across the gentle
   horizon curve, with generous breathing room and zero clutter.
   ========================================================================= */
const scene = [
  { a: -16.0, el: <RainTree h={108} />, s: 0.95 },
  { a: -10.5, el: <OldLighthouse />, s: 0.98 },
  { a: -4.8, el: <FrenchMansion wall={ochre} shutters={frenchTeal} />, s: 1.0 },
  { a: 0.8, el: <Palm h={142} lean={6} />, s: 1.0 },
  { a: 6.2, el: <TamilIllam width={124} height={96} />, s: 0.96 },
  { a: 11.6, el: <Pavilion />, s: 0.98 },
  { a: 16.5, el: <Palm h={120} lean={-7} />, s: 0.94 },
]

export default function Skyline({ className }) {
  return (
    <svg className={className} viewBox="0 0 1440 520" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {/* Handcrafted Architectural Landmarks */}
      {scene.map(({ a, el, s = 1 }, i) => (
        <g key={i} transform={`rotate(${a} ${CX} ${CY}) translate(${CX} ${TOP + 2}) scale(${s})`}>
          <g className="rise" style={{ animationDelay: `${120 + i * 50}ms` }}>
            {el}
          </g>
        </g>
      ))}

      {/* Gentle Azure Ocean Arc */}
      <circle cx={CX} cy={CY} r={R} fill="#0a58ca" />

      {/* Catamaran Sailboats Bobbing on the Ocean */}
      {[
        { a: -8.0, d: 68 },
        { a: 8.5, d: 76 },
      ].map(({ a, d }) => (
        <g key={a} transform={`rotate(${a} ${CX} ${CY}) translate(${CX} ${TOP + d})`}>
          <g className="bob" style={{ animationDelay: `${Math.round(a * -320)}ms` }}>
            <Boat />
          </g>
        </g>
      ))}

      {/* Elegant Ocean Ripple Waves */}
      {[
        { a: -13.5, d: 46, w: 72 },
        { a: -2.0, d: 110, w: 88 },
        { a: 4.5, d: 38, w: 64 },
        { a: 14.0, d: 62, w: 76 },
      ].map(({ a, d, w }) => (
        <path
          key={a}
          transform={`rotate(${a} ${CX} ${CY}) translate(${CX - w / 2} ${TOP + d})`}
          d={`M0 0 q${w / 8} -7 ${w / 4} 0 t${w / 4} 0 t${w / 4} 0 t${w / 4} 0`}
          fill="none"
          stroke={white}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.65"
        />
      ))}
    </svg>
  )
}
