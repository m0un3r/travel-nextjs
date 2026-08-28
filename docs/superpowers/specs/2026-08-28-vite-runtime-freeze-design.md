# Framer Travelio → Vite + React Static Runtime Freeze — Design Spec

**Date:** 2026-08-28
**Status:** Approved (A Full Runtime Freeze, one-time fork, pixel-perfect)
**Approach:** Minimal Vite Wrapper — preserve Framer React runtime verbatim, Vite `build` → `dist/` for Cloudflare Pages / Netlify
**Source:** `cloned_site/` (648 files, 81 `framerusercontent/*.mjs`, Framer 6f5525d)
**Output:** `travelio-vite/dist/` static, deploy anywhere (Cloudflare Pages, Netlify, S3)

---

## 1. Architecture & Output Layout

`cloned_site/` frozen source. `travelio-vite/` thin Vite+React 19 static wrapper — no Tailwind rebuild.

```
travelio-vite/
  index.html                   # Vite entry: <div id="root"> + <script type="module" src="/src/main.tsx">
  vite.config.ts               # { plugins:[react()], base:'/', build:{outDir:'dist', assetsDir:'assets'} }
  package.json                 # vite@5 + react@19 + react-router-dom@6 + typescript@5
  tsconfig.json
  src/
    main.tsx                   # createBrowserRouter + RouterProvider (52 routes)
    index.css                  # @font-face 318 + tokens --token-* + fogDrift/marque (remove opacity blanket)
    pages/
      Home.tsx                 # /  — shell
      About.tsx, Contact.tsx, Blog.tsx, Tours.tsx, Location.tsx
      ToursSlug.tsx            # /tours/:slug — 19 slugs, per-slug body (not generic dump)
      LocationSlug.tsx         # /location/:slug — 9 (brazil,canada,china,iceland,japan,maldives,morocco,tanzania,usa)
      BlogSlug.tsx             # /blog/:slug — 7 (a-sunset..., lost-in-time..., ...)
      CategorySlug.tsx         # /categories/:slug — 5 (cities,nature,adventure,honeymoon,wildlife)
      LegalSlug.tsx            # /legal-pages/:slug — 2
      NotFound.tsx             # 404
  public/
    assets/{images,fonts,videos}  # 648 files verbatim (from cloned_site/assets)
    framerusercontent/sites/4I8jtuL0GyWoXILTgNi7Sz/*.mjs  # 81 files verbatim (74 mjs+5 js+2 json, SHA256)
  dist/                         # vite build result — 52 html + assets — deploy to Cloudflare
```

Script: `py transpile_to_vite.py [SRC=cloned_site] [DST=travelio-vite]` — single file <400 LOC, deps only `requests`+`bs4`, no Tailwind rebuild.

No new npm deps beyond Vite+React. Vite is static file server around Framer React 18.

**Decision:** One `main.tsx` router (BrowserRouter for dev, static `dist/<route>/index.html` folders for `vite build` — trailingSlash equivalent via folder structure). No SSR.

---

## 2. Transform Pipeline (transpile_to_vite.py)

- **Input:** `cloned_site/` frozen — read `**/index.html` bodies via `bs4`, NO stripping of `data-framer-hydrate-v2` / `__framer__handoverData` / `style[data-framer-*]`.
- **Verbatim copy:** `cloned_site/assets → travelio-vite/public/assets` + `cloned_site/framerusercontent → travelio-vite/public/framerusercontent` (81 files, SHA256). No image optimization.
- **Per-slug shells:** For each frozen route (`/`, `/about`, `/tours/:slug` 19, `/location/:slug` 9, `/blog/:slug` 7, `/categories/:slug` 5, `/legal-pages/:slug` 2) script writes TSX with:
  ```tsx
  export const slugs = ["cherry-blossoms-kyoto-nara", ...19];
  const PAGE_HTML = "<!-- body innerHTML from cloned_site/tours/<slug>/index.html -->";
  export default function ToursSlug({slug}) {
    useEffect(()=>{ /* motion hydrate — no opacity blanket */ },[]);
    return <div dangerouslySetInnerHTML={{__html: PAGE_HTML}} />;
  }
  ```
  Keeps `PAGE_HTML` as string constant (same 695KB shells as Next.js) — no runtime fetch. One-time fork, per-slug (not home dump).
