import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

type Project = {
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  tech: string[];
  github?: string;
  demo?: string;
  highlights: string[];
  future: string;
  gradient: string;
};

const PROJECTS: Project[] = [
  {
    title: "Silent Signal",
    tagline: "Encrypted real-time communication",
    description:
      "A privacy-first messaging layer designed for environments where silence is louder than words.",
    longDescription:
      "Silent Signal is an end-to-end encrypted messaging system built around minimal metadata exposure. It handles real-time delivery, presence, and ephemeral messages with a focus on user sovereignty.",
    tech: ["React", "Firebase", "Node", "WebCrypto"],
    github: "https://github.com",
    demo: "#",
    highlights: [
      "Zero-knowledge architecture",
      "Real-time message delivery under 60ms",
      "Ephemeral messages with auto-shred",
    ],
    future: "Add P2P fallback and on-device LLM moderation.",
    gradient: "from-crimson/40 via-crimson/10 to-transparent",
  },
  {
    title: "KisanConnect",
    tagline: "AI-powered platform for farmers",
    description:
      "Connecting farmers directly with markets, weather intelligence, and crop advisory powered by AI.",
    longDescription:
      "KisanConnect removes middlemen from the agriculture supply chain. Farmers list produce, get AI-driven pricing recommendations, and receive weather + soil advisory in their local language.",
    tech: ["React", "Python", "ML", "Firebase"],
    github: "https://github.com",
    demo: "#",
    highlights: [
      "Local-language voice interface",
      "ML-based crop price prediction",
      "Direct buyer-farmer marketplace",
    ],
    future: "Integrate satellite-driven yield forecasting.",
    gradient: "from-emerald-500/30 via-crimson/10 to-transparent",
  },
  {
    title: "AI Evaluation System",
    tagline: "Automated answer-script grading",
    description:
      "An intelligent evaluation engine that grades subjective answers with reasoning transparency.",
    longDescription:
      "A semantic grading system that compares student responses against rubrics using embeddings and LLM reasoning. Built for institutions that want auditable AI-assisted grading.",
    tech: ["Python", "LLM", "FastAPI", "React"],
    github: "https://github.com",
    demo: "#",
    highlights: [
      "Rubric-based semantic grading",
      "Explainable scoring for every answer",
      "Bulk OCR + evaluation pipeline",
    ],
    future: "Multi-modal grading: diagrams, code, math.",
    gradient: "from-violet-500/30 via-crimson/10 to-transparent",
  },
  {
    title: "LandNest",
    tagline: "Real estate, reimagined",
    description:
      "A modern, transparent real-estate discovery experience with verified listings and smart filters.",
    longDescription:
      "LandNest brings cinematic listing pages, verified land records, and personalised discovery to a market that desperately needs trust and clarity.",
    tech: ["React", "Tailwind", "SQL", "Firebase"],
    github: "https://github.com",
    demo: "#",
    highlights: [
      "Verified ownership records",
      "Map-first discovery",
      "Personalised property feed",
    ],
    future: "Add AR walk-throughs and on-chain title proofs.",
    gradient: "from-sky-500/30 via-crimson/10 to-transparent",
  },
];

function Card({ p, onOpen, i }: { p: Project; onOpen: () => void; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: i * 0.08 }}
      className="group glass relative overflow-hidden rounded-2xl transition-all hover:border-crimson/60"
    >
      <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${p.gradient}`}>
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-display text-6xl font-black tracking-tight text-foreground/5 md:text-8xl">
            {String(i + 1).padStart(2, "0")}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <div className="font-display text-[0.6rem] tracking-[0.3em] text-crimson">
            PROJECT // {String(i + 1).padStart(2, "0")}
          </div>
          <h3 className="mt-1 font-display text-2xl font-bold text-foreground md:text-3xl">
            {p.title}
          </h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-muted-foreground md:text-base">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-background/40 px-2.5 py-0.5 font-display text-[0.6rem] tracking-wider text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={onOpen}
            className="rounded-full bg-crimson px-4 py-1.5 font-display text-[0.65rem] font-semibold tracking-[0.2em] text-primary-foreground transition-all hover:bg-crimson-glow"
          >
            VIEW DETAILS
          </button>
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-4 py-1.5 font-display text-[0.65rem] tracking-[0.2em] text-foreground transition-colors hover:border-crimson hover:text-crimson"
            >
              GITHUB
            </a>
          )}
          {p.demo && (
            <a
              href={p.demo}
              className="rounded-full border border-border px-4 py-1.5 font-display text-[0.65rem] tracking-[0.2em] text-foreground transition-colors hover:border-crimson hover:text-crimson"
            >
              LIVE
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function Creations() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="creations" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="03"
          title="CREATIONS"
          subtitle="Shipped systems. Not concepts."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Card key={p.title} p={p} i={i} onOpen={() => setOpen(p)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/80 px-4 py-10 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border-glow-strong"
            >
              <button
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/60 text-foreground transition-colors hover:border-crimson hover:text-crimson"
              >
                ✕
              </button>
              <div className={`relative aspect-[16/8] overflow-hidden bg-gradient-to-br ${open.gradient}`}>
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="font-display text-[0.6rem] tracking-[0.3em] text-crimson">
                    {open.tagline.toUpperCase()}
                  </div>
                  <h3 className="mt-2 font-display text-4xl font-black text-foreground md:text-5xl">
                    {open.title}
                  </h3>
                </div>
              </div>
              <div className="space-y-6 p-7 md:p-9">
                <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                  {open.longDescription}
                </p>
                <div>
                  <div className="mb-3 font-display text-[0.6rem] tracking-[0.4em] text-crimson">
                    // ARCHITECTURE
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {open.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-crimson/30 bg-crimson/5 px-3 py-1 font-display text-xs tracking-wider text-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-3 font-display text-[0.6rem] tracking-[0.4em] text-crimson">
                    // CHALLENGES SOLVED
                  </div>
                  <ul className="space-y-2">
                    {open.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-sm text-foreground md:text-base">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="mb-2 font-display text-[0.6rem] tracking-[0.4em] text-crimson">
                    // FUTURE GOALS
                  </div>
                  <p className="text-sm text-muted-foreground md:text-base">{open.future}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {open.github && (
                    <a
                      href={open.github}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-crimson px-5 py-2 font-display text-xs font-semibold tracking-[0.2em] text-primary-foreground"
                    >
                      VIEW SOURCE
                    </a>
                  )}
                  {open.demo && (
                    <a
                      href={open.demo}
                      className="rounded-full border border-border px-5 py-2 font-display text-xs tracking-[0.2em] text-foreground hover:border-crimson"
                    >
                      LIVE DEMO
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
