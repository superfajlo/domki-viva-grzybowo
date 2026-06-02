const candidates = [
  "http://www.grzybowo-noclegi.pl/wp-content/uploads/photo-gallery/parter.jpg",
  "http://www.grzybowo-noclegi.pl/wp-content/uploads/photo-gallery/parter-min.jpg",
  "http://www.grzybowo-noclegi.pl/wp-content/uploads/2014/05/1.jpg",
  "http://www.grzybowo-noclegi.pl/wp-content/uploads/2014/05/img1.jpg",
];

for (const url of candidates) {
  const res = await fetch(url, { method: "HEAD" });
  console.log(res.status, res.headers.get("content-length"), url);
}

// parse galeria for data-image-url
const html = await (await fetch("http://www.grzybowo-noclegi.pl/galeria/")).text();
const dataImages = [...html.matchAll(/data-image-url=["']([^"']+)["']/g)].map((m) => m[1]);
const dataFull = [...html.matchAll(/data-(?:full|original)-url=["']([^"']+)["']/g)].map((m) => m[1]);
console.log("data-image-url", dataImages);
console.log("data-full", dataFull);
const bwg = [...html.matchAll(/bwg_[a-z_]+=["']([^"']+)["']/g)].slice(0, 20);
console.log("bwg attrs sample", bwg.length);
