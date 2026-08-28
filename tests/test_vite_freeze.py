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
