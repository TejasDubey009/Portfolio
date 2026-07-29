import { motion } from 'framer-motion'
import { images, mvpSprint } from '../data/site'

export default function MvpSprint() {
  return (
    <section className="section mvp-sprint">
      <span className="anchor" id="mvp-sprint" />
      <h2 className="section__heading">{mvpSprint.heading}</h2>

      <div className="page">
        <p className="section__subheading">{mvpSprint.subheading}</p>

        <div className="mvp-sprint__grid">
          {mvpSprint.timeline.map((item, index) => (
            <motion.div
              className="mvp-sprint__card"
              key={item.week}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <div className="mvp-sprint__head">
                <span className="mvp-sprint__week">{item.week}</span>
                <span className="mvp-sprint__badge">{item.badge}</span>
              </div>

              <h3 className="mvp-sprint__title">{item.title}</h3>

              <ul className="mvp-sprint__list">
                {item.deliverables.map((deliverable) => (
                  <li key={deliverable}>
                    <span className="mvp-sprint__icon">✦</span>
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>

              <img
                className="shape mvp-sprint__shape"
                src={images.shapes[item.shape]}
                alt=""
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
