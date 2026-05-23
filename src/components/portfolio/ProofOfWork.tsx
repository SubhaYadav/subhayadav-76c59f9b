import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

/**
 * To add a real certificate later, just append to this list.
 * Replace `image` with an actual image URL when available;
 * if `image` is undefined, a styled futuristic thumbnail is auto-generated.
 */
export type Cert = {
  title: string;
  issuer: string;
  date: string; // human-readable, e.g. "July 2024"
  image?: string;
  accent: string; // tailwind gradient classes for the auto-thumbnail
  glyph: string; // short symbol shown on the thumbnail
};

const CERTS: Cert[] = [
  {
    title: "Information Security",
    issuer: "The Open University",
    date: "July 2024",
    accent: "from-crimson/50 via-rose-500/20 to-background",
    glyph: "🛡",
  },
  {
    title: "Technical Tutorial — QGIS",
    issuer: "UNICEF",
    date: "December 2022",
    accent: "from-sky-500/40 via-cyan-500/20 to-background",
    glyph: "◐",
  },
  {
    title: "Education Sector Analysis & Data Literacy",
    issuer: "UNICEF",
    date: "December 2022",
    accent: "from-emerald-500/40 via-teal-500/20 to-background",
    glyph: "∑",
  },
  {
    title: "Disability Orientation",
    issuer: "UNICEF",
    date: "December 2022",
    accent: "from-violet-500/40 via-indigo-500/20 to-background",
    glyph: "♿",
  },
  {
    title: "Introduction to Child Protection",
    issuer: "UNICEF",
    date: "December 2022",
    accent: "from-amber-500/40 via-orange-500/20 to-background",
    glyph: "✦",
  },
  {
    title: "Technical Tutorial — Basic Excel",
    issuer: "UNICEF",
    date: "May 2022",
    accent: "from-emerald-600/40 via-lime-500/20 to-background",
    glyph: "≡",
  },
  {
    title: "Basics of Python Programming",
    issuer: "Open Weaver",
    date: "October 2023",
    accent: "from-yellow-500/40 via-blue-500/20 to-background",
    glyph: "{ }",
  },
  {
    title: "The Fundamentals of Digital Marketing",
    issuer: "Google",
    date: "December 2022",
    accent: "from-blue-500/40 via-red-500/20 to-background",
    glyph: "◎",
  },
];

function CertThumb({ c }: { c: Cert }) {
  if (c.image) {
    return (
      <img
        src={c.image}
        alt={c.title}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
    );
  }
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${c.accent}`}>
      <div className="absolute inset-0 grid-bg opacity-30" />
      {/* corner brackets */}
      <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-crimson/70" />
      <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-crimson/70" />
      <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-crimson/70" />
      <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-crimson/70" />
      {/* glyph seal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full bg-crimson/30 blur-2xl"
            style={{ transform: "scale(1.4)" }}
          />
          <div className="relative grid h-16 w-16 place-items-center rounded-full border border-crimson/60 bg-background/60 font-display text-2xl text-foreground text-glow">
            {c.glyph}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ c, onOpen }: { c: Cert; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group glass relative h-64 w-72 shrink-0 overflow-hidden rounded-xl text-left transition-all hover:scale-[1.04] hover:border-crimson/70 md:h-72 md:w-80"
      style={{ boxShadow: "0 0 0px transparent" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow =
          "0 0 28px oklch(0.58 0.24 25 / 0.45), inset 0 0 18px oklch(0.58 0.24 25 / 0.08)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 0px transparent")}
    >
      <div className="relative h-36 w-full overflow-hidden md:h-40">
        <CertThumb c={c} />
        <div className="absolute right-3 top-3 rounded-full border border-crimson/40 bg-background/70 px-2 py-0.5 font-display text-[0.55rem] tracking-[0.3em] text-crimson backdrop-blur-md">
          {c.date.split(" ").pop()}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="font-display text-[0.55rem] tracking-[0.3em] text-crimson">
          // CERTIFICATION
        </div>
        <div className="mt-1 font-display text-base font-bold leading-tight text-foreground">
          {c.title}
        </div>
        <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>{c.issuer}</span>
          <span className="font-mono">{c.date}</span>
        </div>
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative w-full max-w-3xl overflow-hidden rounded-2xl border-glow-strong"
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/60 text-foreground transition-colors hover:border-crimson hover:text-crimson"
                aria-label="Close"
              >
                ✕
              </button>
              <div className="relative aspect-[16/10] overflow-hidden">
                <CertThumb c={open} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                  <div className="font-display text-[0.6rem] tracking-[0.4em] text-crimson">
                    // VERIFIED CERTIFICATION
                  </div>
                  <div className="mt-3 font-display text-2xl font-black text-foreground md:text-4xl">
                    {open.title}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground md:text-base">
                    Issued by {open.issuer} · {open.date}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div className="text-xs text-muted-foreground">
                  Tap outside to close
                </div>
                <div className="flex gap-2">
                  <button
                    className="rounded-full border border-border bg-background/40 px-4 py-2 font-display text-[0.65rem] tracking-[0.2em] text-foreground transition-colors hover:border-crimson"
                    onClick={() => setOpen(null)}
                  >
                    CLOSE
                  </button>
                  <a
                    href="#"
                    className="rounded-full bg-crimson px-5 py-2 font-display text-[0.65rem] font-semibold tracking-[0.2em] text-primary-foreground transition-all hover:bg-crimson-glow"
                    style={{ boxShadow: "0 0 24px oklch(0.58 0.24 25 / 0.5)" }}
                  >
                    ↓ DOWNLOAD
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
