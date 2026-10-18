import { useState } from 'react'
import { motion } from 'framer-motion'
import { images, stack } from '../data/site'
import { logos } from '../data/logos'

// A tile turns over on hover or keyboard focus; a tap or click pins it, which
// is what touch screens rely on. Both faces stay in the document, so a screen
// reader hears the name and the description either way.
function StackCard({ card, index, isFlipped, onToggle }) {
  return (
    <motion.li
      className="stack__item"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
    >
      <button
        type="button"
        className={`stack__card${isFlipped ? ' is-flipped' : ''}`}
        aria-pressed={isFlipped}
        onClick={onToggle}
      >
        <span className="stack__inner">
          <span className="stack__face">
            <span
              className="stack__logo"
              aria-hidden="true"
              dangerouslySetInnerHTML={{
                __html: `<svg viewBox="0 0 48 48" fill="none">${logos[card.logo]}</svg>`,
              }}
            />
            <span className="stack__name">{card.name}</span>
          </span>

          <span className="stack__face stack__face--back">
            <span className="stack__description">{card.description}</span>
          </span>
        </span>
      </button>
    </motion.li>
  )
}

export default function Stack() {
  const [flippedIndex, setFlippedIndex] = useState(null)

  return (
    <section className="section stack">
      <span className="anchor" id="stack" />
      <img className="shape stack__cube" src={images.shapes.turquoiseCube} alt="" loading="lazy" />

      <h2 className="section__heading">{stack.heading}</h2>

      <div className="page">
        <p className="section__subheading">{stack.hint}</p>

        <ul className="stack__grid">
          {stack.cards.map((card, i) => (
            <StackCard
              card={card}
              index={i}
              key={card.name}
              isFlipped={flippedIndex === i}
              onToggle={() => setFlippedIndex((prev) => (prev === i ? null : i))}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
