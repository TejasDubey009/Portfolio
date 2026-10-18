import { motion } from 'framer-motion'
import { expertise, images } from '../data/site'

// Five areas, one row each: the ghost numeral, the name, and what it covers.
export default function Expertise() {
  return (
    <section className="section expertise">
      <span className="anchor" id="expertise" />
      <h2 className="section__heading">{expertise.heading}</h2>

      <div className="page">
        <ol className="expertise__list">
          {expertise.items.map((item, i) => (
            <motion.li
              className="expertise__row"
              key={item.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <span className="expertise__number" aria-hidden="true">
                {item.number}
              </span>
              <h3 className="expertise__title">{item.title}</h3>
              <p className="expertise__description">{item.description}</p>
              <img className="expertise__shape" src={images.shapes[item.shape]} alt="" loading="lazy" />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
