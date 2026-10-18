import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Offers from './components/Offers'
import Expertise from './components/Expertise'
import Stack from './components/Stack'
import Projects from './components/Projects'
import Footer from './components/Footer'

export default function App() {
  // Anchors only exist once React has painted, so a deep link like /#stack has to
  // be resolved after mount rather than by the browser's own jump.
  useEffect(() => {
    const { hash } = window.location
    if (!hash) return
    const scrollToTarget = () => {
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      })
    }
    if (document.readyState === 'complete') {
      scrollToTarget()
      // Secondary check after layout settles
      const timer = setTimeout(scrollToTarget, 300)
      return () => clearTimeout(timer)
    }
    window.addEventListener('load', scrollToTarget, { once: true })
    return () => window.removeEventListener('load', scrollToTarget)
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Offers />
        <Expertise />
        <Stack />
        <Projects />
      </main>
      <Footer />
    </>
  )
}
