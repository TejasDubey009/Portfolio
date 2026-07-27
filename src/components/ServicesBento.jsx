import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Layout, Rocket, ArrowUpRight } from 'lucide-react';

export const ServicesBento = () => {
  const services = [
    {
      num: '01',
      title: 'Full Stack Architecture',
      subtitle: 'Designing resilient cloud backends, clean API contracts, and scalable React architectures.',
      icon: Code2,
      tag: 'Node.js • React • REST APIs',
      highlight: '#818cf8'
    },
    {
      num: '02',
      title: 'Interactive 3D WebGL',
      subtitle: 'Building custom Three.js WebGL scenes, shader animations, and real-time canvas graphics.',
      icon: Cpu,
      tag: 'Three.js • WebGL • Shaders',
      highlight: '#c084fc'
    },
    {
      num: '03',
      title: 'Interface & Design Systems',
      subtitle: 'Authoring glassmorphic design tokens, fluid micro-interactions, and accessible UI frameworks.',
      icon: Layout,
      tag: 'UI/UX • Design Tokens • Motion',
      highlight: '#38bdf8'
    },
    {
      num: '04',
      title: 'Performance Optimization',
      subtitle: 'Optimizing LCP delivery, Rollup code splitting, sub-300ms Vite builds, and 60 FPS render loops.',
      icon: Rocket,
      tag: 'Vite • Core Web Vitals • 60 FPS',
      highlight: '#34d399'
    }
  ];

  return (
    <section className="cohesion-section" id="services">
      <div className="section-header">
        <div className="cohesion-tag">
          <span>CORE COMPETENCIES</span>
        </div>
        <h2 className="cohesion-section-title">
          Architecting systems built for <br />
          <span className="serif-italic">scale</span> &amp; <span className="title-gradient">performance.</span>
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
                  <IconComp size={20} style={{ color: item.highlight }} />
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
