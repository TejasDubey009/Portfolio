import { useEffect, useMemo, useRef, useState } from 'react'
import { usePrefersReducedMotion, useSize } from '../shared/hooks'
import { H, W, onMap, project } from './geo'

/* -------------------------------------------------------------------------
   A hand-drawn map of Pondicherry and its surroundings. Everything is plotted
   from latitude and longitude onto one fixed "world"; the SVG's viewBox then
   pans and zooms to frame whichever day is on screen, so the drawing is always
   re-rendered sharp. Pins are HTML laid over it, and stand upright when the
   map is tilted.
   ------------------------------------------------------------------------- */

const at = (lat, lng) => {
  const p = project({ lat, lng })
  return `${p.x.toFixed(1)} ${p.y.toFixed(1)}`
}

// The shoreline, north to south.
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

// Land and sea are drawn well past the edges of the world, so tilting or
// zooming out never shows where the drawing stops.
const BLEED = 2400
const first = project({ lat: COAST[0][0], lng: COAST[0][1] })
const last = project({ lat: COAST[COAST.length - 1][0], lng: COAST[COAST.length - 1][1] })
const coastPath = `M${COAST.map(([a, b]) => at(a, b)).join(' L')}`
const seaPath = `M${(first.x + 120).toFixed(1)} ${-BLEED} L${COAST.map(([a, b]) => at(a, b)).join(' L')} L${(last.x - 160).toFixed(1)} ${H + BLEED} L${W + BLEED} ${H + BLEED} L${W + BLEED} ${-BLEED} Z`

// The old town inside its ring of boulevards.
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

