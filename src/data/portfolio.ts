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
    awards?: string[];
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
  table?: {
    columns: [string, string];
    rows: [string, string][];
  };
};

export type CaseStudyFlowStep = {
  label: string;
  detail: string;
};

export type ProjectCaseStudyFinale = {
  flow: {
    eyebrow: string;
    title: string;
    steps: CaseStudyFlowStep[];
  };
  decisions: {
    eyebrow: string;
    title: string;
    points: string[];
  };
};

export type CaseStudyUxFlowItem = {
  tag: string;
  title: string;
  body: string;
  points?: string[];
};

export type ArchDiagramNode = {
  label: string;
  note?: string;
};

export type ArchitectureSystemDiagram = {
  extension: {
    title: string;
    subtitle: string;
    entry: ArchDiagramNode;
    hub: ArchDiagramNode;
    services: ArchDiagramNode[];
    editorApi: ArchDiagramNode;
  };
  webview: {
    title: string;
    subtitle: string;
    panels: ArchDiagramNode[];
  };
  protocol: {
    label: string;
    forward: string;
    backward: string;
  };
};

export type SystemFlowDiagram = {
  user: ArchDiagramNode;
  client: {
    title: string;
    panels: ArchDiagramNode[];
  };
  spine: ArchDiagramNode[];
  aiBranch: {
    context: string;
    nodes: ArchDiagramNode[];
  };
};

export type ProcessFlow = {
  title: string;
  caption: string;
  steps: string[];
};

export type ProcessTable = {
  title: string;
  columns: [string, string];
  rows: [string, string][];
};

export type ClientBackendDiagram = {
  client: {
    title: string;
    groups: { label: string; chips: string[] }[];
    note?: string;
  };
  backend: {
    title: string;
    chips: string[];
  };
  storage: {
    title: string;
    note: string;
    chips?: string[];
  };
  protocol: {
    forward: string;
    backward: string;
  };
};

export type PipelineArchitectureDiagram = {
  input: { title: string; note: string; meta?: string };
  model: { title: string; subtitle: string; chips: string[] };
  backend: { title: string; subtitle: string; note?: string };
  frontend: { title: string; chips: string[] };
  protocol: { forward: string; backward: string };
};

export type GridArchitectureNode = {
  title: string;
  subtitle: string;
  note?: string;
};

export type GridArchitectureDiagram = {
  topRow: GridArchitectureNode[];
  bottomRow: GridArchitectureNode[];
};

