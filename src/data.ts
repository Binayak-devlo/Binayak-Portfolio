import { SkillCategory, Project, WorkExperience, EducationItem } from "./types";

export const PERSONAL_DETAILS = {
  name: "Binayak Patri",
  title: "Software Engineer & Web Developer",
  tagline: "Building resilient web applications and intelligent interfaces with a clean, user-centric approach.",
  phone: "9692121301",
  email: "binayakpatri01@gmail.com",
  linkedIn: "https://www.linkedin.com/in/binayak-patri-9641102b9",
  gitHub: "https://github.com/Binayak-devlo",
  nakuri: "https://www.naukri.com/mnjuser/profile",
  locationName: "Nakuri, India",
  aboutSummary: "Detail-oriented software professional with a robust background in building full-stack web experiences, real-time tools, and providing end-to-end technical support. Experienced in React, Java, Node.js, and Python-driven backend logic, with a track record of driving system efficiency and seamless user engagement."
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    skills: ["JavaScript", "Java", "C", "C++", "HTML", "CSS", "Python"]
  },
  {
    id: "frontend",
    title: "Frontend Development",
    skills: ["React.js", "Tailwind CSS", "Next.js", "Framer Motion", "HTML5", "CSS3", "Responsive Design"]
  },
  {
    id: "backend",
    title: "Backend Development",
    skills: ["Node.js", "Express.js", "RESTful APIs"]
  },
  {
    id: "databases",
    title: "Databases & Storage",
    skills: ["MySQL", "MongoDB"]
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    skills: ["Git", "GitHub", "Appwrite"]
  },
  {
    id: "other",
    title: "Methodologies & Strengths",
    skills: ["RESTful APIs", "Responsive Design", "Agile Methodologies", "Quick Learner"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "chat-boot",
    title: "Chat-Boot",
    type: "College Project",
    organization: "BPUT",
    description: "Developed an AI-powered chatbot capable of understanding and responding to natural language queries using OpenAI. Designed and implemented conversational flows for customer service and FAQs, improving user engagement by 60%. Managed stateful communications and robust data privacy controls.",
    techUsed: ["Python", "Flask", "OpenAI API", "MongoDB", "JavaScript", "CSS"],
    engagementIncrease: "60%",
    highlights: [
      "Built resilient backend conversational flows using Python and Flask.",
      "Integrated OpenAI APIs to achieve human-like natural language querying capabilities.",
      "Managed user sessions and structured query logging safely with MongoDB.",
      "Ensured thorough data privacy standards and session lease management."
    ]
  },
  {
    id: "voice-recognition",
    title: "Voice Recognition System",
    type: "Personal Project",
    description: "Developed a real-time voice recognition system capable of converting spoken language into text with over 90% accuracy. Built an intuitive Flask-based user interface for microphone input capturing, audio compression, and instantaneous text layout rendering.",
    techUsed: ["Python", "Flask", "PyAudio", "NLP", "Audio Preprocessing", "Noise Reduction Filters"],
    accuracyMetric: "90%+",
    highlights: [
      "Constructed a user-friendly interface with Flask for microphone input and text outputs in real time.",
      "Applied precise Natural Language Processing (NLP) rules to map verbal instructions to software commands.",
      "Engineered multi-language recognition capabilities and custom sound-trigger definitions.",
      "Optimized signal performance utilizing noise reduction filters, spectral-subtraction, and PyAudio audio stream captures."
    ]
  },
  {
    id: "bookpedia",
    title: "BookPedia",
    type: "Personal Project",
    description: "Developed an interactive book discovery web application leveraging the Google Books API. Integrated layered caching, query filters, local custom-shelves, and detailed book previews packaged under an aesthetic UI.",
    techUsed: ["JavaScript", "HTML", "CSS", "Google Books API", "Local Storage", "Responsive UI/UX"],
    highlights: [
      "Leveraged Google Books API to access millions of dynamic book profiles and real-time summaries.",
      "Implemented advanced keyword filtering covering genres, authors, publication timelines, and average ratings.",
      "Created highly persistent customized reading logs and bookshelves with HTML5 Local Storage.",
      "Designed clean error-boundary states, loading feedback spinners, and responsive cover galleries."
    ]
  }
];

