import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../data/site'
import ProjectModal from './ProjectModal'
import ProjectPoster from './ProjectPoster'

export default function Projects() {
  const [openSlug, setOpenSlug] = useState(null)
  const activeProject = projects.items.find((p) => p.slug === openSlug) ?? null

  return (
    <section className="section projects">
      <span className="anchor" id="projects" />
      <h2 className="section__heading">{projects.heading}</h2>

      <div className="page">
        <div className="projects__grid">
          {projects.items.map((project, i) => (
            <motion.button
              type="button"
              className="projects__card"
              key={project.slug}
              style={{ '--project-accent': project.accent }}
              onClick={() => setOpenSlug(project.slug)}
              aria-haspopup="dialog"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            >
              <div className="projects__media">
                {project.image ? (
                  <img src={project.image} alt={project.title} loading="lazy" />
                ) : (
                  <ProjectPoster project={project} />
                )}
                <span className="projects__launch">{projects.cardCta} →</span>
              </div>
              <span className="projects__category">{project.category}</span>
              <h3 className="projects__title">{project.title}</h3>
              <p className="projects__tagline">{project.tagline}</p>
            </motion.button>
          ))}
        </div>

        <div className="projects__more">
          <a className="button button--small" href={projects.more.href}>
            {projects.more.label}
          </a>
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setOpenSlug(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
