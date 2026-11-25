import { ArrowUpRight } from 'lucide-react';
import { achievements, sections, sectionNumber } from '@/data';
import type { AchievementType } from '@/data';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';

const typeLabels: Record<AchievementType, string> = {
  hackathon: 'Hackathon',
  award: 'Award',
  certification: 'Certification',
  academic: 'Academic',
  competition: 'Competition',
  other: 'Other',
};

export function Achievements() {
  const { heading, kicker, note } = sections.achievements;

  if (achievements.length === 0) return null;

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-title"
      className="section"
    >
      <div className="shell">
        <SectionHeader
          id="achievements-title"
          index={sectionNumber('achievements')}
          heading={heading}
          kicker={kicker}
          note={note}
        />

        <ol className="mt-10 border-t border-ink md:mt-14">
          {achievements.map((entry, index) => (
            <Reveal key={entry.id} delay={Math.min(index * 0.04, 0.16)}>
              <li className="grid gap-3 border-b border-ink/20 py-6 md:grid-cols-12 md:items-center md:gap-6">
                <span className="font-display text-lg text-ink/30 md:col-span-1">
                  ({String(index + 1).padStart(2, '0')})
                </span>

                <div className="md:col-span-7">
                  <div className="eyebrow flex flex-wrap items-center gap-2">
                    <span className="text-accent-deep">{typeLabels[entry.type]}</span>
                    {entry.year && (
                      <>
                        <span className="text-ink/25" aria-hidden="true">
                          /
                        </span>
                        <span className="text-ink/45">{entry.year}</span>
                      </>
                    )}
                  </div>
                  <h3 className="mt-1 font-display text-[clamp(1.5rem,3vw,2.4rem)] uppercase leading-none">
                    {entry.title}
                  </h3>
                  {entry.issuer && (
                    <p className="mt-1 text-sm text-ink-soft">{entry.issuer}</p>
                  )}
                </div>

                {entry.detail && (
                  <p className="text-sm leading-relaxed text-ink-soft md:col-span-3">
                    {entry.detail}
                  </p>
                )}

                <div className="flex md:col-span-1 md:justify-end">
                  {entry.link && (
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`Open ${entry.title}`}
                      className="inline-flex h-9 w-9 items-center justify-center border border-ink/25 transition-colors hover:bg-ink hover:text-paper"
                    >
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
