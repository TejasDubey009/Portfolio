import { useEffect, useMemo, useRef, useState } from 'react'
import { usePrefersReducedMotion, useSize } from '../shared/hooks'
import { H, W, onMap, project } from './geo'
import { placeById } from './data'
import { Photo } from '../shared/img'

/* -------------------------------------------------------------------------
   Apple-Style 3D Cartographic Map of Puducherry (Pondicherry).
   Crafted with signature Apple Maps aesthetics:
   - Warm ivory terrain & pastel cyan ocean gradient
   - Crisp white road network with subtle casing
   - 3D extruded city blocks for White Town and Tamil Quarter
   - Handcrafted 3D architectural landmark models (Matrimandir, 1836 Lighthouse,
     Gandhi Memorial with Gingee pillars, Sacred Heart Basilica, Notre-Dame des Anges,
     Aayi Mandapam)
   - Stylized Apple Maps 3D gumdrop trees & coastal coconut palms
   - Floating frosted-glass Apple controls & interactive place preview card
   - Glowing animated route path with waypoint pins
   ------------------------------------------------------------------------- */

const at = (lat, lng) => {
  const p = project({ lat, lng })
  return `${p.x.toFixed(1)} ${p.y.toFixed(1)}`
}

// Shoreline from north to south
const COAST = [
  [12.02, 79.866],
  [11.987, 79.8492],
  [11.9697, 79.8466],
  [11.95, 79.8412],
  [11.9316, 79.8368],
  [11.915, 79.8322],
  [11.905, 79.8292],
  [11.886, 79.8262],
  [11.876, 79.824],
  [11.86, 79.819],
]

const BLEED = 2400
const first = project({ lat: COAST[0][0], lng: COAST[0][1] })
const last = project({ lat: COAST[COAST.length - 1][0], lng: COAST[COAST.length - 1][1] })
const coastPath = `M${COAST.map(([a, b]) => at(a, b)).join(' L')}`
const seaPath = `M${(first.x + 120).toFixed(1)} ${-BLEED} L${COAST.map(([a, b]) => at(a, b)).join(' L')} L${(last.x - 160).toFixed(1)} ${H + BLEED} L${W + BLEED} ${H + BLEED} L${W + BLEED} ${-BLEED} Z`

// Town bounding box
const town = (() => {
  const a = project({ lat: 11.9395, lng: 79.8205 })
  const b = project({ lat: 11.9245, lng: 79.8362 })
  return { x: a.x, y: a.y, w: b.x - a.x, h: b.y - a.y }
})()

const canalX = project({ lat: 0, lng: 79.8325 }).x
const auroville = project({ lat: 12.0069, lng: 79.8106 })
const ousteri = project({ lat: 11.9502, lng: 79.744 })
const botanical = project({ lat: 11.9296, lng: 79.8226 })
const park = project({ lat: 11.9331, lng: 79.8343 })
const pier = project({ lat: 11.9281, lng: 79.8357 })
const seafront = [
  [11.9392, 79.8378],
  [11.9316, 79.8362],
  [11.9248, 79.8343],
]

/* -------------------------------------------------------------------------
   3D Extruded City Blocks (Apple Maps Look Around style)
   Rendered with isometric/axonometric vertical depth:
   - Roof (top face): warm off-white / terracotta tint
   - South face: shaded wall
   - West face: deep shadow wall
   ------------------------------------------------------------------------- */
const CITY_BLOCKS_WHITE_TOWN = [
  // Block 1 (North-East: Rue Dumas / Romain Rolland)
  { x: 745, y: 572, w: 9.5, h: 12, height: 4.8 },
  { x: 757, y: 572, w: 8.5, h: 12, height: 5.2 },
  // Block 2 (Ashram precinct)
  { x: 745, y: 587, w: 9.5, h: 14, height: 6.0 },
  { x: 757, y: 587, w: 8.5, h: 14, height: 5.5 },
  // Block 3 (Museum / Bharathi Park perimeter)
  { x: 745, y: 604, w: 9.5, h: 12, height: 4.5 },
  { x: 757, y: 604, w: 8.5, h: 12, height: 5.0 },
  // Block 4 (Suffren / Cafes district)
  { x: 745, y: 628, w: 9.5, h: 14, height: 5.2 },
  { x: 757, y: 628, w: 8.5, h: 14, height: 5.8 },
  // Block 5 (Notre-Dame / Alliance Francaise)
  { x: 745, y: 645, w: 9.5, h: 13, height: 5.4 },
  { x: 757, y: 645, w: 8.5, h: 13, height: 4.8 },
  // Block 6 (South Boulevard colonial villas)
  { x: 745, y: 661, w: 9.5, h: 9.5, height: 4.2 },
  { x: 757, y: 661, w: 8.5, h: 9.5, height: 4.0 },
]

const CITY_BLOCKS_TAMIL_QUARTER = [
  // West grid lines: Vysial St, MG Road, Perumal Koil
  { x: 662, y: 574, w: 12, h: 14, height: 4.2 },
  { x: 677, y: 574, w: 12, h: 14, height: 4.0 },
  { x: 692, y: 574, w: 13, h: 14, height: 4.5 },
  { x: 708, y: 574, w: 13, h: 14, height: 4.2 },
  { x: 724, y: 574, w: 14, h: 14, height: 4.0 },

  { x: 662, y: 592, w: 12, h: 15, height: 4.6 },
  { x: 677, y: 592, w: 12, h: 15, height: 4.4 },
  { x: 692, y: 592, w: 13, h: 15, height: 4.8 },
  { x: 708, y: 592, w: 13, h: 15, height: 4.5 },
  { x: 724, y: 592, w: 14, h: 15, height: 4.2 },

  // Goubert Market district
  { x: 662, y: 611, w: 12, h: 15, height: 4.0 },
  { x: 677, y: 611, w: 12, h: 15, height: 4.2 },
  { x: 692, y: 611, w: 13, h: 15, height: 4.5 },
  { x: 708, y: 611, w: 13, h: 15, height: 4.8 },
  { x: 724, y: 611, w: 14, h: 15, height: 4.0 },

  // Mission Street shopping corridor
  { x: 662, y: 630, w: 12, h: 15, height: 4.5 },
  { x: 677, y: 630, w: 12, h: 15, height: 4.2 },
  { x: 692, y: 630, w: 13, h: 15, height: 4.6 },
  { x: 708, y: 630, w: 13, h: 15, height: 4.4 },
  { x: 724, y: 630, w: 14, h: 15, height: 4.2 },

  // South near Botanical Garden
  { x: 680, y: 649, w: 14, h: 13, height: 3.8 },
  { x: 697, y: 649, w: 15, h: 13, height: 4.0 },
  { x: 715, y: 649, w: 15, h: 13, height: 3.9 },
]

/* -------------------------------------------------------------------------
   3D Architectural Landmark Models (Apple Maps Style)
   Rendered with authentic architectural silhouettes, subtle shading,
   and dynamic upright tilt compensation.
   ------------------------------------------------------------------------- */
