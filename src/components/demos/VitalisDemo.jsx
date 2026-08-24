import { useState } from 'react'
import { useAnimatedCanvas } from './useAnimatedCanvas'
import { Readout, Slider, Toggle } from './Controls'

const HISTORY = 90 // samples held in the scrolling window

/** Physiological response to training load — steeper HR, suppressed HRV. */
function model(workload) {
  const load = workload / 100
  return {
    hr: 58 + load * 112,
    hrv: 96 - load * 62,
    vo2: 38 + load * 24,
    strain: load * 21,
  }
}

export default function VitalisDemo({ demoData }) {
  const [workload, setWorkload] = useState(demoData.workload)
  const [forecast, setForecast] = useState(demoData.forecast)

  const vitals = model(workload)
  const fatigue = Math.min(100, Math.round(vitals.strain * 3.4 + (100 - vitals.hrv) * 0.4))
  const risk = fatigue > 76 ? 'high' : fatigue > 52 ? 'moderate' : 'low'

  const canvasRef = useAnimatedCanvas((ctx, { width, height, time }) => {
    ctx.fillStyle = '#05080f'
    ctx.fillRect(0, 0, width, height)

    const padL = 8
    const padR = 8
    const plotW = width - padL - padR
    const splitX = forecast ? padL + plotW * 0.62 : width - padR
    const midY = height * 0.5

    // Grid
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.09)'
    ctx.lineWidth = 1
    for (let i = 1; i < 5; i += 1) {
      const y = (height / 5) * i
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Observed heart-rate trace: a beat waveform riding the workload baseline
    const amplitude = height * (0.1 + (workload / 100) * 0.2)
    const beat = 1.1 + (workload / 100) * 1.9
    const trace = (x, phase) => {
      const t = (x / plotW) * 8 + phase
      const pulse = Math.sin(t * beat * Math.PI)
      const beatPhase = ((t * beat) % 2) - 1
      const spike = Math.exp(-(beatPhase ** 2) * 18) * 1.6
      return midY - (pulse * 0.35 + spike) * amplitude + Math.sin(t * 3.1) * 4
    }

    ctx.strokeStyle = '#34d399'
    ctx.lineWidth = 2
    ctx.beginPath()
    for (let x = padL; x <= splitX; x += 2) {
      const y = trace(x - padL, time * 1.6)
      if (x === padL) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()

    // Glow under the observed trace
    const glow = ctx.createLinearGradient(0, midY - amplitude, 0, height)
    glow.addColorStop(0, 'rgba(52, 211, 153, 0.28)')
    glow.addColorStop(1, 'rgba(52, 211, 153, 0)')
    ctx.lineTo(splitX, height)
    ctx.lineTo(padL, height)
    ctx.closePath()
    ctx.fillStyle = glow
    ctx.fill()

    if (forecast) {
      // Twelve-hour projection: confidence cone plus the predicted centre line
      const steps = 40
      const drift = (fatigue / 100) * height * 0.22

      ctx.beginPath()
      for (let i = 0; i <= steps; i += 1) {
        const t = i / steps
        const x = splitX + (width - padR - splitX) * t
        const y = midY - amplitude * 0.2 + drift * t - t * 6
        const spread = 6 + t * 34
        if (i === 0) ctx.moveTo(x, y - spread)
        else ctx.lineTo(x, y - spread)
      }
      for (let i = steps; i >= 0; i -= 1) {
        const t = i / steps
        const x = splitX + (width - padR - splitX) * t
        const y = midY - amplitude * 0.2 + drift * t - t * 6
        const spread = 6 + t * 34
        ctx.lineTo(x, y + spread)
      }
      ctx.closePath()
      ctx.fillStyle = 'rgba(129, 140, 248, 0.16)'
      ctx.fill()

      ctx.strokeStyle = '#818cf8'
      ctx.lineWidth = 2
      ctx.setLineDash([6, 5])
      ctx.beginPath()
      for (let i = 0; i <= steps; i += 1) {
        const t = i / steps
        const x = splitX + (width - padR - splitX) * t
        const y = midY - amplitude * 0.2 + drift * t - t * 6
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.setLineDash([])

      // "now" divider
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.35)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(splitX, 0)
      ctx.lineTo(splitX, height)
      ctx.stroke()

      ctx.fillStyle = 'rgba(226, 232, 240, 0.6)'
      ctx.font = '600 10px "Public Sans", sans-serif'
      ctx.fillText('NOW', splitX + 6, 16)
      ctx.fillStyle = 'rgba(129, 140, 248, 0.9)'
      ctx.fillText('+12 H FORECAST', splitX + 6, height - 10)
    }

    // Live sample ticker
    ctx.fillStyle = '#34d399'
    const headX = splitX
    const headY = trace(headX - padL, time * 1.6)
    ctx.beginPath()
    ctx.arc(headX, headY, 3.5, 0, Math.PI * 2)
    ctx.fill()
  })

  return (
    <div className="demo">
      <div className="demo__stage">
        <canvas ref={canvasRef} className="demo__canvas" aria-label="Live biometric telemetry with fatigue forecast" />
        <div className="demo__hud">
          <span className="demo__hud-chip demo__hud-chip--live">● 128 Hz ON-DEVICE</span>
          <span className="demo__hud-chip">{HISTORY}s window</span>
          <span className={`demo__hud-chip demo__hud-chip--${risk === 'low' ? 'good' : 'warn'}`}>
            {risk.toUpperCase()} FATIGUE RISK
          </span>
        </div>
      </div>

      <div className="demo__readouts">
        <Readout label="Heart rate" value={`${Math.round(vitals.hr)} bpm`} />
        <Readout label="HRV (rMSSD)" value={`${Math.round(vitals.hrv)} ms`} tone={vitals.hrv < 45 ? 'warn' : 'good'} />
        <Readout label="VO₂ estimate" value={`${vitals.vo2.toFixed(1)}`} />
        <Readout label="Fatigue index" value={`${fatigue}`} tone={risk === 'low' ? 'good' : 'warn'} />
      </div>

      <div className="demo__controls">
        <Slider
          label="Training workload"
          value={workload}
          min={0}
          max={100}
          onChange={setWorkload}
          display={workload > 78 ? 'threshold block' : workload > 45 ? 'tempo' : 'recovery'}
        />
        <div className="demo__toggles">
          <Toggle label="12-hour forecast overlay" on={forecast} onChange={setForecast} />
        </div>
      </div>
    </div>
  )
}
