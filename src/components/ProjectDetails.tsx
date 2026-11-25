import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { profile } from '@/data';
import type { Project } from '@/data';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { GithubIcon } from './Icons';
import { ProjectPoster } from './ProjectPoster';
import { StatusTag } from './StatusTag';

interface ProjectDetailsProps {
  project: Project;
  index: number;
  nextProject: Project;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-8">
      <h3 className="eyebrow text-ink/55">{title}</h3>
      <ol className="mt-3 border-t border-ink/20">
        {items.map((item, index) => (
          <li
            key={item}
            className="flex gap-4 border-b border-ink/15 py-3 text-sm leading-relaxed text-ink-soft"
          >
            <span className="mt-0.5 font-mono text-[10px] text-accent-deep">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ProjectDetails({
  project,
  index,
  nextProject,
  onClose,
  onNavigate,
}: ProjectDetailsProps) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(true);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const previous =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const getFocusable = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);

    const initial = panel.querySelector<HTMLElement>('[data-autofocus]');
    (initial ?? getFocusable()[0])?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previous?.focus();
    };
  }, [onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project.slug]);

  const hasDetails =
    project.features.length > 0 ||
    project.challenges.length > 0 ||
    project.learnings.length > 0;

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Hello about ${project.name}`,
  )}`;

  return (
    <>
      <motion.div
        key="backdrop"
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-[60] cursor-default bg-night/60 backdrop-blur-[3px]"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />

      <motion.div
        key="panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="fixed inset-y-0 right-0 z-[60] flex h-dvh w-full max-w-[720px] flex-col border-l border-ink bg-paper"
        initial={reduce ? false : { x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between gap-4 border-b border-ink/20 px-5 py-3 sm:px-8">
          <span className="eyebrow text-ink/55">
            Case study — {String(index + 1).padStart(2, '0')}
          </span>
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            aria-label="Close project details"
            className="inline-flex h-10 w-10 items-center justify-center border border-ink/30 transition-colors hover:bg-ink hover:text-paper"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overscroll-contain px-5 pb-14 pt-6 sm:px-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="eyebrow text-accent-deep">{project.category}</span>
            <StatusTag status={project.status} />
          </div>

          <h2
            id="project-dialog-title"
            className="mt-3 font-display text-[clamp(2.7rem,6vw,4.4rem)] uppercase leading-[0.9] tracking-[-0.01em]"
          >
            {project.name}
          </h2>
          <p className="mt-4 font-serif text-2xl italic leading-snug text-accent-deep sm:text-[1.7rem]">
            {project.tagline}
          </p>

          <div className="mt-6 border border-ink/25">
            <ProjectPoster project={project} index={index} />
          </div>

          <div className="mt-6 border-t border-ink/20 pt-5">
            <p className="text-[15px] leading-relaxed text-ink-soft">{project.description}</p>
          </div>

          <section className="mt-7">
            <h3 className="eyebrow text-ink/55">Stack</h3>
            {project.tech.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <li className="tag" key={tech}>
                    {tech}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm leading-relaxed text-ink/50">{project.techNote}</p>
            )}
          </section>

          {(project.links.live || project.links.github) && (
            <div className="mt-7 flex flex-wrap gap-2.5">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-solid"
                >
                  Visit live site
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-outline"
                >
                  <GithubIcon size={14} />
                  View on GitHub
                </a>
              )}
            </div>
          )}

          {project.features.length > 0 && (
            <DetailList title="Features" items={project.features} />
          )}
          {project.challenges.length > 0 && (
            <DetailList title="Challenges" items={project.challenges} />
          )}
          {project.learnings.length > 0 && (
            <DetailList title="What I learned" items={project.learnings} />
          )}

          {!hasDetails && (
            <div className="mt-8 border border-ink/25 bg-paper-deep/50 p-5">
              <p className="eyebrow text-accent-deep">Case study in progress</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                This project is still being documented. Features, challenges and lessons
                learned will be added here as the write-up is completed.
              </p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink/20 pt-5">
            {nextProject.slug !== project.slug ? (
              <button
                type="button"
                onClick={() => onNavigate(nextProject.slug)}
                className="group flex items-center gap-3 text-left"
              >
                <span className="eyebrow text-ink/45">Next</span>
                <span className="font-display text-xl uppercase leading-none">
                  {nextProject.name}
                </span>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            ) : (
              <span className="eyebrow text-ink/45">That is the whole archive — for now</span>
            )}

            <a href={mailto} className="link-line text-accent-deep">
              Discuss a project
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}
