import React, { useState, useEffect } from 'react';
import { Search, Terminal, Sparkles, X, ArrowRight, Zap, Code, ShieldCheck, Mail, FileText } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const CommandPalette = ({ isOpen, onClose, onOpenArcade, onOpenResume }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands = [
    { id: 'hero', title: 'Go to Hero Section', icon: Sparkles, action: () => scrollTo('#greeting') },
    { id: 'skills', title: 'View Technical Skills', icon: Code, action: () => scrollTo('#skills') },
    { id: 'experience', title: 'Work Experience', icon: Zap, action: () => scrollTo('#experience') },
    { id: 'projects', title: 'Open Source Projects (Bento Grid)', icon: Terminal, action: () => scrollTo('#projects') },
    { id: 'contact', title: 'Contact Me & Reveal Number', icon: Mail, action: () => scrollTo('#contact') },
    { id: 'resume', title: 'View & Download Resume PDF', icon: FileText, action: () => { onOpenResume(); onClose(); } },
    { id: 'arcade', title: 'Play Retro 3D Arcade Game 🎮', icon: Sparkles, action: () => { onOpenArcade(); onClose(); } },
    { id: 'github', title: 'Open GitHub Profile', icon: Terminal, action: () => window.open('https://github.com/TejasDubey009', '_blank') }
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase())
  );

  const scrollTo = (id) => {
    soundFx.playWarp();
    onClose();
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        soundFx.playClick();
        if (isOpen) onClose();
        else onClose(true);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="cmd-palette-backdrop" onClick={onClose}>
      <div className="cmd-palette-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-header">
          <Search size={20} className="cmd-search-icon" />
          <input
            type="text"
            className="cmd-input"
            placeholder="Type a command or search section (e.g. skills, arcade, resume)..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            autoFocus
          />
          <button className="cmd-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="cmd-list">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const IconComp = cmd.icon;
              return (
                <div
                  key={cmd.id}
                  className={`cmd-item ${idx === selectedIndex ? 'selected' : ''}`}
                  onClick={cmd.action}
                  onMouseEnter={() => { soundFx.playHover(); setSelectedIndex(idx); }}
                >
                  <div className="cmd-item-left">
                    <IconComp size={18} className="cmd-item-icon" />
                    <span>{cmd.title}</span>
                  </div>
                  <ArrowRight size={16} className="cmd-arrow" />
                </div>
              );
            })
          ) : (
            <div className="cmd-empty">No commands found for "{query}"</div>
          )}
        </div>

        <div className="cmd-footer">
          <div className="cmd-shortcut">
            <span>Navigation Terminal</span>
          </div>
          <div className="cmd-shortcut">
            <kbd>ESC</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
};
