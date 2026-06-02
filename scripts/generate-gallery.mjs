import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(dir, { recursive: true });

const items = [
  { file: "gallery-1.svg", label: "Domki Viva", c1: "#0284c7", c2: "#0c4a6e" },
  { file: "gallery-2.svg", label: "Noclegi", c1: "#38bdf8", c2: "#0369a1" },
  { file: "gallery-3.svg", label: "Plaża", c1: "#f4e8d4", c2: "#0284c7" },
  { file: "gallery-4.svg", label: "Rodzinne", c1: "#f97316", c2: "#ea580c" },
  { file: "gallery-5.svg", label: "Kołobrzeg", c1: "#0c4a6e", c2: "#164e63" },
  { file: "gallery-6.svg", label: "Wnętrze", c1: "#99f6e4", c2: "#0d9488" },
  { file: "gallery-7.svg", label: "Grzybowo", c1: "#7dd3fc", c2: "#0284c7" },
  { file: "gallery-8.svg", label: "Wakacje", c1: "#fde68a", c2: "#f97316" },
  { file: "og-cover.svg", label: "Domki Viva Grzybowo", c1: "#0284c7", c2: "#0c4a6e" },
];

for (const { file, label, c1, c2 } of items) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient></defs>
  <rect width="1200" height="800" fill="url(#g)"/>
  <circle cx="1050" cy="120" r="80" fill="#fff" opacity="0.25"/>
  <path fill="#fff" opacity="0.2" d="M0,520 C200,620 400,480 600,540 C800,600 1000,500 1200,560 L1200,800 L0,800 Z"/>
  <text x="600" y="400" text-anchor="middle" font-family="system-ui,sans-serif" font-size="48" font-weight="700" fill="#fff">${label}</text>
  <text x="600" y="460" text-anchor="middle" font-family="system-ui,sans-serif" font-size="24" fill="#fff" opacity="0.85">Grzybowo nad morzem</text>
</svg>`;
  writeFileSync(join(dir, file), svg);
}

console.log("Generated", items.length, "images in public/images");
