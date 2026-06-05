export type LinkItem = {
  label: string;
  href: string;
  scrollOffset?: number;
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
  title: "박성진 · Frontend Developer",
  eyebrow: "Site of the Day",
  date: "Date",
  score: "88%",
  scoreLabel: "BUILD",
  description:
    "완성도 있는 인터페이스와 인터랙션을 구현하며, 아이디어를 실제 제품 경험으로 연결하는 프론트엔드 개발자입니다.",
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
  { label: "About", href: "#creator" },
  { label: "Projects", href: "#highlights" },
  { label: "Belief", href: "#typography" },
  { label: "Skills", href: "#details", scrollOffset: 96 },
  { label: "Records", href: "#score" },
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

export const heroGallery = ["/assets/Hero/img.png"];

export const highlightCards: HighlightCard[] = [
  {
    title: "CodeGraph",
    category: "Code Visualization",
    typeLabel: "VS Extension",
    description:
      "레포지토리 구조와 코드 관계를 그래프 형태로 시각화한 VS Code 확장 프로젝트입니다.",
    image: "/assets/CodeGraph/CodeGraph.png",
    href: "#contact",
    detail: {
      role: "Frontend implementation, graph layout, interaction design",
      stack: ["React", "TypeScript", "Graph UI", "CSS Architecture"],
      overview:
        "레포지토리 구조를 읽기 쉬운 그래프로 바꿔 코드 관계를 더 빠르게 이해할 수 있도록 만든 시각화 인터페이스입니다.",
      problem:
        "큰 코드베이스는 폴더, 파일, 의존성이 중첩된 텍스트로만 보일 때 전체 구조를 파악하기 어렵습니다.",
      solution:
        "명확한 노드 계층, 그룹 규칙, 탐색 상태를 설계해 레포지토리를 시각적인 맵처럼 읽을 수 있게 구성했습니다.",
      highlights: [
        "그래프 중심의 프로젝트 탐색 경험 구현",
        "노드 계층과 시각적 그룹 규칙 설계",
        "기술 구조를 한눈에 이해할 수 있는 표현 방식에 집중",
      ],
    },
  },
  {
    title: "Cogic",
    category: "Code Visualization",
    typeLabel: "VS Extension",
    description:
      "노드 기반 흐름을 애니메이션 클릭과 구조적인 탐색 경험으로 풀어낸 인터랙션 프로토타입입니다.",
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
      overview:
        "연결된 로직을 작은 시각 인터랙션으로 탐색할 수 있도록 만든 노드 클릭 프로토타입입니다.",
      problem:
        "복잡한 로직 흐름은 각 단계가 텍스트나 메뉴 뒤에 숨어 있으면 정적이고 따라가기 어렵게 느껴집니다.",
      solution:
        "애니메이션 노드 선택과 집중된 전환 효과를 사용해 관계를 직접적이고 확인 가능한 방식으로 보여줬습니다.",
      highlights: [
        "애니메이션 기반 노드 인터랙션 모델 제작",
        "선택 상태 주변의 시각적 노이즈 축소",
        "탐색이 즉각적으로 느껴지는 클릭 피드백 설계",
      ],
    },
  },
  {
    title: "Git Effects",
    category: "Developer Tooling",
    typeLabel: "VS Extension",
    description:
      "코드 변경 흐름을 더 쉽게 훑어볼 수 있도록 모션을 활용한 Git 워크플로우 콘셉트입니다.",
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
      overview:
        "움직임과 시각적 강조를 통해 Git 변경 사항을 더 빠르게 검토할 수 있도록 만든 개발자 도구 콘셉트입니다.",
      problem:
        "Git 상태와 코드 변경은 실제로 무엇이 달라졌는지 이해하기 위해 많은 텍스트를 세밀하게 읽어야 하는 경우가 많습니다.",
      solution:
        "모션 단서, 대비, 변경 상태 그룹화를 활용해 개발자가 워크플로우 맥락을 빠르게 훑어볼 수 있도록 실험했습니다.",
      highlights: [
        "변경 검토를 위한 모션 상태 설계",
        "워크플로우 정보를 읽기 쉬운 UI 단위로 그룹화",
        "개발자용 인터페이스의 탐색 부담을 줄이는 데 집중",
      ],
    },
  },
  {
    title: "GraphMind",
    category: "Math Graph Control",
    typeLabel: "Web",
    description:
      "수학적 구조를 3D 그래프와 자연어 제어로 탐색할 수 있게 만든 웹 인터페이스입니다.",
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
      overview:
        "사용자가 그래프 구조를 확인하고 노드를 조작하며 자연어로 설명을 요청할 수 있는 3D 수학 그래프 인터페이스입니다.",
      problem:
        "수학 그래프는 관계, 공간 구조, 변환 규칙이 추상적인 표기 안에 숨어 있으면 직관적으로 이해하기 어렵습니다.",
      solution:
        "3D 그래프 시각화와 자연어 제어를 결합해 회전, 필터링, 변환, 상태 설명 요청이 가능한 탐색 흐름을 만들었습니다.",
      highlights: [
        "그래프 관계를 인터랙티브한 3D 구조로 시각화",
        "자연어 명령과 그래프 조작 흐름 연결",
        "노드, 엣지, 변환을 읽기 위한 설명 흐름 설계",
      ],
    },
  },
  {
    title: "PrismDesign",
    category: "Design System",
    typeLabel: "Web",
    description:
      "색상, 레이아웃, 컴포넌트 탐색을 하나의 정돈된 인터페이스 시스템으로 구성한 프로젝트입니다.",
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
      overview:
        "색상, 레이아웃 리듬, 재사용 가능한 컴포넌트 표현에 집중한 디자인 시스템 스터디입니다.",
      problem:
        "색상, 간격, 컴포넌트를 따로 탐색하면 시각 시스템이 쉽게 불일치해질 수 있습니다.",
      solution:
        "인터페이스를 하나의 연결된 시스템으로 보고 컴포넌트 리듬, 대비, 레이아웃 구조를 함께 정렬했습니다.",
      highlights: [
        "재사용 가능한 시각 언어 탐색",
        "정돈된 컴포넌트와 레이아웃 상태 구현",
        "디자인 결정을 프론트엔드 구현 방식과 연결",
      ],
    },
  },
  {
    title: "Traffic Noise Prediction System",
    category: "Data Prediction",
    typeLabel: "Web",
    description:
      "교통 소음 패턴을 명확한 시각 출력으로 해석할 수 있도록 만든 예측 대시보드입니다.",
    image:
      "/assets/TrafficNoisePredictionSystem/Traffic Noise Prediction System.png",
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
      stack: [
        "Data Visualization",
        "Dashboard UI",
        "Prediction Model",
        "Frontend",
      ],
      overview:
        "상태, 예측 결과, 비교 화면을 통해 교통 소음 패턴을 해석할 수 있도록 만든 예측 대시보드입니다.",
      problem:
        "예측 결과가 맥락이나 시각적 위계 없이 원시 값으로만 제공되면 사용자가 다음 행동을 판단하기 어렵습니다.",
      solution:
        "추세, 출력, 판단 지점을 쉽게 읽을 수 있도록 대시보드 섹션을 나누고 소음 패턴을 시각적으로 구성했습니다.",
      highlights: [
        "빠른 해석을 위한 예측 결과 구조화",
        "실제 읽기 흐름을 기준으로 대시보드 섹션 설계",
        "데이터 결과를 사용자 판단 맥락과 연결",
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
  "이 포트폴리오는 아이디어를 실제로 사용할 수 있는 제품 경험으로 바꾸는 과정과, 프론트엔드 구현, AI 활용, 빠른 프로토타이핑, 인터랙션 설계를 함께 보여줍니다.";

export const githubUsername = "ppsssj";

export const scoreBreakdown: ScoreItem[] = [
  { label: "Frontend Craft", weight: "35%", value: 92, score: "92%" },
  { label: "Product Thinking", weight: "25%", value: 86, score: "86%" },
  { label: "Interaction Design", weight: "20%", value: 88, score: "88%" },
  { label: "AI Integration", weight: "20%", value: 84, score: "84%" },
];

export const juryVotes: VoteRow[] = [
  {
    name: "Product Team",
    role: "Execution Review",
    design: 9,
    usability: 8,
    creativity: 8,
    content: 7,
    total: "8.30",
  },
  {
    name: "Frontend Lead",
    role: "Implementation Review",
    design: 7,
    usability: 7,
    creativity: 7,
    content: 7,
    total: "7.00",
  },
  {
    name: "UX Reviewer",
    role: "Experience Review",
    design: 8,
    usability: 6,
    creativity: 7,
    content: 9,
    total: "7.30",
  },
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
        name: "2025 BLEP 데이터 활용 경진대회",
        role: "장려상",
        source: "Competition",
        focus: "Data Utilization",
        stack: "Data Analysis, Data Utilization",
        level: "25.11.20",
        note: "2025 BLEP 데이터 활용 경진대회 - 장려상",
      },
      {
        name: "2025 한국 데이터 사이언스 학회",
        role: "최우수 논문상",
        source: "Academic",
        focus: "Research",
        stack: "Data Science, Paper Presentation",
        level: "25.12.19",
        note: "2025 한국 데이터 사이언스 학회 - 최우수 논문상",
      },
    ],
  },
  {
    label: "Activities",
    rows: [
      {
        name: "Leadership Staff, LikeLion Club",
        role: "동아리 운영진으로 프론트엔드 교육, 프로젝트 진행, 구성원 멘토링을 지원하며 협업 중심의 개발 문화를 경험했습니다.",
        source: "멋쟁이사자처럼",
        focus: "Leadership",
        stack: "PM, Frontend, Mentoring, Collaboration",
        level: "25.01 - 25.12",
        note: "프론트엔드 교육, 프로젝트 진행, 구성원 멘토링",
      },
      {
        name: "AICS Undergraduate Researcher",
        role: "AI 및 컴퓨팅 시스템 분야의 학부 연구생으로 논문 리뷰, 기술 탐색, 세미나 발표에 참여하며 연구 기반 문제 해결 역량을 확장했습니다.",
        source: "AICS",
        focus: "Research",
        stack: "Research, Data, AI Systems",
        level: "25.09 - 26.12",
        note: "논문 리뷰, 기술 탐색, 세미나 발표",
      },
      {
        name: "Startup Club Lead",
        role: "팀 리더로 아이디어 구체화부터 MVP 기획, 역할 분배, 프로젝트 실행까지 주도하며 제품 중심 개발 경험을 쌓았습니다.",
        source: "Startup Club",
        focus: "Leadership",
        stack: "PM, Frontend, Ideation, Product Planning",
        level: "25.03 - 25.12",
        note: "MVP 기획, 역할 분배, 프로젝트 실행",
      },
      {
        name: "Innovase Intern",
        role: "제품 및 혁신 프로젝트 실무를 지원하며 리서치, 기획, 실행 과정을 경험하고 실무형 협업 프로세스에 참여했습니다.",
        source: "Innovase Intern",
        focus: "Innovation",
        stack: "PM, Frontend, Product Research, Execution",
        level: "26.05 - 26.12",
        note: "리서치, 기획, 실행, 실무형 협업",
      },
    ],
  },
  {
    label: "Certification",
    rows: [
      {
        name: "정보처리기사",
        role: "소프트웨어 개발, 데이터베이스, 운영체제, 시스템 설계 등 정보처리 기반 지식을 검증한 국가 기술 자격입니다.",
        source: "Certification",
        focus: "Software Engineering",
        stack: "Software Engineering, Database, System Design",
        level: "26.05",
        note: "정보처리 기반 지식 검증",
      },
    ],
  },
];

export const footerGroups = [
  ["About", "Projects", "Belief"],
  ["Skills", "Records", "Contact"],
];

export const connectLinks: LinkItem[] = [
  { label: "GitHub", href: "https://github.com/ppsssj" },
  { label: "Gmail", href: "mailto:ppssjj020222@gmail.com" },
  { label: "Naver Mail", href: "mailto:ppssjj020222@naver.com" },
];
