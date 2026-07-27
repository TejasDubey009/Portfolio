import { useEffect, useState } from 'react'
import { testimonials } from '../data/site'

// The source ships white-stroked arrow glyphs, which would vanish on the light
// button — same shape, drawn in the site's ink colour instead.
function Chevron({ direction }) {
  return (
    <svg width="20" height="20" viewBox="0 0 40 40" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M22.5 12.5 15 20l7.5 7.5' : 'M17.5 12.5 25 20l-7.5 7.5'}
        fill="transparent"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const count = testimonials.items.length

  const go = (step) => setIndex((i) => (i + step + count) % count)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000)
    return () => clearInterval(id)
  }, [count])

  return (
    <section className="section testimonials">
      <h2 className="section__heading">{testimonials.heading}</h2>

      <div className="page">
        <div className="testimonials__viewport">
          <div
            className="testimonials__track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {testimonials.items.map((item) => (
              <figure className="testimonials__slide" key={item.name}>
                <img
                  className="testimonials__photo"
                  src={item.photo}
                  alt={`${item.name} Memoji Photo`}
                  loading="lazy"
                />
                <h3 className="testimonials__name">{item.name}</h3>
                <p className="testimonials__role">{item.role}</p>
                <blockquote className="testimonials__quote">{item.quote}</blockquote>
              </figure>
            ))}
          </div>
        </div>

        <div className="testimonials__controls">
          <button
            className="testimonials__arrow"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
          >
            <Chevron direction="left" />
          </button>
          <button
            className="testimonials__arrow"
            onClick={() => go(1)}
            aria-label="Next testimonial"
          >
            <Chevron direction="right" />
          </button>
        </div>
      </div>
    </section>
  )
}
