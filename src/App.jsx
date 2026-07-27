import React from 'react';
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

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <Greeting />
        <Skills />
        <Proficiency />
        <Education />
        <Experience />
        <OpenSource />
        <Achievements />
        <Blogs />
        <Talks />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
