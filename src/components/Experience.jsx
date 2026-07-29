import { motion } from 'framer-motion'
import { experience, images } from '../data/site'

export default function Experience() {
  return (
    <section className="section experience">
      <span className="anchor" id="experience" />
      <h2 className="section__heading">{experience.heading}</h2>

      <div className="page">
        <div className="experience__container">
          {experience.items.map((item, index) => (
            <motion.div
              className="experience__card"
              key={item.company + item.role}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="experience__header">
                <div>
                  <span className="experience__company">{item.company}</span>
                  <h3 className="experience__role">{item.role}</h3>
                </div>
                <span className="experience__period">{item.period}</span>
              </div>

              <p className="experience__description">{item.description}</p>

              {item.shape && images.shapes[item.shape] && (
                <img
                  className="shape experience__shape"
                  src={images.shapes[item.shape]}
                  alt=""
                  loading="lazy"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
