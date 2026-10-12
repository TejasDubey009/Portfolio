import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../data/site'
import ProjectModal from './ProjectModal'
import ProjectShot from './ProjectShot'

const siteUrl = (project) => `${import.meta.env.BASE_URL}${project.liveUrl}`

export default function Projects() {
  const [openSlug, setOpenSlug] = useState(null)
  const activeProject = projects.items.find((p) => p.slug === openSlug) ?? null
  // An odd one out at the end gets the full row to itself.
  const lastIsWide = projects.items.length % 2 === 1

  return (
    <section className="section projects">
      <span className="anchor" id="projects" />
      <h2 className="section__heading">{projects.heading}</h2>

      <div className="page">
        <p className="projects__intro">{projects.intro}</p>

        <div className="projects__grid">
          {projects.items.map((project, i) => {
            const wide = lastIsWide && i === projects.items.length - 1
            return (
              <motion.article
                className={`projects__item${wide ? ' projects__item--wide' : ''}`}
                key={project.slug}
                style={{ '--project-accent': project.accent }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: wide ? 0 : (i % 2) * 0.1 }}
              >
                <button
                  type="button"
                  className="projects__card"
                  onClick={() => setOpenSlug(project.slug)}
                  aria-haspopup="dialog"
                  aria-label={`Preview ${project.title} live`}
                >
                  <ProjectShot project={project} />
                  <span className="projects__launch" aria-hidden="true">
                    {projects.cardCta} →
                  </span>
                </button>

                <div className="projects__text">
                  <span className="projects__category">{project.industry}</span>
                  <h3 className="projects__title">{project.title}</h3>
                  <p className="projects__tagline">{project.tagline}</p>
                  <div className="projects__links">
                    <button type="button" className="projects__link" onClick={() => setOpenSlug(project.slug)}>
                      {projects.previewCta}
                    </button>
                    <a className="projects__link projects__link--out" href={siteUrl(project)} target="_blank" rel="noreferrer">
                      {projects.visitCta} <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        <p className="projects__note">{projects.note}</p>
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} url={siteUrl(activeProject)} onClose={() => setOpenSlug(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
