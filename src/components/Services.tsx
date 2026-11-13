import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import { SectionHeader } from "./SectionHeader";

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export function Services({ onSelectService }: ServicesProps) {
  if (!portfolioData.sections.showServices) return null;

  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="py-16 sm:py-24 bg-[#fcf9f8] border-b border-[#E5E5E5]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
        <SectionHeader
          eyebrow="Capabilities & Services"
          title="How I collaborate on engineering engagements."
          subtitle="Toggle this section on or off via sections.showServices in src/data/portfolioData.ts depending on your availability."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData.services.map((service, idx) => (
            <motion.article
              key={service.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.3,
                delay: idx * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col justify-between bg-white border border-[#E5E5E5] hover:border-[#7A1212] rounded-xl p-6 sm:p-7 transition-colors duration-150 space-y-6"
            >
              <div className="space-y-4">
                <p className="font-mono text-sm font-semibold text-[#7A1212] tabular-nums">
                  {service.number}
                </p>
                <h3 className="font-display text-xl font-semibold text-[#1c1b1b]">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#58413f]">
                  {service.summary}
                </p>

                <ul className="pt-4 border-t border-[#E5E5E5] space-y-2 text-xs font-mono text-[#1c1b1b]">
                  {service.deliverables.map((deliv) => (
                    <li key={deliv}>{deliv}</li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onSelectService(service.title)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#7A1212] hover:text-[#4D0808] pt-2 cursor-pointer self-start"
              >
                <span>Inquire about this scope</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
