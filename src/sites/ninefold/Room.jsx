import { useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../shared/hooks'
import Artwork from './Art'
import { artistById, inches } from './data'

// The back wall is six metres wide in the model; everything hangs to scale.
const WALL_CM = 600
const WALL_PX = 1500
const PX_PER_CM = WALL_PX / WALL_CM
const EYE_LINE = 0.46 // works hang with their centre a little above mid-wall

const tones = [
  { id: 'white', label: 'White', wall: '#f6f5f2', side: '#ebe9e4', floor: '#d9d5cc' },
  { id: 'plaster', label: 'Plaster', wall: '#ddd5c8', side: '#cfc6b7', floor: '#b9b0a2' },
  { id: 'slate', label: 'Slate', wall: '#4b4f54', side: '#3f4347', floor: '#2f3235' },
]

/**
 * A white-cube room built from five CSS planes in real perspective. The chosen
 * work hangs on the far wall at true scale; its neighbours hang on the side
 * walls. Moving the pointer turns your head; "Step closer" walks you in.
 */
export default function Room({ works, index, onIndex, onOpen }) {
  const reduced = usePrefersReducedMotion()
  const [tone, setTone] = useState('white')
  const [near, setNear] = useState(false)
  const [look, setLook] = useState({ x: 0, y: 0 })
  const frame = useRef(null)

  const work = works[index]
  const prev = works[(index - 1 + works.length) % works.length]
  const next = works[(index + 1) % works.length]
  const palette = tones.find((t) => t.id === tone)

  const onMove = (event) => {
    if (reduced || !frame.current) return
    const rect = frame.current.getBoundingClientRect()
    setLook({
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    })
  }

  const hang = (w) => ({ width: w.w * PX_PER_CM, height: w.h * PX_PER_CM })

  return (
    <div className="room">
      <div
        className="room__frame"
        ref={frame}
        onPointerMove={onMove}
        onPointerLeave={() => setLook({ x: 0, y: 0 })}
        style={{ '--wall': palette.wall, '--side': palette.side, '--floor': palette.floor }}
      >
        <div
          className="room__space"
          style={{
            transform: `translateZ(${near ? 430 : 0}px) rotateY(${look.x * -5}deg) rotateX(${look.y * 2}deg)`,
          }}
        >
          <div className="room__plane room__plane--back">
            <button
              type="button"
              className="room__work"
              style={{ ...hang(work), top: `${EYE_LINE * 100}%` }}
              onClick={() => onOpen(work.id)}
              aria-label={`Open ${work.title}`}
            >
              <Artwork work={work} />
            </button>
            {/* A 1.6 m bench, for a sense of scale. */}
            <div className="room__bench" style={{ width: 160 * PX_PER_CM }} aria-hidden="true" />
          </div>

          <div className="room__plane room__plane--left" aria-hidden="true">
            <div className="room__work room__work--side" style={{ ...hang(prev), top: `${EYE_LINE * 100}%` }}>
              <Artwork work={prev} />
            </div>
          </div>

          <div className="room__plane room__plane--right" aria-hidden="true">
            <div className="room__work room__work--side" style={{ ...hang(next), top: `${EYE_LINE * 100}%` }}>
              <Artwork work={next} />
            </div>
          </div>

          <div className="room__plane room__plane--floor" aria-hidden="true" />
          <div className="room__plane room__plane--ceiling" aria-hidden="true" />
        </div>
      </div>

      <div className="room__bar">
        <p className="room__caption" aria-live="polite">
          {artistById[work.artist].name}, <i>{work.title}</i>, {work.year}
          <span>
            {work.w} × {work.h} cm · {inches(work.w)} × {inches(work.h)} in · shown to scale on a 6 m wall
          </span>
        </p>

        <div className="room__controls">
          <div className="seg" role="group" aria-label="Wall colour">
            {tones.map((t) => (
              <button
                type="button"
                key={t.id}
                className={t.id === tone ? 'is-on' : undefined}
                aria-pressed={t.id === tone}
                onClick={() => setTone(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button type="button" className="ghost" aria-pressed={near} onClick={() => setNear((v) => !v)}>
            {near ? 'Step back' : 'Step closer'}
          </button>
          <div className="room__nav">
            <button type="button" className="ghost" onClick={() => onIndex((index - 1 + works.length) % works.length)} aria-label="Previous work">
              ←
            </button>
            <span>
              {String(index + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
            </span>
            <button type="button" className="ghost" onClick={() => onIndex((index + 1) % works.length)} aria-label="Next work">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
