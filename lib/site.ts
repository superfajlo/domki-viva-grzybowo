export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://domkiviva.pl";

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
  { label: "Wydarzenia w okolicy", href: "/wydarzenia" },
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

export const AMENITIES = [
  {
    title: "500 m do plaży",
    description: "Krótka spacerowa trasa do plaży w Grzybowie nad morzem.",
    icon: "beach",
  },
  {
    title: "Aneks kuchenny",
    description: "W każdym domku własny aneks do przygotowania posiłków.",
    icon: "kitchen",
  },
  {
    title: "Bogate wyposażenie",
    description: "Wszystko, czego potrzebujecie na komfortowy pobyt.",
    icon: "comfort",
  },
  {
    title: "Rodzinna atmosfera",
    description: "Spokojny obiekt idealny na rodzinne wakacje nad morzem.",
    icon: "family",
  },
  {
    title: "Blisko Kołobrzegu",
    description: "Szybki dojazd do portu, molo i atrakcji Kołobrzegu.",
    icon: "city",
  },
] as const;

export const PRICING = [
  { guests: 2, label: "Domek 2 osoby", priceFrom: 160 },
  { guests: 3, label: "Domek 3 osoby", priceFrom: 190 },
  { guests: 4, label: "Domek 4 osoby", priceFrom: 220 },
  { guests: 5, label: "Domek 5 osób", priceFrom: 250 },
] as const;

export const AREA_ATTRACTIONS = [
  {
    title: "Szeroka plaża w Grzybowie",
    description: "Szeroka plaża w Grzybowie, ok. 500 m od Domków Viva – idealna na rodzinne wakacje nad morzem.",
  },
  {
    title: "Kołobrzeg",
    description: "Historyczne miasto z portem, molo i licznymi atrakcji – szybki dojazd z Grzybowa.",
  },
  {
    title: "Port morski",
    description: "Port rybacki i turystyczny w Kołobrzegu – rejsy, promenada i nadmorski klimat.",
  },
  {
    title: "Latarnia morska",
    description: "Widokowy punkt nad Bałtykiem w okolicy – jedna z atrakcji wybrzeża.",
  },
  {
    title: "Molo",
    description: "Kultowe molo w Kołobrzegu – spacer, widoki i letnia atmosfera nad morzem.",
  },
  {
    title: "Rejsy wycieczkowe",
    description: "Rejsy statkiem z portu – odkryjcie wybrzeże Bałtyku z perspektywy wody.",
  },
  {
    title: "Trasy rowerowe",
    description: "Ścieżki rowerowe wzdłuż wybrzeża Bałtyku – aktywny wypoczynek dla całej rodziny.",
  },
  {
    title: "Atrakcje dla dzieci",
    description: "Parki, place zabaw i rodzinne atrakcje w Grzybowie i okolicach.",
  },
  {
    title: "Restauracje i smażalnie",
    description: "Smażalnie ryb i restauracje nad morzem – smaki regionu po dniu na plaży.",
  },
  {
    title: "Turystyka rodzinna",
    description: "Spokojna okolica Grzybowa sprzyja rodzinnym wakacjom nad Bałtykiem.",
  },
  {
    title: "Wydarzenia sezonowe",
    description: "Festiwale, koncerty i imprezy plenerowe w sezonie letnim w regionie.",
  },
  {
    title: "Spacery nad morzem",
    description: "Szerokie plaże i promenady – relaksujące spacery o zachodzie słońca.",
  },
] as const;

/** SEO sekcji Okolica i atrakcje */
export const AREA_SEO_PHRASES = [
  "okolica Grzybowo",
  "atrakcje Grzybowo",
  "atrakcje Kołobrzeg",
  "co zobaczyć w Grzybowie",
  "co robić w Grzybowie",
  "wakacje Grzybowo",
  "wydarzenia Grzybowo",
  "noclegi blisko atrakcji",
  "atrakcje nad Bałtykiem",
  "rodzinne atrakcje Grzybowo",
  "Kołobrzeg 360",
] as const;

export const BEACH_LIVE_CAMERA_URL =
  "https://grzybowo.pl/strona-278-widok_z_kamery_na_plazy_w_grzybowie.html";
export const KOLOBRZEG_360_URL = "https://www.kolobrzeg360.pl/";

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

export const VIVA_VIRTUAL_TOUR_URL =
  "http://grzybowo-noclegi.pl/wirtualnyspacer/Kolor/ViVa.html";

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
      "Domki Viva w Grzybowie leżą około 500 metrów od plaży – to kilka minut spacerem nad morzem.",
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
      "Aktualny kalendarz imprez i festynów znajdziesz na podstronie Wydarzenia w okolicy – kategorie prowadzą do oficjalnego kalendarza Kołobrzegu na i-kolobrzeg.pl.",
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
  "domki 500 m od plaży",
  "Grzybowo",
  "Kołobrzeg",
  "Bałtyk",
  "woj. zachodniopomorskie",
  ...AREA_SEO_PHRASES,
  ...VIRTUAL_TOUR_SEO_PHRASES,
] as const;
