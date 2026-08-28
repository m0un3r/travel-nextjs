const fs = require('fs');
const path = require('path');

function analyzeAssets(baseDir) {
    const results = [];
    
    function walk(dir) {
        if (!fs.existsSync(dir)) return;
        const list = fs.readdirSync(dir, { withFileTypes: true });
        list.forEach(item => {
            const fullPath = path.join(dir, item.name);
            if (item.isDirectory()) {
                walk(fullPath);
            } else {
                const stat = fs.statSync(fullPath);
                results.push({
                    path: fullPath,
                    relPath: path.relative(baseDir, fullPath),
                    name: item.name,
                    sizeBytes: stat.size,
                    sizeKB: (stat.size / 1024).toFixed(2),
                    sizeMB: (stat.size / (1024 * 1024)).toFixed(2),
                    ext: path.extname(item.name).toLowerCase()
                });
            }
        });
    }

    walk(baseDir);
    return results;
}

const assets = analyzeAssets('cloned_site/assets');
console.log(`Total assets in cloned_site/assets: ${assets.length}`);

// Group by extension
const byExt = {};
let totalBytes = 0;
assets.forEach(a => {
    byExt[a.ext] = byExt[a.ext] || { count: 0, totalBytes: 0, largest: null };
    byExt[a.ext].count++;
    byExt[a.ext].totalBytes += a.sizeBytes;
    if (!byExt[a.ext].largest || a.sizeBytes > byExt[a.ext].largest.sizeBytes) {
        byExt[a.ext].largest = a;
    }
    totalBytes += a.sizeBytes;
});

console.log('--- BY EXTENSION ---');
Object.keys(byExt).forEach(ext => {
    const info = byExt[ext];
    console.log(`${ext}: ${info.count} files, ${(info.totalBytes / (1024 * 1024)).toFixed(2)} MB, Largest: ${info.largest.name} (${info.largest.sizeKB} KB)`);
});
console.log(`Total Assets Size: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`);

const largeAssets = assets.filter(a => a.sizeBytes > 1024 * 1024);
console.log(`--- ASSETS > 1MB (${largeAssets.length}) ---`);
largeAssets.forEach(a => {
    console.log(`- ${a.relPath}: ${a.sizeMB} MB (${a.ext})`);
});

const midAssets = assets.filter(a => a.sizeBytes > 500 * 1024 && a.sizeBytes <= 1024 * 1024);
console.log(`--- ASSETS 500KB - 1MB (${midAssets.length}) ---`);
midAssets.forEach(a => {
    console.log(`- ${a.relPath}: ${a.sizeKB} KB (${a.ext})`);
});
