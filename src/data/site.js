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
    { label: 'Services', href: '#services' },
    { label: 'Expertise', href: '#expertise' },
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
      role: 'AI Engineer',
      company: 'iCodeJR',
      period: '2024 - Present',
      description:
        'Employed as an AI Engineer, building AI-native digital experiences, LLM-powered learning tools, interactive web applications, and scalable component systems.',
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
  hint: 'Hover or tap a card to see how I use it.',
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

export const expertise = {
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

// Five concept sites, one per kind of business. Each is a real page in this
// build — its entry is work/<slug>/index.html and its source src/sites/<slug>/ —
// so `liveUrl` is a path inside the portfolio rather than an external link.
// Card art lives in public/previews/<slug>-desktop.webp and -phone.webp.
export const projects = {
  heading: 'Featured Projects',
  intro:
    'Five concept sites for five kinds of business, each designed and built from an empty file. None of them is a mock-up: open one and book the table, reserve the room, plan the trip.',
  cardCta: 'Preview live',
  previewCta: 'Preview here',
  visitCta: 'Open full site',
  note: 'Concept work. The businesses are fictional, nothing you submit leaves your browser, and the photography is from Unsplash.',
  items: [
    {
      slug: 'marigold',
      industry: 'Restaurant & café',
      title: 'Marigold Canteen',
      tagline:
        'An all-day South Indian canteen with the volume up: a searchable menu, table reservations, and a pickup order that adds itself up.',
      year: '2026',
      accent: '#ff4100',
      stage: '#ffc700',
      liveUrl: 'work/marigold/',
      tryThis: [
        'Book a table: choose guests, a date and a time. Slots that are full are greyed out.',
        'Filter the menu to vegan or gluten-free, or search it by name.',
        'Add dishes to the tray and watch packing, GST and the total follow.',
        'Build a filter coffee at the Kaapi bar and see the tumbler change.',
      ],
      design: {
        idea: 'Poster-loud and completely flat. Condensed capitals over bands of orange, yellow and pink, plates cut into circles, blue used only for outlines, and not a single shadow.',
        type: ['Anton', 'Archivo'],
        palette: ['#ff4100', '#ffc700', '#fdbeba', '#1573dd', '#292a2c'],
      },
      build: ['React 19', 'Framer Motion', 'Hand-written CSS', 'Variable fonts', 'Calendar (.ics) export', 'localStorage'],
    },
    {
      slug: 'kurinji',
      industry: 'Hotel & homestay',
      title: 'Kurinji House',
      tagline:
        'A five-room planter’s bungalow in the Nilgiris with a complete booking engine: nightly rates on the calendar, rooms, extras, and a booking you can look up again.',
      year: '2026',
      accent: '#eac486',
      stage: '#193741',
      liveUrl: 'work/kurinji/',
      tryThis: [
        'Pick dates on the two-month calendar. Every night shows its own rate and sold-out nights cannot be crossed.',
        'Choose a room, add a station transfer, and watch the total re-price with tax.',
        'Finish the booking, then find it under “Manage a booking” in the footer and cancel it.',
        'Open any room for its bed, view and floor area.',
      ],
      design: {
        idea: 'Quiet and photographic. Deep teal and linen, a bookish serif for anything said aloud, and gold kept strictly for ornament so the one outlined button always reads as the action.',
        type: ['Newsreader', 'Nunito Sans'],
        palette: ['#193741', '#ebe7e1', '#eac486', '#ffffff'],
      },
      build: ['React 19', 'Framer Motion', 'Seasonal rate engine', 'Focus-trapped dialogs', 'Print stylesheet', 'localStorage'],
    },
    {
      slug: 'stillwater',
      industry: 'Spa & boutique',
      title: 'Stillwater',
      tagline:
        'A bathhouse and apothecary on the Goa coast. Build a visit from treatments, choose a therapist and an hour, and shop the shelf.',
      year: '2026',
      accent: '#a3bfdb',
      stage: '#d5e0ea',
      liveUrl: 'work/stillwater/',
      tryThis: [
        'Add treatments to “Your visit”, then book them with a therapist, a day and a time.',
        'Pick a day that is full and it offers the next free one.',
        'Tilt the gift card with your pointer, then write a name and a note on it.',
        'Fill the bag from the apothecary until delivery becomes free.',
      ],
      design: {
        idea: 'White, mist and one pale blue. A light serif at display sizes, square surfaces against pill buttons, and products set out like specimens on a shelf.',
        type: ['Cormorant Garamond', 'Figtree'],
        palette: ['#ffffff', '#d5e0ea', '#a3bfdb', '#134fc2', '#231f20'],
      },
      build: ['React 19', 'Framer Motion', 'Pointer-driven 3D card', 'Slot availability', 'Cart with thresholds', 'localStorage'],
    },
    {
      slug: 'ninefold',
      industry: 'Art gallery',
      title: 'Ninefold',
      tagline:
        'A contemporary gallery in Fort Kochi. Walk the current show in a 3D viewing room hung to scale, then shortlist works and enquire.',
      year: '2026',
      accent: '#ff7f41',
      stage: '#16181d',
      liveUrl: 'work/ninefold/',
      tryThis: [
        'Step into the viewing room: look around, walk closer, change the wall tone.',
        'Filter and sort the works, then open one and zoom in.',
        'Shortlist a few and send a single enquiry for all of them.',
        'Reserve a seat at a talk in the programme.',
      ],
      design: {
        idea: 'The site gets out of the way. Black on white, one typeface at one weight, hairline rules and square corners, with orange reserved for status. Every artwork is generated in code, so nothing here borrows a real artist’s work.',
        type: ['IBM Plex Sans'],
        palette: ['#ffffff', '#000000', '#ff7f41'],
      },
      build: ['React 19', 'CSS 3D transforms', 'Seeded generative SVG', 'Keyboard navigation', 'Framer Motion', 'localStorage'],
    },
    {
      slug: 'bonjour-pondy',
      industry: 'Travel & trip planning',
      title: 'Bonjour Pondy',
      tagline:
        'A trip planner for Pondicherry. Say how long you have and what you like, and it lays out each day by hour and distance on a map you can rearrange.',
      year: '2026',
      accent: '#ffd400',
      stage: '#0a66ff',
      liveUrl: 'work/bonjour-pondy/',
      tryThis: [
        'Build a trip, then shuffle it or change the pace from easy to packed.',
        'Move, swap or remove a stop. Arrival times and walking distances recalculate.',
        'Switch the map to 3D and the pins stand up.',
        'Check the month you are travelling in, and what the trip will cost.',
      ],
      design: {
        idea: 'Sun yellow, sea blue and ink, with pink for the one thing you press. A town drawn in flat shapes along the curve of the horizon, and a map in the same hand.',
        type: ['Changa One', 'Instrument Sans'],
        palette: ['#ffd400', '#0a66ff', '#1d1d1b', '#e0106f', '#fff7d6'],
      },
      build: ['React 19', 'Itinerary engine', 'SVG map with a viewBox camera', 'CSS 3D tilt', 'Print stylesheet', 'localStorage'],
    },
  ],
}

export const footer = {
  // The contact block that opens the footer; the hero's button lands here.
  contact: {
    heading: "Let's Build Something Extraordinary",
    links: [
      { label: 'Book a Call', href: 'https://calendly.com/mailmeontejaswi/30min' },
      { label: 'mailmeontejaswi@gmail.com', href: 'mailto:mailmeontejaswi@gmail.com' },
    ],
  },
  columns: [
    {
      heading: 'Capabilities',
      links: [
        { label: 'Rapid MVP Sprint', href: '#mvp-sprint' },
        { label: 'Brand Building', href: '#branding' },
        { label: 'AI Engineering', href: '#expertise' },
        { label: 'Creative 3D Dev', href: '#expertise' },
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
  ],
  copyright: { prefix: '© Copyright', year: '2026' },
  credits: { text: 'Brand Builder & Rapid MVP Architect for Startups' },
}
