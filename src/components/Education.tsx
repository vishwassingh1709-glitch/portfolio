import { education, sections, sectionNumber } from '@/data';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';

export function Education() {
  const { heading, kicker, note } = sections.education;

  return (
    <section id="education" aria-labelledby="education-title" className="section">
      <div className="shell">
        <SectionHeader
          id="education-title"
          index={sectionNumber('education')}
          heading={heading}
          kicker={kicker}
          note={note}
        />

        <ol className="mt-10 border-t border-ink md:mt-14">
          {education.map((entry) => (
            <Reveal key={entry.id}>
              <li className="grid gap-8 border-b border-ink/20 py-8 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-5">
                  <p className="eyebrow text-accent-deep">{entry.status}</p>
                  <p className="eyebrow mt-2 text-ink/45">{entry.period}</p>
                  <h3 className="mt-3 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] uppercase leading-[0.95]">
                    {entry.institution}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft">{entry.location}</p>
                </div>

                <div className="lg:col-span-5">
                  <p className="eyebrow text-ink/45">Degree</p>
                  <p className="mt-1 font-display text-2xl uppercase leading-tight">
                    {entry.degree} — {entry.field}
                  </p>
                  {entry.notes.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-soft">
                      {entry.notes.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-1 w-1 shrink-0 bg-accent" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="lg:col-span-2">
                  {entry.coursework.length > 0 ? (
                    <>
                      <p className="eyebrow text-ink/45">Coursework</p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {entry.coursework.map((course) => (
                          <li className="tag" key={course}>
                            {course}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <div className="inline-flex border border-ink/25 px-3 py-2">
                      <span className="eyebrow text-ink/45">CSE / B.Tech</span>
                    </div>
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
