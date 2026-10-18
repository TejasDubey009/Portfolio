import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { nav } from '../data/site'

const sectionIds = nav.links.map((link) => link.href.slice(1))

const Moon = () => (
  <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M16.6 12.4A7 7 0 0 1 7.6 3.4a.6.6 0 0 0-.8-.7 7.6 7.6 0 1 0 10.5 10.5.6.6 0 0 0-.7-.8Z" />
  </svg>
)

const Sun = () => (
  <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <circle cx="10" cy="10" r="3.6" fill="currentColor" stroke="none" />
    <path d="M10 1.8v2M10 16.2v2M1.8 10h2M16.2 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4" />
  </svg>
)

export default function Nav() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      if (stored) return stored
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => {
      const isAtBottom =
        window.innerHeight + Math.ceil(window.scrollY) >=
        document.documentElement.scrollHeight - 60

      if (isAtBottom) {
        setActive(sectionIds[sectionIds.length - 1])
        return
      }

      const line = window.innerHeight * 0.45
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

  // The mobile menu closes on Escape and on a press anywhere outside it.
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointerDown = (event) => {
      if (!navRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <nav className="nav" ref={navRef} aria-label="Main">
      <button
        className={`nav__group nav__toggle${open ? ' is-open' : ''}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
      </button>

      <div id="nav-links" className={`nav__group nav__group--links${open ? ' is-open' : ''}`}>
        {nav.links.map((link) => {
          const isActive = active === link.href.slice(1)
          return (
            <a
              key={link.href}
              className={`nav__link${isActive ? ' is-active' : ''}`}
              aria-current={isActive ? 'true' : undefined}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          )
        })}
      </div>

      <motion.button
        className="nav__group nav__theme-toggle"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        onClick={toggleTheme}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <span className="nav__theme-icon">{theme === 'light' ? <Moon /> : <Sun />}</span>
      </motion.button>
    </nav>
  )
}
