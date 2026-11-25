import { achievements } from './achievements';
import { education } from './education';
import { experience } from './experience';
import { navItems } from './navigation';
import { profile } from './profile';
import { projects } from './projects';
import { sections } from './sections';
import { skillGroups } from './skills';
import type { ContentSectionId, NavItem } from './types';

const contentCount: Record<ContentSectionId, number> = {
  projects: projects.length,
  about: profile.about.intro.length,
  skills: skillGroups.length,
  experience: experience.length,
  achievements: achievements.length,
  education: education.length,
  contact: 1,
};

export function isSectionVisible(id: ContentSectionId): boolean {
  return sections[id].enabled && contentCount[id] > 0;
}

export const visibleNavItems: NavItem[] = navItems.filter(
  (item) => item.id === 'home' || isSectionVisible(item.id),
);

export const contentNavItems: NavItem[] = visibleNavItems.filter(
  (item) => item.id !== 'home',
);

export const visibleSectionIds: string[] = visibleNavItems.map((item) => item.id);

/** Sequential number for a section, e.g. "01", "02" — gaps are never shown. */
export function sectionNumber(id: ContentSectionId): string {
  const index = contentNavItems.findIndex((item) => item.id === id);
  return index >= 0 ? String(index + 1).padStart(2, '0') : '00';
}

export function isSectionId(id: string): id is ContentSectionId {
  return id in sections;
}

export { achievements, education, experience, navItems, profile, projects, sections, skillGroups };
export type * from './types';
