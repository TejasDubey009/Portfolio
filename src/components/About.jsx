import { motion } from 'framer-motion'
import { about, experience, images } from '../data/site'

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
}

// Who I am and where I have worked, on one screen: the story on the left, the
// work history beside it.
export default function About() {
  const [lead, ...rest] = about.paragraphs

  return (
    <section className="section about">
      <span className="anchor" id="about" />

      <img className="shape about__shape about__shape--cube" src={images.shapes.purpleCube} alt="" />
      <img className="shape about__shape about__shape--pyramid" src={images.shapes.bluePyramid} alt="" loading="lazy" />

      <div className="page about__grid">
        <motion.div className="about__story" {...reveal}>
          <h2 className="section__heading about__heading">{about.heading}</h2>
          <p className="about__lead">{lead}</p>
          {rest.map((paragraph) => (
            <p className="about__text" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </motion.div>

        <motion.div className="about__side" {...reveal} transition={{ duration: 0.6, delay: 0.12 }}>
          <span className="anchor" id="experience" />
          <div className="about__side-head">
            <h3 className="about__label">{experience.heading}</h3>
          </div>

          <ul className="experience__list">
            {experience.items.map((item) => (
              <li className="experience__card" key={item.company + item.role}>
                <div className="experience__header">
                  <div>
                    <span className="experience__company">{item.company}</span>
                    <h4 className="experience__role">{item.role}</h4>
                  </div>
                  <span className="experience__period">{item.period}</span>
                </div>

                <p className="experience__description">{item.description}</p>

                {item.shape && images.shapes[item.shape] && (
                  <img className="shape experience__shape" src={images.shapes[item.shape]} alt="" loading="lazy" />
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
