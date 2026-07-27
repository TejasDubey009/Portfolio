// Every string, link and asset on the page lives here, transcribed verbatim from
// expansive-decisions-076459.framer.app. Edit this file to make the site yours.

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
    { label: 'Stack', href: '#stack' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
  cta: { label: 'Sign Up', href: '#contact' },
}

export const hero = {
  marquee: 'LARRY BRONX',
  greeting: "Hi, I'm ",
  name: 'Tejas',
  suffix: '!',
  roles: [
    'UX/UI Expertise',
    'HTML5/CSS3 Mastery',
    'Product Design',
    'Branding',
    'Collaborative Team Player',
  ],
  badge: '✦ SCROLL DOWN ✦ AND KNOW ME BETTER',
  clients: '80+ Happy Clients',
  cta: { label: "Let's Work Together!", href: '#contact' },
}

export const about = {
  heading: 'About Me',
  cvLink: { label: 'Read My CV', href: 'https://twitter.com/CristianMielu' },
  paragraphs: [
    "Greetings! I'm Larry, and I navigate the exciting world of web design, where every pixel serves a purpose. Combining a deep understanding of user experience with a knack for transforming ideas into visually stunning interfaces, I approach each project with a burning passion to craft something truly remarkable.",
    'My web design journey began with a solid foundation in design principles, meticulously honed through years of formal education. I hold a degree in Graphic Design from XYZ University, where I not only acquired technical expertise but also developed a profound appreciation for the beautiful union of aesthetics and functionality.',
    'My tech stack mirrors the vibrant diversity of the web itself. From the core languages of HTML5, CSS3, and JavaScript to an arsenal of design tools like Adobe Creative Suite and Sketch, I stay well-equipped. However, I believe in constantly pushing the boundaries, exploring emerging technologies and design trends to ensure my work remains both timeless and cutting-edge.',
  ],
}

export const testimonials = {
  heading: 'Kind words from Clients',
  items: [
    {
      name: 'David Lee',
      role: 'CEO, Technovation Inc.',
      photo: `${cdn}/2JNdM2O0RnZg1BcZHNgDWoMrhKA.png?width=192&height=192`,
      quote:
        '"Working with Larry was a dream. He took the time to understand our business and target audience, and the website he designed perfectly reflects our brand identity. Larry\'s ongoing support also gives us peace of mind, knowing our website is always running smoothly."',
    },
    {
      name: 'Emily Garcia',
      role: 'Founder, The Painted Palette',
      photo: `${cdn}/lQFJ89Y2vFBRt0WU8OFpJ3ZkPlA.png?width=192&height=192`,
      quote:
        '"As a small business owner, I was nervous about a professional website. But Larry made the process affordable and stress-free. He guided me through everything and delivered a beautiful website that showcases my artwork perfectly. Now I can focus on my passion, knowing my online presence is in good hands thanks to Larry!"',
    },
    {
      name: 'Sarah Jones',
      role: 'Marketing Manager, Green Earth Solar',
      photo: `${cdn}/21y9kg3DMhOUBxbQ3y9CwHNPQO8.png?width=192&height=192`,
      quote:
        '"Larry\'s design transformed our website! It\'s not just gorgeous, but it\'s incredibly user-friendly too. We\'ve seen a huge jump in leads since launch, and customers love the easy navigation. Larry truly exceeded our expectations!"',
    },
  ],
}

