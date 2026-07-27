import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { greeting, skillsSection, workExperiences, openSource, contactInfo } from '../portfolio';
import { Moon, Sun, Menu, X, Command, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const Header = ({ onOpenCmd }) => {
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleToggleSound = () => {
    const newState = soundFx.toggleSound();
    setSoundEnabled(newState);
  };

  return (
    <div className="header-wrapper">
      <header className="header">
        <a href="#greeting" className="logo">
          <span className="logo-name">{greeting.username}</span>
          <span className="logo-dot">.</span>
        </a>

        <div className="header-right">
          <button className="menu-toggle-btn" onClick={toggleMenu} aria-label="Toggle navigation menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <ul className={`menu ${menuOpen ? 'active' : ''}`}>
            <li>
              <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            </li>
            {openSource.display && (
              <li>
                <a href="#projects" onClick={() => setMenuOpen(false)}>Works</a>
              </li>
            )}
            {skillsSection.display && (
              <li>
                <a href="#skills" onClick={() => setMenuOpen(false)}>Stack</a>
              </li>
            )}
            {workExperiences.display && (
              <li>
                <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
              </li>
            )}
            {contactInfo.number && (
              <li>
                <a href="#contact" onClick={() => setMenuOpen(false)} className="nav-contact-pill">
                  <span>Let's Talk</span>
                  <Sparkles size={14} className="pill-sparkle" />
                </a>
              </li>
            )}

            <li className="header-action-li">
              <button className="header-action-btn" onClick={onOpenCmd} title="Command Terminal (Cmd + K)">
                <Command size={14} />
                <span className="cmd-k-badge">⌘K</span>
              </button>
            </li>

            <li className="header-action-li">
              <button className="header-action-btn" onClick={handleToggleSound} title="Toggle Audio Sound FX">
                {soundEnabled ? <Volume2 size={16} className="volume-on" /> : <VolumeX size={16} className="volume-off" />}
              </button>
            </li>

            <li className="theme-toggle-li">
              <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle light/dark theme">
                {isDark ? <Sun size={18} className="sun-icon" /> : <Moon size={18} className="moon-icon" />}
              </button>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};
