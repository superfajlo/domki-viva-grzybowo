/**
 * Instalacja pełnego wirtualnego spaceru Panotour z ZIP lub folderu.
 *
 * Użycie:
 *   node scripts/install-viva-tour.mjs upload/spacer.zip
 *   node scripts/install-viva-tour.mjs C:\sciezka\do\Kolor
 *
 * Po instalacji (ViVa_skin.xml obecny) wyłącz proxy:
 *   VIVA_TOUR_USE_PROXY=false w .env / Vercel
 */
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
} from "fs";
import { basename, dirname, join, resolve } from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DEST = join(ROOT, "public", "wirtualnyspacer", "Kolor");
const MARKER = join(DEST, "ViVadata", "ViVa_skin.xml");

function hasMarker(dir) {
  return existsSync(join(dir, "ViVadata", "ViVa_skin.xml"));
}

function findKolorRoot(dir) {
  if (hasMarker(dir)) return dir;
  if (existsSync(join(dir, "Kolor")) && hasMarker(join(dir, "Kolor"))) return join(dir, "Kolor");
  if (existsSync(join(dir, "wirtualnyspacer", "Kolor")) && hasMarker(join(dir, "wirtualnyspacer", "Kolor"))) {
    return join(dir, "wirtualnyspacer", "Kolor");
  }
  for (const name of readdirSync(dir)) {
    const child = join(dir, name);
    if (!statSync(child).isDirectory()) continue;
    const found = findKolorRoot(child);
    if (found) return found;
  }
  return null;
}

function extractZip(zipPath, outDir) {
  mkdirSync(outDir, { recursive: true });
  const zip = resolve(zipPath);
  if (process.platform === "win32") {
    execSync(
      `powershell -NoProfile -Command "Expand-Archive -LiteralPath '${zip.replace(/'/g, "''")}' -DestinationPath '${outDir.replace(/'/g, "''")}' -Force"`,
      { stdio: "inherit" },
    );
    return;
  }
  execSync(`unzip -o "${zip}" -d "${outDir}"`, { stdio: "inherit" });
}

const input = process.argv[2];
if (!input) {
  console.error("Podaj ścieżkę do ZIP lub folderu Kolor (z ViVadata/ViVa_skin.xml).");
  process.exit(1);
}

const source = resolve(ROOT, input);
if (!existsSync(source)) {
  console.error("Nie znaleziono:", source);
  process.exit(1);
}

const tmp = join(ROOT, ".tmp-viva-tour-install");
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });

let searchRoot = source;
if (source.toLowerCase().endsWith(".zip")) {
  console.log("Rozpakowuję ZIP…");
  extractZip(source, tmp);
  searchRoot = tmp;
} else {
  cpSync(source, join(tmp, basename(source)), { recursive: true });
  searchRoot = join(tmp, basename(source));
}

const kolor = findKolorRoot(searchRoot);
if (!kolor) {
  console.error(
    "Nie znaleziono ViVadata/ViVa_skin.xml. ZIP musi zawierać folder Kolor ze starym hostingu.",
  );
  rmSync(tmp, { recursive: true, force: true });
  process.exit(1);
}

console.log("Znaleziono tour:", kolor);

for (const stale of ["wirtualnyspacer-incomplete", "wirtualnyspacer-backup-incomplete"]) {
  const p = join(ROOT, "public", stale);
  if (existsSync(p)) rmSync(p, { recursive: true, force: true });
}

const destParent = dirname(DEST);
rmSync(join(ROOT, "public", "wirtualnyspacer"), { recursive: true, force: true });
mkdirSync(destParent, { recursive: true });
cpSync(kolor, DEST, { recursive: true });

rmSync(tmp, { recursive: true, force: true });

if (!existsSync(MARKER)) {
  console.error("Instalacja nieudana – brak", MARKER);
  process.exit(1);
}

const files = readdirSync(join(DEST, "ViVadata"), { recursive: true }).length;
console.log("\n✓ Spacer zainstalowany w public/wirtualnyspacer/Kolor/");
console.log(`  Plik kontrolny: ViVadata/ViVa_skin.xml`);
console.log(`  Elementów w ViVadata (szac.): ${files}+`);
console.log("\nNa Vercel / .env.local ustaw:");
console.log("  VIVA_TOUR_USE_PROXY=false");
console.log("\nLokalnie: npm run dev → /wirtualnyspacer/Kolor/ViVa.html");
