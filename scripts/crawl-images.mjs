import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const BASE = "http://www.grzybowo-noclegi.pl";
const __dir = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dir, "..", "public", "images", "viva");

const visited = new Set();
const imageUrls = new Set();
const queue = ["/"];

function normalizeUrl(href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:"))
    return null;
  if (href.startsWith("http") && !href.includes("grzybowo-noclegi.pl")) return null;
  let path = href;
  if (href.startsWith("http")) {
    const u = new URL(href);
    if (!u.hostname.includes("grzybowo-noclegi.pl")) return null;
    path = u.pathname;
  }
  if (!path.startsWith("/")) path = "/" + path;
  if (path.includes(".jpg") || path.includes(".png") || path.includes(".pdf")) return null;
  return path.endsWith("/") ? path : path + "/";
}

function extractImages(html) {
  const patterns = [
    /https?:\/\/www\.grzybowo-noclegi\.pl\/wp-content\/uploads\/[^"'\s)\\]+?\.(?:jpg|jpeg|png|webp)/gi,
    /\/wp-content\/uploads\/[^"'\s)\\]+?\.(?:jpg|jpeg|png|webp)/gi,
  ];
  for (const re of patterns) {
    for (const m of html.matchAll(re)) {
      let u = m[0];
      if (u.startsWith("/")) u = BASE + u;
      if (u.includes("/thumb/")) continue;
      if (/\d+x\d+\./.test(u) && !u.includes("945x393")) continue;
      if (u.includes("ajax-loader") || u.includes("logo.png")) continue;
      if (u.includes("cropped-Ba")) continue;
      imageUrls.add(u);
    }
  }
}

function extractLinks(html) {
  const links = [];
  for (const m of html.matchAll(/href=["']([^"']+)["']/g)) {
    const n = normalizeUrl(m[1]);
    if (n) links.push(n);
  }
  return links;
}

async function fetchPage(path) {
  const url = BASE + path;
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) return null;
  return res.text();
}

while (queue.length > 0 && visited.size < 40) {
  const path = queue.shift();
  if (visited.has(path)) continue;
  visited.add(path);
  console.log("Crawl", path);
  const html = await fetchPage(path);
  if (!html) continue;
  extractImages(html);
  for (const link of extractLinks(html)) {
    if (!visited.has(link) && !queue.includes(link)) queue.push(link);
  }
}

const sorted = [...imageUrls].sort();
console.log("\nFound", sorted.length, "images");
writeFileSync(join(__dir, "image-urls.json"), JSON.stringify(sorted, null, 2));

mkdirSync(OUT_DIR, { recursive: true });

let i = 0;
for (const url of sorted) {
  i++;
  const name = url.split("/").pop().replace(/[^\w.\-ąćęłńóśźżĄĆĘŁŃÓŚŹŻ-]+/gi, "_");
  const outPath = join(OUT_DIR, `${String(i).padStart(2, "0")}-${name}`);
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn("Skip", url, res.status);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(outPath, buf);
    console.log("OK", outPath, buf.length);
  } catch (e) {
    console.warn("Err", url, e.message);
  }
}

console.log("Done");
