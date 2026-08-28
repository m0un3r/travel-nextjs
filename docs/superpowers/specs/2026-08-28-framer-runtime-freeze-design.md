# Framer Travelio → Next.js Static Runtime Freeze — Design Spec

**Date:** 2026-08-28
**Status:** Approved (one-time fork, pixel-perfect, `output:'export'`)
**Approach:** A) Full Runtime Freeze — preserve Framer's own React runtime verbatim
**Source:** `cloned_site/` (648 files, 81 `framerusercontent/*.mjs`, Framer 6f5525d)
**Output:** `nextjs_export/out/` static, deploy anywhere (Netlify / Cloudflare / S3 / Vercel static)

---

## 1. Architecture & Output Layout

`cloned_site/` is the frozen source of truth. `nextjs_export/` is a thin Next.js static wrapper — no Tailwind rebuild, no CMS rewrite.

```
nextjs_export/
  app/
    layout.tsx                     # single root: fonts, CSS vars --token-*, <Script beforeInteractive>
    globals.css                    # @font-face already extracted (Stack Sans, Source Serif, Inter, Geist, Switzer)
    page.tsx                       # /  (shell + dangerouslySetInnerHTML + re-injected runtime scripts)
    about/page.tsx
    tours/page.tsx + tours/[SUBqtsFoD]/page.tsx        # 19 tours (3 in current dump)
    location/page.tsx + location/[tnVufIJO5]/page.tsx   # 9 locations (brazil, canada, china, iceland, japan, maldives, morocco, tanzania, usa)
    blog/page.tsx + blog/[KYfJhVQQv]/page.tsx           # 7 posts
    categories/[J4jZjNt3n]/page.tsx                      # 5 categories
    legal-pages/[SLUG]/page.tsx                          # 2
    traveler-stories/page.tsx
    api/submit-form/route.ts        # kept for `next dev`, excluded from `output:'export'`
  public/
    assets/{images,fonts,videos,css}                    # 648 files verbatim
    framerusercontent/sites/4I8jtuL0GyWoXILTgNi7Sz/*.mjs  # 81 chunks verbatim (currently missing → must copy)
    framerusercontent/sites/.../searchIndex-*.json       # 2 files
  next.config.mjs { output:'export', trailingSlash:true, images:{unoptimized:true}, outputFileTracingRoot:__dirname }
  out/                               # `next build` result
```

No new npm dependencies. Next.js is only a static file server around Framer's React 18 runtime.

**Decision:** One root layout; no per-page layouts. Dynamic routes use `generateStaticParams` from file tree + `__framer__handoverData`.

---

## 2. Asset & Runtime Pipeline (fixes A–E)

### A — Assets (images / fonts / videos)
- Copy verbatim `cloned_site/assets → public/assets` *and* `cloned_site/framerusercontent → public/framerusercontent`.
- Keep Framer sizing: `next.config.images.unoptimized = true` (no `next/image` replacement).
- Rewrite already done for `/assets/*` in `page.tsx` (e.g., `src="/assets/images/..."`); keep. Verify `framerusercontent` refs stay relative `./framerusercontent/...`.

### B — Interactions (motion, slideshow, parallax)
- **Do not strip** `<script type="module">` tags. Re-inject via `next/script` `strategy="beforeInteractive"`:
  - `react.BlJwgj38.mjs` + `rolldown-runtime.lTo-QpHd.mjs`
  - `motion.BTFsJANr.mjs`
  - `framer.C4vrZTSM.mjs`, `shared-lib`, `Script_main.O6xM-HsT.mjs`
- Preserve `data-framer-appear-id` and `style[data-framer-breakpoint-css]` — remove the current `opacity:1 !important` blanket override that breaks `motion`.
- Preserve `--framer-will-change-override` handling.

### C — Routes
- Each `app/**/page.tsx` is a shell: `generateStaticParams()` enumerates `cloned_site/**/*/index.html` + collection slugs from `__framer__handoverData`. Body is loaded from the **corresponding** frozen HTML (not just `index.html` for all routes). `trailingSlash:true` ensures `/tours/` ≠ 404.

### D — Hydration
- Keep `data-framer-hydrate-v2`, `data-framer-page-optimized-at`, `__framer__appearAnimationsContent`, `__framer__handoverData`, `__framer__breakpoints` JSON exactly as shipped.
- No `BeautifulSoup` stripping of `style[data-framer-*]` or `script[id="__framer__handoverData"]`.
- Console must show zero `published_site_load_error` / `published_site_load_recoverable_error`.

