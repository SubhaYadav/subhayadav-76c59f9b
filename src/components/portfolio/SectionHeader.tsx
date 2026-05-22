import { motion } from "framer-motion";

export function SectionHeader({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16 flex flex-col items-start gap-3 md:mb-20"
    >
      <div className="flex items-center gap-3">
        <span className="font-display text-[0.6rem] tracking-[0.4em] text-crimson">{`// ${index}`}</span>
        <div className="h-px w-16 bg-gradient-to-r from-crimson to-transparent" />
      </div>
      <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] font-black leading-[0.95] tracking-tight text-glow">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">{subtitle}</p>
      )}
    </motion.div>
  );
}
