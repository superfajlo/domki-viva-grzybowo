import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dir, "..", "public", "images", "viva");
mkdirSync(OUT, { recursive: true });

const IMAGES = [
  ["grzybowo-1.jpg", "http://www.grzybowo-noclegi.pl/wp-content/uploads/2014/05/grzybowo-1.jpg"],
  ["kolobrzeg.jpg", "http://www.grzybowo-noclegi.pl/wp-content/uploads/2014/05/kolobrzeg.jpg"],
  ["domki-viva-banner-1.jpg", "http://www.grzybowo-noclegi.pl/wp-content/uploads/2018/09/49-grzybowo-domki-viva-1-945x393.jpg"],
  ["domki-viva-banner-2.jpg", "http://www.grzybowo-noclegi.pl/wp-content/uploads/2018/09/49-grzybowo-domki-viva-2-945x393.jpg"],
  ["domki-viva-banner.jpg", "http://www.grzybowo-noclegi.pl/wp-content/uploads/2018/09/49-grzybowo-domki-viva-945x393.jpg"],
  ["parter.jpg", "http://www.grzybowo-noclegi.pl/wp-content/uploads/photo-gallery/parter-min.jpg"],
  ["parter-2.jpg", "http://www.grzybowo-noclegi.pl/wp-content/uploads/photo-gallery/parter2-min.jpg"],
  ["parter-3.jpg", "http://www.grzybowo-noclegi.pl/wp-content/uploads/photo-gallery/parter3-min.jpg"],
  ["gora.jpg", "http://www.grzybowo-noclegi.pl/wp-content/uploads/photo-gallery/G%C3%B3ra-min.jpg"],
  ["gora-1.jpg", "http://www.grzybowo-noclegi.pl/wp-content/uploads/photo-gallery/G%C3%B3ra1-min.jpg"],
  ["lazienka.jpg", "http://www.grzybowo-noclegi.pl/wp-content/uploads/photo-gallery/%C5%81azienka-min.jpg"],
  ...Array.from({ length: 17 }, (_, i) => [
    `okolica-${i + 1}.jpg`,
    `http://www.grzybowo-noclegi.pl/wp-content/uploads/2014/05/th${i + 1}.jpg`,
  ]),
];

const manifest = [];

for (const [name, url] of IMAGES) {
  const outPath = join(OUT, name);
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn("SKIP", name, res.status);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(outPath, buf);
    manifest.push({ file: name, bytes: buf.length, url });
    console.log("OK", name, buf.length);
  } catch (e) {
    console.warn("ERR", name, e.message);
  }
}

writeFileSync(join(__dir, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log("Saved", manifest.length, "to", OUT);
