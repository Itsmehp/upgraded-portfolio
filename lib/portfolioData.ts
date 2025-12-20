// Extracted portfolio data from harshil07.in
// This data structure supports continuous updates via Playwright scraping

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    socialLinks: Array<{ platform: string; url: string; icon?: string }>;
  };
  about: {
    description: string;
    experience: string;
    completed: string;
    support: string;
    skills: Array<{ name: string; level: string; category: 'frontend' | 'backend' }>;
    technologies: string[];
  };
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
    achievements: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    links: {
      github?: string;
      live?: string;
      demo?: string;
    };
    image?: string;
    category?: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    period: string;
  }>;
  services: Array<{
    title: string;
    description: string;
  }>;
  testimonials: Array<{
    name: string;
    testimonial: string;
    role: string;
  }>;
}

export const initialPortfolioData: PortfolioData = {
  personal: {
    name: "Harshil Patel",
    title: "Web Developer",
    bio: "I'm a full-stack web developer based in Germany, and I am very passionate and dedicated towards building and deploying amazing websites. Currently doing Masters in AI and Robotics at Hochschule Hof.",
    email: "harshil.hpz@gmail.com",
    phone: "8200-554-191",
    location: "Germany",
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/Itsmehp", icon: "Github" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/harshil-patel-027715211/", icon: "Linkedin" },
      { platform: "Instagram", url: "https://www.instagram.com/hey.its.hp/", icon: "Instagram" },
      { platform: "Twitter", url: "https://twitter.com/ItsHpLOL", icon: "Twitter" }
    ]
  },
  about: {
    description: "Full-stack developer specializing in React and Next.js. I build scalable web applications with modern tech stacks including TypeScript, Node.js, PostgreSQL, and Prisma. From CRUD applications to enterprise-grade AI quote systems, I create high-performance, responsive interfaces combined with robust backend architectures. I've delivered production-ready applications for businesses and currently working on AI-powered solutions as a Master's thesis student.",
    experience: "2 Years",
    completed: "8 + Projects",
    support: "Online 24/7",
    skills: [
      { name: "React", level: "Advanced", category: "frontend" },
      { name: "Next.js", level: "Advanced", category: "frontend" },
      { name: "TypeScript", level: "Advanced", category: "frontend" },
      { name: "JavaScript", level: "Advanced", category: "frontend" },
      { name: "Tailwind CSS", level: "Advanced", category: "frontend" },
      { name: "HTML", level: "Advanced", category: "frontend" },
      { name: "CSS", level: "Advanced", category: "frontend" },
      { name: "Git", level: "Advanced", category: "frontend" },
      { name: "Node.js", level: "Advanced", category: "backend" },
      { name: "PostgreSQL", level: "Advanced", category: "backend" },
      { name: "Prisma", level: "Advanced", category: "backend" },
      { name: "Express", level: "Intermediate", category: "backend" },
      { name: "Supabase", level: "Intermediate", category: "backend" },
      { name: "Python", level: "Intermediate", category: "backend" },
      { name: "Docker", level: "Intermediate", category: "backend" },
      { name: "n8n", level: "Intermediate", category: "backend" }
    ],
    technologies: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS", "Git", "Node.js", "PostgreSQL", "Prisma", "Express", "Supabase", "Python", "Docker", "n8n"]
  },
  experience: [
    {
      title: "Master Thesis Student",
      company: "EMC2 - Hof, Germany",
      period: "2025 - Present",
      description: "Developed a full-stack AI and rule-based quote generation system for shower enclosures and bathroom solutions. Built scalable backend APIs and a responsive frontend with spatial recognition capabilities.",
      achievements: [
        "Designed and implemented scalable PostgreSQL database with automated product and pricing update scripts",
        "Built responsive frontend integrated with MagicPlan APIs for bathroom layout visualization",
        "Created complex state management for multiple shower enclosure configurations (alcove, corner, U-cabin styles)"
      ]
    },
    {
      title: "Freelancing Web Developer",
      company: "Online",
      period: "2023 - 2024",
      description: "Provided freelance web development services to various clients, creating custom websites and web applications.",
      achievements: [
        "Built responsive websites for local businesses",
        "Increased client reach through modern web solutions",
        "Delivered projects on time with high client satisfaction"
      ]
    },
    {
      title: "Front/Back-End Developer (ReactJS)",
      company: "HP Infosys - India",
      period: "2022 - 2023",
      description: "Worked as a full-stack developer specializing in ReactJS for front-end development.",
      achievements: [
        "Developed and maintained React applications",
        "Collaborated with cross-functional teams",
        "Implemented responsive UI/UX designs"
      ]
    },
    {
      title: "Web Development / Design (ReactJS)",
      company: "Udemy",
      period: "2021-2022",
      description: "Completed comprehensive web development and React design courses.",
      achievements: [
        "Mastered ReactJS fundamentals",
        "Built multiple portfolio projects",
        "Learned modern web development practices"
      ]
    },
    {
      title: "HTML CSS & JavaScript",
      company: "Front-End Intern",
      period: "2021-2022",
      description: "Internship focused on front-end development fundamentals.",
      achievements: [
        "Gained hands-on experience with HTML, CSS, and JavaScript",
        "Built static and dynamic web pages",
        "Learned responsive design principles"
      ]
    }
  ],
  projects: [
    {
      name: "Shower Enclosure Quote System",
      description: "AI and rule-based quote generation platform for shower enclosures featuring spatial recognition, MagicPlan API integration for bathroom layouts, and complex configuration management for alcove, corner, and U-cabin shower styles with millimeter precision measurements.",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Node.js", "Tailwind CSS"],
      links: {},
      category: "Enterprise"
    },
    {
      name: "Investment Calculator",
      description: "A React-based investment calculator for financial planning and analysis.",
      technologies: ["React", "JavaScript", "CSS"],
      links: {
        live: "https://inquisitive-sunflower-692c4c.netlify.app/",
        demo: "https://inquisitive-sunflower-692c4c.netlify.app/"
      },
      category: "Applications"
    },
    {
      name: "Expense Calculator",
      description: "Track and manage expenses with this intuitive calculator application.",
      technologies: ["React", "JavaScript", "CSS"],
      links: {
        live: "https://guileless-concha-eae2cc.netlify.app/",
        demo: "https://guileless-concha-eae2cc.netlify.app/"
      },
      category: "Applications"
    },
    {
      name: "Course Goal Project",
      description: "Goal tracking application for course management and progress monitoring.",
      technologies: ["React", "JavaScript", "CSS"],
      links: {
        live: "https://bright-concha-588c4c.netlify.app",
        demo: "https://bright-concha-588c4c.netlify.app"
      },
      category: "Applications"
    },
    {
      name: "Add Username Project",
      description: "User management system with add, edit, and delete functionality.",
      technologies: ["React", "JavaScript", "CSS"],
      links: {
        live: "https://genuine-maamoul-868ac3.netlify.app/",
        demo: "https://genuine-maamoul-868ac3.netlify.app/"
      },
      category: "Applications"
    },
    {
      name: "Personal Portfolio",
      description: "Modern and responsive personal portfolio website showcasing projects and skills.",
      technologies: ["React", "JavaScript", "CSS"],
      links: {
        live: "https://www.harshil07.in",
        demo: "https://www.harshil07.in"
      },
      category: "Web"
    },
    {
      name: "React Food App",
      description: "Food ordering application with cart functionality and menu browsing.",
      technologies: ["React", "JavaScript", "CSS"],
      links: {
        live: "https://dulcet-travesseiro-77ab7a.netlify.app/",
        demo: "https://dulcet-travesseiro-77ab7a.netlify.app/"
      },
      category: "Applications"
    },
    {
      name: "Mamta Polyfilms",
      description: "Business website for Mamta Polyfilms showcasing products and services.",
      technologies: ["React", "JavaScript", "CSS"],
      links: {
        live: "https://mamtapolyfilms.com",
        demo: "https://mamtapolyfilms.com"
      },
      category: "Web"
    },
    {
      name: "Meru Engineers",
      description: "Corporate website for Meru Engineers with service listings and contact information.",
      technologies: ["React", "JavaScript", "CSS"],
      links: {
        live: "https://meruengineers.com",
        demo: "https://meruengineers.com"
      },
      category: "Web"
    }
  ],
  education: [
    {
      degree: "Masters in Artificial Intelligence and Robotics",
      institution: "Hochschule Hof, Germany",
      period: "2024 - Present"
    },
    {
      degree: "Bachelors in Computer Science",
      institution: "Parul Institute of Technology",
      period: "2017 - 2021"
    }
  ],
  services: [
    {
      title: "Web Developer",
      description: "Building responsive and performant websites using modern frameworks and best practices."
    },
    {
      title: "UI/UX Designer",
      description: "Creating intuitive and beautiful user interfaces with focus on user experience and accessibility."
    },
    {
      title: "ReactJS Developer",
      description: "Developing dynamic web applications with React, focusing on component architecture and state management."
    }
  ],
  testimonials: [
    {
      name: "Harry Clinton",
      testimonial: "A really good job, all aspects of the project were followed step by step and with good results.",
      role: "Client"
    },
    {
      name: "Sara Cill",
      testimonial: "A well-executed project—each step was followed meticulously, delivering a smooth and efficient web application.",
      role: "Client"
    },
    {
      name: "Jhon Doe",
      testimonial: "Great work! Every detail of the project was handled carefully, resulting in a polished and professional website.",
      role: "Client"
    }
  ]
};