### E — Search / CMS / Forms
- Copy `searchIndex-K522tAX0hnKL.json` + `searchIndex-xdixgZY2ERLE.json` verbatim; keep `<meta name="framer-search-index">`.
- CMS: baked JSON at clone time (one-time fork) — no runtime fetch layer.
- Forms: keep `api/submit-form/route.ts` for `next dev`; static `out/` falls back to Framer native `action` (no 500).

---

## 3. Routing & Static Export

- **Static params:** Enumerated at build from frozen files:
  - `location/:tnVufIJO5` → 9 (`brazil`, `canada`, `china`, `iceland`, `japan`, `maldives`, `morocco`, `tanzania`, `usa`)
  - `tours/:SUBqtsFoD` → 3 in dump (`cherry-blossoms-kyoto-nara`, `marrakech-desert-atlas-journey`, `maldives-island-getaway`) — expand to 19 when full site cloned
  - `blog/:KYfJhVQQv` → 6 captured posts
  - `categories/:J4jZjNt3n` → 5 (`cities`, `nature`, `adventure`, `honeymoon`, `wildlife`)
  - `legal-pages/:em0c08CpE` → 2
- **Layout:** Single `app/layout.tsx` with `export const metadata`.
- **Config:** `next.config.mjs` already patched to `outputFileTracingRoot: __dirname` to silence `C:\Users\GLYTSHU\package-lock.json` warning. `next build` → `out/` is the deploy artifact; no `next start` needed.

---

## 4. Data Flow & Hydration (frozen)

```
cloned_site/index.html
  ├─ <head> fonts + style[data-framer-breakpoint-css] + style[data-framer-font-css]
  │     → public/assets/fonts/* + app/globals.css (+ tokens --token-*)
  ├─ <div id="main" data-framer-hydrate-v2> + data-framer-appear-id
  │  + <script id="__framer__appearAnimationsContent" type="framer/appear">
  │  + <script id="__framer__handoverData" type="framer/handover">
  │     → app/page.tsx shell (dangerouslySetInnerHTML) + layout.tsx
  └─ 81× framerusercontent/sites/.../*.mjs + 2× searchIndex-*.json
        → public/framerusercontent/* (verbatim, served as static)
           └─ hydrated in browser by Framer's own React 18 — Next.js does not re-render
```

`Intl.DateTimeFormat` patch and `script_main` stay untouched. `framer-72rtr7/ha1oc5/1hqw9z1` breakpoint hashes preserved.

---

## 5. Error Handling & Fallbacks (static-safe)

- **Missing asset:** Keep Framer `onError` placeholder; do not hard 404 the page.
- **Build-time guard:** If `public/framerusercontent` file count != `cloned_site/framerusercontent` count (81), fail `next build` with explicit message.
- **`output:'export'`:** `api/submit-form` is excluded from `out/` — forms gracefully fall back to Framer default. No runtime 500 on static host.
- **Fonts:** Keep `font-display:swap` + `unicode-range` as extracted; no change.

---

## 6. Testing & Validation

1. **Build:** `next build` must succeed; `out/` must contain 42 HTML files matching `cloned_site/**/index.html` count.
2. **Console:** Browser console shows zero `published_site_load_error` / `recoverable_error`; zero 404 for `*.mjs` / `/assets/*`.
3. **Visual parity:** Pixel diff + manual interaction checklist vs `cloned_site` served via `python -m http.server`:
   - Hero clouds `fogDriftLeft/Center/Right` + `heroBgPulse`
   - Stats counter `framer-11431j5` / `framer-1bagl4`
   - Categories slideshow (`framer-slideshow-axis-x`), Destinations wheel, Testimonials ticker
   - Search modal (`framer-search-index`)
   - Responsive breakpoints (1200px / 810px)
4. **Static host smoke:** Serve `out/` with `npx serve out` and crawl all routes; each `trailingSlash` route loads.

---

## Out of Scope

- Rebuilding Framer sections as Tailwind/React components (approach C)
- CMS writeback / Framer re-sync (one-time fork)
- `next/image` optimization (kept `unoptimized`)
- PWA / Service Worker (separate feature)

---

## Handoff

Approved design → `writing-plans` skill generates execution plan. No implementation until plan is approved.
