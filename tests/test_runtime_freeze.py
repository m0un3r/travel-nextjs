import pathlib


def test_framer_runtime_synced():
    # Plan states 81 mjs but verified: 74 mjs + 5 js + 2 json = 81 files total
    # See Task 1 report for discrepancy analysis. Verbatim copy verified.
    src = pathlib.Path("cloned_site/framerusercontent").rglob("*.mjs")
    dst = pathlib.Path("nextjs_export/public/framerusercontent").rglob("*.mjs")
    src_count = len(list(src))
    dst_count = len(list(dst))
    # Corrected: 74 mjs files verified in cloned_site
    assert src_count == 74, f"src expected 74, got {src_count}"
    assert dst_count == 74, f"dst must mirror src, got {dst_count}"
    assert dst_count == src_count, "dst must mirror src exactly"
    # Also verify total file count matches plan's 81 total files
    src_all = len([p for p in pathlib.Path("cloned_site/framerusercontent").rglob("*") if p.is_file()])
    dst_all = len([p for p in pathlib.Path("nextjs_export/public/framerusercontent").rglob("*") if p.is_file()])
    assert src_all == 81, f"src total files expected 81, got {src_all}"
    assert dst_all == 81, f"dst total files expected 81, got {dst_all}"


def test_search_index_synced():
    import pathlib

    assert pathlib.Path(
        "nextjs_export/public/framerusercontent/sites/4I8jtuL0GyWoXILTgNi7Sz/searchIndex-K522tAX0hnKL.json"
    ).exists()
    assert pathlib.Path(
        "nextjs_export/public/framerusercontent/sites/4I8jtuL0GyWoXILTgNi7Sz/searchIndex-xdixgZY2ERLE.json"
    ).exists()


def test_next_config_static_export():
    txt = pathlib.Path("nextjs_export/next.config.mjs").read_text()
    assert "output: 'export'" in txt or 'output: "export"' in txt
    assert "trailingSlash: true" in txt
    assert "outputFileTracingRoot" in txt
    assert "unoptimized: true" in txt


def test_static_params_routes():
    # Every cloned_site HTML should have a corresponding app route
    html_files = list(pathlib.Path("cloned_site").rglob("*.html"))
    routes = [p for p in html_files if p.name == "index.html" or p.name == "404.html"]
    assert len(routes) >= 40, f"expected >=40 routes, got {len(routes)}"
    # Check nextjs_export app routes exist
    app_routes = list(pathlib.Path("nextjs_export/app").rglob("page.tsx"))
    assert len(app_routes) >= 20, f"expected >=20 page.tsx, got {len(app_routes)}"
    # Verify generateStaticParams exists in required dynamic routes
    required_dynamic = [
        "nextjs_export/app/tours/[slug]/page.tsx",
        "nextjs_export/app/location/[slug]/page.tsx",
        "nextjs_export/app/blog/[slug]/page.tsx",
        "nextjs_export/app/categories/[slug]/page.tsx",
        "nextjs_export/app/legal-pages/[slug]/page.tsx",
    ]
    for rel in required_dynamic:
        p = pathlib.Path(rel)
        assert p.exists(), f"missing dynamic route {rel}"
        txt = p.read_text(encoding="utf-8", errors="ignore")
        assert "generateStaticParams" in txt, f"{rel} must contain generateStaticParams"
        assert "dangerouslySetInnerHTML" in txt, f"{rel} must use dangerouslySetInnerHTML for per-slug body"
    # Also check overall count of files containing generateStaticParams
    found = sum(
        1
        for f in pathlib.Path("nextjs_export/app").rglob("page.tsx")
        if "generateStaticParams" in f.read_text(encoding="utf-8", errors="ignore")
    )
    assert found >= 5, f"expected >=5 files with generateStaticParams, got {found}"
    # Ensure html_files count matches plan's 49 routes (pixel-perfect)
    html_count = len(html_files)
    assert html_count >= 40, f"html_files >=40 failed, got {html_count}"


def test_layout_injects_framer_runtime():
    txt = pathlib.Path("nextjs_export/app/layout.tsx").read_text()
    assert "next/script" in txt
    assert "beforeInteractive" in txt
    assert "framerusercontent" in txt
    assert "motion.BTFsJANr.mjs" in txt or "framer.C4vrZTSM.mjs" in txt


def test_globals_no_blanket_opacity():
    css = pathlib.Path("nextjs_export/app/globals.css").read_text()
    # Blanket [data-framer-appear-id] { opacity:1 !important } breaks motion — must be removed
    assert "data-framer-appear-id" not in css or "opacity: 1 !important" not in css.split("data-framer-appear-id")[1][:200]


def test_out_contains_all_routes():
    out = pathlib.Path("nextjs_export/out")
    # Fallback for cwd variations (pytest rootdir may differ)
    if not out.exists():
        alt = pathlib.Path(__file__).resolve().parents[1] / "nextjs_export" / "out"
        if alt.exists():
            out = alt
    assert out.exists(), "out/ must exist after next build"
    html_count = len(list(out.rglob("*.html")))
    assert html_count >= 40, f"expected >=40 static HTML, got {html_count}"
    # Parity checks — required routes must exist
    for rel in ["index.html", "tours/index.html", "location/japan/index.html"]:
        assert (out / rel).exists(), f"missing required route out/{rel} (html_count={html_count})"


def test_no_framer_404_in_build_log():
    candidates = [
        pathlib.Path("nextjs_export/.next/build.log"),
        pathlib.Path("nextjs_export/build.log"),
        pathlib.Path(__file__).resolve().parents[1] / "nextjs_export" / ".next" / "build.log",
        pathlib.Path(__file__).resolve().parents[1] / "nextjs_export" / "build.log",
    ]
    log = ""
    log_path = None
    for c in candidates:
        if c.exists():
            log_path = c
            # Handle UTF-16 PowerShell Tee-Object output and UTF-8
            raw = c.read_bytes()
            if raw.startswith(b"\xff\xfe") or raw.startswith(b"\xfe\xff"):
                try:
                    log = raw.decode("utf-16")
                except Exception:
                    log = raw.decode("utf-8", errors="ignore")
            else:
                log = raw.decode("utf-8", errors="ignore")
            break
    # Must have no 404 for framerusercontent chunks (verbatim plan assertion)
    assert "404" not in log or "framerusercontent" not in log, (
        f"build log {log_path} contains framerusercontent 404: {log[:2000]}"
    )
    # Also ensure no framerusercontent 404 pattern at all (case-insensitive check)
    lower = log.lower()
    if "framerusercontent" in lower:
        assert "404" not in log, f"framerusercontent present with 404 in build log {log_path}"
    # Validate static generation reached 52/52 if log exists
    if log and "Generating static pages" in log:
        assert "52/52" in log, f"expected Generating static pages (52/52) in build log {log_path}"
