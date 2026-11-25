import type { Project } from '@/data';
import { projectStatusLabels } from './StatusTag';

interface ProjectPosterProps {
  project: Project;
  index: number;
}

function OrbitArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <rect width="400" height="300" fill="#101010" />
      <g fill="none" stroke="#f1efe7" strokeOpacity="0.26">
        <circle cx="168" cy="146" r="112" />
        <circle cx="168" cy="146" r="82" />
        <circle cx="168" cy="146" r="52" />
      </g>
      <path d="M0 236 H400" stroke="#f1efe7" strokeOpacity="0.22" />
      <path
        d="M36 300 L36 0"
        stroke="#f1efe7"
        strokeOpacity="0.14"
        strokeDasharray="3 8"
      />
      <circle cx="258" cy="96" r="46" fill="#d72626" />
      <circle cx="168" cy="146" r="5" fill="#f1efe7" />
    </svg>
  );
}

function GridArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <rect width="400" height="300" fill="#e5e1d7" />
      <g stroke="#111111" strokeOpacity="0.16">
        <path d="M0 60 H400 M0 120 H400 M0 180 H400 M0 240 H400" />
        <path d="M80 0 V300 M160 0 V300 M240 0 V300 M320 0 V300" />
      </g>
      <rect
        x="232"
        y="34"
        width="118"
        height="232"
        fill="#d72626"
        transform="rotate(7 291 150)"
      />
      <rect
        x="48"
        y="86"
        width="150"
        height="128"
        fill="none"
        stroke="#111111"
        strokeWidth="1.5"
      />
      <circle cx="203" cy="86" r="7" fill="#111111" />
      <path d="M0 285 H400" stroke="#111111" strokeWidth="1.5" strokeOpacity="0.5" />
    </svg>
  );
}

function StackArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <rect width="400" height="300" fill="#d72626" />
      <g fill="#f1efe7">
        <rect x="42" y="38" width="316" height="32" />
        <rect x="42" y="86" width="248" height="32" fillOpacity="0.85" />
        <rect x="42" y="134" width="286" height="32" fillOpacity="0.7" />
        <rect x="42" y="182" width="192" height="32" fillOpacity="0.55" />
      </g>
      <path
        d="M42 250 H358"
        stroke="#101010"
        strokeWidth="2"
        strokeDasharray="6 6"
        strokeOpacity="0.55"
      />
      <circle cx="342" cy="250" r="14" fill="#101010" />
    </svg>
  );
}

const theme = {
  orbit: {
    wrapper: 'bg-night text-paper',
    meta: 'text-paper/60',
    mark: 'text-paper',
    overlay: 'text-paper/10',
  },
  grid: {
    wrapper: 'bg-paper-deep text-ink',
    meta: 'text-ink/55',
    mark: 'text-ink',
    overlay: 'text-ink/20',
  },
  stack: {
    wrapper: 'bg-accent text-paper',
    meta: 'text-paper/75',
    mark: 'text-paper',
    overlay: 'text-ink/15',
  },
} as const;

/** Generated editorial poster — no screenshots, no invented UI. */
export function ProjectPoster({ project, index }: ProjectPosterProps) {
  const styles = theme[project.poster];
  const number = String(index + 1).padStart(2, '0');

  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden ${styles.wrapper}`}>
      {project.poster === 'orbit' && <OrbitArt />}
      {project.poster === 'grid' && <GridArt />}
      {project.poster === 'stack' && <StackArt />}

      <div className={`halftone absolute inset-0 ${styles.overlay}`} aria-hidden="true" />

      <span className={`eyebrow absolute left-4 top-4 ${styles.meta}`}>
        Case study / {number}
      </span>

      <span className="stamp absolute right-4 top-4 border-ink/70 bg-paper text-ink">
        {projectStatusLabels[project.status]}
      </span>

      <span
        className={`absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.16em] ${styles.meta}`}
      >
        {project.category}
      </span>

      <span
        aria-hidden="true"
        className={`absolute bottom-2 right-4 select-none font-serif text-[clamp(3.5rem,7vw,6rem)] italic leading-[0.75] ${styles.mark}`}
      >
        {project.mark}
      </span>
    </div>
  );
}
