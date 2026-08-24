/** Shared control primitives for the project sandboxes. */

export function Slider({ label, value, min, max, onChange, display }) {
  return (
    <label className="demo__control">
      <span className="demo__control-label">
        {label} <b>{display ?? value}</b>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  )
}

export function Toggle({ label, on, onChange }) {
  return (
    <button
      type="button"
      className={`demo__toggle${on ? ' is-on' : ''}`}
      onClick={() => onChange(!on)}
      aria-pressed={on}
    >
      <span className="demo__toggle-dot" />
      {label}
    </button>
  )
}

export function Readout({ label, value, tone }) {
  return (
    <div className={`demo__readout${tone ? ` demo__readout--${tone}` : ''}`}>
      <span className="demo__readout-value">{value}</span>
      <span className="demo__readout-label">{label}</span>
    </div>
  )
}
