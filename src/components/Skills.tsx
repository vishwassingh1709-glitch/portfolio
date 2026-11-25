import { sections, sectionNumber, skillGroups } from '@/data';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';

export function Skills() {
  const { heading, kicker, note } = sections.skills;

  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="shell">
        <SectionHeader
          id="skills-title"
          index={sectionNumber('skills')}
          heading={heading}
          kicker={kicker}
          note={note}
        />

        <div className="mt-10 border-t border-ink md:mt-14">
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} delay={Math.min(index * 0.04, 0.16)}>
              <div
                className={`grid gap-3 border-b border-ink/20 py-6 md:grid-cols-12 md:items-start md:gap-6 md:px-3 md:py-7 ${
                  group.highlight ? 'bg-paper-deep/70' : ''
                }`}
              >
                <span className="eyebrow text-ink/40 md:col-span-1">
                  ({String(index + 1).padStart(2, '0')})
                </span>

                <h3 className="font-display text-[clamp(1.7rem,3vw,2.6rem)] uppercase leading-[0.95] md:col-span-4">
                  {group.title}
                  {group.highlight && (
                    <span className="ml-2 inline-block border border-accent px-1.5 py-0.5 align-middle font-mono text-[9px] tracking-[0.14em] text-accent-deep">
                      Now
                    </span>
                  )}
                </h3>

                <div className="md:col-span-7">
                  <ul className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <li
                        className="inline-flex items-center border border-ink/25 px-2.5 py-1.5 font-mono text-[0.72rem] tracking-[0.02em] transition-colors"
                        key={skill}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                  {group.note && (
                    <p className="mt-3 text-xs leading-relaxed text-ink/45">{group.note}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="eyebrow mt-5 text-ink/40">
          No proficiency percentages — just what I use and what I am learning.
        </p>
      </div>
    </section>
  );
}
