import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import { SectionHeader } from "./SectionHeader";

export function ExperienceTimeline() {
  const [filter, setFilter] = useState<"all" | "experience" | "education">("all");
  const shouldReduceMotion = useReducedMotion();

  const entries =
    filter === "all"
      ? portfolioData.timeline
      : portfolioData.timeline.filter((e) => e.type === filter);

  return (
    <section
      id="experience"
      className="py-16 sm:py-24 bg-[#fcf9f8] border-b border-[#E5E5E5]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left 4 columns */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start space-y-6">
            <SectionHeader
              eyebrow="Background"
              title="Experience & Education"
              subtitle="Verified career roles and academic milestones configured in src/data/portfolioData.ts."
            />

            <div
              role="tablist"
              aria-label="Filter timeline entries"
              className="inline-flex items-center gap-1 p-1 bg-[#f0eded] border border-[#E5E5E5] rounded-lg"
            >
              {(["all", "experience", "education"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={filter === tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3.5 py-1.5 text-xs font-semibold capitalize rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    filter === tab
                      ? "bg-white text-[#7A1212] border border-[#E5E5E5]"
                      : "text-[#58413f] hover:text-[#1c1b1b]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Right 8 columns: Vertical timeline */}
          <div className="lg:col-span-8">
            <div className="relative pl-6 sm:pl-8 border-l border-[#E5E5E5] space-y-10">
              {entries.map((entry, idx) => {
                const Icon = entry.type === "experience" ? Briefcase : GraduationCap;
                return (
                  <motion.article
                    key={entry.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.3,
                      delay: idx * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative bg-white border border-[#E5E5E5] rounded-xl p-6 sm:p-7 space-y-4"
                  >
                    {/* 0.5rem solid burgundy node on vertical rule */}
                    <span
                      aria-hidden="true"
                      className="absolute -left-[29px] sm:-left-[37px] top-7 w-2 h-2 rounded-full bg-[#7A1212] ring-4 ring-[#fcf9f8]"
                    />

                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-medium text-[#58413f]">
                          <Icon className="w-3.5 h-3.5 text-[#7A1212]" aria-hidden="true" />
                          <span className="uppercase tracking-[0.08em] font-semibold text-[#7A1212]">
                            {entry.type}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{entry.organization}</span>
                          <span aria-hidden="true">·</span>
                          <span>{entry.location}</span>
                        </div>
                        <h3 className="font-display text-xl font-semibold text-[#1c1b1b]">
                          {entry.title}
                        </h3>
                      </div>

                      <span className="font-mono text-xs text-[#58413f] tabular-nums whitespace-nowrap">
                        {entry.duration}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-[#58413f]">
                      {entry.description}
                    </p>

                    {entry.responsibilities.length > 0 && (
                      <ul className="space-y-2 pt-3 border-t border-[#E5E5E5] text-sm text-[#1c1b1b]">
                        {entry.responsibilities.map((resp) => (
                          <li key={resp} className="leading-relaxed flex items-baseline gap-2.5">
                            <span className="text-[#7A1212] font-mono text-xs">—</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {entry.highlights.length > 0 && (
                      <p className="font-mono text-xs text-[#58413f] pt-2">
                        {entry.highlights.join(" · ")}
                      </p>
                    )}
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
