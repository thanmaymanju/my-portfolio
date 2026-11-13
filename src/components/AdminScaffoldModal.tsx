import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Database, Lock, ShieldCheck, X } from "lucide-react";

interface AdminScaffoldModalProps {
  open: boolean;
  onClose: () => void;
  configStatus: {
    geminiConfigured: boolean;
    supabaseConfigured: boolean;
    adminConfigured: boolean;
  } | null;
}

interface StoredMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export function AdminScaffoldModal({
  open,
  onClose,
  configStatus,
}: AdminScaffoldModalProps) {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<StoredMessage[] | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const handleLoadInbox = async (e: FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/messages", {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      });
      const data = (await res.json()) as {
        configured?: boolean;
        messages?: StoredMessage[];
        message?: string;
        error?: string;
      };
      if (!res.ok) {
        setError(data.message || data.error || "Authorization failed.");
        setMessages(null);
        return;
      }
      setMessages(data.messages ?? []);
    } catch {
      setError("Failed to contact admin endpoint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-scaffold-title"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-[2px]"
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-white border border-[#E5E5E5] rounded-2xl ambient-shadow"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#7A1212]" aria-hidden="true" />
                <h3
                  id="admin-scaffold-title"
                  className="font-display text-lg font-semibold text-[#1c1b1b]"
                >
                  Admin &amp; Content Management Scaffold
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close admin scaffold"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#E5E5E5] text-[#1c1b1b] hover:border-[#7A1212] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6 text-sm text-[#58413f]">
              {/* Configuration Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-lg border border-[#E5E5E5] bg-[#fcf9f8]">
                  <p className="text-xs font-semibold text-[#1c1b1b]">Gemini AI</p>
                  <p className="font-mono text-xs mt-1 text-[#7A1212]">
                    {configStatus?.geminiConfigured ? "Configured" : "Pending GEMINI_API_KEY"}
                  </p>
                </div>
                <div className="p-3.5 rounded-lg border border-[#E5E5E5] bg-[#fcf9f8]">
                  <p className="text-xs font-semibold text-[#1c1b1b]">Supabase Storage</p>
                  <p className="font-mono text-xs mt-1 text-[#7A1212]">
                    {configStatus?.supabaseConfigured ? "Configured" : "Pending SUPABASE_*"}
                  </p>
                </div>
                <div className="p-3.5 rounded-lg border border-[#E5E5E5] bg-[#fcf9f8]">
                  <p className="text-xs font-semibold text-[#1c1b1b]">Admin Guard</p>
                  <p className="font-mono text-xs mt-1 text-[#7A1212]">
                    {configStatus?.adminConfigured ? "Protected" : "Pending ADMIN_ACCESS_TOKEN"}
                  </p>
                </div>
              </div>

              {/* Static Edit Guide */}
              <div className="p-4 rounded-lg border border-[#E5E5E5] bg-[#fcf9f8] space-y-2">
                <p className="font-display font-semibold text-[#1c1b1b]">
                  1. Centralized Portfolio Content File
                </p>
                <p className="text-xs leading-relaxed">
                  All public portfolio data (name, bio, profile image, skills, projects,
                  architecture notes, timeline, gallery, services, and social links) is
                  managed from a single file:{" "}
                  <code className="font-mono text-[#7A1212]">
                    src/data/portfolioData.ts
                  </code>
                  .
                </p>
              </div>

              {/* Protected Inbox Access */}
              <div className="p-4 rounded-lg border border-[#E5E5E5] space-y-4">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#7A1212]" aria-hidden="true" />
                  <p className="font-display font-semibold text-[#1c1b1b]">
                    2. Protected Contact Messages Inbox
                  </p>
                </div>

                {!configStatus?.adminConfigured || !configStatus?.supabaseConfigured ? (
                  <div className="space-y-3 text-xs leading-relaxed">
                    <p>
                      Public visitors cannot access administrative routes. To enable the
                      protected inbox and database CMS:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>
                        Create a Supabase project and run the SQL table + Row-Level
                        Security setup below.
                      </li>
                      <li>
                        Add <code className="font-mono text-[#1c1b1b]">SUPABASE_URL</code>,{" "}
                        <code className="font-mono text-[#1c1b1b]">
                          SUPABASE_SERVICE_ROLE_KEY
                        </code>
                        , and{" "}
                        <code className="font-mono text-[#1c1b1b]">
                          ADMIN_ACCESS_TOKEN
                        </code>{" "}
                        to your server environment.
                      </li>
                    </ol>
                    <pre className="p-3 rounded-lg bg-[#171717] text-[#e3e2e2] font-mono text-[11px] overflow-x-auto">
{`create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;`}
                    </pre>
                  </div>
                ) : (
                  <form onSubmit={handleLoadInbox} className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="Enter ADMIN_ACCESS_TOKEN"
                        className="flex-1 px-3 py-2 text-xs bg-[#fcf9f8] border border-[#E5E5E5] rounded-lg text-[#1c1b1b]"
                      />
                      <button
                        type="submit"
                        disabled={loading || !token.trim()}
                        className="px-4 py-2 text-xs font-semibold bg-[#7A1212] hover:bg-[#4D0808] text-white rounded-lg cursor-pointer"
                      >
                        {loading ? "Verifying..." : "Load Inbox"}
                      </button>
                    </div>
                    {error && <p className="text-xs text-[#ba1a1a]">{error}</p>}
                    {messages && (
                      <div className="space-y-2 pt-2">
                        {messages.length === 0 ? (
                          <p className="text-xs text-[#58413f]">No contact messages yet.</p>
                        ) : (
                          messages.map((m) => (
                            <div
                              key={m.id}
                              className="p-3 rounded-lg border border-[#E5E5E5] bg-[#fcf9f8] text-xs space-y-1"
                            >
                              <div className="flex justify-between font-semibold text-[#1c1b1b]">
                                <span>
                                  {m.name} ({m.email})
                                </span>
                                <span className="font-mono text-[#58413f]">
                                  {new Date(m.created_at).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="font-medium text-[#7A1212]">{m.subject}</p>
                              <p className="text-[#58413f]">{m.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </form>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-[#58413f]">
                <Database className="w-3.5 h-3.5 text-[#7A1212]" aria-hidden="true" />
                <span>
                  Privileged keys are never bundled or exposed in client JavaScript.
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
