/* Vanilla JavaScript enhancements for S.S.S.Y portfolio
 * Pure HTML/CSS/JS layer that runs alongside React + Vite.
 * - tilt micro-interaction on .glass cards
 * - cinematic scroll-reveal for [data-vanilla-reveal] elements
 * - global tap "spark" effect
 */
(function () {
  if (typeof window === "undefined") return;
  if (window.__SSSY_VANILLA__) return;
  window.__SSSY_VANILLA__ = true;

  const ready = (cb) =>
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", cb)
      : cb();

  ready(() => {
    // 1) tilt on glass cards
    const attachTilt = () => {
      document.querySelectorAll(".glass, .glass-strong").forEach((el) => {
        if (el.__tilt) return;
        el.__tilt = true;
        el.addEventListener("mousemove", (e) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          el.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(
            2
          )}deg) rotateY(${(x * 4).toFixed(2)}deg)`;
        });
        el.addEventListener("mouseleave", () => {
          el.style.transform = "";
        });
      });
    };
    attachTilt();
    new MutationObserver(attachTilt).observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 2) tap spark
    document.addEventListener("click", (e) => {
      const s = document.createElement("span");
      s.className = "sssy-spark";
      s.style.left = e.clientX + "px";
      s.style.top = e.clientY + "px";
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 700);
    });

    // 3) console banner — premium signal
    const css =
      "color:#ff5a66;font:bold 14px 'Orbitron',monospace;text-shadow:0 0 8px #dc3c46";
    console.log("%cS.S.S.Y // SYSTEM ONLINE", css);
    console.log(
      "%cHint: type `legacy`, try the Konami code, click the logo 7 times, or run `unlock` in the terminal.",
      "color:#aa9;font:11px monospace"
    );
  });
})();
