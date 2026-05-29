export type LinkItem = {
  label: string;
  href: string;
};

export type CreditItem = {
  name: string;
  role: string;
  badge?: string;
};

export type HighlightCard = {
  title: string;
  category: string;
  typeLabel: string;
  description: string;
  image: string;
  previewImage?: string;
  detailImages?: string[];
  href: string;
  detail: {
    role: string;
    stack: string[];
    overview: string;
    problem: string;
    solution: string;
    highlights: string[];
    links?: LinkItem[];
  };
};

export type PaletteItem = {
  value: string;
  text: string;
};

export type ScoreItem = {
  label: string;
  weight: string;
  value: number;
  score: string;
};

export type VoteRow = {
  name: string;
  role: string;
  design: number;
  usability: number;
  creativity: number;
  content: number;
  total: string;
};

export type ProfileTableRow = {
  name: string;
  role: string;
  source: string;
  focus: string;
  stack: string;
  level: string;
  note: string;
};

export type ProfileTableTab = {
  label: string;
  rows: ProfileTableRow[];
};

export const siteMeta = {
  brand: "PPsssJ",
  title: "PPsssJ FE Developer Portfolio",
  eyebrow: "Site of the Day",
  date: "Date",
  score: "88%",
  scoreLabel: "BUILD",
  description:
    "Frontend developer building polished interfaces, motion-rich interactions, and product-focused web experiences.",
  visitHref: "https://github.com/ppsssj",
  visitLabel: "GitHub",
  secondaryCtaHref: "mailto:ppssjj020222@gmail.com",
  secondaryCtaLabel: "Mail",
};

export const marqueeItems = [
  "PPsssJ Portfolio Welcome",
  "Developer Portfolio",
  "Frontend Craft",
  "Interaction Systems",
  "Selected Projects",
  "Product Thinking",
];

export const navigationItems: LinkItem[] = [
  { label: "Home", href: "#creator" },
  { label: "Projects", href: "#highlights" },
  { label: "Belief", href: "#typography" },
  { label: "Details", href: "#details" },
  { label: "Index", href: "#score" },
];

