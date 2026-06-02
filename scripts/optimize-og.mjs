/**
 * Obraz Open Graph 1200×630 WebP z hero lub logo.
 * node scripts/optimize-og.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const OUT = path.join(process.cwd(), "public", "images", "og-domki-viva.webp");
const hero = path.join(process.cwd(), "public", "images", "hero", "grzybowo-wybrzeze-dron.webp");
const fallback = path.join(process.cwd(), "public", "images", "viva", "grzybowo-1.jpg");

const source = fs.existsSync(hero) ? hero : fallback;
if (!fs.existsSync(source)) {
  console.error("Brak źródła OG:", source);
  process.exit(1);
}

await sharp(source)
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .webp({ quality: 85 })
  .toFile(OUT);

console.log("Zapisano:", OUT, `(${(fs.statSync(OUT).size / 1024).toFixed(1)} KB)`);
