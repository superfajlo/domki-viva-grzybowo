/** @deprecated Użyj: npm run sync:gallery */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

spawnSync(
  process.execPath,
  [path.join(path.dirname(fileURLToPath(import.meta.url)), "sync-gallery.mjs")],
  { stdio: "inherit" },
);
