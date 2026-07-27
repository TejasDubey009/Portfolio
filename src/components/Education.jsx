import React from 'react';
import { educationInfo } from '../portfolio';
import { GraduationCap, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export const Education = () => {
  if (!educationInfo.display) {
    return null;
  }

  return (
    <section className="education-section" id="education">
      <motion.h1
        className="education-heading"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Education
      </motion.h1>

      <div className="education-card-container">
        {educationInfo.schools.map((school, index) => {
          return (
            <motion.div
              key={index}
              className="education-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(134, 92, 255, 0.2)' }}
            >
              <div className="education-card-left">
                {school.logo ? (
                  <img
                    className="education-roundedimg"
                    src={school.logo}
                    alt={school.schoolName}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="education-logo-placeholder">
                    <GraduationCap size={40} />
                  </div>
                )}
              </div>
              <div className="education-card-right">
                <h2 className="education-text-school">{school.schoolName}</h2>
                <div className="education-text-details">
                  <h3 className="education-text-subHeader">{school.subHeader}</h3>
                  <p className="education-text-duration">
                    <Calendar size={14} style={{ marginRight: '6px' }} />
                    {school.duration}
                  </p>
                </div>
                <p className="education-text-desc">{school.desc}</p>

                {school.descBullets && (
                  <div className="education-text-bullets">
                    <ul>
                      {school.descBullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

