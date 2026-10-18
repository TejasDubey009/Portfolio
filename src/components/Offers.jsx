import { motion } from 'framer-motion'
import { brandBuilding, images, mvpSprint } from '../data/site'

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, delay },
})

// The two things in the headline, side by side: the 21-day sprint as a
// timeline, and the brand work as its three pillars.
export default function Offers() {
  return (
    <section className="section offers">
      <span className="anchor" id="services" />

      <div className="page offers__grid">
        <motion.article className="offer" {...reveal()}>
          <span className="anchor" id="mvp-sprint" />
          <header className="offer__head">
            <h2 className="offer__title">{mvpSprint.heading}</h2>
            <p className="offer__sub">{mvpSprint.subheading}</p>
          </header>

          <ol className="sprint">
            {mvpSprint.timeline.map((item) => (
              <li className="sprint__step" key={item.week}>
                <div className="sprint__when">
                  <span className="sprint__week">{item.week}</span>
                  <span className="sprint__days">{item.badge}</span>
                </div>

                <div className="sprint__body">
                  <h3 className="sprint__title">{item.title}</h3>
                  <ul className="sprint__list">
                    {item.deliverables.map((deliverable) => (
                      <li key={deliverable}>
                        <span className="sprint__icon" aria-hidden="true">
                          ✦
                        </span>
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <img className="shape sprint__shape" src={images.shapes[item.shape]} alt="" loading="lazy" />
              </li>
            ))}
          </ol>
        </motion.article>

        <motion.article className="offer" {...reveal(0.12)}>
          <span className="anchor" id="branding" />
          <header className="offer__head">
            <h2 className="offer__title">{brandBuilding.heading}</h2>
            <p className="offer__sub">{brandBuilding.subheading}</p>
          </header>

          <ul className="pillars">
            {brandBuilding.pillars.map((pillar) => (
              <li className="pillar" key={pillar.title}>
                <span className="pillar__icon" aria-hidden="true">
                  {pillar.icon}
                </span>

                <div className="pillar__body">
                  <h3 className="pillar__title">{pillar.title}</h3>
                  <p className="pillar__description">{pillar.description}</p>
                  <ul className="pillar__tags">
                    {pillar.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </motion.article>
      </div>
    </section>
  )
}
