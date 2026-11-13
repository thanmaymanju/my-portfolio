import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AlertCircle, MessageSquare, Minimize2, Send, X } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

interface FloatingAssistantProps {
  geminiConfigured: boolean | null;
}

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
}

export function FloatingAssistant({ geminiConfigured }: FloatingAssistantProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Welcome. Ask me about ${portfolioData.profile.name}'s listed skills, projects, architecture patterns, or background.`,
    },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setErrorMsg(null);

    if (geminiConfigured === false) {
      setErrorMsg(
        "AI integration is pending: configure GEMINI_API_KEY in your server environment / Secrets panel to enable live answers."
      );
      return;
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: nextHistory.map((m) => ({ role: m.role, content: m.content })),
          portfolioContext: {
            profile: portfolioData.profile,
            about: portfolioData.about,
            skillCategories: portfolioData.skillCategories,
            projects: portfolioData.projects.map((p) => ({
              title: p.title,
              category: p.category,
              shortDescription: p.shortDescription,
              technologies: p.technologies,
              architectureNotes: p.architectureNotes,
            })),
            timeline: portfolioData.timeline,
          },
        }),
      });

      const data = (await res.json()) as {
        configured?: boolean;
        reply?: string;
        message?: string;
        error?: string;
      };

      if (!res.ok || !data.reply) {
        setErrorMsg(
          data.message ||
            data.error ||
            "The AI assistant could not process this request."
        );
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.reply!,
        },
      ]);
    } catch {
      setErrorMsg("Unable to reach /api/assistant. Please check server status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <AnimatePresence>
        {open && (
          <motion.section
            aria-label="Portfolio Assistant"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[calc(100vw-2.5rem)] sm:w-[380px] bg-white border border-[#E5E5E5] rounded-2xl ambient-shadow overflow-hidden flex flex-col max-h-[500px]"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-[#171717] text-white flex items-center justify-between gap-3">
              <div>
                <p className="font-display text-sm font-semibold">Portfolio Assistant</p>
                <p className="text-[11px] text-[#c7c6c6]">
                  {geminiConfigured === true
                    ? "Grounded in portfolio data"
                    : geminiConfigured === false
                    ? "Integration pending (API key required)"
                    : "Checking server configuration..."}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Minimize assistant"
                  className="p-1.5 rounded-md text-[#c7c6c6] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close assistant"
                  className="p-1.5 rounded-md text-[#c7c6c6] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Pending Integration Notice when GEMINI_API_KEY is absent */}
            {geminiConfigured === false && (
              <div className="px-4 py-3 bg-[#fcf9f8] border-b border-[#E5E5E5] text-xs text-[#58413f] flex items-start gap-2">
                <AlertCircle
                  className="w-4 h-4 text-[#7A1212] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>
                  <strong className="text-[#1c1b1b]">Integration Pending:</strong>{" "}
                  Configure <code className="font-mono text-[#7A1212]">GEMINI_API_KEY</code>{" "}
                  in server Secrets to enable live portfolio Q&amp;A. Fake responses are
                  disabled.
                </span>
              </div>
            )}

            {/* Messages */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fcf9f8] min-h-[220px]"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#7A1212] text-white"
                        : "bg-white border border-[#E5E5E5] text-[#1c1b1b]"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#E5E5E5] rounded-lg px-3.5 py-2 text-xs text-[#58413f]">
                    Reading portfolio data...
                  </div>
                </div>
              )}

              {errorMsg && (
                <div
                  role="alert"
                  className="p-3 rounded-lg border border-[#dfbfbc] bg-[#ffdad6]/40 text-xs text-[#570004]"
                >
                  {errorMsg}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-white border-t border-[#E5E5E5] flex items-center gap-2"
            >
              <label htmlFor="assistant-input" className="sr-only">
                Ask a question about this portfolio
              </label>
              <input
                id="assistant-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  geminiConfigured === false
                    ? "AI integration pending..."
                    : "Ask about projects or skills..."
                }
                disabled={loading}
                className="flex-1 px-3 py-2 text-xs sm:text-sm bg-[#fcf9f8] border border-[#E5E5E5] rounded-lg text-[#1c1b1b] placeholder:text-[#8b716e] focus:outline-none focus:border-[#7A1212]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#7A1212] hover:bg-[#4D0808] disabled:opacity-50 text-white transition-colors shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"}
        className="inline-flex items-center gap-2.5 min-h-[44px] px-4 py-2.5 rounded-full bg-[#171717] hover:bg-[#7A1212] text-white text-xs font-semibold border border-[#3c3d3d] ambient-shadow transition-colors duration-150 cursor-pointer"
      >
        <MessageSquare className="w-4 h-4" aria-hidden="true" />
        <span>Portfolio Assistant</span>
      </button>
    </div>
  );
}
