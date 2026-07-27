import React from 'react';
import { techStack } from '../portfolio';
import { motion } from 'framer-motion';

export const Proficiency = () => {
  if (!techStack.display || !techStack.viewSkillBars) {
    return null;
  }

  return (
    <section className="proficiency-section">
      <motion.div
        className="skills-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="skills-bar">
          <h1 className="skills-heading">Proficiency</h1>
          {techStack.experience.map((exp, i) => {
            return (
              <div key={i} className="skill">
                <div className="skill-name">{exp.Stack}</div>
                <div className="meter">
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: exp.progressPercentage }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 * i, ease: 'easeInOut' }}
                  ></motion.span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

