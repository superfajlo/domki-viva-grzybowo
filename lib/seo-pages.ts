import type { Metadata } from "next";
import { OG_IMAGE } from "./gallery-images";
import { SITE_URL } from "./site";

/**
 * Topic Cluster – dokładne Title i Description (nie zmieniać).
 * Każda podstrona = osobny temat SEO.
 */
export const SEO_PAGES = {
  home: {
    path: "/",
    title: "Domki ,,Viva'' | Noclegi w Grzybowie nad morzem",
    description:
      "W naszej ofercie znajdziecie Państwo domki 2, 3, 4, 5 osobowe posiadające własny aneks kuchenny oraz bogate wyposażenie.",
    h1: "Domki Viva Grzybowo – noclegi nad morzem",
    primaryKeyword: "noclegi Grzybowo",
    secondaryKeywords: [
      "domki Grzybowo",
      "domki nad morzem",
      "noclegi blisko plaży",
      "wakacje Grzybowo",
      "domki Kołobrzeg okolice",
    ],
    role: "hub",
  },
  oferta: {
    path: "/oferta/",
    title: "Oferta Domków Viva Grzybowo | Komfortowe Domki 2-5 Osób Nad Morzem",
    description:
      "Poznaj ofertę Domków Viva w Grzybowie. Komfortowe domki 2-5 osobowe z aneksem kuchennym, placem zabaw, parkingiem i bezpłatnym Wi-Fi. 500 m od plaży.",
    h1: "Oferta domków Viva w Grzybowie",
    primaryKeyword: "domki Grzybowo oferta",
    secondaryKeywords: [
      "domki 2-5 osób Grzybowo",
      "domki z aneksem kuchennym",
      "noclegi nad morzem domki",
      "domki dla rodzin Grzybowo",
    ],
    role: "cluster",
  },
  cennik: {
    path: "/cennik/",
    title: "Cennik | Dom Gościnny Viva - Grzybowo | Domki ,,Viva''",
    description:
      "Cennik. Wczasy w Grzybowie - w pokojach domu gościnnego Viva. Miła atmosfera, przepiękna okolica, zdrowe powietrze oraz bliskość polskiego morza. Zapraszamy.",
    h1: "Cennik pobytu w Domkach Viva",
    primaryKeyword: "cennik noclegów Grzybowo",
    secondaryKeywords: [
      "ceny domków Grzybowo",
      "wczasy Grzybowo cennik",
      "noclegi Grzybowo cena",
    ],
    role: "cluster",
  },
  galeria: {
    path: "/galeria/",
    title: "Galeria | Dom Gościnny Viva - Grzybowo | Domki ,,Viva''",
    description:
      "Galeria. Wczasy w Grzybowie - w pokojach domu gościnnego Viva. Miła atmosfera, przepiękna okolica, zdrowe powietrze oraz bliskość polskiego morza. Zapraszamy.",
    h1: "Galeria Domków Viva w Grzybowie",
    primaryKeyword: "galeria domków Grzybowo",
    secondaryKeywords: [
      "zdjęcia domków nad morzem",
      "Domki Viva Grzybowo wnętrza",
      "noclegi Grzybowo zdjęcia",
    ],
    role: "cluster",
  },
  wydarzenia: {
    path: "/wydarzenia/",
    title: "Wydarzenia w okolicy | Domki Viva Grzybowo",
    description:
      "Wydarzenia w okolicy Grzybowa i Kołobrzegu – koncerty, kino, sport, kultura, teatr i stand-up. Linki do oficjalnego kalendarza i-kolobrzeg.pl.",
    h1: "Wydarzenia w okolicy",
    primaryKeyword: "wydarzenia Kołobrzeg",
    secondaryKeywords: [
      "koncerty Kołobrzeg",
      "imprezy Kołobrzeg",
      "kalendarz wydarzeń Kołobrzeg",
      "wydarzenia nad morzem",
    ],
    role: "cluster",
  },
  atrakcje: {
    path: "/atrakcje-okolicy/",
    title: "Atrakcje okolicy | Domki ,,Viva''",
    description:
      "Poznaj atrakcje Grzybowa i okolic. Szeroka plaża, ścieżki rowerowe, Kołobrzeg, port morski, rejsy statkiem oraz liczne miejsca idealne na rodzinny wypoczynek nad Bałtykiem.",
    h1: "Atrakcje okolicy Grzybowo i Kołobrzeg",
    primaryKeyword: "atrakcje Grzybowo",
    secondaryKeywords: [
      "co zobaczyć w Grzybowie",
      "atrakcje Kołobrzeg",
      "wakacje nad Bałtykiem atrakcje",
      "rodzinne atrakcje Grzybowo",
    ],
    role: "cluster",
  },
  kontakt: {
    path: "/kontakt/",
    title: "Kontakt | Domki Viva - Grzybowo | Domki ,,Viva''",
    description:
      "Kontakt. Wczasy w Grzybowie - w domkach Viva. Miła atmosfera, przepiękna okolica, zdrowe powietrze oraz bliskość polskiego morza. Zapraszamy.",
    h1: "Kontakt – Domki Viva Grzybowo",
    primaryKeyword: "kontakt Domki Viva Grzybowo",
    secondaryKeywords: [
      "rezerwacja noclegów Grzybowo",
      "telefon domki Grzybowo",
      "adres Domki Viva",
    ],
    role: "cluster",
  },
  regulamin: {
    path: "/regulamin-obiektu/",
    title: "REGULAMIN OBIEKTU | Domki ,,Viva''",
    description:
      "Zapoznaj się z regulaminem Domków Viva w Grzybowie. Sprawdź zasady pobytu, warunki rezerwacji, korzystania z obiektu oraz informacje dla naszych Gości.",
    h1: "Regulamin obiektu Domki Viva",
    primaryKeyword: "regulamin Domki Viva",
    secondaryKeywords: [
      "regulamin obiektu Grzybowo",
      "zasady pobytu Grzybowo",
      "regulamin noclegów Grzybowo",
    ],
    role: "cluster",
  },
} as const;

export type SeoPageKey = keyof typeof SEO_PAGES;

export function pageMetadata(key: SeoPageKey, ogImage = OG_IMAGE): Metadata {
  const page = SEO_PAGES[key];
  const url = `${SITE_URL}${page.path === "/" ? "" : page.path}`;

  return {
    title: page.title,
    description: page.description,
    keywords: [page.primaryKeyword, ...page.secondaryKeywords],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url,
      siteName: "Domki Viva Grzybowo",
      title: page.title,
      description: page.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: page.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogImage],
    },
  };
}

export const SITEMAP_PATHS = Object.values(SEO_PAGES).map((p) => p.path);
