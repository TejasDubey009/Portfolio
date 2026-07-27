import React from 'react';
import { workExperiences } from '../portfolio';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export const Experience = () => {
  if (!workExperiences.display) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="experience-section" id="experience">
      <motion.h1
        className="experience-heading"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Experiences
      </motion.h1>

      <motion.div
        className="experience-cards-div"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {workExperiences.experience.map((card, i) => {
          return (
            <motion.div
              key={i}
              className="experience-card"
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: '0 12px 30px rgba(134, 92, 255, 0.25)' }}
            >
              <div className="experience-card-header">
                <div className="experience-logo-div">
                  <img
                    className="experience-roundedimg"
                    src={card.companylogo}
                    alt={card.company}
                    onError={(e) => {
                      e.target.src = 'https://img.icons8.com/color/96/000000/briefcase.png';
                    }}
                  />
                </div>
                <div className="experience-header-text">
                  <h2 className="experience-role">{card.role}</h2>
                  <h3 className="experience-company">{card.company}</h3>
                </div>
              </div>

              <div className="experience-card-body">
                <div className="experience-duration">
                  <Calendar size={14} style={{ marginRight: '6px' }} />
                  {card.date}
                </div>

                <p className="experience-desc">{card.desc}</p>

                {card.descBullets && (
                  <ul className="experience-bullets">
                    {card.descBullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

