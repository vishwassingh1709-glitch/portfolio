import { Asterisk } from 'lucide-react';
import type { CSSProperties } from 'react';

interface MarqueeProps {
  items: string[];
  speed?: number;
  theme?: 'accent' | 'dark' | 'paper';
  reverse?: boolean;
  className?: string;
}

const themes = {
  accent: 'bg-accent text-paper',
  dark: 'bg-night text-paper',
  paper: 'bg-paper-deep text-ink',
};

export function Marquee({
  items,
  speed = 34,
  theme = 'accent',
  reverse = false,
  className = '',
}: MarqueeProps) {
  return (
    <div
      className={`marquee ${themes[theme]} ${className}`}
      aria-hidden="true"
      data-direction={reverse ? 'reverse' : undefined}
    >
      <div
        className="marquee-track py-3"
        style={{ '--marquee-duration': `${speed}s` } as CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {items.map((item) => (
              <div className="flex items-center gap-[1.75rem]" key={`${copy}-${item}`}>
                <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em]">
                  {item}
                </span>
                <Asterisk className="h-3 w-3 shrink-0 opacity-60" strokeWidth={2.5} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
