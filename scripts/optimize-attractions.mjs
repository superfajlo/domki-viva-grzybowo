/**
 * Pobiera zdjęcia (og:image lub fallback) i zapisuje WebP 16:10 w public/images/atrakcje/
 * node scripts/optimize-attractions.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const OUT_DIR = path.join(process.cwd(), "public", "images", "atrakcje");
const VIVA_DIR = path.join(process.cwd(), "public", "images", "viva");
const WIDTH = 800;
const HEIGHT = 500;
const QUALITY = 82;

const ATTRACTIONS = [
  { id: "konie-kaja", pageUrl: "http://www.konie-grzybowo.pl/", fallback: "okolica-5.jpg" },
  { id: "molo-kolobrzeg", pageUrl: "http://visitkolobrzeg.com/atrakcje/molo", fallback: "kolobrzeg.jpg" },
  { id: "latarnia-kolobrzeg", pageUrl: "https://latarnia.kolobrzeg.eu/", fallback: "kolobrzeg.jpg" },
  { id: "port-kolobrzeg", pageUrl: "https://dladziecikolobrzeg.pl/", fallback: "kolobrzeg.jpg" },
  { id: "muzeum-oreza", pageUrl: "http://www.muzeum.kolobrzeg.pl/pl/", fallback: "kolobrzeg.jpg" },
  { id: "park-linowy", pageUrl: "https://parklinowykolobrzeg.pl/", fallback: "okolica-10.jpg" },
  { id: "splywy-parseta", pageUrl: "http://www.piraci-parsety.pl/", fallback: "okolica-3.jpg" },
  { id: "piotrus-pan", pageUrl: "http://sala-zabaw-piotrus-pan.pl/", fallback: "okolica-8.jpg" },
  { id: "basen-kolobrzeg", pageUrl: "https://www.sport.kolobrzeg.pl/", fallback: "okolica-11.jpg" },
  { id: "sciezka-rowerowa", pageUrl: "https://www.osrodekprzystan.pl/", fallback: "okolica-6.jpg" },
];

function resolveUrl(base, maybe) {
  if (!maybe) return null;
  try {
    return new URL(maybe, base).href;
  } catch {
    return null;
  }
}

function extractOgImage(html, baseUrl) {
  const patterns = [
    /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::secure_url)?["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) return resolveUrl(baseUrl, m[1].trim());
  }
  return null;
}

async function fetchImageBuffer(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; DomkiViva/1.0)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("image")) throw new Error(`Not image: ${ct}`);
  return Buffer.from(await res.arrayBuffer());
}

async function loadFallback(name) {
  const webp = path.join(VIVA_DIR, name.replace(/\.jpe?g$/i, ".webp"));
  const jpg = path.join(VIVA_DIR, name);
  const src = fs.existsSync(webp) ? webp : fs.existsSync(jpg) ? jpg : null;
  if (!src) throw new Error(`Brak fallback: ${name}`);
  return fs.readFileSync(src);
}

async function saveWebp(id, buffer) {
  const out = path.join(OUT_DIR, `${id}.webp`);
  await sharp(buffer)
    .rotate()
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(out);
  const kb = (fs.statSync(out).size / 1024).toFixed(0);
  console.log(`✓ ${id}.webp (${kb} KB)`);
}

async function processOne({ id, pageUrl, fallback }) {
  let buffer = null;
  try {
    const res = await fetch(pageUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; DomkiViva/1.0)" },
      redirect: "follow",
    });
    const html = await res.text();
    const imgUrl = extractOgImage(html, res.url || pageUrl);
    if (imgUrl) {
      buffer = await fetchImageBuffer(imgUrl);
      console.log(`  og:image → ${id}`);
    }
  } catch (e) {
    console.warn(`  og:${id} – ${e.message}`);
  }
  if (!buffer) {
    buffer = await loadFallback(fallback);
    console.log(`  fallback → ${id}`);
  }
  await saveWebp(id, buffer);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const item of ATTRACTIONS) {
  await processOne(item);
}
console.log("Gotowe:", OUT_DIR);
