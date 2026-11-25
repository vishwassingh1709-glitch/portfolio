import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { profile } from '@/data';
import { useLocalTime } from '@/hooks/useLocalTime';
import { AvailabilityBadge } from './AvailabilityBadge';
import { Marquee } from './Marquee';
import { SocialLinks } from './SocialLinks';

function HeroVisual() {
  const { hero, role, location } = profile;
  const time = useLocalTime();
  const ringText = `${role} · ${hero.visual.tags.join(' · ')} · `.toUpperCase();

  return (
    <div className="relative w-full border border-ink bg-paper-deep p-3 md:p-4">
      {profile.availability.available && (
        <span className="stamp absolute -top-3 right-4 z-10 bg-paper text-accent-deep">
          Open to work
        </span>
      )}

      <div className="flex items-center justify-between gap-3">
        <span className="eyebrow text-ink/60">{hero.visual.figure}</span>
        <span className="eyebrow text-right text-ink/40">{hero.visual.caption}</span>
      </div>

      <div className="relative mt-3 aspect-[4/5] overflow-hidden border border-ink bg-night">
        <div className="absolute inset-y-0 left-0 w-2.5 bg-accent" aria-hidden="true" />
        <div className="halftone absolute inset-0 text-paper/[0.14]" aria-hidden="true" />

        <div
          className="absolute inset-x-0 top-1/2 h-px bg-paper/20"
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 left-1/2 w-px bg-paper/20"
          aria-hidden="true"
        />

        <svg
          viewBox="0 0 200 200"
          className="spin-slow absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <path
              id="hero-ring"
              d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
              fill="none"
            />
          </defs>
          <text
            className="font-mono"
            fontSize="7.6"
            letterSpacing="2.9"
            fill="#f1efe7"
            opacity="0.55"
          >
            <textPath href="#hero-ring">{ringText}</textPath>
          </text>
        </svg>

        <div className="absolute left-1/2 top-1/2 flex aspect-square w-[56%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent shadow-[inset_0_0_0_1px_rgba(241,239,231,0.4)]">
          <span
            className="halftone absolute inset-0 rounded-full text-ink/15"
            aria-hidden="true"
          />
          <span className="relative font-serif text-[clamp(4.2rem,9vw,7rem)] italic leading-none text-paper">
            V<span className="text-ink">.</span>
          </span>
        </div>

        <span
          className="absolute right-4 top-8 font-mono text-sm text-paper/30"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="absolute bottom-14 right-4 font-mono text-sm text-paper/30"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="absolute left-5 top-10 hidden font-mono text-[9px] uppercase tracking-[0.24em] text-paper/40 [writing-mode:vertical-rl] sm:block"
          aria-hidden="true"
        >
          {hero.visual.figure} — Portfolio
        </span>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-paper/20 bg-night/80 px-4 py-2.5">
          <span className="eyebrow text-paper/60">{location}</span>
          <span className="eyebrow text-paper/60">{time ? `${time} IST` : 'IST'}</span>
        </div>
      </div>

      <ul className="mt-3 flex flex-wrap items-center gap-1.5">
        {hero.visual.tags.map((tag) => (
          <li className="tag" key={tag}>
            {tag}
          </li>
        ))}
        <li className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">
          2026
        </li>
      </ul>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const { hero } = profile;

  return (
    <section id="home" className="relative">
      <div className="shell pt-28 pb-10 md:pt-36 md:pb-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <motion.div
              className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/15 pb-4"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="eyebrow flex flex-wrap items-center gap-2 text-ink/70">
                <span className="text-accent-deep">({hero.eyebrow})</span>
                <span aria-hidden="true" className="text-ink/30">
                  /
                </span>
                <span>{profile.location}</span>
              </p>
              <AvailabilityBadge />
            </motion.div>

            <h1
              aria-label={profile.name}
              className="mt-6 font-display text-[clamp(3rem,8.6vw,8.2rem)] uppercase leading-[0.82] tracking-[-0.02em]"
            >
              {hero.nameLines.map((line, index) => (
                <span className="block overflow-hidden pb-[0.06em]" key={line.text}>
                  <motion.span
                    className={`block ${line.outline ? 'text-outline' : ''}`}
                    initial={reduce ? false : { y: '110%' }}
                    animate={reduce ? undefined : { y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.1 + index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {line.text}
                    {line.dot && (
                      <span
                        className="ml-[0.06em] inline-block h-[0.15em] w-[0.15em] bg-accent"
                        aria-hidden="true"
                      />
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-6 max-w-xl font-serif text-[clamp(1.5rem,3.2vw,2.5rem)] italic leading-[1.12] text-accent-deep"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
            >
              {hero.headline}
            </motion.p>

            <motion.p
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft md:text-base"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42 }}
            >
              {hero.intro}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <a href={hero.primaryCta.href} className="btn btn-solid">
                {hero.primaryCta.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={hero.secondaryCta.href} className="btn btn-outline">
                {hero.secondaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </motion.div>

            <motion.div
              className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-5"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <span className="eyebrow text-ink/45">Elsewhere</span>
              <SocialLinks withLabels />
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-4 lg:pt-10"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      <Marquee items={hero.marquee} className="border-y border-ink" />
    </section>
  );
}
