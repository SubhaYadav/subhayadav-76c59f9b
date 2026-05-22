import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function EasterEgg() {
  const [buf, setBuf] = useState("");
  const [glitch, setGlitch] = useState(false);
  const [badge, setBadge] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return;
      const next = (buf + e.key.toLowerCase()).slice(-12);
      setBuf(next);
      if (next.endsWith("legacy")) {
        setGlitch(true);
        setBadge(true);
        document.documentElement.style.setProperty("--crimson", "oklch(0.7 0.25 200)");
        document.documentElement.style.setProperty("--crimson-glow", "oklch(0.8 0.22 200)");
        setTimeout(() => setGlitch(false), 1600);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [buf]);

  return (
    <>
      <AnimatePresence>
        {glitch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-[150] flex items-center justify-center"
          >
            <div className="font-display text-4xl font-black tracking-[0.4em] text-foreground md:text-7xl"
                 style={{ animation: "glitch 0.3s infinite" }}>
              LEGACY MODE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-strong fixed bottom-6 left-6 z-[90] hidden rounded-full px-4 py-2 font-display text-[0.6rem] tracking-[0.3em] text-crimson md:block"
          >
            ✦ HIDDEN BADGE UNLOCKED
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
