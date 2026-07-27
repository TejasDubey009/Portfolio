import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { greeting, skillsSection, workExperiences, openSource, achievementSection, blogSection, talksSection, contactInfo } from '../portfolio';
import { Moon, Sun, Menu, X } from 'lucide-react';

export const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <a href="#greeting" className="logo">
        <span className="grey-color"> &lt;</span>
        <span className="logo-name">{greeting.username}</span>
        <span className="grey-color"> /&gt;</span>
      </a>

      <div className="header-right">
        <button className="menu-toggle-btn" onClick={toggleMenu} aria-label="Toggle navigation menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`menu ${menuOpen ? 'active' : ''}`}>
          {skillsSection.display && (
            <li>
              <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
            </li>
          )}
          {workExperiences.display && (
            <li>
              <a href="#experience" onClick={() => setMenuOpen(false)}>Work Experiences</a>
            </li>
          )}
          {openSource.display && (
            <li>
              <a href="#projects" onClick={() => setMenuOpen(false)}>Open Source</a>
            </li>
          )}
          {achievementSection.display && (
            <li>
              <a href="#achievements" onClick={() => setMenuOpen(false)}>Achievements</a>
            </li>
          )}
          {blogSection.display && (
            <li>
              <a href="#blogs" onClick={() => setMenuOpen(false)}>Blogs</a>
            </li>
          )}
          {talksSection.display && (
            <li>
              <a href="#talks" onClick={() => setMenuOpen(false)}>Talks</a>
            </li>
          )}
          {contactInfo.number && (
            <li>
              <a href="#contact" onClick={() => setMenuOpen(false)}>Contact Me</a>
            </li>
          )}
          <li className="theme-toggle-li">
            <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle light/dark theme">
              {isDark ? <Sun size={20} className="sun-icon" /> : <Moon size={20} className="moon-icon" />}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};
