import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Layout, Rocket, ArrowUpRight } from 'lucide-react';

export const ServicesBento = () => {
  const services = [
    {
      num: '01',
      title: 'Full Stack Architecture',
      subtitle: 'Scalable cloud backends, RESTful APIs, and robust data pipelines using Node.js & React.',
      icon: Code2,
      tag: 'Node • React • APIs',
      highlight: '#6366f1'
    },
    {
      num: '02',
      title: '3D WebGL & Canvas',
      subtitle: 'Interactive 3D WebGL scenes, particle engines, Three.js shaders, and dynamic canvas rendering.',
      icon: Cpu,
      tag: 'Three.js • WebGL • Shaders',
      highlight: '#a855f7'
    },
    {
      num: '03',
      title: 'Modern UI/UX Systems',
      subtitle: 'Glassmorphic design tokens, fluid CSS typography, Framer Motion, and micro-interactions.',
      icon: Layout,
      tag: 'Framer • Glassmorphism • UI',
      highlight: '#06b6d4'
    },
    {
      num: '04',
      title: 'High Performance & CWV',
      subtitle: 'Rollup code splitting, sub-300ms Vite build optimizations, LCP rendering, and 60 FPS graphics.',
      icon: Rocket,
      tag: 'Vite • Speed • 60 FPS',
      highlight: '#10b981'
    }
  ];

  return (
    <section className="cohesion-section" id="services">
      <div className="section-header">
        <div className="cohesion-tag">
          <span>OUR CAPABILITIES</span>
        </div>
        <h2 className="cohesion-section-title">
          Designing &amp; building <br />
          <span className="serif-italic">tailored</span> <span className="title-gradient">digital products.</span>
        </h2>
      </div>

      <div className="services-bento-grid">
        {services.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <motion.div
              key={idx}
              className="service-bento-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              style={{ '--card-glow': item.highlight }}
            >
              <div className="service-card-top">
                <span className="service-num">{item.num}</span>
                <div className="service-icon-box">
                  <IconComp size={22} style={{ color: item.highlight }} />
                </div>
              </div>

              <div className="service-card-body">
                <h3 className="service-title">{item.title}</h3>
                <p className="service-subtitle">{item.subtitle}</p>
              </div>

              <div className="service-card-footer">
                <span className="service-tag">{item.tag}</span>
                <div className="service-arrow">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
