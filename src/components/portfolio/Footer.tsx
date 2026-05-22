import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative px-6 pb-10 pt-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
          className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-crimson to-transparent"
        />
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <div className="font-display text-sm font-bold tracking-[0.3em] text-foreground text-glow-soft">
              S.S.S.Y
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              © {new Date().getFullYear()} Subha Saubhagya Singh Yadav
            </div>
          </div>
          <div className="font-display text-[0.65rem] tracking-[0.3em] text-muted-foreground">
            Built with discipline, vision, and code.
          </div>
        </div>
      </div>
    </footer>
  );
}
