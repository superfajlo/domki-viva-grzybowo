/** SEO sekcji regulaminu – nie zmienia SEO strony głównej */
export const REGULAMIN_SEO = {
  title: "Regulamin obiektu | Domki Viva Grzybowo",
  description:
    "Zapoznaj się z regulaminem pobytu w Domkach Viva w Grzybowie. Najważniejsze zasady pobytu, doba hotelowa, parking i informacje organizacyjne.",
} as const;

export const REGULAMIN_SEO_PHRASES = [
  "regulamin Domki Viva",
  "regulamin obiektu Grzybowo",
  "zasady pobytu Grzybowo",
  "regulamin noclegów Grzybowo",
  "domki nad morzem regulamin",
] as const;

export type RegulaminBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; intro?: string; items: string[] };

export type RegulaminRule = {
  number: number;
  blocks: RegulaminBlock[];
};

export const REGULAMIN_RULES: RegulaminRule[] = [
  {
    number: 1,
    blocks: [
      { type: "paragraph", text: "Obowiązuje segregacja odpadów." },
      {
        type: "list",
        intro: "Pod zlewem znajdują się kosze na:",
        items: ["plastik", "szkło", "odpady zmieszane", "bio"],
      },
      {
        type: "paragraph",
        text: "Papier należy wyrzucać do pojemnika znajdującego się na zewnątrz budynku.",
      },
      { type: "paragraph", text: "Prosimy o zgniatanie odpadów plastikowych." },
    ],
  },
  {
    number: 2,
    blocks: [
      { type: "paragraph", text: "Cisza nocna obowiązuje w godzinach:" },
      { type: "paragraph", text: "23:00 – 7:00." },
    ],
  },
  {
    number: 3,
    blocks: [
      {
        type: "paragraph",
        text: "Doba hotelowa rozpoczyna się o godzinie 15:00 w dniu przyjazdu i kończy o godzinie 10:00 w dniu wyjazdu.",
      },
    ],
  },
  {
    number: 4,
    blocks: [
      {
        type: "paragraph",
        text: "Opłata za pobyt pobierana jest gotówką w dniu przyjazdu za cały okres rezerwacji.",
      },
    ],
  },
  {
    number: 5,
    blocks: [
      {
        type: "paragraph",
        text: "W przypadku niewykorzystania całości lub części pobytu nie przysługuje zwrot zapłaconej kwoty ani obniżenie ceny usługi.",
      },
    ],
  },
  {
    number: 6,
    blocks: [
      {
        type: "paragraph",
        text: "Osoby odwiedzające gości mogą przebywać na terenie obiektu do godziny 22:00.",
      },
    ],
  },
  {
    number: 7,
    blocks: [
      {
        type: "paragraph",
        text: "Gość ponosi pełną odpowiedzialność materialną za powierzone mienie oraz wszelkie szkody powstałe z jego winy lub winy osób odwiedzających.",
      },
    ],
  },
  {
    number: 8,
    blocks: [
      {
        type: "paragraph",
        text: "Dzieci powinny pozostawać pod stałą opieką osób dorosłych, szczególnie podczas korzystania z placu zabaw.",
      },
    ],
  },
  {
    number: 9,
    blocks: [
      {
        type: "paragraph",
        text: "Zachowanie gości nie może zakłócać spokojnego pobytu innych osób.",
      },
      {
        type: "paragraph",
        text: "Właściciel może odmówić dalszego świadczenia usług osobie naruszającej regulamin.",
      },
      {
        type: "paragraph",
        text: "W takim przypadku opłata za pobyt nie podlega zwrotowi.",
      },
    ],
  },
  {
    number: 10,
    blocks: [
      {
        type: "paragraph",
        text: "Zabrania się przestawiania mebli oraz przenoszenia wyposażenia pomiędzy domkami.",
      },
    ],
  },
  {
    number: 11,
    blocks: [
      { type: "paragraph", text: "Zabrania się używania i posiadania:" },
      {
        type: "list",
        items: [
          "kuchenek gazowych,",
          "butli gazowych,",
          "grzejników elektrycznych,",
        ],
      },
      {
        type: "paragraph",
        text: "które nie stanowią wyposażenia obiektu.",
      },
    ],
  },
  {
    number: 12,
    blocks: [
      {
        type: "paragraph",
        text: "Obowiązuje całkowity zakaz palenia papierosów w domkach, również w łazienkach.",
      },
    ],
  },
  {
    number: 13,
    blocks: [{ type: "paragraph", text: "Obowiązuje zakaz smażenia ryb w domkach." }],
  },
  {
    number: 14,
    blocks: [
      {
        type: "paragraph",
        text: "Zabrania się zabawy kamykami znajdującymi się przy tujach oraz wynoszenia ich na trawę.",
      },
    ],
  },
  {
    number: 15,
    blocks: [
      {
        type: "paragraph",
        text: "Właściciel nie ponosi odpowiedzialności za pozostawione pieniądze, dokumenty i przedmioty wartościowe.",
      },
    ],
  },
  {
    number: 16,
    blocks: [
      {
        type: "paragraph",
        text: "Prosimy o pozostawienie domku w stanie, w jakim został przekazany podczas zameldowania.",
      },
    ],
  },
  {
    number: 17,
    blocks: [
      { type: "paragraph", text: "Parking dla gości jest:" },
      { type: "list", items: ["bezpłatny,", "niestrzeżony."] },
      { type: "paragraph", text: "Na każdy domek przypada jedno miejsce parkingowe." },
    ],
  },
  {
    number: 18,
    blocks: [{ type: "paragraph", text: "Obiekt jest monitorowany całodobowo." }],
  },
  {
    number: 19,
    blocks: [
      {
        type: "paragraph",
        text: "Brak możliwości pobytu ze zwierzętami tylko w okresie letnim.",
      },
    ],
  },
];

export const REGULAMIN_HIGHLIGHTS = [
  "Cisza nocna: 23:00–7:00",
  "Zakaz palenia papierosów",
  "Zakaz smażenia ryb",
  "Brak możliwości pobytu ze zwierzętami tylko w okresie letnim",
  "Monitoring całodobowy",
  "Jedno miejsce parkingowe na domek",
  "Doba hotelowa: 15:00–10:00",
] as const;
