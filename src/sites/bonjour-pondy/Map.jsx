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

const park = project({ lat: 11.9331, lng: 79.8343 })
const pier = project({ lat: 11.9281, lng: 79.8357 })
const seafront = [
  [11.9392, 79.8378],
  [11.9316, 79.8362],
  [11.9248, 79.8343],
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
              <rect x={-BLEED} y={-BLEED} width={W + BLEED * 2} height={H + BLEED * 2} className="map__land" />

              {/* Inland water */}
              <ellipse cx={ousteri.x} cy={ousteri.y} rx="52" ry="33" className="map__sea" />
              <path
                d={`M${at(11.893, 79.775)} C${at(11.882, 79.79)} ${at(11.892, 79.802)} ${at(11.885, 79.812)} S${at(11.889, 79.822)} ${at(11.886, 79.8262)}`}
                className="map__river"
                strokeWidth={9}
              />
              <path
                d={`M${at(11.912, 79.8)} C${at(11.904, 79.81)} ${at(11.91, 79.82)} ${at(11.905, 79.8292)}`}
                className="map__river"
                strokeWidth={6}
              />

              {/* Main roads */}
              <g className="map__road" strokeWidth={Math.max(1.2, 2.6 * inv)}>
                <path d={`M${at(11.9395, 79.83)} L${at(11.956, 79.836)} L${at(11.975, 79.839)} L${at(11.996, 79.846)} L${at(12.02, 79.858)}`} />
                <path d={`M${at(11.975, 79.839)} L${at(11.99, 79.826)} L${at(12.005, 79.814)}`} />
                <path d={`M${at(11.932, 79.8205)} L${at(11.936, 79.795)} L${at(11.946, 79.76)} L${at(11.95, 79.725)}`} />
                <path d={`M${at(11.9245, 79.827)} L${at(11.908, 79.818)} L${at(11.888, 79.806)} L${at(11.86, 79.795)}`} />
              </g>

              {/* Auroville: rings around the Matrimandir */}
              <g className="map__ring" strokeWidth={Math.max(0.8, 1.6 * inv)}>
                <circle cx={auroville.x} cy={auroville.y} r="26" />
                <circle cx={auroville.x} cy={auroville.y} r="52" />
                <circle cx={auroville.x} cy={auroville.y} r="78" strokeDasharray="3 6" />
              </g>
              <circle cx={auroville.x} cy={auroville.y} r="7" className="map__gold" />

              {/* The boulevard town and its grid */}
              <rect x={town.x} y={town.y} width={town.w} height={town.h} rx="34" className="map__town" />
              <clipPath id="town-clip">
                <rect x={town.x} y={town.y} width={town.w} height={town.h} rx="34" />
              </clipPath>
              <g clipPath="url(#town-clip)" className="map__street" strokeWidth={Math.max(0.35, 0.9 * inv)}>
                {Array.from({ length: 9 }, (_, i) => (
                  <line key={`v${i}`} x1={town.x + (i + 1) * (town.w / 10)} y1={town.y} x2={town.x + (i + 1) * (town.w / 10)} y2={town.y + town.h} />
                ))}
                {Array.from({ length: 9 }, (_, i) => (
                  <line key={`h${i}`} x1={town.x} y1={town.y + (i + 1) * (town.h / 10)} x2={town.x + town.w} y2={town.y + (i + 1) * (town.h / 10)} />
                ))}
              </g>
              <line x1={canalX} y1={town.y + 4} x2={canalX} y2={town.y + town.h - 4} className="map__canal" strokeWidth={Math.max(1, 2.4 * inv)} />
              <rect x={park.x - 7} y={park.y - 8} width="14" height="16" rx="3" className="map__park" />
              <path d={`M${seafront.map(([a, b]) => at(a, b)).join(' L')}`} className="map__road" strokeWidth={Math.max(1.4, 3 * inv)} />

              {/* The sea goes on last, so the shoreline trims the town */}
              <path d={seaPath} className="map__sea" />
              <line x1={pier.x} y1={pier.y} x2={pier.x + 26} y2={pier.y + 3} className="map__pier" strokeWidth={Math.max(1, 2.2 * inv)} />

              {/* Labels: region names when zoomed out, quarter names when close */}
              <g className="map__label" fontSize={13 * inv}>
                <text x={W - 64} y={H * 0.33} transform={`rotate(78 ${W - 64} ${H * 0.33})`} className="map__label--sea" fontSize={Math.max(15 * inv, 9)}>
                  BAY OF BENGAL
                </text>
                {!close && (
                  <>
                    <text x={auroville.x} y={auroville.y + 104} textAnchor="middle">Auroville</text>
                    <text x={ousteri.x} y={ousteri.y + 54} textAnchor="middle">Ousteri Lake</text>
                    <text x={town.x + town.w / 2} y={town.y - 12} textAnchor="middle">Pondicherry</text>
                    <text x={project({ lat: 11.9697, lng: 79.8466 }).x - 12} y={project({ lat: 11.9697, lng: 79.8466 }).y + 4} textAnchor="end">Serenity Beach</text>
                    <text x={project({ lat: 11.878, lng: 79.824 }).x - 14} y={project({ lat: 11.878, lng: 79.824 }).y + 4} textAnchor="end">Paradise Beach</text>
                  </>
                )}
                {close && (
                  <>
                    <text x={town.x + (canalX - town.x) / 2} y={town.y + 18 * inv + 6} textAnchor="middle">Tamil Quarter</text>
                    <text x={canalX - 5 * inv} y={town.y + town.h * 0.7} transform={`rotate(-90 ${canalX - 5 * inv} ${town.y + town.h * 0.7})`} textAnchor="middle" fontSize={11 * inv}>
                      Grand Canal
                    </text>
                    <text x={park.x} y={park.y + 8 + 13 * inv} textAnchor="middle" fontSize={11 * inv}>Bharathi Park</text>
                    <text x={pier.x + 28} y={pier.y + 3 + 4 * inv} className="map__label--sea" fontSize={11 * inv} style={{ letterSpacing: 0 }}>
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
