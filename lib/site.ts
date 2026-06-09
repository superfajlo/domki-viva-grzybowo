/** Kanoniczny adres produkcyjny (sitemap, robots, Open Graph, JSON-LD, GSC). */
export const CANONICAL_HOST = "www.grzybowo-noclegi.pl";
const DEFAULT_SITE_URL = `https://${CANONICAL_HOST}`;

/** Normalizuje URL: https, bez końcowego /, www dla grzybowo-noclegi.pl */
export function normalizeSiteUrl(raw: string): string {
  const trimmed = raw.trim().replace(/\/+$/, "");
  if (!trimmed) return DEFAULT_SITE_URL;
  try {
    const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const u = new URL(withProto);
    u.protocol = "https:";
    if (u.hostname === "grzybowo-noclegi.pl") {
      u.hostname = CANONICAL_HOST;
    }
    return u.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL,
);

/** SEO strony głównej – nie zmieniać bez potrzeby */
export const HOME_SEO = {
  title: "Domki ,,Viva'' | Noclegi w Grzybowie nad morzem",
  description:
    "W naszej ofercie znajdziecie Państwo domki 2, 3, 4, 5 osobowe posiadające własny aneks kuchenny oraz bogate wyposażenie.",
} as const;

export const CONTACT = {
  phone: "507 130 571",
  phoneHref: "tel:+48507130571",
  email: "viva3@onet.eu",
  emailHref: "mailto:viva3@onet.eu",
  address: "Łąkowa 4A",
  city: "78-132 Grzybowo",
  fullAddress: "Łąkowa 4A, 78-132 Grzybowo",
  geo: { lat: 54.1512, lng: 15.5898 },
} as const;

export const NAV_ITEMS = [
  { label: "Start", href: "/" },
  { label: "Oferta", href: "/oferta" },
  { label: "Cennik", href: "/cennik" },
  { label: "Galeria", href: "/galeria" },
  { label: "Atrakcje okolicy", href: "/atrakcje-okolicy" },
  { label: "Wydarzenia", href: "/wydarzenia" },
  { label: "Wirtualny spacer", href: "/#wirtualny-spacer" },
  { label: "Regulamin obiektu", href: "/regulamin-obiektu" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const COTTAGES = [
  {
    title: "Domki 2 osobowe",
    description:
      "Przytulne domki dla par – idealne na romantyczny wypoczynek nad morzem w Grzybowie.",
    features: ["Aneks kuchenny", "Łazienka", "Bogate wyposażenie"],
  },
  {
    title: "Domki 3 osobowe",
    description:
      "Komfortowe noclegi dla małych rodzin – blisko plaży i atrakcji Grzybowa.",
    features: ["Aneks kuchenny", "Łazienka", "Bogate wyposażenie"],
  },
  {
    title: "Domki 4 osobowe",
    description:
      "Przestronne domki letniskowe dla rodzin z dziećmi – wakacje nad Bałtykiem.",
    features: ["Aneks kuchenny", "Łazienka", "Bogate wyposażenie"],
  },
  {
    title: "Domki 5 osobowe",
    description:
      "Największe domki w ofercie – wygodny wypoczynek dla większej rodziny.",
    features: ["Aneks kuchenny", "Łazienka", "Bogate wyposażenie"],
  },
] as const;

/** Kafelki sekcji Udogodnienia na stronie /oferta/ */
export const AMENITIES = [
  {
    emoji: "📶",
    title: "Bezpłatne Wi-Fi",
    description: "Internet bez dodatkowych opłat – wygodny kontakt i planowanie wycieczek.",
  },
  {
    emoji: "🚗",
    title: "Bezpłatny parking",
    description: "Miejsca parkingowe przy domkach – bez opłat za parkowanie.",
  },
  {
    emoji: "🛝",
    title: "Plac zabaw dla dzieci",
    description: "Plac zabaw na terenie obiektu – bezpieczna zabawa dla najmłodszych.",
  },
  {
    emoji: "🔥",
    title: "Ogród i grill",
    description: "Zielony ogród z możliwością wspólnego grillowania.",
  },
  {
    emoji: "🏖️",
    title: "Sprzęt plażowy w każdym domku",
    description: "Parawany, leżaki i akcesoria plażowe – gotowe na dzień nad morzem.",
  },
  {
    emoji: "🧺",
    title: "Pralka w każdym domku",
    description: "Pralka w każdym domku – wygodnie na dłuższe wakacje z rodziną.",
  },
  {
    emoji: "🍳",
    title: "Aneks kuchenny z pełnym wyposażeniem",
    description: "Lodówka, płyta, naczynia i podstawowe AGD – samodzielne posiłki na miejscu.",
  },
  {
    emoji: "📺",
    title: "TV",
    description: "Telewizor w salonie na parterze – wieczorny relaks po plaży.",
  },
  {
    emoji: "👕",
    title: "Żelazko i deska do prasowania",
    description: "Żelazko i deska w wyposażeniu – porządek podczas pobytu.",
  },
  {
    emoji: "🌊",
    title: "700 m od plaży",
    description: "Kilka minut spacerem do plaży w Grzybowie nad Bałtykiem.",
  },
  {
    emoji: "🌳",
    title: "Spokojna okolica",
    description: "Cicha, zielona okolica – wypoczynek z dala od zgiełku.",
  },
  {
    emoji: "👨‍👩‍👧‍👦",
    title: "Idealne dla rodzin",
    description: "Domki i udogodnienia dopasowane do rodzinnego pobytu nad morzem.",
  },
] as const;

export const PRICING = [
  { guests: 2, label: "Domek 2 osoby", priceFrom: 160 },
  { guests: 3, label: "Domek 3 osoby", priceFrom: 190 },
  { guests: 4, label: "Domek 4 osoby", priceFrom: 220 },
  { guests: 5, label: "Domek 5 osób", priceFrom: 250 },
] as const;

/** SEO sekcji Okolica i atrakcje */
export const AREA_SEO_PHRASES = [
  "okolica Grzybowo",
  "atrakcje Grzybowo",
  "atrakcje Kołobrzeg",
  "co zobaczyć w Grzybowie",
  "co robić w Grzybowie",
  "wakacje Grzybowo",
  "noclegi blisko atrakcji",
  "atrakcje nad Bałtykiem",
  "rodzinne atrakcje Grzybowo",
  "jazda konna Grzybowo",
  "molo Kołobrzeg",
  "latarnia morska Kołobrzeg",
  "park linowy Kołobrzeg",
  "spływy kajakowe Parsęta",
] as const;

export const BEACH_LIVE_CAMERA_URL =
  "https://grzybowo.pl/strona-278-widok_z_kamery_na_plazy_w_grzybowie.html";
export const KOLOBRZEG_360_URL = "https://www.kolobrzeg360.pl/";
/** Kołobrzeg z lotu ptaka – YouTube */
export const KOLOBRZEG_BIRDS_EYE_YOUTUBE_URL =
  "https://www.youtube.com/watch?v=-1UATP_5anE";

/** Oficjalny kalendarz wydarzeń Gminy Kołobrzeg */
export const GMINA_EVENTS_URL = "https://www.gmina.kolobrzeg.pl/wydarzenia.html";

/** Mapa turystyczna Grzybowa – załącznik właściciela */
export const GRZYBOWO_MAP = {
  src: "/images/atrakcje/mapa-grzybowo.webp",
  alt: "Mapa Grzybowa i okolic – plaża, ulice, atrakcje, dojazd do Kołobrzegu i Dźwirzyna",
  width: 936,
  height: 566,
} as const;
/** Film z drona – Domki VIVA (strona główna, sekcja pod Hero) */
export const VIVA_DRONE_YOUTUBE_ID = "ZKmK1X9qkPE";
export const VIVA_DRONE_YOUTUBE_URL = `https://www.youtube.com/watch?v=${VIVA_DRONE_YOUTUBE_ID}`;
export const VIVA_DRONE_EMBED_URL = `https://www.youtube-nocookie.com/embed/${VIVA_DRONE_YOUTUBE_ID}?rel=0&modestbranding=1`;

/**
 * Wirtualny spacer na Twojej domenie.
 * Proxy (stary serwer) dopóki brak ViVa_skin.xml w public/ – patrz docs/WDROZENIE-DOMENA-GSC.md
 * Pełna instalacja: npm run install:viva-tour upload/spacer.zip → VIVA_TOUR_USE_PROXY=false
 */
export const VIVA_VIRTUAL_TOUR_URL = "/wirtualnyspacer/Kolor/ViVa.html";

export const VIRTUAL_TOUR_SEO_PHRASES = [
  "wirtualny spacer Grzybowo",
  "domki Grzybowo wirtualny spacer",
  "noclegi Grzybowo blisko plaży",
  "domki nad morzem Grzybowo",
  "Grzybowo noclegi dla rodzin",
  "Kołobrzeg 360",
  "atrakcje Grzybowo",
  "noclegi Grzybowo nad morzem",
] as const;

export const FAQ_ITEMS = [
  {
    question: "Jak daleko od plaży znajdują się domki Viva?",
    answer:
      "Domki Viva w Grzybowie leżą około 700 metrów od plaży – to kilka minut spacerem nad morzem.",
  },
  {
    question: "Ile osób mogą zakwaterować się w jednym domku?",
    answer:
      "Oferujemy domki 2, 3, 4 i 5 osobowe z własnym aneksem kuchennym i łazienką – wybierzcie wariant dopasowany do liczby gości.",
  },
  {
    question: "Czy w domku jest aneks kuchenny?",
    answer:
      "Tak, każdy domek posiada własny aneks kuchenny z podstawowym wyposażeniem do samodzielnego przygotowania posiłków.",
  },
  {
    question: "Od jakiej ceny zaczynają się noclegi?",
    answer:
      "Ceny zaczynają się od 160 zł za dobę za domek 2-osobowy. Aktualny cennik znajdziecie w sekcji Cennik na stronie.",
  },
  {
    question: "Czy obiekt jest odpowiedni na rodzinne wakacje?",
    answer:
      "Tak – Domki Viva to spokojny, rodzinny obiekt noclegowy w Grzybowie, blisko plaży i atrakcji dla dzieci.",
  },
  {
    question: "Jak daleko jest do Kołobrzegu?",
    answer:
      "Kołobrzeg jest w zasięgu krótkiej przejażdżki samochodem – port, molo i latarnia to popularne kierunki wycieczek.",
  },
  {
    question: "Czy mogę przyjechać z psem?",
    answer:
      "Prosimy o kontakt telefoniczny lub przez formularz – ustalimy możliwość pobytu ze zwierzęciem indywidualnie.",
  },
  {
    question: "Jak zarezerwować domek?",
    answer:
      "Najszybciej zadzwonicie pod numer 507 130 571 lub wypełnicie formularz kontaktowy z preferowanym terminem pobytu.",
  },
  {
    question: "Czy na miejscu jest parking?",
    answer:
      "Goście korzystają z miejsc parkingowych przy obiekcie – szczegóły potwierdzamy przy rezerwacji.",
  },
  {
    question: "Co znajduje się w wyposażeniu domku?",
    answer:
      "Domki oferują bogate wyposażenie: aneks kuchenny, łazienkę, sprzęt AGD i elementy niezbędne do komfortowego wypoczynku nad morzem.",
  },
  {
    question: "Czy w okolicy są sklepy i restauracje?",
    answer:
      "W Grzybowie i pobliskim Kołobrzegu znajdziecie sklepy, smażalnie ryb i restauracje – idealne na rodzinne kolacje po plaży.",
  },
  {
    question: "Gdzie mogę sprawdzić wydarzenia w sezonie?",
    answer:
      "Aktualny kalendarz imprez i festynów znajdziesz na podstronie Wydarzenia – kategorie prowadzą do oficjalnego kalendarza Kołobrzegu na i-kolobrzeg.pl.",
  },
] as const;

export const SEO_KEYWORDS = [
  "noclegi Grzybowo",
  "noclegi w Grzybowie",
  "noclegi w Grzybowie nad morzem",
  "domki Grzybowo",
  "domki nad morzem Grzybowo",
  "domki letniskowe Grzybowo",
  "domki blisko plaży Grzybowo",
  "noclegi blisko Kołobrzegu",
  "wakacje Grzybowo",
  "wakacje nad morzem",
  "rodzinne wakacje nad morzem",
  "domki 700 m od plaży",
  "Grzybowo",
  "Kołobrzeg",
  "Bałtyk",
  "woj. zachodniopomorskie",
  ...AREA_SEO_PHRASES,
  ...VIRTUAL_TOUR_SEO_PHRASES,
] as const;
