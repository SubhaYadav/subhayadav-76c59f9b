import { motion } from "framer-motion";

export function LogoMark({
  size = 40,
  className = "",
  animate = true,
}: {
  size?: number;
  className?: string;
  animate?: boolean;
}) {
  const Wrapper: any = animate ? motion.svg : "svg";
  return (
    <Wrapper
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      {...(animate
        ? {
            initial: { rotate: -20, opacity: 0 },
            animate: { rotate: 0, opacity: 1 },
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
            whileHover: { rotate: 8, scale: 1.05 },
          }
        : {})}
      style={{
        filter:
          "drop-shadow(0 0 8px var(--crimson-glow)) drop-shadow(0 0 18px oklch(0.58 0.24 25 / 0.4))",
      }}
    >
      <defs>
        <linearGradient id="lg-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.85 0.18 25)" />
          <stop offset="100%" stopColor="oklch(0.5 0.24 25)" />
        </linearGradient>
      </defs>
      {/* hex outer */}
      <polygon
        points="32,3 58,18 58,46 32,61 6,46 6,18"
        stroke="url(#lg-stroke)"
        strokeWidth="1.5"
        fill="oklch(0.08 0.02 20 / 0.6)"
      />
      {/* inner ring */}
      <circle
        cx="32"
        cy="32"
        r="18"
        stroke="oklch(0.58 0.24 25 / 0.4)"
        strokeWidth="0.8"
        fill="none"
      />
      {/* S monogram strokes */}
      <path
        d="M22 22 L42 22 L42 30 L22 30 L22 42 L42 42"
        stroke="url(#lg-stroke)"
        strokeWidth="2.5"
        strokeLinecap="square"
        fill="none"
      />
      {/* corner ticks */}
      <path d="M32 6 L32 12" stroke="oklch(0.7 0.28 25)" strokeWidth="1.2" />
      <path d="M32 52 L32 58" stroke="oklch(0.7 0.28 25)" strokeWidth="1.2" />
      <circle cx="32" cy="32" r="2" fill="oklch(0.85 0.18 25)" />
    </Wrapper>
  );
}
