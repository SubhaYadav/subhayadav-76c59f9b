import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

type Cert = { title: string; issuer: string; year: string; gradient: string };

const CERTS: Cert[] = [
  { title: "Machine Learning Specialization", issuer: "Stanford / Coursera", year: "2025", gradient: "from-crimson/40 to-violet-500/20" },
  { title: "Deep Learning Foundations", issuer: "DeepLearning.AI", year: "2025", gradient: "from-sky-500/30 to-crimson/20" },
  { title: "Full-Stack Web Development", issuer: "Meta", year: "2024", gradient: "from-emerald-500/30 to-crimson/20" },
  { title: "Python for Data Science", issuer: "IBM", year: "2024", gradient: "from-amber-500/30 to-crimson/20" },
  { title: "React Advanced Patterns", issuer: "Frontend Masters", year: "2025", gradient: "from-crimson/40 to-sky-500/20" },
  { title: "SQL & Database Design", issuer: "MongoDB University", year: "2024", gradient: "from-violet-500/30 to-crimson/20" },
  { title: "Generative AI Fundamentals", issuer: "Google Cloud", year: "2025", gradient: "from-rose-500/30 to-crimson/20" },
  { title: "Cybersecurity Essentials", issuer: "Cisco", year: "2024", gradient: "from-teal-500/30 to-crimson/20" },
];

function Card({ c, onOpen }: { c: Cert; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group glass relative h-48 w-72 shrink-0 overflow-hidden rounded-xl text-left transition-transform hover:scale-[1.04] md:h-56 md:w-80"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient}`} />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
      <div className="absolute right-3 top-3 rounded-full border border-crimson/40 bg-background/60 px-2 py-0.5 font-display text-[0.55rem] tracking-[0.3em] text-crimson">
        {c.year}
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="font-display text-[0.55rem] tracking-[0.3em] text-crimson">
          // CERTIFICATION
        </div>
        <div className="mt-1 font-display text-base font-bold leading-tight text-foreground">
          {c.title}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">{c.issuer}</div>
      </div>
    </button>
  );
}

export function ProofOfWork() {
  const [open, setOpen] = useState<Cert | null>(null);
  const loop = [...CERTS, ...CERTS];

  return (
    <section id="proof" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          index="04"
          title="PROOF OF WORK"
          subtitle="Receipts. Not promises."
        />
      </div>

      <div className="group relative edge-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee gap-5 px-6 group-hover:[animation-play-state:paused]">
          {loop.map((c, i) => (
            <Card key={i} c={c} onOpen={() => setOpen(c)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/85 px-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative w-full max-w-2xl overflow-hidden rounded-2xl border-glow-strong"
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/60 text-foreground hover:border-crimson hover:text-crimson"
              >
                ✕
              </button>
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${open.gradient}`}>
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center p-10 text-center">
                  <div>
                    <div className="font-display text-[0.6rem] tracking-[0.4em] text-crimson">
                      // VERIFIED CERTIFICATION
                    </div>
                    <div className="mt-3 font-display text-2xl font-black text-foreground md:text-4xl">
                      {open.title}
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground md:text-base">
                      Issued by {open.issuer} · {open.year}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <div className="text-xs text-muted-foreground">
                  Tap outside to close
                </div>
                <a
                  href="#"
                  className="rounded-full bg-crimson px-5 py-2 font-display text-[0.65rem] font-semibold tracking-[0.2em] text-primary-foreground"
                >
                  DOWNLOAD
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
