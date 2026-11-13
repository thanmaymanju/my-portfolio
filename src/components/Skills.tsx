import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Code2, Cpu, Database, Layers, Layout, Server, Sparkles, Wrench } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import { SectionHeader } from "./SectionHeader";

const CATEGORY_ICONS: Record<string, typeof Code2> = {
  languages: Code2,
  frontend: Layout,
  backend: Server,
  databases: Database,
  "ai-ml": Sparkles,
  tools: Wrench,
  "ui-ux": Layers,
  other: Cpu,
};

export function Skills() {
  const [selectedId, setSelectedId] = useState<string>("all");
  const shouldReduceMotion = useReducedMotion();

  const categories = portfolioData.skillCategories;
  const visibleCategories =
    selectedId === "all"
      ? categories
      : categories.filter((cat) => cat.id === selectedId);

  return (
    <section id="skills" className="py-16 sm:py-24 bg-[#fcf9f8] border-b border-[#E5E5E5]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Expertise & Stack"
            title="Technical capabilities across the full engineering lifecycle."
            subtitle="Editable in src/data/portfolioData.ts — organized by discipline without arbitrary proficiency percentages."
          />

          {/* Interactive filter controls */}
          <div
            role="tablist"
            aria-label="Filter skill categories"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#f0eded] rounded-lg border border-[#E5E5E5]"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedId === "all"}
              onClick={() => setSelectedId("all")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedId === "all"
                  ? "bg-white text-[#7A1212] border border-[#E5E5E5]"
                  : "text-[#58413f] hover:text-[#1c1b1b]"
              }`}
            >
              All ({categories.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selectedId === cat.id}
                onClick={() => setSelectedId(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedId === cat.id
                    ? "bg-white text-[#7A1212] border border-[#E5E5E5]"
                    : "text-[#58413f] hover:text-[#1c1b1b]"
                }`}
              >
                {cat.title.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {visibleCategories.map((category, idx) => {
            const Icon = CATEGORY_ICONS[category.id] || Code2;
            return (
              <motion.article
                key={category.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(idx * 0.04, 0.2),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col justify-between bg-white border border-[#E5E5E5] hover:border-[#7A1212] rounded-lg p-6 transition-all duration-150 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-9 h-9 rounded-md bg-[#f6f3f2] border border-[#E5E5E5] flex items-center justify-center text-[#7A1212]">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs text-[#58413f] tabular-nums">
                      {category.skills.length} items
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-[#1c1b1b] mb-2">
                    {category.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#58413f] mb-5">
                    {category.description}
                  </p>
                </div>

                <ul className="pt-4 border-t border-[#E5E5E5] space-y-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="font-mono text-xs text-[#1c1b1b] flex items-center justify-between"
                    >
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
