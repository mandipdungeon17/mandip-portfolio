export const profile = {
  name: "Mandip Pandit",
  role: "Software Engineer",
  location: "Bengaluru, India",
  email: "mandip.pandit95@gmail.com",
  linkedin: "https://www.linkedin.com/in/mandip-pandit",
  github: "https://github.com/mandipdungeon17",
  leetcode: "https://leetcode.com/u/mandip17",
  resume: "/Mandip-Pandit-Resume.pdf",
};

export const impact = [
  { value: "75%", count: 75, suffix: "%", label: "faster system loading", note: "Composite cache optimization" },
  { value: "15%", count: 15, suffix: "%", label: "less production downtime", note: "Root-cause analysis across environments" },
  { value: "10+", count: 10, suffix: "+", label: "warehouse microservices", note: "High-volume transaction workflows" },
  { value: "10–15", count: null, suffix: "", label: "engineers mentored", note: "Across India, Mexico, and the USA" },
];

export const experience = [
  {
    company: "Intelligrated Services · Honeywell",
    scene: "warehouse",
    role: "Software Developer II",
    period: "Apr 2022 — Present",
    location: "Bengaluru, India",
    summary:
      "Building and shipping software for warehouse operations—where reliable systems have a direct impact on the flow of real work.",
    highlights: [
      "Delivered 10+ microservices for the Momentum Warehouse System, supporting storage, routing, and picking automation.",
      "Designed and shipped two business-critical customer epics with less than 5% post-deployment bug density.",
      "Reduced loading time by 75% through composite-cache optimization and cut production downtime by 15% with focused root-cause analysis.",
      "Built a reusable GS1 barcode-parsing library now in customer-site UAT, plus a React and Node.js dashboard deployed to production.",
      "Built LogLens, a filesystem-based log viewer now used by the team for everyday troubleshooting.",
      "Mentored a distributed team of 10–15 engineers and consistently delivered sprint commitments without regression spillovers.",
      "Contributed to 10+ epics and achieved 95%+ success on non-functional requirements during 24×7 test runs.",
    ],
    stack: ["Java", "Spring Boot", "Microservices", "React", "Node.js", "Azure"],
  },
  {
    company: "EdgeVerve · Infosys",
    scene: "banking",
    role: "Senior System Engineer",
    period: "Nov 2018 — Apr 2022",
    location: "Bengaluru, India",
    summary:
      "Worked on core banking and lending experiences, balancing customer-facing delivery with the performance demands of high-volume financial systems.",
    highlights: [
      "Improved transaction speed by 15% and reduced API response time by 25% through service and Hibernate tuning.",
      "Built REST APIs and a single-page application for the Loans module, contributing to a 20% customer-satisfaction improvement.",
      "Supported go-lives and defect triage for multiple bank clients.",
    ],
    stack: ["Java", "Spring", "Hibernate", "REST APIs", "Angular", "Bootstrap"],
  },
];

export const projects = [
  {
    number: "01",
    title: "LogLens",
    eyebrow: "INTERNAL TOOLING · OBSERVABILITY",
    description:
      "A lightweight, browser-based log viewer for on-prem microservices. It reads service logs directly from the filesystem—no extra infrastructure to maintain.",
    impact: "The team's go-to tool for day-to-day troubleshooting; being evaluated for a formal rollout.",
    stack: ["Java", "HTML", "Python"],
    href: "https://github.com/mandipdungeon17/core-loglens",
    visual: "loglens",
    featured: true,
  },
  {
    number: "02",
    title: "EquityCart",
    eyebrow: "SYSTEM DESIGN · MICROSERVICES",
    description:
      "A hybrid commerce and investing concept: purchases earn fractional-share rewards, with holdings available to trade or use toward future orders.",
    impact: "Evolved from a monolith into a containerized, production-style microservices architecture.",
    stack: ["Java", "Docker", "Microservices"],
    href: "https://github.com/mandipdungeon17/microservice-concept",
    visual: "equitycart",
    featured: true,
  },
  {
    number: "03",
    title: "Emotion-Based Movie Recommender",
    eyebrow: "RECOMMENDATION · MULTI-USER",
    description:
      "A movie discovery app that starts with the feeling you want from a film—not its genre or rating—and makes group picks easier.",
    impact: "An exploration of emotion-led recommendations and collaborative discovery.",
    stack: ["Python", "JavaScript", "HTML"],
    href: "https://github.com/mandipdungeon17/emotion-based-movie-recommender",
    visual: "cinema",
  },
  {
    number: "04",
    title: "ScalperPro",
    eyebrow: "AUTOMATION · OPTIONS",
    description:
      "An automated system for Indian index options that identifies trade setups and manages entries and exits against a personal strategy.",
    impact: "Built to make a discretionary strategy systematic and testable.",
    stack: ["Python"],
    href: "https://github.com/mandipdungeon17/ScalperPro_v2",
    visual: "scalper",
  },
  {
    number: "05",
    title: "React Swiggy Web App",
    eyebrow: "LEARNING BY BUILDING",
    description:
      "A food-delivery interface recreated as a hands-on way to understand React's Virtual DOM, reconciliation, and component architecture.",
    impact: "A practical deep dive into how React turns component state into UI.",
    stack: ["React", "JavaScript", "CSS"],
    href: "https://github.com/mandipdungeon17/react-swiggy-webapp",
    visual: "swiggy",
  },
];

export const skillGroups = [
  {
    name: "Backend & architecture",
    description: "Where most of my production experience lives.",
    skills: ["Java", "Spring Boot", "Microservices", "REST APIs", "Hibernate"],
  },
  {
    name: "Frontend",
    description: "Useful, clear interfaces for real operational workflows.",
    skills: ["React", "Angular", "Node.js", "HTML", "CSS"],
  },
  {
    name: "Data & messaging",
    description: "Systems that coordinate work and keep state close.",
    skills: ["PostgreSQL", "Kafka", "RabbitMQ", "Hazelcast", "Redis"],
  },
  {
    name: "Cloud & delivery",
    description: "The tooling around repeatable software delivery.",
    skills: ["Azure", "Docker", "Kubernetes", "Gradle", "Git"],
  },
  {
    name: "AI & engineering tools",
    description: "Applied pragmatically to improve the way teams build.",
    skills: ["GitHub Copilot", "GenAI", "RAG"],
  },
];

export const recognition = [
  { award: "Silver Award · Be Courageous", organization: "Honeywell", icon: "medal", theme: "blue" },
  { award: "SPS Star Award · Critical Epic Delivery Under Pressure", organization: "Honeywell", icon: "star", theme: "peach" },
  { award: "VPT Bronze Award · Performance Tuning", organization: "Honeywell", icon: "gauge", theme: "mint" },
  { award: "Customer Delight Award", organization: "Honeywell", icon: "heart", theme: "rose" },
  { award: "Star Performer · LogLens", organization: "Honeywell", icon: "terminal", theme: "violet" },
  { award: "First Go-Live Grand Slam · Leading US Bank", organization: "EdgeVerve", icon: "rocket", theme: "blue" },
  { award: "Rookie of the Team", organization: "EdgeVerve", icon: "sparkles", theme: "peach" },
  { award: "Going Extra Mile", organization: "EdgeVerve", icon: "flag", theme: "mint" },
] as const;
