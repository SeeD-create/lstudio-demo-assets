// 元画像（restaurant-line-demo/menu-image/*.png）を
// 1024x1024以内・JPG quality 88 に圧縮して
// lstudio-demo-assets/restaurant/menu-image/ に書き出す
//
// 使い方: npm run optimize

import sharp from 'sharp';
import { readdirSync, mkdirSync, statSync } from 'fs';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const JOBS = [
  {
    src: join(ROOT, '..', 'restaurant-line-demo', 'menu-image'),
    dst: join(ROOT, 'restaurant', 'menu-image'),
    label: 'restaurant/menu-image',
  },
];

const TARGET_MAX_SIZE = 1024;
const JPEG_QUALITY = 88;

async function run() {
  for (const job of JOBS) {
    mkdirSync(job.dst, { recursive: true });
    const files = readdirSync(job.src).filter(f => /\.(png|jpe?g)$/i.test(f));
    console.log(`\n[${job.label}] ${files.length}枚を最適化`);

    for (const file of files) {
      const srcPath = join(job.src, file);
      const dstFile = basename(file, extname(file)) + '.jpg';
      const dstPath = join(job.dst, dstFile);

      await sharp(srcPath)
        .resize(TARGET_MAX_SIZE, TARGET_MAX_SIZE, { fit: 'inside' })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toFile(dstPath);

      const before = (statSync(srcPath).size / 1024).toFixed(1);
      const after = (statSync(dstPath).size / 1024).toFixed(1);
      const ratio = ((1 - statSync(dstPath).size / statSync(srcPath).size) * 100).toFixed(0);
      console.log(`  ${file.padEnd(50)} ${before.padStart(7)}KB → ${after.padStart(7)}KB (-${ratio}%)`);
    }
  }
  console.log('\n✓ 完了');
}

run().catch(e => { console.error(e); process.exit(1); });
