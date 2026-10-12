import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/site'

const TABS = [
  { id: 'live', label: 'Live site' },
  { id: 'notes', label: 'About this build' },
]

// The widths each layout is designed at. The frame is scaled down to fit the
// dialog, so "Desktop" always shows the true desktop layout.
const DEVICES = [
  { id: 'desktop', label: 'Desktop', width: 1440 },
  { id: 'tablet', label: 'Tablet', width: 834 },
  { id: 'phone', label: 'Phone', width: 390 },
]

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'

export default function ProjectModal({ project, url, onClose }) {
  const [tab, setTab] = useState('live')
  const [device, setDevice] = useState(() => (window.innerWidth < 720 ? 'phone' : 'desktop'))
  const [loaded, setLoaded] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const [stage, setStage] = useState({ width: 0, height: 0 })
  const panelRef = useRef(null)
  const stageRef = useRef(null)

  // Escape to close, Tab wrapped inside the dialog, and the page behind it locked.
  useEffect(() => {
    const previouslyFocused = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll(FOCUSABLE)
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    panelRef.current?.querySelector(FOCUSABLE)?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      previouslyFocused?.focus?.()
    }
  }, [onClose])

  // Track the room available to the frame.
  useEffect(() => {
    const node = stageRef.current
    if (!node) return undefined
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setStage({ width, height })
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [tab])

  // Escape pressed inside the site belongs to the site while one of its own
  // drawers is open; otherwise it closes this dialog. Checked on the way down,
  // before the site has had the chance to close anything.
  const onFrameLoad = (event) => {
    setLoaded(true)
    try {
      const inner = event.currentTarget.contentWindow
      inner.addEventListener(
        'keydown',
        (e) => {
          if (e.key === 'Escape' && !inner.document.querySelector('[aria-modal="true"]')) onClose()
        },
        true,
      )
    } catch {
      // A frame we cannot reach still works; it just keeps its own keys.
    }
  }

  const current = DEVICES.find((d) => d.id === device)
  const scale = stage.width ? Math.min(1, stage.width / current.width) : 1
  const frame = {
    width: current.width,
    height: stage.height ? stage.height / scale : 0,
    transform: `scale(${scale})`,
  }

  const pick = (id) => {
    if (id === device) return
    setLoaded(false)
    setDevice(id)
  }

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <motion.div
        className="modal"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        style={{ '--project-accent': project.accent, '--stage': project.stage }}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="modal__head">
          <div className="modal__headline">
            <span className="modal__category">
              {project.industry} <span className="modal__year">· Concept · {project.year}</span>
            </span>
            <h2 className="modal__title" id="project-modal-title">
              {project.title}
            </h2>
          </div>

          <div className="modal__tabs" role="tablist" aria-label="Project views">
            {TABS.map((item) => (
              <button
                type="button"
                key={item.id}
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={tab === item.id}
                aria-controls={`panel-${item.id}`}
                className={`modal__tab${tab === item.id ? ' is-active' : ''}`}
                onClick={() => setTab(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="modal__actions">
            <a className="modal__live" href={url} target="_blank" rel="noreferrer">
              {projects.visitCta} <span aria-hidden="true">↗</span>
            </a>
            <button type="button" className="modal__close" onClick={onClose} aria-label="Close project preview">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M3.5 3.5l9 9m0-9l-9 9" />
              </svg>
            </button>
          </div>
        </header>

        {tab === 'live' && (
          <section className="preview" role="tabpanel" id="panel-live" aria-labelledby="tab-live">
            <div className="preview__bar">
              <div className="preview__devices" role="group" aria-label="Screen size">
                {DEVICES.map((d) => (
                  <button
                    type="button"
                    key={d.id}
                    className={d.id === device ? 'is-on' : undefined}
                    aria-pressed={d.id === device}
                    onClick={() => pick(d.id)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              <p className="preview__address">
                <span>/{project.liveUrl}</span>
                <em>
                  {current.width} px{scale < 1 ? ` at ${Math.round(scale * 100)}%` : ''}
                </em>
              </p>

              <button
                type="button"
                className="preview__reload"
                onClick={() => {
                  setLoaded(false)
                  setReloadKey((k) => k + 1)
                }}
              >
                Restart
              </button>
            </div>

            <div className="preview__stage" ref={stageRef}>
              <div
                className={`preview__frame preview__frame--${device}`}
                style={{ width: current.width * scale, height: stage.height || undefined }}
              >
                {!loaded && <p className="preview__loading">Loading {project.title}…</p>}
                {stage.height > 0 && (
                  <iframe
                    key={`${device}-${reloadKey}`}
                    title={`${project.title} — live site`}
                    src={url}
                    style={frame}
                    onLoad={onFrameLoad}
                  />
                )}
              </div>
            </div>
          </section>
        )}

        {tab === 'notes' && (
          <section className="notes" role="tabpanel" id="panel-notes" aria-labelledby="tab-notes">
            <p className="notes__lede">{project.tagline}</p>

            <div className="notes__grid">
              <div className="notes__block">
                <h3>Things to try</h3>
                <ol className="notes__steps">
                  {project.tryThis.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <button type="button" className="notes__go" onClick={() => setTab('live')}>
                  Try them in the live site →
                </button>
              </div>

              <div className="notes__block">
                <h3>Design</h3>
                <p>{project.design.idea}</p>

                <dl className="notes__facts">
                  <div>
                    <dt>Typefaces</dt>
                    <dd>{project.design.type.join(' · ')}</dd>
                  </div>
                  <div>
                    <dt>Palette</dt>
                    <dd>
                      <ul className="notes__swatches">
                        {project.design.palette.map((colour) => (
                          <li key={colour}>
                            <i style={{ background: colour }} />
                            {colour}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                <h3>Built with</h3>
                <ul className="notes__chips">
                  {project.build.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="notes__small">{projects.note}</p>
          </section>
        )}
      </motion.div>
    </motion.div>
  )
}