export const stack = {
  heading: 'My Stack',
  flipHint: 'Tap to flip',
  cards: [
    { name: 'Framer', logo: 'framer', description: 'Framer revolutionizes my web design workflow. It goes beyond a simple website builder, offering a visual playground where I can craft stunning and interactive websites without getting bogged down in complex code.' },
    { name: 'Figma', logo: 'figma', description: 'Figma is my collaborative design platform of choice. I utilize it to work seamlessly with team members and clients, facilitating real-time feedback and design iterations. Its cloud-based approach streamlines the design process.' },
    { name: 'Notion', logo: 'notion', description: 'Notion helps me keep my projects organized. I use it for project management, task tracking, and as a central hub for documentation, ensuring that everything from design notes to project timelines is in one place.' },
    { name: 'Airtable', logo: 'airtable', description: 'Airtable is my go-to solution for robust data organization. I harness its power to create structured databases, making information easily accessible and ensuring a systematic approach to handling complex datasets.' },
    { name: 'Zapier', logo: 'zapier', description: "Framer serves as my go-to tool for creating interactive prototypes. I use it to bring designs to life, allowing stakeholders to experience the user flow and interactions before development begins. It's invaluable for refining the user experience." },
    { name: 'Lemon Squeezy', logo: 'lemonsqueezy', description: 'LemonSqueezy stands as my comprehensive solution for managing every aspect of my SaaS business. From seamless payment processing and subscription management to global tax compliance and fraud prevention, this all-in-one platform simplifies the complexities of running a SaaS operation.' },
    { name: 'Mailchimp', logo: 'mailchimp', description: 'Mailchimp is my go-to for elevating outreach strategies. I utilize its features to craft engaging email campaigns, manage subscriber lists, and analyze performance data, ensuring effective and targeted communication.' },
    { name: 'Slack', logo: 'slack', description: 'Slack is the cornerstone of my collaborative workflow. It fosters a dynamic environment where teams can seamlessly exchange ideas, share files, and provide real-time feedback.' },
    { name: 'Creative Cloud', logo: 'creativecloud', description: 'Adobe Creative Cloud is my comprehensive toolkit for unleashing creative potential. It offers a powerful suite of applications like Photoshop, Illustrator, and After Effects, each designed to excel in specific design tasks.' },
    { name: 'Chat GPT', logo: 'chatgpt', description: 'ChatGPT is my content generation and assistance tool. I leverage it for content ideas, copywriting, and problem-solving. It provides invaluable insights and suggestions that enhance the quality of my projects.' },
    { name: 'HTML', logo: 'html', description: 'HTML5 is the backbone of my web design work. I use it to structure content, ensuring that websites are semantically meaningful and accessible. It forms the foundation upon which the visual elements of a site are built.' },
    { name: 'CSS', logo: 'css', description: "CSS3 is my styling and layout powerhouse. It's instrumental in creating visually appealing websites by controlling everything from fonts and colors to the responsive design that adapts to various screen sizes." },
  ],
}

export const services = {
  heading: 'Services',
  items: [
    { number: '01', title: 'Website Design & Development', shape: 'yellowCube', description: "Transform your vision into a reality. This service encompasses crafting beautiful and user-friendly websites that not only captivate visitors but also guide them towards specific actions, whether it's making a purchase, signing up for a newsletter, or contacting you. Our process involves in-depth understanding of your target audience, user experience (UX) design to ensure intuitive navigation and clear calls to action, and front-end development utilizing the latest web technologies to create a visually stunning and functional website." },
    { number: '02', title: 'Landing Page Design', shape: 'redPyramid', description: 'Landing pages are laser-focused on specific marketing goals. We design high-impact landing pages that grab attention, communicate your value proposition clearly, and seamlessly convert visitors into leads or paying customers. From crafting compelling headlines and captivating visuals to optimizing conversion elements like CTAs (calls to action) and lead capture forms, we ensure your landing page delivers a powerful first impression and drives results.' },
    { number: '03', title: 'E-commerce Design', shape: 'blueCube', description: "Your online store should be a seamless shopping experience. We create user-friendly and visually appealing e-commerce websites that not only showcase your products beautifully but also make it easy for customers to browse, find what they're looking for, and complete their purchases effortlessly. We incorporate clear product information, intuitive navigation, secure payment gateways, and a streamlined checkout process to maximize sales conversions." },
    { number: '04', title: 'Website Prototyping', shape: 'greenCylinder', description: "Don't wait until development begins to see your website come to life. We utilize advanced prototyping tools like Framer to build interactive prototypes that simulate the final user experience. These prototypes allow you to test user flow, visualize interactions, and gather valuable feedback before any code is written. This iterative process ensures your website is on the right track from the very beginning." },
    { number: '05', title: 'Responsive Design', shape: 'orangeSphere', description: 'Your website needs to look great and function flawlessly across all devices, from desktop computers to tablets and smartphones. Our responsive design approach ensures your website adapts automatically to different screen sizes, delivering an optimal user experience for all visitors, regardless of their device.' },
    { number: '06', title: 'Content Management System (CMS) Integration', shape: 'purpleCircle', description: "Empower yourself to easily manage your website content. We seamlessly integrate popular CMS platforms like WordPress into your website, allowing you to update content, add new pages, and manage images without needing any coding knowledge. This puts you in control of your website's content and keeps it fresh and engaging." },
    { number: '07', title: 'Website Maintenance & Support', shape: 'yellowHeart', description: 'Your website is an ongoing investment. We provide ongoing website maintenance and support services to ensure your website stays up-to-date, secure against potential threats, and functions smoothly. This includes regular software updates, security scans, performance monitoring, and troubleshooting any technical issues that may arise.' },
    { number: '08', title: 'Brand Identity Design', shape: 'orangeStar', description: 'Your website should be a seamless extension of your brand. We develop a cohesive brand identity that goes beyond the website, encompassing elements like logos, color palettes, fonts, and design styles. This creates a consistent and memorable brand image across all your digital platforms, strengthening brand recognition and trust with your audience.' },
    { number: '09', title: 'SEO Optimization', shape: 'blueGem', description: "Get found by your target audience in search results. We incorporate basic SEO (Search Engine Optimization) best practices to improve your website's ranking in search engine results pages (SERPs) for relevant keywords. This helps potential customers discover your website organically, increasing website traffic and generating leads." },
    { number: '10', title: 'Website Accessibility Audit', shape: 'limeCube', description: 'Websites should be accessible to everyone. We conduct website accessibility audits to ensure your website adheres to WCAG (Web Content Accessibility Guidelines) standards. This makes your website usable by people with disabilities, promoting inclusivity and potentially expanding your audience reach.' },
    { number: '11', title: 'Design System Creation', shape: 'yellowPill', description: 'Ensure design consistency across all digital platforms. We develop a design system that provides a collection of reusable components, including UI elements, design patterns, and code snippets. This streamlines the design and development process, promotes brand consistency, and empowers your team to create future digital assets that seamlessly integrate with your existing website.' },
    { number: '12', title: 'User Experience (UX) Research & Testing', shape: 'pinkGem', description: "Put your users at the center of the design process. We conduct user research and usability testing to understand your target audience's needs, preferences, and pain points. This valuable data is then used to optimize the user experience (UX) of your website, ensuring it is intuitive, user-friendly, and ultimately helps users achieve their goals." },
  ],
}

