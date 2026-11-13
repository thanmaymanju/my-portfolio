import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Copy } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import { SectionHeader } from "./SectionHeader";

export function TechnicalArchitecture() {
  if (!portfolioData.sections.showArchitecture) return null;

  const patterns = portfolioData.architecturePatterns;
  const [activeId, setActiveId] = useState(patterns[0]?.id ?? "");
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const current = patterns.find((p) => p.id === activeId) ?? patterns[0];
  if (!current) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(current.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="architecture"
      className="py-16 sm:py-24 bg-[#fcf9f8] border-b border-[#E5E5E5]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeader
            eyebrow="System Architecture"
            title="Technical problem-solving and engineering patterns."
            subtitle="Illustrative architectural blueprints showing how I structure client-server boundaries, authentication, data models, and AI gateways."
          />

          <div
            role="tablist"
            aria-label="Architecture patterns"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#f0eded] border border-[#E5E5E5] rounded-lg"
          >
            {patterns.map((pattern) => {
              const active = pattern.id === current.id;
              return (
                <button
                  key={pattern.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveId(pattern.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? "bg-white text-[#7A1212] border border-[#E5E5E5]"
                      : "text-[#58413f] hover:text-[#1c1b1b]"
                  }`}
                >
                  {pattern.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Architecture Showcase */}
        <motion.div
          key={current.id}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left 7 columns: Structured flow diagram */}
          <div className="lg:col-span-7 bg-white border border-[#E5E5E5] rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-3">
              <h3 className="font-display text-2xl font-semibold text-[#1c1b1b]">
                {current.title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#58413f]">
                {current.summary}
              </p>
            </div>

            <div className="space-y-4">
              {current.layers.map((layer, index) => (
                <div
                  key={layer.stage}
                  className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border border-[#E5E5E5] bg-[#fcf9f8]"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <span className="font-mono text-[#7A1212]">{layer.stage}</span>
                      <span aria-hidden="true" className="text-[#8b716e]">
                        ·
                      </span>
                      <span className="text-[#1c1b1b]">{layer.component}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#58413f]">
                      {layer.responsibility}
                    </p>
                  </div>
                  {index < current.layers.length - 1 && (
                    <ArrowRight
                      className="hidden sm:block w-4 h-4 text-[#8b716e] shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>

            <p className="text-xs text-[#58413f] pt-4 border-t border-[#E5E5E5]">
              {current.note}
            </p>
          </div>

          {/* Right 5 columns: Stitch dark #171717 Architecture Terminal Block */}
          <div className="lg:col-span-5 relative rounded-xl bg-[#171717] text-[#f3f0ef] border border-[#262727] p-6 sm:p-7 flex flex-col justify-between overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#4D0808]/35 blur-3xl"
            />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#3c3d3d]">
                <span className="font-mono text-xs text-[#c7c6c6] truncate">
                  {current.codeTitle}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#3c3d3d] text-xs font-medium text-[#e3e2e2] hover:border-[#ff8378] hover:text-white transition-colors shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#ff8378]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="font-mono text-[13px] leading-[20px] text-[#e3e2e2] overflow-x-auto whitespace-pre">
                <code>{current.codeSnippet}</code>
              </pre>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-[#3c3d3d] flex items-center justify-between text-xs text-[#a8a7a7]">
              <span>Pattern Reference</span>
              <span className="font-mono text-[#ff8378]">{current.label}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