export const EXPERIENCE_HISTORY: WorkExperience[] = [
  {
    id: "nippon",
    title: "Software Support Staff",
    company: "Nippon Data System Ltd.",
    period: "Nov 2025 - Present",
    location: "Remote",
    isRemote: true,
    responsibilities: [
      "Provide premium technical support across full-stack production environments.",
      "Diagnose, analyze, and resolve application faults, core UI errors, and server config bottlenecks, coordinating with active engineering cohorts.",
      "Troubleshoot client telemetry logs, rendering bugs, and standard web exception traces.",
      "Support the active feature testing, hotfix integrations, and incremental service rollouts.",
      "Query MongoDB systems back-to-front to verify application states, isolate account discrepancies, and restore transactional flow.",
      "Utilize HTML, CSS, JavaScript, and key API interfaces to inspect and resolve critical frontend rendering faults.",
      "Track system metrics to guarantee strict alignment with established high-availability KPIs.",
      "Coordinate database queries, file updates, software deployments, and routine site maintenance windows."
    ],
    techUsed: ["MongoDB", "HTML", "CSS", "JavaScript", "REST APIs", "Troubleshooting"]
  },
  {
    id: "anudip",
    title: "Full Java & Web Development Intern",
    company: "Anudip Foundation",
    period: "Nov 2023 - Apr 2024",
    location: "West Bengal, India",
    responsibilities: [
      "Engineered clean state-driven full-stack components using React.js and dynamic responsive interfaces.",
      "Mastered Core Java, Object-Oriented Design (OOPs), Exception Safe Architectures, Collections, File Streams, and responsive Multithreaded tasks.",
      "Utilized active Git branching, code-review processes, and collaborative team boards on GitHub.",
      "Configured integrated API endpoints to connect modular React visual frontends with secure backend architectures."
    ],
    techUsed: ["Java", "React.js", "Node.js", "Git", "GitHub", "API Integration", "OOPs"]
  },
  {
    id: "aditya-birla",
    title: "System AM",
    company: "Aditya Birla Capital",
    location: "India",
    period: "Nov 2021 - Jun 2022",
    responsibilities: [
      "Administered, configured, and monitored server platforms, active network workgroups, and enterprise software instances.",
      "Oversaw helpdesk channels to resolve client IT help ticketing swiftly within standard SLA windows.",
      "Co-managed firewall configurations, enterprise VPN routing pools, and client endpoint compliance protocols.",
      "Scheduled, managed, and audited automated data backup and bare-metal recovery plans to ensure secure continuity.",
      "Compiled granular hardware inventory metrics, audit change logs, and detailed infrastructure health parameters."
    ],
    techUsed: ["System Administration", "SLA Compliance", "Firewalls & VPNs", "Backup Strategies", "IT Service Management"]
  }
];

export const EDUCATION_HISTORY: EducationItem[] = [
  {
    id: "mca",
    degree: "Master in Computer Application",
    institution: "Barrister Ranjit Mohanty Institute of Information Technology",
    period: "2022 - 2024",
    gpa: "7.8",
    gpaScale: "10",
    relevantCoursework: ["Software Engineering", "Web Development", "Java", "Database Management"]
  },
  {
    id: "bsc-it",
    degree: "BSc in Information Technology",
    institution: "Bhadrak Autonomous College, Bhadrak",
    period: "2018 - 2021",
    gpa: "7.5",
    gpaScale: "10",
    relevantCoursework: ["OOPs", "C", "RDBMS", "Java", "Algorithms", "STS"]
  }
];
