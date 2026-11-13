import { ArrowUp, ArrowUpRight, Github, Linkedin, Shield } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { portfolioData } from "../data/portfolioData";
import { isValidExternalOrLocalUrl } from "../utils/links";

interface FooterProps {
  onOpenAdmin: () => void;
  onPlaceholderAction: (label: string, fieldHint: string) => void;
}

const FOOTER_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Expertise" },
  { id: "projects", label: "Projects" },
  { id: "architecture", label: "Architecture" },
  { id: "experience", label: "Experience" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

export function Footer({ onOpenAdmin, onPlaceholderAction }: FooterProps) {
  const { profile, copyrightNotice } = portfolioData;
  const shouldReduceMotion = useReducedMotion();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="bg-[#fcf9f8] py-12 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#E5E5E5]">
          <div className="md:col-span-5 space-y-3">
            <p className="font-display text-xl font-bold text-[#1c1b1b]">
              {profile.name}
            </p>
            <p className="text-sm text-[#58413f] leading-relaxed max-w-sm">
              {profile.shortIntro}
            </p>
          </div>

          <div className="md:col-span-4 space-y-3">
            <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-[#58413f]">
              Navigation
            </p>
            <nav
              aria-label="Footer navigation"
              className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm"
            >
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.id);
                  }}
                  className="text-[#1c1b1b] hover:text-[#7A1212] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="md:col-span-3 space-y-3">
            <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-[#58413f]">
              Profiles &amp; Tools
            </p>
            <div className="flex flex-col items-start gap-2.5 text-sm">
              {isValidExternalOrLocalUrl(profile.githubUrl) ? (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#1c1b1b] hover:text-[#7A1212]"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    onPlaceholderAction(
                      "GitHub URL",
                      "Set profile.githubUrl in src/data/portfolioData.ts."
                    )
                  }
                  className="inline-flex items-center gap-2 text-[#58413f] hover:text-[#7A1212] cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </button>
              )}

              {isValidExternalOrLocalUrl(profile.linkedinUrl) ? (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#1c1b1b] hover:text-[#7A1212]"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    onPlaceholderAction(
                      "LinkedIn URL",
                      "Set profile.linkedinUrl in src/data/portfolioData.ts."
                    )
                  }
                  className="inline-flex items-center gap-2 text-[#58413f] hover:text-[#7A1212] cursor-pointer"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </button>
              )}

              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-2 text-[#58413f] hover:text-[#7A1212] cursor-pointer"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Scaffold</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#58413f]">
          <p>{copyrightNotice}</p>

          <button
            type="button"
            onClick={scrollTop}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#E5E5E5] bg-white text-[#1c1b1b] font-semibold hover:border-[#7A1212] hover:text-[#7A1212] transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
