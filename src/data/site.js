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

// Each project carries everything its live-preview modal needs: the sandbox
// parameters (demoData), the stack breakdown, and the numbers that matter.
// `slug` selects the interactive demo in src/components/demos/index.js.
// Add `liveUrl` to any project and a "Visit live site" button appears in the modal.
export const projects = {
  heading: 'Featured Projects',
  more: { label: 'View More Projects', href: '#projects' },
  cardCta: 'Launch live preview',
  items: [
    {
      slug: 'helios-grid',
      category: 'Autonomous Energy · Deep RL',
      title: 'Helios Grid — Self-Balancing Renewable Microgrid',
      tagline:
        'Reinforcement-learning agents dispatching solar, wind and storage across a city district every 200 ms — cutting carbon without ever risking a brownout.',
      year: '2026',
      accent: '#f9a606',
      features: [
        'PPO dispatch agent trained on 4 years of half-hourly grid telemetry',
        'Digital twin simulates 10k demand scenarios before every commit',
        'Sub-15 ms decisions at the substation via quantised ONNX edge runtime',
        'Human-override console with full decision-trace explainability',
      ],
      architecture: {
        frontend: ['React 19', 'WebGL Flow Canvas', 'Tailwind v4', 'Zustand'],
        backend: ['Go Microservices', 'Kafka', 'TimescaleDB', 'gRPC Streams'],
        ai: ['PyTorch PPO', 'ONNX Runtime (edge)', 'Ray RLlib', 'Prophet Forecasting'],
      },
      metrics: [
        { label: 'Decision latency', value: '14.2', unit: 'ms' },
        { label: 'Grid uptime', value: '99.98', unit: '%' },
        { label: 'Carbon reduction', value: '−38', unit: '%' },
        { label: 'Peak load shaved', value: '2.4', unit: 'MW' },
      ],
      impact: [
        { label: 'Autonomy vs. rule-based dispatch', score: 92 },
        { label: 'Forecast accuracy (24h horizon)', score: 96 },
        { label: 'Operating cost reduction', score: 74 },
      ],
      demoData: {
        demand: 62,
        irradiance: 70,
        wind: 45,
        autopilot: true,
      },
    },
    {
      slug: 'aperture-vision',
      category: 'Spatial AI · Edge Vision',
      title: 'Aperture — Real-Time Spatial Perception Engine',
      tagline:
        'Six warehouse camera streams, one GPU: detection, segmentation and metric depth fused into a live spatial map that routes autonomous forklifts.',
      year: '2026',
      accent: '#22d3ee',
      features: [
        'YOLOv11 backbone distilled and compiled to TensorRT INT8',
        'Monocular metric depth fused with detections into a shared world model',
        'Re-ID tracking holds identity through 4-second full occlusions',
        'Safety envelope halts vehicles when a human enters the swept path',
      ],
      architecture: {
        frontend: ['React 19', 'WebGL Overlay Renderer', 'WebCodecs', 'Canvas 2D HUD'],
        backend: ['FastAPI (Python)', 'WebSockets', 'Redis Streams', 'NVIDIA Triton'],
        ai: ['YOLOv11 TensorRT', 'Depth Anything V2', 'ByteTrack Re-ID', 'CUDA Kernels'],
      },
      metrics: [
        { label: 'Inference latency', value: '8.7', unit: 'ms' },
        { label: 'Pipeline throughput', value: '60', unit: 'FPS' },
        { label: 'Detection mAP', value: '97.4', unit: '%' },
        { label: 'Streams per GPU', value: '6', unit: '×' },
      ],
      impact: [
        { label: 'Collision incidents prevented', score: 98 },
        { label: 'Occlusion tracking recall', score: 89 },
        { label: 'GPU cost per stream', score: 81 },
      ],
      demoData: {
        confidence: 55,
        segmentation: true,
        depth: false,
        tracking: true,
      },
    },
    {
      slug: 'loom-agents',
      category: 'Multi-Agent AI · LLM Systems',
      title: 'Loom — Multi-Agent Engineering Swarm',
      tagline:
        'A planner, researcher, synthesiser and validator that argue with each other until the work passes review — shipping specs in minutes at a third of the tokens.',
      year: '2026',
      accent: '#818cf8',
      features: [
        'LangGraph state machine with a validator that can force a retry loop',
        'Shared RAG memory over a pgvector store keeps agents from re-reading',
        'Speculative parallel drafting collapses planner and researcher latency',
        'Every hop is traced: prompt, tokens, cost and verdict per node',
      ],
      architecture: {
        frontend: ['React 19', 'Framer Motion Graph', 'SSE Streaming', 'Radix Primitives'],
        backend: ['FastAPI', 'Async SQLAlchemy', 'pgvector', 'Temporal Workflows'],
        ai: ['LangGraph', 'Claude Sonnet 4.5', 'GPT-4o Fallback', 'Structured Outputs'],
      },
      metrics: [
        { label: 'Token efficiency', value: '+68', unit: '%' },
        { label: 'Faster than single-agent', value: '4.1', unit: '×' },
        { label: 'First-pass validation', value: '94', unit: '%' },
        { label: 'Median run cost', value: '$0.21', unit: '' },
      ],
      impact: [
        { label: 'Output accepted without human edits', score: 87 },
        { label: 'Cost per completed task', score: 93 },
        { label: 'Hallucination rate (validator-caught)', score: 95 },
      ],
      demoData: {
        nodes: ['Planner', 'Researcher', 'Synthesizer', 'Validator'],
        strictness: 60,
        parallel: true,
      },
    },
    {
      slug: 'prism-materials',
      category: 'Generative 3D · WebGPU',
      title: 'Prism — Neural Material Studio',
      tagline:
        'Describe a material in plain language and watch a diffusion model synthesise 4K PBR maps, relit live in the browser at a locked 60 FPS.',
      year: '2026',
      accent: '#f472b6',
      features: [
        'Text-to-PBR diffusion emits albedo, roughness, metalness and normal maps',
        'WebGPU compute pipeline relights the preview without a round trip',
        'Material graph stays editable — generation is a starting point, not a black box',
        'Exports straight to glTF, USDZ and Three.js material JSON',
      ],
      architecture: {
        frontend: ['React 19', 'WebGPU / WGSL', 'Three.js r170', 'GSAP Motion'],
        backend: ['Node.js Edge Functions', 'Cloudflare R2', 'Bun Workers', 'Redis Cache'],
        ai: ['SDXL-Turbo LoRA', 'Material Diffusion', 'CLIP Re-ranking', 'ControlNet'],
      },
      metrics: [
        { label: 'Render loop', value: '60', unit: 'FPS' },
        { label: 'Material generation', value: '1.9', unit: 's' },
        { label: 'Texture resolution', value: '4K', unit: '' },
        { label: 'Lighthouse score', value: '100', unit: '/100' },
      ],
      impact: [
        { label: 'Asset turnaround vs. manual authoring', score: 96 },
        { label: 'Studio-grade output accepted', score: 84 },
        { label: 'Bundle weight budget met', score: 90 },
      ],
      demoData: {
        roughness: 32,
        metalness: 78,
        light: 135,
        preset: 'Brushed Titanium',
        presets: ['Brushed Titanium', 'Liquid Obsidian', 'Molten Copper', 'Frosted Jade'],
      },
    },
    {
      slug: 'vitalis-twin',
      category: 'Health AI · Digital Twin',
      title: 'Vitalis — Predictive Biometric Digital Twin',
      tagline:
        'A living model of an athlete that ingests 128 Hz wearable telemetry and forecasts fatigue twelve hours before the body feels it.',
      year: '2026',
      accent: '#34d399',
      features: [
        'Temporal fusion transformer forecasts HRV, load and recovery windows',
        'On-device inference keeps raw biometrics off the network entirely',
        'Counterfactual planner answers "what if I train tonight instead?"',
        'Clinician view surfaces the features driving every risk call',
      ],
      architecture: {
        frontend: ['React 19', 'Canvas Telemetry Charts', 'Web Bluetooth', 'PWA Offline'],
        backend: ['Go Ingest Service', 'TimescaleDB', 'Kafka', 'Differential Privacy Layer'],
        ai: ['Temporal Fusion Transformer', 'Core ML / TFLite', 'SHAP Explainability', 'Federated Learning'],
      },
      metrics: [
        { label: 'Forecast error (MAE)', value: '2.3', unit: '%' },
        { label: 'Prediction horizon', value: '12', unit: 'h' },
        { label: 'Telemetry ingest', value: '128', unit: 'Hz' },
        { label: 'Round-trip latency', value: '<40', unit: 'ms' },
      ],
      impact: [
        { label: 'Overtraining events avoided', score: 91 },
        { label: 'Athlete adherence to plan', score: 78 },
        { label: 'On-device privacy compliance', score: 100 },
      ],
      demoData: {
        workload: 55,
        forecast: true,
      },
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
