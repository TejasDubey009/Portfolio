import { useEffect, useState } from 'react'
import { nav } from '../data/site'

const sectionIds = nav.links.map((link) => link.href.slice(1))

export default function Nav() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // The last anchor to have crossed the upper third of the viewport wins.
      const line = window.innerHeight * 0.35
      let current = sectionIds[0]
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="nav">
      <button
        className={`nav__group nav__toggle${open ? ' is-open' : ''}`}
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
      </button>

      <div className={`nav__group nav__group--links${open ? ' is-open' : ''}`}>
        {nav.links.map((link) => (
          <a
            key={link.href}
            className={`nav__link${active === link.href.slice(1) ? ' is-active' : ''}`}
            href={link.href}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
