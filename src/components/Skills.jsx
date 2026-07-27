import React from 'react';
import { skillsSection } from '../portfolio';
import { SkillsIllustration } from '../assets/svg/SkillsIllustration';
import { motion } from 'framer-motion';
import {
  FileCode,
  Palette,
  Flame,
  Code,
  Atom,
  Server,
  Zap,
  Box,
  Database,
  Terminal,
  Container,
  Cpu
} from 'lucide-react';

const iconMap = {
  FileCode: FileCode,
  Palette: Palette,
  Flame: Flame,
  Code: Code,
  Atom: Atom,
  Server: Server,
  Zap: Zap,
  Box: Box,
  Database: Database,
  Terminal: Terminal,
  Container: Container
};

export const Skills = () => {
  if (!skillsSection.display) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.6, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section className="main" id="skills">
      <div className="skills-main-div">
        <motion.div
          className="skills-image-div"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <SkillsIllustration />
        </motion.div>

        <motion.div
          className="skills-text-div"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="skills-heading">{skillsSection.title}</h1>
          <p className="subTitle skills-text-subtitle">{skillsSection.subTitle}</p>

          <div className="software-skills-main-div">
            <motion.ul
              className="dev-icons"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {skillsSection.softwareSkills.map((skills, i) => {
                const IconComp = iconMap[skills.iconName] || Cpu;
                return (
                  <motion.li
                    key={i}
                    className="software-skill-inline"
                    name={skills.skillName}
                    variants={itemVariants}
                    whileHover={{ scale: 1.25, rotate: 5 }}
                  >
                    <span
                      className="skill-icon-wrapper"
                      style={{ color: skills.color }}
                      title={skills.skillName}
                    >
                      <IconComp size={36} />
                      <span className="skill-name-tooltip">{skills.skillName}</span>
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>

          <div>
            {skillsSection.skills.map((skillSentence, i) => {
              return (
                <motion.p
                  key={i}
                  className="subTitle skills-text"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  {skillSentence}
                </motion.p>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

