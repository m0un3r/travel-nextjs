#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_ALLOWED_BYTES = 1_000_000; // 1MB threshold

const IGNORE_DIRS = new Set([
  'node_modules',
  'dist',
  'dist-ssr',
  '.git',
  'coverage',
  '.agents',
  '.superpowers',
  '.pytest_cache',
  'cloned_site',
  'nextjs_export',
  'travelio-vite'
]);

const IGNORE_EXTENSIONS = new Set([
  '.zip',
  '.mp4',
  '.mov',
  '.avi',
  '.mkv',
  '.webm',
  '.tar.gz',
  '.rar',
  '.7z',
  '.tsbuildinfo'
]);

function isIgnoredFile(filename) {
  if (filename.startsWith('.env') && !filename.endsWith('.example')) return true;
  if (filename.startsWith('test_out') && filename.endsWith('.txt')) return true;
  for (const ext of IGNORE_EXTENSIONS) {
    if (filename.endsWith(ext)) return true;
  }
  return false;
}

function scanDirectory(dir, baseDir = dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(baseDir, fullPath);

    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) {
        continue;
      }
      results.push(...scanDirectory(fullPath, baseDir));
    } else if (entry.isFile()) {
      if (isIgnoredFile(entry.name)) {
        continue;
      }
      const stat = fs.statSync(fullPath);
      results.push({
        path: relPath.replace(/\\/g, '/'),
        sizeBytes: stat.size,
        sizeKB: (stat.size / 1024).toFixed(2),
        sizeMB: (stat.size / (1024 * 1024)).toFixed(4)
      });
    }
  }

  return results;
}

const targetDir = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
console.log(`=======================================================`);
console.log(`  Travelio Pre-Push File Size Audit`);
console.log(`  Target Directory: ${targetDir}`);
console.log(`  Max Allowed File Size: ${MAX_ALLOWED_BYTES.toLocaleString()} bytes (1MB)`);
console.log(`=======================================================\n`);

const files = scanDirectory(targetDir);
files.sort((a, b) => b.sizeBytes - a.sizeBytes);

const violations = files.filter(f => f.sizeBytes > MAX_ALLOWED_BYTES);

console.log(`Scanned ${files.length} tracked/deployable files.\n`);
console.log(`Top 10 Largest Files:`);
console.log(`-------------------------------------------------------`);
files.slice(0, 10).forEach((f, idx) => {
  console.log(`  ${idx + 1}. [${f.sizeBytes.toLocaleString().padStart(9)} B / ${f.sizeKB.padStart(7)} KB] ${f.path}`);
});
console.log(`-------------------------------------------------------\n`);

if (violations.length > 0) {
  console.error(`❌ FAILED: Found ${violations.length} file(s) exceeding 1MB limit:`);
  violations.forEach(v => {
    console.error(`  - ${v.path}: ${v.sizeBytes.toLocaleString()} bytes (${v.sizeMB} MB)`);
  });
  process.exit(1);
} else {
  console.log(`✅ SUCCESS: ZERO files exceed 1,000,000 bytes (1MB).`);
  console.log(`All ${files.length} files comply with Google AI Studio repository constraints.`);
  process.exit(0);
}
