import { useState } from 'react'
import { useAnimatedCanvas, roundRect } from './useAnimatedCanvas'
import { Readout, Slider, Toggle } from './Controls'

// Source nodes feed the district node; the RL agent decides how much each one
// carries. Positions are fractions of the canvas so the scene stays responsive.
const SOURCES = [
  { key: 'solar', label: 'Solar Array', color: '#f9a606', x: 0.16, y: 0.24 },
  { key: 'wind', label: 'Wind Farm', color: '#38bdf8', x: 0.16, y: 0.56 },
  { key: 'storage', label: 'Storage Bank', color: '#a78bfa', x: 0.16, y: 0.86 },
]

const SINK = { label: 'District Load', x: 0.82, y: 0.55 }

/** Dispatch model: renewables serve load first, storage absorbs the remainder. */
function dispatch({ demand, irradiance, wind, autopilot }) {
  const solarOut = irradiance * 0.85
  const windOut = wind * 0.72
  const renewable = solarOut + windOut
  const deficit = Math.max(0, demand - renewable)
  const surplus = Math.max(0, renewable - demand)

  // The RL agent pre-positions storage; the rule-based fallback reacts late and
  // leaves a gap that has to be bought from the carbon-heavy spot market.
  const storageOut = autopilot ? Math.min(deficit, 55) : Math.min(deficit * 0.55, 34)
  const gridImport = Math.max(0, deficit - storageOut)

  return {
    solarOut,
    windOut,
    storageOut,
    surplus,
    gridImport,
    renewableShare: demand > 0 ? Math.min(100, ((renewable + storageOut) / demand) * 100) : 100,
    carbon: gridImport * (autopilot ? 0.31 : 0.47),
    cost: 42 + gridImport * (autopilot ? 1.1 : 1.9),
    risk: gridImport > 22 ? 'elevated' : gridImport > 8 ? 'watch' : 'nominal',
  }
}

