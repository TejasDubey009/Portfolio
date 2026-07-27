import React from 'react';
import { openSource } from '../portfolio';
import { GitFork, Star, FolderGit2, ExternalLink } from 'lucide-react';
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
    <section className="main" id="projects">
      <motion.h1
        className="project-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Open Source Projects
      </motion.h1>

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
              whileHover={{ y: -8, boxShadow: '0 16px 36px rgba(99, 102, 241, 0.3)' }}
            >
              <div className="repo-name-div">
                <FolderGit2 size={24} className="repo-icon" />
                <a
                  className="repo-name"
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
                {isFeatured && <span className="bento-badge">Featured</span>}
              </div>
              <p className="repo-description">{repo.description}</p>
              <div className="repo-stats">
                <div className="repo-left-stat">
                  {repo.languages && repo.languages.length > 0 && (
                    <span className="language-badge">
                      <span
                        className="language-color-dot"
                        style={{ backgroundColor: repo.languages[0].color || '#f1e05a' }}
                      ></span>
                      {repo.languages[0].name}
                    </span>
                  )}
                  <span className="stat-item">
                    <Star size={16} style={{ marginRight: '4px' }} />
                    {repo.stars.toLocaleString()}
                  </span>
                  <span className="stat-item">
                    <GitFork size={16} style={{ marginRight: '4px' }} />
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
          className="main-button"
          href={`https://github.com/${openSource.githubUserName}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          More Projects
          <ExternalLink size={16} style={{ marginLeft: '8px' }} />
        </motion.a>
      </div>
    </section>
  );
};

