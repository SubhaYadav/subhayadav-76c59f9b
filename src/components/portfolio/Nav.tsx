import { motion } from "framer-motion";

const LINKS = [
  { label: "MISSION", href: "#mission" },
  { label: "ARSENAL", href: "#arsenal" },
  { label: "CREATIONS", href: "#creations" },
  { label: "PROOF", href: "#proof" },
  { label: "TERMINAL", href: "#terminal" },
  { label: "CONTACT", href: "#contact" },
];

export function Nav() {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <div className="glass-strong flex items-center gap-1 rounded-full px-2 py-2 md:gap-2">
        <a
          href="#top"
          className="ml-2 mr-1 font-display text-xs font-bold tracking-[0.3em] text-crimson text-glow-soft md:text-sm"
        >
          S.S.S.Y
        </a>
        <div className="mx-1 hidden h-4 w-px bg-border md:block" />
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 font-display text-[0.65rem] tracking-[0.25em] text-muted-foreground transition-colors hover:bg-crimson/10 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="/resume.pdf"
          download
          className="ml-1 rounded-full bg-crimson px-4 py-1.5 font-display text-[0.65rem] font-semibold tracking-[0.25em] text-primary-foreground transition-all hover:bg-crimson-glow"
          style={{ boxShadow: "0 0 20px oklch(0.58 0.24 25 / 0.5)" }}
        >
          RESUME
        </a>
      </div>
    </motion.nav>
  );
}
