import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FileCode2, X } from "lucide-react";

interface PlaceholderNoticeModalProps {
  notice: { label: string; fieldHint: string } | null;
  onClose: () => void;
}

export function PlaceholderNoticeModal({
  notice,
  onClose,
}: PlaceholderNoticeModalProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!notice) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [notice, onClose]);

  return (
    <AnimatePresence>
      {notice && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="placeholder-notice-title"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[1px]"
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white border border-[#E5E5E5] rounded-2xl p-6 space-y-4 ambient-shadow"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <FileCode2 className="w-5 h-5 text-[#7A1212] shrink-0" />
                <h3
                  id="placeholder-notice-title"
                  className="font-display text-lg font-semibold text-[#1c1b1b]"
                >
                  Configure {notice.label}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close notice"
                className="p-1.5 rounded-lg border border-[#E5E5E5] text-[#58413f] hover:text-[#1c1b1b] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm leading-relaxed text-[#58413f]">
              This link currently uses an editable placeholder so no fabricated external
              destination is presented as your own.
            </p>

            <div className="p-3.5 rounded-lg bg-[#fcf9f8] border border-[#E5E5E5] font-mono text-xs text-[#1c1b1b]">
              {notice.fieldHint}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#7A1212] hover:bg-[#4D0808] text-white cursor-pointer"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
