/**
 * @deprecated Użyj: node scripts/generate-favicons-og.mjs (logo → OG 1200×630)
 */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const script = path.join(path.dirname(fileURLToPath(import.meta.url)), "generate-favicons-og.mjs");
spawnSync(process.execPath, [script], { stdio: "inherit" });
