import { useState } from 'react'
import { motion } from 'framer-motion'
import { images, stack } from '../data/site'
import { logos } from '../data/logos'

function StackCard({ card, index }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      className={`stack__card${flipped ? ' is-flipped' : ''}`}
      onClick={() => setFlipped((v) => !v)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      <div className="stack__inner">
        <div className="stack__face">
          <div className="stack__panel">
            <span
              className="stack__logo"
              dangerouslySetInnerHTML={{
                __html: `<svg viewBox="0 0 48 48" fill="none">${logos[card.logo]}</svg>`,
              }}
            />
            <h3 className="stack__name">{card.name}</h3>
            <span className="stack__hint">{stack.flipHint}</span>
          </div>
        </div>

        <div className="stack__face stack__face--back">
          <div className="stack__panel stack__panel--text">
            <p className="stack__description">{card.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Stack() {
  return (
    <section className="section stack">
      <span className="anchor" id="stack" />
      <h2 className="section__heading">{stack.heading}</h2>

      <img
        className="shape stack__cube"
        src={images.shapes.turquoiseCube}
        alt="Turquoise Cube"
        loading="lazy"
      />

      <div className="page">
        <div className="stack__grid">
          {stack.cards.map((card, i) => (
            <StackCard card={card} index={i} key={card.name} />
          ))}
        </div>
      </div>
    </section>
  )
}
