import { AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { profile, projects, sections, sectionNumber } from '@/data';
import { ProjectDetails } from './ProjectDetails';
import { ProjectItem } from './ProjectItem';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';

export function Projects() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const { heading, kicker, note } = sections.projects;

  const activeIndex = projects.findIndex((project) => project.slug === activeSlug);
  const activeProject = activeIndex >= 0 ? projects[activeIndex] : null;
  const nextProject = activeProject
    ? projects[(activeIndex + 1) % projects.length]
    : null;

  const close = useCallback(() => setActiveSlug(null), []);

  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="shell">
        <SectionHeader
          id="projects-title"
          index={sectionNumber('projects')}
          heading={heading}
          kicker={kicker}
          note={note}
        />

        <div className="mt-10 md:mt-14">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index * 0.06, 0.18)}>
              <ProjectItem
                project={project}
                index={index}
                reversed={index % 2 === 1}
                onOpen={() => setActiveSlug(project.slug)}
              />
            </Reveal>
          ))}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/25 pt-4">
            <span className="eyebrow text-ink/45">
              {String(projects.length).padStart(2, '0')} projects — more in the workshop
            </span>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="link-line"
            >
              More on GitHub
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {activeProject && nextProject && (
            <ProjectDetails
              key="project-details"
              project={activeProject}
              index={activeIndex}
              nextProject={nextProject}
              onClose={close}
              onNavigate={setActiveSlug}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
}
