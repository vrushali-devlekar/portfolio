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
    slug: "studio-orbit",
    title: "StudioOrbit",
    subtitle: "Digital Productivity Cockpit & Visual QA Review Canvas",
    image: "/studio-orbit.jpg",
    liveUrl: "https://studio-orbit.vercel.app/",
    githubUrl: "https://github.com/miidaystudio/studio-orbit",
    tags: ["Cockpit UI", "Visual QA", "Real-time Telemetry", "Next.js", "Tailwind CSS"],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    metrics: [
      "Real-time visual staging coordinate telemetry with sub-millisecond responsiveness",
      "Streamlined milestone sign-off workflows reducing client QA review cycle by 50%",
      "Instant Magic Link client authentication with zero friction access",
    ],
    architecture: {
      frontend: "Next.js App Router, TypeScript, Tailwind CSS, Framer Motion",
      backend: "Next.js API Routes, Server Actions, Edge Functions",
      database: "PostgreSQL / Supabase with real-time subscriptions",
      caching: "Edge Cache & Optimistic UI Updates",
      devops: "Vercel Edge Network, GitHub Actions CI/CD",
    },
    star: {
      situation:
        "Creative agencies and digital engineering studios frequently struggle with fragmented staging review cycles, disjointed client feedback threads, and opaque retainer burndown tracking across disparate tools.",
      task: "Engineer StudioOrbit—a unified digital productivity cockpit and visual QA canvas allowing agency teams to manage active deliverables, coordinate visual pinpoint reviews, and track retainer burn-down in real time.",
      action:
        "Built a modern responsive web dashboard using Next.js and TypeScript, engineered interactive deliverable cockpit cards with animated burn-down indicators, implemented Magic Link client sign-on, and optimized viewport coordinate pinning for pixel-accurate QA feedback.",
      result:
        "Delivered an ultra-responsive, visually refined platform enabling instant client milestone approvals, clear retainer transparency, and accelerated deployment cycles.",
    },
  },
  {
    slug: "lan-courier",
    title: "LAN Courier",
    subtitle: "Zero-Cloud Peer-to-Peer File & Secret Sharing System",
    image: "/lan-courier.jpg",
    githubUrl: "https://github.com/miidaystudio/LAN-Courier",
    tags: ["P2P Network", "WebRTC", "E2EE Security", "Local Subnet", "TypeScript"],
    techStack: ["TypeScript", "WebRTC", "Socket.io", "React", "Node.js", "Tailwind CSS"],
    metrics: [
      "Sub-millisecond local network device discovery and direct handshake",
      "100% Zero-Cloud data transmission with end-to-end encrypted secret beam",
      "Seamless multi-gigabyte file transfers with chunked binary streaming",
    ],
    architecture: {
      frontend: "React, TypeScript, WebRTC DataChannels, Tailwind CSS",
      backend: "Node.js, WebSocket Signaling Server, mDNS Discovery",
      database: "Zero Cloud / Local IndexedDB ephemeral buffer",
      caching: "In-memory chunk buffering & stream backpressure",
      devops: "Docker containerization, Cross-platform P2P daemon",
    },
    star: {
      situation:
        "Transferring large files, directories, and confidential secrets between local devices often requires uploading to third-party cloud services or managing cumbersome shared network drives.",
      task: "Build a zero-cloud, high-speed peer-to-peer file and secret exchange platform that operates directly over local networks with end-to-end encryption.",
      action:
        "Architected LAN Courier with automatic local subnet discovery, WebRTC DataChannels for direct device-to-device streaming, AES-GCM encryption for secret beams, and a drag-and-drop web interface.",
      result:
        "Created a frictionless local transmission tool offering multi-file/directory drag & drop, zero third-party cloud dependence, and blazing fast LAN transfer speeds.",
    },
  },
  {
    slug: "velora-deploy",
    title: "Velora Deploy Dashboard",
    subtitle: "Enterprise DevOps Automation & Real-Time Build Telemetry",
    image: "/velora.webp",
    liveUrl: "https://veloraa-deploy.vercel.app/",
    githubUrl: "https://github.com/vrushali-devlekar/DevOps_Deploy",
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
    slug: "coffee-cafe",
    title: "Coffee Cafe",
    subtitle: "Artisanal Coffee Brand & Digital Commerce Experience",
    image: "/coffee-cafe.jpg",
    liveUrl: "https://coffee-cafe-phi.vercel.app/",
    githubUrl: "https://github.com/vrushali-devlekar/Coffee-cafe",
    tags: ["Brand Design", "E-Commerce UI", "React", "Next.js", "Tailwind CSS"],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    metrics: [
      "Sub-second page load times with Next.js image optimization and static generation",
      "Fluid micro-animations and interactive menu browsing with Framer Motion",
      "100% responsive cross-device layout with tactile design aesthetics",
    ],
    architecture: {
      frontend: "Next.js App Router, React, Tailwind CSS, Framer Motion",
      backend: "Next.js Serverless Functions, Edge Middleware",
      database: "Headless CMS / Menu Catalog Store",
      caching: "Incremental Static Regeneration (ISR) & Vercel Edge Cache",
      devops: "Vercel CI/CD, GitHub Actions",
    },
    star: {
      situation:
        "Traditional boutique cafes often struggle to translate their physical atmosphere, warmth, and handcrafted aesthetic into a compelling, modern digital storefront.",
      task: "Design and develop an artisanal, high-conversion web experience for Coffee Cafe that reflects brand elegance, presents digital menu items fluidly, and drives online customer engagement.",
      action:
        "Engineered a bespoke UI featuring warm coffee tones, floating pill navigation, optimized media assets, and smooth scroll interactions tailored for mobile and desktop.",
      result:
        "Delivered an enchanting brand platform with near-instant load speeds, high visual engagement, and streamlined customer ordering/inquiry pathways.",
    },
  },
];
