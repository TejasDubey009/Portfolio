// Every string, link and asset on the page lives here.

const cdn = 'https://framerusercontent.com/images'

export const images = {
  profile: `${cdn}/qoOl321A37QIZfbMzYlvcGJWC1g.png?scale-down-to=1024`,
  clients: [
    `${cdn}/um3bxT2WVFF4kr6enjXB8pntPlo.svg`,
    `${cdn}/lWoxjUfzID4I2CJ2EAGpp1BxXk.svg`,
    `${cdn}/LtSGTHttO0ZpuCVLNu4mPIpOuk.svg`,
  ],
  shapes: {
    orangePyramid: `${cdn}/0f09LEy6qZK1Y9gL9T6AG622ZZ8.png?width=1024&height=1024`,
    purpleSphere: `${cdn}/m3YA9HpmQG8c9ThSe5XusCzYw.png?width=1024&height=1024`,
    blueCylinder: `${cdn}/lZLqIoLGAjMHHOlhOwugYSASrjc.png?width=1024&height=1024`,
    turquoiseStar: `${cdn}/l1KkpEI9tJzqQPgJDNKytRuxgeI.png?width=1024&height=1024`,
    limeObject: `${cdn}/LUkmo3gFVQOfp5kvltA05Mc6K4.png?width=1024&height=1024`,
    yellowCube: `${cdn}/jaVohrUAKzleX6rjxEEOPrqeysw.png?width=1024&height=1024`,
    purpleCube: `${cdn}/53osOsH2OP7bAyFNQKbXOVwk.png?width=1024&height=1024`,
    bluePyramid: `${cdn}/en9G6oaN8j6IT8H0gpgIS69gXg4.png?scale-down-to=1024`,
    turquoiseCube: `${cdn}/tLJlDufDxfRWX3e1UyLWQODdOaw.png?width=1024&height=1024`,
    redPyramid: `${cdn}/nSf6ya4FcQ5iCpFIBAboozmlgzA.png?scale-down-to=512`,
    blueCube: `${cdn}/fbDdTEyddMlUKyioryX3T3M3I.png?scale-down-to=512`,
    greenCylinder: `${cdn}/un1NlasO4xdJ3ogUjNzC5U3NsU.png?scale-down-to=512`,
    orangeSphere: `${cdn}/gshDWTLuPfNPn8ZUFpq49jhvIPk.png?scale-down-to=512`,
    purpleCircle: `${cdn}/2YMs3TUoFSk6OAJu3tquJSjY.png?scale-down-to=512`,
    yellowHeart: `${cdn}/eiTxkfpr6msnt5xKhves6aFLlTw.png?scale-down-to=512`,
    orangeStar: `${cdn}/YnQwe4Efg37DiOr8IRYEfPzKE.png?scale-down-to=512`,
    blueGem: `${cdn}/snuvetWlg8kNNuH4rBY2aSQch5c.png?scale-down-to=512`,
    limeCube: `${cdn}/3YQ5k1hZdNkPRgquxbSfEunCE.png?scale-down-to=512`,
    yellowPill: `${cdn}/5PoEhJTKleU3AaFM5T9aYtiqo.png?scale-down-to=512`,
    pinkGem: `${cdn}/7Xrs4S6qdC6EyvyrM1EGw533im4.png?scale-down-to=512`,
  },
}

export const nav = {
  links: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'MVP Sprint', href: '#mvp-sprint' },
    { label: 'Brand Systems', href: '#branding' },
    { label: 'Stack', href: '#stack' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
}

export const hero = {
  marquee: 'TEJASWI DUBEY',
  greeting: 'Brand Builder & ',
  name: 'Rapid MVP Architect',
  suffix: ' for High-Growth Startups.',
  roles: [
    'Fastest 0-to-1 MVP Builder',
    'Brand Building & Identity',
    'AI Engineering & LLM Agents',
    'Interactive 3D & WebGL',
    'Cross-Industry AI Strategist',
  ],
  badge: '✦ SCROLL DOWN ✦ AND KNOW ME BETTER',
  clients: '50+ MVPs Shipped • 21-Day Avg Launch • 60 FPS',
  cta: { label: "Let's Build Something Extraordinary", href: '#contact' },
}

export const about = {
  heading: 'About Me',
  cvLink: { label: 'Read My CV', href: '/resume.pdf' },
  paragraphs: [
    "I don't just build websites — I build brands and launch production MVPs people remember. My work sits at the intersection of Brand Strategy, Software Engineering, and Artificial Intelligence.",
    'As a trusted partner for founders and enterprises, I transform ambitious ideas into market-ready digital products in weeks, not months. Every interface is designed to captivate users while maintaining lightning-fast performance.',
    'Engineered for 60 FPS interaction performance, accessibility, GPU acceleration, and edge-delivered AI integration across any industry.',
  ],
}

