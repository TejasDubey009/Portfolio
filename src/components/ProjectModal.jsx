import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { demos } from './demos'

const TABS = [
  { id: 'demo', label: 'Live demo' },
  { id: 'architecture', label: 'System & AI architecture' },
  { id: 'metrics', label: 'Metrics & impact' },
]

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function ProjectModal({ project, onClose }) {
  const [tab, setTab] = useState('demo')
  const panelRef = useRef(null)
  const Demo = demos[project.slug]

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
        style={{ '--project-accent': project.accent }}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="modal__head">
          <div className="modal__headline">
            <span className="modal__category">
              {project.category} <span className="modal__year">· {project.year}</span>
            </span>
            <h2 className="modal__title" id="project-modal-title">
              {project.title}
            </h2>
            <p className="modal__tagline">{project.tagline}</p>
          </div>

          <div className="modal__actions">
            {project.liveUrl && (
              <a className="modal__live" href={project.liveUrl} target="_blank" rel="noreferrer">
                Visit live site ↗
              </a>
            )}
            <button type="button" className="modal__close" onClick={onClose} aria-label="Close project preview">
              ✕
            </button>
          </div>
        </header>

        <div className="modal__tabs" role="tablist" aria-label="Project detail sections">
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

        <div className="modal__body">
          {tab === 'demo' && (
            <section role="tabpanel" id="panel-demo" aria-labelledby="tab-demo">
              {Demo ? (
                <Demo demoData={project.demoData} />
              ) : (
                <p className="modal__empty">No sandbox is registered for this project yet.</p>
              )}
              <ul className="modal__features">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>
          )}

          {tab === 'architecture' && (
            <section role="tabpanel" id="panel-architecture" aria-labelledby="tab-architecture">
              <div className="arch-flow">
                {[
                  { key: 'frontend', label: 'Frontend', items: project.architecture.frontend },
                  { key: 'backend', label: 'Backend & Data', items: project.architecture.backend },
                  { key: 'ai', label: 'AI / ML', items: project.architecture.ai },
                ].map((layer, i, all) => (
                  <div className="arch-flow__layer" key={layer.key}>
                    <div className="arch-layer">
                      <span className="arch-layer__label">{layer.label}</span>
                      <ul className="arch-layer__list">
                        {layer.items.map((item) => (
                          <li className="arch-chip" key={item}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {i < all.length - 1 && <span className="arch-flow__arrow" aria-hidden="true" />}
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === 'metrics' && (
            <section role="tabpanel" id="panel-metrics" aria-labelledby="tab-metrics">
              <div className="kpi-grid">
                {project.metrics.map((metric) => (
                  <div className="kpi" key={metric.label}>
                    <span className="kpi__value">
                      {metric.value}
                      <em>{metric.unit}</em>
                    </span>
                    <span className="kpi__label">{metric.label}</span>
                  </div>
                ))}
              </div>

              <div className="impact">
                {project.impact.map((row) => (
                  <div className="impact__row" key={row.label}>
                    <span className="impact__label">{row.label}</span>
                    <span className="impact__track">
                      <motion.span
                        className="impact__fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${row.score}%` }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </span>
                    <span className="impact__score">{row.score}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
