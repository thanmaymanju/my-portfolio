import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, FileText, Github, Linkedin } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import { isValidExternalOrLocalUrl } from "../utils/links";
import { ResilientImage } from "./ResilientImage";

interface HeroProps {
  onPlaceholderAction: (label: string, fieldHint: string) => void;
}

export function Hero({ onPlaceholderAction }: HeroProps) {
  const { profile, about } = portfolioData;
  const [roleIndex, setRoleIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || profile.animatedRoles.length <= 1) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % profile.animatedRoles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [profile.animatedRoles.length, shouldReduceMotion]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };

  const hasGithub = isValidExternalOrLocalUrl(profile.githubUrl);
  const hasLinkedin = isValidExternalOrLocalUrl(profile.linkedinUrl);
  const hasResume = isValidExternalOrLocalUrl(profile.resumeUrl);

  return (
    <section
      id="home"
      className="border-b border-[#E5E5E5] bg-[#fcf9f8]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        {/* 12-column editorial split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left 7 columns: Typographic hierarchy */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between space-y-8"
          >
            <div className="space-y-6">
              {/* Unboxed editorial metadata line (no pills, no pulsing dots) */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-display font-bold uppercase tracking-[0.12em] text-[#58413f]">
                <span className="text-[#7A1212]">{profile.name}</span>
                <span aria-hidden="true">·</span>
                <span>{profile.location}</span>
                {profile.availability.enabled && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#1c1b1b]">{profile.availability.label}</span>
                  </>
                )}
              </div>

              {/* Animated role line */}
              <div className="min-h-[28px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={profile.animatedRoles[roleIndex]}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-lg sm:text-xl font-medium text-[#7A1212]"
                  >
                    {profile.animatedRoles[roleIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Display hero headline */}
              <h1 className="font-display text-[36px] sm:text-[48px] lg:text-[56px] font-bold leading-[1.12] tracking-[-0.02em] text-[#1c1b1b] text-balance">
                {profile.headline}
              </h1>

              {/* Short introduction */}
              <p className="text-base sm:text-lg leading-[1.65] text-[#58413f] max-w-2xl">
                {profile.shortIntro}
              </p>
            </div>

            {/* CTAs and social links */}
            <div className="space-y-6 pt-2">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection("projects")}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 text-sm font-semibold text-white bg-[#7A1212] hover:bg-[#4D0808] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>View My Work</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 text-sm font-semibold text-[#1c1b1b] bg-transparent border border-[#E5E5E5] hover:border-[#7A1212] hover:text-[#7A1212] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Contact Me</span>
                </button>
              </div>

              {/* Social & Resume utility row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 border-t border-[#E5E5E5] text-sm font-medium text-[#58413f]">
                {hasGithub ? (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-[#7A1212] transition-colors whitespace-nowrap"
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      onPlaceholderAction(
                        "GitHub Profile",
                        "Replace profile.githubUrl in src/data/portfolioData.ts with your GitHub profile URL."
                      )
                    }
                    className="inline-flex items-center gap-2 hover:text-[#7A1212] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}

                {hasLinkedin ? (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-[#7A1212] transition-colors whitespace-nowrap"
                  >
                    <Linkedin className="w-4 h-4" aria-hidden="true" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      onPlaceholderAction(
                        "LinkedIn Profile",
                        "Replace profile.linkedinUrl in src/data/portfolioData.ts with your LinkedIn profile URL."
                      )
                    }
                    className="inline-flex items-center gap-2 hover:text-[#7A1212] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <Linkedin className="w-4 h-4" aria-hidden="true" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}

                {hasResume ? (
                  <a
                    href={profile.resumeUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#7A1212] hover:text-[#4D0808] transition-colors whitespace-nowrap"
                  >
                    <FileText className="w-4 h-4" aria-hidden="true" />
                    <span>Download Resume</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      onPlaceholderAction(
                        "Resume / CV",
                        "Place your PDF inside public/resume.pdf and set profile.resumeUrl = '/resume.pdf' in src/data/portfolioData.ts."
                      )
                    }
                    className="inline-flex items-center gap-2 hover:text-[#7A1212] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <FileText className="w-4 h-4" aria-hidden="true" />
                    <span>Resume</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right 5 columns: Editorial profile portrait frame */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="relative flex-1 min-h-[340px] lg:min-h-[440px] rounded-2xl overflow-hidden border border-[#E5E5E5] bg-white">
              <ResilientImage
                src={profile.profileImage}
                alt={profile.profileImageAlt}
                loading="eager"
                fallbackTitle={profile.name}
                className="w-full h-full object-cover object-[50%_80%]"
              />
              {profile.profileImageIsPlaceholder && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent p-5 text-white">
                  <p className="font-mono text-xs text-white/90">
                    [YOUR_PROFILE_IMAGE] — Swap in src/data/portfolioData.ts
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Full-width overview strip below the split */}
        <div className="mt-12 pt-8 border-t border-[#E5E5E5] grid grid-cols-2 lg:grid-cols-4 gap-6">
          {about.highlights.map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-[#58413f]">
                {item.label}
              </p>
              <p className="font-display text-xl sm:text-2xl font-semibold text-[#1c1b1b] tabular-nums">
                {item.value}
              </p>
              <p className="text-xs text-[#58413f]">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
