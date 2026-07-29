import { motion } from 'framer-motion'
import { brandBuilding } from '../data/site'

export default function BrandShowcase() {
  return (
    <section className="section brand-showcase">
      <span className="anchor" id="branding" />
      <h2 className="section__heading">{brandBuilding.heading}</h2>

      <div className="page">
        <p className="section__subheading">{brandBuilding.subheading}</p>

        <div className="branding__grid">
          {brandBuilding.pillars.map((pillar, index) => (
            <motion.div
              className="branding__card"
              key={pillar.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <div className="branding__icon">{pillar.icon}</div>
              <h3 className="branding__title">{pillar.title}</h3>
              <p className="branding__description">{pillar.description}</p>

              <div className="branding__tags">
                {pillar.items.map((item) => (
                  <span key={item} className="branding__pill">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
