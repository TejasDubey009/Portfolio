import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { images, services } from '../data/site'

export default function Services() {
  const [active, setActive] = useState(0)
  const itemsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.index))
          }
        })
      },
      // A thin band across the middle of the viewport decides which service is "current".
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    itemsRef.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const current = services.items[active]

  return (
    <section className="section services">
      <span className="anchor" id="services" />
      <h2 className="section__heading">{services.heading}</h2>

      <div className="page">
        <div className="services__layout">
          <div className="services__left">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.number}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="services__number">{current.number}</h3>
                <h3 className="services__title">{current.title}</h3>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="services__right">
            {services.items.map((item, i) => (
              <article
                className="services__item"
                key={item.number}
                data-index={i}
                ref={(el) => {
                  itemsRef.current[i] = el
                }}
              >
                <div className="services__item-head">
                  <h3 className="services__number">{item.number}</h3>
                  <h3 className="services__title">{item.title}</h3>
                </div>
                <p className="services__description">{item.description}</p>
                <img
                  className="services__shape"
                  src={images.shapes[item.shape]}
                  alt=""
                  loading="lazy"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
