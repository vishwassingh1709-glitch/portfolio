import { isSectionVisible } from '@/data';
import { About } from '@/components/About';
import { Achievements } from '@/components/Achievements';
import { Contact } from '@/components/Contact';
import { Education } from '@/components/Education';
import { Experience } from '@/components/Experience';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import { Projects } from '@/components/Projects';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Skills } from '@/components/Skills';

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />

      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        {isSectionVisible('projects') && <Projects />}
        {isSectionVisible('about') && <About />}
        {isSectionVisible('skills') && <Skills />}
        {isSectionVisible('experience') && <Experience />}
        {isSectionVisible('achievements') && <Achievements />}
        {isSectionVisible('education') && <Education />}
        {isSectionVisible('contact') && <Contact />}
      </main>

      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
