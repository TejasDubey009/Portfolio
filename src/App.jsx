import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Greeting } from './components/Greeting';
import { ServicesBento } from './components/ServicesBento';
import { OpenSource } from './components/OpenSource';
import { Skills } from './components/Skills';
import { Proficiency } from './components/Proficiency';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Blogs } from './components/Blogs';
import { Talks } from './components/Talks';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

import { CommandPalette } from './components/CommandPalette';
import { ParticleCursor } from './components/ParticleCursor';
import { ResumeModal } from './components/ResumeModal';

function App() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="App">
        {/* Custom Particle Follower Cursor */}
        <ParticleCursor />

        {/* Cohesion Floating Glass Pill Navigation */}
        <Header onOpenCmd={() => setCmdOpen(true)} />

        {/* Main Cohesion Flow Sections */}
        <main>
          <Greeting onOpenResume={() => setResumeOpen(true)} />
          <ServicesBento />
          <OpenSource />
          <Skills />
          <Proficiency />
          <Education />
          <Experience />
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
          onOpenResume={() => setResumeOpen(true)}
        />

        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
