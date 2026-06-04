/**
 * Favicon + Open Graph z public/images/logo.png (bez modyfikacji źródłowego logo).
 * node scripts/generate-favicons-og.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const LOGO = path.join(ROOT, "public", "images", "logo.png");
const PUBLIC = path.join(ROOT, "public");
const OG_OUT = path.join(ROOT, "public", "images", "og-domki-viva.webp");

/** Identyfikacja wizualna strony */
const BRAND_CREAM = { r: 255, g: 249, b: 232, alpha: 1 };

if (!fs.existsSync(LOGO)) {
  console.error("Brak logo:", LOGO);
  process.exit(1);
}

/** Logo z przezroczystym czarnym tłem – tylko do eksportu favicon/OG */
function logoWithTransparentBg() {
  return sharp(LOGO).ensureAlpha().png().toBuffer().then(async (png) => {
    const { data, info } = await sharp(png)
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (r < 45 && g < 45 && b < 45) {
        data[i + 3] = 0;
      }
    }

    return sharp(data, {
      raw: { width: info.width, height: info.height, channels: 4 },
    });
  });
}

async function squareIcon(size) {
  const padding = Math.max(2, Math.round(size * 0.1));
  const inner = size - padding * 2;

  const logoSrc = await logoWithTransparentBg();
  const logo = await logoSrc
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: BRAND_CREAM },
  })
    .composite([{ input: logo, gravity: "centre" }])
    .png()
    .toBuffer();
}

async function writeOgImage() {
  const width = 1200;
  const height = 630;
  const logoMax = 320;

  const logoSrc = await logoWithTransparentBg();
  const logo = await logoSrc
    .resize(logoMax, logoMax, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const gradientSvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#fff9e8"/>
          <stop offset="45%" style="stop-color:#ffffff"/>
          <stop offset="100%" style="stop-color:#ffd84d"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>`;

  const bg = await sharp(Buffer.from(gradientSvg)).png().toBuffer();

  await sharp(bg)
    .composite([{ input: logo, gravity: "centre" }])
    .webp({ quality: 88 })
    .toFile(OG_OUT);

  const stat = fs.statSync(OG_OUT);
  console.log("✓", path.relative(ROOT, OG_OUT), `(${(stat.size / 1024).toFixed(1)} KB)`);
}

/** favicon.ico – PNG 32×32 (sharp); 16×16 osobno w metadata */
async function writeFaviconIco(png32Buffer) {
  const icoPath = path.join(PUBLIC, "favicon.ico");
  await sharp(png32Buffer).png().toFile(icoPath);
  const stat = fs.statSync(icoPath);
  console.log("✓", path.relative(ROOT, icoPath), `(${(stat.size / 1024).toFixed(1)} KB)`);
}

console.log("Źródło:", path.relative(ROOT, LOGO));

const icon16 = await squareIcon(16);
const icon32 = await squareIcon(32);
const icon180 = await squareIcon(180);

fs.writeFileSync(path.join(PUBLIC, "favicon-16x16.png"), icon16);
fs.writeFileSync(path.join(PUBLIC, "favicon-32x32.png"), icon32);
fs.writeFileSync(path.join(PUBLIC, "apple-touch-icon.png"), icon180);

for (const [name, buf] of [
  ["favicon-16x16.png", icon16],
  ["favicon-32x32.png", icon32],
  ["apple-touch-icon.png", icon180],
]) {
  console.log("✓", `public/${name}`, `(${(buf.length / 1024).toFixed(1)} KB)`);
}

await writeFaviconIco(icon32);
await writeOgImage();
console.log("\nGotowe.");
