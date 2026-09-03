// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/**
 * Static / GitHub Pages build.
 *
 * `STATIC_BUILD=1 bun run build` (used by .github/workflows/deploy.yml) produces a
 * fully static site in `dist/client`:
 *   - `/` is prerendered to `dist/client/index.html` (the real React app, hydrated on load)
 *   - assets are emitted under `/assets/...` relative to the domain root
 *   - no server runtime is required, so it can be served by GitHub Pages
 *     from the custom domain https://subhayadav.com.np/
 *
 * The base path is always "/" — never the repository sub-path — because the
 * production site lives at the domain root.
 */
const isStaticBuild = process.env.STATIC_BUILD === "1";

export default defineConfig(
  isStaticBuild
    ? {
        nitro: false,
        tanstackStart: {
          pages: [{ path: "/" }],
          prerender: {
            enabled: true,
            autoStaticPathsDiscovery: false,
            crawlLinks: false,
            failOnError: true,
          },
          sitemap: { enabled: true, host: "https://subhayadav.com.np" },
        },
        vite: { base: "/" },
      }
    : {
        // Lovable / Cloudflare build (unchanged).
        // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
        // @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
        tanstackStart: {
          server: { entry: "server" },
        },
      },
);
