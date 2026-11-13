export type ProjectCategory =
  | "All Projects"
  | "Full-Stack Development"
  | "Web Applications"
  | "AI / Machine Learning"
  | "Frontend Development"
  | "Backend / API"
  | "UI/UX Design";

export type GalleryCategory =
  | "All"
  | "UI/UX Design"
  | "Web Interfaces"
  | "Dashboard Concepts"
  | "System Diagrams";

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  isPlaceholder?: boolean;
}

export interface ProfileData {
  name: string;
  brandWordmark: string;
  role: string;
  animatedRoles: string[];
  headline: string;
  shortIntro: string;
  location: string;
  availability: {
    enabled: boolean;
    label: string;
  };
  profileImage: string;
  profileImageAlt: string;
  profileImageIsPlaceholder: boolean;
  resumeUrl: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  otherSocials: SocialLink[];
}

export interface AboutHighlight {
  label: string;
  value: string;
  detail: string;
}

export interface AboutData {
  eyebrow: string;
  title: string;
  introParagraph: string;
  backgroundParagraph: string;
  educationSummary: string;
  technicalFocus: string[];
  interests: string[];
  highlights: AboutHighlight[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, "All Projects">;
  year: string;
  thumbnail: string;
  thumbnailAlt: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  architectureNotes: string[];
  deliverables: string[];
  githubUrl: string;
  liveUrl: string;
  featured?: boolean;
}

export interface ArchitecturePattern {
  id: string;
  label: string;
  title: string;
  summary: string;
  layers: Array<{
    stage: string;
    component: string;
    responsibility: string;
  }>;
  codeTitle: string;
  codeSnippet: string;
  note: string;
}

export interface AiAutomationItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  workflowSteps: string[];
  stack: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export interface TimelineEntry {
  id: string;
  type: "experience" | "education";
  organization: string;
  title: string;
  location: string;
  duration: string;
  description: string;
  responsibilities: string[];
  highlights: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, "All">;
  year: string;
  image: string;
  alt: string;
  caption: string;
  tools: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
}

export interface PortfolioConfig {
  sections: {
    showArchitecture: boolean;
    showAiAutomation: boolean;
    showGallery: boolean;
    showServices: boolean;
  };
  profile: ProfileData;
  about: AboutData;
  skillCategories: SkillCategory[];
  projects: ProjectItem[];
  architecturePatterns: ArchitecturePattern[];
  aiAutomation: AiAutomationItem[];
  timeline: TimelineEntry[];
  gallery: GalleryItem[];
  services: ServiceItem[];
  copyrightNotice: string;
}
