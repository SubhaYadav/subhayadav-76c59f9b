import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

export function Mission() {
  return (
    <section id="mission" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="01" title="MISSION" />
        <div className="grid gap-12 md:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-3"
          >
            <p className="font-display text-2xl leading-snug text-foreground md:text-4xl">
              I'm building toward a future where{" "}
              <span className="text-gradient-crimson">intelligent systems</span> solve
              real problems — not vanity ones.
            </p>
            <div className="my-8 h-px w-full bg-gradient-to-r from-crimson via-crimson/30 to-transparent" />
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                My obsession is at the intersection of{" "}
                <span className="text-foreground">AI/ML and full-stack engineering</span> —
                turning research-grade ideas into shipped products. Every line of code is a
                rep. Every system is a stepping stone.
              </p>
              <p>
                The mindset is simple: discipline over motivation, depth over noise,
                <span className="text-foreground"> legacy over likes</span>. I'm building
                the foundation today for the company I'll lead tomorrow.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="glass-strong relative overflow-hidden rounded-2xl p-8 animate-pulse-glow">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-crimson/20 blur-3xl" />
              <div className="relative">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-crimson" />
                  <span className="font-display text-[0.6rem] tracking-[0.4em] text-crimson">
                    CURRENT MISSION
                  </span>
                </div>
                <ul className="space-y-4 text-sm md:text-base">
                  {[
                    "Mastering AI/ML at depth",
                    "Building impactful systems",
                    "Improving full-stack skills",
                    "Creating startup-level projects",
                  ].map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 font-display text-[0.65rem] text-crimson">
                        0{i + 1}
                      </span>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-crimson/60 to-transparent" />
                <div className="mt-4 font-display text-[0.6rem] tracking-[0.4em] text-muted-foreground">
                  STATUS: EXECUTING
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
