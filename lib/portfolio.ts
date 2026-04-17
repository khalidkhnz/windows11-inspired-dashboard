export type Project = {
  slug: string;
  name: string;
  role: string;
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
  name: "Mohd Khalid Khan",
  handle: "khalidkhnz",
  role: "Frontend Focused Full Stack Developer",
  location: "India",
  phone: "+91 8770649309",
  tagline:
    "Frontend focused Full Stack Developer across React, TypeScript, Java, Spring Boot, Blockchain and DLT.",
  bio: `Frontend focused Full Stack Developer with 5+ years of hands on experience building high performance UIs and scalable backends across fintech, AI, Blockchain, DLT, IoT, SaaS, and enterprise domains. Deep expertise in React and TypeScript on the front, Java and Spring Boot on the back, plus distributed ledger tech, event driven microservices on Kafka, and cloud native deployments on AWS and Azure with Docker and Kubernetes.`,
  avatar: "https://utfs.io/f/23f924b7-7d78-454f-9702-f9e549169e8b-zbx71s.jpeg",
  email: "eternalkhalidkhnz@gmail.com",
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
    slug: "defi_platform",
    name: "Decentralized Finance (DeFi) Trading Platform",
    role: "Blockchain Developer",
    tagline: "On chain swaps, liquidity pools, and off chain matching.",
    description:
      "A full stack DeFi trading platform with on chain token swaps and liquidity staking, plus off chain order matching and analytics.",
    tags: [
      "React",
      "TypeScript",
      "Web3.js",
      "Ethers.js",
      "Solidity",
      "Ethereum",
      "Spring Boot",
      "Kafka",
      "PostgreSQL",
      "Docker",
    ],
    year: 2024,
    highlights: [
      "React and TypeScript front end with Web3.js and Ethers.js (MetaMask), real time token price feeds, and swap and liquidity pool UIs in Tailwind",
      "Solidity ERC 20 swap and liquidity staking contracts on Ethereum; Spring Boot middleware for off chain order matching and indexing on PostgreSQL",
      "DLT based audit trail via on chain event logging, Kafka analytics pipeline, and Docker containerized deployment",
    ],
  },
  {
    slug: "dlt_supply_chain",
    name: "DLT Based Supply Chain Transparency Platform",
    role: "Full Stack Developer",
    tagline: "Hyperledger Fabric plus event driven traceability.",
    description:
      "A Distributed Ledger platform for immutable product lifecycle records, with an interactive dashboard for traceability and QR verification.",
    tags: [
      "Next.js",
      "TypeScript",
      "Material UI",
      "SCSS",
      "Hyperledger Fabric",
      "Java",
      "Spring Boot",
      "Kafka",
      "MongoDB",
      "Kubernetes",
    ],
    year: 2024,
    highlights: [
      "Next.js dashboard with Material UI and SCSS, interactive traceability timelines, and QR code product verification",
      "Hyperledger Fabric chaincode for immutable product lifecycle records; Java and Spring Boot API gateway bridging on chain data with MongoDB analytics",
      "Event driven architecture on Kafka for real time ledger sync; deployed with Docker and Kubernetes",
    ],
  },
  {
    slug: "ai_coding_platform",
    name: "AI Powered Collaborative Coding Platform",
    role: "Full Stack Developer",
    tagline: "Multi provider AI, real time collab, live execution.",
    description:
      "Large scale Next.js platform with 10+ AI providers, Liveblocks YJS CRDT collaborative editing, live code execution sandboxes, and SaaS billing.",
    tags: [
      "Next.js",
      "TypeScript",
      "React",
      "Redux",
      "Tailwind",
      "Framer Motion",
      "Monaco Editor",
      "Redis",
      "Kubernetes",
      "Python",
      "FastAPI",
      "Stripe",
    ],
    year: 2025,
    highlights: [
      "Next.js 14 platform with 10+ AI providers, real time collaborative editing via Liveblocks YJS CRDT and Monaco Editor",
      "Live code execution through CodeSandbox and E2B; Stripe and Razorpay billing; LiveKit video; Twilio and SendGrid integrations",
      "Deployed on GKE with Redis and polyglot persistence (MongoDB, PostgreSQL, Firestore); Python and FastAPI LLM routing gateway",
    ],
  },
  {
    slug: "ide_agent",
    name: "AI Powered IDE Extension and Agent",
    role: "Full Stack Developer",
    tagline: "VS Code extension with autonomous editing and voice.",
    description:
      "Production VS Code extension with a React 18 webview, autonomous editing, Puppeteer automation, Tree sitter parsing, and multi model AI.",
    tags: [
      "TypeScript",
      "React 18",
      "Framer Motion",
      "VS Code API",
      "Puppeteer",
      "MCP SDK",
      "Tree-sitter",
      "Stripe",
      "esbuild",
      "webpack",
    ],
    year: 2025,
    highlights: [
      "React 18 webview with Framer Motion; autonomous editing, Puppeteer automation, Tree sitter WASM AST parsing",
      "Multi model AI (Anthropic, OpenAI, Google, Mistral) via the MCP protocol",
      "Voice mode via LiveKit RTC, Stripe billing, cross platform builds via esbuild and webpack",
    ],
  },
  {
    slug: "ops_dashboard",
    name: "Enterprise Operations and Task Management Dashboard",
    role: "Frontend Lead",
    tagline: "Maps, charts, scanners, drag and drop boards.",
    description:
      "React 18 SPA with MUI v7, TanStack Table, drag and drop boards, maps and charts, barcode scanning, and rich test coverage.",
    tags: [
      "React 18",
      "Vite",
      "Material UI",
      "SCSS",
      "Zustand",
      "TanStack Query",
      "ApexCharts",
      "Google Maps",
      "Leaflet",
      "Vitest",
    ],
    year: 2024,
    highlights: [
      "MUI v7, Vite, SCSS, and Zustand foundation with TanStack Table, ApexCharts, Chart.js, Google Maps, and Leaflet",
      "Scandit barcode scanning, jsPDF exports, drag and drop boards, FullCalendar, TinyMCE",
      "TanStack Query, React Hook Form, Zod and Yup; Sentry monitoring; Vitest, Testing Library, and Husky",
    ],
  },
  {
    slug: "transport_platform",
    name: "Enterprise Transportation Management Platform",
    role: "Full Stack Developer",
    tagline: "Live routing, AG Grid, Java 21 and Spring Boot on EKS.",
    description:
      "Next.js 16 and React 19 front end with live Mapbox and Google Maps tracking on top of a Java 21, Spring Boot 3, PostgreSQL back end deployed to AWS EKS.",
    tags: [
      "Next.js",
      "TypeScript",
      "React 19",
      "Tailwind",
      "Mapbox GL",
      "AG Grid",
      "Playwright",
      "Java 21",
      "Spring Boot 3",
      "PostgreSQL",
      "Kubernetes",
    ],
    year: 2025,
    highlights: [
      "Mapbox GL and Google Maps live tracking, AG Grid, dnd kit route builder, Recharts, i18n across EN, ES, ZH",
      "Playwright plus axe core a11y testing across the critical flows",
      "Java 21, Spring Boot 3, Spring Security 6, JPA plus jOOQ back end on PostgreSQL and Flyway, EKS with Prometheus and Grafana Loki",
    ],
  },
  {
    slug: "digital_card_saas",
    name: "Digital Card and Invitation SaaS",
    role: "Full Stack Developer",
    tagline: "27 cinematic templates with GSAP and WebGL.",
    description:
      "Next.js 15 and React 19 SaaS with Drizzle and PostgreSQL plus Stripe, featuring 27 cinematic invitation templates with WebGL and particles.",
    tags: [
      "Next.js 15",
      "TypeScript",
      "React 19",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
      "Canvas API",
      "Drizzle ORM",
      "PostgreSQL",
      "Stripe",
    ],
    year: 2025,
    highlights: [
      "Drizzle ORM and PostgreSQL backend with Stripe powered billing and subscriptions",
      "27 cinematic templates built with GSAP and Framer Motion (canvas, particles, WebGL)",
      "RSVP management, analytics, and NFC or QR sharing",
    ],
  },
  {
    slug: "user_management",
    name: "Enterprise User Management Microservice",
    role: "Full Stack Developer",
    tagline: "RBAC, OTP, JWT, SSR and SSG.",
    description:
      "Next.js, Redux, and MUI front end plus a Java 9+, Spring Boot, Spring Security microservice with RBAC, OTP, and JWT.",
    tags: [
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
      "Material UI",
      "SCSS",
      "Java",
      "Spring Boot",
      "Spring Security",
      "MongoDB",
      "Docker",
    ],
    year: 2023,
    highlights: [
      "Next.js front end with SSR, SSG, and OG metadata; Redux Toolkit plus MUI with SCSS",
      "Java 9+, Spring Boot, Spring Security back end with RBAC, OTP auth, and JWT secured REST APIs",
      "Docker containerized microservice deployment",
    ],
  },
  {
    slug: "cloud_iot",
    name: "Cloud Security Dashboard and IoT Vehicle Tracker",
    role: "Full Stack Developer",
    tagline: "AWS management plus real time GPS over Kafka.",
    description:
      "Two related enterprise systems. A cloud ops dashboard for AWS and Ansible, and a real time IoT vehicle tracker with event driven GPS ingestion.",
    tags: [
      "React",
      "TypeScript",
      "Material UI",
      "Spring Boot",
      "Java",
      "Kafka",
      "Microservices",
      "Docker",
      "AWS",
    ],
    year: 2023,
    highlights: [
      "Cloud Ops: React (Vite) and MUI front end with a Spring Boot back end for AWS management and Ansible provisioning",
      "IoT Tracker: Next.js and React Native companion app with a Java plus Spring Boot microservice backbone",
      "Apache Kafka event driven GPS ingestion with dead letter queues",
    ],
  },
  {
    slug: "win11_dashboard",
    name: "Windows 11 Portfolio",
    role: "Creator",
    tagline: "The thing you are looking at right now.",
    description:
      "A faux operating system portfolio with real window management, a start menu, and themable Windows, macOS, and Linux variants. The one you are in.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    year: 2026,
    repo: "https://github.com/khalidkhnz",
    highlights: [
      "Custom window manager with drag, z order, snap hints, and minimize",
      "Three OS theme system with per component Custom mixer, persisted to localStorage",
      "In app portfolio apps with no iframes to broken sites. All data lives in code",
    ],
  },
];

