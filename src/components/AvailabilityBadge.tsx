import { profile } from '@/data';

interface AvailabilityBadgeProps {
  className?: string;
  tone?: 'light' | 'dark';
}

export function AvailabilityBadge({ className = '', tone = 'light' }: AvailabilityBadgeProps) {
  const { available, label } = profile.availability;

  return (
    <span
      className={`inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${
        tone === 'dark'
          ? 'border-paper/25 text-paper/80'
          : 'border-ink/25 bg-paper/60 text-ink/75'
      } ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        {available && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
        )}
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
            available ? 'bg-accent' : 'bg-ink/40'
          }`}
        />
      </span>
      {label}
    </span>
  );
}