export const socialItems: LinkItem[] = [
  { label: "GitHub", href: "https://github.com/ppsssj" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Gmail", href: "mailto:ppssjj020222@gmail.com" },
  { label: "Naver Mail", href: "mailto:ppssjj020222@naver.com" },
];

export const creatorCredits: CreditItem[] = [
  { name: "Frontend", role: "Interface Craft & Implementation", badge: "FE" },
  { name: "AI", role: "AI Integration & Product Thinking", badge: "AI" },
  { name: "Product", role: "Usable Flow & Rapid Iteration", badge: "PX" },
];

export const heroGallery = [
  "/assets/Hero/img.png",
];

export const highlightCards: HighlightCard[] = [
  {
    title: "CodeGraph",
    category: "Code Visualization",
    typeLabel: "VS Extension",
    description: "Repository structure and code relationships presented as a visual graph experience.",
    image: "/assets/CodeGraph/CodeGraph.png",
    href: "#contact",
    detail: {
      role: "Frontend implementation, graph layout, interaction design",
      stack: ["React", "TypeScript", "Graph UI", "CSS Architecture"],
      overview: "A visual interface that turns repository structure into a readable graph so users can understand code relationships faster.",
      problem: "Large codebases are hard to scan when folders, files, and dependencies only appear as nested text.",
      solution: "I organized the repository as a visual map with clear node hierarchy, readable grouping, and interaction states for exploration.",
      highlights: [
        "Built a graph-first project browsing experience",
        "Designed node hierarchy and visual grouping rules",
        "Focused on making technical structure understandable at a glance",
      ],
    },
  },
  {
    title: "Cogic",
    category: "Code Visualization",
    typeLabel: "VS Extension",
    description: "Node-based interaction flow with animated clicks and structured exploration.",
    image: "/assets/Cogic/Cogic-NodeClick.gif",
    previewImage: "/assets/Cogic/Cogic-NodeClick-poster.png",
    detailImages: [
      "/assets/Cogic/Cogic-NodeClick.gif",
      "/assets/Cogic/Cogic_ScaffoldLab.gif",
      "/assets/Cogic/Cogic-DebugMode.gif",
      "/assets/Cogic/Cogic-NodeClick-poster.png",
      "/assets/Cogic/Cogic-TraceMode.gif",
    ],
    href: "#creator",
    detail: {
      role: "Interaction prototyping, motion detail, frontend UI",
      stack: ["React", "TypeScript", "Animation", "Node Interaction"],
      overview: "A node-click prototype for exploring connected logic through compact visual interactions.",
      problem: "Complex logic flows can feel static and hard to follow when each step is hidden behind text or menus.",
      solution: "I used animated node selection and focused transitions to make each relationship feel direct and inspectable.",
      highlights: [
        "Created an animated node interaction model",
        "Reduced visual noise around selected states",
        "Designed click feedback that makes exploration feel immediate",
      ],
    },
  },
  {
    title: "Git Effects",
    category: "Developer Tooling",
    typeLabel: "VS Extension",
    description: "A motion-focused Git workflow concept that makes code changes easier to scan.",
    image: "/assets/GitEffects/git_effect.gif",
    previewImage: "/assets/GitEffects/git_effects-poster.png",
    detailImages: [
      "/assets/GitEffects/git_effect.gif",
      "/assets/GitEffects/git_effect2.gif",
      "/assets/GitEffects/Git_Effect_CharacterSelect.png",
    ],
    href: "#creator",
    detail: {
      role: "Developer experience design, interface motion, frontend prototype",
      stack: ["React", "Git Workflow", "Motion UI", "CSS"],
      overview: "A developer tooling concept that uses movement and visual emphasis to make Git changes easier to review.",
      problem: "Git states and code changes often require careful reading before users understand what actually changed.",
      solution: "I explored motion cues, contrast, and grouped change states to help developers scan workflow context faster.",
      highlights: [
        "Designed motion states for change review",
        "Grouped workflow information into readable UI moments",
        "Focused on reducing friction in developer-facing interfaces",
      ],
    },
  },
  {
    title: "GraphMind",
    category: "Math Graph Control",
    typeLabel: "Web",
    description: "3D graph interface for exploring mathematical structures through visual and natural language control.",
    image: "/assets/GraphMind/GraphMind.png",
    detailImages: [
      "/assets/GraphMind/GraphMind.png",
      "/assets/GraphMind/GraphMind_graph.png",
      "/assets/GraphMind/GraphMind_surface3d.png",
      "/assets/GraphMind/GraphMind_vault.png",
    ],
    href: "#typography",
    detail: {
      role: "3D graph interaction, math visualization, natural language control flow",
      stack: ["React", "Three.js", "Graph Theory", "Natural Language Control"],
      overview: "A 3D mathematical graph interface where users can inspect graph structures, manipulate nodes, and request explanations through natural language.",
      problem: "Mathematical graphs are difficult to understand when relationships, spatial structure, and transformation rules stay hidden in abstract notation.",
      solution: "I combined 3D graph visualization with natural language controls so users can rotate, filter, transform, and ask for explanations of the graph state.",
      highlights: [
        "Visualized graph relationships as an interactive 3D structure",
        "Connected natural language commands to graph manipulation",
        "Designed explanation flows for reading nodes, edges, and transformations",
      ],
    },
  },
  {
    title: "PrismDesign",
    category: "Design System",
    typeLabel: "Web",
    description: "Color, layout, and component exploration shaped into a polished interface system.",
    image: "/assets/PrismDesign/PrismDesign.gif",
    previewImage: "/assets/PrismDesign/PrismDesign-poster.png",
    detailImages: [
      "/assets/PrismDesign/PrismDesign.gif",
      "/assets/PrismDesign/PrisimDesign_main.png",
      "/assets/PrismDesign/PrismDesign_main1.png",
      "/assets/PrismDesign/PrismDesign_list.png",
      "/assets/PrismDesign/PrismDesign_assets1.png",
      "/assets/PrismDesign/PrismDesign_assets2.png",
      "/assets/PrismDesign/PrismDesign_handtracking.gif",
    ],
    href: "#details",
    detail: {
      role: "Design system exploration, UI composition, frontend implementation",
      stack: ["React", "Design Systems", "CSS", "Figma"],
      overview: "A design system study focused on color, layout rhythm, and reusable component presentation.",
      problem: "Visual systems can become inconsistent when colors, spacing, and components are explored separately.",
      solution: "I treated the interface as a connected system, aligning component rhythm, contrast, and layout structure.",
      highlights: [
        "Explored reusable visual language",
        "Built polished component and layout states",
        "Connected design decisions to frontend implementation",
      ],
    },
  },
  {
    title: "Traffic Noise Prediction System",
    category: "Data Prediction",
    typeLabel: "Web",
    description: "Prediction dashboard for reading traffic noise patterns through clear visual output.",
    image: "/assets/TrafficNoisePredictionSystem/Traffic Noise Prediction System.png",
    detailImages: [
      "/assets/TrafficNoisePredictionSystem/Traffic Noise Prediction System.png",
      "/assets/TrafficNoisePredictionSystem/Traffic-Noise-Prediction-System1.png",
      "/assets/TrafficNoisePredictionSystem/Traffic-Noise-Prediction-System2.png",
      "/assets/TrafficNoisePredictionSystem/Traffic-Noise-Prediction-System3.png",
      "/assets/TrafficNoisePredictionSystem/Traffic-Noise-Prediction-System4.png",
    ],
    href: "#score",
    detail: {
      role: "Dashboard UI, data presentation, product planning",
      stack: ["Data Visualization", "Dashboard UI", "Prediction Model", "Frontend"],
      overview: "A prediction dashboard for interpreting traffic noise patterns through clear status, output, and comparison views.",
      problem: "Prediction results are difficult to act on when users only see raw values without context or visual hierarchy.",
      solution: "I presented noise patterns through dashboard sections that make trends, outputs, and decision points easier to read.",
      highlights: [
        "Structured prediction output for quick interpretation",
        "Designed dashboard sections around practical reading flow",
        "Connected data results to user-facing decision context",
      ],
    },
  },
];

export const palette: PaletteItem[] = [
  { value: "#EDE7DE", text: "#222222" },
  { value: "#1A1A1A", text: "#FFFFFF" },
];

export const stack = [
  "React",
  "TypeScript",
  "Vite",
  "GSAP",
  "Framer Motion",
  "CSS Architecture",
  "Design Systems",
  "Accessibility",
  "Figma",
  "Web Performance",
  "Responsive Layouts",
  "Content Modeling",
];

export const detailDescription =
  "This portfolio presents how I turn ideas into usable products through frontend implementation, AI-driven thinking, rapid prototyping, and interaction details that make each flow easier to understand.";

export const githubUsername = "ppsssj";

export const scoreBreakdown: ScoreItem[] = [
  { label: "Frontend Craft", weight: "35%", value: 92, score: "92%" },
  { label: "Product Thinking", weight: "25%", value: 86, score: "86%" },
  { label: "Interaction Design", weight: "20%", value: 88, score: "88%" },
  { label: "AI Integration", weight: "20%", value: 84, score: "84%" },
];

export const juryVotes: VoteRow[] = [
  { name: "Product Team", role: "Execution Review", design: 9, usability: 8, creativity: 8, content: 7, total: "8.30" },
  { name: "Frontend Lead", role: "Implementation Review", design: 7, usability: 7, creativity: 7, content: 7, total: "7.00" },
  { name: "UX Reviewer", role: "Experience Review", design: 8, usability: 6, creativity: 7, content: 9, total: "7.30" },
];

export const profileTableTabs: ProfileTableTab[] = [
  {
    label: "Tech Stack",
    rows: [
      {
        name: "React",
        role: "Component-based frontend development",
        source: "Frontend",
        focus: "Interface",
        stack: "React",
        level: "Core",
        note: "Reusable UI components and interactive page composition",
      },
      {
        name: "Vite",
        role: "Fast development and production build tooling",
        source: "Build",
        focus: "Bundling",
        stack: "Vite",
        level: "Core",
        note: "Fast dev server, module bundling, and optimized builds",
      },
      {
        name: "JavaScript",
        role: "Browser logic and interaction behavior",
        source: "Language",
        focus: "Logic",
        stack: "JavaScript",
        level: "Core",
        note: "Dynamic UI behavior, event handling, and application flow",
      },
      {
        name: "HTML",
        role: "Semantic structure for web interfaces",
        source: "Markup",
        focus: "Structure",
        stack: "HTML",
        level: "Core",
        note: "Accessible page structure and content hierarchy",
      },
      {
        name: "CSS",
        role: "Responsive styling and visual systems",
        source: "Styling",
        focus: "Layout",
        stack: "CSS",
        level: "Core",
        note: "Responsive layouts, hover states, and polished visual details",
      },
      {
        name: "TypeScript",
        role: "Typed application development",
        source: "Language",
        focus: "Typing",
        stack: "TypeScript",
        level: "Applied",
        note: "Type-safe components, data models, and maintainable React code",
      },
    ],
  },
  {
    label: "Developer Tools",
    rows: [
      {
        name: "Git",
        role: "Version control for development workflow",
        source: "Workflow",
        focus: "Versioning",
        stack: "Git",
        level: "Daily",
        note: "Commit history, branching, and project change tracking",
      },
      {
        name: "GitHub",
        role: "Repository hosting and project publishing",
        source: "Workflow",
        focus: "Repository",
        stack: "GitHub",
        level: "Core",
        note: "Project sharing, source management, and portfolio links",
      },
      {
        name: "VS Code",
        role: "Primary code editing environment",
        source: "Editor",
        focus: "Development",
        stack: "VS Code",
        level: "Daily",
        note: "TypeScript, React, and frontend project editing workflow",
      },
      {
        name: "Figma",
        role: "Interface design and visual planning",
        source: "Design",
        focus: "Prototyping",
        stack: "Figma",
        level: "Applied",
        note: "Layout planning, visual references, and component design",
      },
      {
        name: "Postman",
        role: "API testing and request validation",
        source: "API",
        focus: "Testing",
        stack: "Postman",
        level: "Applied",
        note: "Request testing, response checks, and backend integration support",
      },
      {
        name: "Notion",
        role: "Project notes and knowledge organization",
        source: "Planning",
        focus: "Documentation",
        stack: "Notion",
        level: "Daily",
        note: "Task tracking, research notes, and project documentation",
      },
    ],
  },
  {
    label: "Awards",
    rows: [
      {
        name: "BLEP Data Utilization Competition",
        role: "Data-based problem solving and service planning",
        source: "Competition",
        focus: "Data Utilization",
        stack: "Data Analysis, Service Ideation",
        level: "25.11.20",
        note: "Recognized through a practical data utilization project",
      },
      {
        name: "Best Paper Award, Korea Data Science Society",
        role: "Research contribution in data science",
        source: "Academic",
        focus: "Research",
        stack: "Data Science, Paper Presentation",
        level: "25.12.19",
        note: "Awarded by the Korea Data Science Society",
      },
    ],
  },
  {
    label: "Activities",
    rows: [
      {
        name: "Leadership Staff, LikeLion Club",
        role: "Club operation and peer development support",
        source: "LikeLion",
        focus: "Leadership",
        stack: "PM, FE, Planning, Mentoring, Collaboration",
        level: "25.01 ~ 25.12",
        note: "Supported club activities, project flow, and member collaboration",
      },
      {
        name: "AICS Undergraduate Researcher",
        role: "Undergraduate research in AI and computing systems",
        source: "AICS",
        focus: "Research",
        stack: "Research, Data, AI Systems",
        level: "25.09 ~ 26.12",
        note: "Participated in research work and technical exploration",
      },
      {
        name: "Startup Club Lead",
        role: "Team leadership and startup project execution",
        source: "Startup Club",
        focus: "Leadership",
        stack: "PM, FE, Ideation, Product Planning, Team Leading",
        level: "25.03 ~ 25.12",
        note: "Led startup-oriented activities from idea shaping to execution",
      },
      {
        name: "Innovation Intern",
        role: "Practical product and innovation project support",
        source: "Internship",
        focus: "Innovation",
        stack: "PM, FE, Product Research, Execution, Collaboration",
        level: "26.05 ~ 26.12",
        note: "Supported innovation-driven work through research, planning, and practical execution",
      },
    ],
  },
  {
    label: "Certification",
    rows: [
      {
        name: "Information Processing Engineer",
        role: "National technical certification",
        source: "Certification",
        focus: "Software Engineering",
        stack: "Programming, Database, System Design",
        level: "26.05",
        note: "Validated software development and information processing knowledge",
      },
    ],
  },
];

export const footerGroups = [
  ["Home", "Projects", "Product Belief"],
  ["Tech Stack", "Build Index", "Details"],
];

export const connectLinks: LinkItem[] = [
  { label: "GitHub", href: "https://github.com/ppsssj" },
  { label: "Gmail", href: "mailto:ppssjj020222@gmail.com" },
  { label: "Naver Mail", href: "mailto:ppssjj020222@naver.com" },
];
