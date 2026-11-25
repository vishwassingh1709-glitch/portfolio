import type { Achievement } from './types';

/**
 * Hackathons, awards, certifications, academic results, competitions.
 * The section and its navigation link stay hidden while this array is empty.
 * Only add things that actually happened.
 *
 * Example entry:
 * {
 *   id: 'example-hackathon',
 *   title: 'Hackathon name — position',
 *   issuer: 'Organiser',
 *   year: '2026',
 *   type: 'hackathon',
 *   detail: 'Optional one-line context.',
 *   link: 'https://…',
 * }
 */
export const achievements: Achievement[] = [];
