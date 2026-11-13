import type { PortfolioConfig } from "../types/portfolio";
import { PORTFOLIO_IMAGES } from "./portfolioImages";

/**
 * ============================================================================
 * CENTRALIZED PORTFOLIO CONTENT CONFIGURATION
 * ============================================================================
 * Replace any [YOUR_...] placeholder values in this single file to personalize
 * the entire website. No personal details, projects, or experience claims have
 * been invented—update each section with your verified information.
 * ============================================================================
 */
export const portfolioData: PortfolioConfig = {
  sections: {
    showArchitecture: true,
    showAiAutomation: true,
    showGallery: true,
    showServices: true,
  },

  profile: {
    name: "[YOUR_NAME]",
    brandWordmark: "[YOUR_NAME]",
    role: "[YOUR_ROLE]",
    animatedRoles: [
      "[YOUR_PRIMARY_ROLE]",
      "Full-Stack Software Engineer",
      "Systems & UI Architect",
      "AI Workflow Engineer",
    ],
    headline: "Engineering dependable software systems with editorial clarity.",
    shortIntro:
      "[YOUR_SHORT_INTRO — Replace this paragraph with a concise 2-sentence introduction describing what you build, your technical focus, and the problems you solve.]",
    location: "[YOUR_CITY, COUNTRY]",
    availability: {
      enabled: true,
      label: "[YOUR_AVAILABILITY_STATUS — e.g. Available for Engineering Roles]",
    },
    profileImage: "/assets/aistudio/WhatsApp_Image_2026-11-13_at_11.37.59_PM_2562588c.jpeg",
    profileImageAlt: "Developer profile portrait",
    profileImageIsPlaceholder: false,
    // Set to "/resume.pdf" after placing your PDF inside the /public folder, or provide an external URL.
    resumeUrl: "",
    email: "[YOUR_EMAIL]",
    githubUrl: "[YOUR_GITHUB_URL]",
    linkedinUrl: "[YOUR_LINKEDIN_URL]",
    otherSocials: [
      {
        id: "x",
        label: "X / Twitter",
        href: "[YOUR_X_URL]",
        isPlaceholder: true,
      },
      {
        id: "website",
        label: "Technical Writing",
        href: "[YOUR_BLOG_URL]",
        isPlaceholder: true,
      },
    ],
  },

  about: {
    eyebrow: "About & Philosophy",
    title: "Structured engineering meets deliberate interface craft.",
    introParagraph:
      "[YOUR_ABOUT_INTRO — Share your background, how you entered software engineering, and what motivates your work across frontend, backend, and infrastructure.]",
    backgroundParagraph:
      "[YOUR_PROFESSIONAL_BACKGROUND — Summarize your core engineering trajectory, domains you have worked in, and how you collaborate with product and design teams.]",
    educationSummary:
      "[YOUR_DEGREE] · [YOUR_INSTITUTION] · [GRADUATION_YEAR]",
    technicalFocus: [
      "[FOCUS_AREA_1 — e.g. Distributed Web Applications]",
      "[FOCUS_AREA_2 — e.g. Design Systems & TypeScript]",
      "[FOCUS_AREA_3 — e.g. API & Database Architecture]",
      "[FOCUS_AREA_4 — e.g. Applied AI Integrations]",
    ],
    interests: [
      "[YOUR_INTEREST_1 — e.g. Systems Design]",
      "[YOUR_INTEREST_2 — e.g. Developer Tooling]",
      "[YOUR_INTEREST_3 — e.g. Editorial Typography]",
      "[YOUR_INTEREST_4 — e.g. Open Source]",
    ],
    // Replace placeholder values below ONLY with verified metrics from your own work.
    highlights: [
      {
        label: "Primary Stack",
        value: "[EDIT_STACK]",
        detail: "Core languages and runtime focus",
      },
      {
        label: "Experience",
        value: "[EDIT_YEARS]",
        detail: "Years building software systems",
      },
      {
        label: "Projects Shipped",
        value: "[EDIT_COUNT]",
        detail: "Verified production or open-source builds",
      },
      {
        label: "Focus Domain",
        value: "[EDIT_DOMAIN]",
        detail: "Primary problem space",
      },
    ],
  },

  // Organized by engineering discipline — add or remove tags without invented percentage bars.
  skillCategories: [
    {
      id: "languages",
      title: "Programming Languages",
      description: "Core typed and scripting languages used across production codebases.",
      skills: ["TypeScript", "JavaScript (ES2024)", "Python", "SQL", "[ADD_LANGUAGE]"],
    },
    {
      id: "frontend",
      title: "Frontend Development",
      description: "Component architecture, state management, accessibility, and motion systems.",
      skills: ["React", "Next.js", "Tailwind CSS", "Motion / Framer Motion", "HTML5 & ARIA"],
    },
    {
      id: "backend",
      title: "Backend Development",
      description: "RESTful services, authentication boundaries, middleware, and async workers.",
      skills: ["Node.js", "Express", "REST APIs", "WebSockets", "[ADD_BACKEND_TECH]"],
    },
    {
      id: "databases",
      title: "Databases",
      description: "Relational schema modeling, query optimization, and row-level security.",
      skills: ["PostgreSQL", "Supabase", "Redis", "Schema Migrations", "[ADD_DATABASE]"],
    },
    {
      id: "ai-ml",
      title: "AI / Machine Learning",
      description: "Structured LLM workflows, tool calling, grounding, and prompt evaluation.",
      skills: ["Gemini API (@google/genai)", "Structured JSON Outputs", "RAG Patterns", "Workflow Automation"],
    },
    {
      id: "tools",
      title: "Tools & Technologies",
      description: "Build pipelines, containerization, version control, and automated testing.",
      skills: ["Git & GitHub", "Vite", "Docker", "CI/CD Workflows", "[ADD_TOOL]"],
    },
    {
      id: "ui-ux",
      title: "UI/UX & Design",
      description: "Design tokens, editorial grid systems, prototyping, and responsive ergonomics.",
      skills: ["Design Systems", "Figma / Google Stitch", "Editorial Grid Layout", "WCAG Contrast"],
    },
    {
      id: "other",
      title: "Other Engineering Practices",
      description: "Architecture documentation, observability, and cross-functional delivery.",
      skills: ["System Architecture", "API Contracts", "Technical Writing", "Performance Profiling"],
    },
  ],

  projects: [
    {
      id: "project-1",
      title: "[YOUR_PROJECT_TITLE_1]",
      subtitle: "Full-Stack Web Platform Template",
      category: "Full-Stack Development",
      year: "[YEAR]",
      thumbnail: PORTFOLIO_IMAGES.projectFullstackUi,
      thumbnailAlt: "Full-stack web application analytics interface preview",
      shortDescription:
        "[YOUR_PROJECT_DESCRIPTION_1 — Replace with a concise 1-2 sentence summary of the problem solved, architecture, and real outcome.]",
      fullDescription:
        "[FULL_PROJECT_CASE_STUDY_1 — Describe the project background, technical constraints, key architectural decisions, and verified results here.]",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
      architectureNotes: [
        "[EDIT_ARCH_NOTE_1 — e.g. Typed REST contract shared between client and server]",
        "[EDIT_ARCH_NOTE_2 — e.g. Row-level security policies protecting tenant records]",
      ],
      deliverables: [
        "[DELIVERABLE_1 — e.g. Interactive Web Application]",
        "[DELIVERABLE_2 — e.g. Database Schema & API Layer]",
      ],
      githubUrl: "[YOUR_PROJECT_1_GITHUB_URL]",
      liveUrl: "[YOUR_PROJECT_1_LIVE_URL]",
      featured: true,
    },
    {
      id: "project-2",
      title: "[YOUR_PROJECT_TITLE_2]",
      subtitle: "AI & Automation Pipeline Template",
      category: "AI / Machine Learning",
      year: "[YEAR]",
      thumbnail: PORTFOLIO_IMAGES.projectAiPipeline,
      thumbnailAlt: "Isometric diagram of interconnected AI workflow nodes",
      shortDescription:
        "[YOUR_PROJECT_DESCRIPTION_2 — Replace with how this AI or automation project structures model inputs, validation, and user-facing workflows.]",
      fullDescription:
        "[FULL_PROJECT_CASE_STUDY_2 — Detail the model orchestration, schema validation, error recovery, and evaluation criteria used in your build.]",
      technologies: ["TypeScript", "Gemini SDK", "Express", "JSON Schema"],
      architectureNotes: [
        "[EDIT_ARCH_NOTE_1 — e.g. Server-side SDK proxy keeping credentials out of browser bundles]",
        "[EDIT_ARCH_NOTE_2 — e.g. Deterministic schema validation before persisting AI outputs]",
      ],
      deliverables: [
        "[DELIVERABLE_1 — e.g. Server-Side AI Gateway]",
        "[DELIVERABLE_2 — e.g. Streaming Evaluation Console]",
      ],
      githubUrl: "[YOUR_PROJECT_2_GITHUB_URL]",
      liveUrl: "[YOUR_PROJECT_2_LIVE_URL]",
      featured: true,
    },
    {
      id: "project-3",
      title: "[YOUR_PROJECT_TITLE_3]",
      subtitle: "Backend & Distributed API Template",
      category: "Backend / API",
      year: "[YEAR]",
      thumbnail: PORTFOLIO_IMAGES.projectArchBlueprint,
      thumbnailAlt: "Architectural block diagram representing modular backend services",
      shortDescription:
        "[YOUR_PROJECT_DESCRIPTION_3 — Replace with a description of an API gateway, microservice, or data pipeline you engineered.]",
      fullDescription:
        "[FULL_PROJECT_CASE_STUDY_3 — Outline request lifecycle, caching strategy, database indexing, and fault tolerance.]",
      technologies: ["Node.js", "PostgreSQL", "Redis", "Docker", "REST / OpenAPI"],
      architectureNotes: [
        "[EDIT_ARCH_NOTE_1 — e.g. Idempotent webhook ingestion with retry queue]",
        "[EDIT_ARCH_NOTE_2 — e.g. Strict input validation and structured error envelopes]",
      ],
      deliverables: [
        "[DELIVERABLE_1 — e.g. Documented API Service]",
        "[DELIVERABLE_2 — e.g. Automated Integration Tests]",
      ],
      githubUrl: "[YOUR_PROJECT_3_GITHUB_URL]",
      liveUrl: "[YOUR_PROJECT_3_LIVE_URL]",
    },
    {
      id: "project-4",
      title: "[YOUR_PROJECT_TITLE_4]",
      subtitle: "Design System & Web Interface Template",
      category: "UI/UX Design",
      year: "[YEAR]",
      thumbnail: PORTFOLIO_IMAGES.galleryDesignSpecimen,
      thumbnailAlt: "Swiss-style modular grid and typography specimen sheets",
      shortDescription:
        "[YOUR_PROJECT_DESCRIPTION_4 — Replace with details on a frontend architecture, design system, or interactive web application.]",
      fullDescription:
        "[FULL_PROJECT_CASE_STUDY_4 — Explain token architecture, keyboard accessibility, motion choreography, and responsive breakpoints.]",
      technologies: ["React", "Tailwind CSS", "Motion", "Figma / Stitch"],
      architectureNotes: [
        "[EDIT_ARCH_NOTE_1 — e.g. Accessible primitives with keyboard navigation and focus management]",
        "[EDIT_ARCH_NOTE_2 — e.g. Compositor-only animations respecting prefers-reduced-motion]",
      ],
      deliverables: [
        "[DELIVERABLE_1 — e.g. Reusable Component Library]",
        "[DELIVERABLE_2 — e.g. Responsive Web Interface]",
      ],
      githubUrl: "[YOUR_PROJECT_4_GITHUB_URL]",
      liveUrl: "[YOUR_PROJECT_4_LIVE_URL]",
    },
  ],

  // Illustrative architectural patterns (clearly editable — not claimed as external company systems)
  architecturePatterns: [
    {
      id: "fullstack-boundary",
      label: "Frontend & API",
      title: "Typed Client-Server Boundary",
      summary:
        "How I structure frontend views, validation boundaries, and backend REST endpoints so UI state stays synchronized and predictable.",
      layers: [
        {
          stage: "01. Client View",
          component: "React + TypeScript",
          responsibility: "Renders accessible components with explicit loading, empty, and error states.",
        },
        {
          stage: "02. API Gateway",
          component: "Express / Edge Route",
          responsibility: "Validates payloads, strips unauthenticated fields, and enforces rate limits.",
        },
        {
          stage: "03. Persistence",
          component: "PostgreSQL / Supabase",
          responsibility: "Stores normalized records with foreign keys and row-level access policies.",
        },
      ],
      codeTitle: "api-contract.ts (Editable Reference Pattern)",
      codeSnippet: `export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContact(payload: ContactSubmission) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}`,
      note: "Customizable reference architecture pattern — update with diagrams or contracts from your own systems.",
    },
    {
      id: "auth-rbac",
      label: "Auth & RBAC",
      title: "Authentication & Role-Gated Admin Access",
      summary:
        "Separating public portfolio reads from authenticated administrative mutations using server-side verification and database policies.",
      layers: [
        {
          stage: "01. Identity",
          component: "JWT / Session Token",
          responsibility: "Verifies caller identity via HTTP-only cookies or Authorization bearer tokens.",
        },
        {
          stage: "02. Middleware",
          component: "Server Route Guard",
          responsibility: "Rejects unauthorized requests with 401/403 before reaching database queries.",
        },
        {
          stage: "03. Data Policy",
          component: "Supabase RLS",
          responsibility: "Enforces row-level read/write rules directly inside PostgreSQL.",
        },
      ],
      codeTitle: "contact_messages.sql (RLS Policy Reference)",
      codeSnippet: `create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;`,
      note: "Reference SQL policy pattern for securing contact submissions and admin reads.",
    },
    {
      id: "ai-orchestration",
      label: "AI Gateway",
      title: "Server-Proxied AI Assistant Pipeline",
      summary:
        "Routing AI queries through a dedicated backend endpoint so API keys remain private and responses stay grounded in verified portfolio data.",
      layers: [
        {
          stage: "01. Context Pack",
          component: "Portfolio JSON",
          responsibility: "Serializes verified projects, skills, and bio as system context.",
        },
        {
          stage: "02. Server Proxy",
          component: "@google/genai SDK",
          responsibility: "Calls Gemini on the server using process.env.GEMINI_API_KEY.",
        },
        {
          stage: "03. Graceful State",
          component: "Config Gate",
          responsibility: "Reports unconfigured state cleanly when API credentials are absent.",
        },
      ],
      codeTitle: "assistant-route.ts (Server Pattern)",
      codeSnippet: `const response = await ai.models.generateContent({
  model: "gemini-4-hydrogen",
  contents: visitorQuestion,
  config: {
    systemInstruction: "Answer strictly from verified portfolio context.",
  },
});`,
      note: "Active pattern powering this site's Floating Assistant route when GEMINI_API_KEY is configured.",
    },
    {
      id: "cloud-delivery",
      label: "Deployment",
      title: "Modular Build & Asset Delivery",
      summary:
        "Deterministic TypeScript compilation, static asset optimization, and clean environment separation between development and production.",
      layers: [
        {
          stage: "01. Type Check",
          component: "tsc --noEmit",
          responsibility: "Catches contract mismatches across data modules and UI components.",
        },
        {
          stage: "02. Bundle",
          component: "Vite Production Build",
          responsibility: "Tree-shakes client modules and hashes image/CSS assets.",
        },
        {
          stage: "03. Runtime",
          component: "Express Static Host",
          responsibility: "Serves /api/* routes alongside the compiled SPA bundle.",
        },
      ],
      codeTitle: "env-separation.txt",
      codeSnippet: `Client Bundle (Browser) -> Public UI + /api/* requests only
Server Process (Node)   -> GEMINI_API_KEY, SUPABASE_SERVICE_ROLE_KEY, ADMIN_ACCESS_TOKEN`,
      note: "Ensures privileged credentials remain isolated on the server.",
    },
  ],

  aiAutomation: [
    {
      id: "ai-1",
      title: "[AI_PROJECT_OR_WORKFLOW_1]",
      category: "Grounded Q&A & Knowledge Retrieval",
      summary:
        "[EDIT_AI_SUMMARY_1 — Describe an AI-assisted feature, retrieval workflow, or evaluation pipeline you built or are customizing here.]",
      workflowSteps: [
        "Ingest structured domain documents",
        "Validate schema & citation boundaries",
        "Stream verified answers to UI",
      ],
      stack: ["TypeScript", "@google/genai", "Structured JSON"],
      repoUrl: "[YOUR_AI_PROJECT_1_REPO]",
    },
    {
      id: "ai-2",
      title: "[AI_PROJECT_OR_WORKFLOW_2]",
      category: "Developer & Operations Automation",
      summary:
        "[EDIT_AI_SUMMARY_2 — Replace with an automation script, webhook processor, or intelligent classification tool from your experience.]",
      workflowSteps: [
        "Trigger via webhook or schedule",
        "Normalize & validate payload",
        "Route actionable summary to database",
      ],
      stack: ["Node.js", "REST Webhooks", "PostgreSQL"],
      repoUrl: "[YOUR_AI_PROJECT_2_REPO]",
    },
  ],

  timeline: [
    {
      id: "exp-1",
      type: "experience",
      organization: "[YOUR_COMPANY_1]",
      title: "[YOUR_POSITION_1]",
      location: "[CITY / REMOTE]",
      duration: "[START_DATE] — [END_DATE]",
      description:
        "[EDIT_ROLE_SUMMARY_1 — Provide an accurate summary of your role, team scope, and engineering focus.]",
      responsibilities: [
        "[EDIT_RESPONSIBILITY_1 — Replace with a verified engineering responsibility]",
        "[EDIT_RESPONSIBILITY_2 — Replace with a verified system or feature you delivered]",
        "[EDIT_RESPONSIBILITY_3 — Replace with a verified collaboration or reliability task]",
      ],
      highlights: ["[TECH_1]", "[TECH_2]", "[TECH_3]"],
    },
    {
      id: "exp-2",
      type: "experience",
      organization: "[YOUR_COMPANY_2]",
      title: "[YOUR_POSITION_2]",
      location: "[CITY / REMOTE]",
      duration: "[START_DATE] — [END_DATE]",
      description:
        "[EDIT_ROLE_SUMMARY_2 — Replace with an earlier role, internship, or freelance engagement, or remove if not applicable.]",
      responsibilities: [
        "[EDIT_RESPONSIBILITY_1]",
        "[EDIT_RESPONSIBILITY_2]",
      ],
      highlights: ["[TECH_1]", "[TECH_2]"],
    },
    {
      id: "edu-1",
      type: "education",
      organization: "[YOUR_INSTITUTION]",
      title: "[YOUR_DEGREE — e.g. B.S. in Computer Science]",
      location: "[CITY, COUNTRY]",
      duration: "[START_YEAR] — [END_YEAR]",
      description:
        "[EDIT_EDUCATION_SUMMARY — Add relevant coursework, thesis focus, or engineering capstone details.]",
      responsibilities: [
        "[COURSEWORK_OR_PROJECT_1]",
        "[COURSEWORK_OR_PROJECT_2]",
      ],
      highlights: ["[FOCUS_AREA_1]", "[FOCUS_AREA_2]"],
    },
  ],

  gallery: [
    {
      id: "gal-1",
      title: "Editorial Design System & Grid Study",
      category: "UI/UX Design",
      year: "[YEAR]",
      image: PORTFOLIO_IMAGES.galleryDesignSpecimen,
      alt: "Swiss editorial typography and modular grid specimen sheets",
      caption:
        "[GALLERY_CAPTION_1 — Replace with your own UI/UX specimen, component sheet, or design study.]",
      tools: ["Figma", "Design Tokens", "Typography"],
    },
    {
      id: "gal-2",
      title: "Analytics Workspace Web Interface",
      category: "Dashboard Concepts",
      year: "[YEAR]",
      image: PORTFOLIO_IMAGES.projectFullstackUi,
      alt: "Minimalist light-mode web analytics dashboard displayed on laptop",
      caption:
        "[GALLERY_CAPTION_2 — Replace with screenshots of your web dashboards or application views.]",
      tools: ["React", "Tailwind CSS", "Data Visualization"],
    },
    {
      id: "gal-3",
      title: "Distributed System Topology Model",
      category: "System Diagrams",
      year: "[YEAR]",
      image: PORTFOLIO_IMAGES.projectArchBlueprint,
      alt: "Isometric distributed cloud architecture physical block model",
      caption:
        "[GALLERY_CAPTION_3 — Replace with your system architecture visuals or infrastructure diagrams.]",
      tools: ["System Architecture", "API Design"],
    },
    {
      id: "gal-4",
      title: "Neural Workflow & Pipeline Visualization",
      category: "Web Interfaces",
      year: "[YEAR]",
      image: PORTFOLIO_IMAGES.projectAiPipeline,
      alt: "Geometric interconnected AI processing nodes on gallery plinth",
      caption:
        "[GALLERY_CAPTION_4 — Replace with screenshots of your creative experiments or interactive tools.]",
      tools: ["AI Workflows", "Interactive UI"],
    },
  ],

  services: [
    {
      id: "svc-1",
      number: "01.",
      title: "[SERVICE_1 — Full-Stack Web Engineering]",
      summary:
        "[EDIT_SERVICE_SUMMARY_1 — Customize or toggle off in portfolioData.ts if you do not offer freelance/consulting services.]",
      deliverables: ["Frontend Architecture", "API & Database Design", "Deployment Pipeline"],
    },
    {
      id: "svc-2",
      number: "02.",
      title: "[SERVICE_2 — UI/UX & Design Systems]",
      summary:
        "[EDIT_SERVICE_SUMMARY_2 — Component libraries, responsive interfaces, and accessibility-first design implementation.]",
      deliverables: ["Reusable Components", "Design Tokens", "Motion Choreography"],
    },
    {
      id: "svc-3",
      number: "03.",
      title: "[SERVICE_3 — API & AI Feature Integration]",
      summary:
        "[EDIT_SERVICE_SUMMARY_3 — Connecting third-party APIs, authentication flows, and server-side AI workflows.]",
      deliverables: ["Server-Side Proxies", "Structured Outputs", "Error & Rate Handling"],
    },
  ],

  copyrightNotice: `© ${new Date().getFullYear()} [YOUR_NAME]. Built with React, TypeScript & Tailwind CSS.`,
};
