import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Workflow } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import { isValidExternalOrLocalUrl } from "../utils/links";
import { SectionHeader } from "./SectionHeader";

interface AiAutomationProps {
  onPlaceholderAction: (label: string, fieldHint: string) => void;
}

export function AiAutomation({ onPlaceholderAction }: AiAutomationProps) {
  if (!portfolioData.sections.showAiAutomation) return null;

  const items = portfolioData.aiAutomation;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="ai-automation" className="py-16 sm:py-24 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
        <SectionHeader
          eyebrow="AI & Automation"
          title="Intelligent workflows and grounded AI engineering."
          subtitle="Toggleable section in src/data/portfolioData.ts — replace these entries with your verified AI integrations and automation builds."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((item, idx) => {
            const hasRepo = isValidExternalOrLocalUrl(item.repoUrl);
            return (
              <motion.article
                key={item.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.3,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col justify-between bg-[#fcf9f8] border border-[#E5E5E5] hover:border-[#7A1212] rounded-xl p-6 sm:p-8 transition-all duration-150"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold text-[#7A1212]">
                      {item.category}
                    </span>
                    <Workflow className="w-4 h-4 text-[#58413f]" aria-hidden="true" />
                  </div>

                  <h3 className="font-display text-2xl font-semibold text-[#1c1b1b]">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-[#58413f]">
                    {item.summary}
                  </p>

                  <div className="pt-4 border-t border-[#E5E5E5] space-y-2.5">
                    <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-[#58413f]">
                      Pipeline Stages
                    </p>
                    <ol className="space-y-2 text-sm text-[#1c1b1b]">
                      {item.workflowSteps.map((step, stepIdx) => (
                        <li key={step} className="flex items-baseline gap-2.5">
                          <span className="font-mono text-xs text-[#7A1212] tabular-nums">
                            0{stepIdx + 1}.
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E5E5E5] flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-xs text-[#58413f]">
                    {item.stack.join(" · ")}
                  </p>

                  {hasRepo ? (
                    <a
                      href={item.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#7A1212] hover:text-[#4D0808] whitespace-nowrap"
                    >
                      <span>View Source</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        onPlaceholderAction(
                          `${item.title} Repository`,
                          `Update aiAutomation entry "${item.id}" in src/data/portfolioData.ts.`
                        )
                      }
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#7A1212] hover:text-[#4D0808] whitespace-nowrap cursor-pointer"
                    >
                      <span>View Source</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
