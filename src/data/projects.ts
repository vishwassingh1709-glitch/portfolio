import type { Project } from './types';

/**
 * Add a project by appending an object to this array.
 * Order here is the order on the page — the UI numbers them automatically.
 * Leave `features`, `challenges` and `learnings` empty if you don't have
 * real details yet; the case-study view handles that gracefully.
 */
export const projects: Project[] = [
  {
    slug: 'mindsync',
    name: 'MindSync',
    mark: 'MS',
    tagline: 'A student mental-wellness platform.',
    description:
      'A mental-wellness platform for students, built end to end. The interface runs on React, TypeScript and Vite, while the backend uses Node.js and Express with Supabase for data and the Groq API as part of the stack.',
    category: 'Full-stack · Wellness',
    status: 'live',
    tech: ['React', 'TypeScript', 'Vite', 'Node.js', 'Express', 'Supabase', 'Groq API'],
    links: {
      live: 'https://mind-sync-wellbeing-platform.vercel.app/login',
      github: 'https://github.com/shivam-coder567/MindSync-Wellbeing-Platform',
    },
    poster: 'orbit',
    features: [],
    challenges: [],
    learnings: [],
  },
  {
    slug: 'expirymitra',
    name: 'ExpiryMitra',
    mark: 'EM',
    tagline: 'Smart inventory and expiry tracking for shopkeepers.',
    description:
      'An inventory and expiry-tracking solution designed for shopkeepers who need to know what is on the shelf and what is about to expire. Delivered as a progressive web app with vanilla JavaScript and Firebase.',
    category: 'Frontend · PWA',
    status: 'built',
    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase', 'PWA'],
    links: {},
    poster: 'grid',
    features: [],
    challenges: [],
    learnings: [],
  },
  {
    slug: 'highflier',
    name: 'HIGHFLIER',
    mark: 'HF',
    tagline: 'An e-commerce backend, in progress.',
    description:
      'An e-commerce backend project currently under development. The goal is to design the data model, APIs and server-side logic that real storefronts depend on — and document the decisions as they happen.',
    category: 'Backend · E-commerce',
    status: 'in-progress',
    tech: [],
    techNote: 'The stack is being finalised as the project progresses — check back as the case study grows.',
    links: {},
    poster: 'stack',
    features: [],
    challenges: [],
    learnings: [],
  },
];
