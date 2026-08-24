import { useEffect, useRef, useState } from 'react'
import { useAnimatedCanvas } from './useAnimatedCanvas'
import { Slider } from './Controls'

// Each preset is the palette the diffusion model would hand back: base tint,
// specular colour, and how tightly the environment reflects.
const PRESETS = {
  'Brushed Titanium': { base: [148, 163, 184], spec: [226, 232, 240], bands: 7, warmth: 0 },
  'Liquid Obsidian': { base: [30, 33, 48], spec: [129, 140, 248], bands: 3, warmth: -0.1 },
  'Molten Copper': { base: [180, 83, 34], spec: [253, 186, 116], bands: 5, warmth: 0.35 },
  'Frosted Jade': { base: [45, 138, 118], spec: [167, 243, 208], bands: 2, warmth: 0.1 },
}

const rgb = ([r, g, b], a = 1) => `rgba(${r}, ${g}, ${b}, ${a})`
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t))

export default function PrismDemo({ demoData }) {
  const [preset, setPreset] = useState(demoData.preset)
  const [roughness, setRoughness] = useState(demoData.roughness)
  const [metalness, setMetalness] = useState(demoData.metalness)
  const [light, setLight] = useState(demoData.light)
  const [synthesizing, setSynthesizing] = useState(false)
  const synthRef = useRef(0)
  const timer = useRef(null)

  // Switching preset re-runs "generation": a shimmer sweep across the surface.
  useEffect(() => {
    setSynthesizing(true)
    synthRef.current = performance.now()
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setSynthesizing(false), 1900)
    return () => clearTimeout(timer.current)
  }, [preset])

  const canvasRef = useAnimatedCanvas((ctx, { width, height, time }) => {
    const material = PRESETS[preset]
    const rough = roughness / 100
    const metal = metalness / 100
    const angle = (light * Math.PI) / 180

    const bg = ctx.createLinearGradient(0, 0, 0, height)
    bg.addColorStop(0, '#0d1018')
    bg.addColorStop(1, '#05070c')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, width, height)

    // Studio floor
    const floor = ctx.createRadialGradient(width / 2, height * 0.9, 10, width / 2, height * 0.9, width * 0.55)
    floor.addColorStop(0, 'rgba(148, 163, 184, 0.16)')
    floor.addColorStop(1, 'rgba(148, 163, 184, 0)')
    ctx.fillStyle = floor
    ctx.fillRect(0, height * 0.55, width, height * 0.45)

    const cx = width / 2
    const cy = height * 0.47
    const r = Math.min(width, height) * 0.28
    const lx = cx + Math.cos(angle) * r * 0.55
    const ly = cy - Math.sin(angle) * r * 0.55

    // Body: light position drives the gradient origin, roughness spreads it.
    const body = ctx.createRadialGradient(lx, ly, r * 0.05, cx, cy, r * 1.05)
    const lit = mix(material.base, material.spec, 0.55 * (1 - rough) + 0.2)
    body.addColorStop(0, rgb(lit))
    body.addColorStop(0.35 + rough * 0.3, rgb(material.base))
    body.addColorStop(1, rgb(mix(material.base, [4, 6, 12], 0.72)))
    ctx.fillStyle = body
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fill()

    // Anisotropic banding — metals pick up the environment, dielectrics don't.
    if (metal > 0.15) {
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.clip()
      for (let i = 0; i < material.bands; i += 1) {
        const t = i / material.bands
        const y = cy - r + t * r * 2 + Math.sin(time * 0.4 + i) * 3
        ctx.fillStyle = rgb(material.spec, metal * 0.14 * (1 - rough))
        ctx.fillRect(cx - r, y, r * 2, r * (0.06 + rough * 0.08))
      }
      ctx.restore()
    }

    // Specular highlight: tight when smooth, diffuse when rough
    const specR = r * (0.1 + rough * 0.5)
    const spec = ctx.createRadialGradient(lx, ly, 0, lx, ly, specR)
    spec.addColorStop(0, rgb(material.spec, 0.95 - rough * 0.55))
    spec.addColorStop(1, rgb(material.spec, 0))
    ctx.fillStyle = spec
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fill()

    // Fresnel rim
    const rim = ctx.createRadialGradient(cx, cy, r * 0.82, cx, cy, r)
    rim.addColorStop(0, rgb(material.spec, 0))
    rim.addColorStop(1, rgb(material.spec, 0.3 + metal * 0.35))
    ctx.fillStyle = rim
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fill()

    // Contact shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)'
    ctx.beginPath()
    ctx.ellipse(cx, cy + r * 1.06, r * 0.78, r * 0.12, 0, 0, Math.PI * 2)
    ctx.fill()

    // Generation sweep
    if (synthesizing) {
      const p = Math.min(1, (performance.now() - synthRef.current) / 1900)
      const sweepY = cy - r + p * r * 2
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.clip()
      const sweep = ctx.createLinearGradient(0, sweepY - 30, 0, sweepY + 30)
      sweep.addColorStop(0, 'rgba(244, 114, 182, 0)')
      sweep.addColorStop(0.5, 'rgba(244, 114, 182, 0.5)')
      sweep.addColorStop(1, 'rgba(244, 114, 182, 0)')
      ctx.fillStyle = sweep
      ctx.fillRect(cx - r, sweepY - 30, r * 2, 60)
      ctx.restore()
    }
  })

  return (
    <div className="demo">
      <div className="demo__stage">
        <canvas ref={canvasRef} className="demo__canvas" aria-label="Neural PBR material preview" />
        <div className="demo__hud">
          <span className={`demo__hud-chip${synthesizing ? '' : ' demo__hud-chip--live'}`}>
            {synthesizing ? '◐ SYNTHESISING MAPS…' : '● WEBGPU 60 FPS'}
          </span>
          <span className="demo__hud-chip">4K albedo · rough · metal · normal</span>
        </div>
      </div>

      <div className="demo__chips">
        {demoData.presets.map((name) => (
          <button
            type="button"
            key={name}
            className={`demo__chip${preset === name ? ' is-on' : ''}`}
            onClick={() => setPreset(name)}
            aria-pressed={preset === name}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="demo__controls">
        <Slider label="Roughness" value={roughness} min={2} max={98} onChange={setRoughness} display={(roughness / 100).toFixed(2)} />
        <Slider label="Metalness" value={metalness} min={0} max={100} onChange={setMetalness} display={(metalness / 100).toFixed(2)} />
        <Slider label="Key light angle" value={light} min={0} max={360} onChange={setLight} display={`${light}°`} />
      </div>
    </div>
  )
}
