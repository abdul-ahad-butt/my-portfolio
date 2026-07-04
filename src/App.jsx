import { useState } from 'react';
import './index.css';
import Navbar     from './components/Navbar';
import Hero       from './components/Hero';
import About      from './components/About';
import Projects   from './components/Projects';
import Experience from './components/Experience';
import Contact    from './components/Contact';
import Footer     from './components/Footer';
import HireMeModal from './components/HireMeModal';

export default function App() {
  const [isHireMeOpen, setIsHireMeOpen] = useState(false);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar onHireMeClick={() => setIsHireMeOpen(true)} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <HireMeModal isOpen={isHireMeOpen} onClose={() => setIsHireMeOpen(false)} />
    </div>
  );
}
