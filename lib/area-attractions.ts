/** Atrakcje okolicy – karty z linkami zewnętrznymi i zdjęciami WebP w /public/images/atrakcje/ */

export type AreaAttraction = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  image: string;
  imageAlt: string;
};

export const AREA_ATTRACTIONS: AreaAttraction[] = [
  {
    id: "kaja",
    title: "Ośrodek Jeździecki Kaja",
    description:
      "Popularna stadnina koni w Grzybowie oferująca jazdy konne, naukę jazdy oraz atrakcje dla całej rodziny.",
    href: "https://www.konie-grzybowo.pl/",
    icon: "🐴",
    image: "/images/atrakcje/konie-kaja.webp",
    imageAlt: "Ośrodek Jeździecki Kaja – jazda konna w Grzybowie",
  },
  {
    id: "molo",
    title: "Molo w Kołobrzegu",
    description:
      "Jedna z najbardziej rozpoznawalnych atrakcji regionu. Idealne miejsce na spacery i podziwianie zachodów słońca.",
    href: "https://visitkolobrzeg.com/atrakcje/molo",
    icon: "🌊",
    image: "/images/atrakcje/molo-kolobrzeg.webp",
    imageAlt: "Molo w Kołobrzegu nocą – iluminacja i spacer nad morzem",
  },
  {
    id: "latarnia",
    title: "Latarnia Morska w Kołobrzegu",
    description:
      "Historyczna latarnia morska z przepięknym widokiem na morze, port i panoramę miasta.",
    href: "https://latarnia.kolobrzeg.eu/",
    icon: "🗼",
    image: "/images/atrakcje/latarnia-kolobrzeg.webp",
    imageAlt: "Latarnia morska w Kołobrzegu nocą – widok na wieżę i latarnię",
  },
  {
    id: "port",
    title: "Port Morski w Kołobrzegu",
    description:
      "Port pasażerski, rybacki i spacerowy będący jednym z symboli Kołobrzegu.",
    href: "https://dladziecikolobrzeg.pl/atrakcje/port-morski-w-kolobrzegu-pasazerski-zwiedzanie-i-informacje/",
    icon: "⚓",
    image: "/images/atrakcje/port-kolobrzeg.webp",
    imageAlt: "Port morski w Kołobrzegu – latarnia, falochrony i wejście do portu",
  },
  {
    id: "rejs-zachod",
    title: "Rejs statkiem na zachód słońca z dancingiem",
    description:
      "Półtoragodzinny rejs z portu w Kołobrzegu – widok zachodu słońca nad Bałtykiem, muzyka i dancing na pokładzie. Niedaleko Grzybowa, idealna wieczorna atrakcja nad morzem.",
    href: "https://kzp.kolobrzeg.pl/",
    icon: "🌅",
    image: "/images/atrakcje/rejs-zachod-sloneca.webp",
    imageAlt: "Rejs statkiem na zachód słońca w Kołobrzegu – statek, zachód słońca i widok na port",
  },
  {
    id: "muzeum",
    title: "Muzeum Oręża Polskiego",
    description:
      "Jedno z najciekawszych muzeów militarnych w Polsce prezentujące historię Wojska Polskiego oraz regionu.",
    href: "https://www.muzeum.kolobrzeg.pl/pl/",
    icon: "🏛️",
    image: "/images/atrakcje/muzeum-oreza.webp",
    imageAlt: "Muzeum Oręża Polskiego w Kołobrzegu",
  },
  {
    id: "park-linowy",
    title: "Park Linowy Kołobrzeg",
    description: "Atrakcja dla dzieci i dorosłych z trasami o różnym poziomie trudności.",
    href: "https://parklinowykolobrzeg.pl/",
    icon: "🧗",
    image: "/images/atrakcje/park-linowy.webp",
    imageAlt: "Park linowy w Kołobrzegu",
  },
  {
    id: "kajaki",
    title: "Spływy Kajakowe Parsętą",
    description: "Malownicze trasy kajakowe prowadzące przez piękne tereny Pomorza.",
    href: "https://www.piraci-parsety.pl/",
    icon: "🛶",
    image: "/images/atrakcje/splywy-parseta.webp",
    imageAlt: "Spływ kajakowy Parsętą – rzeka wśród lasu",
  },
  {
    id: "piotrus",
    title: "Sala Zabaw Piotruś Pan",
    description:
      "Nowoczesna sala zabaw dla dzieci z wielopoziomowymi torami przeszkód, basenami z kulkami, zjeżdżalniami oraz atrakcjami dla najmłodszych.",
    href: "https://sala-zabaw-piotrus-pan.pl/",
    icon: "🎠",
    image: "/images/atrakcje/piotrus-pan.webp",
    imageAlt: "Wnętrze sali zabaw Piotruś Pan – place zabaw i konstrukcje dla dzieci",
  },
  {
    id: "dziki-zachod",
    title: "Dziki Zachód – Park Rozrywki Zieleniewo",
    description:
      "Największy park rozrywki w okolicy Kołobrzegu – mnóstwo atrakcji dla dzieci i dorosłych: wioska indiańska, western city, lunapark, motopark, mini zoo i wiele więcej. W Zieleniewie, niedaleko Grzybowa.",
    href: "https://dzikizachod.com.pl/",
    icon: "🤠",
    image: "/images/atrakcje/dziki-zachod.webp",
    imageAlt: "Park Rozrywki Dziki Zachód w Zieleniewo – wioska indiańska i tipi",
  },
  {
    id: "hortulus",
    title: "Ogrody tematyczne w Dobrzycy",
    description:
      "Hortulus Spectabilis – rozległe ogrody tematyczne z labiryntem z żywopłotu, alejkami, rabatami kwiatowymi i atrakcjami dla całej rodziny. Spokojna wycieczka poza nadmorskim szlakiem.",
    href: "https://hortulus.com.pl/",
    icon: "🌿",
    image: "/images/atrakcje/hortulus-dobrzyca.webp",
    imageAlt: "Ogrody Hortulus w Dobrzycy – labirynt z żywopłotu i alejki ogrodowe",
  },
  {
    id: "basen",
    title: "Basen / Aquapark Kołobrzeg",
    description:
      "Nowoczesny kompleks basenowy oferujący strefę rekreacyjną, jacuzzi oraz atrakcje dla dzieci i dorosłych.",
    href: "https://www.sport.kolobrzeg.pl/strona-2566-basen.html",
    icon: "🏊",
    image: "/images/atrakcje/basen-kolobrzeg.webp",
    imageAlt: "Basen i aquapark w Kołobrzegu – kryty basen z torami pływackimi",
  },
  {
    id: "rower",
    title: "Nadmorska Ścieżka Rowerowa",
    description:
      "Malownicza sieć tras rowerowych prowadzących przez Grzybowo, Kołobrzeg, Dźwirzyno i nadmorskie tereny. Idealna atrakcja dla rodzin oraz miłośników aktywnego wypoczynku.",
    href: "https://www.osrodekprzystan.pl/gmina-kolobrzeg-raj-dla-rowerzystow-mapa-tras-rowerowych/",
    icon: "🚴",
    image: "/images/atrakcje/sciezka-rowerowa.webp",
    imageAlt: "Nadmorska ścieżka rowerowa wzdłuż Bałtyku – drewniany deptak",
  },
];
