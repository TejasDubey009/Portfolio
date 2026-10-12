import { memo } from 'react'

/**
 * The gallery's collection is generative: every work is drawn from a seed, a
 * composition and a palette, so each piece is an original and renders crisply
 * at any size — thumbnail, detail view or hung on the wall of the viewing room.
 */

// Small deterministic PRNG, so a work looks identical on every visit.
function mulberry(seed) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const palettes = {
  tide: { paper: '#efe9dc', inks: ['#1f3a5f', '#3f7cac', '#95afba', '#d5c7a3', '#e0582d'] },
  kiln: { paper: '#f1e7d6', inks: ['#b4431f', '#e08a3c', '#f2c57c', '#5b3a29', '#2d2a26'] },
  moss: { paper: '#ecebdd', inks: ['#2f4a3a', '#6d8b5e', '#b7c49a', '#d9b04a', '#1f2421'] },
  chalk: { paper: '#f4f1ea', inks: ['#1b1b1b', '#5c5c5c', '#a9a59b', '#d8d3c7', '#c8452f'] },
  dusk: { paper: '#ece4e1', inks: ['#3a2e5a', '#7b5ea7', '#d67d8f', '#f0b77f', '#22202e'] },
  salt: { paper: '#f2f0ea', inks: ['#0f4c5c', '#5fa8a8', '#e7d8b1', '#e36a4c', '#2b2b2b'] },
  ink: { paper: '#f3efe6', inks: ['#14213d', '#14213d', '#14213d', '#8d99ae', '#d04b2a'] },
}

const pick = (rand, list) => list[Math.floor(rand() * list.length)]

/* ----------------------------------------------------------- Compositions */

// Wide horizontal bands with softly uneven edges.
function fields(rand, w, h, inks) {
  const count = 3 + Math.floor(rand() * 3)
  const weights = Array.from({ length: count }, () => 0.5 + rand())
  const sum = weights.reduce((a, b) => a + b, 0)
  const margin = w * 0.07
  let y = margin
  const usable = h - margin * 2
  return weights.map((weight, i) => {
    const height = (weight / sum) * usable
    const top = y
    y += height
    const wobble = () => (rand() - 0.5) * h * 0.012
    const x0 = margin
    const x1 = w - margin
    const gap = h * 0.012
    const d = `M${x0} ${top + gap + wobble()} L${x1} ${top + gap + wobble()} L${x1} ${top + height - gap + wobble()} L${x0} ${top + height - gap + wobble()} Z`
    return <path key={i} d={d} fill={inks[i % inks.length]} opacity={0.9 + rand() * 0.1} />
  })
}

// A grid of cells, each holding a quarter-disc turned to a random corner.
function arcs(rand, w, h, inks) {
  const cols = 3 + Math.floor(rand() * 3)
  const size = w / cols
  const rows = Math.max(2, Math.round(h / size))
  const cellH = h / rows
  const out = []
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const x = c * size
      const y = r * cellH
      const corner = Math.floor(rand() * 4)
      const cx = corner % 2 ? x + size : x
      const cy = corner > 1 ? y + cellH : y
      const radius = Math.min(size, cellH) * (rand() > 0.82 ? 0.55 : 1)
      out.push(
        <g key={`${r}-${c}`}>
          <clipPath id={`clip-${Math.round(x)}-${Math.round(y)}-${Math.round(w)}`}>
            <rect x={x} y={y} width={size} height={cellH} />
          </clipPath>
          <rect x={x} y={y} width={size} height={cellH} fill={pick(rand, inks)} opacity="0.16" />
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill={pick(rand, inks)}
            clipPath={`url(#clip-${Math.round(x)}-${Math.round(y)}-${Math.round(w)})`}
          />
        </g>,
      )
    }
  }
  return out
}

