/**
 * Lustrzane pobranie wirtualnego spaceru Panotour do public/wirtualnyspacer/Kolor/
 * Uruchom: npm run mirror:viva-tour
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";

const ORIGIN = "http://www.grzybowo-noclegi.pl";
const BASE_PATH = "/wirtualnyspacer/Kolor/";
const OUT_ROOT = join(process.cwd(), "public", "wirtualnyspacer", "Kolor");
const START_URLS = [
  `${ORIGIN}${BASE_PATH}ViVa.html`,
  `${ORIGIN}${BASE_PATH}ViVadata/ViVa.xml`,
];
const MAX_CONCURRENT = 8;

const ASSET_EXT =
  /\.(html?|xml|js|css|swf|jpg|jpeg|png|gif|webp|svg|cur|mp3|ogg|json|txt|tiles)(\?.*)?$/i;

const queue = [...START_URLS];
const pending = new Set(queue);
const done = new Set();
let saved = 0;
let skipped = 0;

function shouldMirror(url) {
  try {
    const u = new URL(url);
    if (u.origin !== ORIGIN) return false;
    return u.pathname.startsWith(BASE_PATH);
  } catch {
    return false;
  }
}

function relPathFromUrl(url) {
  const pathname = new URL(url).pathname;
  const prefix = BASE_PATH.endsWith("/") ? BASE_PATH : `${BASE_PATH}/`;
  if (!pathname.startsWith(prefix.slice(0, -1)) && !pathname.startsWith(BASE_PATH)) {
    throw new Error(`Path outside base: ${pathname}`);
  }
  return pathname.slice(BASE_PATH.length).replace(/^\//, "");
}

function extractRefs(text, baseUrl) {
  const found = new Set();
  const patterns = [
    /(?:href|src|data|movie|value)\s*=\s*["']([^"']+)["']/gi,
    /url\(\s*["']?([^"')]+)["']?\s*\)/gi,
    /,\s*xml:\s*["']([^"']+)["']/gi,
    /,\s*swf:\s*["']([^"']+)["']/gi,
    /loadpano\(\s*["']([^"']+)["']/gi,
    /include\(\s*["']([^"']+)["']/gi,
  ];

  for (const re of patterns) {
    let m;
    while ((m = re.exec(text)) !== null) {
      const raw = m[1].trim();
      if (!raw || raw.startsWith("data:") || raw.startsWith("#") || raw.startsWith("javascript:")) {
        continue;
      }
      try {
        const abs = new URL(raw, baseUrl).href;
        if (shouldMirror(abs)) found.add(abs.split("#")[0]);
      } catch {
        /* ignore malformed */
      }
    }
  }

  const loose = text.match(/["']([^"']+\.(?:jpg|jpeg|png|gif|swf|js|xml|cur|css|html?|mp3|ogg|webp|svg))["']/gi);
  if (loose) {
    for (const q of loose) {
      const raw = q.slice(1, -1);
      if (raw === "true" || raw === "false" || !raw.includes("/")) continue;
      try {
        const abs = new URL(raw, baseUrl).href;
        if (shouldMirror(abs)) found.add(abs.split("#")[0]);
      } catch {
        /* ignore */
      }
    }
  }

  return found;
}

function enqueue(url) {
  if (done.has(url) || pending.has(url)) return;
  pending.add(url);
  queue.push(url);
}

async function downloadToFile(url, dest) {
  await mkdir(dirname(dest), { recursive: true });
  const res = await fetch(url, {
    headers: {
      "User-Agent": "DomkiVivaMirror/1.0 (+local backup)",
      Referer: `${ORIGIN}${BASE_PATH}ViVa.html`,
    },
    redirect: "follow",
  });
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);

  const type = res.headers.get("content-type") ?? "";
  const isText =
    type.includes("text") ||
    type.includes("xml") ||
    type.includes("javascript") ||
    /\.(html?|xml|js|css|json)$/i.test(dest);

  if (isText) {
    const text = buf.toString("utf8");
    for (const ref of extractRefs(text, url)) enqueue(ref);
  }

  return buf.length;
}

async function worker() {
  while (queue.length > 0) {
    const url = queue.shift();
    if (!url || done.has(url)) continue;
    pending.delete(url);

    const rel = relPathFromUrl(url);
    const dest = join(OUT_ROOT, rel);

    try {
      const bytes = await downloadToFile(url, dest);
      done.add(url);
      saved += 1;
      process.stdout.write(`\rOK ${saved} | ${rel} (${bytes} B)          `);
    } catch (err) {
      done.add(url);
      skipped += 1;
      process.stdout.write(`\rSKIP ${rel}: ${err.message}                    `);
    }
  }
}

console.log(`Pobieranie z: ${ORIGIN}${BASE_PATH}`);
console.log(`Zapis do:   ${OUT_ROOT}\n`);

await mkdir(OUT_ROOT, { recursive: true });
await Promise.all(Array.from({ length: MAX_CONCURRENT }, () => worker()));

async function patchVivaHtmlForHtml5() {
  const htmlPath = join(OUT_ROOT, "ViVa.html");
  let html = await readFile(htmlPath, "utf8");
  html = html.replace(/,xml:"ViVadata\/ViVa_vr\.xml"/g, ',xml:"ViVadata/ViVa.xml"');
  const oldBlock =
    /} else {\s*var isBot[\s\S]*?localfallback:"flash"\s*\}\);\s*}/;
  const newBlock = `} else {
					embedpano({
						id:"krpanoSWFObject"
						,xml:"ViVadata/ViVa.xml"
						,target:"panoDIV"
						,passQueryParameters:true
						,bgcolor:"#000000"
						,focus: false
						,html5:"always"
						,vars:{startscene:curScene,starttime:curTime}
					});
				}`;
  if (oldBlock.test(html)) {
    html = html.replace(oldBlock, newBlock);
  }
  await writeFile(htmlPath, html, "utf8");
  console.log("Zastosowano patch HTML5 w ViVa.html");
}

console.log(`\n\nGotowe: ${saved} plików, pominięto: ${skipped}`);
await patchVivaHtmlForHtml5();
console.log(`Podgląd lokalny: /wirtualnyspacer/Kolor/ViVa.html`);