export const projects = {
  heading: 'Projects',
  more: { label: 'View More', href: '#projects' },
  items: [
    { category: 'Web Design', title: 'Reelio - Photography & film studio Framer template', href: '#projects', image: `${cdn}/DzPnpdhCpUNilUZXTT2OZOvumWA.png?scale-down-to=2048` },
    { category: 'Web Design', title: 'Vitalo - Personal training & coaching Framer template', href: '#projects', image: `${cdn}/eZQ1X1Fpw11apl285CIeN8iEVI.png?scale-down-to=2048` },
    { category: 'Web Design', title: 'Artikle - Membership Framer Template', href: '#projects', image: `${cdn}/pwnBF4uZrCSugu0a8ZiDdaD4A4.png?scale-down-to=2048` },
    { category: 'Web Design', title: 'Flowpath - AI Automation Template', href: '#projects', image: `${cdn}/UFfz36PjDofFGqSVyD7dxLp6G4M.png?scale-down-to=2048` },
    { category: 'Web Design', title: 'Kudos - Design Agency Website', href: '#projects', image: `${cdn}/LAZePzksNGsqwC1vEotMzZH3EdE.png?scale-down-to=2048` },
    { category: 'Web Design', title: 'Neozen - Portfolio Framer Template', href: '#projects', image: `${cdn}/JeMGptNvDtMI6CES89lQ0yjQ40.png?scale-down-to=2048` },
  ],
}

export const footer = {
  wordmark: 'COHESION',
  columns: [
    {
      heading: 'Contact Me',
      links: [
        { label: 'Book a Call', href: 'https://calendly.com/' },
        { label: 'mielucristian@gmail.com', href: 'mailto:mielucristian@gmail.com' },
      ],
    },
    {
      heading: 'Useful Links',
      links: [
        { label: 'Home', href: '#home' },
        { label: '404 Page', href: '#home' },
        { label: 'Licensing', href: '#home' },
        { label: 'Documentation', href: 'https://github.com/mielucristian/cohesion-documentation' },
      ],
    },
    {
      heading: 'Social',
      links: [
        { label: 'Framer', href: 'https://framer.link/UdEP7eA' },
        { label: 'X (Twitter)', href: 'https://twitter.com/CristianMielu' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/cristian-mielu-a8b2b3b5/' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#home' },
        { label: 'Cookie Policy', href: '#home' },
      ],
    },
  ],
  copyright: { prefix: '© Copyright', year: '2026' },
  credits: {
    prefix: 'Made by',
    author: { label: 'UIhub.design', href: 'https://www.uihub.design/' },
    middle: 'in',
    tool: { label: 'Framer', href: 'https://framer.link/cristianmielu' },
  },
}
