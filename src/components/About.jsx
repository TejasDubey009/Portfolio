import { motion } from 'framer-motion'
import { about, hero, images } from '../data/site'

function Badge() {
  return (
    <motion.div
      className="about__badge"
      aria-hidden="true"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
    >
      <div className="about__badge-glow" />
      <span className="about__badge-counter-ring" />
      
      <div className="about__badge-hub">
        <span className="about__badge-icon">✦</span>
      </div>

      <svg viewBox="0 0 100 100" overflow="visible">
        <path
          id="about-badge-curve"
          d="M 0 50 L 0 50 A 1 1 0 0 1 100 50 L 100 50 L 100 50 A 1 1 0 0 1 0 50 L 0 50"
          fill="transparent"
        />
        <text>
          <textPath href="#about-badge-curve" startOffset="0">
            {hero.badge}
          </textPath>
        </text>
      </svg>
    </motion.div>
  )
}

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.6 },
}

export default function About() {
  return (
    <section className="about">
      <span className="anchor" id="about" />

      <div className="about__panel">
        <img
          className="shape"
          src={images.shapes.purpleCube}
          alt="Purple Cube"
          style={{ left: '10%', top: '22%', width: 'clamp(90px, 14vw, 174px)' }}
        />
        <motion.div className="page about__inner" {...reveal}>
          <h2 className="section__heading" style={{ marginBottom: 0 }}>
            {about.heading}
          </h2>
          <Badge />
          <p className="about__text">{about.paragraphs[0]}</p>
        </motion.div>
      </div>

      <div className="about__panel">
        <img
          className="shape"
          src={images.shapes.bluePyramid}
          alt="Blue Pyramid"
          style={{ right: '8%', bottom: '18%', width: 'clamp(140px, 23vw, 297px)' }}
        />
        <motion.div className="page about__inner" {...reveal}>
          <p className="about__text">{about.paragraphs[1]}</p>
          <a
            className="about__cv"
            href={about.cvLink.href}
            target="_blank"
            rel="noreferrer"
          >
            {about.cvLink.label}
          </a>
        </motion.div>
      </div>

      <div className="about__panel">
        <img
          className="shape"
          src={images.shapes.purpleCube}
          alt="Purple Cube"
          style={{ right: '12%', top: '20%', width: 'clamp(90px, 12vw, 150px)' }}
        />
        <motion.div className="page about__inner" {...reveal}>
          <p className="about__text">{about.paragraphs[2]}</p>
        </motion.div>
      </div>
    </section>
  )
}
