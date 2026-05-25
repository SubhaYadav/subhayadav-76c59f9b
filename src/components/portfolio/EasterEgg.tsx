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
  const [badge, setBadge] = useState<string | null>(null);
  const [matrix, setMatrix] = useState(false);
  const [hiddenMsg, setHiddenMsg] = useState<string | null>(null);
  const [secretMode, setSecretMode] = useState(false);
  const [vision, setVision] = useState(false);
  const [cornerHint, setCornerHint] = useState<string | null>(null);
  const keysRef = useRef<string[]>([]);
  const clicksRef = useRef<{ count: number; t: number }>({ count: 0, t: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // helpers
  const showBadge = (label: string) => {
    setBadge(label);
    setTimeout(() => setBadge(null), 4000);
  };
  const showHidden = (text: string, ms = 5000) => {
    setHiddenMsg(text);
    setTimeout(() => setHiddenMsg(null), ms);
  };

  // keyboard buffer — legacy / sssy
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      keysRef.current = [...keysRef.current, e.key].slice(-KONAMI.length);
      if (keysRef.current.join(",") === KONAMI.join(",")) {
        setMatrix(true);
        showBadge("CYBER MATRIX // ACCESS GRANTED");
      }
      if (e.key.length === 1) {
        const next = (buf + e.key.toLowerCase()).slice(-16);
        setBuf(next);
        if (next.endsWith("legacy")) {
          setGlitch(true);
          showBadge("LEGACY MODE ENGAGED");
          document.documentElement.classList.add("legacy-mode");
          showHidden("“Legacy is built in silence.”", 4500);
          setTimeout(() => setGlitch(false), 1800);
        }
        if (next.endsWith("sssy")) {
          document.documentElement.classList.add("brand-mode");
          showBadge("SSSY MODE ACTIVATED");
          showHidden("✦ S.S.S.Y // PERSONAL BRAND MODE", 3500);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [buf]);

  // 7 logo clicks → founder mode
  useEffect(() => {
    const onClick = () => {
      const now = Date.now();
      const c = clicksRef.current;
      if (now - c.t > 1500) c.count = 0;
      c.count += 1;
      c.t = now;
      if (c.count >= 7) {
        c.count = 0;
        document.documentElement.classList.add("founder-mode");
        showBadge("FOUNDER MODE // ENGAGED");
        showHidden("“You are watching the beginning of something powerful.”", 6000);
      }
    };
    window.addEventListener("sssy:logo-click", onClick);
    return () => window.removeEventListener("sssy:logo-click", onClick);
  }, []);

  // terminal events
  useEffect(() => {
    const onUnlock = () => {
      setSecretMode(true);
      showBadge("DEVELOPER ACCESS GRANTED");
      document.documentElement.style.setProperty("--crimson", "oklch(0.78 0.2 145)");
      document.documentElement.style.setProperty("--crimson-glow", "oklch(0.85 0.22 145)");
      setTimeout(() => setSecretMode(false), 3500);
    };
    const onLock = () => {
      document.documentElement.style.removeProperty("--crimson");
      document.documentElement.style.removeProperty("--crimson-glow");
      document.documentElement.classList.remove("legacy-mode", "brand-mode", "founder-mode", "focus-mode", "midnight-mode");
      setSecretMode(false);
      setGlitch(false);
      setMatrix(false);
      setVision(false);
      setBadge(null);
      setHiddenMsg(null);
    };
    const onFocus = () => {
      document.documentElement.classList.add("focus-mode");
      showBadge("FOCUS MODE // ACTIVE");
    };
    const onVision = () => {
      setVision(true);
    };
    const onBrand = () => {
      document.documentElement.classList.add("brand-mode");
      showBadge("SSSY MODE ACTIVATED");
    };
    window.addEventListener("sssy:unlock", onUnlock);
    window.addEventListener("sssy:lock", onLock);
    window.addEventListener("sssy:focus", onFocus);
    window.addEventListener("sssy:vision", onVision);
    window.addEventListener("sssy:brand", onBrand);
    return () => {
      window.removeEventListener("sssy:unlock", onUnlock);
      window.removeEventListener("sssy:lock", onLock);
      window.removeEventListener("sssy:focus", onFocus);
      window.removeEventListener("sssy:vision", onVision);
      window.removeEventListener("sssy:brand", onBrand);
    };
  }, []);

  // midnight auto-mode (00:00 – 05:00)
  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 0 && h < 5) {
      document.documentElement.classList.add("midnight-mode");
      setTimeout(() => showHidden("“The world sleeps. The builders ship.”", 5500), 1200);
    }
  }, []);

  // hidden corner glitch
  useEffect(() => {
    let last = 0;
    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - last < 4000) return;
      const w = window.innerWidth, h = window.innerHeight;
      const x = e.clientX, y = e.clientY;
      const T = 40;
      let corner: string | null = null;
      if (x < T && y < T) corner = "// TOP-LEFT // Built different.";
      else if (x > w - T && y < T) corner = "// TOP-RIGHT // Discipline > motivation.";
      else if (x < T && y > h - T) corner = "// BOTTOM-LEFT // Reps. Reps. Reps.";
      else if (x > w - T && y > h - T) corner = "// BOTTOM-RIGHT // Built to last.";
      if (corner) {
        last = now;
        setCornerHint(corner);
        setTimeout(() => setCornerHint(null), 2200);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
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
    const cols = Math.floor(cv.width / fontSize);
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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
        {matrix && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-[140] bg-background/40">
            <canvas ref={canvasRef} className="h-full w-full" />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="font-display text-3xl font-black tracking-[0.5em] text-crimson md:text-5xl"
                style={{ textShadow: "0 0 20px var(--crimson-glow)" }}>
                ACCESS GRANTED
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hiddenMsg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
            className="glass-strong fixed left-1/2 top-1/2 z-[160] -translate-x-1/2 -translate-y-1/2 rounded-2xl border-glow-strong p-8 text-center max-w-[90vw]"
          >
            <div className="font-display text-[0.6rem] tracking-[0.5em] text-crimson">// SIGNAL</div>
            <div className="mt-3 font-display text-xl font-black text-foreground text-glow md:text-2xl">
              {hiddenMsg}
            </div>
            <div className="mt-3 text-xs text-muted-foreground">— S.S.S.Y</div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {vision && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setVision(false)}
            className="fixed inset-0 z-[170] flex items-center justify-center bg-background/85 px-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: 30, scale: 0.95 }} animate={{ y: 0, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative w-full max-w-2xl rounded-2xl border-glow-strong p-8 md:p-10"
            >
              <button onClick={() => setVision(false)} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-border text-foreground hover:border-crimson hover:text-crimson">✕</button>
              <div className="font-display text-[0.6rem] tracking-[0.5em] text-crimson">// FUTURE TIMELINE</div>
              <div className="mt-2 font-display text-3xl font-black text-foreground text-glow md:text-4xl">VISION</div>
              <div className="mt-7 space-y-5">
                {[
                  { y: "2024", t: "BCA · foundations · AI/ML deep-dive" },
                  { y: "2026", t: "Full-stack shipping · ML systems in production" },
                  { y: "2028", t: "First startup · AI products at scale" },
                  { y: "2030+", t: "Building a legacy in intelligent systems" },
                ].map((s, i) => (
                  <motion.div key={s.y}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.12 }}
                    className="flex items-start gap-4">
                    <div className="font-display text-xs tracking-[0.3em] text-crimson w-16 pt-1">{s.y}</div>
                    <div className="text-sm text-foreground md:text-base">{s.t}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {secretMode && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="glass-strong fixed bottom-6 left-1/2 z-[155] -translate-x-1/2 rounded-full px-5 py-2 font-display text-[0.6rem] tracking-[0.4em] text-crimson">
            ✦ DEVELOPER MODE ENGAGED
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {badge && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="glass-strong fixed bottom-6 left-6 z-[90] hidden rounded-full px-4 py-2 font-display text-[0.6rem] tracking-[0.3em] text-crimson md:block">
            ✦ {badge}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cornerHint && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="pointer-events-none fixed left-1/2 top-20 z-[120] -translate-x-1/2 font-mono text-[0.7rem] tracking-[0.2em] text-crimson"
            style={{ textShadow: "0 0 12px var(--crimson-glow)" }}
          >
            {cornerHint}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
