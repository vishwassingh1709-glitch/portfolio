import type { ProjectStatus } from '@/data';

export const projectStatusLabels: Record<ProjectStatus, string> = {
  live: 'Live',
  'in-progress': 'In progress',
  built: 'Built',
};
