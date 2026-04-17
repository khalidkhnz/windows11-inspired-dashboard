export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  year: number;
  repo?: string;
  live?: string;
  highlights: string[];
};

export type Skill = {
  category: string;
  items: { name: string; level: number }[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  summary: string;
  stack: string[];
};

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export const owner = {
  name: "Khalid Khan",
  handle: "khalidkhnz",
  role: "Full-Stack Developer",
  location: "India",
  tagline:
    "I build end-to-end web products — crisp UIs, solid backends, happy users.",
  bio: `I'm a full-stack developer who likes to ship. My sweet spot is Next.js + TypeScript on the front, and Node/Go on the back. I care about performance, accessibility, and the little details that make software feel good to use.`,
  avatar: "https://utfs.io/f/23f924b7-7d78-454f-9702-f9e549169e8b-zbx71s.jpeg",
  email: "khankhalid1743@gmail.com",
  siteUrl: "https://www.khalidkhnz.in",
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/khalidkhnz", handle: "@khalidkhnz" },
  { label: "Twitter / X", href: "https://x.com/khalidkhnz", handle: "@khalidkhnz" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/khalidkhnz/",
    handle: "in/khalidkhnz",
  },
  { label: "Portfolio", href: "https://www.khalidkhnz.in", handle: "khalidkhnz.in" },
];

export const projects: Project[] = [
  {
    slug: "portfolio-v2",
    name: "Portfolio v2",
    tagline: "Personal portfolio — animated, minimal, fast.",
    description:
      "Second iteration of my personal site. Focused on tight motion, crisp typography, and Core Web Vitals.",
    tags: ["Next.js", "TypeScript", "GSAP", "Tailwind"],
    year: 2024,
    live: "https://khalidkhnz.vercel.app",
    highlights: [
      "Fully static, CDN-cached, sub-second TTI",
      "Hand-tuned GSAP page transitions",
      "Lighthouse 100 on performance & accessibility",
    ],
  },
  {
    slug: "sportjacks",
    name: "SportJacks",
    tagline: "Sportswear e-commerce storefront.",
    description:
      "A production e-commerce platform for a sportswear brand — catalog, cart, checkout, admin dashboard.",
    tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    year: 2024,
    live: "https://sportjacks.com",
    highlights: [
      "Headless storefront with instant product search",
      "Custom admin CMS for catalog + orders",
      "Razorpay + Stripe checkout integrations",
    ],
  },
  {
    slug: "hotel-deepali",
    name: "Hotel Deepali",
    tagline: "Boutique hotel marketing site.",
    description:
      "Marketing site for a boutique hotel — gallery, rooms, booking inquiry. Built for mobile-first conversion.",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    year: 2024,
    live: "https://deepali.vercel.app/",
    highlights: [
      "Gallery with progressive image loading",
      "WhatsApp booking inquiry flow",
      "Ships well under 100KB JS on first load",
    ],
  },
  {
    slug: "twitter-bot",
    name: "Twitter Bot",
    tagline: "Automated posting + analytics dashboard.",
    description:
      "A bot that drafts, schedules, and posts to X on a schedule — with a small dashboard to review analytics.",
    tags: ["Node.js", "TypeScript", "OpenAI", "X API"],
    year: 2024,
    live: "https://tw-dev.vercel.app",
    highlights: [
      "LLM-assisted content drafting",
      "Queue-based scheduler with retries",
      "Engagement analytics rollups",
    ],
  },
  {
    slug: "win11-dashboard",
    name: "Windows 11 Portfolio",
    tagline: "The thing you're looking at right now.",
    description:
      "A Windows 11 inspired desktop experience as a portfolio — real window management, start menu, apps, the works.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    year: 2024,
    repo: "https://github.com/khalidkhnz",
    highlights: [
      "Custom window manager (drag, z-order, snap, minimize)",
      "In-app portfolio apps — no iframes to broken sites",
      "All data lives in code — zero backend state",
    ],
  },
];

export const skills: Skill[] = [
  {
    category: "Frontend",
    items: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS", level: 95 },
      { name: "GSAP / Framer Motion", level: 85 },
      { name: "Accessibility (a11y)", level: 80 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 90 },
      { name: "PostgreSQL", level: 82 },
      { name: "MongoDB", level: 80 },
      { name: "REST & tRPC APIs", level: 88 },
      { name: "Auth / OAuth", level: 82 },
    ],
  },
  {
    category: "Tooling",
    items: [
      { name: "Git / GitHub", level: 92 },
      { name: "Docker", level: 75 },
      { name: "Vercel / AWS", level: 80 },
      { name: "CI/CD", level: 78 },
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "Full-Stack Developer",
    company: "Freelance & Contract",
    period: "2023 — Present",
    summary:
      "Shipped marketing sites, dashboards, and e-commerce for small businesses and startups. End-to-end ownership from design hand-off to deploy.",
    stack: ["Next.js", "TypeScript", "Node.js", "Postgres"],
  },
  {
    role: "Frontend Developer",
    company: "Felix Arts",
    period: "2022 — 2023",
    summary:
      "Built component libraries and marketing surfaces for agency clients. Focused on motion design and performance.",
    stack: ["React", "GSAP", "Next.js"],
  },
];

export const resume = {
  url: "/resume.pdf",
  updated: "2024-08-12",
  sizeLabel: "3.82 MB",
};
