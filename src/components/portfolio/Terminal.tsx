import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { LINKS } from "@/lib/links";

type Line = { kind: "in" | "out"; text: string };

const HELP = [
  "Available commands:",
  "  help       — list commands",
  "  projects   — open creations archive",
  "  skills     — display arsenal",
  "  resume     — view resume",
  "  contact    — get in touch",
  "  social     — list social links",
  "  focus      — enter focus mode",
  "  vision     — reveal future roadmap",
  "  unlock     — ???",
  "  lock       — restore normal mode",
  "  clear      — clear terminal",
  "  whoami     — identify the operator",
];

const RESPONSES: Record<string, string[]> = {
  help: HELP,
  projects: [
    "> Opening Projects Archive...",
    "  [01] Kissan Connect    — AI for farmers",
    "  [02] Silent Signal     — emergency SOS network",
    "  [03] Land Nest         — real estate, reimagined",
    "Navigate: → #creations",
  ],
  skills: [
    "> ARSENAL:",
    "  React · Tailwind · JS · HTML · CSS",
    "  Python · AI/ML · SQL · Firebase · GitHub",
  ],
  contact: [
    "> Channels open:",
    `  email     ${LINKS.email}`,
    `  github    ${LINKS.githubUser}`,
    `  linkedin  subha-saubhagya-singh-yadav`,
    `  instagram @saugat__yadav`,
  ],
  social: [
    `  github    ${LINKS.github}`,
    `  linkedin  ${LINKS.linkedin}`,
    `  instagram ${LINKS.instagram}`,
    `  email     ${LINKS.email}`,
  ],
  whoami: [
    "> Subha Saubhagya Singh Yadav",
    "  Role: BCA Student · AI/ML · Full-stack Developer",
    "  Mode: Executing.",
  ],
};


export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "S.S.S.Y // shell v1.0 — type `help` to begin." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    const next: Line[] = [...lines, { kind: "in", text: raw }];
    if (cmd === "clear") {
      setLines([{ kind: "out", text: "S.S.S.Y // shell — cleared." }]);
      return;
    }
    if (cmd === "resume") {
      window.dispatchEvent(new CustomEvent("sssy:open-resume"));
      setLines([...next, { kind: "out", text: "> opening resume.png ..." }]);
      return;
    }
    if (cmd === "unlock") {
      window.dispatchEvent(new CustomEvent("sssy:unlock"));
      setLines([
        ...next,
        { kind: "out", text: "> ✦ secret mode engaged. system pulse altered." },
      ]);
      return;
    }
    if (cmd === "lock") {
      window.dispatchEvent(new CustomEvent("sssy:lock"));
      setLines([
        ...next,
        { kind: "out", text: "> system restored to baseline. crimson stabilized." },
      ]);
      return;
    }
    if (cmd === "focus") {
      window.dispatchEvent(new CustomEvent("sssy:focus"));
      setLines([
        ...next,
        { kind: "out", text: "> ✦ FOCUS MODE engaged. distractions muted. type `lock` to exit." },
      ]);
      return;
    }
    if (cmd === "vision") {
      window.dispatchEvent(new CustomEvent("sssy:vision"));
      setLines([
        ...next,
        { kind: "out", text: "> projecting future timeline ..." },
        { kind: "out", text: "  2024 — BCA · foundations · AI/ML deep-dive" },
        { kind: "out", text: "  2026 — full-stack shipping · ML systems in production" },
        { kind: "out", text: "  2028 — first startup · AI products at scale" },
        { kind: "out", text: "  2030+ — building a legacy in intelligent systems" },
      ]);
      return;
    }
    if (cmd === "sssy") {
      window.dispatchEvent(new CustomEvent("sssy:brand"));
      setLines([
        ...next,
        { kind: "out", text: "> ✦ PERSONAL BRAND MODE engaged." },
      ]);
      return;
    }

    const out = RESPONSES[cmd] ?? [`command not found: ${cmd}. type 'help'.`];
    setLines([...next, ...out.map((t) => ({ kind: "out" as const, text: t }))]);
  };

  return (
    <section id="terminal" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          index="06"
          title="TERMINAL"
          subtitle="Speak the language of the machine. (Try `unlock`.)"
        />
        <div
          onClick={() => inputRef.current?.focus()}
          className="glass-strong overflow-hidden rounded-xl border-glow"
        >
          <div className="flex items-center gap-2 border-b border-border bg-background/60 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-crimson/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-3 font-display text-[0.6rem] tracking-[0.3em] text-muted-foreground">
              ~/sssy — zsh
            </span>
          </div>
          <div
            ref={scrollRef}
            className="h-80 overflow-y-auto p-5 font-mono text-sm leading-relaxed md:text-[15px]"
          >
            {lines.map((l, i) =>
              l.kind === "in" ? (
                <div key={i} className="text-foreground">
                  <span className="mr-2 text-crimson">{">"}</span>
                  {l.text}
                </div>
              ) : (
                <div key={i} className="whitespace-pre text-muted-foreground">
                  {l.text}
                </div>
              ),
            )}
            <div className="mt-1 flex items-center text-foreground">
              <span className="mr-2 text-crimson">{">"}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    run(input);
                    setInput("");
                  }
                }}
                spellCheck={false}
                autoComplete="off"
                className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground/40"
                placeholder="type a command..."
              />
              <span className="ml-1 inline-block h-4 w-[8px] bg-crimson animate-blink" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
