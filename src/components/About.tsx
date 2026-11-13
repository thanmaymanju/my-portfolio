import { motion, useReducedMotion } from "motion/react";
import { portfolioData } from "../data/portfolioData";
import { SectionHeader } from "./SectionHeader";

export function About() {
  const { about, profile } = portfolioData;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left 4 columns: Sticky editorial index */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start space-y-6">
            <SectionHeader eyebrow={about.eyebrow} title={about.title} />

            <div className="pt-4 border-t border-[#E5E5E5] space-y-2">
              <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-[#58413f]">
                Education Snapshot
              </p>
              <p className="text-sm font-medium text-[#1c1b1b]">
                {about.educationSummary}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5E5E5] space-y-2">
              <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-[#58413f]">
                Direct Contact
              </p>
              <p className="font-mono text-sm text-[#7A1212] break-all">
                {profile.email}
              </p>
            </div>
          </div>

          {/* Right 8 columns: Editorial narrative & structured focus */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 space-y-10"
          >
            <div className="space-y-5 text-base sm:text-[17px] leading-[1.7] text-[#1c1b1b]">
              <p>{about.introParagraph}</p>
              <p className="text-[#58413f]">{about.backgroundParagraph}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-[#E5E5E5]">
              <div className="space-y-4">
                <h3 className="font-display text-lg font-semibold text-[#1c1b1b]">
                  Technical Focus
                </h3>
                <ul className="space-y-2.5 text-sm text-[#58413f]">
                  {about.technicalFocus.map((item) => (
                    <li
                      key={item}
                      className="pb-2.5 border-b border-[#E5E5E5] last:border-b-0 last:pb-0 text-[#1c1b1b]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-lg font-semibold text-[#1c1b1b]">
                  Interests & Exploration
                </h3>
                <ul className="space-y-2.5 text-sm text-[#58413f]">
                  {about.interests.map((item) => (
                    <li
                      key={item}
                      className="pb-2.5 border-b border-[#E5E5E5] last:border-b-0 last:pb-0 text-[#1c1b1b]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
