import { CANONICAL_HOST } from "@/lib/site";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Lokalnie i podglądy Vercel – bez wymuszania domeny produkcyjnej */
function isPreviewHost(host: string) {
  return (
    host === "localhost" ||
    host.startsWith("127.0.0.1") ||
    host.endsWith(".vercel.app")
  );
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  if (!host || isPreviewHost(host)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  let redirect = false;

  if (host === "grzybowo-noclegi.pl") {
    url.hostname = CANONICAL_HOST;
    redirect = true;
  }

  const proto = request.headers.get("x-forwarded-proto");
  if (proto === "http") {
    url.protocol = "https:";
    redirect = true;
  }

  if (redirect) {
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|favicon-16x16.png|favicon-32x32.png|apple-touch-icon.png|.*\\.(?:png|jpg|jpeg|webp|gif|svg|ico|xml|txt|js|css|woff2?)$).*)",
  ],
};