export type ProjectCaseStudy = {
  metrics: CaseStudyMetric[];
  outcome: string[];
  approach: CaseStudySection[];
  learnings: string[];
  nextSteps: string[];
  finale: ProjectCaseStudyFinale;
  architecture?: {
    eyebrow: string;
    title: string;
    diagram?: ArchitectureSystemDiagram;
    flowDiagram?: SystemFlowDiagram;
    clientBackendDiagram?: ClientBackendDiagram;
    pipelineDiagram?: PipelineArchitectureDiagram;
    gridDiagram?: GridArchitectureDiagram;
    items: CaseStudySection[];
  };
  performance?: {
    eyebrow: string;
    title: string;
    stats: CaseStudyMetric[];
    flowInput?: { label: string; note: string };
    flowOutput?: { label: string; note: string };
    layers?: { badge: string; title: string; detail: string; tags?: string[] }[];
    notes: string[];
  };
  process?: {
    eyebrow: string;
    title: string;
    flows: ProcessFlow[];
    tables?: ProcessTable[];
  };
  uxFlow?: {
    eyebrow: string;
    title: string;
    items: CaseStudyUxFlowItem[];
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

export const projectNavigationItems: LinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Overview", href: "#overview", scrollOffset: 96 },
  { label: "Result", href: "#result", scrollOffset: 96 },
  { label: "Approach", href: "#approach", scrollOffset: 96 },
  { label: "Screens", href: "#screens", scrollOffset: 96 },
  { label: "Works", href: "#structure", scrollOffset: 96 },
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
      "웹 앱에서 GitHub Home 레이아웃 템플릿을 만들고, Chrome Extension 개인화 플로우를 통해 실제 GitHub 페이지에 적용하는 프로젝트입니다.",
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
      role: "GitHub UI 개인화, Chrome Extension 콘텐츠 스크립트, 템플릿 에디터 UX, 풀스택 구현",
      stack: ["React 18", "TypeScript", "Vite", "Node.js", "Google Identity Services", "Chrome Extension MV3"],
      period: "2026.06",
      overview:
        "Git Reflow는 사용자가 웹 앱에서 GitHub Home 레이아웃 템플릿을 만들고, 가장 최근에 저장한 템플릿을 Chrome Extension을 통해 실제 GitHub Home 페이지에 적용할 수 있게 합니다.",
      problem:
        "개발자마다 중요하게 보는 정보의 우선순위가 다르지만, GitHub Home은 모든 사용자에게 동일한 기본 피드와 컬럼 구조를 보여줍니다. 이 화면을 안전하게 재배치하려면 템플릿을 편집하는 도구와 저장된 레이아웃을 실제 GitHub에 적용하는 흐름이 함께 필요했습니다.",
      solution:
        "웹 앱은 기본 GitHub Home 템플릿을 제공하고, 사용자는 이를 복제해 편집, 저장, Grid/List 뷰 탐색까지 할 수 있습니다. 에디터에서는 좌측, 중앙, 우측 컬럼 너비와 레이아웃 변형, 블록 표시 여부를 조정하며, Chrome Extension은 최신 템플릿을 읽어 GitHub DOM에 적용합니다.",
      highlights: [
        "GitHub Home 레이아웃 개인화를 위한 웹 앱 템플릿 에디터",
        "저장된 템플릿을 적용하는 Chrome Extension Manifest V3 콘텐츠 스크립트",
        "템플릿 데이터를 위한 공유 TypeScript 계약과 런타임 검증",
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
      awards: [
        "2025 한국 데이터 사이언스 학회 - 최우수 논문상",
        "2025 BLEP 데이터 활용 경진대회 - 장려상",
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
  "PrismDesign",
  "Traffic Noise Prediction System",
  "Git Reflow",
  "Git Effects",
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
      { label: "프로젝트 유형", value: "Web + Extension", note: "GitHub Home 개인화 프로젝트" },
      { label: "핵심 결과물", value: "레이아웃 템플릿", note: "저장된 템플릿을 GitHub DOM에 적용" },
      { label: "포커스", value: "UI 우선순위", note: "GitHub Home 정보 배치 커스터마이징" },
    ],
    outcome: [
      "GitHub Home 레이아웃 템플릿을 복제, 편집, 저장, 탐색할 수 있는 웹 앱을 구축했습니다.",
      "저장된 템플릿 흐름을 Chrome Extension 콘텐츠 스크립트와 연결해 GitHub에서 레이아웃 변경이 적용되도록 구현했습니다.",
      "프론트엔드, 백엔드, 확장이 같은 계약을 기준으로 템플릿 데이터를 다룰 수 있도록 공유 타입과 런타임 검증을 분리했습니다.",
    ],
    approach: [
      {
        title: "템플릿 중심 흐름",
        body: "Git Reflow는 기본 GitHub Home 템플릿에서 시작합니다. 사용자는 템플릿을 복제한 뒤 컬럼 너비, 레이아웃 변형, 블록 표시 여부를 조정하고 자신만의 레이아웃으로 저장할 수 있습니다.",
        points: ["기본 템플릿 복제", "컬럼 너비 편집", "Grid/List 템플릿 탐색", "카드 프리뷰"],
      },
      {
        title: "확장 적용 흐름",
        body: "Chrome Extension은 가장 최근에 저장된 템플릿을 읽고, Manifest V3 콘텐츠 스크립트와 Chrome Storage를 사용해 실제 GitHub Home 페이지에 적용합니다.",
      },
    ],
    finale: {
      flow: {
        eyebrow: "Application flow",
        title: "웹에서 만든 레이아웃이 GitHub에 적용되기까지",
        steps: [
          { label: "기본 레이아웃 선택", detail: "제공되는 GitHub Home 레이아웃을 선택해 편집을 시작합니다." },
          { label: "원하는 방식으로 편집", detail: "컬럼 너비와 배치 방식을 바꾸고, 필요한 블록만 화면에 남깁니다." },
          { label: "설정 저장", detail: "완성한 레이아웃을 언제든 다시 사용할 수 있도록 저장합니다." },
          { label: "확장 프로그램에서 불러오기", detail: "Chrome Extension이 가장 최근에 저장한 레이아웃을 불러옵니다." },
          { label: "GitHub에 적용", detail: "불러온 설정에 맞춰 실제 GitHub Home 화면의 배치를 변경합니다." },
        ],
      },
      decisions: {
        eyebrow: "Structural design",
        title: "웹 앱과 확장 프로그램의 역할을 나눴습니다",
        points: [
          "웹 앱에서는 레이아웃을 만들고 편집하는 작업에만 집중할 수 있게 했습니다.",
          "확장 프로그램은 저장한 레이아웃을 불러와 GitHub에 적용하는 역할만 담당합니다.",
          "웹 앱과 확장 프로그램이 같은 형식의 설정 데이터를 사용해 서로 다른 값이 전달되는 문제를 줄였습니다.",
          "화면이 깨질 수 있는 설정은 미리 제한하고, 저장된 값도 적용 전에 한 번 더 확인합니다.",
        ],
      },
    },
    learnings: [
      "개인화 도구는 사용자가 정보 우선순위를 바꾸더라도 페이지가 깨지지 않도록 안전한 레이아웃 제약이 필요합니다.",
      "FE, BE, Extension 사이에 공유 계약을 두면 템플릿 데이터의 불일치를 줄일 수 있습니다.",
      "Chrome Extension UX는 웹 앱이 작성 경험을 맡고 확장은 상태 적용에 집중할 때 가장 명확해집니다.",
    ],
    nextSteps: [
      "첫 레이아웃 플로우가 안정화된 뒤 GitHub Home 외의 화면으로 적용 대상을 확장합니다.",
      "템플릿 버전 관리와 마이그레이션 처리를 강화합니다.",
      "GitHub Home의 전후 예시를 통해 확장 동작을 문서화합니다.",
    ],
    architecture: {
      eyebrow: "System Design",
      title: "웹에서 편집한 Template JSON을 저장하고, Extension이 실제 GitHub 화면에 적용합니다",
      gridDiagram: {
        topRow: [
          { title: "React Web Editor", subtitle: "Template Library · Editor · Network" },
          { title: "Node.js API", subtitle: "Google ID Token 검증 · Template CRUD · Publish · Like · View · Import", note: "Bearer Session · Rate Limit" },
          { title: "SQLite", subtitle: "Templates · Versions", note: "Sessions · Usage" },
        ],
        bottomRow: [
          { title: "Chrome Extension", subtitle: "Manifest V3 · Content Script", note: "DOM Mapping · CSS Override" },
          { title: "Shared Contract", subtitle: "Types · Validator · Normalize", note: "FE · BE · Extension 공통" },
          { title: "GitHub DOM", subtitle: "Home · Repository · Profile", note: "Screen별 Selector Registry" },
        ],
      },
      items: [
        {
          title: "Node.js API",
          body: "React Web Editor와 Chrome Extension 사이에서 인증과 템플릿 데이터를 중계합니다. 저장 시점마다 Shared Schema로 검증·정규화합니다.",
          table: {
            columns: ["Module", "Role"],
            rows: [
              ["Auth", "Google ID Token 검증 · Bearer Session"],
              ["Template API", "CRUD · Publish · Like · View · Import"],
              ["Rate Limit", "Read/Mutation 요청 제한"],
            ],
          },
        },
        {
          title: "SQLite",
          body: "템플릿과 버전, 세션·사용 기록을 저장합니다. Legacy JSON을 마이그레이션해 하나의 스키마로 관리합니다.",
          points: ["Templates · Versions", "Sessions · Usage", "Legacy JSON Migration"],
        },
        {
          title: "Chrome Extension",
          body: "가장 최근 템플릿을 조회해 GitHub DOM에 적용합니다. 단일 selector 대신 Screen별 Selector Registry를 사용해 DOM 변경에 대응합니다.",
          points: ["Manifest V3 Content Script 주입", "Selector Registry 기반 DOM Mapping", "MutationObserver로 동적 화면 재적용"],
        },
      ],
    },
    process: {
      eyebrow: "Core Pipelines",
      title: "템플릿 편집이 저장을 거쳐 실제 GitHub 화면 적용으로 이어지기까지",
      flows: [
        {
          title: "1. Template Library와 편집 흐름",
          steps: ["Google 로그인", "Library 진입", "기본 템플릿 복제", "Editor 수정", "Save Draft"],
          caption: "기본 템플릿은 직접 수정하지 않고 복제본으로 시작해 원본 상태를 보호했습니다.",
        },
        {
          title: "2. 저장부터 실제 적용까지",
          steps: ["Google 로그인", "템플릿 편집", "저장 요청", "검증 · 정규화", "SQLite 저장", "Extension 조회", "GitHub 적용"],
          caption: "저장 성공만 확인하지 않고, 동일 계약으로 Extension 적용 가능 여부까지 보장합니다.",
        },
        {
          title: "3. Chrome Extension 실행 흐름",
          steps: ["document_idle", "페이지 감지", "템플릿 조회", "Payload 검증", "DOM 매핑", "스타일 적용"],
          caption: "Manifest V3 Content Script가 GitHub 페이지에 직접 주입되어 실행됩니다.",
        },
      ],
      tables: [
        {
          title: "Template Contract 구조",
          columns: ["Layer", "필드"],
          rows: [
            ["Screen", "github-home · repository-readme · profile-overview"],
            ["Region", "topbar · left/right sidebar · main-feed"],
            ["Block", "type · visible · props · screenId"],
            ["Layout", "left · main · right · resizeEnabled"],
          ],
        },
        {
          title: "보안 · 운영 처리",
          columns: ["항목", "설명"],
          rows: [
            ["ID Token 검증", "Google Identity 기반 사용자 식별"],
            ["Session 저장", "SHA-256으로 저장"],
            ["CORS", "Allowlist 기반 제한"],
            ["Rate Limit", "Read/Mutation 분리 적용"],
          ],
        },
      ],
    },
    uxFlow: {
      eyebrow: "Result",
      title: "원본을 직접 건드리지 않고 복제본으로 안전하게 다뤘습니다",
      items: [
        { tag: "Template", title: "기본 템플릿 복제", body: "기본 템플릿은 직접 수정하지 않고 복제본으로 시작해 원본 상태를 보호합니다." },
        { tag: "Import", title: "Import 복제 저장", body: "Import는 원본을 덮어쓰지 않고 사용자 Library에 복제본으로 저장합니다." },
        { tag: "Registry", title: "Selector Registry 격리", body: "외부 서비스 DOM에 직접 의존하는 위험을 Selector Registry로 격리했습니다." },
      ],
    },
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
    finale: {
      flow: {
        eyebrow: "Analysis process",
        title: "소스 코드가 탐색 가능한 그래프가 되기까지",
        steps: [
          { label: "코드 읽기", detail: "현재 열려 있는 파일과 주변 TypeScript·JavaScript 파일을 불러옵니다." },
          { label: "코드 구조 분석", detail: "AST를 이용해 코드가 어떤 요소로 구성되어 있는지 파악합니다." },
          { label: "요소 분류", detail: "파일, 함수, 클래스, 타입을 각각 하나의 그래프 노드로 정리합니다." },
          { label: "관계 연결", detail: "어떤 함수가 호출되고 참조되는지 선으로 연결합니다." },
          { label: "원본 코드로 이동", detail: "그래프에서 노드를 선택하면 해당 소스 코드 위치로 바로 이동합니다." },
        ],
      },
      decisions: {
        eyebrow: "Exploration Design",
        title: "목적에 맞는 방식으로 코드를 살펴볼 수 있게 했습니다",
        points: [
          "Inspector에서는 선택한 함수나 클래스의 정보와 주변 연결 관계를 확인할 수 있습니다.",
          "Trace Mode에서는 특정 코드가 어디에서 시작해 어디로 이어지는지 따라갈 수 있습니다.",
          "Runtime Debug에서는 코드 구조뿐 아니라 실행 중에 값이 어떻게 변하는지도 확인할 수 있습니다.",
          "기능을 목적별 모드로 나눠 한 화면에 너무 많은 정보가 나타나지 않도록 했습니다.",
        ],
      },
    },
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
    architecture: {
      eyebrow: "System Design",
      title: "분석 엔진과 UI를 메시지 계약으로 분리했습니다",
      diagram: {
        extension: {
          title: "VS Code Extension Host",
          subtitle: "메시지 라우팅 · 정적 분석 · VS Code API",
          entry: { label: "Extension Entry", note: "activate()" },
          hub: { label: "CodeGraphPanel", note: "Orchestrator" },
          services: [
            { label: "Workspace Service", note: "파일 탐색 · tsconfig" },
            { label: "Analysis Core", note: "AST · Symbol · Type" },
            { label: "RuntimeDebug Bridge", note: "Stack Frame · Variables" },
          ],
          editorApi: { label: "VS Code Editor API", note: "openLocation · Source Range 이동" },
        },
        webview: {
          title: "React Webview",
          subtitle: "Visualization & Interaction",
          panels: [
            { label: "Topbar · FiltersBar", note: "Depth · Trace · 필터" },
            { label: "CanvasPane", note: "ReactFlow 그래프" },
            { label: "Inspector", note: "상세 정보 탐색" },
            { label: "Scaffold Lab", note: "구조 생성" },
          ],
        },
        protocol: {
          label: "Typed Message Protocol",
          forward: "selectWorkspaceFile · openLocation · analyzeActiveFile",
          backward: "workspaceFiles · analysisResult · runtimeDebug",
        },
      },
      items: [
        {
          title: "Extension Host",
          body: "VS Code API와 정적 분석을 전담하는 영역입니다. CodeGraphPanel이 Orchestrator로서 메시지 라우팅, 상태 관리, 요청 제어를 맡고, Analysis Core가 TypeScript Program·TypeChecker로 AST를 분석합니다.",
          table: {
            columns: ["Component", "Role"],
            rows: [
              ["Workspace Service", "파일 탐색 · tsconfig · 목록 캐시"],
              ["Analysis Core", "AST · Symbol · Type · Framework Adapter"],
              ["RuntimeDebug Bridge", "Stack Frame · Variables 연결"],
            ],
          },
        },
        {
          title: "React Webview",
          body: "시각화와 사용자 상호작용만 담당하는 독립된 프론트엔드입니다. App이 메시지·상태·레이아웃을 통합 관리하고, 그래프 렌더링과 상세 탐색을 컴포넌트 단위로 분리했습니다.",
          table: {
            columns: ["Component", "Role"],
            rows: [
              ["Topbar · FiltersBar", "Depth · Trace · 필터 제어"],
              ["CanvasPane", "ReactFlow 그래프, 선택 · 탐색 · Export"],
              ["Inspector · Scaffold Lab", "상세 정보와 구조 생성"],
            ],
          },
        },
        {
          title: "Typed Message Protocol",
          body: "두 영역은 직접 결합되지 않고, 타입이 정의된 요청/응답 메시지로만 통신합니다. Webview가 selectWorkspaceFile·openLocation 같은 요청을 보내면, Extension이 analysisResult·workspaceFiles로 응답하는 구조입니다.",
          table: {
            columns: ["Webview → Extension", "Extension → Webview"],
            rows: [
              ["selectWorkspaceFile", "workspaceFiles"],
              ["openLocation", "analysisResult"],
              ["analyzeActiveFile", "runtimeDebug"],
            ],
          },
        },
      ],
    },
    performance: {
      eyebrow: "Performance",
      title: "3단계 캐시로 반복 분석 비용을 줄였습니다",
      stats: [
        { label: "Workspace TTL", value: "10초", note: "파일 목록 재사용 주기" },
        { label: "Max Scan", value: "4,000", note: "최대 검색 파일 수" },
        { label: "Analysis Cache", value: "40개", note: "분석 결과 캐시 수" },
        { label: "SourceFile Cache", value: "800개", note: "SourceFile 캐시 수" },
      ],
      flowInput: { label: "분석 요청", note: "Active Editor + Graph Options" },
      flowOutput: { label: "분석 결과", note: "graph · diagnostics · trace · meta" },
      layers: [
        {
          badge: "Layer 1",
          title: "Workspace File List Cache",
          detail: "ts·tsx·js·jsx 파일 목록을 10초 동안 재사용하고, node_modules·dist·build·out·.next은 제외한 채 최대 4,000개까지 검색합니다.",
          tags: ["workspace state"],
        },
        {
          badge: "Layer 2",
          title: "Analysis Result Cache",
          detail: "동일한 코드와 분석 옵션의 graph·diagnostics·trace 결과를 최근 접근 시각 기준으로 최대 40개까지 재사용합니다.",
          tags: ["codeHash", "graphDepth", "traceMode", "workspaceFilesHash"],
        },
        {
          badge: "Layer 3",
          title: "TypeScript SourceFile Cache",
          detail: "변경되지 않은 디스크 파일의 파싱 결과를 CompilerHost에서 최대 800개까지 재사용해 반복 파싱 비용을 줄입니다.",
          tags: ["mtimeMs", "size", "ScriptKind", "languageVersionKey"],
        },
      ],
      notes: [
        "저장되지 않은 활성 편집기 내용은 항상 메모리의 최신 텍스트로 분석해 캐시가 오래된 코드를 보여주지 않도록 했습니다.",
        "문서 변경·저장을 감지하면 분석 결과 캐시를 비우고, 파일 생성·삭제·이름 변경은 SourceFile 캐시를 무효화합니다.",
        "tsconfig나 캐시 설정이 바뀌면 두 캐시를 함께 초기화해 캐시 적중률과 정확성을 동시에 지킵니다.",
      ],
    },
    uxFlow: {
      eyebrow: "User Experience",
      title: "탐색·이동·이해·재사용으로 이어지는 흐름",
      items: [
        {
          tag: "EXPLORE",
          title: "그래프 생성 및 범위 탐색",
          body: "파일과 연결된 호출·참조·데이터 흐름을 시각화하고, Depth와 Root Scope를 조절해 필요한 범위만 확장합니다.",
          points: ["노드 선택·다중 선택", "검색·관계 필터", "외부 파일 확장"],
        },
        {
          tag: "NAVIGATE",
          title: "그래프와 원본 코드 양방향 연결",
          body: "노드를 선택하면 Inspector가 갱신되고, 더블클릭하면 Extension이 파일을 열어 해당 Source Range로 이동합니다.",
          points: ["Graph → Inspector → Editor가 하나의 탐색 흐름으로 동작"],
        },
        {
          tag: "UNDERSTAND",
          title: "Trace와 Runtime Debug로 실행 문맥 확인",
          body: "Trace Mode는 그래프 생성 순서를 단계별로 재생하고, Runtime Debug는 중단된 Stack Frame을 노드와 연결합니다.",
          points: ["정적 구조와 실제 실행 위치를 같은 그래프 문맥에서 확인"],
        },
        {
          tag: "REUSE",
          title: "분석 결과 내보내기와 구조 생성",
          body: "그래프와 상태를 JSON으로 저장하고, 시각 결과를 JPG·SVG로 내보내며 Scaffold Lab에서 코드 구조를 생성합니다.",
          points: ["JSON — graph + state snapshot", "JPG·SVG — 시각 결과", "Scaffold Lab — patch preview"],
        },
      ],
    },
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
    finale: {
      flow: {
        eyebrow: "How it works",
        title: "Git 명령 결과가 캐릭터 피드백으로 표시되기까지",
        steps: [
          { label: "Git 명령 실행", detail: "사용자가 push, pull, commit 같은 Git 작업을 실행합니다." },
          { label: "작업 감지", detail: "확장 프로그램이 명령 실행이나 저장소의 상태 변화를 확인합니다." },
          { label: "성공 여부 확인", detail: "Git 실행 결과를 읽고 작업이 성공했는지 실패했는지 구분합니다." },
          { label: "반복 알림 제거", detail: "짧은 시간에 같은 이벤트가 여러 번 감지되면 하나의 알림만 남깁니다." },
          { label: "결과 표시", detail: "작업 결과에 맞는 메시지와 캐릭터 효과를 화면에 보여줍니다." },
        ],
      },
      decisions: {
        eyebrow: "Feedback design",
        title: "재미는 더하고 작업 방해는 줄였습니다",
        points: [
          "push, pull, commit처럼 결과 확인이 필요한 작업에만 피드백을 표시합니다.",
          "애니메이션을 보여주기 전에 Git 명령의 성공과 실패를 정확히 구분하도록 했습니다.",
          "피드백 화면은 에디터를 오래 가리지 않고 잠시 나타났다가 자동으로 사라집니다.",
          "사용자가 원하는 캐릭터와 Git 작업 감지 방식을 선택할 수 있게 했습니다.",
        ],
      },
    },
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
    finale: {
      flow: {
        eyebrow: "Workflow",
        title: "수식으로 만든 그래프를 저장하고 다시 편집합니다",
        steps: [
          { label: "수식 또는 데이터 입력", detail: "시각화하려는 함수, 매개변수 또는 배열 데이터를 입력합니다." },
          { label: "그래프 생성", detail: "입력 내용에 맞는 2D 그래프나 3D 곡선·곡면을 화면에 그립니다." },
          { label: "그래프 조절", detail: "Studio에서 범위와 시점, 표현 방식을 바꾸며 결과를 살펴봅니다." },
          { label: "Vault에 저장", detail: "만든 그래프를 나중에도 사용할 수 있도록 작업 목록에 저장합니다." },
          { label: "다시 열어 편집", detail: "저장한 그래프를 다시 수정하거나 AI Panel에 그래프에 관한 설명을 요청합니다." },
        ],
      },
      decisions: {
        eyebrow: "Product Design",
        title: "그래프 작업을 언제든 이어갈 수 있게 했습니다",
        points: [
          "2D와 3D처럼 그래프 종류가 달라도 같은 작업 순서로 만들고 편집할 수 있게 했습니다.",
          "3D 그래프를 처음 열었을 때 형태를 파악하기 쉽도록 기본 시점과 조작 방식을 정했습니다.",
          "AI Panel은 일반적인 대화보다 현재 선택한 그래프를 설명하고 수정하는 데 집중합니다.",
          "그래프를 저장하고 다시 편집할 수 있게 해 반복해서 사용하는 작업 공간으로 만들었습니다.",
        ],
      },
    },
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
    architecture: {
      eyebrow: "System Design",
      title: "React Client와 Spring Boot API를 하나의 그래프 워크스페이스로 연결했습니다",
      flowDiagram: {
        user: { label: "User" },
        client: {
          title: "React Client",
          panels: [
            { label: "Studio", note: "그래프 생성 · 편집 · 2D·3D 시각화" },
            { label: "Vault", note: "나의 그래프 관리 · 공개·비공개 설정" },
            { label: "AI Panel", note: "자연어 요청 · AI 분석 결과 확인" },
          ],
        },
        spine: [
          { label: "Studio State", note: "앱 상태 · 그래프 데이터 · Undo/Redo · Marker 분석 결과" },
          { label: "Math & Render Engine", note: "수식 파싱(Math.js) · 좌표 샘플링 · 2D·3D 렌더링" },
          { label: "Spring Boot API", note: "Auth · Vault CRUD · History 관리" },
          { label: "MVP Storage", note: "저장된 그래프 · 변경 히스토리 · AI 요청 기록" },
        ],
        aiBranch: {
          context: "Context",
          nodes: [
            { label: "AI Proxy / LLM", note: "그래프 문맥 전달 · LLM 응답 처리 · 구조화 명령 변환" },
            { label: "Structured Command", note: "허용 명령 필터링 · Allowlist 검증 · 파라미터 검증" },
          ],
        },
      },
      items: [
        {
          title: "React Client",
          body: "Studio·Vault·AI Panel 세 화면이 하나의 클라이언트에서 상태를 공유합니다. Studio에서 만든 그래프를 Vault에서 관리하고, AI Panel에서 같은 그래프에 대해 질문하고 명령할 수 있습니다.",
          table: {
            columns: ["Panel", "Role"],
            rows: [
              ["Studio", "그래프 생성 · 편집 · 2D·3D 시각화"],
              ["Vault", "나의 그래프 관리 · 공개·비공개 설정"],
              ["AI Panel", "자연어 요청 · AI 분석 결과 확인"],
            ],
          },
        },
        {
          title: "Math & Render Engine",
          body: "수식을 파싱해 좌표를 샘플링하고, Three.js로 2D·3D 그래프를 렌더링하며 사용자의 직접 조작까지 처리하는 핵심 엔진입니다.",
          points: ["수식 파싱 (Math.js)", "좌표 샘플링", "2D·3D 렌더링", "그래프 직접 조작"],
        },
        {
          title: "Spring Boot API",
          body: "React Client가 만든 그래프와 작업 이력을 영속화하는 백엔드입니다. 사용자별 리소스를 인증 기반으로 저장하고 조회합니다.",
          table: {
            columns: ["Endpoint", "Role"],
            rows: [
              ["Auth", "로그인 · 사용자 관리"],
              ["Vault CRUD", "그래프 리소스 관리"],
              ["History", "작업 이력 관리"],
            ],
          },
        },
      ],
    },
    process: {
      eyebrow: "Core Pipelines",
      title: "수식이 그래프가 되고, AI 명령이 상태에 반영되기까지",
      flows: [
        {
          title: "1. 수식 기반 2D·3D 그래프 렌더링",
          steps: ["수식 입력", "Math.js 파싱", "좌표 샘플링", "Float32Array", "BufferGeometry", "Three.js 렌더링"],
          caption:
            "수식을 파싱하고 정의역을 일정 간격으로 샘플링해 좌표 데이터를 생성한 뒤, BufferGeometry로 변환해 2D·3D 그래프로 렌더링했습니다.",
        },
        {
          title: "2. 그래프 직접 조작 및 Undo/Redo",
          steps: ["포인트 선택", "Drag 시작", "Snapshot 저장", "좌표 변경", "그래프 재계산", "History 갱신"],
          caption: "한 번의 Drag 동작을 하나의 Undo 단위로 관리했습니다. Drag 시작 시 상태를 저장하고, 종료 시 변경 결과를 History에 기록합니다.",
        },
        {
          title: "3. AI 명령 처리 흐름",
          steps: ["자연어 요청", "그래프 문맥", "LLM 요청", "JSON 파싱", "Allowlist", "결과 반영"],
          caption: "그래프 문맥을 LLM에 전달하고, 응답을 JSON 명령으로 변환한 뒤 검증된 결과만 그래프 상태에 반영했습니다.",
        },
      ],
      tables: [
        {
          title: "지원 명령 · Allowlist",
          columns: ["명령", "기능"],
          rows: [
            ["mark_max", "극대점 표시"],
            ["mark_roots", "근 표시"],
            ["slice_x", "X축 단면"],
            ["contour_z", "Z값 등고선"],
          ],
        },
      ],
    },
    uxFlow: {
      eyebrow: "Result",
      title: "검증된 명령만 그래프 상태에 반영합니다",
      items: [
        { tag: "Context", title: "Context 구성", body: "현재 그래프 정보를 포함해 LLM에 전달할 문맥을 구성합니다." },
        { tag: "Validate", title: "명령 검증", body: "JSON 명령을 Allowlist 기준으로 파라미터까지 검증합니다." },
        { tag: "Apply", title: "상태 반영", body: "검증된 결과만 그래프 상태(Marker · 단면 · 등고선)에 적용합니다." },
      ],
    },
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
    finale: {
      flow: {
        eyebrow: "Execution structure",
        title: "노드를 연결해 실시간 결과를 확인하기까지",
        steps: [
          { label: "입력 추가", detail: "이미지, 시간, 웹캠, 손 움직임처럼 사용할 데이터를 노드로 추가합니다." },
          { label: "노드 연결", detail: "각 노드를 선으로 연결해 데이터가 이동할 순서를 정합니다." },
          { label: "연결 순서대로 계산", detail: "실행 엔진이 앞 노드의 결과를 다음 노드에 전달하며 값을 계산합니다." },
          { label: "화면에 그리기", detail: "계산된 결과를 Canvas 2D를 이용해 시각 이미지로 변환합니다." },
          { label: "결과 바로 확인", detail: "노드 안의 작은 화면과 최종 화면에서 변화를 실시간으로 확인합니다." },
        ],
      },
      decisions: {
        eyebrow: "Interaction Design",
        title: "연결한 결과를 바로 이해할 수 있게 했습니다",
        points: [
          "각 노드에 작은 미리보기 화면을 넣어 어느 단계에서 결과가 달라졌는지 바로 확인할 수 있습니다.",
          "노드를 연결하거나 값을 바꾸면 최종 결과도 즉시 바뀌도록 만들었습니다.",
          "손 움직임도 다른 이미지나 숫자 데이터처럼 자유롭게 연결할 수 있는 입력으로 만들었습니다.",
          "노드 종류를 무작정 늘리기보다 연결 방향과 실행 순서를 쉽게 이해할 수 있도록 구성했습니다.",
        ],
      },
    },
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
    architecture: {
      eyebrow: "System Design",
      title: "편집 상태와 실행 런타임을 분리하고, 연결 정보를 실제 데이터 흐름으로 변환했습니다",
      clientBackendDiagram: {
        client: {
          title: "React Client",
          groups: [
            { label: "Studio State", chips: ["Nodes / Edges", "Operator Params", "Selection", "Viewer State"] },
            { label: "Runtime / Evaluator", chips: ["Input Map", "Registry 조회", "TOP 평가", "CHOP 평가", "SOP 평가", "Frame Cache"] },
          ],
          note: "Canvas 2D Preview / Final Viewer",
        },
        backend: {
          title: "Backend (Express)",
          chips: ["JWT 인증", "Graph CRUD API", "User Graph Directory"],
        },
        storage: {
          title: "JSON Graph Storage",
          note: "/graphs/{userId}/graph_001.json",
          chips: ["Nodes / Edges", "사용자별 폴더 구조"],
        },
        protocol: {
          forward: "POST · PUT · DELETE /api/graphs",
          backward: "그래프 목록 · 상세 응답",
        },
      },
      items: [
        {
          title: "React Client",
          body: "Studio State가 편집 중인 노드·연결·선택 상태를 들고 있고, Runtime/Evaluator가 이를 매 프레임 평가해 Canvas 2D Preview와 최종 Viewer로 내보냅니다.",
          table: {
            columns: ["State", "Role"],
            rows: [
              ["Studio State", "Nodes/Edges · Operator Params · Selection · Viewer State"],
              ["Runtime / Evaluator", "Input Map → Registry → TOP·CHOP·SOP 평가 → Frame Cache"],
              ["Canvas 2D", "노드별 Preview · Final Viewer"],
            ],
          },
        },
        {
          title: "Backend (Express)",
          body: "React Client와는 Graph CRUD API로만 통신합니다. JWT로 사용자를 식별하고, 사용자별 디렉터리에 그래프를 JSON으로 저장·조회합니다.",
          table: {
            columns: ["Module", "Role"],
            rows: [
              ["JWT 인증", "Bearer Token 검증 · 사용자 식별"],
              ["Graph CRUD API", "생성 · 조회 · 저장 · 이름 변경 · 삭제"],
              ["User Graph Directory", "사용자별 폴더 구조"],
            ],
          },
        },
      ],
    },
    process: {
      eyebrow: "Core Pipelines",
      title: "노드 연결이 실제 데이터 흐름과 실행 결과로 이어지기까지",
      flows: [
        {
          title: "1. ReactFlow 기반 노드 편집기",
          steps: ["Operator 선택", "노드 생성", "위치 배치", "Handle 연결", "Parameter 수정", "편집 상태 갱신"],
          caption: "노드 생성·연결·선택·삭제와 Inspector 연동이 가능한 편집기를 구현했습니다.",
        },
        {
          title: "2. 실시간 Runtime 평가",
          steps: ["requestAnimationFrame", "Input Map 생성", "Operator 종류 확인", "Registry 탐색", "연결 노드 평가", "Frame Cache", "Preview 출력"],
          caption: "프레임마다 연결 관계를 평가하고, 노드별 미리보기와 최종 Viewer를 갱신했습니다.",
        },
        {
          title: "3. 손동작 데이터 처리 흐름",
          steps: ["웹캠 입력", "HandLandmarker", "제스처 계산", "CHOP 채널 변환", "Operator 연결", "실시간 비주얼 변화"],
          caption:
            "웹캠에서 추출한 손 랜드마크를 거리·높이·각도 값으로 계산한 뒤, 0~1 범위의 CHOP 채널로 변환해 여러 Operator 파라미터에 연결했습니다.",
        },
        {
          title: "4. 사용자별 프로젝트 저장 흐름",
          steps: ["Studio State", "Thumbnail", "Authorization", "Express API", "JSON 저장"],
          caption:
            "Nodes·Edges·Params를 직렬화하고 Viewer 결과로 썸네일을 생성한 뒤, Bearer Token을 포함해 /api/graphs로 저장을 요청하고 사용자별 폴더에 JSON으로 저장합니다.",
        },
      ],
      tables: [
        {
          title: "API 주요 엔드포인트",
          columns: ["Endpoint", "설명"],
          rows: [
            ["GET /api/graphs", "그래프 목록 조회"],
            ["GET /api/graphs/:id", "특정 그래프 조회"],
            ["POST /api/graphs", "새 그래프 저장"],
            ["PUT /api/graphs/:id", "그래프 수정"],
            ["DELETE /api/graphs/:id", "그래프 삭제"],
          ],
        },
        {
          title: "제스처 채널 매핑",
          columns: ["손동작", "제어 대상"],
          rows: [
            ["엄지 · 검지 Pinch (ch0)", "Noise Amplitude"],
            ["검지 높이 (ch1)", "Noise Frequency"],
            ["손목 기울기 (ch2)", "Animation Speed"],
          ],
        },
      ],
    },
    uxFlow: {
      eyebrow: "Result",
      title: "손동작을 UI 이벤트가 아닌 데이터로 다뤘습니다",
      items: [
        { tag: "Input", title: "입력 추상화", body: "웹캠 로직을 Hands CHOP으로 분리했습니다." },
        { tag: "Channel", title: "데이터 채널화", body: "손동작을 0~1 범위의 채널 값으로 변환했습니다." },
        { tag: "Reuse", title: "재사용 가능한 연결", body: "TOP·SOP 파라미터에 반복해서 연결할 수 있습니다." },
      ],
    },
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
    finale: {
      flow: {
        eyebrow: "Prediction process",
        title: "입력한 위치가 시간대별 소음 예측으로 바뀌기까지",
        steps: [
          { label: "위치와 환경 입력", detail: "지도에서 예측할 위치를 선택하고 도로와 주변 환경 정보를 입력합니다." },
          { label: "예측 요청", detail: "입력한 정보를 Flask API를 통해 소음 예측 모델에 전달합니다." },
          { label: "교통수단별 계산", detail: "자동차, 이륜자동차, 열차 모델이 각각의 예상 소음 수준을 계산합니다." },
          { label: "24시간 변화 표시", detail: "계산된 값을 0시부터 23시까지의 시간대별 그래프로 보여줍니다." },
          { label: "주요 원인 표시", detail: "도로와 환경 조건 중 어떤 항목이 결과에 큰 영향을 주었는지 함께 보여줍니다." },
        ],
      },
      decisions: {
        eyebrow: "Information Design",
        title: "예측값만 보여주지 않고 의미까지 설명했습니다",
        points: [
          "지도에서는 어느 위치의 소음을 예측하고 있는지 확인할 수 있습니다.",
          "24시간 그래프에서는 소음이 어느 시간대에 높아지는지 비교할 수 있습니다.",
          "주요 영향 요인에서는 예측 결과가 달라진 이유를 확인할 수 있습니다.",
          "자동차, 이륜자동차, 열차의 결과를 나눠 교통수단별 차이를 쉽게 비교할 수 있게 했습니다.",
        ],
      },
    },
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
    architecture: {
      eyebrow: "System Design",
      title: "Frontend와 모델 서버를 분리하고, JSON 기반 계약으로 연결했습니다",
      pipelineDiagram: {
        input: {
          title: "도시 환경 데이터",
          note: "위치 · 시간 · 거리 · 날씨 · 교통수단",
          meta: "JSON Metadata",
        },
        model: {
          title: "AI Model Layer",
          subtitle: "전처리 · 입력 스키마 고정 · CatBoost 추론",
          chips: ["자동차", "이륜자동차", "열차"],
        },
        backend: {
          title: "Flask Backend API",
          subtitle: "입력 검증 → 모델 선택 → 추론 → JSON 응답",
          note: "서울 지역 좌표 범위 Validation",
        },
        frontend: {
          title: "React Frontend",
          chips: ["지도 기반 위치 입력", "24시간 예측 그래프", "영향 요인 시각화"],
        },
        protocol: {
          forward: "예측 요청",
          backward: "REST API 응답",
        },
      },
      items: [
        {
          title: "AI Model Layer",
          body: "원본 메타데이터를 전처리하고 입력 스키마를 고정한 뒤, 교통수단별로 독립된 CatBoost 모델이 추론합니다.",
          points: ["전처리 · 입력 스키마 고정", "CatBoost 추론 (교통수단별 모델)", "자동차 · 이륜자동차 · 열차 모델 분리"],
        },
        {
          title: "Flask Backend API",
          body: "React Frontend와는 REST API로만 통신합니다. 서울 지역 좌표 범위를 검증한 뒤 모델을 선택해 추론하고 JSON으로 응답합니다.",
          points: ["입력 검증 → 모델 선택 → 추론 → JSON 응답", "서울 지역 좌표 범위 Validation"],
        },
        {
          title: "React Frontend",
          body: "예측 요청을 보내고 응답을 지도, 24시간 그래프, 영향 요인 화면으로 나눠 보여줍니다.",
          points: ["지도 기반 위치 입력", "24시간 예측 그래프", "영향 요인 시각화"],
        },
      ],
    },
    process: {
      eyebrow: "Core Pipelines",
      title: "위치 데이터가 예측값과 해석 가능한 결과로 이어지기까지",
      flows: [
        {
          title: "1. 모델 입력과 예측 파이프라인",
          steps: ["원본 JSON", "전처리", "스키마 고정", "범주형 정의", "CatBoost 추론", "예측 결과"],
          caption:
            "원본 메타데이터를 전처리하고 feature_list.json · cat_cols.json으로 입력 스키마를 고정한 뒤, 교통수단별 CatBoost 모델로 추론해 dB와 Feature Importance를 얻습니다.",
        },
        {
          title: "2. 프론트엔드 상태 관리",
          steps: ["Idle", "Loading", "Success", "Invalid", "Error"],
          caption:
            "초기 위치 선택 대기 상태에서 예측 요청을 보내고, 서울 범위 검증과 API 응답 결과에 따라 Success · Invalid · Error 중 하나로 전환됩니다.",
        },
        {
          title: "3. 예측 결과 해석 구조",
          steps: ["모델 예측값", "Feature Importance", "영향 요인 재분류", "사용자 화면 반영"],
          caption: "시간대별 dB 예측값과 변수 중요도를 거리 · 시간 · 도시 환경 · 날씨로 재분류해 주요 원인을 화면에 표시합니다.",
        },
      ],
      tables: [
        {
          title: "API 응답 구조",
          columns: ["필드", "설명"],
          rows: [
            ["predictions", "시간대별 예측 dB 배열"],
            ["vehicleType", "자동차 · 이륜자동차 · 열차"],
            ["featureImportance", "주요 영향 요인 목록"],
            ["location", "latitude · longitude"],
          ],
        },
        {
          title: "24시간 소음 프로파일 요약",
          columns: ["지표", "값"],
          rows: [
            ["최대 예측값", "72.4 dB · 18시"],
            ["최저 예측값", "49.8 dB · 03시"],
            ["예측 포인트", "교통수단별 24개"],
          ],
        },
      ],
    },
    uxFlow: {
      eyebrow: "Result",
      title: "영향 요인을 네 가지 기준으로 재분류했습니다",
      items: [
        { tag: "Distance", title: "거리", body: "소음원과 측정 지점 간 거리입니다." },
        { tag: "Time", title: "시간", body: "시간대별 교통 패턴을 반영합니다." },
        { tag: "Urban", title: "도시 환경", body: "도로 · 건물 · 공간 특성입니다." },
        { tag: "Weather", title: "날씨", body: "기상 조건과 환경 변수입니다." },
      ],
    },
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
