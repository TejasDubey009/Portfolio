import React from 'react';
import { openSource } from '../portfolio';
import { GitFork, Star, FolderGit2, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const OpenSource = () => {
  if (!openSource.display) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="cohesion-section" id="projects">
      <div className="section-header">
        <div className="cohesion-tag">
          <span>PORTFOLIO SHOWCASE</span>
        </div>
        <h2 className="cohesion-section-title">
          Featured Engineering &amp; <br />
          <span className="title-gradient">Open Source Works</span>
        </h2>
      </div>

      <motion.div
        className="repo-cards-div-main bento-grid-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {openSource.projects.map((repo, idx) => {
          const isFeatured = idx === 0;
          return (
            <motion.div
              key={repo.id}
              className={`repo-card-div bento-card ${isFeatured ? 'bento-featured' : ''}`}
              variants={cardVariants}
              whileHover={{ y: -8 }}
            >
              <div className="bento-card-top">
                <FolderGit2 size={24} className="repo-icon" />
                {isFeatured && <span className="bento-badge">Featured Case Study</span>}
                <a
                  className="bento-external-arrow"
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Github Repository"
                >
                  <ArrowUpRight size={18} />
                </a>
              </div>

              <div className="bento-card-body">
                <a
                  className="repo-name"
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
                <p className="repo-description">{repo.description}</p>
              </div>

              <div className="repo-stats">
                <div className="repo-left-stat">
                  {repo.languages && repo.languages.length > 0 && (
                    <span className="language-badge">
                      <span
                        className="language-color-dot"
                        style={{ backgroundColor: repo.languages[0].color || '#38bdf8' }}
                      ></span>
                      {repo.languages[0].name}
                    </span>
                  )}
                  <span className="stat-item">
                    <Star size={15} style={{ marginRight: '4px' }} />
                    {repo.stars.toLocaleString()}
                  </span>
                  <span className="stat-item">
                    <GitFork size={15} style={{ marginRight: '4px' }} />
                    {repo.forks.toLocaleString()}
                  </span>
                </div>

                <div className="repo-right-stat">
                  <span className="disk-usage">{Math.round(repo.diskUsage / 1000)} KB</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="more-projects-div">
        <motion.a
          className="main-button cohesion-outline-btn"
          href={`https://github.com/${openSource.githubUserName}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>View Full GitHub Portfolio</span>
          <ArrowUpRight size={18} />
        </motion.a>
      </div>
    </section>
  );
};
