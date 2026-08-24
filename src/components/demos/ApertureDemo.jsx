import { useState } from 'react'
import { useAnimatedCanvas, roundRect } from './useAnimatedCanvas'
import { Slider, Toggle } from './Controls'

// A synthetic warehouse aisle. Each actor loops a fixed path so the scene is
// deterministic — what changes is what the perception stack chooses to surface.
const ACTORS = [
  { id: 'TRK-04', label: 'forklift', color: '#22d3ee', base: 0.94, w: 118, h: 84, lane: 0.62, speed: 0.055, dir: 1 },
  { id: 'PLT-17', label: 'pallet', color: '#a3e635', base: 0.88, w: 74, h: 52, lane: 0.78, speed: 0, dir: 1, fixed: 0.22 },
  { id: 'PLT-18', label: 'pallet', color: '#a3e635', base: 0.83, w: 68, h: 48, lane: 0.83, speed: 0, dir: 1, fixed: 0.74 },
  { id: 'PER-02', label: 'person', color: '#f97316', base: 0.97, w: 46, h: 104, lane: 0.7, speed: 0.038, dir: -1 },
  { id: 'AGV-11', label: 'agv', color: '#818cf8', base: 0.79, w: 96, h: 58, lane: 0.55, speed: 0.072, dir: 1 },
]

const wrap = (v) => ((v % 1) + 1) % 1

export default function ApertureDemo({ demoData }) {
  const [confidence, setConfidence] = useState(demoData.confidence)
  const [segmentation, setSegmentation] = useState(demoData.segmentation)
  const [depth, setDepth] = useState(demoData.depth)
  const [tracking, setTracking] = useState(demoData.tracking)

  const threshold = confidence / 100

  const canvasRef = useAnimatedCanvas((ctx, { width, height, time }) => {
    // Floor
    const floor = ctx.createLinearGradient(0, 0, 0, height)
    floor.addColorStop(0, '#0a1420')
    floor.addColorStop(1, '#050810')
    ctx.fillStyle = floor
    ctx.fillRect(0, 0, width, height)

    // Perspective aisle grid
    ctx.strokeStyle = 'rgba(120, 200, 255, 0.12)'
    ctx.lineWidth = 1
    const horizon = height * 0.34
    for (let i = 0; i <= 10; i += 1) {
      const t = i / 10
      ctx.beginPath()
      ctx.moveTo(width * (0.5 + (t - 0.5) * 0.28), horizon)
      ctx.lineTo(width * (0.5 + (t - 0.5) * 2.4), height)
      ctx.stroke()
    }
    for (let i = 1; i <= 7; i += 1) {
      const y = horizon + (height - horizon) * (i / 7) ** 1.8
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Depth heatmap: nearer ground reads warmer
    if (depth) {
      const heat = ctx.createLinearGradient(0, horizon, 0, height)
      heat.addColorStop(0, 'rgba(37, 99, 235, 0.42)')
      heat.addColorStop(0.5, 'rgba(16, 185, 129, 0.32)')
      heat.addColorStop(1, 'rgba(249, 115, 22, 0.4)')
      ctx.fillStyle = heat
      ctx.fillRect(0, horizon, width, height - horizon)
    }

    // Scan sweep
    const sweep = wrap(time * 0.18) * width
    const beam = ctx.createLinearGradient(sweep - 90, 0, sweep + 90, 0)
    beam.addColorStop(0, 'rgba(34, 211, 238, 0)')
    beam.addColorStop(0.5, 'rgba(34, 211, 238, 0.09)')
    beam.addColorStop(1, 'rgba(34, 211, 238, 0)')
    ctx.fillStyle = beam
    ctx.fillRect(sweep - 90, 0, 180, height)

    ctx.font = '600 11px "Public Sans", sans-serif'
    ctx.textBaseline = 'alphabetic'

    ACTORS.forEach((actor, i) => {
      const progress = actor.fixed ?? wrap(actor.dir * time * actor.speed + i * 0.21)
      const x = 40 + progress * (width - 200)
      const y = horizon + (height - horizon) * actor.lane - actor.h

      // Confidence wobbles slightly, the way a real detector's score does.
      const score = Math.min(0.99, actor.base - 0.06 + Math.sin(time * 1.6 + i) * 0.045)
      if (score < threshold) return

      if (segmentation) {
        ctx.fillStyle = `${actor.color}2e`
        roundRect(ctx, x + 4, y + 4, actor.w - 8, actor.h - 8, 10)
        ctx.fill()
      }

      ctx.strokeStyle = actor.color
      ctx.lineWidth = 2
      roundRect(ctx, x, y, actor.w, actor.h, 6)
      ctx.stroke()

      // Corner ticks
      ctx.lineWidth = 3
      const tick = 12
      ;[
        [x, y, 1, 1],
        [x + actor.w, y, -1, 1],
        [x, y + actor.h, 1, -1],
        [x + actor.w, y + actor.h, -1, -1],
      ].forEach(([cx, cy, sx, sy]) => {
        ctx.beginPath()
        ctx.moveTo(cx + tick * sx, cy)
        ctx.lineTo(cx, cy)
        ctx.lineTo(cx, cy + tick * sy)
        ctx.stroke()
      })

      const label = tracking
        ? `${actor.id} · ${actor.label} ${(score * 100).toFixed(1)}%`
        : `${actor.label} ${(score * 100).toFixed(1)}%`
      const textWidth = ctx.measureText(label).width
      ctx.fillStyle = actor.color
      roundRect(ctx, x, y - 20, textWidth + 16, 17, 4)
      ctx.fill()
      ctx.fillStyle = '#03060c'
      ctx.fillText(label, x + 8, y - 7)

      // Safety envelope around people
      if (actor.label === 'person') {
        ctx.strokeStyle = `rgba(249, 115, 22, ${0.35 + Math.sin(time * 3) * 0.18})`
        ctx.lineWidth = 2
        ctx.setLineDash([6, 6])
        ctx.beginPath()
        ctx.ellipse(x + actor.w / 2, y + actor.h, actor.w * 1.6, 26, 0, 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])
      }
    })
  })

  const visible = ACTORS.filter((a) => a.base - 0.06 >= threshold).length

  return (
    <div className="demo">
      <div className="demo__stage">
        <canvas ref={canvasRef} className="demo__canvas" aria-label="Simulated warehouse camera feed with live detections" />
        <div className="demo__hud">
          <span className="demo__hud-chip demo__hud-chip--live">● CAM-03 LIVE</span>
          <span className="demo__hud-chip">8.7 ms inference</span>
          <span className="demo__hud-chip">60 FPS</span>
          <span className="demo__hud-chip">{visible} tracked</span>
        </div>
      </div>

      <div className="demo__controls">
        <Slider
          label="Confidence threshold"
          value={confidence}
          min={40}
          max={99}
          onChange={setConfidence}
          display={threshold.toFixed(2)}
        />

        <div className="demo__toggles">
          <Toggle label="Segmentation masks" on={segmentation} onChange={setSegmentation} />
          <Toggle label="Metric depth" on={depth} onChange={setDepth} />
          <Toggle label="Re-ID track labels" on={tracking} onChange={setTracking} />
        </div>
      </div>
    </div>
  )
}
