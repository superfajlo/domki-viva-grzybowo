/**
 * Usuwa czarne/białe tło z logo → public/images/logo.png (przezroczyste PNG).
 * node scripts/process-logo-bg.mjs [ścieżka-do-źródła]
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "images", "logo.png");
const SOURCE_COPY = path.join(ROOT, "public", "images", "logo-source.png");

const input =
  process.argv[2] ||
  [SOURCE_COPY, OUT].find((p) => fs.existsSync(p)) ||
  null;

if (!input) {
  console.error("Brak pliku źródłowego logo.");
  process.exit(1);
}

if (input !== SOURCE_COPY && input !== OUT) {
  fs.copyFileSync(input, SOURCE_COPY);
}

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  // Czarne i bardzo ciemne tło
  if (max < 42) {
    data[i + 3] = 0;
    continue;
  }
  // Ciemnoszare, mało nasycone piksele tła
  if (max < 72 && max - min < 28) {
    data[i + 3] = 0;
    continue;
  }

  // Białe tło (gdyby było)
  if (r > 245 && g > 245 && b > 245) {
    data[i + 3] = 0;
    continue;
  }
  if (min > 235) {
    data[i + 3] = Math.min(data[i + 3], Math.floor((255 - min) * 5));
  }
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log("✓", path.relative(ROOT, OUT), `${info.width}×${info.height}, przezroczyste tło`);
