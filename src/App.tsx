import { useEffect, useState } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { TechnicalArchitecture } from "./components/TechnicalArchitecture";
import { AiAutomation } from "./components/AiAutomation";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { Gallery } from "./components/Gallery";
import { Services } from "./components/Services";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FloatingAssistant } from "./components/FloatingAssistant";
import { AdminScaffoldModal } from "./components/AdminScaffoldModal";
import { PlaceholderNoticeModal } from "./components/PlaceholderNoticeModal";

interface IntegrationStatus {
  geminiConfigured: boolean;
  supabaseConfigured: boolean;
  adminConfigured: boolean;
}

const OBSERVED_SECTION_IDS = [
  "home",
  "about",
  "skills",
  "projects",
  "architecture",
  "ai-automation",
  "experience",
  "gallery",
  "services",
  "contact",
];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [configStatus, setConfigStatus] = useState<IntegrationStatus | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [placeholderNotice, setPlaceholderNotice] = useState<{
    label: string;
    fieldHint: string;
  } | null>(null);
  const [prefilledSubject, setPrefilledSubject] = useState("");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let active = true;
    fetch("/api/config-status")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: IntegrationStatus | null) => {
        if (active && data) setConfigStatus(data);
      })
      .catch(() => {
        if (active) {
          setConfigStatus({
            geminiConfigured: false,
            supabaseConfigured: false,
            adminConfigured: false,
          });
        }
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    OBSERVED_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handlePlaceholderAction = (label: string, fieldHint: string) => {
    setPlaceholderNotice({ label, fieldHint });
  };

  const handleSelectService = (serviceTitle: string) => {
    setPrefilledSubject(`Inquiry: ${serviceTitle}`);
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#fcf9f8] text-[#1c1b1b]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#7A1212] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>

        <Navbar
          activeSection={activeSection}
          onPlaceholderAction={handlePlaceholderAction}
        />

        <main id="main-content" className="flex-1">
          <Hero onPlaceholderAction={handlePlaceholderAction} />
          <About />
          <Skills />
          <Projects onPlaceholderAction={handlePlaceholderAction} />
          <TechnicalArchitecture />
          <AiAutomation onPlaceholderAction={handlePlaceholderAction} />
          <ExperienceTimeline />
          <Gallery />
          <Services onSelectService={handleSelectService} />
          <Contact
            supabaseConfigured={configStatus?.supabaseConfigured ?? null}
            prefilledSubject={prefilledSubject}
            onPlaceholderAction={handlePlaceholderAction}
          />
        </main>

        <Footer
          onOpenAdmin={() => setAdminOpen(true)}
          onPlaceholderAction={handlePlaceholderAction}
        />

        <FloatingAssistant
          geminiConfigured={configStatus?.geminiConfigured ?? null}
        />

        <AdminScaffoldModal
          open={adminOpen}
          onClose={() => setAdminOpen(false)}
          configStatus={configStatus}
        />

        <PlaceholderNoticeModal
          notice={placeholderNotice}
          onClose={() => setPlaceholderNotice(null)}
        />
      </div>
    </MotionConfig>
  );
}
