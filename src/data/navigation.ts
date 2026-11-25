import type { NavItem } from './types';

/**
 * Navigation order. Sections that are disabled or empty are removed
 * automatically, and the remaining items are renumbered (01, 02, …).
 */
export const navItems: NavItem[] = [
  { id: 'home', label: 'Index' },
  { id: 'projects', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
