import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

type Msg = { name: string; text: string; at: number };

const VISITOR_KEY = "sssy_visitor_count";
const MSG_KEY = "sssy_guestbook";

export function Guestbook() {
  const [count, setCount] = useState<number>(0);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    // visitor counter — local seed for premium feel, persists per browser
    const stored = parseInt(localStorage.getItem(VISITOR_KEY) || "0", 10);
    let next = stored;
    if (!sessionStorage.getItem("sssy_counted")) {
      next = (stored || 1247 + Math.floor(Math.random() * 30)) + 1;
      localStorage.setItem(VISITOR_KEY, String(next));
      sessionStorage.setItem("sssy_counted", "1");
    }
    setCount(next);

    try {
      const raw = localStorage.getItem(MSG_KEY);
      if (raw) setMsgs(JSON.parse(raw));
    } catch {}
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const next = [{ name: name.trim(), text: text.trim(), at: Date.now() }, ...msgs].slice(0, 30);
    setMsgs(next);
    localStorage.setItem(MSG_KEY, JSON.stringify(next));
    setName("");
    setText("");
    setGlow(true);
    setTimeout(() => setGlow(false), 1200);
  };

  return (
    <section id="guestbook" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="09"
          title="VISITOR LOG"
          subtitle="Leave a signal. Visitors from around the world have explored this portfolio."
        />

        <div className="grid gap-6 md:grid-cols-5 md:gap-10">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-strong relative overflow-hidden rounded-2xl p-6 animate-pulse-glow"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-crimson/20 blur-3xl" />
              <div className="font-display text-[0.6rem] tracking-[0.4em] text-crimson">
                // VISITOR COUNTER
              </div>
              <div className="mt-3 font-display text-5xl font-black text-foreground text-glow md:text-6xl">
                {count.toLocaleString().padStart(5, "0")}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                signals received
              </div>
              <div className="my-5 h-px w-full bg-gradient-to-r from-crimson via-crimson/30 to-transparent" />
              <form onSubmit={submit} className="space-y-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={40}
                  placeholder="Your name"
                  className="w-full rounded-md border border-border bg-background/40 px-3 py-2 text-sm outline-none transition-colors focus:border-crimson"
                />
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={200}
                  rows={3}
                  placeholder="Leave a message..."
                  className="w-full resize-none rounded-md border border-border bg-background/40 px-3 py-2 text-sm outline-none transition-colors focus:border-crimson"
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-crimson py-2.5 font-display text-[0.65rem] font-semibold tracking-[0.3em] text-primary-foreground transition-all hover:bg-crimson-glow"
                  style={{
                    boxShadow: glow
                      ? "0 0 40px oklch(0.7 0.28 25 / 0.9)"
                      : "0 0 20px oklch(0.58 0.24 25 / 0.4)",
                  }}
                >
                  {glow ? "✓ SIGNAL TRANSMITTED" : "LEAVE A SIGNAL"}
                </button>
              </form>
            </motion.div>
          </div>

          <div className="md:col-span-3">
            <div className="font-display text-[0.6rem] tracking-[0.4em] text-crimson">
              // INCOMING TRANSMISSIONS
            </div>
            <div className="mt-3 max-h-[480px] space-y-3 overflow-y-auto pr-2">
              <AnimatePresence initial={false}>
                {msgs.length === 0 && (
                  <div className="glass rounded-xl p-5 text-sm text-muted-foreground">
                    Be the first to leave a signal in the log.
                  </div>
                )}
                {msgs.map((m) => (
                  <motion.div
                    key={m.at}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass group rounded-xl p-4 transition-colors hover:border-crimson/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-display text-xs tracking-[0.2em] text-foreground">
                        {m.name.toUpperCase()}
                      </div>
                      <div className="font-mono text-[0.65rem] text-muted-foreground">
                        {new Date(m.at).toLocaleString()}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{m.text}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
