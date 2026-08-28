#!/usr/bin/env python3
"""Transform any localized Framer cloned_site folder to Next.js 15 - reusable for all sites like this."""
import sys, pathlib
# Add current dir to path to import the transpiler
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from website_localizer_v2 import transpile_to_nextjs

if __name__ == '__main__':
    src = sys.argv[1] if len(sys.argv)>1 else 'cloned_site'
    out = sys.argv[2] if len(sys.argv)>2 else 'nextjs_export'
    print(f'Transpiling {src} -> {out}')
    transpile_to_nextjs(src, out)
    print(f'Done. cd {out} && npm install && npm run dev')
