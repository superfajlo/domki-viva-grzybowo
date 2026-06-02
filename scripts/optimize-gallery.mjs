/**
 * Konwersja galerii JPG → WebP (max 1600px, q82). Zachowuje nazwy plików.
 * node scripts/optimize-gallery.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const SRC_DIR = path.join(process.cwd(), "public", "images", "viva");
const MAX_WIDTH = 1600;
const QUALITY = 82;

if (!fs.existsSync(SRC_DIR)) {
  console.error("Brak katalogu:", SRC_DIR);
  process.exit(1);
}

const jpgs = fs.readdirSync(SRC_DIR).filter((f) => /\.jpe?g$/i.test(f));
let saved = 0;

for (const file of jpgs) {
  const src = path.join(SRC_DIR, file);
  const out = path.join(SRC_DIR, file.replace(/\.jpe?g$/i, ".webp"));
  const before = fs.statSync(src).size;

  await sharp(src, { failOn: "none" })
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true, fit: "inside" })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(out);

  const after = fs.statSync(out).size;
  saved += before - after;
  console.log(`${file} → ${path.basename(out)}: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB`);
}

console.log(`\nGotowe: ${jpgs.length} plików, oszczędność ~${(saved / 1024 / 1024).toFixed(2)} MB`);