const LANDMARKS = [
  {
    id: 'matrimandir',
    point: { lat: 12.0069, lng: 79.8106 },
    name: 'Matrimandir Golden Dome',
    placeId: 'matrimandir',
    w: 52,
    h: 52,
    render: () => (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
        {/* Soft ground contact shadow */}
        <ellipse cx="26" cy="46" rx="23" ry="5.5" fill="rgba(30, 20, 10, 0.22)" filter="blur(1px)" />

        {/* 12 Radiating White Lotus Petal Pods */}
        <ellipse cx="26" cy="44" rx="22" ry="5.2" fill="#d9f2d5" />
        <path
          d="M 6 44 C 14 38, 38 38, 46 44 C 38 49, 14 49, 6 44 Z"
          fill="#ffffff"
          stroke="#d2dec8"
          strokeWidth="0.8"
        />

        {/* Golden Geodesic Sphere */}
        <defs>
          <radialGradient id="apple-matri-gold" cx="32%" cy="28%" r="68%">
            <stop offset="0%" stopColor="#fff8b5" />
            <stop offset="25%" stopColor="#ffd54f" />
            <stop offset="65%" stopColor="#f59e0b" />
            <stop offset="90%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </radialGradient>
        </defs>

        <circle
          cx="26"
          cy="26"
          r="19"
          fill="url(#apple-matri-gold)"
          filter="drop-shadow(0 4px 8px rgba(0,0,0,0.28))"
        />

        {/* Geodesic triangular faceting */}
        <circle cx="26" cy="26" r="13" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.45" />
        <circle cx="26" cy="26" r="7" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
        <circle cx="26" cy="26" r="2.8" fill="#ffffff" opacity="0.95" />
        <circle cx="19" cy="21" r="1.8" fill="#ffffff" opacity="0.8" />
        <circle cx="33" cy="21" r="1.8" fill="#ffffff" opacity="0.8" />
        <circle cx="21" cy="32" r="1.8" fill="#ffffff" opacity="0.7" />
        <circle cx="31" cy="32" r="1.8" fill="#ffffff" opacity="0.7" />

        {/* Golden Ambient Crown Aura */}
        <circle cx="26" cy="26" r="20.5" fill="none" stroke="#ffd54f" strokeWidth="0.6" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'lighthouse',
    point: { lat: 11.9328, lng: 79.8361 },
    name: 'Old Lighthouse (1836)',
    placeId: 'gandhi',
    w: 30,
    h: 58,
    render: () => (
      <svg width="30" height="58" viewBox="0 0 30 58" fill="none" aria-hidden="true">
        {/* Ground shadow */}
        <ellipse cx="15" cy="55" rx="11" ry="3" fill="rgba(20, 20, 20, 0.24)" filter="blur(1px)" />

        {/* Hexagonal Stone Plinth */}
        <rect x="5.5" y="51" width="19" height="4" rx="0.6" fill="#e8e2d4" stroke="#c0b8a8" strokeWidth="0.8" />
        <rect x="7" y="48" width="16" height="3.5" rx="0.5" fill="#f4ede0" stroke="#c8c0b0" strokeWidth="0.6" />

        {/* Fluted Masonry Tower Shaft */}
        <path d="M 8.5 48 L 10.5 19 L 19.5 19 L 21.5 48 Z" fill="#faf7f0" stroke="#cfc7b8" strokeWidth="0.8" />
        {/* Stone Belt Moldings */}
        <line x1="9.8" y1="38" x2="20.2" y2="38" stroke="#d8d0c2" strokeWidth="1" />
        <line x1="10.2" y1="28" x2="19.8" y2="28" stroke="#d8d0c2" strokeWidth="1" />
        {/* Arched service door at base */}
        <path d="M 13.5 48 L 13.5 43 Q 15 41.5 16.5 43 L 16.5 48 Z" fill="#4a3b32" />

        {/* Catwalk Gallery with Black Iron Railing */}
        <rect x="7" y="16.5" width="16" height="2.8" rx="0.6" fill="#2d2d2a" />
        <line x1="8" y1="16.5" x2="8" y2="14" stroke="#2d2d2a" strokeWidth="0.8" />
        <line x1="12" y1="16.5" x2="12" y2="14" stroke="#2d2d2a" strokeWidth="0.8" />
        <line x1="15" y1="16.5" x2="15" y2="14" stroke="#2d2d2a" strokeWidth="0.8" />
        <line x1="18" y1="16.5" x2="18" y2="14" stroke="#2d2d2a" strokeWidth="0.8" />
        <line x1="22" y1="16.5" x2="22" y2="14" stroke="#2d2d2a" strokeWidth="0.8" />
        <line x1="7.5" y1="14" x2="22.5" y2="14" stroke="#2d2d2a" strokeWidth="0.8" />

        {/* Glass Lantern Room & Golden Beacon */}
        <rect x="9.5" y="8" width="11" height="8.5" rx="0.5" fill="#fffbeb" stroke="#2d2d2a" strokeWidth="0.9" />
        <circle cx="15" cy="12" r="3" fill="#fbbf24" filter="drop-shadow(0 0 4px #fbbf24)" />
        <circle cx="15" cy="12" r="1.4" fill="#ffffff" />

        {/* Red Copper Dome Roof & Finial */}
        <path d="M 8.5 8 Q 15 1.5 21.5 8 Z" fill="#dc2626" stroke="#2d2d2a" strokeWidth="0.8" />
        <line x1="15" y1="1.5" x2="15" y2="-0.5" stroke="#2d2d2a" strokeWidth="0.9" />
        <circle cx="15" cy="-0.5" r="0.8" fill="#fbbf24" />
      </svg>
    ),
  },
  {
    id: 'gandhi',
    point: { lat: 11.9324, lng: 79.8358 },
    name: 'Mahatma Gandhi Memorial',
    placeId: 'gandhi',
    w: 46,
    h: 46,
    render: () => (
      <svg width="46" height="46" viewBox="0 0 46 46" fill="none" aria-hidden="true">
        {/* Granite Podium Shadow */}
        <ellipse cx="23" cy="43" rx="19" ry="3" fill="rgba(0,0,0,0.22)" filter="blur(1px)" />

        {/* Raised Granite Platform */}
        <polygon points="5,42 23,39 41,42 23,45" fill="#52525b" stroke="#27272a" strokeWidth="0.6" />
        <polygon points="11,40 23,38 35,40 23,42" fill="#71717a" />

        {/* 8 Monolithic Gingee Pillars encircling the statue */}
        {[-15, -10, -5, 0, 5, 10, 15].map((dx, i) => (
          <g key={i} transform={`translate(${23 + dx} 0)`}>
            <rect x="-1.2" y="16" width="2.4" height="23" fill="#e4e4e7" stroke="#71717a" strokeWidth="0.5" />
            <polygon points="-2.2,16 2.2,16 1.4,14 -1.4,14" fill="#d4d4d8" />
            <polygon points="-2.2,39 2.2,39 1.4,41 -1.4,41" fill="#71717a" />
          </g>
        ))}

        {/* Mahatma Gandhi Bronze Statue walking with staff */}
        <g transform="translate(23 18)">
          <ellipse cx="0" cy="18" rx="4" ry="1.2" fill="rgba(0,0,0,0.3)" />
          {/* Robe/Dhoti */}
          <path d="M -2.5 7 L 2.5 7 L 3 17 L -3 17 Z" fill="#27272a" />
          {/* Shawl over shoulder */}
          <path d="M -3 3 Q 0 4 3 3 L 2.5 9 L -2.5 9 Z" fill="#3f3f46" />
          {/* Head & round spectacles */}
          <circle cx="0" cy="0" r="2.8" fill="#27272a" />
          <circle cx="-0.8" cy="-0.2" r="0.8" fill="none" stroke="#fbbf24" strokeWidth="0.4" />
          <circle cx="0.8" cy="-0.2" r="0.8" fill="none" stroke="#fbbf24" strokeWidth="0.4" />
          {/* Walking stick / Staff */}
          <line x1="3.2" y1="-2" x2="3.8" y2="18" stroke="#18181b" strokeWidth="0.7" />
        </g>
      </svg>
    ),
  },
  {
    id: 'basilica',
    point: { lat: 11.9263, lng: 79.826 },
    name: 'Sacred Heart Basilica',
    placeId: 'basilica',
    w: 42,
    h: 52,
    render: () => (
      <svg width="42" height="52" viewBox="0 0 42 52" fill="none" aria-hidden="true">
        {/* Ground shadow */}
        <ellipse cx="21" cy="49" rx="18" ry="3" fill="rgba(0,0,0,0.22)" filter="blur(1px)" />

        {/* Main Central Nave */}
        <rect x="6" y="21" width="30" height="27" fill="#faf7f0" stroke="#b91c1c" strokeWidth="1" />
        {/* Red Brick Quoins and Horizontal Gothic Belt */}
        <rect x="6" y="32" width="30" height="2.5" fill="#dc2626" />
        <rect x="6" y="21" width="30" height="2" fill="#b91c1c" />

        {/* Central Gothic Rose Window */}
        <circle cx="21" cy="27" r="4.8" fill="#1d4ed8" stroke="#f59e0b" strokeWidth="0.8" />
        <circle cx="21" cy="27" r="2.2" fill="#ef4444" />
        <path d="M 21 22.2 L 21 31.8 M 16.2 27 L 25.8 27" stroke="#f59e0b" strokeWidth="0.6" />

        {/* Gothic Arched Entrance Doorway */}
        <path d="M 17 48 L 17 38 Q 21 34 25 38 L 25 48 Z" fill="#7f1d1d" stroke="#b91c1c" strokeWidth="0.8" />

        {/* Left Soaring Gothic Bell Tower & Spire */}
        <rect x="4" y="10" width="9" height="38" fill="#faf7f0" stroke="#b91c1c" strokeWidth="0.8" />
        <polygon points="4,10 8.5,0.5 13,10" fill="#dc2626" stroke="#991b1b" strokeWidth="0.8" />
        <line x1="8.5" y1="0.5" x2="8.5" y2="-2" stroke="#dc2626" strokeWidth="0.8" />
        <line x1="7.2" y1="-1" x2="9.8" y2="-1" stroke="#dc2626" strokeWidth="0.7" />
        {/* Belfry louver window */}
        <rect x="6.5" y="14" width="4" height="6" rx="1.5" fill="#450a0a" />

        {/* Right Soaring Gothic Bell Tower & Spire */}
        <rect x="29" y="10" width="9" height="38" fill="#faf7f0" stroke="#b91c1c" strokeWidth="0.8" />
        <polygon points="29,10 33.5,0.5 38,10" fill="#dc2626" stroke="#991b1b" strokeWidth="0.8" />
        <line x1="33.5" y1="0.5" x2="33.5" y2="-2" stroke="#dc2626" strokeWidth="0.8" />
        <line x1="32.2" y1="-1" x2="34.8" y2="-1" stroke="#dc2626" strokeWidth="0.7" />
        {/* Belfry louver window */}
        <rect x="31.5" y="14" width="4" height="6" rx="1.5" fill="#450a0a" />
      </svg>
    ),
  },
  {
    id: 'notredame',
    point: { lat: 11.9291, lng: 79.8352 },
    name: 'Notre-Dame des Anges',
    placeId: 'notredame',
    w: 40,
    h: 46,
    render: () => (
      <svg width="40" height="46" viewBox="0 0 40 46" fill="none" aria-hidden="true">
        {/* Ground shadow */}
        <ellipse cx="20" cy="43" rx="16" ry="3" fill="rgba(0,0,0,0.2)" filter="blur(1px)" />

        {/* Main Central Neoclassical Facade in Limestone Rose-Pink */}
        <rect x="7" y="15" width="26" height="28" fill="#fca5a5" stroke="#e17070" strokeWidth="0.8" />
        <rect x="8" y="24" width="24" height="1.8" fill="#ffffff" />

        {/* Corinthian Pilasters */}
        <line x1="10" y1="15" x2="10" y2="43" stroke="#ffffff" strokeWidth="1.2" />
        <line x1="16" y1="15" x2="16" y2="43" stroke="#ffffff" strokeWidth="1.2" />
        <line x1="24" y1="15" x2="24" y2="43" stroke="#ffffff" strokeWidth="1.2" />
        <line x1="30" y1="15" x2="30" y2="43" stroke="#ffffff" strokeWidth="1.2" />

        {/* Central Portico Doorway with Fanlight */}
        <path d="M 17 43 L 17 33 Q 20 30 23 33 L 23 43 Z" fill="#3f271a" />
        <circle cx="20" cy="31" r="1.5" fill="#fbbf24" />

        {/* Left Neoclassical Bell Tower */}
        <rect x="5" y="6" width="9" height="18" fill="#fca5a5" stroke="#ffffff" strokeWidth="0.8" />
        <path d="M 7.5 12 Q 9.5 9 11.5 12 L 11.5 17 L 7.5 17 Z" fill="#2d2d2a" />
        <circle cx="9.5" cy="14" r="1.2" fill="#d97706" />
        <polygon points="5,6 9.5,1 14,6" fill="#ffffff" stroke="#e17070" strokeWidth="0.6" />

        {/* Right Neoclassical Bell Tower */}
        <rect x="26" y="6" width="9" height="18" fill="#fca5a5" stroke="#ffffff" strokeWidth="0.8" />
        <path d="M 28.5 12 Q 30.5 9 32.5 12 L 32.5 17 L 28.5 17 Z" fill="#2d2d2a" />
        <circle cx="30.5" cy="14" r="1.2" fill="#d97706" />
        <polygon points="26,6 30.5,1 35,6" fill="#ffffff" stroke="#e17070" strokeWidth="0.6" />

        {/* Central Pediment & Golden Cross */}
        <polygon points="14,15 20,9 26,15" fill="#ffffff" stroke="#e17070" strokeWidth="0.8" />
        <line x1="20" y1="9" x2="20" y2="5" stroke="#d97706" strokeWidth="0.9" />
        <line x1="18.5" y1="6.8" x2="21.5" y2="6.8" stroke="#d97706" strokeWidth="0.8" />
      </svg>
    ),
  },
  {
    id: 'aayi',
    point: { lat: 11.9331, lng: 79.8343 },
    name: 'Aayi Mandapam',
    placeId: 'bharathi',
    w: 38,
    h: 42,
    render: () => (
      <svg width="38" height="42" viewBox="0 0 38 42" fill="none" aria-hidden="true">
        {/* Stepped Marble Plinth Shadow */}
        <ellipse cx="19" cy="39" rx="16" ry="2.8" fill="rgba(0,0,0,0.2)" filter="blur(1px)" />

        {/* Marble Plinth Steps */}
        <rect x="4" y="37" width="30" height="2.5" fill="#ffffff" stroke="#d4d4d8" strokeWidth="0.6" />
        <rect x="6" y="35" width="26" height="2" fill="#f4f4f5" stroke="#d4d4d8" strokeWidth="0.6" />

        {/* 4 Fluted Corinthian Columns */}
        <rect x="8" y="16" width="3.4" height="19" fill="#ffffff" stroke="#d4d4d8" strokeWidth="0.6" />
        <rect x="14" y="16" width="3.4" height="19" fill="#ffffff" stroke="#d4d4d8" strokeWidth="0.6" />
        <rect x="20.6" y="16" width="3.4" height="19" fill="#ffffff" stroke="#d4d4d8" strokeWidth="0.6" />
        <rect x="26.6" y="16" width="3.4" height="19" fill="#ffffff" stroke="#d4d4d8" strokeWidth="0.6" />

        {/* Central Fountain Archway */}
        <path d="M 12 35 L 12 24 Q 19 18 26 24 L 26 35 Z" fill="#dcfce7" opacity="0.85" />
        <ellipse cx="19" cy="32" rx="4.5" ry="1.5" fill="#38bdf8" />

        {/* Classical Entablature & Pediment */}
        <rect x="5.5" y="13" width="27" height="3" fill="#ffffff" stroke="#d4d4d8" strokeWidth="0.6" />
        <polygon points="5,13 19,4 33,13" fill="#ffffff" stroke="#d4d4d8" strokeWidth="0.8" />

        {/* Pediment Relief Carving & Urn Finial */}
        <circle cx="19" cy="10" r="1.8" fill="#e4e4e7" stroke="#a1a1aa" strokeWidth="0.5" />
        <ellipse cx="19" cy="3" rx="2.5" ry="1.8" fill="#f59e0b" />
        <line x1="19" y1="4.5" x2="19" y2="1" stroke="#f59e0b" strokeWidth="0.8" />
      </svg>
    ),
  },
]

/* -------------------------------------------------------------------------
   Stylized 3D Apple Maps Trees (Spherical gumdrop canopies with sunlight)
   ------------------------------------------------------------------------- */
const APPLE_TREES = [
  // Bharathi Park cluster
  { id: 'tree-bp1', point: { lat: 11.9336, lng: 79.8338 }, r: 5 },
  { id: 'tree-bp2', point: { lat: 11.9326, lng: 79.8338 }, r: 5.2 },
  { id: 'tree-bp3', point: { lat: 11.9336, lng: 79.8348 }, r: 4.8 },
  { id: 'tree-bp4', point: { lat: 11.9326, lng: 79.8348 }, r: 5.4 },

  // Botanical Garden cluster
  { id: 'tree-bg1', point: { lat: 11.9304, lng: 79.8218 }, r: 6.2 },
  { id: 'tree-bg2', point: { lat: 11.9288, lng: 79.8218 }, r: 5.8 },
  { id: 'tree-bg3', point: { lat: 11.9304, lng: 79.8234 }, r: 6.0 },
  { id: 'tree-bg4', point: { lat: 11.9288, lng: 79.8234 }, r: 6.5 },
  { id: 'tree-bg5', point: { lat: 11.9296, lng: 79.8226 }, r: 7.0 },

  // Auroville forest fringe
  { id: 'tree-av1', point: { lat: 12.012, lng: 79.805 }, r: 6.5 },
  { id: 'tree-av2', point: { lat: 12.014, lng: 79.818 }, r: 6.0 },
  { id: 'tree-av3', point: { lat: 12.001, lng: 79.803 }, r: 6.8 },
  { id: 'tree-av4', point: { lat: 11.999, lng: 79.822 }, r: 6.2 },
]

// Coastal Coconut Palms
const PALM_GROVES = [
  { id: 'palm-serenity', point: { lat: 11.972, lng: 79.845 }, scale: 1 },
  { id: 'palm-auro', point: { lat: 11.989, lng: 79.8475 }, scale: 1.1 },
  { id: 'palm-chunnambar', point: { lat: 11.886, lng: 79.815 }, scale: 1.15 },
  { id: 'palm-veeram', point: { lat: 11.9025, lng: 79.8268 }, scale: 0.95 },
  { id: 'palm-ousteri', point: { lat: 11.954, lng: 79.748 }, scale: 1 },
]

const MAX_ZOOM = 8
const pinTone = { meal: 'meal', place: 'place' }
const easeOut = (t) => 1 - (1 - t) ** 3

function useGlide(target, duration = 520) {
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState(target)
  const current = useRef(null)

  useEffect(() => {
    const from = current.current
    if (!from || reduced || !target.ready || !from.ready) {
      current.current = target
      setValue(target)
      return undefined
    }

    let frame
    const began = performance.now()
    const step = (now) => {
      const t = Math.min(1, (now - began) / duration)
      const k = easeOut(t)
      const next = {
        ready: true,
        s: from.s * (target.s / from.s) ** k,
        cx: from.cx + (target.cx - from.cx) * k,
        cy: from.cy + (target.cy - from.cy) * k,
      }
      current.current = next
      setValue(next)
      if (t < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.s, target.cx, target.cy, target.ready, reduced, duration])

  return value
}

export default function TripMap({ stops, activeUid, onPick, offMap, caption }) {
  const [ref, size] = useSize()
  const [tilted, setTilted] = useState(false)
  const [previewPlace, setPreviewPlace] = useState(null)

  const points = useMemo(
    () => stops.filter((s) => onMap(s.point)).map((s) => ({ ...s, ...project(s.point) })),
    [stops],
  )

  // Track active stop for preview card
  useEffect(() => {
    if (!activeUid) {
      setPreviewPlace(null)
      return
    }
    const current = points.find((p) => p.uid === activeUid)
    if (current && current.point?.id && placeById[current.point.id]) {
      setPreviewPlace({
        ...placeById[current.point.id],
        order: current.order,
        uid: current.uid,
      })
    } else if (current && current.kind === 'meal') {
      setPreviewPlace({
        id: current.uid,
        name: current.name,
        cost: current.point?.cost,
        order: current.order,
        isMeal: true,
        uid: current.uid,
      })
    }
  }, [activeUid, points])

  const margin = { x: 52, top: 84, bottom: 84 }
  const room = {
    w: Math.max(80, size.width - margin.x * 2),
    h: Math.max(80, size.height - margin.top - margin.bottom),
  }

  const target = useMemo(() => {
    if (!size.width || !size.height) return { ready: false, s: 1, cx: W / 2, cy: H / 2 }
    let box = { x0: 0, y0: 0, x1: W, y1: H }
    if (points.length) {
      const xs = points.map((p) => p.x)
      const ys = points.map((p) => p.y)
      box = { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys) }
    }
    return {
      ready: true,
      s: Math.min(room.w / Math.max(box.x1 - box.x0, 1), room.h / Math.max(box.y1 - box.y0, 1), MAX_ZOOM),
      cx: (box.x0 + box.x1) / 2,
      cy: (box.y0 + box.y1) / 2,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, size.width, size.height])

  const view = useGlide(target)
  const anchor = { x: size.width / 2, y: margin.top + room.h / 2 }
  const onScreen = (p) => ({ left: anchor.x + (p.x - view.cx) * view.s, top: anchor.y + (p.y - view.cy) * view.s })
  const viewBox = [view.cx - anchor.x / view.s, view.cy - anchor.y / view.s, size.width / view.s, size.height / view.s]

  const inv = 1 / view.s
  const close = target.s > 2.6
  const route = points.length > 1 ? `M${points.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L')}` : null

  return (
    <div className={`map apple-map${tilted ? ' is-tilted' : ''}`}>
      <div className="map__viewport" ref={ref}>
        <div className="map__tilt">
          {view.ready && (
            <svg
              className="map__world"
              viewBox={viewBox.map((n) => n.toFixed(2)).join(' ')}
              width={size.width}
              height={size.height}
              aria-hidden="true"
            >
              <defs>
                {/* Apple Maps Signature Clean Cyan Ocean Gradient */}
                <linearGradient id="apple-sea-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a7e3f7" />
                  <stop offset="18%" stopColor="#81d2f2" />
                  <stop offset="55%" stopColor="#5bbbe5" />
                  <stop offset="100%" stopColor="#3b9fd1" />
                </linearGradient>

                {/* Subtle depth shadow filter for 3D city blocks */}
                <filter id="block-shadow" x="-20%" y="-20%" width="150%" height="150%">
                  <feDropShadow dx="0" dy="1.4" stdDeviation="0.8" floodColor="rgba(40,32,24,0.18)" />
                </filter>
              </defs>

              {/* Base Apple Maps Ivory Terrain */}
              <rect
                x={-BLEED}
                y={-BLEED}
                width={W + BLEED * 2}
                height={H + BLEED * 2}
                fill="#fbf9f5"
                className="map__land"
              />

              {/* Inland Lakes & Rivers (Apple Maps Crystal Cyan) */}
              {/* Ousteri Lake with surrounding wetland marsh */}
              <ellipse cx={ousteri.x} cy={ousteri.y} rx="58" ry="38" fill="#d9eedc" opacity="0.85" />
              <ellipse cx={ousteri.x} cy={ousteri.y} rx="50" ry="31" fill="#7ed2ea" />
              <path
                d={`M${ousteri.x - 30} ${ousteri.y} Q${ousteri.x} ${ousteri.y + 4} ${ousteri.x + 30} ${ousteri.y}`}
                stroke="rgba(255,255,255,0.6)"
                strokeWidth={1.5 * inv}
                fill="none"
              />

              {/* Chunnambar & Ariyankuppam Backwaters */}
              <path
                d={`M${at(11.893, 79.775)} C${at(11.882, 79.79)} ${at(11.892, 79.802)} ${at(11.885, 79.812)} S${at(11.889, 79.822)} ${at(11.886, 79.8262)}`}
                fill="none"
                stroke="#eef7fb"
                strokeWidth={13}
                strokeLinecap="round"
              />
              <path
                d={`M${at(11.893, 79.775)} C${at(11.882, 79.79)} ${at(11.892, 79.802)} ${at(11.885, 79.812)} S${at(11.889, 79.822)} ${at(11.886, 79.8262)}`}
                fill="none"
                stroke="#6ecbee"
                strokeWidth={10}
                strokeLinecap="round"
              />

              <path
                d={`M${at(11.912, 79.8)} C${at(11.904, 79.81)} ${at(11.91, 79.82)} ${at(11.905, 79.8292)}`}
                fill="none"
                stroke="#eef7fb"
                strokeWidth={9}
                strokeLinecap="round"
              />
              <path
                d={`M${at(11.912, 79.8)} C${at(11.904, 79.81)} ${at(11.91, 79.82)} ${at(11.905, 79.8292)}`}
                fill="none"
                stroke="#6ecbee"
                strokeWidth={6.5}
                strokeLinecap="round"
              />

              {/* Auroville: Lush Green Parklands & Galaxy Ring Layout */}
              <circle cx={auroville.x} cy={auroville.y} r="102" fill="#e2f5e3" opacity="0.75" />
              <circle cx={auroville.x} cy={auroville.y} r="64" fill="#c9ebcc" opacity="0.85" />
              {/* Radial peace pathways */}
              <g fill="none" stroke="#ffffff" strokeWidth={Math.max(1.2, 2.2 * inv)}>
                <circle cx={auroville.x} cy={auroville.y} r="28" stroke="#ffffff" />
                <circle cx={auroville.x} cy={auroville.y} r="54" stroke="#ffffff" opacity="0.9" />
                <circle cx={auroville.x} cy={auroville.y} r="82" stroke="#ffffff" strokeDasharray="4 6" opacity="0.7" />
                <path d={`M${auroville.x - 68} ${auroville.y - 25} Q${auroville.x - 22} ${auroville.y - 12} ${auroville.x} ${auroville.y}`} />
                <path d={`M${auroville.x + 64} ${auroville.y - 32} Q${auroville.x + 24} ${auroville.y - 14} ${auroville.x} ${auroville.y}`} />
                <path d={`M${auroville.x + 48} ${auroville.y + 58} Q${auroville.x + 18} ${auroville.y + 18} ${auroville.x} ${auroville.y}`} />
                <path d={`M${auroville.x - 52} ${auroville.y + 48} Q${auroville.x - 18} ${auroville.y + 18} ${auroville.x} ${auroville.y}`} />
              </g>
              {/* Red earth circle surrounding Matrimandir */}
              <circle cx={auroville.x} cy={auroville.y} r="14" fill="#f4b293" opacity="0.9" />
              <circle cx={auroville.x} cy={auroville.y} r="6.8" fill="#f59e0b" />

              {/* Apple Maps Road Network: Casing underlay + Crisp White Fill */}
              {/* Regional Major Roads (East Coast Road, Cuddalore Rd, Tindivanam Rd) */}
              <g fill="none" stroke="#e0dbd0" strokeLinecap="round" strokeLinejoin="round" strokeWidth={Math.max(3.6, 6.2 * inv)}>
                <path d={`M${at(11.9395, 79.83)} L${at(11.956, 79.836)} L${at(11.975, 79.839)} L${at(11.996, 79.846)} L${at(12.02, 79.858)}`} />
                <path d={`M${at(11.975, 79.839)} L${at(11.99, 79.826)} L${at(12.005, 79.814)}`} />
                <path d={`M${at(11.932, 79.8205)} L${at(11.936, 79.795)} L${at(11.946, 79.76)} L${at(11.95, 79.725)}`} />
                <path d={`M${at(11.9245, 79.827)} L${at(11.908, 79.818)} L${at(11.888, 79.806)} L${at(11.86, 79.795)}`} />
              </g>
              <g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={Math.max(2.4, 4.4 * inv)}>
                <path d={`M${at(11.9395, 79.83)} L${at(11.956, 79.836)} L${at(11.975, 79.839)} L${at(11.996, 79.846)} L${at(12.02, 79.858)}`} />
                <path d={`M${at(11.975, 79.839)} L${at(11.99, 79.826)} L${at(12.005, 79.814)}`} />
                <path d={`M${at(11.932, 79.8205)} L${at(11.936, 79.795)} L${at(11.946, 79.76)} L${at(11.95, 79.725)}`} />
                <path d={`M${at(11.9245, 79.827)} L${at(11.908, 79.818)} L${at(11.888, 79.806)} L${at(11.86, 79.795)}`} />
              </g>

              {/* The Historic Boulevard Ring Around Old Town */}
              <rect
                x={town.x - 1}
                y={town.y - 1}
                width={town.w + 2}
                height={town.h + 2}
                rx="34"
                fill="#f2eee7"
                stroke="#e2ded4"
                strokeWidth="1"
              />

              {/* Town Internal Avenue Network */}
              <g stroke="#ffffff" strokeWidth={Math.max(1.8, 3.2 * inv)}>
                {Array.from({ length: 9 }, (_, i) => (
                  <line
                    key={`av-v-${i}`}
                    x1={town.x + (i + 1) * (town.w / 10)}
                    y1={town.y + 4}
                    x2={town.x + (i + 1) * (town.w / 10)}
                    y2={town.y + town.h - 4}
                  />
                ))}
                {Array.from({ length: 9 }, (_, i) => (
                  <line
                    key={`av-h-${i}`}
                    x1={town.x + 4}
                    y1={town.y + (i + 1) * (town.h / 10)}
                    x2={town.x + town.w - 4}
                    y2={town.y + (i + 1) * (town.h / 10)}
                  />
                ))}
              </g>

              {/* 3D Extruded City Blocks: Tamil Quarter (Terracotta-capped Heritage Blocks) */}
              <g className="map__3d-blocks-tamil">
                {CITY_BLOCKS_TAMIL_QUARTER.map((b, i) => {
                  const dy = tilted ? -b.height : -1.2
                  return (
                    <g key={`t-block-${i}`} filter="url(#block-shadow)">
                      {/* Vertical Extrusion Walls */}
                      {tilted && (
                        <>
                          {/* Front (South) Wall */}
                          <polygon
                            points={`${b.x},${b.y + b.h} ${b.x + b.w},${b.y + b.h} ${b.x + b.w},${b.y + b.h + dy} ${b.x},${b.y + b.h + dy}`}
                            fill="#ded4c7"
                          />
                          {/* Left (West) Wall */}
                          <polygon
                            points={`${b.x},${b.y} ${b.x},${b.y + b.h} ${b.x},${b.y + b.h + dy} ${b.x},${b.y + dy}`}
                            fill="#d4c9bc"
                          />
                        </>
                      )}
                      {/* Top Roof Face */}
                      <rect
                        x={b.x}
                        y={b.y + dy}
                        width={b.w}
                        height={b.h}
                        rx="1.2"
                        fill="#f7efe4"
                        stroke="#e2d6c5"
                        strokeWidth="0.5"
                      />
                      {/* Subtle terracotta ridge line */}
                      <line
                        x1={b.x + 2}
                        y1={b.y + dy + b.h / 2}
                        x2={b.x + b.w - 2}
                        y2={b.y + dy + b.h / 2}
                        stroke="#e8cbb5"
                        strokeWidth="0.8"
                      />
                    </g>
                  )
                })}
              </g>

              {/* 3D Extruded City Blocks: French White Town (Colonial Mansions with Terraces) */}
              <g className="map__3d-blocks-white">
                {CITY_BLOCKS_WHITE_TOWN.map((b, i) => {
                  const dy = tilted ? -b.height : -1.5
                  return (
                    <g key={`w-block-${i}`} filter="url(#block-shadow)">
                      {/* Vertical Extrusion Walls */}
                      {tilted && (
                        <>
                          {/* Front (South) Wall */}
                          <polygon
                            points={`${b.x},${b.y + b.h} ${b.x + b.w},${b.y + b.h} ${b.x + b.w},${b.y + b.h + dy} ${b.x},${b.y + b.h + dy}`}
                            fill="#e6dfd3"
                          />
                          {/* Left (West) Wall */}
                          <polygon
                            points={`${b.x},${b.y} ${b.x},${b.y + b.h} ${b.x},${b.y + b.h + dy} ${b.x},${b.y + dy}`}
                            fill="#ddd5c8"
                          />
                        </>
                      )}
                      {/* Top Roof Face */}
                      <rect
                        x={b.x}
                        y={b.y + dy}
                        width={b.w}
                        height={b.h}
                        rx="1.4"
                        fill="#fffdf8"
                        stroke="#ded7c9"
                        strokeWidth="0.6"
                      />
                      {/* Inner courtyard green garden */}
                      <rect
                        x={b.x + b.w * 0.3}
                        y={b.y + dy + b.h * 0.3}
                        width={b.w * 0.4}
                        height={b.h * 0.4}
                        rx="0.8"
                        fill="#c4eecb"
                      />
                    </g>
                  )
                })}
              </g>

              {/* Botanical Garden (1826) in Tamil Quarter */}
              <g className="map__botanical">
                <rect
                  x={botanical.x - 12}
                  y={botanical.y - 12}
                  width="24"
                  height="24"
                  rx="4"
                  fill="#c8edcf"
                  stroke="#8fd19b"
                  strokeWidth="0.8"
                />
                <circle cx={botanical.x} cy={botanical.y} r="8" fill="#a4dfab" />
              </g>

              {/* Bharathi Park in French Quarter */}
              <g className="map__park-group">
                <rect
                  x={park.x - 10}
                  y={park.y - 11}
                  width="20"
                  height="22"
                  rx="4"
                  fill="#cbedd2"
                  stroke="#99d6a4"
                  strokeWidth="0.8"
                />
                <circle cx={park.x} cy={park.y} r="4" fill="#ffffff" stroke="#c0d4c4" strokeWidth="0.6" />
              </g>

              {/* Grand Canal dividing French and Tamil Quarters */}
              <line
                x1={canalX}
                y1={town.y + 4}
                x2={canalX}
                y2={town.y + town.h - 4}
                stroke="#479cb2"
                strokeWidth={Math.max(2.4, 4.2 * inv)}
                strokeLinecap="round"
              />
              {/* Stone Arch Bridge Crossings */}
              {[0.22, 0.42, 0.62, 0.82].map((ratio, idx) => (
                <rect
                  key={`bridge-${idx}`}
                  x={canalX - 3.2 * inv}
                  y={town.y + town.h * ratio - 1.5 * inv}
                  width={6.4 * inv}
                  height={3 * inv}
                  rx={0.6 * inv}
                  fill="#ffffff"
                  stroke="#dedad1"
                  strokeWidth={0.6 * inv}
                  filter="url(#block-shadow)"
                />
              ))}

              {/* Goubert Avenue Seafront / Promenade Esplanade */}
              <path
                d={`M${seafront.map(([a, b]) => at(a, b)).join(' L')}`}
                fill="none"
                stroke="#ded9ce"
                strokeWidth={Math.max(3.2, 5.8 * inv)}
                strokeLinecap="round"
              />
              <path
                d={`M${seafront.map(([a, b]) => at(a, b)).join(' L')}`}
                fill="none"
                stroke="#ffffff"
                strokeWidth={Math.max(2.2, 4.2 * inv)}
                strokeLinecap="round"
              />

              {/* Golden Beach Sand Fringe */}
              <path
                d={coastPath}
                fill="none"
                stroke="#f3e8d2"
                strokeWidth={28}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={coastPath}
                fill="none"
                stroke="#faefdc"
                strokeWidth={16}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Apple Maps Pastel Cyan Ocean Body */}
              <path d={seaPath} fill="url(#apple-sea-grad)" className="map__sea" />

              {/* Shoreline Surf Foam Waves */}
              <path
                d={coastPath}
                fill="none"
                stroke="rgba(255, 255, 255, 0.85)"
                strokeWidth={Math.max(1.2, 2.4 * inv)}
                strokeDasharray={`${14 * inv} ${9 * inv}`}
                strokeLinecap="round"
              />
              <path
                d={coastPath}
                transform="translate(11, 0)"
                fill="none"
                stroke="rgba(255, 255, 255, 0.42)"
                strokeWidth={Math.max(0.9, 1.8 * inv)}
                strokeDasharray={`${18 * inv} ${12 * inv}`}
                strokeLinecap="round"
              />

              {/* Black Granite Seawall along Promenade */}
              <path
                d={`M${seafront.map(([a, b]) => at(a, b)).join(' L')}`}
                fill="none"
                stroke="#27272a"
                strokeWidth={Math.max(2.4, 5.2 * inv)}
                strokeDasharray={`${3.4 * inv} ${1.8 * inv}`}
                strokeLinecap="round"
              />

              {/* Historic 1827 French Pier extending into sea */}
              <line
                x1={pier.x}
                y1={pier.y}
                x2={pier.x + 32}
                y2={pier.y + 4}
                stroke="#d6b98d"
                strokeWidth={Math.max(2.2, 4.2 * inv)}
                strokeLinecap="round"
              />
              <circle
                cx={pier.x + 32}
                cy={pier.y + 4}
                r={Math.max(2.4, 3.8 * inv)}
                fill="#d6b98d"
                stroke="#ffffff"
                strokeWidth={Math.max(0.6, 1.2 * inv)}
              />

              {/* Apple Maps Stylized 3D Tree Canopies */}
              <g className="map__trees">
                {APPLE_TREES.map((t) => {
                  const p = project(t.point)
                  return (
                    <g key={t.id} transform={`translate(${p.x} ${p.y})`}>
                      {/* Soft ground shadow disc */}
                      <ellipse cx="0" cy={t.r * 0.4} rx={t.r * 1.1} ry={t.r * 0.45} fill="rgba(30, 25, 20, 0.16)" />
                      {/* Stylized Sunlit Gumdrop Canopy */}
                      <circle cx="0" cy="0" r={t.r} fill="#52b75a" />
                      <circle cx={-t.r * 0.25} cy={-t.r * 0.25} r={t.r * 0.75} fill="#7ed96e" />
                      <circle cx={-t.r * 0.35} cy={-t.r * 0.35} r={t.r * 0.35} fill="#abf49c" opacity="0.85" />
                    </g>
                  )
                })}
              </g>

              {/* Modern Apple Cartographic Typography */}
              <g className="map__label" fontSize={13 * inv}>
                <text
                  x={W - 68}
                  y={H * 0.34}
                  transform={`rotate(78 ${W - 68} ${H * 0.34})`}
                  className="map__label--sea"
                  fontSize={Math.max(16 * inv, 10)}
                >
                  BAY OF BENGAL
                </text>

                {!close && (
                  <>
                    <text x={auroville.x} y={auroville.y + 114} textAnchor="middle" className="map__place-title">
                      Auroville
                    </text>
                    <text x={ousteri.x} y={ousteri.y + 58} textAnchor="middle" className="map__place-sub">
                      Ousteri Lake
                    </text>
                    <text x={town.x + town.w / 2} y={town.y - 14} textAnchor="middle" className="map__place-title">
                      Puducherry
                    </text>
                    <text
                      x={project({ lat: 11.9697, lng: 79.8466 }).x - 16}
                      y={project({ lat: 11.9697, lng: 79.8466 }).y + 4}
                      textAnchor="end"
                      className="map__place-sub"
                    >
                      Serenity Beach
                    </text>
                    <text
                      x={project({ lat: 11.878, lng: 79.824 }).x - 16}
                      y={project({ lat: 11.878, lng: 79.824 }).y + 4}
                      textAnchor="end"
                      className="map__place-sub"
                    >
                      Paradise Beach
                    </text>
                  </>
                )}

                {close && (
                  <>
                    <text x={town.x + (canalX - town.x) / 2} y={town.y + 18 * inv + 6} textAnchor="middle" className="map__zone-label">
                      Tamil Quarter
                    </text>
                    <text x={canalX + (town.w - (canalX - town.x)) / 2} y={town.y + 18 * inv + 6} textAnchor="middle" className="map__zone-label">
                      White Town
                    </text>
                    <text
                      x={canalX - 6 * inv}
                      y={town.y + town.h * 0.7}
                      transform={`rotate(-90 ${canalX - 6 * inv} ${town.y + town.h * 0.7})`}
                      textAnchor="middle"
                      fontSize={11 * inv}
                      fill="#377d91"
                    >
                      Grand Canal
                    </text>
                    <text x={park.x} y={park.y + 10 + 13 * inv} textAnchor="middle" fontSize={11 * inv} fill="#236638">
                      Bharathi Park
                    </text>
                    <text x={pier.x + 36} y={pier.y + 4 + 4 * inv} className="map__label--sea" fontSize={11 * inv} style={{ letterSpacing: 0 }}>
                      Old French Pier
                    </text>
                  </>
                )}
              </g>

              {/* Glowing Animated Route Path (Apple Maps Navigation) */}
              {route && (
                <g className="map__route-group">
                  {/* Outer ambient glow */}
                  <path
                    d={route}
                    fill="none"
                    stroke="#007aff"
                    strokeWidth={7 * inv}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.32"
                  />
                  {/* Primary Apple Blue Route Line */}
                  <path
                    d={route}
                    fill="none"
                    stroke="#007aff"
                    strokeWidth={3.8 * inv}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Inner pulsing route guide */}
                  <path
                    d={route}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={1.4 * inv}
                    strokeDasharray={`${3 * inv} ${6 * inv}`}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.9"
                  />
                </g>
              )}
            </svg>
          )}

          {/* 3D Pop-up Architectural Landmarks and Coconut Palms */}
          {view.ready && (
            <div className="map__billboards">
              {LANDMARKS.map((item) => (
                <div
                  key={item.id}
                  className="map__billboard map__billboard--landmark"
                  style={{
                    ...onScreen(project(item.point)),
                    width: item.w,
                    height: item.h,
                    marginLeft: -item.w / 2,
                    marginTop: -item.h,
                  }}
                  title={item.name}
                  onClick={() => {
                    if (item.placeId && placeById[item.placeId]) {
                      setPreviewPlace(placeById[item.placeId])
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <span className="map__billboard-shadow" style={{ width: item.w * 0.72 }} />
                  {item.render()}
                </div>
              ))}

              {PALM_GROVES.map((item) => (
                <div
                  key={item.id}
                  className="map__billboard map__billboard--palm"
                  style={{
                    ...onScreen(project(item.point)),
                    width: 34 * item.scale,
                    height: 44 * item.scale,
                    marginLeft: -17 * item.scale,
                    marginTop: -44 * item.scale,
                  }}
                  aria-hidden="true"
                >
                  <span className="map__billboard-shadow" style={{ width: 24 * item.scale }} />
                  <svg width={34 * item.scale} height={44 * item.scale} viewBox="0 0 34 44" fill="none">
                    <path d="M 17 43 C 15 30 18 19 20 13" stroke="#6d4827" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="19" cy="13" r="2.2" fill="#4d3215" />
                    <circle cx="21" cy="14" r="2" fill="#5a3d1d" />
                    <path d="M 20 13 Q 29 6 32 15" stroke="#1f6834" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                    <path d="M 20 13 Q 30 15 32 24" stroke="#155527" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M 20 13 Q 21 3 14 2" stroke="#2c8243" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                    <path d="M 20 13 Q 10 7 3 13" stroke="#1f6834" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                    <path d="M 20 13 Q 9 16 2 22" stroke="#155527" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M 20 13 Q 25 4 24 1" stroke="#419f5a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              ))}
            </div>
          )}

          {/* Waypoint Dots */}
          {view.ready &&
            points.map((p) => <i key={`dot-${p.uid}`} className="map__dot" style={onScreen(p)} />)}

          {/* Apple Maps Style Teardrop Waypoint Pins */}
          {view.ready &&
            points.map((p) => {
              const active = p.uid === activeUid
              return (
                <button
                  type="button"
                  key={p.uid}
                  className={`pin apple-pin pin--${pinTone[p.kind]}${active ? ' is-active' : ''}`}
                  style={onScreen(p)}
                  onClick={() => {
                    onPick(p.uid)
                    if (p.point?.id && placeById[p.point.id]) {
                      setPreviewPlace({
                        ...placeById[p.point.id],
                        order: p.order,
                        uid: p.uid,
                      })
                    } else if (p.kind === 'meal') {
                      setPreviewPlace({
                        id: p.uid,
                        name: p.name,
                        cost: p.point?.cost,
                        order: p.order,
                        isMeal: true,
                        uid: p.uid,
                      })
                    }
                  }}
                  aria-label={`Stop ${p.order}: ${p.name}`}
                >
                  <span className="apple-pin__body">
                    {active && <span className="apple-pin__ripple" />}
                    <b className="apple-pin__num">{p.order}</b>
                  </span>
                </button>
              )
            })}
        </div>
      </div>

      {/* Floating Apple Header Badge */}
      {caption && (
        <div className="apple-map__badge">
          <span className="apple-map__badge-dot" />
          <span className="apple-map__badge-text">{caption}</span>
        </div>
      )}

      {/* Floating Apple Controls Pill */}
      <div className="apple-map__controls">
        {/* 2D / 3D Segmented Switch */}
        <div className="apple-seg-control" role="group" aria-label="Map perspective">
          <button
            type="button"
            className={!tilted ? 'is-active' : ''}
            aria-pressed={!tilted}
            onClick={() => setTilted(false)}
          >
            2D
          </button>
          <button
            type="button"
            className={tilted ? 'is-active' : ''}
            aria-pressed={tilted}
            onClick={() => setTilted(true)}
          >
            3D
          </button>
        </div>

        {/* Compass / Reset Tilt Button */}
        <button
          type="button"
          className={`apple-compass-btn${tilted ? ' is-tilted' : ''}`}
          onClick={() => setTilted((v) => !v)}
          title={tilted ? 'Switch to flat 2D map' : 'Switch to Apple 3D perspective'}
          aria-label="Toggle 3D perspective"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <polygon points="10,2 14,10 10,8 6,10" fill="#dc2626" />
            <polygon points="10,18 14,10 10,8 6,10" fill="#71717a" />
          </svg>
        </button>
      </div>

      {/* Floating Apple Place Preview Card */}
      {previewPlace && (
        <div className="apple-card rise" role="dialog" aria-label={previewPlace.name}>
          <button
            type="button"
            className="apple-card__close"
            onClick={() => setPreviewPlace(null)}
            aria-label="Dismiss preview"
          >
            ✕
          </button>
          <div className="apple-card__content">
            {previewPlace.photo && (
              <div className="apple-card__thumb">
                <Photo id={previewPlace.photo} alt={previewPlace.name} ratio={1} widths={[120]} />
              </div>
            )}
            <div className="apple-card__info">
              {previewPlace.order && (
                <span className="apple-card__stop-num">Stop {previewPlace.order}</span>
              )}
              <h4 className="apple-card__title">{previewPlace.name}</h4>
              {previewPlace.blurb && <p className="apple-card__blurb">{previewPlace.blurb}</p>}
              <div className="apple-card__meta">
                {previewPlace.mins && <span>⏱ {previewPlace.mins} mins</span>}
                {previewPlace.cost !== undefined && <span>₹ {previewPlace.cost || 'Free'}</span>}
                {previewPlace.tip && (
                  <button
                    type="button"
                    className="apple-card__view-btn"
                    onClick={() => onPick(previewPlace.uid || previewPlace.id)}
                  >
                    View in itinerary →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Off-map notice */}
      {offMap.length > 0 && (
        <div className="apple-map__off-notice">
          <span>{offMap.join(', ')} {offMap.length === 1 ? 'is' : 'are'} beyond this map</span>
        </div>
      )}
    </div>
  )
}