- **CSS freeze:** `src/index.css` = `@font-face` 318 + tokens `--token-*` + `fogDriftLeft/Center/Right` + `marque` + `hidden-72rtr7/ha1oc5/1hqw9z1` breakpoints, **removes** `backdrop-filter:none` / `[data-framer-appear-id]{opacity:1 !important}` blanket that broke `motion`.

---

## 3. Router & Build (Vite)

- **Router:** `src/main.tsx` `createBrowserRouter([{path:"/", element:<Home/>}, {path:"/tours/:slug", element:<ToursSlug/>}, ...])` — 52 routes. For `vite build` static, emit `dist/tours/cherry-blossoms-kyoto-nara/index.html` folder structure (trailingSlash via dirs), not SPA fallback. No `HashRouter` — Cloudflare respects folder `index.html`.
- **Entry:** `index.html` (Vite) `<div id="root"></div><script type="module" src="/src/main.tsx">` + fonts preconnect, no `next/script` — scripts injected via `useEffect` dynamic `import("/framerusercontent/.../motion.BTFsJANr.mjs")` `type:"module"` to preserve Framer hydration (`react.BlJwgj38.mjs`, `motion`, `framer.C4vrZTSM.mjs`, `script_main.O6xM-HsT.mjs` + `__framer__handoverData` JSON).
- **Config:** `vite.config.ts` `base:"/", build:{outDir:"dist", assetsDir:"assets"}, server:{port:5173}` — `dist/` is Cloudflare artifact. `tsconfig.json` `jsx:react-jsx`, `target:ESNext`.
- **One-time fork:** Slugs hardcoded at build via `fs.readFileSync` fallback + `PAGE_HTML` constants; no CMS fetch at runtime.

---

## 4. Data Flow & Hydration (frozen)

```
cloned_site/index.html
  ├─ <head> fonts + style[data-framer-breakpoint-css] → public/assets/fonts/* + src/index.css
  ├─ <div id="main" data-framer-hydrate-v2> + <script id="__framer__appearAnimationsContent">
  │  + <script id="__framer__handoverData"> → src/pages/*.tsx shells (dangerouslySetInnerHTML)
  └─ 81× framerusercontent/*.mjs + 2× searchIndex-*.json → public/framerusercontent/* (verbatim)
       └─ hydrated in browser by Framer React 18 — Vite does not re-render it
```

`Intl.DateTimeFormat` patch and `script_main` untouched. Breakpoints `72rtr7/ha1oc5/1hqw9z1` preserved.

---

## 5. Error Handling & Fallbacks (static-safe)

- Missing asset → keep Framer `onError` placeholder, no hard 404 page.
- Build-time guard: if `public/framerusercontent` count != `cloned_site` count (81), fail `vite build` with explicit message.
- No API routes — forms fall back to Framer native `action`. No runtime 500 on static host.
- Fonts: keep `font-display:swap` + `unicode-range`.

---

## 6. Testing & Try-Before-Commit Gate

1. `py -m pytest tests/test_vite_freeze.py -v` — runtime synced (81), config has `outDir:"dist"`, `main.tsx` has `createBrowserRouter` + `framerusercontent` inject, `index.css` has no blanket
2. `npm run build --prefix travelio-vite` → `dist/` must contain 52 `*.html` (`/`, `/tours/*` 19, `/location/*` 9, etc.)
3. `py -m http.server 5001 --directory travelio-vite/dist` + browser: zero `published_site_load_error`, 52/52 routes, visual checklist (hero fogDrift, stats 11431j5, slideshow axis-x, search modal, breakpoints 1200/810)
4. **Try locally before commit:** `py transpile_to_vite.py cloned_site travelio-vite && npm install --prefix travelio-vite && npm run build --prefix travelio-vite`

---

## Out of Scope

- Tailwind rebuild (approach C)
- CMS writeback / re-sync
- `next/image` / Vite image optimization
- PWA / Service Worker

---

## Handoff

Approved → `writing-plans` generates execution plan. No implementation until plan approved. Try-before-commit: `vite build` → `dist/` pixel diff vs `cloned_site` via `http.server`.