export const experience = {
  heading: 'Experience',
  items: [
    {
      role: 'Junior Developer',
      company: 'icodejr Academy',
      period: '2024 - Present',
      description:
        'Employed as a Junior Developer, building interactive web applications, digital learning tools, engaging frontend interfaces, and scalable component systems.',
      shape: 'yellowCube',
    },
  ],
}

export const mvpSprint = {
  heading: 'Fastest 0-to-1 MVP Sprint',
  subheading: 'From napkin idea to investor-ready AI product in 21 days',
  timeline: [
    {
      week: 'Week 01',
      title: 'Brand & Product Strategy',
      badge: 'Days 1-7',
      deliverables: [
        'Brand Identity & Visual System',
        'UX Architecture & Key User Flows',
        'Tokenized Figma Design System',
        'Technical Specs & Stack Selection',
      ],
      shape: 'yellowCube',
    },
    {
      week: 'Week 02',
      title: 'AI & Core Engineering',
      badge: 'Days 8-14',
      deliverables: [
        'Production React / Next.js Architecture',
        'Database Schema & API Pipelines',
        'LLM, RAG & Multi-Agent Integration',
        'Core Feature Interactive Prototyping',
      ],
      shape: 'redPyramid',
    },
    {
      week: 'Week 03',
      title: 'Polish, Motion & Launch',
      badge: 'Days 15-21',
      deliverables: [
        '60 FPS Micro-animations & Motion',
        'Edge Hosting & Cloud Deployment',
        'SEO, WCAG Accessibility & Analytics',
        'Investor-Ready Pitch & Live Product',
      ],
      shape: 'turquoiseCube',
    },
  ],
}

export const brandBuilding = {
  heading: 'Brand Architecture & Systems',
  subheading: 'Building memorable digital brands designed for market distinction and scaling',
  pillars: [
    {
      title: 'Visual Identity & Assets',
      description:
        'Distinctive logo marks, typography hierarchies, color palettes, and custom 3D brand shapes that make your product instantly recognizable.',
      items: ['Logo Mark System', 'Color & Type Tokens', 'Custom 3D Rendered Assets', 'Brand Guidelines'],
      icon: '✦',
    },
    {
      title: 'Scalable UI Design Systems',
      description:
        'Tokenized design component libraries in Figma and React that empower your engineering team to build new features 5x faster with complete consistency.',
      items: ['Figma Token Library', 'React UI Components', 'Accessibility Standards', 'Design System Docs'],
      icon: '❖',
    },
    {
      title: 'Interactive Storytelling',
      description:
        'Converting visitors into loyal users with compelling micro-copy, cinematic motion intros, interactive product demos, and frictionless onboarding.',
      items: ['Frictionless Onboarding', 'Cinematic WebGL Intros', 'Conversion Copywriting', 'Interactive Demos'],
      icon: '★',
    },
  ],
}

export const stack = {
  heading: 'Tech Stack',
  flipHint: 'Tap to flip',
  cards: [
    {
      name: 'React & Next.js',
      logo: 'react',
      description:
        'Frontend Architecture, React 19, Next.js App Router, Server Components, and scalable UI systems built for high performance.',
    },
    {
      name: 'TypeScript & Tooling',
      logo: 'typescript',
      description:
        'Strict type safety, custom generic types, Vite build optimization, modern linting, and robust software architecture.',
    },
    {
      name: 'AI & LLM Systems',
      logo: 'chatgpt',
      description:
        'LLM Integration, Autonomous AI Agents, RAG vector pipelines, MCP protocol, structured outputs, and prompt engineering.',
    },
    {
      name: 'Three.js & WebGL',
      logo: 'threejs',
      description:
        'Interactive 3D experiences, GLSL shaders, WebGPU acceleration, post-processing, and physics-driven interactive graphics.',
    },
    {
      name: 'Tailwind & Modern CSS',
      logo: 'tailwind',
      description:
        'Design system engineering, utility-first styling, CSS custom properties, responsive layout design, and dark mode thematic systems.',
    },
    {
      name: 'Node.js & Python APIs',
      logo: 'nodejs',
      description:
        'High-performance backend API design, asynchronous microservices, streaming endpoints, and edge serverless architecture.',
    },
    {
      name: 'PostgreSQL & Supabase',
      logo: 'supabase',
      description:
        'Relational data modeling, vector embeddings, real-time database subscriptions, Auth security rules, and Cloud Data Connect.',
    },
    {
      name: 'Docker & Cloud Edge',
      logo: 'docker',
      description:
        'Containerization, Vercel edge functions, Cloudflare routing, automated CI/CD pipelines, and global edge delivery.',
    },
    {
      name: 'Figma & Design Systems',
      logo: 'figma',
      description:
        'User research, wireframing, component tokenization, rapid prototyping, and pixel-perfect UI design systems.',
    },
    {
      name: 'HTML5 & Accessibility',
      logo: 'html',
      description:
        'Semantic markup, WCAG 2.1 compliance, ARIA attributes, keyboard navigation, and Core Web Vitals performance optimization.',
    },
    {
      name: 'Framer Motion & GSAP',
      logo: 'framer',
      description:
        'Fluid micro-animations, scroll-driven motion, layout transitions, and GPU-accelerated 60 FPS interaction design.',
    },
    {
      name: 'Git & CI/CD Pipelines',
      logo: 'git',
      description:
        'Version control workflows, GitHub Actions, automated testing, zero-downtime releases, and collaborative code pipelines.',
    },
  ],
}

