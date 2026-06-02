/**
 * WebP dla plików używanych w lib/gallery-images.ts (bez prefiksów 01-, th*).
 * node scripts/optimize-gallery-viva.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const FILES = [
  "grzybowo-1.jpg",
  "parter.jpg",
  "parter-2.jpg",
  "parter-3.jpg",
  "gora.jpg",
  "gora-1.jpg",
  "lazienka.jpg",
  "domki-viva-banner-1.jpg",
  "kolobrzeg.jpg",
  ...Array.from({ length: 17 }, (_, i) => `okolica-${i + 1}.jpg`),
];

const DIR = path.join(process.cwd(), "public", "images", "viva");
const MAX_WIDTH = 1600;
const QUALITY = 82;

for (const file of FILES) {
  const src = path.join(DIR, file);
  if (!fs.existsSync(src)) {
    console.warn("Pominięto (brak):", file);
    continue;
  }
  const out = path.join(DIR, file.replace(/\.jpe?g$/i, ".webp"));
  const before = fs.statSync(src).size;
  await sharp(src).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true, fit: "inside" })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(out);
  const after = fs.statSync(out).size;
  console.log(`${file} → ${(after / 1024).toFixed(0)} KB (było ${(before / 1024).toFixed(0)} KB)`);
}

console.log("Gotowe.");
