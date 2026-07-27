/* Centralized DeveloperFolio Portfolio Configuration */

export const illustration = {
  animated: true // Set to false to disable SVG animations
};

export const greeting = {
  username: "Tejaswi Dubey",
  title: "Hi all, I'm Tejaswi",
  subTitle:
    "A passionate Full Stack Software Developer 🚀 having an experience of building Web and Mobile applications with JavaScript / Reactjs / Nodejs / React Native and some other cool libraries and frameworks.",
  resumeLink:
    "https://drive.google.com/file/d/1ofbXm56q4lHkrh480_5N9dDndS2T12H1/view?usp=sharing",
  displayGreeting: true
};

export const socialMediaLinks = {
  github: "https://github.com/saadpasta",
  linkedin: "https://www.linkedin.com/in/saadpasta/",
  gmail: "saadpasta70@gmail.com",
  gitlab: "https://gitlab.com/saadpasta",
  facebook: "https://www.facebook.com/saad.pasta.7",
  medium: "https://medium.com/@saadpasta",
  stackoverflow: "https://stackoverflow.com/users/10422806/saad-pasta",
  instagram: "https://www.instagram.com/saadpasta/",
  twitter: "https://twitter.com/saadpasta",
  kaggle: "https://www.kaggle.com/saadpasta",
  codechef: "https://www.codechef.com/users/saadpasta",
  display: true
};

export const skillsSection = {
  title: "What I do",
  subTitle: "CRAZY FULL STACK DEVELOPER WHO WANTS TO EXPLORE EVERY TECH STACK",
  skills: [
    "⚡ Develop highly interactive Front end / User Interfaces for your web and mobile applications",
    "⚡ Progressive Web Applications ( PWA ) in normal and SPA Stacks",
    "⚡ Integration of third party services such as Firebase / AWS / Digital Ocean"
  ],
  softwareSkills: [
    {
      skillName: "html-5",
      fontAwesomeClassName: "fab fa-html5",
      iconName: "FileCode",
      color: "#E34F26"
    },
    {
      skillName: "css3",
      fontAwesomeClassName: "fab fa-css3-alt",
      iconName: "Palette",
      color: "#1572B6"
    },
    {
      skillName: "sass",
      fontAwesomeClassName: "fab fa-sass",
      iconName: "Flame",
      color: "#CC6699"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassName: "fab fa-js",
      iconName: "Code",
      color: "#F7DF1E"
    },
    {
      skillName: "reactjs",
      fontAwesomeClassName: "fab fa-react",
      iconName: "Atom",
      color: "#61DAFB"
    },
    {
      skillName: "nodejs",
      fontAwesomeClassName: "fab fa-node",
      iconName: "Server",
      color: "#339933"
    },
    {
      skillName: "swift",
      fontAwesomeClassName: "fab fa-swift",
      iconName: "Zap",
      color: "#FA7343"
    },
    {
      skillName: "npm",
      fontAwesomeClassName: "fab fa-npm",
      iconName: "Box",
      color: "#CB3837"
    },
    {
      skillName: "sql-database",
      fontAwesomeClassName: "fas fa-database",
      iconName: "Database",
      color: "#47A248"
    },
    {
      skillName: "firebase",
      fontAwesomeClassName: "fas fa-fire",
      iconName: "Flame",
      color: "#FFCA28"
    },
    {
      skillName: "python",
      fontAwesomeClassName: "fab fa-python",
      iconName: "Terminal",
      color: "#3776AB"
    },
    {
      skillName: "docker",
      fontAwesomeClassName: "fab fa-docker",
      iconName: "Container",
      color: "#2496ED"
    }
  ],
  display: true
};

export const techStack = {
  viewSkillBars: true,
  experience: [
    {
      Stack: "Frontend / Design",
      progressPercentage: "90%"
    },
    {
      Stack: "Backend",
      progressPercentage: "70%"
    },
    {
      Stack: "Programming",
      progressPercentage: "85%"
    }
  ],
  display: true
};

