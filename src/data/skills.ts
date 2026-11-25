import type { SkillGroup } from './types';

/**
 * Add a skill by adding a string to the relevant group.
 * Add a new group by adding another object to this array.
 * Avoid inventing proficiency levels — this layout intentionally has none.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Languages',
    skills: ['Java', 'C', 'JavaScript', 'TypeScript', 'Python (basics)'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: ['React', 'HTML', 'CSS', 'Vite', 'Responsive UI'],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: ['Node.js', 'Express', 'REST APIs'],
  },
  {
    id: 'database',
    title: 'Database',
    skills: ['Supabase', 'Firebase'],
  },
  {
    id: 'tools',
    title: 'Tools',
    skills: ['Git', 'GitHub', 'Vercel', 'VS Code'],
  },
  {
    id: 'learning',
    title: 'Currently learning',
    note: 'An honest list — these are in progress, not mastered.',
    skills: ['Backend architecture', 'DSA patterns', 'TypeScript', 'API design'],
    highlight: true,
  },
];
