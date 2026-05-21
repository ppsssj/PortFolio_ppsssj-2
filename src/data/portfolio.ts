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
  description: string;
  image: string;
  href: string;
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

export const siteMeta = {
  brand: "PPsssJ",
  title: "PPsssJ Developer Portfolio",
  eyebrow: "Site of the Day - Apr 10, 2026",
  date: "SOTD",
  score: "7.52",
  scoreLabel: "SOTD",
  description:
    "Frontend developer building polished interfaces, motion-rich interactions, and product-focused web experiences.",
  visitHref: "#contact",
  visitLabel: "View Portfolio",
  secondaryCtaHref: "#score",
  secondaryCtaLabel: "Read Score",
};

export const marqueeItems = [
  "Developer Portfolio",
  "Frontend Craft",
  "Interaction Systems",
  "Selected Projects",
  "Product Thinking",
];

export const navigationItems: LinkItem[] = [
  { label: "Creator", href: "#creator" },
  { label: "Font & Color", href: "#typography" },
  { label: "Details", href: "#details" },
  { label: "Score", href: "#score" },
];

export const socialItems: LinkItem[] = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Email", href: "mailto:hello@example.com" },
];

export const creatorCredits: CreditItem[] = [
  { name: "PPsssJ", role: "Frontend Development", badge: "Lead" },
  { name: "React", role: "Component Architecture", badge: "Core" },
  { name: "Motion", role: "Interaction Direction" },
];

export const heroGallery = [
  "https://assets.awwwards.com/awards/submissions/2026/03/69b11a0406d6b617931025.jpg",
];

export const highlightCards: HighlightCard[] = [
  {
    title: "Contact Experience",
    category: "Element",
    description: "Form, motion, and feedback tuned for deliberate conversion moments.",
    image: "https://assets.awwwards.com/awards/element/2026/03/69b11f6940624831506919_static.jpeg",
    href: "#contact",
  },
  {
    title: "Infinite Hero Rail",
    category: "Element",
    description: "Editorial landing sequence with layered transitions and horizontal rhythm.",
    image: "https://assets.awwwards.com/awards/element/2026/03/69b11fccf3dcf183830785_static.jpeg",
    href: "#creator",
  },
  {
    title: "About Storytelling",
    category: "Element",
    description: "Dense information reframed into a paced narrative with bold sectioning.",
    image: "https://assets.awwwards.com/awards/element/2026/03/69b11ffe5f74c754653000_static.jpeg",
    href: "#creator",
  },
  {
    title: "News and Updates",
    category: "Element",
    description: "Content modules designed for repeat publishing without losing visual tension.",
    image: "https://assets.awwwards.com/awards/element/2026/03/69b1202eca4d3331811272_static.jpeg",
    href: "#typography",
  },
  {
    title: "Process Section",
    category: "Element",
    description: "Clear explanations of system thinking, decision framing, and delivery flow.",
    image: "https://assets.awwwards.com/awards/element/2026/03/69b1206f0ea6d510137710_static.jpeg",
    href: "#details",
  },
  {
    title: "Project Detail View",
    category: "Element",
    description: "Visual hierarchy for long-form portfolio breakdowns and implementation notes.",
    image: "https://assets.awwwards.com/awards/element/2026/03/69b120a38a65e949686387_static.jpeg",
    href: "#score",
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
  "This portfolio is structured to present implementation quality, visual precision, and the reasoning behind interaction choices while keeping the original editorial cadence intact.";

export const scoreBreakdown: ScoreItem[] = [
  { label: "Design", weight: "40%", value: 76, score: "7.63 / 10" },
  { label: "Usability", weight: "30%", value: 72, score: "7.22 / 10" },
  { label: "Creativity", weight: "20%", value: 77, score: "7.69 / 10" },
  { label: "Content", weight: "10%", value: 77, score: "7.67 / 10" },
];

export const juryVotes: VoteRow[] = [
  { name: "Product Team", role: "Execution Review", design: 9, usability: 8, creativity: 8, content: 7, total: "8.30" },
  { name: "Frontend Lead", role: "Implementation Review", design: 7, usability: 7, creativity: 7, content: 7, total: "7.00" },
  { name: "UX Reviewer", role: "Experience Review", design: 8, usability: 6, creativity: 7, content: 9, total: "7.30" },
];

export const footerGroups = [
  ["Websites", "Collections", "Elements"],
  ["Academy", "Jobs", "Market"],
  ["Directory", "Conferences"],
  ["FAQs", "About Us", "Contact Us"],
];

export const connectLinks: LinkItem[] = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Twitter", href: "https://twitter.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
  { label: "TikTok", href: "https://www.tiktok.com/" },
  { label: "Pinterest", href: "https://www.pinterest.com/" },
];
