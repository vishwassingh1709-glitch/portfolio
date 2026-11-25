import type { ContentSectionId, SectionSetting } from './types';

/**
 * Section visibility and headings.
 * `enabled: false` hides the section and its navigation item even if it has content.
 * Empty sections (experience, achievements) are hidden automatically.
 */
export const sections: Record<ContentSectionId, SectionSetting> = {
  projects: {
    enabled: true,
    heading: 'Selected work',
    kicker: 'Projects & builds',
    note: 'Real projects — shipped, live and in progress.',
  },
  about: {
    enabled: true,
    heading: 'The developer behind the work',
    kicker: 'About',
    note: 'Background, focus and what I am building now.',
  },
  skills: {
    enabled: true,
    heading: 'The toolkit',
    kicker: 'Skills & stack',
    note: 'Tools I build with — no percentages, no rankings.',
  },
  experience: {
    enabled: true,
    heading: 'Where I have worked',
    kicker: 'Experience',
    note: 'Internships, training and collaborations.',
  },
  achievements: {
    enabled: true,
    heading: 'Proof of effort',
    kicker: 'Achievements',
    note: 'Hackathons, awards and certifications.',
  },
  education: {
    enabled: true,
    heading: 'Foundations',
    kicker: 'Education',
    note: 'Where the fundamentals come from.',
  },
  contact: {
    enabled: true,
    heading: 'Get in touch',
    kicker: 'Contact',
    note: 'Open to internships, freelance and collaborations.',
  },
};
