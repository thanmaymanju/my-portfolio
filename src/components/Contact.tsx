import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Github,
  Info,
  Linkedin,
  Mail,
  Send,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import { isPlaceholderValue, isValidExternalOrLocalUrl } from "../utils/links";
import { SectionHeader } from "./SectionHeader";

interface ContactProps {
  supabaseConfigured: boolean | null;
  prefilledSubject: string;
  onPlaceholderAction: (label: string, fieldHint: string) => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function Contact({
  supabaseConfigured,
  prefilledSubject,
  onPlaceholderAction,
}: ContactProps) {
  const { profile } = portfolioData;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (prefilledSubject) {
      setSubject(prefilledSubject);
    }
  }, [prefilledSubject]);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!name.trim()) nextErrors.name = "Please enter your name.";
    if (!email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!subject.trim()) nextErrors.subject = "Please enter a subject.";
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message = "Please enter a message of at least 10 characters.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmittedSuccess(null);
    setSubmitError(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          website,
        }),
      });

      const data = (await res.json()) as {
        configured?: boolean;
        stored?: boolean;
        message?: string;
        error?: string;
      };

      if (res.status === 501 || data.configured === false) {
        setSubmitError(
          data.message ||
            "Backend message storage is not configured yet. Configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your server environment."
        );
        return;
      }

      if (!res.ok) {
        setSubmitError(data.message || data.error || "Unable to submit message.");
        return;
      }

      setSubmittedSuccess(
        data.message || "Your message has been sent and stored successfully."
      );
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setErrors({});
    } catch {
      setSubmitError("Network error while reaching the contact endpoint.");
    } finally {
      setSubmitting(false);
    }
  };

  const emailIsPlaceholder = isPlaceholderValue(profile.email);
  const handleCopyEmail = async () => {
    if (emailIsPlaceholder) {
      onPlaceholderAction(
        "Email Address",
        "Replace profile.email in src/data/portfolioData.ts with your real email address."
      );
      return;
    }
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      setCopiedEmail(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left 5 columns: Direct channels & backend status */}
          <div className="lg:col-span-5 space-y-8">
            <SectionHeader
              eyebrow="Get In Touch"
              title="Start a technical conversation."
              subtitle="Reach out regarding engineering roles, system architecture consulting, or open-source collaboration."
            />

            <div className="space-y-4 pt-4 border-t border-[#E5E5E5]">
              <div className="flex items-center justify-between gap-4 p-4 rounded-lg border border-[#E5E5E5] bg-[#fcf9f8]">
                <div className="flex items-center gap-3 min-w-0">
                  <Mail className="w-4 h-4 text-[#7A1212] shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#58413f]">Direct Email</p>
                    <p className="font-mono text-sm text-[#1c1b1b] truncate">
                      {profile.email}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-[#E5E5E5] bg-white text-[#1c1b1b] hover:border-[#7A1212] hover:text-[#7A1212] shrink-0 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#7A1212]" />
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {isValidExternalOrLocalUrl(profile.githubUrl) ? (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-lg border border-[#E5E5E5] hover:border-[#7A1212] text-sm font-medium text-[#1c1b1b] hover:text-[#7A1212] transition-colors"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
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
                    className="flex items-center justify-between p-3.5 rounded-lg border border-[#E5E5E5] hover:border-[#7A1212] text-sm font-medium text-[#58413f] hover:text-[#7A1212] transition-colors cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}

                {isValidExternalOrLocalUrl(profile.linkedinUrl) ? (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-lg border border-[#E5E5E5] hover:border-[#7A1212] text-sm font-medium text-[#1c1b1b] hover:text-[#7A1212] transition-colors"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
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
                    className="flex items-center justify-between p-3.5 rounded-lg border border-[#E5E5E5] hover:border-[#7A1212] text-sm font-medium text-[#58413f] hover:text-[#7A1212] transition-colors cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Honest integration status notice */}
            {supabaseConfigured === false && (
              <div className="p-4 rounded-lg border border-[#dfbfbc] bg-[#fcf9f8] text-xs leading-relaxed text-[#58413f] space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-[#7A1212]">
                  <Info className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Backend Storage Not Yet Configured</span>
                </div>
                <p>
                  Client-side validation is active, and submissions route to{" "}
                  <code className="font-mono text-[#1c1b1b]">POST /api/contact</code>. To
                  store messages in Supabase, configure{" "}
                  <code className="font-mono text-[#1c1b1b]">SUPABASE_URL</code> and{" "}
                  <code className="font-mono text-[#1c1b1b]">
                    SUPABASE_SERVICE_ROLE_KEY
                  </code>{" "}
                  on the server.
                </p>
              </div>
            )}
          </div>

          {/* Right 7 columns: Validated Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-[#fcf9f8] border border-[#E5E5E5] rounded-xl p-6 sm:p-8 space-y-5"
            >
              {/* Honeypot field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-[#1c1b1b]"
                  >
                    Name <span className="text-[#7A1212]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                    }}
                    placeholder="Jane Doe"
                    aria-invalid={Boolean(errors.name)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5E5E5] rounded-lg text-[#1c1b1b] placeholder:text-[#8b716e] focus:outline-none focus:border-[#7A1212] focus:ring-1 focus:ring-[#7A1212]"
                  />
                  {errors.name && (
                    <p className="text-xs text-[#ba1a1a]">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-[#1c1b1b]"
                  >
                    Email <span className="text-[#7A1212]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                    }}
                    placeholder="jane@company.com"
                    aria-invalid={Boolean(errors.email)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5E5E5] rounded-lg text-[#1c1b1b] placeholder:text-[#8b716e] focus:outline-none focus:border-[#7A1212] focus:ring-1 focus:ring-[#7A1212]"
                  />
                  {errors.email && (
                    <p className="text-xs text-[#ba1a1a]">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-semibold text-[#1c1b1b]"
                >
                  Subject <span className="text-[#7A1212]">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if (errors.subject) setErrors((p) => ({ ...p, subject: undefined }));
                  }}
                  placeholder="Engineering Role / Project Collaboration"
                  aria-invalid={Boolean(errors.subject)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5E5E5] rounded-lg text-[#1c1b1b] placeholder:text-[#8b716e] focus:outline-none focus:border-[#7A1212] focus:ring-1 focus:ring-[#7A1212]"
                />
                {errors.subject && (
                  <p className="text-xs text-[#ba1a1a]">{errors.subject}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-[#1c1b1b]"
                >
                  Message <span className="text-[#7A1212]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((p) => ({ ...p, message: undefined }));
                  }}
                  placeholder="Share context, timeline, or technical details..."
                  aria-invalid={Boolean(errors.message)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5E5E5] rounded-lg text-[#1c1b1b] placeholder:text-[#8b716e] focus:outline-none focus:border-[#7A1212] focus:ring-1 focus:ring-[#7A1212] resize-y"
                />
                {errors.message && (
                  <p className="text-xs text-[#ba1a1a]">{errors.message}</p>
                )}
              </div>

              {submittedSuccess && (
                <div
                  role="status"
                  className="flex items-start gap-2.5 p-3.5 rounded-lg border border-emerald-200 bg-emerald-50 text-xs text-emerald-900"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{submittedSuccess}</span>
                </div>
              )}

              {submitError && (
                <div
                  role="alert"
                  className="flex flex-col gap-2 p-3.5 rounded-lg border border-[#dfbfbc] bg-[#ffdad6]/40 text-xs text-[#570004]"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{submitError}</span>
                  </div>
                  {!emailIsPlaceholder && (
                    <a
                      href={`mailto:${profile.email}?subject=${encodeURIComponent(
                        subject
                      )}&body=${encodeURIComponent(
                        `From: ${name} (${email})\n\n${message}`
                      )}`}
                      className="inline-flex items-center gap-1.5 font-semibold text-[#7A1212] underline self-start ml-6"
                    >
                      <span>Open in your email client instead</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}

              <div className="pt-2 flex items-center justify-between gap-4">
                <p className="text-xs text-[#58413f]">
                  All required fields validated before submission.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 text-sm font-semibold text-white bg-[#7A1212] hover:bg-[#4D0808] disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>{submitting ? "Sending..." : "Send Message"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
