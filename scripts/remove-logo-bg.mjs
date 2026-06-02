import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
const sources = [
  join(dir, "logo-old-site.png"),
  join(dir, "logo-source.png"),
].filter(existsSync);
const input = sources[0];
const output = join(dir, "logo.png");

if (!input) {
  console.error("No logo source found");
  process.exit(1);
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

  // Białe tło
  if (r > 245 && g > 245 && b > 245) {
    data[i + 3] = 0;
    continue;
  }
  // Czarne tło (błąd eksportu / checkerboard)
  if (max < 30) {
    data[i + 3] = 0;
    continue;
  }
  // Bardzo jasne krawędzie
  if (min > 235) {
    data[i + 3] = Math.min(data[i + 3], Math.floor((255 - min) * 4));
  }
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile(output);

console.log("Saved", output, "from", input);
