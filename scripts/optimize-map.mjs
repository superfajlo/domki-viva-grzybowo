import fs from "fs";
import path from "path";
import sharp from "sharp";

const MAX_WIDTH = 1920;
const WEBP_QUALITY = 90;
const OUT_DIR = path.join(process.cwd(), "public", "images", "atrakcje");
const OUT_FILE = path.join(OUT_DIR, "mapa-grzybowo.webp");

const source = process.argv[2] || path.join(process.cwd(), "assets", "mapa-grzybowo-source.png");

if (!fs.existsSync(source)) {
  console.error("Brak pliku:", source);
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const meta = await sharp(source).rotate().metadata();
await sharp(source)
  .rotate()
  .resize({ width: MAX_WIDTH, withoutEnlargement: true, fit: "inside" })
  .webp({ quality: WEBP_QUALITY, effort: 6 })
  .toFile(OUT_FILE);

const out = await sharp(OUT_FILE).metadata();
const kb = (fs.statSync(OUT_FILE).size / 1024).toFixed(1);
console.log(`Wejście: ${meta.width}x${meta.height}`);
console.log(`Wyjście: ${out.width}x${out.height}, ${kb} KB`);
console.log(OUT_FILE);
