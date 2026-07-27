import { motion } from 'framer-motion'
import { projects } from '../data/site'

export default function Projects() {
  return (
    <section className="section projects">
      <span className="anchor" id="projects" />
      <h2 className="section__heading">{projects.heading}</h2>

      <div className="page">
        <div className="projects__grid">
          {projects.items.map((project, i) => (
            <motion.a
              className="projects__card"
              href={project.href}
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            >
              <div className="projects__media">
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>
              <span className="projects__category">{project.category}</span>
              <h3 className="projects__title">{project.title}</h3>
            </motion.a>
          ))}
        </div>

        <div className="projects__more">
          <a className="button button--small" href={projects.more.href}>
            {projects.more.label}
          </a>
        </div>
      </div>
    </section>
  )
}
