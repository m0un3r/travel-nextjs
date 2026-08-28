import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]


def test_vite_config():
    import pathlib
    ROOT = pathlib.Path(__file__).resolve().parents[1]
    assert (ROOT / "travelio-vite/vite.config.ts").exists()
    txt = (ROOT / "travelio-vite/vite.config.ts").read_text(encoding="utf-8")
    assert 'outDir' in txt and "'dist'" in txt or '"dist"' in txt
    assert "base: '/'" in txt or 'base: "/"' in txt
    assert "react()" in txt


def test_framer_runtime_synced_vite():
    import pathlib
    ROOT = pathlib.Path(__file__).resolve().parents[1]
    src = list((ROOT / "cloned_site/framerusercontent").rglob("*.mjs"))
    dst = list((ROOT / "travelio-vite/public/framerusercontent").rglob("*.mjs"))
    assert len(src) == 74
    assert len(dst) == 74
    assert (ROOT / "travelio-vite/public/framerusercontent/sites/4I8jtuL0GyWoXILTgNi7Sz/searchIndex-K522tAX0hnKL.json").exists()


def test_vite_pages_generate_static_params():
    import pathlib
    ROOT = pathlib.Path(__file__).resolve().parents[1]
    # Check dynamic shells exist and have per-slug slugs
    tours = (ROOT / "travelio-vite/src/pages/ToursSlug.tsx").read_text()
    assert "createBrowserRouter" in (ROOT / "travelio-vite/src/main.tsx").read_text() or "BrowserRouter" in (ROOT / "travelio-vite/src/main.tsx").read_text()
    assert "cherry-blossoms-kyoto-nara" in tours
    assert "dangerouslySetInnerHTML" in tours
    assert tours.count("cherry") >= 1  # per-slug not generic


def test_vite_build_dist():
    import pathlib, subprocess
    ROOT = pathlib.Path(__file__).resolve().parents[1]
    dist = ROOT / "travelio-vite/dist"
    assert dist.exists(), "dist must exist after vite build"
    assert len(list(dist.rglob("*.html"))) >= 40
    assert (dist / "index.html").exists()
    assert (dist / "tours" / "index.html").exists()
