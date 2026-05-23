import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { LINKS } from "@/lib/links";

const SOCIALS = [
  { label: "EMAIL", href: LINKS.emailHref, glyph: "@", sub: LINKS.email },
  { label: "GITHUB", href: LINKS.github, glyph: "{ }", sub: LINKS.githubUser },
  {
    label: "LINKEDIN",
    href: LINKS.linkedin,
    glyph: "in",
    sub: "subha-saubhagya-singh-yadav",
  },
  { label: "INSTAGRAM", href: LINKS.instagram, glyph: "◎", sub: "@saugat__yadav" },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="08" title={`LET'S BUILD\nSOMETHING POWERFUL`} />
        <div className="grid gap-10 md:grid-cols-5 md:gap-14">
          <div className="space-y-3 md:col-span-2">
            <div className="font-display text-[0.6rem] tracking-[0.4em] text-crimson">
              // CHANNELS
            </div>
            <div className="space-y-2">
              {SOCIALS.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="glass group flex items-center gap-4 rounded-xl px-4 py-3 transition-all hover:border-crimson/60 hover:bg-crimson/5"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-md border border-crimson/30 bg-background/40 font-display text-xs font-bold text-crimson transition-all group-hover:border-crimson group-hover:text-glow">
                    {s.glyph}
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="font-display text-xs tracking-[0.3em] text-foreground">
                      {s.label}
                    </span>
                    <span className="truncate text-[0.7rem] text-muted-foreground">
                      {s.sub}
                    </span>
                  </span>
                  <span className="ml-auto font-display text-xs text-muted-foreground transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              (e.target as HTMLFormElement).reset();
              setTimeout(() => setSent(false), 3500);
            }}
            className="glass-strong space-y-4 rounded-2xl p-6 md:col-span-3 md:p-8"
          >
            <div>
              <label className="mb-1 block font-display text-[0.6rem] tracking-[0.3em] text-muted-foreground">
                NAME
              </label>
              <input
                required
                className="w-full rounded-md border border-border bg-background/40 px-4 py-3 text-foreground outline-none transition-colors focus:border-crimson"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-1 block font-display text-[0.6rem] tracking-[0.3em] text-muted-foreground">
                EMAIL
              </label>
              <input
                type="email"
                required
                className="w-full rounded-md border border-border bg-background/40 px-4 py-3 text-foreground outline-none transition-colors focus:border-crimson"
                placeholder="you@domain.com"
              />
            </div>
            <div>
              <label className="mb-1 block font-display text-[0.6rem] tracking-[0.3em] text-muted-foreground">
                MESSAGE
              </label>
              <textarea
                required
                rows={5}
                className="w-full resize-none rounded-md border border-border bg-background/40 px-4 py-3 text-foreground outline-none transition-colors focus:border-crimson"
                placeholder="What are we building?"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-crimson py-3 font-display text-xs font-semibold tracking-[0.3em] text-primary-foreground transition-all hover:bg-crimson-glow"
              style={{ boxShadow: "0 0 30px oklch(0.58 0.24 25 / 0.5)" }}
            >
              {sent ? "✓ TRANSMISSION SENT" : "TRANSMIT MESSAGE"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
