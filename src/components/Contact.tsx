import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { profile, sections, sectionNumber } from '@/data';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useLocalTime } from '@/hooks/useLocalTime';
import { AvailabilityBadge } from './AvailabilityBadge';
import { GithubIcon, LinkedinIcon } from './Icons';

export function Contact() {
  const { kicker, note } = sections.contact;
  const { status, copy } = useCopyToClipboard();
  const time = useLocalTime();
  const [firstLine, secondLine, ...tail] = profile.contact.heading;

  const directLinks = [
    {
      label: 'LinkedIn',
      value: 'vishwas-singh1709',
      href: profile.links.linkedin,
      external: true,
      Icon: LinkedinIcon,
    },
    {
      label: 'GitHub',
      value: 'vishwassingh1709-glitch',
      href: profile.links.github,
      external: true,
      Icon: GithubIcon,
    },
    {
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      external: false,
      Icon: Mail,
    },
  ];

  const copyLabel =
    status === 'copied' ? 'Copied' : status === 'error' ? 'Copy failed' : 'Copy email';

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-night text-paper"
    >
      <div className="shell py-20 md:py-28">
        <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-2 border-t border-paper/20 pt-4">
          <span className="eyebrow flex items-center gap-2 text-paper/70">
            <span className="h-2 w-2 bg-accent" aria-hidden="true" />({sectionNumber('contact')}){' '}
            {kicker}
          </span>
          <span className="eyebrow max-w-md text-paper/40">{note}</span>
        </div>

        <h2
          id="contact-title"
          className="mt-8 font-display text-[clamp(3.2rem,10.5vw,8.5rem)] uppercase leading-[0.84] tracking-[-0.02em]"
        >
          <span className="block text-outline-light">{firstLine}</span>
          <span className="block">
            {secondLine}
            {tail.length > 0 && (
              <span className="mt-1 block font-serif text-[0.76em] font-normal normal-case italic leading-[1] tracking-normal text-accent">
                {tail.join(' ')}
              </span>
            )}
          </span>
        </h2>

        <div className="mt-12 grid gap-12 border-t border-paper/15 pt-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="max-w-xl text-base leading-relaxed text-paper/70">
              {profile.contact.note}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={`mailto:${profile.email}`} className="btn btn-light">
                Email me
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => copy(profile.email)}
                className="btn btn-ghost-light"
              >
                {status === 'copied' ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
                {copyLabel}
              </button>
            </div>
            <p className="sr-only" role="status" aria-live="polite">
              {status === 'copied'
                ? 'Email address copied to clipboard.'
                : status === 'error'
                  ? 'Could not copy the address. Please select it manually.'
                  : ''}
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="mt-7 inline-block max-w-full break-all border-b border-paper/25 pb-1 font-mono text-sm text-paper/80 transition-colors hover:border-accent hover:text-accent sm:text-base"
            >
              {profile.email}
            </a>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="eyebrow text-paper/40">Direct lines</p>
            <ul className="mt-3 divide-y divide-paper/15 border-y border-paper/15">
              {directLinks.map(({ label, value, href, external, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                    className="group flex items-center justify-between gap-4 py-3.5"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <Icon
                        size={15}
                        className="shrink-0 text-paper/45 transition-colors group-hover:text-accent"
                      />
                      <span className="min-w-0">
                        <span className="eyebrow block text-paper/40">{label}</span>
                        <span className="mt-0.5 block truncate text-sm text-paper/80 transition-colors group-hover:text-paper">
                          {value}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-paper/35 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-4">
              <AvailabilityBadge tone="dark" />
              <div className="flex items-center justify-between gap-3 border-t border-paper/15 pt-4">
                <span className="eyebrow text-paper/35">Local time</span>
                <span className="eyebrow text-paper/60">{time || '--:--'} IST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
