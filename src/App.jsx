import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Greeting } from './components/Greeting';
import { Skills } from './components/Skills';
import { Proficiency } from './components/Proficiency';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { OpenSource } from './components/OpenSource';
import { Achievements } from './components/Achievements';
import { Blogs } from './components/Blogs';
import { Talks } from './components/Talks';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

import { CommandPalette } from './components/CommandPalette';
import { ParticleCursor } from './components/ParticleCursor';
import { ResumeModal } from './components/ResumeModal';
import { ArcadeGame } from './components/ArcadeGame';

function App() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [arcadeOpen, setArcadeOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="App">
        {/* Custom Particle Follower Cursor */}
        <ParticleCursor />

        {/* Navigation Header */}
        <Header onOpenCmd={() => setCmdOpen(true)} />

        {/* Main Content Sections */}
        <main>
          <Greeting
            onOpenResume={() => setResumeOpen(true)}
            onOpenArcade={() => setArcadeOpen(true)}
          />
          <Skills />
          <Proficiency />
          <Education />
          <Experience />
          <OpenSource />
          <Achievements />
          <Blogs />
          <Talks />
          <Contact />
        </main>
        
        <Footer />

        {/* Interactive Modals */}
        <CommandPalette
          isOpen={cmdOpen}
          onClose={() => setCmdOpen(false)}
          onOpenArcade={() => setArcadeOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
        />

        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />

        <ArcadeGame
          isOpen={arcadeOpen}
          onClose={() => setArcadeOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
