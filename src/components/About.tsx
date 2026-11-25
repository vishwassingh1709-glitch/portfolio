import { profile, sections, sectionNumber } from '@/data';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';

function AboutGraphic() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-ink bg-paper-deep lg:aspect-[4/5]">
      <div className="paper-grid absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="absolute inset-y-0 left-0 w-2 bg-accent" aria-hidden="true" />
      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="eyebrow text-ink/55">Fig. 02</span>
          <span className="eyebrow text-ink/40">Self / 2026</span>
        </div>

        <div className="absolute left-1/2 top-1/2 aspect-square w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink">
          <span
            className="halftone absolute inset-0 rounded-full text-paper/20"
            aria-hidden="true"
          />
          <span className="absolute inset-0 flex items-center justify-center font-serif text-[clamp(3rem,6vw,5.5rem)] italic leading-none text-paper">
            V<span className="text-accent">.</span>
          </span>
        </div>

        <div className="relative mt-auto flex items-end justify-between gap-3">
          <div>
            <p className="eyebrow text-ink/45">Based in</p>
            <p className="mt-1 font-display text-lg uppercase leading-none">Prayagraj, India</p>
          </div>
          <span className="stamp bg-paper text-accent-deep">Student / Dev</span>
        </div>
      </div>
    </div>
  );
}

export function About() {
  const { heading, kicker, note } = sections.about;
  const { about } = profile;

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="shell">
        <SectionHeader
          id="about-title"
          index={sectionNumber('about')}
          heading={heading}
          kicker={kicker}
          note={note}
        />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <Reveal>
                <AboutGraphic />
              </Reveal>

              <dl className="border-t border-ink/20">
                <div className="border-b border-ink/15 py-3">
                  <dt className="eyebrow text-ink/45">Focus</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {about.focus.join(' · ')}
                  </dd>
                </div>
                <div className="border-b border-ink/15 py-3">
                  <dt className="eyebrow text-ink/45">Building</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {about.building}
                  </dd>
                </div>
                <div className="border-b border-ink/15 py-3">
                  <dt className="eyebrow text-ink/45">Based in</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {profile.location}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <div className="space-y-5 text-[15px] leading-[1.8] text-ink-soft md:text-base">
                {about.intro.map((paragraph, index) => (
                  <p key={paragraph} className={index === 0 ? 'dropcap' : undefined}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <blockquote className="my-10 border-l-2 border-accent pl-5 md:pl-6">
                <p className="font-serif text-[clamp(1.6rem,3.6vw,2.5rem)] italic leading-[1.2] text-ink">
                  &ldquo;{about.quote}&rdquo;
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="flex flex-wrap items-center gap-2 border-t border-ink/20 pt-5">
                <span className="eyebrow mr-1 text-ink/45">Interests</span>
                {about.interests.map((interest) => (
                  <span className="tag" key={interest}>
                    {interest}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-12">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-ink/20 pt-3">
                  <h3 className="eyebrow text-ink/60">The path so far</h3>
                  <span className="eyebrow text-ink/30">Ongoing</span>
                </div>
                <ol>
                  {about.timeline.map((step) => (
                    <li
                      className="grid gap-2 border-b border-ink/15 py-4 sm:grid-cols-[5.5rem_1fr] sm:gap-5"
                      key={step.title}
                    >
                      <span className="eyebrow pt-1 text-accent-deep">{step.label}</span>
                      <div>
                        <p className="font-display text-xl uppercase leading-none">
                          {step.title}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                          {step.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
