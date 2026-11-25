import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data';
import { GithubIcon } from './Icons';
import { ProjectPoster } from './ProjectPoster';
import { StatusTag } from './StatusTag';

interface ProjectItemProps {
  project: Project;
  index: number;
  reversed: boolean;
  onOpen: () => void;
}

export function ProjectItem({ project, index, reversed, onOpen }: ProjectItemProps) {
  const number = String(index + 1).padStart(2, '0');
  const hasLinks = Boolean(project.links.live || project.links.github);

  return (
    <article className="group relative border-t border-ink/25">
      <div className="grid gap-6 py-8 md:py-10 lg:grid-cols-12 lg:gap-10">
        <div
          className={`lg:col-span-5 ${reversed ? 'lg:order-2' : ''}`}
        >
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            aria-label={`Open ${project.name} case study`}
            className="block w-full cursor-pointer overflow-hidden border border-ink/30 text-left"
          >
            <span className="block transition-transform duration-700 ease-out group-hover:scale-[1.025]">
              <ProjectPoster project={project} index={index} />
            </span>
          </button>
        </div>

        <div
          className={`flex flex-col justify-between lg:col-span-7 ${
            reversed ? 'lg:order-1' : ''
          }`}
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="eyebrow flex items-center gap-2 text-ink/55">
                ({number})
                <span className="h-px w-8 bg-ink/25" aria-hidden="true" />
              </span>
              <StatusTag status={project.status} />
            </div>

            <p className="eyebrow mt-3 text-ink/50">
              {project.category}
              {project.year && ` · ${project.year}`}
            </p>

            <h3 className="mt-2">
              <button
                type="button"
                onClick={onOpen}
                aria-haspopup="dialog"
                className="text-left font-display text-[clamp(2.5rem,5.2vw,4.4rem)] uppercase leading-[0.88] tracking-[-0.01em] transition-colors hover:text-accent-deep"
              >
                {project.name}
                <ArrowUpRight
                  className="ml-2 inline-block h-[0.42em] w-[0.42em] -translate-y-[0.35em] text-ink/30 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent group-hover:opacity-100"
                  aria-hidden="true"
                />
              </button>
            </h3>

            <p className="mt-3 text-lg leading-snug text-ink">{project.tagline}</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
              {project.description}
            </p>
          </div>

          <div className="mt-6">
            {project.tech.length > 0 ? (
              <ul className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <li className="tag" key={tech}>
                    {tech}
                  </li>
                ))}
              </ul>
            ) : (
              project.techNote && (
                <p className="max-w-md text-xs leading-relaxed text-ink/45">{project.techNote}</p>
              )
            )}

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={onOpen}
                aria-haspopup="dialog"
                className="group/case inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] underline decoration-ink/30 underline-offset-4 transition-colors hover:text-accent-deep hover:decoration-accent"
              >
                Read case study
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover/case:translate-x-0.5 group-hover/case:-translate-y-0.5"
                  aria-hidden="true"
                />
              </button>

              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 border border-ink/25 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  Live site
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 border border-ink/25 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <GithubIcon size={12} />
                  GitHub
                </a>
              )}
              {!hasLinks && (
                <span className="eyebrow text-ink/35">Repository link coming soon</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
