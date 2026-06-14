/**
 * Galeria + hero: JPG/PNG → WebP, manifest dla lib/gallery-images.ts
 * node scripts/sync-gallery.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const VIVA = path.join(ROOT, "public", "images", "viva");
const MANIFEST = path.join(ROOT, "lib", "gallery-manifest.json");
const HERO_SRC = path.join(VIVA, "glowne", "glowne_zdjecie.jpg");
const HERO_OUT = path.join(ROOT, "public", "images", "hero", "domki-viva-glowne.webp");

const MAX_WIDTH = 1600;
const HERO_MAX_WIDTH = 1600;
const WEBP_QUALITY = 82;
const HERO_QUALITY = 75;

const SECTIONS = [
  {
    id: "obiekt",
    title: "Obiekt",
    description: "Ogród, domki z zewnątrz, plac zabaw i teren Domków Viva w Grzybowie.",
    dir: "obiekt",
    altPrefix: "Domki Viva Grzybowo – widok obiektu",
  },
  {
    id: "wnetrza",
    title: "Wnętrza domków",
    description: "Pokoje, aneks kuchenny i łazienka w domkach letniskowych.",
    dir: "wnetrza",
    altPrefix: "Wnętrze domku Viva Grzybowo",
  },
];

function listSources(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, "pl"));
}

async function toWebp(srcPath, outPath) {
  const input = sharp(srcPath).rotate();
  const meta = await input.metadata();
  await input
    .resize({ width: MAX_WIDTH, withoutEnlargement: true, fit: "inside" })
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toFile(outPath);
  const outMeta = await sharp(outPath).metadata();
  const orientation =
    outMeta.width && outMeta.height && outMeta.height > outMeta.width
      ? "portrait"
      : "landscape";
  return { orientation, bytes: fs.statSync(outPath).size, inBytes: fs.statSync(srcPath).size };
}

async function syncSection(section) {
  const dir = path.join(VIVA, section.dir);
  const sources = listSources(dir);
  const images = [];

  for (const [i, file] of sources.entries()) {
    const index = String(i + 1).padStart(2, "0");
    const outName = `${section.id}-${index}.webp`;
    const srcPath = path.join(dir, file);
    const outPath = path.join(dir, outName);

    const { orientation, bytes, inBytes } = await toWebp(srcPath, outPath);
    images.push({
      src: `/images/viva/${section.dir}/${outName}`,
      alt: `${section.altPrefix}${images.length ? "" : ""} ${i + 1}`,
      orientation,
    });
    console.log(
      `${section.dir}/${file} → ${outName} (${(bytes / 1024).toFixed(0)} KB, było ${(inBytes / 1024 / 1024).toFixed(1)} MB, ${orientation})`,
    );
  }

  // usuń stare webp spoza nowej serii (np. parter.webp)
  if (fs.existsSync(dir)) {
    const keep = new Set(images.map((img) => path.basename(img.src)));
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith(".webp") && !keep.has(f)) {
        fs.unlinkSync(path.join(dir, f));
        console.log("Usunięto stary:", `${section.dir}/${f}`);
      }
    }
  }

  return {
    id: section.id,
    title: section.title,
    description: section.description,
    images,
  };
}

async function syncHero() {
  if (!fs.existsSync(HERO_SRC)) {
    console.warn("Brak hero:", HERO_SRC);
    return null;
  }
  fs.mkdirSync(path.dirname(HERO_OUT), { recursive: true });
  const before = fs.statSync(HERO_SRC).size;
  await sharp(HERO_SRC)
    .rotate()
    .resize({ width: HERO_MAX_WIDTH, withoutEnlargement: true, fit: "inside" })
    .webp({ quality: HERO_QUALITY, effort: 6 })
    .toFile(HERO_OUT);
  const after = fs.statSync(HERO_OUT).size;
  const meta = await sharp(HERO_OUT).metadata();
  console.log(
    `Hero → domki-viva-glowne.webp ${meta.width}x${meta.height} (${(after / 1024).toFixed(0)} KB, było ${(before / 1024 / 1024).toFixed(1)} MB)`,
  );
  return "/images/hero/domki-viva-glowne.webp";
}

// popraw alt – bez podwójnej spacji
function fixAlts(sections) {
  for (const section of sections) {
    section.images = section.images.map((img, i) => ({
      ...img,
      alt: `${SECTIONS.find((s) => s.id === section.id).altPrefix}${section.id === "obiekt" ? "" : ""} – zdjęcie ${i + 1}`,
    }));
  }
  return sections;
}

const sections = fixAlts(await Promise.all(SECTIONS.map(syncSection)));
const heroImage = await syncHero();

const manifest = {
  generatedAt: new Date().toISOString(),
  heroImage: heroImage ?? "/images/hero/domki-viva-glowne.webp",
  sections,
};

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
console.log("\nManifest:", path.relative(ROOT, MANIFEST));
console.log(
  `Galeria: ${sections[0].images.length} obiekt + ${sections[1].images.length} wnętrza`,
);
console.log("Gotowe.");
