import React from 'react';
import { greeting } from '../portfolio';
import { SocialMedia } from './SocialMedia';
import { Hero3DCanvas } from './Hero3DCanvas';
import { ErrorBoundary } from './ErrorBoundary';
import { FileText, Send, Sparkles } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export const Greeting = () => {
  if (!greeting.displayGreeting) {
    return null;
  }

  // 3D Parallax Tilt state with Framer Motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="greet-main" id="greeting">
      <motion.div
        className="greeting-3d-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="greeting-main">
          <motion.div
            className="greeting-text-div"
            style={{ transform: 'translateZ(30px)' }}
          >
            <div>
              <div className="hero-3d-tag">
                <Sparkles size={16} className="hero-sparkle" />
                <span>Interactive 3D WebGL Hero</span>
              </div>
              <h1 className="greeting-text">
                {greeting.title}
                <motion.span
                  className="wave-emoji"
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 1 }}
                  style={{ display: 'inline-block' }}
                >
                  👋
                </motion.span>
              </h1>
              <p className="greeting-text-p">{greeting.subTitle}</p>
              
              <SocialMedia />

              <div className="button-greeting-div">
                {contactInfoHref()}
                {greeting.resumeLink && (
                  <motion.a
                    className="main-button resume-btn"
                    href={greeting.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FileText size={18} style={{ marginRight: '8px' }} />
                    See My Resume
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="greeting-image-div hero-3d-canvas-container"
            style={{ transform: 'translateZ(50px)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <ErrorBoundary>
              <Hero3DCanvas />
            </ErrorBoundary>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

function contactInfoHref() {
  return (
    <motion.a
      className="main-button contact-btn"
      href="#contact"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Send size={18} style={{ marginRight: '8px' }} />
      Contact Me
    </motion.a>
  );
}


