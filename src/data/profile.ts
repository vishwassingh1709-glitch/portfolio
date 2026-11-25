import type { Profile } from './types';

/**
 * Central profile configuration.
 * Everything about you lives here — name, links, hero copy, about copy and contact copy.
 */
export const profile: Profile = {
  name: 'Vishwas Pratap Singh',
  monogram: 'VS',
  role: 'Software Developer',
  tagline: 'Building the web, one idea at a time.',
  location: 'Prayagraj, IN',
  email: 'singhvishwaspratap236@gmail.com',
  availability: {
    available: true,
    label: 'Open to internships & collaborations',
  },
  links: {
    // TODO: replace with your exact GitHub profile URL if this one is not yours.
    github: 'https://github.com/vishwassingh1709-glitch',
    linkedin: 'https://www.linkedin.com/in/vishwas-singh1709',
  },
  seo: {
    title: 'Vishwas Pratap Singh — Software Developer',
    description:
      'Portfolio of Vishwas Pratap Singh — a computer science engineering student and software developer building web products with React, Node.js and Java.',
  },
  hero: {
    eyebrow: 'Portfolio — 2026',
    headline: 'Building the web, one idea at a time.',
    intro:
      'Computer Science Engineering student at United College of Engineering and Research, Prayagraj. I turn ideas into working software with React, Node.js and Java — and I am learning in public while I do it.',
    nameLines: [{ text: 'Vishwas', dot: true }, { text: 'Pratap Singh', outline: true }],
    primaryCta: { label: 'View projects', href: '#projects' },
    secondaryCta: { label: 'Contact me', href: '#contact' },
    marquee: [
      'Software developer',
      'React & Node.js',
      'Java & DSA',
      'Open to collaborate',
      'Prayagraj, India',
    ],
    visual: {
      figure: 'Fig. 01',
      caption: 'Developer, student, builder.',
      tags: ['Java', 'React', 'Node.js'],
    },
  },
  about: {
    intro: [
      'I am Vishwas Pratap Singh, a Computer Science Engineering student at United College of Engineering and Research, Prayagraj. I care about software that solves an everyday problem well — not software that only looks good in a screenshot.',
      'Most of my time goes into Java and data structures, front-end work with React, and backend experiments with Node.js. I learn by building small things, breaking them, and rebuilding them properly. MindSync, ExpiryMitra and HIGHFLIER are the result of that loop.',
    ],
    quote: 'If it solves a real problem, it is worth building.',
    focus: ['DSA & problem solving', 'Backend architecture', 'TypeScript'],
    building: 'HIGHFLIER — an e-commerce backend, currently in development.',
    interests: [
      'Software development',
      'Frontend engineering',
      'Backend systems',
      'Java',
      'Data structures',
      'Real-world products',
    ],
    timeline: [
      {
        label: 'Foundations',
        title: 'Java & data structures',
        detail: 'Building problem-solving habits with Java, algorithms and consistent practice.',
      },
      {
        label: 'Interface',
        title: 'React & the frontend',
        detail: 'Learning to build responsive, accessible interfaces with HTML, CSS, JavaScript and React.',
      },
      {
        label: 'Full-stack',
        title: 'MindSync & Node.js',
        detail: 'Working across the stack — React on the front, Node.js and Supabase behind it.',
      },
      {
        label: 'Now',
        title: 'HIGHFLIER backend',
        detail: 'Going deeper into backend engineering with an e-commerce project in progress.',
      },
    ],
  },
  contact: {
    heading: ["Let's", 'build', 'something.'],
    note: 'Have a project, a role, or an idea worth testing? I am open to internships, freelance work and collaborations. Email is the fastest way to reach me.',
  },
  footer: {
    note: 'Designed and built from scratch — no templates.',
  },
};
