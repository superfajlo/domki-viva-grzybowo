const base = "https://i-kolobrzeg.pl";
const sources = [
  { label: "Koncerty", categoryId: 101 },
  { label: "Kino", categoryId: 114 },
];

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function parsePolishDate(ddmmyyyy) {
  const m = ddmmyyyy.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!m) return null;
  return `${m[3]}-${m[2]}-${m[1]}`;
}

function todayInWarsaw() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Warsaw" });
}

function isCurrentOrFuture(isoDate, time) {
  const today = todayInWarsaw();
  if (isoDate > today) return true;
  if (isoDate < today) return false;
  if (!time) return true;
  const now = new Date().toLocaleString("en-GB", { timeZone: "Europe/Warsaw", hour12: false });
  const currentTime = now.split(", ")[1]?.slice(0, 5) || "00:00";
  return time >= currentTime;
}

function parseBlock(block, source) {
  const href = block.match(/href="(\/wydarzenie-[^"]+)"/)?.[1];
  if (!href) return null;
  const titleRaw = block.match(/<span class="title">([\s\S]*?)<\/span>\s*<span class="tresc"/)?.[1];
  const title = stripHtml(titleRaw || "");
  const dateRaw = block.match(/kali_data_od">[\s\S]*?<span>(\d{2}-\d{2}-\d{4})<\/span>/)?.[1];
  const isoDate = dateRaw ? parsePolishDate(dateRaw) : null;
  const time = block.match(/godz\.<\/span><span>(\d{2}:\d{2})<\/span>/)?.[1];
  if (!isoDate || !isCurrentOrFuture(isoDate, time)) return null;
  return { title: title.slice(0, 60), date: isoDate, time, href };
}

let total = 0;
for (const source of sources) {
  const html = await (await fetch(`${base}/wydarzenia-kategoria-${source.categoryId}.html`, {
    headers: { "User-Agent": "Mozilla/5.0" },
  })).text();
  const blocks = html.match(/<li class="zaj-wrapper"[\s\S]*?<\/li>/g) || [];
  let ok = 0;
  for (const b of blocks) {
    if (parseBlock(b, source)) ok++;
  }
  console.log(source.label, "blocks", blocks.length, "future", ok);
  total += ok;
}
console.log("today Warsaw", todayInWarsaw(), "total sample", total);
