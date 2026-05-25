import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { LogoMark } from "./Logo";


const CARDS = [
  {
    tag: "01",
    title: "BCA Student",
    desc: "Studying Computer Applications — building strong CS fundamentals while shipping in parallel.",
  },
  {
    tag: "02",
    title: "AI / ML Passion",
    desc: "Drawn to intelligent systems — models, embeddings, and learning algorithms that actually solve problems.",
  },
  {
    tag: "03",
    title: "Web Development",
    desc: "Crafting fast, responsive, futuristic interfaces with React, Tailwind and modern web tech.",
  },
  {
    tag: "04",
    title: "Startup Mindset",
    desc: "Thinking like a founder — products, leverage, distribution, and ownership of the outcome.",
  },
  {
    tag: "05",
    title: "Disciplined Growth",
    desc: "Compound progress over hype. Reps over motivation. Depth over noise.",
  },
  {
    tag: "06",
    title: "Vision For Tech",
    desc: "Using technology to build a lasting legacy — systems that outlive trends and serve real humans.",
  },
];

export function WhoAmI() {
  const [revealed, setRevealed] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startHover = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setRevealed(true), 5000);
  };
  const endHover = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  };

  return (
    <section id="whoami" className="relative px-6 py-32 md:py-40">

      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="00"
          title="WHO AM I"
          subtitle="The operator behind the system."
        />

        <div className="grid gap-10 md:grid-cols-5 md:gap-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="md:col-span-2"
          >
            <div
              onMouseEnter={startHover}
              onMouseLeave={endHover}
              onTouchStart={startHover}
              onTouchEnd={endHover}
              className="glass-strong relative overflow-hidden rounded-2xl p-8 animate-pulse-glow"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-crimson/20 blur-3xl" />
              <div className="relative flex flex-col items-center text-center">
                <LogoMark size={88} />
                <div className="mt-5 font-display text-[0.6rem] tracking-[0.4em] text-crimson">
                  // OPERATOR
                </div>
                <div className="mt-2 font-display text-2xl font-black text-foreground text-glow md:text-3xl">
                  S.S.S.Y
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Subha Saubhagya Singh Yadav
                </p>
                <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-crimson to-transparent" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  A BCA student building toward the intersection of{" "}
                  <span className="text-foreground">AI/ML</span> and{" "}
                  <span className="text-foreground">full-stack engineering</span>{" "}
                  — driven by discipline, vision, and a long-game mindset.
                </p>
                <div className="mt-4 font-mono text-[0.6rem] tracking-[0.25em] text-muted-foreground/60">
                  hover 5s · reveal next mission
                </div>
              </div>

              <AnimatePresence>
                {revealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    className="mt-6 rounded-xl border border-crimson/40 bg-background/40 p-4 text-left"
                    style={{ boxShadow: "0 0 30px oklch(0.58 0.24 25 / 0.25)" }}
                  >
                    <div className="font-display text-[0.6rem] tracking-[0.4em] text-crimson">
                      // NEXT MISSION
                    </div>
                    <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-foreground">
                      <li>→ Master production-grade ML systems</li>
                      <li>→ Ship a flagship AI product</li>
                      <li>→ Build a founding team & first startup</li>
                      <li>→ Scale toward a generational tech legacy</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>

          <div className="grid gap-3 md:col-span-3 md:grid-cols-2">
            {CARDS.map((c, i) => (
              <motion.div
                key={c.tag}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="group glass relative overflow-hidden rounded-xl p-5 transition-colors hover:border-crimson/60"
              >
                <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-crimson/20 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="font-display text-[0.6rem] tracking-[0.3em] text-crimson">
                    {c.tag}
                  </div>
                  <div className="mt-2 font-display text-base font-bold tracking-wide text-foreground md:text-lg">
                    {c.title}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {c.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
