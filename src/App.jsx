import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Stack from './components/Stack'
import Services from './components/Services'
import Projects from './components/Projects'
import Footer from './components/Footer'

export default function App() {
  // Anchors only exist once React has painted, so a deep link like /#stack has to
  // be resolved after mount rather than by the browser's own jump.
  useEffect(() => {
    const { hash } = window.location
    if (!hash) return
    // Wait for images to settle, otherwise late layout shifts move the target.
    const jump = () => document.querySelector(hash)?.scrollIntoView()
    if (document.readyState === 'complete') {
      jump()
      return
    }
    window.addEventListener('load', jump, { once: true })
    return () => window.removeEventListener('load', jump)
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Testimonials />
        <Stack />
        <Services />
        <Projects />
      </main>
      <Footer />
    </>
  )
}
