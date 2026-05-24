import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function EasterEgg() {
  const [buf, setBuf] = useState("");
  const [glitch, setGlitch] = useState(false);
  const [badge, setBadge] = useState(false);
  const [matrix, setMatrix] = useState(false);
  const [hiddenMsg, setHiddenMsg] = useState(false);
  const [secretMode, setSecretMode] = useState(false);
  const keysRef = useRef<string[]>([]);
  const clicksRef = useRef<{ count: number; t: number }>({ count: 0, t: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // keyboard: typing "legacy" and Konami code
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // konami
      keysRef.current = [...keysRef.current, e.key].slice(-KONAMI.length);
      if (keysRef.current.join(",") === KONAMI.join(",")) {
        setMatrix(true);
        setBadge(true);
      }
      // legacy buffer
      if (e.key.length === 1) {
        const next = (buf + e.key.toLowerCase()).slice(-12);
        setBuf(next);
        if (next.endsWith("legacy")) {
          setGlitch(true);
          setBadge(true);
          document.documentElement.style.setProperty("--crimson", "oklch(0.7 0.25 200)");
          document.documentElement.style.setProperty("--crimson-glow", "oklch(0.8 0.22 200)");
          setTimeout(() => setGlitch(false), 1600);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [buf]);

  // 7 logo clicks
  useEffect(() => {
    const onClick = () => {
      const now = Date.now();
      const c = clicksRef.current;
      if (now - c.t > 1500) c.count = 0;
      c.count += 1;
      c.t = now;
      if (c.count >= 7) {
        c.count = 0;
        setHiddenMsg(true);
        setBadge(true);
        setTimeout(() => setHiddenMsg(false), 5000);
      }
    };
    window.addEventListener("sssy:logo-click", onClick);
    return () => window.removeEventListener("sssy:logo-click", onClick);
  }, []);

  // terminal "unlock" / "lock" commands
  useEffect(() => {
    const onUnlock = () => {
      setSecretMode(true);
      setBadge(true);
      document.documentElement.style.setProperty("--crimson", "oklch(0.78 0.2 145)");
      document.documentElement.style.setProperty("--crimson-glow", "oklch(0.85 0.22 145)");
      setTimeout(() => setSecretMode(false), 3500);
    };
    const onLock = () => {
      // restore original crimson tokens (defined in src/styles.css)
      document.documentElement.style.removeProperty("--crimson");
      document.documentElement.style.removeProperty("--crimson-glow");
      setSecretMode(false);
      setGlitch(false);
      setMatrix(false);
      setBadge(false);
    };
    window.addEventListener("sssy:unlock", onUnlock);
    window.addEventListener("sssy:lock", onLock);
    return () => {
      window.removeEventListener("sssy:unlock", onUnlock);
      window.removeEventListener("sssy:lock", onLock);
    };
  }, []);

  // matrix canvas
  useEffect(() => {
    if (!matrix) return;
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const chars = "01アイウエオカキクケコｱｲｳｴｵﾊﾋﾌﾍﾎSSSY".split("");
    const fontSize = 16;
    let cols = Math.floor(cv.width / fontSize);
    const drops = Array(cols).fill(1);
    let raf = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(5,5,8,0.08)";
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = "oklch(0.7 0.25 25)";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const txt = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(txt, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > cv.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const timer = setTimeout(() => setMatrix(false), 6000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("resize", resize);
    };
  }, [matrix]);

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
            <div
              className="font-display text-4xl font-black tracking-[0.4em] text-foreground md:text-7xl"
              style={{ animation: "glitch 0.3s infinite" }}
            >
              LEGACY MODE
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {matrix && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-[140] bg-background/40"
          >
            <canvas ref={canvasRef} className="h-full w-full" />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div
                className="font-display text-3xl font-black tracking-[0.5em] text-crimson md:text-5xl"
                style={{ textShadow: "0 0 20px var(--crimson-glow)" }}
              >
                MATRIX // UNLOCKED
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hiddenMsg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="glass-strong fixed left-1/2 top-1/2 z-[160] -translate-x-1/2 -translate-y-1/2 rounded-2xl border-glow-strong p-8 text-center"
          >
            <div className="font-display text-[0.6rem] tracking-[0.5em] text-crimson">
              // HIDDEN MESSAGE
            </div>
            <div className="mt-3 font-display text-xl font-black text-foreground text-glow md:text-2xl">
              "Built different.<br />Built to last."
            </div>
            <div className="mt-3 text-xs text-muted-foreground">— S.S.S.Y</div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {secretMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-strong fixed bottom-6 left-1/2 z-[155] -translate-x-1/2 rounded-full px-5 py-2 font-display text-[0.6rem] tracking-[0.4em] text-crimson"
          >
            ✦ SECRET MODE ENGAGED
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