export const skills: Skill[] = [
  {
    category: "Frontend",
    items: [
      { name: "TypeScript", level: 95 },
      { name: "React 18 / 19", level: 95 },
      { name: "Next.js", level: 95 },
      { name: "Tailwind CSS", level: 92 },
      { name: "SCSS and Material UI", level: 90 },
      { name: "Redux Toolkit and Zustand", level: 88 },
      { name: "GSAP and Framer Motion", level: 85 },
    ],
  },
  {
    category: "Backend and Java",
    items: [
      { name: "Java 9+ / 21", level: 90 },
      { name: "Spring Boot 3", level: 90 },
      { name: "Spring Security", level: 85 },
      { name: "JPA, Hibernate, jOOQ", level: 82 },
      { name: "Node, NestJS, Go", level: 82 },
    ],
  },
  {
    category: "Blockchain and DLT",
    items: [
      { name: "Solidity and Smart Contracts", level: 85 },
      { name: "Web3.js and Ethers.js", level: 85 },
      { name: "Ethereum and Hyperledger", level: 80 },
      { name: "Token Systems and dApps", level: 80 },
    ],
  },
  {
    category: "Architecture",
    items: [
      { name: "Microservices", level: 90 },
      { name: "Event Driven (Kafka)", level: 85 },
      { name: "REST APIs and WebSocket", level: 92 },
      { name: "SaaS, RBAC, JWT", level: 88 },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 85 },
      { name: "Redis", level: 80 },
      { name: "Drizzle and Prisma", level: 85 },
    ],
  },
  {
    category: "DevOps and Cloud",
    items: [
      { name: "Docker", level: 88 },
      { name: "Kubernetes (EKS, GKE)", level: 82 },
      { name: "AWS and Azure", level: 82 },
      { name: "CI/CD", level: 85 },
    ],
  },
  {
    category: "Testing",
    items: [
      { name: "Jest and Vitest", level: 88 },
      { name: "Playwright (E2E and a11y)", level: 82 },
      { name: "Testing Library and JUnit", level: 82 },
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "Frontend Focused Full Stack Developer",
    company: "Enterprise and SaaS (Contract and Full time)",
    period: "2021 to Present",
    summary:
      "5+ years shipping fintech, AI, Blockchain and DLT, IoT, SaaS, and enterprise platforms. React and TypeScript front ends on top of Java and Spring Boot microservices, event driven architectures on Kafka, and Kubernetes deployments on AWS and Azure.",
    stack: [
      "React",
      "TypeScript",
      "Next.js",
      "Java 21",
      "Spring Boot",
      "Kafka",
      "PostgreSQL",
      "Kubernetes",
    ],
  },
  {
    role: "Blockchain and DLT Developer",
    company: "Web3 Projects",
    period: "2022 to Present",
    summary:
      "Designed and shipped decentralized platforms including Solidity smart contracts, Web3 and Ethers.js wallet integrations, Hyperledger Fabric chaincode, and token based systems with cryptographic protocols.",
    stack: [
      "Solidity",
      "Ethereum",
      "Web3.js",
      "Ethers.js",
      "Hyperledger Fabric",
      "Spring Boot",
    ],
  },
];

export const education = {
  degree: "Bachelor of Technology (B.Tech) in Computer Science and Engineering",
  school: "RGPV University",
};

export const resume = {
  url: "/khalid/KHALID_KHAN_RESUME.pdf",
  /** HTML version of the same resume for previewing in browser. */
  htmlUrl: "/khalid/KHALID_KHAN_RESUME.html",
  updated: "2026-04-17",
  sizeLabel: "408 KB",
};