// 3D Architectural Pop-up Landmarks
const LANDMARKS = [
  {
    id: 'matrimandir',
    point: { lat: 12.0069, lng: 79.8106 },
    name: 'Matrimandir',
    w: 44,
    h: 44,
    render: () => (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        {/* Lotus petal white rim */}
        <ellipse cx="22" cy="38" rx="19" ry="4.5" fill="#a4d173" opacity="0.75" />
        <path d="M6 38 C14 33 30 33 38 38 C30 42 14 42 6 38 Z" fill="#ffffff" opacity="0.9" />
        {/* Golden geodesic sphere */}
        <defs>
          <radialGradient id="matri-sphere" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#fff3a8" />
            <stop offset="35%" stopColor="#f5b800" />
            <stop offset="75%" stopColor="#c88200" />
            <stop offset="100%" stopColor="#7a4a00" />
          </radialGradient>
        </defs>
        <circle cx="22" cy="22" r="16.5" fill="url(#matri-sphere)" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.28))" />
        {/* Geodesic facets */}
        <circle cx="22" cy="22" r="11" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.4" />
        <circle cx="22" cy="22" r="6" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.55" />
        <circle cx="22" cy="22" r="2.2" fill="#fff" opacity="0.95" />
        <circle cx="16" cy="18" r="1.6" fill="#fff" opacity="0.8" />
        <circle cx="28" cy="18" r="1.6" fill="#fff" opacity="0.8" />
        <circle cx="18" cy="28" r="1.6" fill="#fff" opacity="0.65" />
        <circle cx="26" cy="28" r="1.6" fill="#fff" opacity="0.65" />
      </svg>
    ),
  },
  {
    id: 'lighthouse',
    point: { lat: 11.9328, lng: 79.8361 },
    name: 'Old Lighthouse (1836)',
    w: 26,
    h: 52,
    render: () => (
      <svg width="26" height="52" viewBox="0 0 26 52" fill="none" aria-hidden="true">
        {/* Ground shadow */}
        <ellipse cx="13" cy="50" rx="9" ry="2.5" fill="rgba(0,0,0,0.22)" />
        {/* Tower shaft */}
        <path d="M7 48 L9 18 L17 18 L19 48 Z" fill="#faf7f0" stroke="#c8c2b5" strokeWidth="0.8" />
        <line x1="8.5" y1="38" x2="17.5" y2="38" stroke="#d5d0c5" strokeWidth="0.8" />
        <line x1="8.8" y1="28" x2="17.2" y2="28" stroke="#d5d0c5" strokeWidth="0.8" />
        {/* Plinth */}
        <rect x="5" y="47" width="16" height="3" rx="0.5" fill="#e8e2d5" stroke="#bab3a3" strokeWidth="0.6" />
        {/* Catwalk railing */}
        <rect x="6.5" y="16" width="13" height="2.5" rx="0.5" fill="#2d2d2b" />
        {/* Glass lantern room */}
        <rect x="8.5" y="9" width="9" height="7" fill="#ffeaa7" stroke="#2d2d2b" strokeWidth="0.8" />
        <circle cx="13" cy="12.5" r="2.2" fill="#ffd000" />
        {/* Red cupola & finial */}
        <path d="M7.5 9 Q13 3 18.5 9 Z" fill="#d6453d" stroke="#2d2d2b" strokeWidth="0.7" />
        <line x1="13" y1="3" x2="13" y2="0.5" stroke="#2d2d2b" strokeWidth="0.8" />
      </svg>
    ),
  },
  {
    id: 'basilica',
    point: { lat: 11.9263, lng: 79.8260 },
    name: 'Sacred Heart Basilica',
    w: 36,
    h: 46,
    render: () => (
      <svg width="36" height="46" viewBox="0 0 36 46" fill="none" aria-hidden="true">
        <rect x="3" y="42" width="30" height="3" fill="#e8e2d5" />
        <rect x="5" y="19" width="26" height="23" fill="#faf7f0" stroke="#d6453d" strokeWidth="1" />
        {/* Left tower */}
        <rect x="4" y="9" width="8" height="33" fill="#faf7f0" stroke="#d6453d" strokeWidth="0.8" />
        <path d="M4 9 L8 1 L12 9 Z" fill="#d6453d" />
        <line x1="8" y1="1" x2="8" y2="0" stroke="#d6453d" strokeWidth="0.8" />
        {/* Right tower */}
        <rect x="24" y="9" width="8" height="33" fill="#faf7f0" stroke="#d6453d" strokeWidth="0.8" />
        <path d="M24 9 L28 1 L32 9 Z" fill="#d6453d" />
        <line x1="28" y1="1" x2="28" y2="0" stroke="#d6453d" strokeWidth="0.8" />
        {/* Rose window */}
        <circle cx="18" cy="24" r="3.6" fill="#2d6cb5" stroke="#ffd400" strokeWidth="0.8" />
        <path d="M15 42 L15 34 Q18 31 21 34 L21 42 Z" fill="#8b261e" />
      </svg>
    ),
  },
  {
    id: 'aayi',
    point: { lat: 11.9331, lng: 79.8343 },
    name: 'Aayi Mandapam',
    w: 32,
    h: 36,
    render: () => (
      <svg width="32" height="36" viewBox="0 0 32 36" fill="none" aria-hidden="true">
        <rect x="3" y="32" width="26" height="3" fill="#ffffff" stroke="#c5beaf" strokeWidth="0.6" />
        <rect x="6" y="16" width="3.5" height="16" fill="#ffffff" stroke="#c5beaf" strokeWidth="0.6" />
        <rect x="11.5" y="16" width="3.5" height="16" fill="#ffffff" stroke="#c5beaf" strokeWidth="0.6" />
        <rect x="17" y="16" width="3.5" height="16" fill="#ffffff" stroke="#c5beaf" strokeWidth="0.6" />
        <rect x="22.5" y="16" width="3.5" height="16" fill="#ffffff" stroke="#c5beaf" strokeWidth="0.6" />
        <path d="M10 32 L10 24 Q16 19 22 24 L22 32 Z" fill="#eedcc4" />
        <rect x="4" y="13" width="24" height="3" fill="#ffffff" stroke="#c5beaf" strokeWidth="0.6" />
        <path d="M3 13 L16 5 L29 13 Z" fill="#ffffff" stroke="#c5beaf" strokeWidth="0.8" />
        <circle cx="16" cy="3.5" r="1.8" fill="#d4af37" />
      </svg>
    ),
  },
]

// 3D Miniature Palm Groves across coastal and lake regions
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

