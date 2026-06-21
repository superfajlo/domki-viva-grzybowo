/**
 * Favicon + Open Graph z public/images/logo.png (bez modyfikacji źródłowego logo).
 * node scripts/generate-favicons-og.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";
import toIco from "to-ico";

const ROOT = process.cwd();
const LOGO = path.join(ROOT, "public", "images", "logo.png");
const HEADER_LOGO = path.join(ROOT, "public", "images", "logo-header.webp");
const HERO = path.join(ROOT, "public", "images", "hero", "domki-viva-glowne.webp");
const PUBLIC = path.join(ROOT, "public");
const APP = path.join(ROOT, "app");
const OG_OUT = path.join(ROOT, "public", "images", "og-domki-viva.webp");

if (!fs.existsSync(LOGO) && !fs.existsSync(HEADER_LOGO)) {
  console.error("Brak logo:", LOGO, "lub", HEADER_LOGO);
  process.exit(1);
}

/** Logo z przezroczystym czarnym tłem – tylko do eksportu favicon/OG */
function logoWithTransparentBg(input = sharp(LOGO)) {
  return input.ensureAlpha().png().toBuffer().then(async (png) => {
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

/** Ikona do favicon – domki z poziomego logo header lub fallback logo.png */
async function logoForIcon() {
  if (fs.existsSync(HEADER_LOGO)) {
    const meta = await sharp(HEADER_LOGO).metadata();
    const w = meta.width ?? 1024;
    const h = meta.height ?? 511;
    const cropW = Math.round(w * 0.42);
    return sharp(HEADER_LOGO).extract({ left: 0, top: 0, width: cropW, height: h }).ensureAlpha();
  }

  const meta = await sharp(LOGO).metadata();
  const w = meta.width ?? 1024;
  const h = meta.height ?? 682;

  if (w > h * 1.15) {
    const cropH = Math.round(h * 0.58);
    return logoWithTransparentBg(
      sharp(LOGO).extract({ left: 0, top: 0, width: w, height: cropH }),
    );
  }

  return logoWithTransparentBg();
}

function iconBackgroundSvg(size) {
  const radius = Math.round(size * 0.2);
  const stroke = Math.max(1, Math.round(size / 28));
  return `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ffd84d"/>
          <stop offset="45%" style="stop-color:#f7c600"/>
          <stop offset="100%" style="stop-color:#e5a800"/>
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${radius}" fill="url(#g)"/>
      <rect width="${size}" height="${size}" rx="${radius}" fill="none" stroke="#c98900" stroke-width="${stroke}"/>
    </svg>`;
}

async function squareIcon(size) {
  const padding = Math.max(2, Math.round(size * 0.1));
  const inner = size - padding * 2;

  const logoSrc = await logoForIcon();
  const logo = await logoSrc
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const bg = await sharp(Buffer.from(iconBackgroundSvg(size))).png().toBuffer();

  return sharp(bg).composite([{ input: logo, gravity: "centre" }]).png().toBuffer();
}

async function writeOgImage() {
  const width = 1200;
  const height = 630;

  if (fs.existsSync(HERO)) {
    await sharp(HERO)
      .resize(width, height, { fit: "cover", position: "centre" })
      .webp({ quality: 85 })
      .toFile(OG_OUT);

    const stat = fs.statSync(OG_OUT);
    console.log("✓", path.relative(ROOT, OG_OUT), `z hero (${(stat.size / 1024).toFixed(1)} KB)`);
    return;
  }

  const logoMax = 900;

  const logoSrc = await logoWithTransparentBg();
  const logo = await logoSrc
    .resize(logoMax, Math.round(logoMax * 0.66), {
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

/** Prawdziwy favicon.ico (16 + 32 px) – PNG pod .ico daje czarną/broken ikonę w części przeglądarek */
async function writeFaviconIco(icon16, icon32) {
  const ico = await toIco([icon16, icon32]);
  for (const dir of [PUBLIC, APP]) {
    const icoPath = path.join(dir, "favicon.ico");
    fs.writeFileSync(icoPath, ico);
    console.log("✓", path.relative(ROOT, icoPath), `(${(ico.length / 1024).toFixed(1)} KB)`);
  }
}

async function writeAppIcons(icon32, icon180) {
  fs.mkdirSync(APP, { recursive: true });
  fs.writeFileSync(path.join(APP, "icon.png"), icon32);
  fs.writeFileSync(path.join(APP, "apple-icon.png"), icon180);
  console.log("✓", "app/icon.png", `(${(icon32.length / 1024).toFixed(1)} KB)`);
  console.log("✓", "app/apple-icon.png", `(${(icon180.length / 1024).toFixed(1)} KB)`);
}

console.log(
  "Źródło:",
  fs.existsSync(HEADER_LOGO) ? path.relative(ROOT, HEADER_LOGO) : path.relative(ROOT, LOGO),
);

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

await writeFaviconIco(icon16, icon32);
await writeAppIcons(icon32, icon180);
await writeOgImage();
console.log("\nGotowe.");
