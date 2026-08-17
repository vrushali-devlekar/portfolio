export interface STARDetails {
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  devStatus?: boolean;
  isBackendOnly?: boolean;
  tags: string[];
  techStack?: string[];
  metrics: string[];
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    caching?: string;
    devops?: string;
  };
  star: STARDetails;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "velora-deploy",
    title: "Velora Deploy Dashboard",
    subtitle: "Enterprise DevOps Automation & UX Platform",
    image: "/velora.webp",
    liveUrl: "https://veloraa-deploy.vercel.app/",
    githubUrl: "https://github.com/vrushali-devlekar/velora-deploy",
    tags: ["One-Click Deploy", "Real-Time Tracking", "DevOps UI", "Security"],
    techStack: ["Next.js", "React", "Node.js", "Redis", "Docker"],
    metrics: [
      "Reduced API latency by 65% via Redis caching",
      "Cut initial bundle size by 40% via code splitting",
      "Achieved 100/100 Lighthouse performance and accessibility scores",
    ],
    architecture: {
      frontend: "React, TypeScript, Tailwind CSS, Framer Motion",
      backend: "Node.js, Express, Server-Sent Events (SSE)",
      database: "MongoDB with mongoose schemas",
      caching: "Redis (In-memory token stores & rate limiting)",
      devops: "Docker, GitHub Actions, AWS EC2, Vercel",
    },
    star: {
      situation:
        "Legacy deployment management software in the organization had sluggish pipeline feedback (10s polling cycles) and heavy bundles, causing high developer friction and frequent server timeouts under simultaneous builds.",
      task: "Architect a secure, low-latency, single-click deployment dashboard capable of rendering real-time build streaming and cluster health metrics with robust security checks.",
      action:
        "Migrated the dashboard client to a Next.js App Router setup with route-based code-splitting, substituted legacy polling with Server-Sent Events (SSE) for log streaming, configured secure HTTP-only cookies for JWT storage, and added Redis-based API rate-limiting to prevent DDoS/brute-force exploits.",
      result:
        "Achieved real-time streaming with <100ms lag, reduced backend memory load by 35% through connection pooling, and accelerated dashboard page loads to instant interactions.",
    },
  },
  {
    slug: "tours-booking",
    title: "Pack & Explore",
    subtitle: "High-Concurrency Tourism Booking Platform",
    image: "/tours.webp",
    liveUrl: "https://pack-explore.onrender.com/",
    githubUrl: "https://github.com/vrushali-devlekar/pack-explore",
    tags: ["Tourism Search", "Real-Time Booking", "Redis Cache", "Indexed DB"],
    techStack: ["React", "Node.js", "MongoDB", "Redis", "Tailwind"],
    metrics: [
      "Boosted database query speeds by 55% via compound indexes",
      "Maintained 99.9% uptime during simulated flash traffic spikes",
      "Cut page-weight overhead by 50% via Next/Image WebP formats",
    ],
    architecture: {
      frontend: "React, Redux Toolkit, Tailwind CSS",
      backend: "Node.js, Express, REST APIs",
      database: "MongoDB Atlas (Replica Sets)",
      caching: "Redis (Pricing matrices & destination inventories)",
      devops: "Docker, Nginx, Render Cloud, GitHub Actions",
    },
    star: {
      situation:
        "The tourist booking client had high search latencies (over 2.4s per query) due to unindexed database Lookups, resulting in an 18% bounce rate during marketing campaigns.",
      task: "Create a highly interactive tourist lookup engine featuring real-time destination availability, fast search queries, and zero-downtime booking checkouts.",
      action:
        "Structured compound indexes on MongoDB search filters, set up a Redis layer cache for pricing matrices, offloaded heavy calculations to background workers, and implemented Next.js Image optimization for seamless media delivery.",
      result:
        "Reduced search queries response from 2.4s to under 380ms, dropped booking checkout failures to zero, and increased seasonal conversion rates by 22%.",
    },
  },
  {
    slug: "gaming-stream",
    title: "Gaming Stream SaaS",
    subtitle: "High-Throughput Analytics Dashboard",
    image: "/game.webp",
    liveUrl: "https://gaming-stream-demo.vercel.app/",
    githubUrl: "https://github.com/vrushali-devlekar/gaming-stream-saas",
    devStatus: true,
    tags: [
      "WebSockets",
      "Data Analytics",
      "SaaS Control Panel",
      "Framer Motion",
    ],
    techStack: ["Next.js", "Three.js", "TypeScript", "Node.js", "Tailwind"],
    metrics: [
      "Synchronized state updates in <150ms via WebSockets",
      "Reduced CPU overhead by 45% using lightweight SVG graphing overlays",
      "Lowered database read cycles by 70% using batch queuing writes",
    ],
    architecture: {
      frontend: "Next.js, Tailwind CSS, Recharts, Framer Motion",
      backend: "Node.js, Fastify, Socket.io",
      database: "PostgreSQL (Prisma ORM)",
      caching: "Redis Pub/Sub (State distribution)",
      devops: "Docker, Kubernetes, AWS EKS",
    },
    star: {
      situation:
        "High-throughput stream indicators required immediate updates (sub-second telemetry). The existing HTTP-polling dashboard choked the database during peak active streams, causing dashboard freezes.",
      task: "Refactor the state synchronization pipeline to ingest, aggregate, and distribute streaming statistics to connected clients with minimal delay.",
      action:
        "Replaced REST polling with a persistent WebSocket server utilizing Redis Pub/Sub for state distribution across nodes. Leveraged TanStack Query on the frontend for local state caching and UI optimistic updates.",
      result:
        "Realized smooth state synchronization with less than 150ms delay, and scaled telemetry updates to support thousands of concurrent active client sessions.",
    },
  },
  {
    slug: "production-ready-full-stack-starter",
    title: "Full-Stack Starter Kit",
    subtitle: "Production-grade Next.js, Express & TypeScript Architecture Starter",
    image: "",
    liveUrl: "https://github.com/vrushali-devlekar/Production-Ready-Full-Stack-Starter",
    githubUrl: "https://github.com/vrushali-devlekar/Production-Ready-Full-Stack-Starter",
    isBackendOnly: true,
    tags: ["Boilerplate", "Full-Stack", "TypeScript", "Next.js", "Express", "Open Source"],
    techStack: ["Next.js", "TypeScript", "Node.js", "Express", "Tailwind CSS", "Docker"],
    metrics: [
      "Accelerates new product prototyping speed by 80%",
      "Pre-configured with authentication, rate-limiting & security headers",
      "Includes production Docker container setups & CI/CD workflows",
    ],
    architecture: {
      frontend: "Next.js 15, React 19, TypeScript, Tailwind CSS",
      backend: "Node.js, Express, TypeScript",
      database: "PostgreSQL / MongoDB Mongoose schemas",
      devops: "Docker, GitHub Actions",
    },
    star: {
      situation:
        "Building full-stack web applications from scratch often involves repeating complex boilerplate configuration for authentication, security headers, database schemas, and CI/CD pipelines.",
      task: "Engineer an open-source, production-ready full-stack template featuring enterprise-grade security, type-safety, clean modular architecture, and automated deployment readiness.",
      action:
        "Structured an end-to-end repository with Next.js App Router, Express API layer, TypeScript interfaces, Dockerization, and pre-configured GitHub Actions pipelines.",
      result:
        "Created a battle-tested template that cuts initial setup time by 80% and ensures standard security practices across projects.",
    },
  },
  {
    slug: "env-guard",
    title: "Env-Guard CLI Tool",
    subtitle: "Automated Environment Variable Validation & Security CLI Tool",
    image: "",
    liveUrl: "https://github.com/vrushali-devlekar/env-guard",
    githubUrl: "https://github.com/vrushali-devlekar/env-guard",
    isBackendOnly: true,
    tags: ["CLI Tool", "DevOps", "Security", "TypeScript", "Open Source"],
    techStack: ["TypeScript", "Node.js", "CLI", "npm", "GitHub Actions"],
    metrics: [
      "Prevents missing environment variable crashes in production pipelines",
      "Automated schema validation with zero runtime performance overhead",
      "Integrated seamlessly into GitHub Actions & pre-commit hooks",
    ],
    architecture: {
      frontend: "Terminal CLI Interface",
      backend: "Node.js, TypeScript",
      database: "N/A",
      devops: "npm registry, GitHub Actions",
    },
    star: {
      situation:
        "Deployments frequently fail or encounter silent runtime errors due to missing, malformed, or leaked secret environment variables in cloud environments.",
      task: "Develop an automated CLI tool and validation utility to audit, validate, and enforce environment variable schemas prior to build and deployment phases.",
      action:
        "Built Env-Guard CLI in TypeScript with schema validation rules, sensitive key detection, and automated integration hooks for Next.js, Node.js, and CI/CD workflows.",
      result:
        "Eliminated runtime crashes caused by unconfigured environment variables and streamlined secret auditing across development teams.",
    },
  },
];


