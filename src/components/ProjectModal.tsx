import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ExternalLink, Github, X } from "lucide-react";
import type { ProjectItem } from "../types/portfolio";
import { isValidExternalOrLocalUrl } from "../utils/links";
import { ResilientImage } from "./ResilientImage";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onPlaceholderAction: (label: string, fieldHint: string) => void;
}

export function ProjectModal({
  project,
  onClose,
  onPlaceholderAction,
}: ProjectModalProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-[2px]"
          onClick={onClose}
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-[#E5E5E5] rounded-2xl ambient-shadow"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5]">
              <div className="flex items-center gap-2 text-xs font-medium text-[#58413f]">
                <span className="font-bold text-[#7A1212] uppercase tracking-[0.08em]">
                  {project.category}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{project.year}</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#E5E5E5] text-[#1c1b1b] hover:border-[#7A1212] hover:text-[#7A1212] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Preview Image */}
            <div className="aspect-[16/9] w-full bg-[#f6f3f2] border-b border-[#E5E5E5]">
              <ResilientImage
                src={project.thumbnail}
                alt={project.thumbnailAlt}
                fallbackTitle={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <p className="text-xs font-semibold text-[#58413f] mb-1">
                  {project.subtitle}
                </p>
                <h3
                  id="project-modal-title"
                  className="font-display text-2xl sm:text-3xl font-semibold text-[#1c1b1b]"
                >
                  {project.title}
                </h3>
              </div>

              <p className="text-base leading-relaxed text-[#1c1b1b]">
                {project.fullDescription}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-[#E5E5E5]">
                <div className="space-y-3">
                  <h4 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-[#7A1212]">
                    Architecture Notes
                  </h4>
                  <ul className="space-y-2 text-sm text-[#58413f]">
                    {project.architectureNotes.map((note) => (
                      <li key={note} className="leading-relaxed">
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-[#7A1212]">
                    Key Deliverables
                  </h4>
                  <ul className="space-y-2 text-sm text-[#58413f]">
                    {project.deliverables.map((deliv) => (
                      <li key={deliv} className="leading-relaxed">
                        {deliv}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 border-t border-[#E5E5E5]">
                <h4 className="font-display text-xs font-bold uppercase tracking-[0.12em] text-[#58413f] mb-2">
                  Technologies Used
                </h4>
                <p className="font-mono text-sm text-[#1c1b1b]">
                  {project.technologies.join(" · ")}
                </p>
              </div>

              <div className="pt-5 border-t border-[#E5E5E5] flex flex-wrap items-center gap-3">
                {isValidExternalOrLocalUrl(project.githubUrl) ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-[42px] px-5 py-2 text-sm font-semibold rounded-lg border border-[#E5E5E5] text-[#1c1b1b] hover:border-[#7A1212] hover:text-[#7A1212] transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      onPlaceholderAction(
                        `${project.title} GitHub URL`,
                        `Set githubUrl for "${project.id}" in src/data/portfolioData.ts.`
                      )
                    }
                    className="inline-flex items-center gap-2 min-h-[42px] px-5 py-2 text-sm font-semibold rounded-lg border border-[#E5E5E5] text-[#58413f] hover:border-[#7A1212] hover:text-[#7A1212] transition-colors cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>Configure Repository Link</span>
                  </button>
                )}

                {isValidExternalOrLocalUrl(project.liveUrl) ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-[42px] px-5 py-2 text-sm font-semibold rounded-lg bg-[#7A1212] hover:bg-[#4D0808] text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Live Demo</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      onPlaceholderAction(
                        `${project.title} Live Demo`,
                        `Set liveUrl for "${project.id}" in src/data/portfolioData.ts.`
                      )
                    }
                    className="inline-flex items-center gap-2 min-h-[42px] px-5 py-2 text-sm font-semibold rounded-lg bg-[#7A1212] hover:bg-[#4D0808] text-white transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Configure Demo Link</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
