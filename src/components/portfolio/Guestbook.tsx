import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { LINKS } from "@/lib/links";

type Msg = { name: string; text: string; at: number };

const MSG_KEY = "sssy_guestbook_v2";
const VISITOR_NS = "sssy-portfolio";
const VISITOR_KEY = "visits-v1";

export function Guestbook() {
  const [count, setCount] = useState<number | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">(
    "idle",
  );

  useEffect(() => {
    // Clean up old localStorage keys (old fake messages + old counter)
    localStorage.removeItem("sssy_guestbook");
    localStorage.removeItem("sssy_visitor_count");

    // Real visitor counter via free Abacus API (no signup, public)
    const url = sessionStorage.getItem("sssy_counted")
      ? `https://abacus.jasoncameron.dev/get/${VISITOR_NS}/${VISITOR_KEY}`
      : `https://abacus.jasoncameron.dev/hit/${VISITOR_NS}/${VISITOR_KEY}`;
    fetch(url)
      .then((r) => r.json())
      .then((j) => {
        if (typeof j?.value === "number") setCount(j.value);
        sessionStorage.setItem("sssy_counted", "1");
      })
      .catch(() => setCount(null));

    try {
      const raw = localStorage.getItem(MSG_KEY);
      if (raw) setMsgs(JSON.parse(raw));
    } catch {}
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch(LINKS.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `🛰️ New Visitor Signal from ${name.trim()}`,
          source: "Portfolio Guestbook",
          name: name.trim(),
          message: text.trim(),
        }),
      });
      if (!res.ok) throw new Error("send failed");
      const next = [
        { name: name.trim(), text: text.trim(), at: Date.now() },
        ...msgs,
      ].slice(0, 30);
      setMsgs(next);
      localStorage.setItem(MSG_KEY, JSON.stringify(next));
      setName("");
      setText("");
      setStatus("ok");
      setTimeout(() => setStatus("idle"), 2200);
    } catch {
      setStatus("err");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  return (
    <section id="guestbook" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="09"
          title="VISITOR LOG"
          subtitle="Leave a signal. Every message lands in my inbox."
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
                {count === null
                  ? "·····"
                  : count.toLocaleString().padStart(5, "0")}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                real signals received
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
                  maxLength={300}
                  rows={3}
                  placeholder="Leave a message..."
                  className="w-full resize-none rounded-md border border-border bg-background/40 px-3 py-2 text-sm outline-none transition-colors focus:border-crimson"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full bg-crimson py-2.5 font-display text-[0.65rem] font-semibold tracking-[0.3em] text-primary-foreground transition-all hover:bg-crimson-glow disabled:opacity-60"
                  style={{
                    boxShadow:
                      status === "ok"
                        ? "0 0 40px oklch(0.7 0.28 25 / 0.9)"
                        : "0 0 20px oklch(0.58 0.24 25 / 0.4)",
                  }}
                >
                  {status === "sending"
                    ? "TRANSMITTING..."
                    : status === "ok"
                      ? "✓ DELIVERED TO INBOX"
                      : status === "err"
                        ? "✕ TRY AGAIN"
                        : "LEAVE A SIGNAL"}
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
