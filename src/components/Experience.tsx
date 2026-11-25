import { ArrowUpRight } from 'lucide-react';
import { experience, sections, sectionNumber } from '@/data';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';

export function Experience() {
  const { heading, kicker, note } = sections.experience;

  if (experience.length === 0) return null;

  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div className="shell">
        <SectionHeader
          id="experience-title"
          index={sectionNumber('experience')}
          heading={heading}
          kicker={kicker}
          note={note}
        />

        <ol className="mt-10 border-t border-ink md:mt-14">
          {experience.map((entry, index) => (
            <Reveal key={entry.id} delay={Math.min(index * 0.04, 0.16)}>
              <li className="grid gap-4 border-b border-ink/20 py-8 md:grid-cols-12 md:gap-6">
                <div className="md:col-span-3">
                  <p className="eyebrow text-ink/45">{entry.period}</p>
                  <p className="eyebrow mt-2 text-ink/30">
                    ({String(index + 1).padStart(2, '0')})
                  </p>
                </div>

                <div className="md:col-span-6">
                  <p className="eyebrow text-accent-deep">{entry.role}</p>
                  <h3 className="mt-1 font-display text-2xl uppercase leading-tight">
                    {entry.organization}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {entry.description}
                  </p>
                  {entry.tech.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {entry.tech.map((tech) => (
                        <li className="tag" key={tech}>
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 md:col-span-3 md:justify-end">
                  {entry.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-line text-accent-deep"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
