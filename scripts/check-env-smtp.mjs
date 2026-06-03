import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const envPath = resolve(process.cwd(), ".env.local");
if (!existsSync(envPath)) {
  console.log("BRAK pliku .env.local");
  process.exit(1);
}

const raw = readFileSync(envPath);
const bom = raw[0] === 0xef && raw[1] === 0xbb && raw[2] === 0xbf;
const text = (bom ? raw.subarray(3) : raw).toString("utf8");
const vars = {};
for (const line of text.split(/\r?\n/)) {
  const t = line.trim();
  if (!t || t.startsWith("#")) continue;
  const i = t.indexOf("=");
  if (i < 1) continue;
  const key = t.slice(0, i).trim();
  const val = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  vars[key] = val;
}

const user = vars.SMTP_USER;
const pass = vars.SMTP_PASS;
console.log("encoding: UTF-8" + (bom ? " (usunięto BOM)" : ""));
console.log("SMTP_USER:", user ? `ustawiony (${user})` : "BRAK");
console.log("SMTP_PASS:", pass ? `ustawiony (${pass.length} znaków)` : "BRAK lub puste");
console.log(
  "gotowe do wysyłki:",
  Boolean((vars.SMTP_HOST || "smtp.poczta.onet.pl") && user && pass),
);
