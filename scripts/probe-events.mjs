const base = "https://i-kolobrzeg.pl";
const href = "/wydarzenie-3297-bitwy_o_kolobrzeg-szczegoly-108743.html";
const dh = await (await fetch(base + href, { headers: { "User-Agent": "Mozilla/5.0" } })).text();
const addr = dh.match(/class="miejsce-adres"[^>]*>([\s\S]*?)<\/div>/i)?.[1];
console.log("addr raw", addr?.slice(0, 500));
const title = dh.match(/<span class="title[^"]*">([\s\S]*?)<\/span>/i)?.[1];
console.log("title block", title?.slice(0, 200));

// page 2
const p2 = await (await fetch(base + "/wydarzenia-kategoria-101,strona-2.html", { headers: { "User-Agent": "Mozilla/5.0" } })).text();
console.log("page2 status", p2.includes("zaj-wrapper"), (p2.match(/zaj-wrapper/g) || []).length);