/** Glides from one framing of the map to the next: zoom, and the point in view. */
function useGlide(target, duration = 520) {
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState(target)
  const current = useRef(null)

  useEffect(() => {
    const from = current.current
    // Nothing to glide from on the first measured frame.
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
        // Zoom feels even when it moves by ratio, not by amount.
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

  const points = useMemo(
    () => stops.filter((s) => onMap(s.point)).map((s) => ({ ...s, ...project(s.point) })),
    [stops],
  )

  // Frame the day's stops. Margins are in screen pixels: a pin stands 42px above
  // its point, and the view switch sits along the bottom edge.
  const margin = { x: 52, top: 84, bottom: 72 }
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
      // Never zoom in so far that the map loses its coastline.
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
    <div className={`map${tilted ? ' is-tilted' : ''}`}>
      <div className="map__viewport" ref={ref}>
        <div className="map__tilt">
          {view.ready && (
            <svg className="map__world" viewBox={viewBox.map((n) => n.toFixed(2)).join(' ')} width={size.width} height={size.height} aria-hidden="true">
              <defs>
                {/* Coastal to deep sea gradient */}
                <linearGradient id="map-sea-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#56b4c6" />
                  <stop offset="25%" stopColor="#378ea2" />
                  <stop offset="70%" stopColor="#216477" />
                  <stop offset="100%" stopColor="#144654" />
                </linearGradient>

                {/* Clip for the town grid */}
                <clipPath id="town-clip">
                  <rect x={town.x} y={town.y} width={town.w} height={town.h} rx="34" />
                </clipPath>
              </defs>

              {/* Base terrain */}
              <rect x={-BLEED} y={-BLEED} width={W + BLEED * 2} height={H + BLEED * 2} className="map__land" />

              {/* Inland lakes & rivers */}
              {/* Ousteri Lake with surrounding wetland marsh */}
              <ellipse cx={ousteri.x} cy={ousteri.y} rx="58" ry="38" className="map__marsh" />
              <ellipse cx={ousteri.x} cy={ousteri.y} rx="50" ry="31" fill="#4ea9bc" />
              <path
                d={`M${ousteri.x - 30} ${ousteri.y} Q${ousteri.x} ${ousteri.y + 4} ${ousteri.x + 30} ${ousteri.y}`}
                stroke="rgba(255,255,255,0.45)"
                strokeWidth={1.4 * inv}
                fill="none"
              />

              {/* Chunnambar & Ariyankuppam Backwaters */}
              <path
                d={`M${at(11.893, 79.775)} C${at(11.882, 79.79)} ${at(11.892, 79.802)} ${at(11.885, 79.812)} S${at(11.889, 79.822)} ${at(11.886, 79.8262)}`}
                className="map__river"
                strokeWidth={11}
              />
              <path
                d={`M${at(11.912, 79.8)} C${at(11.904, 79.81)} ${at(11.91, 79.82)} ${at(11.905, 79.8292)}`}
                className="map__river"
                strokeWidth={7}
              />

              {/* Main regional roads */}
              <g className="map__road" strokeWidth={Math.max(1.4, 2.8 * inv)}>
                <path d={`M${at(11.9395, 79.83)} L${at(11.956, 79.836)} L${at(11.975, 79.839)} L${at(11.996, 79.846)} L${at(12.02, 79.858)}`} />
                <path d={`M${at(11.975, 79.839)} L${at(11.99, 79.826)} L${at(12.005, 79.814)}`} />
                <path d={`M${at(11.932, 79.8205)} L${at(11.936, 79.795)} L${at(11.946, 79.76)} L${at(11.95, 79.725)}`} />
                <path d={`M${at(11.9245, 79.827)} L${at(11.908, 79.818)} L${at(11.888, 79.806)} L${at(11.86, 79.795)}`} />
              </g>

              {/* Auroville: lush green forest canopy & galaxy layout */}
              <circle cx={auroville.x} cy={auroville.y} r="102" className="map__auroville-forest" />
              <circle cx={auroville.x} cy={auroville.y} r="64" className="map__auroville-inner" />
              <g className="map__ring" strokeWidth={Math.max(0.8, 1.6 * inv)}>
                <circle cx={auroville.x} cy={auroville.y} r="28" />
                <circle cx={auroville.x} cy={auroville.y} r="54" />
                <circle cx={auroville.x} cy={auroville.y} r="82" strokeDasharray="3 6" />
                <path d={`M${auroville.x - 68} ${auroville.y - 25} Q${auroville.x - 22} ${auroville.y - 12} ${auroville.x} ${auroville.y}`} />
                <path d={`M${auroville.x + 64} ${auroville.y - 32} Q${auroville.x + 24} ${auroville.y - 14} ${auroville.x} ${auroville.y}`} />
                <path d={`M${auroville.x + 48} ${auroville.y + 58} Q${auroville.x + 18} ${auroville.y + 18} ${auroville.x} ${auroville.y}`} />
                <path d={`M${auroville.x - 52} ${auroville.y + 48} Q${auroville.x - 18} ${auroville.y + 18} ${auroville.x} ${auroville.y}`} />
              </g>
              <circle cx={auroville.x} cy={auroville.y} r="13" fill="#a4d173" opacity="0.85" />
              <circle cx={auroville.x} cy={auroville.y} r="7" className="map__gold" />
              <circle cx={auroville.x} cy={auroville.y} r="2.2" fill="#ffffff" opacity="0.9" />

              {/* The boulevard town: Tamil Quarter & French White Town */}
              <rect x={town.x} y={town.y} width={town.w} height={town.h} rx="34" className="map__town" />
              <g clipPath="url(#town-clip)">
                {/* Tamil Quarter (West) */}
                <rect x={town.x} y={town.y} width={canalX - town.x} height={town.h} fill="#f8e7d2" />
                {/* French White Town (East) */}
                <rect x={canalX} y={town.y} width={town.w - (canalX - town.x)} height={town.h} fill="#fff3cd" />

                {/* Street grid */}
                <g className="map__street" strokeWidth={Math.max(0.4, 0.95 * inv)}>
                  {Array.from({ length: 9 }, (_, i) => (
                    <line key={`v${i}`} x1={town.x + (i + 1) * (town.w / 10)} y1={town.y} x2={town.x + (i + 1) * (town.w / 10)} y2={town.y + town.h} />
                  ))}
                  {Array.from({ length: 9 }, (_, i) => (
                    <line key={`h${i}`} x1={town.x} y1={town.y + (i + 1) * (town.h / 10)} x2={town.x + town.w} y2={town.y + (i + 1) * (town.h / 10)} />
                  ))}
                </g>

                {/* Botanical Garden (1826) in Tamil Quarter */}
                <g className="map__botanical">
                  <rect x={botanical.x - 12} y={botanical.y - 12} width="24" height="24" rx="4" fill="#2d8f58" opacity="0.9" />
                  <line x1={botanical.x - 9} y1={botanical.y} x2={botanical.x + 9} y2={botanical.y} stroke="#f2e4cc" strokeWidth={Math.max(0.6, 1.1 * inv)} />
                  <line x1={botanical.x} y1={botanical.y - 9} x2={botanical.x} y2={botanical.y + 9} stroke="#f2e4cc" strokeWidth={Math.max(0.6, 1.1 * inv)} />
                </g>

                {/* Bharathi Park in White Town */}
                <g className="map__park-group">
                  <rect x={park.x - 9} y={park.y - 10} width="18" height="20" rx="4" className="map__park" />
                  <line x1={park.x - 7} y1={park.y - 8} x2={park.x + 7} y2={park.y + 8} stroke="#f2e2be" strokeWidth={Math.max(0.45, 0.9 * inv)} />
                  <line x1={park.x - 7} y1={park.y + 8} x2={park.x + 7} y2={park.y - 8} stroke="#f2e2be" strokeWidth={Math.max(0.45, 0.9 * inv)} />
                  <circle cx={park.x} cy={park.y} r={Math.max(1.8, 2.4 * inv)} fill="#ffffff" stroke="#2d2d2b" strokeWidth={Math.max(0.3, 0.6 * inv)} />
                </g>
              </g>

              {/* Grand Canal dividing French and Tamil Quarters */}
              <line x1={canalX} y1={town.y + 4} x2={canalX} y2={town.y + town.h - 4} className="map__canal" strokeWidth={Math.max(1.4, 3 * inv)} />
              {/* Stone bridge crossings */}
              {[0.22, 0.42, 0.62, 0.82].map((ratio, idx) => (
                <rect
                  key={`bridge-${idx}`}
                  x={canalX - 2.8 * inv}
                  y={town.y + town.h * ratio - 1.2 * inv}
                  width={5.6 * inv}
                  height={2.4 * inv}
                  rx={0.5 * inv}
                  fill="#ffffff"
                  stroke="#33373b"
                  strokeWidth={0.5 * inv}
                />
              ))}

              {/* Goubert Avenue Seafront / Promenade */}
              <path d={`M${seafront.map(([a, b]) => at(a, b)).join(' L')}`} className="map__road" strokeWidth={Math.max(1.6, 3.4 * inv)} />

              {/* Golden beach contour underlay along coastline */}
              <path d={coastPath} fill="none" stroke="#ebd49f" strokeWidth={24} strokeLinecap="round" strokeLinejoin="round" />
              <path d={coastPath} fill="none" stroke="#f6e4be" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />

              {/* The sea layer: cuts cleanly across coastline and town */}
              <path d={seaPath} fill="url(#map-sea-grad)" className="map__sea" />

              {/* Surf foam line along the beach waterline */}
              <path
                d={coastPath}
                fill="none"
                stroke="rgba(255, 255, 255, 0.76)"
                strokeWidth={Math.max(1.1, 2.4 * inv)}
                strokeDasharray={`${12 * inv} ${8 * inv}`}
                strokeLinecap="round"
              />
              <path
                d={coastPath}
                transform="translate(10, 0)"
                fill="none"
                stroke="rgba(255, 255, 255, 0.32)"
                strokeWidth={Math.max(0.8, 1.8 * inv)}
                strokeDasharray={`${18 * inv} ${12 * inv}`}
                strokeLinecap="round"
              />

              {/* Black granite revetment seawall along Promenade */}
              <path
                d={`M${seafront.map(([a, b]) => at(a, b)).join(' L')}`}
                fill="none"
                stroke="#2b2d30"
                strokeWidth={Math.max(2.2, 4.8 * inv)}
                strokeDasharray={`${3.2 * inv} ${1.8 * inv}`}
                strokeLinecap="round"
              />

              {/* Historic French Pier */}
              <line x1={pier.x} y1={pier.y} x2={pier.x + 30} y2={pier.y + 4} stroke="#d5b382" strokeWidth={Math.max(1.8, 3.8 * inv)} strokeLinecap="round" />
              <line x1={pier.x} y1={pier.y} x2={pier.x + 30} y2={pier.y + 4} stroke="#ffffff" strokeWidth={Math.max(0.8, 1.8 * inv)} strokeDasharray={`${1.5 * inv} ${3 * inv}`} />
              <circle cx={pier.x + 30} cy={pier.y + 4} r={Math.max(2.2, 3.6 * inv)} fill="#d5b382" stroke="#ffffff" strokeWidth={Math.max(0.6, 1.2 * inv)} />

              {/* Labels */}
              <g className="map__label" fontSize={13 * inv}>
                <text x={W - 64} y={H * 0.33} transform={`rotate(78 ${W - 64} ${H * 0.33})`} className="map__label--sea" fontSize={Math.max(15 * inv, 9)}>
                  BAY OF BENGAL
                </text>
                {!close && (
                  <>
                    <text x={auroville.x} y={auroville.y + 112} textAnchor="middle">Auroville</text>
                    <text x={ousteri.x} y={ousteri.y + 56} textAnchor="middle">Ousteri Lake</text>
                    <text x={town.x + town.w / 2} y={town.y - 12} textAnchor="middle">Puducherry</text>
                    <text x={project({ lat: 11.9697, lng: 79.8466 }).x - 14} y={project({ lat: 11.9697, lng: 79.8466 }).y + 4} textAnchor="end">Serenity Beach</text>
                    <text x={project({ lat: 11.878, lng: 79.824 }).x - 14} y={project({ lat: 11.878, lng: 79.824 }).y + 4} textAnchor="end">Paradise Beach</text>
                  </>
                )}
                {close && (
                  <>
                    <text x={town.x + (canalX - town.x) / 2} y={town.y + 18 * inv + 6} textAnchor="middle">Tamil Quarter</text>
                    <text x={canalX + (town.w - (canalX - town.x)) / 2} y={town.y + 18 * inv + 6} textAnchor="middle">White Town</text>
                    <text x={canalX - 6 * inv} y={town.y + town.h * 0.7} transform={`rotate(-90 ${canalX - 6 * inv} ${town.y + town.h * 0.7})`} textAnchor="middle" fontSize={11 * inv}>
                      Grand Canal
                    </text>
                    <text x={park.x} y={park.y + 9 + 13 * inv} textAnchor="middle" fontSize={11 * inv}>Bharathi Park</text>
                    <text x={pier.x + 32} y={pier.y + 4 + 4 * inv} className="map__label--sea" fontSize={11 * inv} style={{ letterSpacing: 0 }}>
                      Old pier
                    </text>
                    <text
                      x={project({ lat: 11.9352, lng: 79.8392 }).x}
                      y={project({ lat: 11.9352, lng: 79.8392 }).y}
                      transform={`rotate(76 ${project({ lat: 11.9352, lng: 79.8392 }).x} ${project({ lat: 11.9352, lng: 79.8392 }).y})`}
                      className="map__label--sea"
                      fontSize={11 * inv}
                      textAnchor="middle"
                    >
                      BAY OF BENGAL
                    </text>
                  </>
                )}
              </g>

              {route && <path d={route} className="map__route" strokeWidth={3 * inv} strokeDasharray={`${1 * inv} ${7 * inv}`} />}
            </svg>
          )}

          {/* 3D Pop-up Architectural Landmarks and Palm Groves */}
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
                >
                  <span className="map__billboard-shadow" style={{ width: item.w * 0.7 }} />
                  {item.render()}
                </div>
              ))}

              {PALM_GROVES.map((item) => (
                <div
                  key={item.id}
                  className="map__billboard map__billboard--palm"
                  style={{
                    ...onScreen(project(item.point)),
                    width: 32 * item.scale,
                    height: 40 * item.scale,
                    marginLeft: -16 * item.scale,
                    marginTop: -40 * item.scale,
                  }}
                  aria-hidden="true"
                >
                  <span className="map__billboard-shadow" style={{ width: 22 * item.scale }} />
                  <svg width={32 * item.scale} height={40 * item.scale} viewBox="0 0 32 40" fill="none">
                    <path d="M16 39 C14 28 17 18 19 12" stroke="#7a5532" strokeWidth="2.8" strokeLinecap="round" />
                    <path d="M16 39 C14 28 17 18 19 12" stroke="#52361b" strokeWidth="2.8" strokeDasharray="1.5 2.5" strokeLinecap="round" />
                    <circle cx="18" cy="12" r="1.8" fill="#4d3215" />
                    <circle cx="20" cy="13" r="1.8" fill="#5a3d1d" />
                    <circle cx="19" cy="14" r="1.6" fill="#3f270e" />
                    <path d="M19 12 Q27 6 30 14" stroke="#256e3b" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M19 12 Q28 14 30 22" stroke="#1d5c30" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    <path d="M19 12 Q20 3 14 2" stroke="#368c4d" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M19 12 Q10 7 4 12" stroke="#256e3b" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M19 12 Q9 15 2 20" stroke="#1d5c30" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    <path d="M19 12 Q24 4 23 1" stroke="#48a662" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              ))}
            </div>
          )}

          {view.ready &&
            points.map((p) => <i key={`dot-${p.uid}`} className="map__dot" style={onScreen(p)} />)}

          {view.ready &&
            points.map((p) => (
              <button
                type="button"
                key={p.uid}
                className={`pin pin--${pinTone[p.kind]}${p.uid === activeUid ? ' is-active' : ''}`}
                style={onScreen(p)}
                onClick={() => onPick(p.uid)}
                aria-label={`Stop ${p.order}: ${p.name}`}
              >
                <span>{p.order}</span>
              </button>
            ))}
        </div>
      </div>

      {caption && <p className="map__caption">{caption}</p>}

      <div className="map__tools">
        <div className="toggle" role="group" aria-label="Map view">
          <button type="button" className={!tilted ? 'is-on' : undefined} aria-pressed={!tilted} onClick={() => setTilted(false)}>
            Flat
          </button>
          <button type="button" className={tilted ? 'is-on' : undefined} aria-pressed={tilted} onClick={() => setTilted(true)}>
            3D
          </button>
        </div>
        {offMap.length > 0 && (
          <p className="map__off">
            {offMap.join(', ')} {offMap.length === 1 ? 'is' : 'are'} beyond this map
          </p>
        )}
      </div>
    </div>
  )
}
