import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { hero, images } from '../data/site'

// Positions traced off the source hero: three shapes down each side, the
// pyramid and cylinder carrying the same tilt the original uses.
const floaters = [
  { key: 'orangePyramid', alt: 'Orange Pyramid', left: '30%', top: '22%', size: '25vw', rotate: 10, delay: 0 },
  { key: 'purpleSphere', alt: 'Purple Sphere', left: '22%', top: '50%', size: '22vw', rotate: 0, delay: 0.6 },
  { key: 'blueCylinder', alt: 'Blue Cylinder', left: '30%', top: '82%', size: '30vw', rotate: -55, delay: 1.2 },
  { key: 'turquoiseStar', alt: 'Turquoise Star', left: '76%', top: '22%', size: '22vw', rotate: 0, delay: 0.9 },
  { key: 'limeObject', alt: 'Lime Green Object', left: '82%', top: '50%', size: '22vw', rotate: 0, delay: 0.3 },
  { key: 'yellowCube', alt: 'Yellow Cube', left: '76%', top: '82%', size: '22vw', rotate: 0, delay: 1.5 },
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % hero.roles.length),
      2200,
    )
    return () => clearInterval(id)
  }, [])

  return (
    <header className="hero">
      <span className="anchor" id="home" />

      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__marquee-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span className="hero__marquee-word" key={i}>
              {hero.marquee}
            </span>
          ))}
        </div>
      </div>

      {floaters.map((shape) => (
        <motion.img
          key={shape.key}
          className="shape"
          src={images.shapes[shape.key]}
          alt={shape.alt}
          loading="eager"
          style={{
            left: shape.left,
            top: shape.top,
            width: `clamp(120px, ${shape.size}, 390px)`,
          }}
          initial={{ x: '-50%', y: '-50%', rotate: shape.rotate, opacity: 0, scale: 0.6 }}
          animate={{
            x: '-50%',
            y: ['-50%', '-56%', '-50%'],
            rotate: shape.rotate,
            opacity: 1,
            scale: 0.8,
          }}
          transition={{
            opacity: { duration: 0.8, delay: shape.delay * 0.3 },
            scale: { duration: 0.8, delay: shape.delay * 0.3 },
            y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: shape.delay },
          }}
        />
      ))}

      <div className="page hero__content">
        <h1 className="hero__title">
          {hero.greeting}
          <span className="serif">{hero.name}</span>
          {hero.suffix}
        </h1>

        <div className="hero__roles">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              className="hero__role"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {hero.roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          className="hero__photo"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <img src={images.profile} alt="Profile Picture" />
        </motion.div>

        <div className="hero__clients">
          <div className="hero__avatars">
            {images.clients.map((src, i) => (
              <img key={src} src={src} alt={`Person ${i + 1}`} />
            ))}
          </div>
          <p>{hero.clients}</p>
        </div>

        <a className="button" href={hero.cta.href}>
          {hero.cta.label}
        </a>
      </div>
    </header>
  )
}
