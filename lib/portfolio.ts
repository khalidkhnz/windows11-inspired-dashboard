/** Stable sort: entries with a live URL surface first; original order is preserved within each group. */
export function sortLiveFirst<T extends { live?: string }>(list: readonly T[]): T[] {
  return list
    .map((p, i) => ({ p, i }))
    .sort((a, b) => {
      const aLive = a.p.live ? 0 : 1;
      const bLive = b.p.live ? 0 : 1;
      if (aLive !== bLive) return aLive - bLive;
      return a.i - b.i;
    })
    .map(({ p }) => p);
}

/** Hand-curated headline slugs, displayed in this exact order at the top. */
export const FEATURED_PROJECT_SLUGS = [
  "buildify_app_builder",
  "jobs_board",
  "prism_social",
  "ecom_sass",
] as const;

/** Slugs to push to the bottom of the list. */
export const DEFEATURED_PROJECT_SLUGS = ["avis_next"] as const;

/**
 * Display order:
 *   1. FEATURED_PROJECT_SLUGS (in given order)
 *   2. Remaining projects with a live URL (original declaration order)
 *   3. Remaining projects without a live URL (original declaration order)
 *   4. DEFEATURED_PROJECT_SLUGS (in given order)
 */
export function sortProjectsForDisplay<T extends { slug: string; live?: string }>(
  list: readonly T[],
): T[] {
  const featured = FEATURED_PROJECT_SLUGS as readonly string[];
  const defeatured = DEFEATURED_PROJECT_SLUGS as readonly string[];
  const bySlug = new Map(list.map((p) => [p.slug, p] as const));

  const head = featured.map((slug) => bySlug.get(slug)).filter((p): p is T => !!p);
  const tail = defeatured.map((slug) => bySlug.get(slug)).filter((p): p is T => !!p);

  const middle = list.filter(
    (p) => !featured.includes(p.slug) && !defeatured.includes(p.slug),
  );
  const middleLiveFirst = sortLiveFirst(middle);

  return [...head, ...middleLiveFirst, ...tail];
}

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
  {
    label: "Instagram",
    href: "https://instagram.com/khalid.khnz",
    handle: "@khalid.khnz",
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
  {
    slug: "context_man",
    name: "Context Manager MCP Server",
    role: "Creator",
    tagline: "MCP server for project context, skills, and prompt templates.",
    description:
      "A Model Context Protocol server that gives AI assistants structured access to project plans, coding guidelines, skills, code snippets, prompt templates, and a catalog of 40+ techstacks and 29 patterns. Ships CLI, REST API, and MCP tools.",
    tags: [
      "TypeScript",
      "Node.js",
      "MCP SDK",
      "Express",
      "MongoDB",
      "Mongoose",
      "Handlebars",
      "Commander",
      "Docker",
      "Vitest",
    ],
    year: 2026,
    highlights: [
      "Three transports in one binary: stdio MCP, HTTP/SSE MCP, and Express REST API on port 7777",
      "Handlebars based prompt templates with variable substitution, full text search, and per content type version history",
      "Seeded catalog of 42 techstack templates and 29 reusable skills with Docker Compose for one shot setup",
    ],
  },
  {
    slug: "avis_next",
    name: "Avis Media",
    role: "Frontend Developer",
    tagline: "Cinematic Next.js studio site with Locomotive Scroll and GSAP.",
    description:
      "An immersive single page studio site built with Next.js 14, Locomotive Scroll, GSAP, Framer Motion, and SCSS. Custom preloader, cursor effects, and smooth scrolled sections.",
    tags: [
      "Next.js 14",
      "TypeScript",
      "React 18",
      "GSAP",
      "Framer Motion",
      "Locomotive Scroll",
      "Tailwind CSS",
      "SCSS",
    ],
    year: 2024,
    live: "https://avismedia.in/",
    highlights: [
      "Locomotive Scroll powered smooth scrolling on top of Next.js App Router",
      "Animated preloader, landing, services, projects, and contact sections with GSAP and Framer Motion",
      "Pure component architecture with SCSS modules for fully scoped styling",
    ],
  },
  {
    slug: "ecom_sass",
    name: "Khalid Store",
    role: "Full Stack Developer",
    tagline: "Next.js 16, Drizzle ORM, Auth.js, Razorpay storefront.",
    description:
      "A production grade ecommerce SaaS on Next.js 16 and React 19 with a Drizzle Postgres backend, Auth.js v5, Razorpay payments, Drizzle Admin, and a full shadcn/ui storefront with cart, checkout, wishlist, and admin panel.",
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Drizzle ORM",
      "PostgreSQL",
      "Auth.js v5",
      "Razorpay",
      "shadcn/ui",
      "TanStack Query",
      "Zod",
    ],
    year: 2025,
    live: "https://store.khalidkhnz.in/",
    highlights: [
      "Route group split for (admin), (auth), (private), and (public) flows with role gated layouts",
      "Drizzle migrations on push, drizzle-admin powered admin console, and Razorpay backed checkout",
      "Full storefront primitives: variants, wishlist, cart, OTP, and Recharts revenue analytics",
    ],
  },
  {
    slug: "heavier_rn",
    name: "Heavier Workout Tracker",
    role: "React Native Developer",
    tagline: "Strength training and workout logger for iOS and Android.",
    description:
      "A React Native 0.84 workout tracker with templates, exercise library, history, progress charts, and profile. Built on Reanimated 4, MMKV storage, Bottom Sheet, and Notifee notifications.",
    tags: [
      "React Native 0.84",
      "TypeScript",
      "Reanimated 4",
      "Zustand",
      "MMKV",
      "Notifee",
      "React Navigation 7",
      "Gifted Charts",
      "Linear Gradient",
    ],
    year: 2025,
    highlights: [
      "Templates, exercise library, workout, history, progress, and profile screens with Bottom Sheet flows",
      "MMKV backed offline first state via Zustand; Notifee local notifications and background timers",
      "Gifted Charts progress visualizations with linear gradients and SVG primitives",
    ],
  },
  {
    slug: "custom_hyper",
    name: "Custom Hyper Terminal",
    role: "Contributor",
    tagline: "Personalized fork of the Hyper terminal.",
    description:
      "A customized build of the Vercel Hyper terminal (Electron) with personal plugin set, keymaps, and theme tweaks. Used as a daily driver across macOS, Linux, and Windows.",
    tags: [
      "Electron",
      "TypeScript",
      "React",
      "Webpack",
      "Babel",
      "Yarn Workspaces",
      "AVA",
    ],
    year: 2026,
    highlights: [
      "Electron + React render with custom plugin loader and personal keymap overrides",
      "Cross platform installer builds via electron-builder",
      "Forked from vercel/hyper and rebased against canary",
    ],
  },
  {
    slug: "monster_tamer",
    name: "Monster Tamer (Phaser 3 RPG)",
    role: "Game Developer",
    tagline: "Pokemon style RPG built in Phaser 3.",
    description:
      "A Pokemon like RPG built with Phaser 3, including overworld, dialog, battle, party, inventory, monster details, options, and cutscene scenes.",
    tags: [
      "Phaser 3",
      "JavaScript",
      "HTML5 Canvas",
      "Tiled",
    ],
    year: 2025,
    highlights: [
      "13 game scenes covering world, battle, dialog, inventory, party, and cutscenes",
      "Tile based world with grid movement, encounters, and animated battle effects",
      "Vanilla JS architecture, no bundler, served by a static dev server",
    ],
  },
  {
    slug: "blackbox_cli",
    name: "Blackbox Code CLI",
    role: "Full Stack Developer",
    tagline: "npm CLI coding agent tuned for Blackbox AI models.",
    description:
      "A Node.js based CLI coding agent that lets developers query and edit large codebases, automate PRs and rebases, and switch to vision models when images appear in the prompt.",
    tags: [
      "Node.js 20+",
      "TypeScript",
      "Tree-sitter",
      "MCP",
      "Yarn Workspaces",
      "Docker",
    ],
    year: 2026,
    highlights: [
      "Codebase aware Q&A and edits beyond traditional context windows via streaming and chunking",
      "Sandboxed execution image (ghcr.io/blackbox_ai/blackbox-cli) for safe tool use",
      "Vision model auto switching when image attachments are detected",
    ],
  },
  {
    slug: "blackbox_builder",
    name: "Blackbox AI App Builder",
    role: "Full Stack Developer",
    tagline: "v0 SDK powered multi tenant app builder.",
    description:
      "A v0 clone style AI application builder using the Vercel v0 SDK and AI Elements with multi tenant auth, Drizzle/Postgres persistence, MCP widgets, MiniMax music generation, and WhatsApp integration.",
    tags: [
      "Next.js",
      "Turbopack",
      "v0 SDK",
      "AI Elements",
      "Drizzle ORM",
      "PostgreSQL",
      "Supabase",
      "MCP Widgets",
      "WhatsApp Cloud API",
    ],
    year: 2026,
    highlights: [
      "Multi tenant auth and tenant scoped projects with Drizzle migrations",
      "MCP widgets workspace built and bundled alongside the Next.js app",
      "MiniMax music generation and WhatsApp Cloud API integrations",
    ],
  },
  {
    slug: "blackbox_remote_code",
    name: "Blackbox Remote Coding Agent",
    role: "Full Stack Developer",
    tagline: "Cloud spun coding agent on GCP Compute.",
    description:
      "A coding agent template that provisions per session GCP Compute VMs, streams logs to Google Cloud Logging, persists state in Drizzle/Postgres, and bills usage via a cron worker.",
    tags: [
      "Next.js",
      "Turbopack",
      "Drizzle ORM",
      "PostgreSQL",
      "GCP Compute",
      "GCP Logging",
      "Amplitude",
      "Husky",
    ],
    year: 2026,
    highlights: [
      "Per session GCP Compute VM provisioning and lifecycle management",
      "Billing cron with usage aggregation and Drizzle migrations on deploy",
      "Amplitude analytics, Husky hooks, and command palette UX",
    ],
  },
  {
    slug: "blackbox_ai_router",
    name: "Blackbox AI Router",
    role: "Backend Developer",
    tagline: "LiteLLM proxy with abuse prevention and auto top up.",
    description:
      "A Python LiteLLM proxy that routes AI traffic across providers with custom auth, abuse prevention, user blocking, auto top up billing, and admin tooling.",
    tags: [
      "Python",
      "LiteLLM",
      "FastAPI",
      "Docker",
      "PostgreSQL",
    ],
    year: 2026,
    highlights: [
      "Custom auth, custom callbacks, and request error sanitization in front of LiteLLM",
      "Auto top up endpoints and manager plus user blocking and abuse prevention",
      "Admin tools, migrations, and dev/prod Docker Compose stacks",
    ],
  },
  {
    slug: "oi_proxy_server",
    name: "OpenInterpreter Proxy Server",
    role: "Backend Developer",
    tagline: "LiteLLM proxy hosting prompts for OpenInterpreter.",
    description:
      "A LiteLLM based Python proxy that hosts model config and prompts used by Blackbox OpenInterpreter, with content moderation and request tracing.",
    tags: ["Python", "LiteLLM", "Docker"],
    year: 2025,
    highlights: [
      "Prompt and model config hosting for OpenInterpreter (planner, vision, coder)",
      "Content moderation, custom auth, and tracker middleware in front of LiteLLM",
      "Single Docker image with build args for provider keys",
    ],
  },
  {
    slug: "aijab_distribution",
    name: "AIJab Broker Distribution Platform",
    role: "Frontend Developer",
    tagline: "Insurance broker distribution and native integration.",
    description:
      "A Next.js insurance broker distribution platform with a webview app and an internal ops admin tool, plus tech specs for native broker integrations.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Jest",
      "SonarQube",
      "Jenkins",
      "Docker",
    ],
    year: 2026,
    highlights: [
      "Webview app and ops admin tools split into separate Next.js sub apps",
      "CI/CD via Jenkinsfile.k8s.PR pipelines and SonarQube quality gates",
      "Tech spec and native broker integration guides shipped alongside the code",
    ],
  },
  {
    slug: "gpm_platform",
    name: "Generic Process Management Platform",
    role: "Full Stack Developer",
    tagline: "NestJS backend plus Expo React Native frontend.",
    description:
      "A NestJS Postgres backend with admin scripts and email tooling paired with an Expo + React Native Reusables (shadcn for RN) mobile front end. APK build pipeline included.",
    tags: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Expo",
      "React Native",
      "shadcn/ui RN",
      "React Hook Form",
      "Zod",
    ],
    year: 2026,
    highlights: [
      "NestJS backend with super user/seed scripts, email testing, and template copy on build",
      "Expo Router based mobile app using rn-primitives for Radix style components",
      "APK build instructions and EAS aware mobile pipeline",
    ],
  },
  {
    slug: "prism_social",
    live: "https://prism.technotribes.org/",
    name: "Prism — SaaS AI Social Media Assistant",
    role: "Full Stack Developer",
    tagline: "Multi agent social posts across LinkedIn, X, IG, FB, Threads.",
    description:
      "A T3 Stack SaaS that uses a team of specialist agents (topic, hook, writer, research, editor, scheduler) to draft, enrich, edit, and schedule posts across LinkedIn, Twitter/X, Instagram, Facebook, and Threads.",
    tags: [
      "Next.js 15",
      "TypeScript",
      "Drizzle ORM",
      "PostgreSQL",
      "better-auth",
      "Tailwind CSS v4",
      "shadcn/ui",
      "OpenRouter",
      "Zod",
    ],
    year: 2026,
    highlights: [
      "Per platform voice and format from a single draft, with a memory system that learns the user",
      "better-auth email + OTP, T3 Env, dark locked base-nova shadcn preset",
      "Roadmap driven slices in TODO.md and a strict DESIGN_REFERENCE.md visual contract",
    ],
  },
  {
    slug: "buildify_app_builder",
    live: "https://www.buildify.sh/",
    name: "Buildify — AI App Builder",
    role: "Full Stack Developer",
    tagline: "Chat to full app generator with Razorpay billing.",
    description:
      "A T3 Stack AI app builder that generates full applications, dashboards, and landing pages via the v0 SDK. Includes an AI chat, AI LaTeX resume builder, dual credit system, and Razorpay subscriptions.",
    tags: [
      "Next.js 15",
      "React 19",
      "Bun",
      "Elysia + Eden",
      "Drizzle ORM",
      "PostgreSQL",
      "better-auth",
      "v0 SDK",
      "OpenRouter",
      "Razorpay",
      "Daytona SDK",
    ],
    year: 2026,
    highlights: [
      "Type safe RPC via Elysia + Eden between the Next.js app and a Bun runtime",
      "Dual credit system (subscription + permanent) with Razorpay multi currency plans",
      "AI LaTeX resume builder with PDF compilation and follow up edits",
    ],
  },
  {
    slug: "jobs_board",
    live: "https://jobs.technotribes.org/",
    name: "Jobs Board Platform",
    role: "Full Stack Developer",
    tagline: "Role gated job board with public profiles and S3 resumes.",
    description:
      "A job board platform on the T3 Stack with applicant, recruiter, and admin dashboards, two signup flows, public job browsing with filters, GitHub style indexable profiles, and S3 backed resume uploads.",
    tags: [
      "Next.js 15",
      "TypeScript",
      "Drizzle ORM",
      "PostgreSQL",
      "better-auth",
      "AWS S3",
      "Nodemailer",
      "Tailwind CSS v4",
      "shadcn/ui",
    ],
    year: 2026,
    highlights: [
      "Three role gated dashboards with two distinct signup funnels (applicant, recruiter)",
      "Pre signed S3 resume uploads and Nodemailer transactional flows (OTP, alerts, status)",
      "Public, indexable profiles at /u/[username] and rich job search filters",
    ],
  },
  {
    slug: "photography_core",
    live: "https://operations.bookthatstudio.com/",
    name: "BookThatStudio Operations",
    role: "Full Stack Developer",
    tagline: "Photography studio ops: shoots, team, clients.",
    description:
      "A central ops platform for photography studios (BookThatStudio) built on Next.js 15 with Prisma, NextAuth, and shadcn/ui. Manages shoots, photographers, editors, and clients with a themed dashboard.",
    tags: [
      "Next.js 15",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "NextAuth.js",
      "Tailwind CSS",
      "shadcn/ui",
      "next-themes",
    ],
    year: 2026,
    highlights: [
      "CRUD for shoots, team, and clients with Prisma backed migrations",
      "Email + password NextAuth flows with role aware dashboard",
      "Full theme support via CSS variables and next-themes",
    ],
  },
  {
    slug: "cardora_remake",
    live: "https://www.cardoradigital.ca/",
    name: "Cardora Remake",
    role: "Full Stack Developer",
    tagline: "T3 stack remake of the Cardora app.",
    description:
      "A from scratch remake of the Cardora app on the T3 Stack with NextAuth, Drizzle, AWS S3 uploads, better-auth, TanStack Query, and confetti driven celebrations.",
    tags: [
      "Next.js",
      "TypeScript",
      "Drizzle ORM",
      "PostgreSQL",
      "NextAuth",
      "better-auth",
      "AWS S3",
      "TanStack Query",
      "T3 Env",
    ],
    year: 2026,
    highlights: [
      "Drizzle migrations and T3 Env backed config across dev and prod",
      "S3 uploads via the AWS SDK v3 with presigned URLs",
      "NextAuth + better-auth side by side during the auth migration",
    ],
  },
  {
    slug: "studio_landing",
    live: "https://www.technotribes.org/",
    name: "Studio Marketing Landing",
    role: "Frontend Developer",
    tagline: "Marketing landing with Lenis smooth scroll.",
    description:
      "A marketing landing page on the T3 Stack powered by Lenis smooth scroll, Framer Motion, and Tailwind CSS v4. Contact form posts via Nodemailer.",
    tags: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "Lenis",
      "Nodemailer",
      "Zod",
    ],
    year: 2026,
    highlights: [
      "Lenis powered scroll with Framer Motion entrance animations",
      "Server actions for the contact form, validated by Zod",
      "T3 Env aware Nodemailer transport for transactional email",
    ],
  },
  {
    slug: "notepro",
    live: "https://notepro.khalidkhnz.in/",
    name: "NotePro",
    role: "Full Stack Developer",
    tagline: "Personal notes web app on a custom domain.",
    description:
      "A personal notes web app deployed at notepro.khalidkhnz.in for fast capture, organization, and retrieval of notes across devices.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    year: 2025,
    highlights: [
      "Mobile friendly capture and read views",
      "Deployed on a personal subdomain with edge caching",
      "Clean keyboard driven UX",
    ],
  },
  {
    slug: "iq_app",
    live: "https://iq.technotribes.org/",
    name: "IQ",
    role: "Full Stack Developer",
    tagline: "Knowledge / quiz product deployed at iq.technotribes.org.",
    description:
      "A web app deployed at iq.technotribes.org. Open the live app to explore the current build.",
    tags: ["Next.js", "TypeScript"],
    year: 2026,
    highlights: [
      "Production deployment on a managed subdomain",
      "Built and shipped end to end",
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
