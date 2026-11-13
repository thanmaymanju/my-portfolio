import { motion, useReducedMotion } from "motion/react";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  id?: string;
}

export function SectionHeader({ eyebrow, title, subtitle, id }: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-3xl"
    >
      <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-[#7A1212] mb-3">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="font-display text-[28px] sm:text-[32px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#1c1b1b] text-balance"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-[#58413f] max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
