"""Sync Framer runtime verbatim: cloned_site/framerusercontent -> nextjs_export/public/framerusercontent"""
import shutil
import pathlib

src = pathlib.Path("cloned_site/framerusercontent")
dst = pathlib.Path("nextjs_export/public/framerusercontent")

if not src.exists():
    raise SystemExit(f"Source not found: {src.resolve()}")

if dst.exists():
    shutil.rmtree(dst)

shutil.copytree(src, dst)

# verify verbatim: no renaming, no optimization
copied = len(list(dst.rglob("*")))
src_files = len(list(src.rglob("*")))
print(f"Copied {copied} entries ({len(list(dst.rglob('*.mjs')))} mjs, {len(list(dst.rglob('*.json')))} json) from {src} to {dst}")
print(f"Source entries: {src_files}, Dest entries: {copied}")
# hash check optional
import hashlib

def file_hash(p: pathlib.Path) -> str:
    return hashlib.sha256(p.read_bytes()).hexdigest()

mismatches = []
for s in src.rglob("*"):
    if s.is_file():
        rel = s.relative_to(src)
        d = dst / rel
        if not d.exists():
            mismatches.append(f"missing {rel}")
        elif file_hash(s) != file_hash(d):
            mismatches.append(f"hash mismatch {rel}")

if mismatches:
    print("VERIFICATION FAILED:")
    for m in mismatches:
        print(f"  - {m}")
    raise SystemExit(1)
else:
    print("Verification: all files verbatim, hashes match.")
