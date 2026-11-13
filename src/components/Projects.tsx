import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ExternalLink, FolderOpen, Github } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import type { ProjectCategory, ProjectItem } from "../types/portfolio";
import { isValidExternalOrLocalUrl } from "../utils/links";
import { ResilientImage } from "./ResilientImage";
import { SectionHeader } from "./SectionHeader";
import { ProjectModal } from "./ProjectModal";

interface ProjectsProps {
  onPlaceholderAction: (label: string, fieldHint: string) => void;
}

const PROJECT_CATEGORIES: ProjectCategory[] = [
  "All Projects",
  "Full-Stack Development",
  "Web Applications",
  "AI / Machine Learning",
  "Frontend Development",
  "Backend / API",
  "UI/UX Design",
];

export function Projects({ onPlaceholderAction }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All Projects");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All Projects") return portfolioData.projects;
    return portfolioData.projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" className="py-16 sm:py-24 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
        <div className="space-y-6">
          <SectionHeader
            eyebrow="Featured Work"
            title="Selected engineering case studies and builds."
            subtitle="Filter by engineering discipline and inspect architecture notes, stack choices, and repository links."
          />

          {/* Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-2"
          >
            {PROJECT_CATEGORIES.map((category) => {
              const count =
                category === "All Projects"
                  ? portfolioData.projects.length
                  : portfolioData.projects.filter((p) => p.category === category).length;
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(category)}
                  className={`min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? "bg-[#7A1212] text-white border-[#7A1212]"
                      : "bg-[#fcf9f8] text-[#58413f] border-[#E5E5E5] hover:border-[#7A1212] hover:text-[#7A1212]"
                  }`}
                >
                  {category} <span className="tabular-nums opacity-75">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State if a category has no entries yet */}
        {filteredProjects.length === 0 ? (
          <div className="border border-[#E5E5E5] bg-[#fcf9f8] rounded-xl p-10 text-center space-y-3">
            <FolderOpen className="w-7 h-7 text-[#7A1212] mx-auto" aria-hidden="true" />
            <h3 className="font-display text-lg font-semibold text-[#1c1b1b]">
              No projects listed under {activeCategory} yet
            </h3>
            <p className="text-sm text-[#58413f] max-w-md mx-auto">
              Add a project with category &ldquo;{activeCategory}&rdquo; in{" "}
              <code className="font-mono text-xs text-[#7A1212]">src/data/portfolioData.ts</code>{" "}
              to showcase work in this category.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory("All Projects")}
              className="mt-2 inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-lg border border-[#E5E5E5] bg-white text-[#1c1b1b] hover:border-[#7A1212] hover:text-[#7A1212] cursor-pointer"
            >
              Show All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredProjects.map((project, idx) => {
              const hasGithub = isValidExternalOrLocalUrl(project.githubUrl);
              const hasLive = isValidExternalOrLocalUrl(project.liveUrl);

              return (
                <motion.article
                  key={project.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(idx * 0.06, 0.24),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex flex-col bg-white border border-[#E5E5E5] hover:border-[#7A1212] rounded-xl overflow-hidden transition-all duration-150 hover:-translate-y-0.5"
                >
                  {/* Top visual showcase */}
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    aria-label={`Open details for ${project.title}`}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-[#f6f3f2] border-b border-[#E5E5E5] text-left cursor-pointer"
                  >
                    <ResilientImage
                      src={project.thumbnail}
                      alt={project.thumbnailAlt}
                      fallbackTitle={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </button>

                  {/* Bottom structured content */}
                  <div className="flex-1 flex flex-col justify-between p-6 sm:p-7 space-y-6">
                    <div className="space-y-3">
                      {/* Clean unboxed metadata (no pill sandwich) */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#58413f]">
                        <span className="text-[#7A1212] font-semibold">{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{project.year}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.subtitle}</span>
                      </div>

                      <h3 className="font-display text-2xl font-semibold text-[#1c1b1b] group-hover:text-[#7A1212] transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-[#58413f]">
                        {project.shortDescription}
                      </p>
                    </div>

                    <div className="space-y-5">
                      {/* Monospace stack list separated cleanly */}
                      <p className="font-mono text-xs text-[#1c1b1b] leading-relaxed pt-4 border-t border-[#E5E5E5]">
                        {project.technologies.join(" · ")}
                      </p>

                      {/* Action Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-3">
                          {hasGithub ? (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#E5E5E5] text-[#1c1b1b] hover:border-[#7A1212] hover:text-[#7A1212] transition-colors whitespace-nowrap"
                            >
                              <Github className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Repository</span>
                            </a>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                onPlaceholderAction(
                                  `${project.title} GitHub URL`,
                                  `Replace githubUrl on project "${project.id}" in src/data/portfolioData.ts.`
                                )
                              }
                              className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#E5E5E5] text-[#58413f] hover:border-[#7A1212] hover:text-[#7A1212] transition-colors whitespace-nowrap cursor-pointer"
                            >
                              <Github className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Repository</span>
                            </button>
                          )}

                          {hasLive ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#E5E5E5] text-[#1c1b1b] hover:border-[#7A1212] hover:text-[#7A1212] transition-colors whitespace-nowrap"
                            >
                              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Live Demo</span>
                            </a>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                onPlaceholderAction(
                                  `${project.title} Live Demo URL`,
                                  `Replace liveUrl on project "${project.id}" in src/data/portfolioData.ts.`
                                )
                              }
                              className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#E5E5E5] text-[#58413f] hover:border-[#7A1212] hover:text-[#7A1212] transition-colors whitespace-nowrap cursor-pointer"
                            >
                              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Live Demo</span>
                            </button>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-1.5 min-h-[38px] px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#7A1212] hover:bg-[#4D0808] text-white transition-colors whitespace-nowrap cursor-pointer"
                        >
                          <span>View Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPlaceholderAction={onPlaceholderAction}
      />
    </section>
  );
}
