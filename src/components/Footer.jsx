import React, { useState, useEffect } from 'react';
import { greeting } from '../portfolio';
import { ArrowUp, Heart } from 'lucide-react';

export const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-div">
      <p className="footer-text">
        Made with <Heart size={16} fill="#eb4d4b" color="#eb4d4b" style={{ margin: '0 4px', display: 'inline-block', verticalAlign: 'middle' }} /> by{' '}
        <a href="https://github.com/saadpasta/developerFolio" target="_blank" rel="noopener noreferrer">
          {greeting.username}
        </a>
      </p>
      <p className="footer-subtext">Theme replicated from DeveloperFolio open-source template</p>

      {showScrollTop && (
        <button
          className="scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ArrowUp size={22} />
        </button>
      )}
    </footer>
  );
};
