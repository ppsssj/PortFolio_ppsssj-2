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
    period?: string;
    overview: string;
    problem: string;
    solution: string;
    highlights: string[];
    links?: LinkItem[];
  };
};

export type CaseStudyMetric = {
  label: string;
  value: string;
  note: string;
};

export type CaseStudySection = {
  title: string;
  body: string;
  points?: string[];
};

export type ProjectCaseStudy = {
  metrics: CaseStudyMetric[];
  outcome: string[];
  approach: CaseStudySection[];
  learnings: string[];
  nextSteps: string[];
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

export const projectNavigationItems: LinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Overview", href: "#overview", scrollOffset: 96 },
  { label: "Result", href: "#result", scrollOffset: 96 },
  { label: "Approach", href: "#approach", scrollOffset: 96 },
  { label: "Screens", href: "#screens", scrollOffset: 96 },
  { label: "Learning", href: "#learning", scrollOffset: 96 },
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

const highlightCardsSource: HighlightCard[] = [
  {
    title: "Git Reflow",
    category: "ELEMENT / Developer Workflow",
    typeLabel: "Web / Extension",
    description:
      "레포지토리 구조와 코드 관계를 그래프 형태로 시각화한 VS Code 확장 프로젝트입니다.",
    description:
      "GitHub Home layout templates are created in a web app and applied to the real GitHub page through a Chrome Extension personalization flow.",
    image: "/assets/git-reflow/gitreflow_home.png",
    detailImages: [
      "/assets/git-reflow/gitreflow_home.png",
      "/assets/git-reflow/gitreflow_network_list.png",
      "/assets/git-reflow/gitreflow_network_play.png",
      "/assets/git-reflow/gitreflow_templates_edit.png",
      "/assets/git-reflow/gitreflow_templates_list.png",
      "/assets/git-reflow/extension.png",
      "/assets/git-reflow/github_home.jpg",
      "/assets/git-reflow/github_profile.png",
      "/assets/git-reflow/github_repo.jpg",
    ],
    href: "#contact",
    detail: {
      role: "GitHub UI personalization, Chrome Extension content script, template editor UX, full-stack implementation",
      stack: ["React 18", "TypeScript", "Vite", "Node.js", "Google Identity Services", "Chrome Extension MV3"],
      period: "2026.06",
      overview:
        "레포지토리 구조를 읽기 쉬운 그래프로 바꿔 코드 관계를 더 빠르게 이해할 수 있도록 만든 시각화 인터페이스입니다.",
      problem:
        "큰 코드베이스는 폴더, 파일, 의존성이 중첩된 텍스트로만 보일 때 전체 구조를 파악하기 어렵습니다.",
      solution:
        "명확한 노드 계층, 그룹 규칙, 탐색 상태를 설계해 레포지토리를 시각적인 맵처럼 읽을 수 있게 구성했습니다.",
      overview:
        "Git Reflow lets users create GitHub Home layout templates in a web app, then applies the latest saved template to the real GitHub Home page through a Chrome Extension.",
      problem:
        "GitHub Home shows the same default feed and column structure to every user, even though each developer has different information priorities. Reordering that surface safely requires both a template editor and a way to apply the saved layout to GitHub itself.",
      solution:
        "The web app provides a default GitHub Home template that users can clone, edit, save, and browse in Grid/List views. The editor adjusts left, center, and right column widths, layout variants, and block visibility, while the Chrome Extension reads the latest template and applies it to GitHub DOM.",
      highlights: [
        "그래프 중심의 프로젝트 탐색 경험 구현",
        "노드 계층과 시각적 그룹 규칙 설계",
        "기술 구조를 한눈에 이해할 수 있는 표현 방식에 집중",
      ],
      highlights: [
        "Web app template editor for GitHub Home layout personalization",
        "Chrome Extension Manifest V3 content script that applies saved templates",
        "Shared TypeScript contract and runtime validation for template data",
      ],
      links: [{ label: "GitHub", href: "https://github.com/ppsssj/git-reflow" }],
    },
  },
  {
    title: "Cogic",
    category: "ELEMENT / Code Visualization",
    typeLabel: "VS Extension",
    description:
      "TypeScript/JavaScript 코드베이스의 구조, 호출 관계, 데이터 흐름, 프레임워크 의미 정보를 VS Code 안에서 인터랙티브 그래프로 탐색할 수 있도록 만든 코드 시각화 확장입니다.",
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
      role: "Code analysis UX, graph interaction design, VS Code extension development, frontend implementation",
      stack: [
        "TypeScript",
        "VS Code Extension API",
        "React",
        "Vite",
        "AST Analysis",
        "Webview",
      ],
      period: "2026.02 - 2026.05",
      overview:
        "TypeScript/JavaScript 코드베이스의 구조, 호출 관계, 데이터 흐름, 프레임워크 의미 정보를 VS Code 안에서 인터랙티브 그래프로 탐색할 수 있도록 만든 코드 시각화 확장입니다.",
      problem:
        "코드 흐름은 파일, 함수, 타입, 호출 관계, 프레임워크 패턴에 흩어져 있어 텍스트 기반 탐색만으로는 전체 구조와 영향 범위를 빠르게 파악하기 어렵습니다. 특히 VS Code 안에서 작업을 이어가는 개발자는 문맥을 잃지 않고 현재 파일 주변의 호출 관계와 참조 범위를 즉시 확인할 수 있는 시각적 탐색 흐름이 필요했습니다.",
      solution:
        "활성 파일과 주변 워크스페이스를 분석해 file, function, class, type 등의 코드 엔티티와 calls, references, dataflow 관계를 그래프로 구성했습니다. 노드 선택, 더블클릭 코드 이동, Inspector, Trace, Runtime Debug를 연결해 그래프에서 발견한 맥락이 곧바로 코드 탐색과 디버깅 흐름으로 이어지도록 설계했습니다.",
      highlights: [
        "AST 기반 코드 엔티티·관계 그래프 생성",
        "노드 선택, 코드 이동, Inspector 기반 탐색 UX",
        "Trace / Runtime Debug / Export / Scaffold Lab 확장 기능",
      ],
      links: [
        { label: "Marketplace", href: "https://marketplace.visualstudio.com/items?itemName=ppsssj.cogic" },
        { label: "GitHub", href: "https://github.com/ppsssj/Cogic" },
      ],
    },
  },
  {
    title: "Git Effects",
    category: "ELEMENT / Developer Tooling",
    typeLabel: "VS Extension",
    description:
      "VS Code에서 Git push, pull, commit 결과를 텍스트 로그 대신 slide-in Webview 이펙트와 캐릭터 피드백으로 보여주는 개발자 경험 확장입니다.",
    image: "/assets/GitEffects/git_effect.gif",
    previewImage: "/assets/GitEffects/git_effects-poster.png",
    detailImages: [
      "/assets/GitEffects/git_effect.gif",
      "/assets/GitEffects/git_effect2.gif",
      "/assets/GitEffects/Git_Effect_CharacterSelect.png",
    ],
    href: "#creator",
    detail: {
      role: "Developer experience design, VS Code extension development, motion UI, Webview interaction",
      stack: [
        "TypeScript",
        "VS Code Extension API",
        "Git CLI",
        "Webview",
        "Motion UI",
        "CSS",
      ],
      period: "2025.01",
      overview:
        "VS Code에서 Git push, pull, commit 결과를 텍스트 로그 대신 slide-in Webview 이펙트와 캐릭터 피드백으로 보여주는 개발자 경험 확장입니다.",
      problem:
        "Git 작업 결과는 대부분 터미널 로그나 Source Control 상태 변화로만 확인되기 때문에 성공·실패 여부를 빠르게 인지하기 어렵습니다. 특히 push, pull, commit처럼 반복적으로 수행하는 작업일수록 결과 피드백이 건조하면 실패 맥락을 다시 텍스트로 추적해야 하고, 작업 리듬도 끊기기 쉽습니다.",
      solution:
        "확장 커맨드가 Git CLI 실행 결과를 직접 받아 성공·실패 payload를 만들고, Webview 패널에서 slide-in 이펙트와 상태별 메시지로 보여주도록 구성했습니다. repo state change 기반 Auto Detect와 debounce를 적용해 터미널에서 발생한 성공 이벤트도 추정 감지할 수 있게 했고, 캐릭터 선택을 통해 반복 작업에 가벼운 보상감을 더했습니다.",
      highlights: [
        "Git 결과를 시각 피드백으로 전환",
        "accurate mode 기반 성공·실패 명확화",
        "캐릭터 선택, 자동 감지, debounce 기반 UX 개선",
      ],
      links: [
        { label: "Marketplace", href: "https://marketplace.visualstudio.com/items?itemName=ppsssj.git-effects" },
        { label: "GitHub", href: "https://github.com/ppsssj/Git-Effects" },
      ],
    },
  },
  {
    title: "GraphMind",
    category: "ELEMENT / Math Visualization",
    typeLabel: "Web",
    description:
      "수식과 구조화된 데이터를 2D/3D 그래프로 시각화하고, Studio에서 편집한 결과를 Vault에 저장해 다시 이어서 작업할 수 있도록 만든 인터랙티브 수학 워크스페이스입니다.",
    image: "/assets/GraphMind/GraphMind.png",
    detailImages: [
      "/assets/GraphMind/GraphMind.png",
      "/assets/GraphMind/GraphMind_graph.png",
      "/assets/GraphMind/GraphMind_surface3d.png",
      "/assets/GraphMind/GraphMind_vault.png",
    ],
    href: "#typography",
    detail: {
      role: "Product concept design, interactive visualization, frontend architecture, full-stack MVP implementation",
      stack: [
        "React",
        "Three.js",
        "React Three Fiber",
        "Math.js",
        "KaTeX",
        "Spring Boot",
        "Java",
      ],
      period: "2025.08 - 2025.12",
      overview:
        "수식과 구조화된 데이터를 2D/3D 그래프로 시각화하고, Studio에서 편집한 결과를 Vault에 저장해 다시 이어서 작업할 수 있도록 만든 인터랙티브 수학 워크스페이스입니다.",
      problem:
        "기존 수학 도구는 수식을 입력해 정적인 그래프를 확인하는 데 머무르거나, 저장된 그래프를 다시 편집 가능한 작업 흐름으로 연결하기 어렵습니다. 사용자는 그래프를 실험하고 저장하고 다시 불러오는 과정을 하나의 워크스페이스 안에서 이어가야 하지만, 수식 입력과 결과 관리가 분리되면 탐색의 연속성이 약해집니다.",
      solution:
        "Intro, Vault, Studio, AI Panel 흐름을 하나의 제품 구조로 묶고, 2D 함수 그래프, 3D 매개변수 곡선, 3D 곡면, 3차원 배열 데이터를 편집 가능한 수학 리소스로 관리하도록 구성했습니다. Studio에서 만든 결과를 Vault에 저장하고 다시 편집할 수 있게 하며, AI Panel을 통해 그래프 설명과 질문, 명령형 조작 가능성을 함께 실험했습니다.",
      highlights: [
        "2D/3D 수학 객체 시각화 및 편집",
        "Vault 기반 그래프 리소스 저장·재사용",
        "AI Panel을 통한 그래프 설명·질문·명령 UX 실험",
      ],
      links: [{ label: "GitHub", href: "https://github.com/ppsssj/GraphMind-monorepo" }],
    },
  },
  {
    title: "PrismDesign",
    category: "ELEMENT / Visual Programming",
    typeLabel: "Web",
    description:
      "TOP, CHOP, SOP 오퍼레이터 노드를 연결해 실시간 미디어 파이프라인과 비주얼 결과를 구성할 수 있는 브라우저 기반 노드 비주얼 프로그래밍 스튜디오입니다.",
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
      role: "PM, product structure design, UI/UX design, frontend implementation, interaction prototyping",
      stack: ["React", "Vite", "ReactFlow", "Canvas 2D", "Express", "MediaPipe"],
      period: "2026.02",
      overview:
        "TOP, CHOP, SOP 오퍼레이터 노드를 연결해 실시간 미디어 파이프라인과 비주얼 결과를 구성할 수 있는 브라우저 기반 노드 비주얼 프로그래밍 스튜디오입니다.",
      problem:
        "시각 표현을 만들 때 색상, 오디오, 웹캠, 시간, 지오메트리 같은 요소가 서로 분리되어 있으면 실시간으로 조합하고 실험하기 어렵습니다. 결과를 만들기 위해 코드와 미디어 입력, 프리뷰 화면을 계속 오가야 하면 창작 흐름이 끊기고, 각 요소가 결과에 미치는 영향도 직관적으로 파악하기 어렵습니다.",
      solution:
        "ReactFlow 기반 그래프 에디터에서 TOP/CHOP/SOP 노드를 연결하고, Runtime/Evaluator가 데이터 흐름을 평가하며, Canvas 2D 프리뷰 렌더러가 노드별 미니 프리뷰와 최종 출력을 실시간으로 보여주도록 설계했습니다. MediaPipe Hands CHOP을 통해 웹캠 제스처를 데이터 노드로 다루며, 입력과 비주얼 출력이 같은 그래프 안에서 연결되는 경험을 실험했습니다.",
      highlights: [
        "TOP/CHOP/SOP 기반 오퍼레이터 모델 설계",
        "Canvas 2D 기반 실시간 노드 프리뷰",
        "MediaPipe Hands CHOP을 활용한 제스처 인터랙션",
      ],
      links: [{ label: "GitHub", href: "https://github.com/ppsssj/PrismDesign" }],
    },
  },
  {
    title: "Traffic Noise Prediction System",
    category: "ELEMENT / Data Prediction",
    typeLabel: "Web",
    description:
      "도시 교통 소음 메타데이터를 기반으로 자동차, 이륜자동차, 열차별 소음 수준을 예측하고, 지도 UI에서 24시간 소음 프로파일과 주요 영향 요인을 시각화하는 예측 시스템입니다.",
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
      role: "Dashboard UI, data visualization, prediction result presentation, product planning",
      stack: [
        "React",
        "Flask",
        "Python",
        "CatBoost",
        "Data Visualization",
        "Map UI",
      ],
      period: "2025.11",
      overview:
        "도시 교통 소음 메타데이터를 기반으로 자동차, 이륜자동차, 열차별 소음 수준을 예측하고, 지도 UI에서 24시간 소음 프로파일과 주요 영향 요인을 시각화하는 예측 시스템입니다.",
      problem:
        "교통 소음 예측 결과가 단일 수치로만 제공되면 사용자는 시간대별 변화, 교통수단별 차이, 주요 원인 요인을 함께 이해하기 어렵습니다. 소음은 시간, 위치, 도로 환경, 교통수단의 영향을 함께 받기 때문에 예측값만 보여주는 화면으로는 실제 의사결정에 필요한 맥락이 부족합니다.",
      solution:
        "CatBoost 회귀 모델을 Flask API로 서빙하고, React 기반 지도 UI에서 좌표와 환경값을 입력하면 0~23시 기준 예측값과 Feature Importance를 즉시 갱신해 보여주도록 구성했습니다. 자동차, 이륜자동차, 열차별 모델 결과를 구분하고 24시간 프로파일로 펼쳐 보여주어 사용자가 언제, 어떤 요인이 소음 수준에 영향을 주는지 읽을 수 있게 했습니다.",
      highlights: [
        "교통수단별 CatBoost 회귀 모델 설계",
        "24시간 소음 프로파일 자동 생성",
        "지도 기반 입력과 원인 기여도 시각화",
      ],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/ppsssj/Traffic-Noise-Prediction-System",
        },
      ],
    },
  },
];