// Fine parallel lines pushed around by a slow wave, like a plotter drawing.
function lines(rand, w, h, inks) {
  const count = 46 + Math.floor(rand() * 30)
  const margin = w * 0.09
  const f1 = 1.2 + rand() * 2.2
  const f2 = 3 + rand() * 4
  const p1 = rand() * Math.PI * 2
  const p2 = rand() * Math.PI * 2
  const focus = 0.25 + rand() * 0.5
  const out = []
  for (let i = 0; i < count; i += 1) {
    const t = i / (count - 1)
    const baseY = margin + t * (h - margin * 2)
    // The disturbance is strongest in one horizontal band and fades away from it.
    const strength = Math.exp(-((t - focus) ** 2) / 0.035) * h * 0.06
    let d = ''
    for (let s = 0; s <= 60; s += 1) {
      const u = s / 60
      const x = margin + u * (w - margin * 2)
      const y =
        baseY +
        Math.sin(u * Math.PI * f1 + p1 + t * 3) * strength +
        Math.sin(u * Math.PI * f2 + p2) * strength * 0.28
      d += `${s ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
    }
    out.push(
      <path key={i} d={d} fill="none" stroke={i % 11 === 5 ? inks[4] : inks[0]} strokeWidth={w * 0.0022} />,
    )
  }
  return out
}

// A rectangle cut again and again; a few of the pieces carry colour.
function blocks(rand, w, h, inks) {
  const rects = []
  const split = (x, y, rw, rh, depth) => {
    if (depth === 0 || (rw < w * 0.16 && rh < h * 0.16) || rand() < 0.12) {
      rects.push({ x, y, rw, rh })
      return
    }
    const vertical = rw / rh > 0.9 + rand() * 0.4
    const ratio = 0.3 + rand() * 0.4
    if (vertical) {
      split(x, y, rw * ratio, rh, depth - 1)
      split(x + rw * ratio, y, rw * (1 - ratio), rh, depth - 1)
    } else {
      split(x, y, rw, rh * ratio, depth - 1)
      split(x, y + rh * ratio, rw, rh * (1 - ratio), depth - 1)
    }
  }
  const margin = w * 0.06
  split(margin, margin, w - margin * 2, h - margin * 2, 4)
  const gap = w * 0.008
  return rects.map((r, i) => (
    <rect
      key={i}
      x={r.x + gap}
      y={r.y + gap}
      width={Math.max(0, r.rw - gap * 2)}
      height={Math.max(0, r.rh - gap * 2)}
      fill={rand() < 0.62 ? pick(rand, inks) : 'none'}
      stroke={inks[4]}
      strokeOpacity="0.28"
      strokeWidth={w * 0.0015}
    />
  ))
}

// Concentric rings from two centres that interfere where they cross.
function rings(rand, w, h, inks) {
  const centres = [
    [w * (0.25 + rand() * 0.2), h * (0.3 + rand() * 0.2)],
    [w * (0.6 + rand() * 0.2), h * (0.55 + rand() * 0.25)],
  ]
  const out = []
  centres.forEach(([cx, cy], k) => {
    const count = 9 + Math.floor(rand() * 6)
    const step = Math.max(w, h) / (count * 1.7)
    for (let i = count; i > 0; i -= 1) {
      out.push(
        <circle
          key={`${k}-${i}`}
          cx={cx}
          cy={cy}
          r={i * step}
          fill="none"
          stroke={inks[(i + k) % 3]}
          strokeWidth={step * 0.42}
          opacity="0.82"
          style={{ mixBlendMode: 'multiply' }}
        />,
      )
    }
  })
  return out
}

// Translucent bands laid across one another, like a loose textile.
function weave(rand, w, h, inks) {
  const out = []
  const margin = w * 0.08
  const across = 5 + Math.floor(rand() * 4)
  const down = 5 + Math.floor(rand() * 4)
  for (let i = 0; i < down; i += 1) {
    const bw = ((w - margin * 2) / down) * (0.45 + rand() * 0.4)
    const x = margin + (i / down) * (w - margin * 2) + rand() * 6
    out.push(
      <rect key={`v${i}`} x={x} y={margin} width={bw} height={h - margin * 2} fill={pick(rand, inks)} opacity="0.78" style={{ mixBlendMode: 'multiply' }} />,
    )
  }
  for (let i = 0; i < across; i += 1) {
    const bh = ((h - margin * 2) / across) * (0.4 + rand() * 0.4)
    const y = margin + (i / across) * (h - margin * 2) + rand() * 6
    out.push(
      <rect key={`h${i}`} x={margin} y={y} width={w - margin * 2} height={bh} fill={pick(rand, inks)} opacity="0.7" style={{ mixBlendMode: 'multiply' }} />,
    )
  }
  return out
}

// A field of dots that swell toward one point and shrink away from it.
function dots(rand, w, h, inks) {
  const cols = 16 + Math.floor(rand() * 10)
  const cell = w / cols
  const rows = Math.round(h / cell)
  const fx = rand()
  const fy = rand()
  const out = []
  for (let r = 1; r < rows; r += 1) {
    for (let c = 1; c < cols; c += 1) {
      const dx = c / cols - fx
      const dy = r / rows - fy
      const field = Math.max(0, 1 - Math.hypot(dx, dy) * 1.45)
      const radius = cell * (0.06 + field * 0.44)
      out.push(<circle key={`${r}-${c}`} cx={c * cell} cy={r * (h / rows)} r={radius} fill={field > 0.72 ? inks[4] : inks[0]} />)
    }
  }
  return out
}

// Overlapping ridgelines, palest at the back.
function horizon(rand, w, h, inks) {
  const layers = 5 + Math.floor(rand() * 3)
  const out = []
  for (let i = 0; i < layers; i += 1) {
    const base = h * (0.22 + (i / layers) * 0.66)
    const amp = h * (0.03 + rand() * 0.05)
    const freq = 1 + rand() * 2.4
    const phase = rand() * Math.PI * 2
    let d = `M0 ${h} L0 ${base}`
    for (let s = 0; s <= 48; s += 1) {
      const u = s / 48
      const y = base + Math.sin(u * Math.PI * freq + phase) * amp + Math.sin(u * Math.PI * freq * 2.7 + phase) * amp * 0.3
      d += ` L${(u * w).toFixed(1)} ${y.toFixed(1)}`
    }
    d += ` L${w} ${h} Z`
    out.push(<path key={i} d={d} fill={inks[i % inks.length]} opacity={0.55 + (i / layers) * 0.45} />)
  }
  return out
}

const compositions = { fields, arcs, lines, blocks, rings, weave, dots, horizon }

/* ------------------------------------------------------------------ Render */

function Artwork({ work, className, title }) {
  const W = 1000
  const H = Math.round((W * work.h) / work.w)
  const rand = mulberry(work.seed)
  const palette = palettes[work.palette]
  const marks = compositions[work.style](rand, W, H, palette.inks)
  const grain = `grain-${work.id}`

  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={title ?? `${work.title}, ${work.year}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Paper tooth: enough texture that flat colour does not look digital. */}
        <filter id={grain} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={work.seed % 97} result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.16 0" />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
      </defs>
      <rect width={W} height={H} fill={palette.paper} />
      <g>{marks}</g>
      <rect width={W} height={H} filter={`url(#${grain})`} fill="#000" style={{ mixBlendMode: 'multiply' }} />
    </svg>
  )
}

export default memo(Artwork)
