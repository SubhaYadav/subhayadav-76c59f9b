import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ParticleField } from "./ParticleField";

const ROLES = [
  "AI/ML Enthusiast",
  "Web Developer",
  "Future Tech Founder",
  "Building Legacy Through Code",
];

function Typewriter() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = ROLES[i];
    const speed = del ? 35 : 70;
    const timeout = setTimeout(() => {
      if (!del) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) {
          setTimeout(() => setDel(true), 1400);
        }
      } else {
        const next = full.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDel(false);
          setI((i + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, del, i]);

  return (
    <div className="flex h-7 items-center justify-center font-display text-sm tracking-[0.25em] text-crimson md:text-base">
      <span className="mr-3 text-muted-foreground">{">"}</span>
      <span className="text-glow-soft">{text}</span>
      <span className="ml-1 inline-block h-4 w-[2px] bg-crimson animate-blink" />
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg radial-fade opacity-30" />
      <div className="absolute inset-0">
        <ParticleField />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />

      {/* ambient orb */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, oklch(0.58 0.24 25 / 0.35), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-crimson/5 px-4 py-1.5 font-display text-[0.6rem] tracking-[0.4em] text-crimson backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson" style={{ boxShadow: "0 0 8px var(--crimson-glow)" }} />
          ONLINE // SYSTEM ACTIVE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2rem,7vw,5.5rem)] font-black leading-[0.95] tracking-tight text-foreground text-glow"
        >
          SUBHA SAUBHAGYA
          <br />
          <span className="text-gradient-crimson">SINGH YADAV</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-8"
        >
          <Typewriter />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#creations"
            className="group relative overflow-hidden rounded-full bg-crimson px-7 py-3 font-display text-xs font-semibold tracking-[0.25em] text-primary-foreground transition-all hover:scale-[1.03]"
            style={{ boxShadow: "0 0 30px oklch(0.58 0.24 25 / 0.6)" }}
          >
            <span className="relative z-10">VIEW PROJECTS</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
          <a
            href="/resume.pdf"
            download
            className="rounded-full border border-crimson/40 bg-background/40 px-7 py-3 font-display text-xs font-semibold tracking-[0.25em] text-foreground backdrop-blur-md transition-all hover:border-crimson hover:bg-crimson/10"
          >
            DOWNLOAD RESUME
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border bg-background/40 px-7 py-3 font-display text-xs font-semibold tracking-[0.25em] text-muted-foreground backdrop-blur-md transition-all hover:border-foreground/30 hover:text-foreground"
          >
            CONTACT
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-display text-[0.6rem] tracking-[0.4em] text-muted-foreground"
      >
        <div className="flex flex-col items-center gap-2">
          <span>SCROLL</span>
          <div className="h-10 w-px bg-gradient-to-b from-crimson to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
