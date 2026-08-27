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
