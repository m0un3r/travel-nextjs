# Final Fix Report — Framer Runtime Freeze (2026-08-28)

**BASE:** 70491f6834d4f6ed9c7f09a527535e65fcd220d3
**Date:** 2026-08-28
**Review package:** `review-final.md` (Important 1-3 + Minor .gitattributes)

## Findings Fixed

### Important 1 — CWD-dependent test paths (flaky CI)
- **Before:** `tests/test_runtime_freeze.py:7-8,25-26,34,43,57` used `Path("cloned_site/...")` / `Path("nextjs_export/...")` relative to cwd. Only `test_out_contains_all_routes` and `test_no_framer_404_in_build_log` had fallback via `Path(__file__).parents[1]`.
- **Fix:** Introduced `ROOT = Path(__file__).resolve().parents[1]` at module top and rewrote ALL path asserts to `ROOT / "cloned_site/..."` and `ROOT / "nextjs_export/..."`. Removed redundant cwd-fallback branching; `test_out_contains_all_routes` now directly `ROOT / "nextjs_export/out"`, `test_no_framer_404_in_build_log` candidates reduced to `ROOT / "nextjs_export/.next/build.log"` etc. All reads use explicit `encoding="utf-8"`.
- **Verification:** `py -m pytest tests/test_runtime_freeze.py -v` from `C:\Users\GLYTSHU\Desktop\MuseSpark` → 8 passed; `py -m pytest C:\Users\GLYTSHU\Desktop\MuseSpark\tests\test_runtime_freeze.py -v` from `C:\Users\GLYTSHU\Desktop` → 8 passed (cwd-independent).

### Important 2 — Duplicate concrete+dynamic routes (deferred, document)
- **Status:** No code deletion; documented as intentional.
- **Fix:** Added header comment to `nextjs_export/app/tours/[slug]/page.tsx` explaining concrete shells at `app/tours/<slug>/page.tsx` shadow the dynamic `[slug]` route but both exist for pre-render guarantee; noted 52 vs 42 is 19 tours + 9 locations + categories/blog/legal/static/404. Updated `docs/superpowers/plans/2026-08-28-framer-runtime-freeze-plan.md` Task 3 & Task 5 interfaces/steps to state 52 HTML (was 42) with breakdown and shadow note. Deferred deletion kept as minor.

### Important 3 — Location count 9 vs spec 6
- **Before:** `docs/superpowers/specs/2026-08-28-framer-runtime-freeze-design.md` §3 listed 6 locations (`japan`, `morocco`, `iceland`, `maldives`, `china`, `tanzania`) and header `location/page.tsx + location/[tnVufIJO5]/page.tsx   # 6 locations`.
- **Fix:** Updated §3 to 9 (`brazil`, `canada`, `china`, `iceland`, `japan`, `maldives`, `morocco`, `tanzania`, `usa`) and header comment to `# 9 locations (brazil, canada, china, iceland, japan, maldives, morocco, tanzania, usa)`. Verified via `cloned_site/location` dirs = 9, `tours` = 19.

### Minor — .gitattributes (CRLF prevention)
- **Fix:** Created `/.gitattributes` and `nextjs_export/.gitattributes` with `*.mjs text eol=lf`, `*.js text eol=lf`, `*.json text eol=lf` to prevent CRLF corruption on Windows for Framer mjs chunks.

### Deferred (not fixed)
- Duplicate `@font-face` bloat — kept deferred per instructions.

##Verification
- `py -m pytest tests/test_runtime_freeze.py -v` from MuseSpark: 8 passed
- `py -m pytest C:\Users\GLYTSHU\Desktop\MuseSpark\tests\test_runtime_freeze.py -v` from Desktop: 8 passed
- `npm run build` in `nextjs_export`: `Generating static pages (52/52)` — `out` contains 52 `*.html` (python rglob count = 52), includes `/tours/*` x19, `/location/*` x9, `/blog/*` x6, `/categories/*` x5, `/legal-pages/*` x2, plus static/404.

## Files Changed
- `tests/test_runtime_freeze.py` (ROOT-based paths)
- `nextjs_export/app/tours/[slug]/page.tsx` (header comment)
- `docs/superpowers/plans/2026-08-28-framer-runtime-freeze-plan.md` (52 vs 42 notes)
- `docs/superpowers/specs/2026-08-28-framer-runtime-freeze-design.md` (§3 6→9)
- `.gitattributes` (new)
- `nextjs_export/.gitattributes` (new)

## Commit
Single commit on top of 70491f6 with all above.
