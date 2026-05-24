import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LINKS } from "@/lib/links";

export function ResumeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("sssy:open-resume", onOpen);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("sssy:open-resume", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/90 px-4 py-6 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border-glow-strong"
          >
            <div className="flex items-center justify-between border-b border-border bg-background/60 px-5 py-3">
              <div className="font-display text-[0.6rem] tracking-[0.4em] text-crimson">
                // RESUME · S.S.S.Y
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={LINKS.resumeImage}
                  download="Subha-Saubhagya-Singh-Yadav-Resume.png"
                  className="rounded-full bg-crimson px-4 py-1.5 font-display text-[0.6rem] font-semibold tracking-[0.25em] text-primary-foreground transition-all hover:bg-crimson-glow"
                  style={{ boxShadow: "0 0 20px oklch(0.58 0.24 25 / 0.5)" }}
                >
                  ↓ DOWNLOAD
                </a>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background/60 text-foreground transition-colors hover:border-crimson hover:text-crimson"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="overflow-y-auto bg-background/40 p-4 md:p-6">
              <img
                src={LINKS.resumeImage}
                alt="Subha Saubhagya Singh Yadav — Resume"
                className="mx-auto block w-full max-w-3xl rounded-lg border border-border shadow-2xl"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
