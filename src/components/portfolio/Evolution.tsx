import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const TIMELINE = [
  {
    year: "2022",
    title: "Started Learning Development",
    desc: "First lines of code. Foundations of HTML, CSS & JavaScript laid the groundwork.",
  },
  {
    year: "2024",
    title: "Building Projects",
    desc: "Shipping real builds — full-stack experiments, interfaces, and product prototypes.",
  },
  {
    year: "2026",
    title: "Started Learning AI/ML",
    desc: "Embeddings, models, pipelines — moving from apps to intelligent systems.",
  },
];

export function Evolution() {
  return (
    <section className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-5xl">
        <SectionHeader index="05" title="EVOLUTION" subtitle="The trajectory is the point." />
        <div className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-crimson via-crimson/40 to-transparent md:left-1/2"
          />
          <div className="space-y-16">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className={`relative flex items-start gap-6 md:gap-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className="absolute left-3 h-3 w-3 -translate-x-1/2 rounded-full bg-crimson md:left-1/2"
                  style={{ boxShadow: "0 0 16px var(--crimson-glow)" }}
                />
                <div className="hidden md:block md:flex-1" />
                <div className="ml-10 flex-1 md:ml-0">
                  <div className="glass rounded-xl p-6 transition-colors hover:border-crimson/50">
                    <div className="font-display text-[0.65rem] tracking-[0.4em] text-crimson">
                      {t.year}
                    </div>
                    <div className="mt-2 font-display text-xl font-bold text-foreground md:text-2xl">
                      {t.title}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground md:text-base">{t.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