export const educationInfo = {
  display: true,
  schools: [
    {
      schoolName: "Pondicherry University",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/Pondicherry_University_logo.png/220px-Pondicherry_University_logo.png",
      subHeader: "Bachelor of Technology / Computer Science & Engineering",
      duration: "Puducherry, India",
      desc: "Studying software engineering, computer science core concepts, web technologies, algorithms, and modern application development.",
      descBullets: [
        "Focused on modern software engineering principles and full-stack applications.",
        "Active member of developer student clubs and tech workshops.",
        "Built innovative web project solutions."
      ]
    }
  ]
};

export const workExperiences = {
  display: true,
  experience: [
    {
      role: "Software Engineer",
      company: "Clever Programmer",
      companylogo: "https://img.icons8.com/color/96/000000/google-code.png",
      date: "Jan 2022 – Present",
      desc: "Built scalable web interfaces and mobile applications using React, Next.js, and Firebase.",
      descBullets: [
        "Led frontend development for cross-platform applications serving 100k+ active users.",
        "Optimized web performance and reduced bundle size by 35%.",
        "Mentored junior developers and instituted code review standards."
      ]
    },
    {
      role: "Front-End Developer Intern",
      company: "Google Summer of Code",
      companylogo: "https://img.icons8.com/color/96/000000/google-logo.png",
      date: "May 2021 – Aug 2021",
      desc: "Contributed open-source code to developer tools and UI design systems.",
      descBullets: [
        "Implemented accessible UI components used by thousands of open-source projects.",
        "Collaborated with international mentors across different timezones."
      ]
    },
    {
      role: "Full Stack Developer",
      company: "Freelance / Self-Employed",
      companylogo: "https://img.icons8.com/color/96/000000/code.png",
      date: "2019 – 2021",
      desc: "Designed and delivered 20+ web and mobile solutions for global clients.",
      descBullets: [
        "Developed custom e-commerce platforms, portfolio templates, and SaaS dashboards.",
        "Integrated Payment Gateways (Stripe, PayPal) and Cloud Storage solutions."
      ]
    }
  ]
};

export const openSource = {
  githubUserName: "saadpasta",
  showGithubProfile: "true",
  display: true,
  projects: [
    {
      id: "developerFolio",
      name: "developerFolio",
      description: "Software Developer Portfolio Template that helps you showcase your work and skills as a software developer",
      createdAt: "2020-03-24T18:00:00Z",
      url: "https://github.com/saadpasta/developerFolio",
      isFork: false,
      languages: [
        { name: "JavaScript", color: "#f1e05a" },
        { name: "CSS", color: "#563d7c" },
        { name: "HTML", color: "#e34c26" }
      ],
      stars: 4800,
      forks: 2100,
      diskUsage: 14500
    },
    {
      id: "react-blog-app",
      name: "react-blog-app",
      description: "A clean, modern React blog application powered by GraphQL and Headless CMS.",
      createdAt: "2021-06-12T10:30:00Z",
      url: "https://github.com/saadpasta/react-blog-app",
      isFork: false,
      languages: [
        { name: "JavaScript", color: "#f1e05a" },
        { name: "React", color: "#61dafb" }
      ],
      stars: 820,
      forks: 340,
      diskUsage: 8200
    },
    {
      id: "food-delivery-rn",
      name: "food-delivery-app",
      description: "Cross-platform mobile application for food ordering built with React Native & Redux.",
      createdAt: "2021-11-05T14:20:00Z",
      url: "https://github.com/saadpasta/food-delivery-app",
      isFork: false,
      languages: [
        { name: "TypeScript", color: "#3178c6" },
        { name: "React Native", color: "#61dafb" }
      ],
      stars: 640,
      forks: 210,
      diskUsage: 12100
    },
    {
      id: "covid19-tracker-react",
      name: "covid19-tracker",
      description: "Real-time interactive global dashboard displaying maps, charts, and statistics.",
      createdAt: "2020-04-10T09:15:00Z",
      url: "https://github.com/saadpasta/covid19-tracker",
      isFork: false,
      languages: [
        { name: "JavaScript", color: "#f1e05a" },
        { name: "CSS", color: "#563d7c" }
      ],
      stars: 1250,
      forks: 490,
      diskUsage: 6700
    }
  ]
};

