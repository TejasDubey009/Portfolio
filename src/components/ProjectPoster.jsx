/**
 * Generated card art — one motif per project, drawn from the project's own
 * accent colour. Keeps the grid coherent without shipping six screenshots.
 */
export default function ProjectPoster({ project }) {
  const a = project.accent
  const id = project.slug

  return (
    <svg className="poster" viewBox="0 0 480 360" role="img" aria-label={`${project.title} cover art`}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d1220" />
          <stop offset="100%" stopColor="#05070d" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor={a} stopOpacity="0.34" />
          <stop offset="100%" stopColor={a} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="480" height="360" fill={`url(#${id}-bg)`} />
      <rect width="480" height="360" fill={`url(#${id}-glow)`} />

      {id === 'helios-grid' && (
        <g stroke={a} fill="none" strokeLinecap="round">
          <circle cx="240" cy="180" r="34" fill={a} fillOpacity="0.22" strokeWidth="2" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180
            return (
              <line
                key={deg}
                x1={240 + Math.cos(rad) * 52}
                y1={180 + Math.sin(rad) * 52}
                x2={240 + Math.cos(rad) * 132}
                y2={180 + Math.sin(rad) * 132}
                strokeWidth="2"
                strokeOpacity="0.55"
              />
            )
          })}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180
            return (
              <circle
                key={`n${deg}`}
                cx={240 + Math.cos(rad) * 132}
                cy={180 + Math.sin(rad) * 132}
                r="7"
                fill={a}
                fillOpacity="0.85"
                strokeWidth="0"
              />
            )
          })}
          <circle cx="240" cy="180" r="92" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 8" />
        </g>
      )}

      {id === 'aperture-vision' && (
        <g stroke={a} fill="none">
          {[
            [96, 96, 150, 110],
            [268, 176, 118, 96],
            [140, 226, 96, 74],
          ].map(([x, y, w, h], i) => (
            <g key={i}>
              <rect x={x} y={y} width={w} height={h} rx="8" strokeWidth="2" strokeOpacity="0.9" />
              <rect x={x} y={y} width={w} height={h} rx="8" fill={a} fillOpacity="0.12" strokeWidth="0" />
              <rect x={x} y={y - 16} width="54" height="12" rx="3" fill={a} strokeWidth="0" />
            </g>
          ))}
          {[130, 190, 250].map((y) => (
            <line key={y} x1="40" y1={y} x2="440" y2={y} strokeWidth="1" strokeOpacity="0.14" />
          ))}
        </g>
      )}

      {id === 'loom-agents' && (
        <g>
          {[0, 1, 2, 3].map((i) => {
            const x = 78 + i * 108
            return (
              <g key={i}>
                {i < 3 && <line x1={x + 30} y1="180" x2={x + 78} y2="180" stroke={a} strokeWidth="2" strokeOpacity="0.5" />}
                <circle cx={x} cy="180" r="28" fill={a} fillOpacity={0.16 + i * 0.12} stroke={a} strokeWidth="2" />
                <circle cx={x} cy="180" r="8" fill={a} />
              </g>
            )
          })}
          <path
            d="M 402 208 C 402 268, 186 268, 186 212"
            fill="none"
            stroke={a}
            strokeWidth="2"
            strokeDasharray="5 6"
            strokeOpacity="0.6"
          />
        </g>
      )}

      {id === 'prism-materials' && (
        <g>
          <defs>
            <radialGradient id={`${id}-ball`} cx="36%" cy="30%" r="72%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
              <stop offset="42%" stopColor={a} stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0b0e18" />
            </radialGradient>
          </defs>
          <circle cx="240" cy="172" r="92" fill={`url(#${id}-ball)`} />
          <ellipse cx="240" cy="282" rx="88" ry="14" fill="#000" opacity="0.45" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x="148" y={140 + i * 34} width="184" height="6" rx="3" fill="#fff" opacity="0.08" />
          ))}
        </g>
      )}

      {id === 'vitalis-twin' && (
        <g fill="none" stroke={a} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 30 200 L 110 200 L 132 142 L 158 258 L 184 176 L 208 200 L 300 200 L 322 158 L 344 236 L 366 200 L 450 200" />
          <path
            d="M 30 246 L 110 246 L 132 224 L 158 268 L 184 236 L 208 246 L 300 246 L 322 230 L 344 260 L 366 246 L 450 246"
            strokeOpacity="0.28"
            strokeWidth="2"
          />
        </g>
      )}
    </svg>
  )
}
