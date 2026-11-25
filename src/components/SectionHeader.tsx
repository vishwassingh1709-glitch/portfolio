import { Reveal } from './Reveal';

interface SectionHeaderProps {
  index: string;
  kicker: string;
  heading: string;
  note?: string;
  id?: string;
}

export function SectionHeader({ index, kicker, heading, note, id }: SectionHeaderProps) {
  const words = heading.trim().split(/\s+/);
  const hasAccentWord = words.length > 1;
  const lastWord = hasAccentWord ? words[words.length - 1] : heading;
  const lead = hasAccentWord ? words.slice(0, -1).join(' ') : '';

  return (
    <Reveal>
      <header className="border-t border-ink/60 pt-4">
        <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-2">
          <span className="eyebrow flex items-center gap-2 text-ink/70">
            <span className="h-2 w-2 bg-accent" aria-hidden="true" />({index}) {kicker}
          </span>
          {note && <span className="eyebrow max-w-md text-ink/45">{note}</span>}
        </div>
        <h2
          id={id}
          className="mt-5 font-display uppercase leading-[0.86] tracking-[-0.015em] text-[clamp(2.7rem,7vw,6.2rem)]"
        >
          {lead && <>{lead} </>}
          <span className="font-serif text-[1.04em] font-normal normal-case italic tracking-[-0.02em] text-accent-deep">
            {lastWord}
          </span>
        </h2>
      </header>
    </Reveal>
  );
}
