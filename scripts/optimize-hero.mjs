/**
 * Hero z przesłanego zdjęcia drona → WebP (bez powiększania, max. jakość).
 * Źródło: assets/hero-drone-source.png (kopia pliku od właściciela).
 * node scripts/optimize-hero.mjs [opcjonalna-ścieżka]
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const MAX_WIDTH = 2560;
const WEBP_QUALITY = 94;
const OUT_DIR = path.join(process.cwd(), "public", "images", "hero");
const OUT_FILE = path.join(OUT_DIR, "grzybowo-wybrzeze-dron.webp");

const source =
  process.argv[2] || path.join(process.cwd(), "assets", "hero-drone-source.png");

if (!fs.existsSync(source)) {
  console.error("Brak pliku źródłowego:", source);
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const input = sharp(source, { failOn: "none" }).rotate();
const meta = await input.metadata();

await input
  .resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
    fit: "inside",
  })
  .webp({
    quality: WEBP_QUALITY,
    effort: 6,
    smartSubsample: true,
  })
  .toFile(OUT_FILE);

const outMeta = await sharp(OUT_FILE).metadata();
const bytes = fs.statSync(OUT_FILE).size;

console.log("Źródło:", source);
console.log(`Wejście: ${meta.width}x${meta.height} (${meta.format})`);
console.log(`Wyjście: ${outMeta.width}x${outMeta.height} WebP q${WEBP_QUALITY}`);
console.log(`Rozmiar: ${(bytes / 1024).toFixed(1)} KB`);
console.log("Zapisano:", OUT_FILE);
