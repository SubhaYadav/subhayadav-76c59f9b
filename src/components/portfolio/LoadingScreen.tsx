import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "./Logo";

const STEPS = [
  "INITIALIZING SYSTEM...",
  "LOADING PORTFOLIO...",
  "WELCOME, VISITOR.",
];

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const DURATION = 2600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      setProgress(p);
      setStep(p < 0.4 ? 0 : p < 0.85 ? 1 : 2);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setShow(false);
          setTimeout(onDone, 700);
        }, 450);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
        >
          <div className="absolute inset-0 grid-bg radial-fade opacity-40" />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-8 flex flex-col items-center text-center"
          >
            <LogoMark size={88} />
            <div
              className="mt-5 font-display text-5xl font-black tracking-[0.3em] text-foreground md:text-7xl"
              style={{ animation: "glitch 2.5s infinite" }}
            >
              S.S.S.Y
            </div>
            <div className="mt-3 font-display text-[0.65rem] tracking-[0.5em] text-crimson md:text-xs">
              SYSTEM // BOOT SEQUENCE
            </div>
          </motion.div>

          <div className="relative h-8 w-80 max-w-[80vw] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center font-display text-xs tracking-[0.3em] text-muted-foreground"
              >
                {STEPS[step]}
                <span className="ml-1 inline-block h-3 w-2 bg-crimson animate-blink" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative mt-6 h-px w-80 max-w-[80vw] overflow-hidden bg-border">
            <motion.div
              className="absolute inset-y-0 left-0 bg-crimson"
              style={{ boxShadow: "0 0 10px var(--crimson-glow)" }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <div className="mt-2 font-display text-[0.65rem] tracking-[0.3em] text-muted-foreground">
            {Math.round(progress * 100).toString().padStart(3, "0")}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