export const services = {
  heading: 'Expertise',
  items: [
    {
      number: '01',
      title: 'Brand Building & Identity',
      shape: 'yellowCube',
      description:
        'Crafting iconic visual identities, logo mark systems, design tokens, custom 3D assets, and digital brand guidelines built to scale.',
    },
    {
      number: '02',
      title: 'Rapid 0-to-1 MVP Engineering',
      shape: 'redPyramid',
      description:
        'Building production-ready MVPs in 21 days: React/Next.js, TypeScript, database architecture, API pipelines, and edge deployment.',
    },
    {
      number: '03',
      title: 'AI Systems & LLM Agents',
      shape: 'greenCylinder',
      description:
        'Interfaces that think: Autonomous AI Agents, RAG vector pipelines, voice interfaces, vision models, MCP protocol, and structured outputs.',
    },
    {
      number: '04',
      title: 'Creative 3D & WebGL',
      shape: 'blueCube',
      description:
        'Building experiences impossible with templates: Three.js, React Three Fiber, GLSL, WebGL, WebGPU, Shaders, Post Processing, Physics.',
    },
    {
      number: '05',
      title: 'Fullstack & Cloud Infrastructure',
      shape: 'orangeSphere',
      description:
        'Robust backend & edge infrastructure: Node.js, FastAPI, PostgreSQL, Supabase, Redis, Docker, Vercel Edge, and CI/CD pipelines.',
    },
  ],
}

export const projects = {
  heading: 'Featured Projects',
  more: { label: 'View More Projects', href: '#projects' },
  items: [
    {
      category: 'AI & Vision',
      title: 'AI Music Companion — Recommendation Engine',
      href: '#projects',
      image: `${cdn}/DzPnpdhCpUNilUZXTT2OZOvumWA.png?scale-down-to=2048`,
    },
    {
      category: 'WebGL & GIS',
      title: 'Planetary Intelligence Platform — Earth Systems Visualizer',
      href: '#projects',
      image: `${cdn}/eZQ1X1Fpw11apl285CIeN8iEVI.png?scale-down-to=2048`,
    },
    {
      category: '3D & WebGL',
      title: 'Interactive 3D Hardware Experience — Cinematic WebGL',
      href: '#projects',
      image: `${cdn}/pwnBF4uZrCSugu0a8ZiDdaD4A4.png?scale-down-to=2048`,
    },
    {
      category: 'EdTech & AI',
      title: 'AI Learning Sandbox — Interactive Neural Net Simulations',
      href: '#projects',
      image: `${cdn}/UFfz36PjDofFGqSVyD7dxLp6G4M.png?scale-down-to=2048`,
    },
    {
      category: 'Design System',
      title: 'Kudos — Modular UI Design System & Component Library',
      href: '#projects',
      image: `${cdn}/LAZePzksNGsqwC1vEotMzZH3EdE.png?scale-down-to=2048`,
    },
    {
      category: 'Creative Portfolio',
      title: 'Neozen — Immersive Portfolio & Adaptive Renderer',
      href: '#projects',
      image: `${cdn}/JeMGptNvDtMI6CES89lQ0yjQ40.png?scale-down-to=2048`,
    },
  ],
}

export const footer = {
  columns: [
    {
      heading: 'Capabilities',
      links: [
        { label: 'Rapid MVP Sprint', href: '#mvp-sprint' },
        { label: 'Brand Building', href: '#branding' },
        { label: 'AI Engineering', href: '#services' },
        { label: 'Creative 3D Dev', href: '#services' },
      ],
    },
    {
      heading: 'Navigation',
      links: [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Tech Stack', href: '#stack' },
        { label: 'Projects', href: '#projects' },
      ],
    },
    {
      heading: 'Social',
      links: [
        { label: 'X (Twitter)', href: 'https://x.com/TejaswiDubey01' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tejaswi-dubey-b4a992227/' },
      ],
    },
    {
      heading: 'Contact',
      links: [
        { label: 'Book a Call', href: 'https://calendly.com/mailmeontejaswi/30min' },
        { label: 'mailmeontejaswi@gmail.com', href: 'mailto:mailmeontejaswi@gmail.com' },
      ],
    },
  ],
  copyright: { prefix: '© Copyright', year: '2026' },
  credits: { text: 'Brand Builder & Rapid MVP Architect for Startups' },
}
