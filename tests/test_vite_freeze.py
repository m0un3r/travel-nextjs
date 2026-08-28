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
