/**
 * Logo w menu – usuwa białe tło (flood fill), zapis WebP.
 * node scripts/process-header-logo.mjs [źródło.png]
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "images", "logo-header.webp");
const DEFAULT_SRC = path.join(ROOT, "public", "images", "logo-header-source.png");

const input = process.argv[2] || DEFAULT_SRC;

if (!fs.existsSync(input)) {
  console.error("Brak pliku:", input);
  process.exit(1);
}

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const w = info.width;
const h = info.height;
const visited = new Uint8Array(w * h);

function idx(x, y) {
  return (y * w + x) * 4;
}

function isBackgroundPixel(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max > 248 && max - min < 12) return true;
  if (max > 235 && max - min < 18) return true;
  return false;
}

const queue = [];

for (let x = 0; x < w; x++) {
  queue.push([x, 0], [x, h - 1]);
}
for (let y = 0; y < h; y++) {
  queue.push([0, y], [w - 1, y]);
}

while (queue.length) {
  const [x, y] = queue.pop();
  if (x < 0 || y < 0 || x >= w || y >= h) continue;
  const p = y * w + x;
  if (visited[p]) continue;

  const i = idx(x, y);
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  if (!isBackgroundPixel(r, g, b)) continue;

  visited[p] = 1;
  data[i + 3] = 0;

  queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
}

await sharp(data, {
  raw: { width: w, height: h, channels: 4 },
})
  .webp({ quality: 90, effort: 6 })
  .toFile(OUT);

console.log("✓", path.relative(ROOT, OUT), `${w}×${h}`);