export const bigProjects = {
  title: "Big Projects",
  subtitle: "SOME STARTUPS AND COMPANIES THAT I HAVE HELPED TO CREATE THEIR TECH",
  projects: [
    {
      image: "https://img.icons8.com/illustrations/120/rocket.png",
      projectName: "DevSpace SaaS Platform",
      projectDesc: "A multi-tenant developer workspace for code sharing and real-time pair programming.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://developerfolio.js.org"
        }
      ]
    },
    {
      image: "https://img.icons8.com/illustrations/120/smartphone.png",
      projectName: "Mobile Commerce Suite",
      projectDesc: "High performance native iOS and Android application template with offline capabilities.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://developerfolio.js.org"
        }
      ]
    }
  ],
  display: true
};

export const achievementSection = {
  title: "Achievements And Certifications 🏆",
  subtitle: "ACHIEVEMENTS, CERTIFICATIONS, AWARD LETTERS AND SOME COOL STUFF THAT I HAVE DONE!",
  achievementsCards: [
    {
      title: "Google Summer of Code Code Contributor",
      subtitle: "Awarded GSoC certificate for successfully completing open source contributions.",
      image: "https://img.icons8.com/color/96/000000/google-logo.png",
      imageAlt: "Google Logo",
      footer: [
        {
          name: "Certification",
          url: "https://summerofcode.withgoogle.com"
        },
        {
          name: "Project Link",
          url: "https://github.com/saadpasta"
        }
      ]
    },
    {
      title: "AWS Certified Developer – Associate",
      subtitle: "Validated expertise in developing, deploying, and debugging cloud-based applications.",
      image: "https://img.icons8.com/color/96/000000/amazon-web-services.png",
      imageAlt: "AWS Badge",
      footer: [
        {
          name: "Validate Credential",
          url: "https://aws.amazon.com/verification"
        }
      ]
    },
    {
      title: "National Hackathon 1st Place Winner",
      subtitle: "First rank among 150+ teams for building an AI-powered educational web app.",
      image: "https://img.icons8.com/color/96/000000/trophy.png",
      imageAlt: "Trophy Icon",
      footer: [
        {
          name: "View Award",
          url: "https://developerfolio.js.org"
        }
      ]
    }
  ],
  display: true
};

export const blogSection = {
  title: "Blogs",
  subtitle: "WITH LOVE FOR DEVELOPING COOL STUFF, I LOVE TO WRITE AND SHARE MY KNOWLEDGE",
  display: true,
  blogs: [
    {
      url: "https://medium.com/@saadpasta/developerfolio-how-to-build-a-stellar-portfolio-site",
      title: "How to Build a Stellar Software Developer Portfolio with DeveloperFolio",
      description: "A step-by-step guide to showcasing your skills, projects, and achievements to stand out to recruiters."
    },
    {
      url: "https://medium.com/@saadpasta/mastering-react-hooks-in-2023",
      title: "Mastering React Hooks & State Management",
      description: "Learn how to simplify state logic using custom hooks, useContext, and performant state patterns."
    }
  ]
};

export const talksSection = {
  title: "Talks & Presentations",
  subtitle: "I LIKE TO SHARE MY KNOWLEDGE AND TALK ABOUT CUTTING-EDGE WEB TECHNOLOGIES",
  display: true,
  talks: [
    {
      title: "Building High Performance React Applications",
      subtitle: "Keynote presentation at DevFest 2022 on React optimization, code-splitting, and memoization techniques.",
      slides_url: "https://speakerdeck.com",
      event_url: "https://devfest.com"
    }
  ]
};

export const podcastSection = {
  title: "Podcast 🎙️",
  subtitle: "I LOVE TALKING ABOUT TECHNOLOGY, OPEN SOURCE, AND CAREER GROWTH IN SOFTWARE ENGINEERING",
  display: true,
  podcast: [
    "https://anchor.fm/saadpasta/episodes/Building-Open-Source-Projects-e12345"
  ]
};

export const contactInfo = {
  title: "Reach Out to Me! ☎️",
  subtitle: "DISCUSS A PROJECT OR JUST WANT TO SAY HI? MY INBOX IS OPEN FOR ALL.",
  number: "+91 8809955064",
  email_address: "tejaswi.demo@example.com",
  location_address: "Puducherry, India",
  isHireable: true
};

export const twitterDetails = {
  userName: "saadpasta",
  display: true
};
