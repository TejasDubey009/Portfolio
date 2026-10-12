const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const Plus = (p) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const Minus = (p) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
  </svg>
)

export const Close = (p) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const Arrow = (p) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const Search = (p) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </svg>
)

// A steel tiffin tray, seen from above.
export const Tray = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <circle cx="8.5" cy="10" r="1.6" />
    <circle cx="14.5" cy="10" r="1.6" />
    <path d="M7 15h10" />
  </svg>
)

export const Chilli = ({ level }) => (
  <span className="heat" role="img" aria-label={`Heat ${level} of 3`}>
    {[1, 2, 3].map((n) => (
      <i key={n} className={n <= level ? 'is-on' : undefined} />
    ))}
  </span>
)

/** The twelve-point starburst used as a sticker across the site. */
export function Burst({ className, children }) {
  const points = Array.from({ length: 24 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 24
    const r = i % 2 ? 41 : 50
    return `${50 + Math.cos(angle) * r},${50 + Math.sin(angle) * r}`
  }).join(' ')

  return (
    <span className={`burst ${className ?? ''}`}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <polygon points={points} />
      </svg>
      <span className="burst__text">{children}</span>
    </span>
  )
}
