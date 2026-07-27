import React from 'react';
import { greeting } from '../portfolio';
import { SocialMedia } from './SocialMedia';
import { Hero3DCanvas } from './Hero3DCanvas';
import { ErrorBoundary } from './ErrorBoundary';
import { FileText, ArrowDownRight, Sparkles } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { soundFx } from '../utils/audio';

export const Greeting = ({ onOpenResume }) => {
  if (!greeting.displayGreeting) {
    return null;
  }

  // 3D Parallax Tilt state with Framer Motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

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
    <section className="greet-main cohesion-hero" id="greeting">
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
              <div className="hero-badge-row">
                <div className="hero-status-pill">
                  <span className="status-dot"></span>
                  <span>Open to select projects</span>
                </div>
                <div className="hero-3d-tag">
                  <Sparkles size={14} className="hero-sparkle" />
                  <span>3D WebGL Canvas</span>
                </div>
              </div>

              <span className="hero-meta-subtitle">
                TEJASWI DUBEY — SOFTWARE ENGINEER &amp; 3D SPECIALIST
              </span>

              <h1 className="greeting-text">
                Building digital experiences with <span className="serif-italic">depth</span> &amp; <span className="title-gradient">precision.</span>
              </h1>

              <p className="greeting-text-p">{greeting.subTitle}</p>

              <SocialMedia />

              <div className="button-greeting-div">
                <a
                  href="#projects"
                  className="main-button primary-cta-btn"
                  onClick={() => soundFx.playWarp()}
                >
                  <span>View Selected Works</span>
                  <ArrowDownRight size={18} />
                </a>

                {greeting.resumeLink && (
                  <motion.button
                    className="main-button resume-btn"
                    onClick={() => { soundFx.playWarp(); onOpenResume(); }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FileText size={18} style={{ marginRight: '8px' }} />
                    <span>View Resume</span>
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="greeting-image-div hero-3d-canvas-container"
            style={{ transform: 'translateZ(50px)' }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
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
