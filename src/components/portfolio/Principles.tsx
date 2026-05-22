import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const QUOTES = [
  "Discipline Creates Power",
  "Consistency Builds Legacy",
  "Code Is Modern Creation",
  "Vision Without Action Is Nothing",
];

export function Principles() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 3800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="07" title="CORE PRINCIPLES" />
        <div className="relative flex h-48 items-center justify-center md:h-64">
          <div
            className="pointer-events-none absolute inset-0 mx-auto h-full w-full max-w-2xl rounded-full opacity-50"
            style={{
              background: "radial-gradient(circle, oklch(0.58 0.24 25 / 0.25), transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <div className="font-display text-3xl font-black tracking-tight text-foreground text-glow md:text-6xl">
                "{QUOTES[i]}"
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {QUOTES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Show quote ${idx + 1}`}
              className={`h-1 rounded-full transition-all ${
                idx === i ? "w-10 bg-crimson" : "w-4 bg-border hover:bg-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
