import type { ExperienceEntry } from './types';

/**
 * Internships, training, freelance work, college experience, collaborations.
 * The section and its navigation link stay hidden while this array is empty.
 *
 * Example entry:
 * {
 *   id: 'example-internship',
 *   organization: 'Company name',
 *   role: 'Frontend Developer Intern',
 *   period: 'Jun 2026 — Aug 2026',
 *   description: 'One or two honest sentences about what you worked on.',
 *   tech: ['React', 'TypeScript'],
 *   links: [{ label: 'Certificate', href: 'https://…' }],
 * }
 */
export const experience: ExperienceEntry[] = [];