export default function HeliosDemo({ demoData }) {
  const [demand, setDemand] = useState(demoData.demand)
  const [irradiance, setIrradiance] = useState(demoData.irradiance)
  const [wind, setWind] = useState(demoData.wind)
  const [autopilot, setAutopilot] = useState(demoData.autopilot)

  const state = dispatch({ demand, irradiance, wind, autopilot })
  const flows = { solar: state.solarOut, wind: state.windOut, storage: state.storageOut }

  const canvasRef = useAnimatedCanvas((ctx, { width, height, time }) => {
    const bg = ctx.createRadialGradient(width * 0.8, height * 0.5, 20, width * 0.5, height * 0.5, width * 0.8)
    bg.addColorStop(0, '#101c2c')
    bg.addColorStop(1, '#05080f')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, width, height)

    const sinkX = width * SINK.x
    const sinkY = height * SINK.y

    SOURCES.forEach((source) => {
      const sx = width * source.x
      const sy = height * source.y
      const load = Math.max(0, flows[source.key]) / 100

      // Cable
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.18)'
      ctx.lineWidth = 8
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(sx + 46, sy)
      ctx.bezierCurveTo(width * 0.45, sy, width * 0.55, sinkY, sinkX - 52, sinkY)
      ctx.stroke()

      // Energised core, thickness tracks dispatched power
      ctx.strokeStyle = source.color
      ctx.globalAlpha = 0.25 + load * 0.55
      ctx.lineWidth = 2 + load * 6
      ctx.stroke()
      ctx.globalAlpha = 1

      // Packets travelling toward the district
      const packets = Math.round(load * 9)
      for (let i = 0; i < packets; i += 1) {
        const t = ((time * (0.16 + load * 0.3) + i / Math.max(packets, 1)) % 1)
        const mt = 1 - t
        const px =
          mt * mt * mt * (sx + 46) +
          3 * mt * mt * t * (width * 0.45) +
          3 * mt * t * t * (width * 0.55) +
          t * t * t * (sinkX - 52)
        const py = mt * mt * mt * sy + 3 * mt * mt * t * sy + 3 * mt * t * t * sinkY + t * t * t * sinkY
        ctx.fillStyle = source.color
        ctx.globalAlpha = Math.sin(t * Math.PI) * 0.9
        ctx.beginPath()
        ctx.arc(px, py, 3.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // Node
      ctx.fillStyle = 'rgba(9, 14, 24, 0.92)'
      ctx.strokeStyle = source.color
      ctx.lineWidth = 2
      roundRect(ctx, sx - 46, sy - 26, 92, 52, 14)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = source.color
      ctx.font = '700 15px "Public Sans", sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`${Math.round(flows[source.key])}`, sx, sy - 2)
      ctx.fillStyle = 'rgba(226, 232, 240, 0.7)'
      ctx.font = '500 10px "Public Sans", sans-serif'
      ctx.fillText(source.label.toUpperCase(), sx, sy + 14)
    })

    // District node
    const pulse = 1 + Math.sin(time * 2) * 0.04
    ctx.save()
    ctx.translate(sinkX, sinkY)
    ctx.scale(pulse, pulse)
    const ring = ctx.createRadialGradient(0, 0, 10, 0, 0, 62)
    ring.addColorStop(0, 'rgba(52, 211, 153, 0.35)')
    ring.addColorStop(1, 'rgba(52, 211, 153, 0)')
    ctx.fillStyle = ring
    ctx.beginPath()
    ctx.arc(0, 0, 62, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    ctx.fillStyle = 'rgba(9, 14, 24, 0.95)'
    ctx.strokeStyle = state.risk === 'nominal' ? '#34d399' : state.risk === 'watch' ? '#facc15' : '#f97316'
    ctx.lineWidth = 2
    roundRect(ctx, sinkX - 52, sinkY - 32, 104, 64, 18)
    ctx.fill()
    ctx.stroke()

    ctx.textAlign = 'center'
    ctx.fillStyle = '#e2e8f0'
    ctx.font = '700 19px "Public Sans", sans-serif'
    ctx.fillText(`${Math.round(demand)}`, sinkX, sinkY - 2)
    ctx.fillStyle = 'rgba(226, 232, 240, 0.65)'
    ctx.font = '500 10px "Public Sans", sans-serif'
    ctx.fillText('DISTRICT LOAD (MW)', sinkX, sinkY + 16)
    ctx.textAlign = 'left'

    // Spot-market top-up, drawn only when the dispatch leaves a gap
    if (state.gridImport > 0.5) {
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.75)'
      ctx.setLineDash([7, 6])
      ctx.lineWidth = 2 + (state.gridImport / 100) * 5
      ctx.beginPath()
      ctx.moveTo(sinkX, height * 0.08)
      ctx.lineTo(sinkX, sinkY - 34)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.fillStyle = 'rgba(249, 115, 22, 0.95)'
      ctx.font = '600 11px "Public Sans", sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`SPOT IMPORT ${state.gridImport.toFixed(1)} MW`, sinkX, height * 0.06)
      ctx.textAlign = 'left'
    }
  })

  return (
    <div className="demo">
      <div className="demo__stage">
        <canvas ref={canvasRef} className="demo__canvas" aria-label="Live microgrid dispatch simulation" />
        <div className="demo__hud">
          <span className={`demo__hud-chip${autopilot ? ' demo__hud-chip--live' : ''}`}>
            {autopilot ? '● PPO AUTOPILOT' : '○ RULE-BASED'}
          </span>
          <span className="demo__hud-chip">14.2 ms decision</span>
        </div>
      </div>

      <div className="demo__readouts">
        <Readout label="Renewable share" value={`${state.renewableShare.toFixed(0)}%`} tone="good" />
        <Readout label="Spot import" value={`${state.gridImport.toFixed(1)} MW`} tone={state.gridImport > 8 ? 'warn' : undefined} />
        <Readout label="Carbon" value={`${state.carbon.toFixed(1)} t/h`} />
        <Readout label="Blackout risk" value={state.risk} tone={state.risk === 'nominal' ? 'good' : 'warn'} />
      </div>

      <div className="demo__controls">
        <Slider label="District demand" value={demand} min={20} max={100} onChange={setDemand} display={`${demand} MW`} />
        <Slider label="Solar irradiance" value={irradiance} min={0} max={100} onChange={setIrradiance} display={`${irradiance}%`} />
        <Slider label="Wind speed" value={wind} min={0} max={100} onChange={setWind} display={`${wind}%`} />
        <div className="demo__toggles">
          <Toggle label="RL autopilot" on={autopilot} onChange={setAutopilot} />
        </div>
      </div>
    </div>
  )
}
