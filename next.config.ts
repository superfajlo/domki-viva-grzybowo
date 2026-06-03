import { existsSync } from "fs";
import { join } from "path";
import type { NextConfig } from "next";

/** Stary hosting Panotour – pełny spacer (setki plików w ViVadata/). */
const VIVA_TOUR_ORIGIN =
  process.env.VIVA_TOUR_PROXY_ORIGIN ?? "http://www.grzybowo-noclegi.pl";

const tourInstalledLocally = existsSync(
  join(process.cwd(), "public", "wirtualnyspacer", "Kolor", "ViVadata", "ViVa_skin.xml"),
);

/** false + lokalny ViVa_skin.xml → serwuj z public/; true → proxy na stary serwer */
const useTourProxy =
  process.env.VIVA_TOUR_USE_PROXY !== "false" && !tourInstalledLocally;

const nextConfig: NextConfig = {
  async rewrites() {
    if (!useTourProxy) return [];
    return [
      {
        source: "/wirtualnyspacer/:path*",
        destination: `${VIVA_TOUR_ORIGIN}/wirtualnyspacer/:path*`,
      },
    ];
  },
};

export default nextConfig;
