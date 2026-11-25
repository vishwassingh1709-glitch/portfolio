import type { ProjectStatus } from '@/data';

export const projectStatusLabels: Record<ProjectStatus, string> = {
  live: 'Live',
  'in-progress': 'In progress',
  built: 'Built',
};

const dotStyles: Record<ProjectStatus, string> = {
  live: 'bg-accent',
  'in-progress': 'bg-ink',
  built: 'bg-ink/40',
};

const textStyles: Record<ProjectStatus, string> = {
  live: 'text-accent-deep',
  'in-progress': 'text-ink',
  built: 'text-ink/60',
};

interface StatusTagProps {
  status: ProjectStatus;
  className?: string;
}

export function StatusTag({ status, className = '' }: StatusTagProps) {
  return (
    <span className={`eyebrow inline-flex items-center gap-1.5 ${textStyles[status]} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[status]}`} aria-hidden="true" />
      {projectStatusLabels[status]}
    </span>
  );
}
