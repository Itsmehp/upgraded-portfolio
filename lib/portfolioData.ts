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
    description: "Front-end developer, I create web pages with UI / UX features and interface, I have currently worked on a few ready to deploy apps in React which includes A CRUD application. I've also created websites for local businesses which helped them increase their reach.",
    experience: "2 Years",
    completed: "8 + Projects",
    support: "Online 24/7",
    skills: [
      { name: "HTML", level: "Advanced", category: "frontend" },
      { name: "CSS", level: "Advanced", category: "frontend" },
      { name: "JavaScript", level: "Intermediate", category: "frontend" },
      { name: "React", level: "Intermediate", category: "frontend" },
      { name: "Bootstrap", level: "Basic", category: "frontend" },
      { name: "Git", level: "Intermediate", category: "frontend" },
      { name: "PHP", level: "Intermediate", category: "backend" },
      { name: "Node.js", level: "Basic", category: "backend" },
      { name: "Python", level: "Intermediate", category: "backend" },
      { name: "MySQL", level: "Basic", category: "backend" },
      { name: "Firebase", level: "Basic", category: "backend" },
      { name: "Oracle", level: "Basic", category: "backend" }
    ],
    technologies: ["HTML", "CSS", "JavaScript", "React", "Bootstrap", "Git", "PHP", "Node.js", "Python", "MySQL", "Firebase", "Oracle"]
  },
  experience: [
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
