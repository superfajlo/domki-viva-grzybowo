const url = "https://i-kolobrzeg.pl/wydarzenia-kategoria-101.html";
const html = await (
  await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } })
).text();

console.log("length", html.length);
console.log("zaj-wrapper", (html.match(/zaj-wrapper/g) || []).length);
console.log("wydarzenie hrefs", (html.match(/href="\/wydarzenie-/g) || []).length);

const blocks = html.match(/<li class="zaj-wrapper"[\s\S]*?<\/li>/g) || [];
console.log("blocks parsed", blocks.length);
if (blocks[0]) {
  console.log("block0 snippet:\n", blocks[0].slice(0, 900));
}

const dateMatch = blocks[0]?.match(/kali_data_od">[\s\S]*?<span>(\d{2}-\d{2}-\d{4})<\/span>/);
console.log("date match", dateMatch?.[1]);
