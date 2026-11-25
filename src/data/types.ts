export type ContentSectionId =
  | 'projects'
  | 'about'
  | 'skills'
  | 'experience'
  | 'achievements'
  | 'education'
  | 'contact';

export type NavSectionId = 'home' | ContentSectionId;

export interface NavItem {
  id: NavSectionId;
  label: string;
}

export interface SectionSetting {
  /** Set to false to remove the section from the page and the navigation. */
  enabled: boolean;
  /** Rendered by SectionHeader. The last word is typeset in serif italic. */
  heading: string;
  kicker: string;
  note?: string;
}

export interface HeadlineLine {
  text: string;
  outline?: boolean;
  /** Renders a red period after the line. */
  dot?: boolean;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  monogram: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  availability: {
    available: boolean;
    label: string;
  };
  links: {
    github: string;
    linkedin: string;
  };
  seo: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    intro: string;
    nameLines: HeadlineLine[];
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
    marquee: string[];
    visual: {
      figure: string;
      caption: string;
      tags: string[];
    };
  };
  about: {
    intro: string[];
    quote: string;
    focus: string[];
    building: string;
    interests: string[];
    timeline: Array<{
      label: string;
      title: string;
      detail: string;
    }>;
  };
  contact: {
    heading: string[];
    note: string;
  };
  footer: {
    note: string;
  };
}

export type ProjectStatus = 'live' | 'in-progress' | 'built';

export type PosterVariant = 'orbit' | 'grid' | 'stack';

export interface Project {
  slug: string;
  name: string;
  /** Two-letter mark used on the generated project poster. */
  mark: string;
  tagline: string;
  description: string;
  category: string;
  year?: string;
  status: ProjectStatus;
  tech: string[];
  /** Shown instead of the tech list when the stack is not final yet. */
  techNote?: string;
  links: {
    live?: string;
    github?: string;
  };
  poster: PosterVariant;
  /** Optional. Leave empty until you have real details — the UI handles empty arrays. */
  features: string[];
  challenges: string[];
  learnings: string[];
}

export interface SkillGroup {
  id: string;
  title: string;
  note?: string;
  skills: string[];
  highlight?: boolean;
}

export interface ExperienceEntry {
  id: string;
  organization: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
  links: Array<{ label: string; href: string }>;
}

export type AchievementType =
  | 'hackathon'
  | 'award'
  | 'certification'
  | 'academic'
  | 'competition'
  | 'other';

export interface Achievement {
  id: string;
  title: string;
  issuer?: string;
  year?: string;
  type: AchievementType;
  detail?: string;
  link?: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  period: string;
  status: string;
  notes: string[];
  coursework: string[];
}