const highlightCardOrder = [
  "Cogic",
  "GraphMind",
  "Git Effects",
  "PrismDesign",
  "Traffic Noise Prediction System",
  "Git Reflow",
];

export const highlightCards: HighlightCard[] = highlightCardOrder
  .map((title) => highlightCardsSource.find((card) => card.title === title))
  .filter((card): card is HighlightCard => Boolean(card));

export function getProjectSlug(card: Pick<HighlightCard, "title">) {
  return card.title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const projectCaseStudies: Record<string, ProjectCaseStudy> = {
  "git-reflow": {
    metrics: [
      { label: "Project Type", value: "Web + Extension", note: "GitHub Home personalization project" },
      { label: "Core Output", value: "Layout Templates", note: "Saved templates applied to GitHub DOM" },
      { label: "Focus", value: "UI Priority", note: "Custom GitHub Home information layout" },
    ],
    outcome: [
      "Built a web app for cloning, editing, saving, and browsing GitHub Home layout templates.",
      "Connected the saved template flow to a Chrome Extension content script that applies layout changes on GitHub.",
      "Separated shared template types and runtime validation so frontend, backend, and extension can rely on the same contract.",
    ],
    approach: [
      {
        title: "Template First",
        body: "Git Reflow starts from a default GitHub Home template. Users clone it, adjust column widths, layout variants, and block visibility, then save the result as their own layout.",
        points: ["Default template clone", "Column width editing", "Grid/List template browsing", "Card previews"],
      },
      {
        title: "Extension Apply Flow",
        body: "The Chrome Extension reads the latest saved template and applies it to the actual GitHub Home page using a Manifest V3 content script and Chrome Storage.",
      },
    ],
    learnings: [
      "Personalization tools need safe layout constraints so users can change priority without breaking the page.",
      "A shared contract between FE, BE, and extension reduces drift in template data.",
      "Chrome Extension UX is strongest when the web app handles authoring and the extension focuses on applying state.",
    ],
    nextSteps: [
      "Expand targets beyond GitHub Home after the first layout flow is stable.",
      "Add stronger template versioning and migration handling.",
      "Document extension behavior with before/after GitHub Home examples.",
    ],
  },
  cogic: {
    metrics: [
      { label: "Published", value: "Marketplace", note: "Distributed as a VS Code extension" },
      { label: "Modes", value: "4+", note: "Inspector, Trace, Runtime Debug, Scaffold Lab" },
      { label: "Core Tech", value: "AST", note: "TypeScript/JavaScript code entity analysis" },
    ],
    outcome: [
      "Expanded code visualization from static graph browsing into inspection, tracing, and debugging workflows.",
      "Connected node selection, code navigation, and runtime-oriented views in one editor experience.",
      "Shaped the project as a stronger case for complex frontend tooling rather than a standard web page.",
    ],
    approach: [
      {
        title: "Analysis Pipeline",
        body: "Cogic starts from TypeScript/JavaScript source analysis and turns files, functions, classes, and references into graph entities that can be explored visually.",
        points: ["AST-based entity extraction", "Calls and references modeling", "Workspace-aware indexing"],
      },
      {
        title: "Interactive Graph UX",
        body: "The graph is designed as a working surface: selecting nodes reveals details, double-clicking supports navigation, and separate modes expose deeper behavior.",
        points: ["Node inspector", "Trace mode", "Runtime debug mode", "Scaffold Lab"],
      },
    ],
    learnings: [
      "Code visualization needs a strong bridge back to the source file.",
      "A VS Code Webview behaves like a small product inside another product, so layout and state must stay compact.",
      "Complex tools need named modes so users understand what kind of question each screen answers.",
    ],
    nextSteps: [
      "Track extension install/download numbers.",
      "Add sample repositories and benchmark screenshots.",
      "Collect user feedback from Marketplace or GitHub issues.",
    ],
  },
  "git-effects": {
    metrics: [
      { label: "Published", value: "Marketplace", note: "Git feedback extension for VS Code" },
      { label: "Events", value: "Push/Pull/Commit", note: "Git operations converted into visual feedback" },
      { label: "UX Pattern", value: "Webview", note: "Slide-in feedback with selectable characters" },
    ],
    outcome: [
      "Turned dry Git terminal results into immediate visual feedback inside the editor.",
      "Designed success/failure states and character feedback to make repeated Git actions easier to notice.",
      "Added auto-detection and debounce logic to avoid noisy feedback.",
    ],
    approach: [
      {
        title: "Command Feedback",
        body: "Git command results are interpreted as structured success/failure payloads, then rendered through a lightweight slide-in Webview.",
      },
      {
        title: "Experience Layer",
        body: "The project focuses on developer emotion and rhythm: frequent Git actions become more visible without requiring users to read logs every time.",
        points: ["Character selection", "Accurate mode", "Debounced auto detect"],
      },
    ],
    learnings: [
      "Small DX tools still need precise state handling to avoid becoming distracting.",
      "Visual delight works best when the underlying command result is reliable.",
      "Editor extensions need careful constraints because screen space is limited.",
    ],
    nextSteps: [
      "Add Marketplace download data.",
      "Show command-state examples for success and failure.",
      "Add settings documentation for feedback intensity.",
    ],
  },
  graphmind: {
    metrics: [
      { label: "Views", value: "2D/3D", note: "Function, surface, and data visualization" },
      { label: "Workspace", value: "Vault", note: "Saved graph resources for reuse" },
      { label: "Integration", value: "AI Panel", note: "Question, explanation, and command experiments" },
    ],
    outcome: [
      "Built an interactive math workspace where graph creation, storage, and editing live in one flow.",
      "Combined 2D and 3D visualization with a product structure that supports repeated exploration.",
      "Prototyped AI-assisted explanation and command flows around graph objects.",
    ],
    approach: [
      {
        title: "Visualization Surface",
        body: "The frontend separates graph types and rendering needs while keeping the user flow centered on Studio and Vault.",
        points: ["2D function graph", "3D parametric curve", "3D surface", "Array data view"],
      },
      {
        title: "Reusable Work",
        body: "Vault turns generated graphs into reusable resources, which makes the product closer to a workspace than a one-off graph renderer.",
      },
    ],
    learnings: [
      "3D interfaces need strong defaults because users can get lost quickly.",
      "Saving and reopening work changes a visualization demo into a usable product.",
      "AI features are clearest when attached to a concrete object on screen.",
    ],
    nextSteps: [
      "Measure render performance by graph type.",
      "Add demo scenarios with saved Vault examples.",
      "Document AI Panel command coverage.",
    ],
  },
  prismdesign: {
    metrics: [
      { label: "Editor Model", value: "Nodes", note: "TOP/CHOP/SOP visual programming structure" },
      { label: "Runtime", value: "Evaluator", note: "Real-time node graph execution" },
      { label: "Input", value: "MediaPipe", note: "Hand tracking as a creative data source" },
    ],
    outcome: [
      "Created a browser-based visual programming studio for real-time media and visual composition.",
      "Connected node graph editing, runtime evaluation, and Canvas preview into one workflow.",
      "Proved that frontend architecture can support creative-tool style interfaces, not only document pages.",
    ],
    approach: [
      {
        title: "Node System",
        body: "PrismDesign models creative operations as connected nodes. TOP, CHOP, and SOP categories help separate visual, channel, and geometry-like responsibilities.",
        points: ["ReactFlow editor", "Node previews", "Runtime evaluation"],
      },
      {
        title: "Live Preview",
        body: "Canvas output gives immediate feedback, while MediaPipe input makes body interaction part of the graph rather than a separate feature.",
      },
    ],
    learnings: [
      "Visual programming tools need predictable data flow more than many node types.",
      "Tiny previews inside nodes help users understand changes without losing the full canvas.",
      "Creative tools benefit from direct manipulation and fast feedback loops.",
    ],
    nextSteps: [
      "Add sample patches as portfolio artifacts.",
      "Record performance data for large node graphs.",
      "Document the runtime data model.",
    ],
  },
  "traffic-noise-prediction-system": {
    metrics: [
      { label: "Model", value: "CatBoost", note: "Traffic-noise prediction by vehicle type" },
      { label: "API", value: "Flask", note: "Prediction results served to the dashboard" },
      { label: "Result View", value: "24h", note: "Hourly noise profile and feature importance" },
    ],
    outcome: [
      "Built a dashboard that turns prediction output into map, chart, and explanation views.",
      "Separated vehicle-type prediction results and made feature contribution easier to inspect.",
      "Presented model results in a decision-support interface rather than a raw numeric output.",
    ],
    approach: [
      {
        title: "Prediction to Interface",
        body: "The frontend receives prediction values from Flask and translates them into a 24-hour profile that users can scan quickly.",
        points: ["Map-based input", "Hourly profile", "Feature importance display"],
      },
      {
        title: "Explainable Result",
        body: "The dashboard emphasizes why the result changed, not only what the predicted value is.",
      },
    ],
    learnings: [
      "Data products need explanation layers to be useful to non-model users.",
      "Maps and charts should answer different questions instead of duplicating the same value.",
      "A dashboard is stronger when it guides interpretation, not only displays results.",
    ],
    nextSteps: [
      "Add model accuracy and validation metrics.",
      "Show example input/output scenarios.",
      "Document the data source and preprocessing pipeline.",
    ],
  },
};

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
