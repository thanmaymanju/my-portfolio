import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, FileText } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { portfolioData } from "../data/portfolioData";
import { isValidExternalOrLocalUrl } from "../utils/links";

interface NavbarProps {
  activeSection: string;
  onPlaceholderAction: (label: string, fieldHint: string) => void;
}

const DESKTOP_NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Expertise" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "gallery", label: "Gallery" },
];

const MOBILE_NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Expertise & Skills" },
  { id: "projects", label: "Projects" },
  { id: "architecture", label: "Architecture" },
  { id: "experience", label: "Experience & Education" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

export function Navbar({ activeSection, onPlaceholderAction }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };

  const hasResume = isValidExternalOrLocalUrl(portfolioData.profile.resumeUrl);
  const hasGithub = isValidExternalOrLocalUrl(portfolioData.profile.githubUrl);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-150 border-b ${
        scrolled
          ? "bg-[#fcf9f8]/95 backdrop-blur-sm border-[#E5E5E5]"
          : "bg-[#fcf9f8] border-[#E5E5E5]"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
          className="font-display text-lg font-bold tracking-tight text-[#1c1b1b] hover:text-[#7A1212] transition-colors whitespace-nowrap shrink-0"
        >
          {portfolioData.profile.brandWordmark}
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {DESKTOP_NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive
                    ? "text-[#7A1212] font-semibold"
                    : "text-[#58413f] hover:text-[#1c1b1b]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[21px] h-[2px] bg-[#7A1212]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action on desktop + mobile drawer toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("contact");
            }}
            className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white bg-[#7A1212] hover:bg-[#4D0808] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Contact Me
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#E5E5E5] bg-white text-[#1c1b1b] hover:border-[#7A1212] hover:text-[#7A1212] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-[#E5E5E5] bg-white px-5 py-5 space-y-4"
          >
            <nav aria-label="Mobile navigation" className="grid grid-cols-1 gap-1">
              {MOBILE_NAV_LINKS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className={`flex items-center justify-between min-h-[44px] px-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#f6f3f2] text-[#7A1212] font-semibold"
                        : "text-[#1c1b1b] hover:bg-[#f6f3f2]"
                    }`}
                  >
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-[#E5E5E5] flex flex-col gap-2.5">
              {hasGithub ? (
                <a
                  href={portfolioData.profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between min-h-[44px] px-4 rounded-lg border border-[#E5E5E5] text-sm font-medium text-[#1c1b1b] hover:border-[#7A1212] hover:text-[#7A1212]"
                >
                  <span>GitHub Profile</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onPlaceholderAction(
                      "GitHub Profile Link",
                      "Set profile.githubUrl in src/data/portfolioData.ts to your GitHub URL."
                    );
                  }}
                  className="inline-flex items-center justify-between min-h-[44px] px-4 rounded-lg border border-[#E5E5E5] text-sm font-medium text-[#1c1b1b] hover:border-[#7A1212] hover:text-[#7A1212]"
                >
                  <span>GitHub Profile</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}

              {hasResume ? (
                <a
                  href={portfolioData.profile.resumeUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between min-h-[44px] px-4 rounded-lg bg-[#7A1212] text-white text-sm font-semibold hover:bg-[#4D0808]"
                >
                  <span>Download Resume</span>
                  <FileText className="w-4 h-4" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onPlaceholderAction(
                      "Resume Download",
                      "Add your PDF to public/resume.pdf and set profile.resumeUrl = '/resume.pdf' in src/data/portfolioData.ts."
                    );
                  }}
                  className="inline-flex items-center justify-between min-h-[44px] px-4 rounded-lg bg-[#7A1212] text-white text-sm font-semibold hover:bg-[#4D0808]"
                >
                  <span>Resume Setup</span>
                  <FileText className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
