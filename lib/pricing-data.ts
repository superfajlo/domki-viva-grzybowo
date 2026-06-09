/** Dane cennika 2026 – nie zmieniać cen, dat ani zasad */

export const PRICING_INFO_BAR = [
  { icon: "calendar" as const, text: "Minimum 6 noclegów" },
  { icon: "beach" as const, text: "Około 700 m do plaży" },
  { icon: "home" as const, text: "Domki 2–5 osobowe" },
  { icon: "utilities" as const, text: "Media w cenie" },
  { icon: "phone" as const, text: "Rezerwacja telefoniczna" },
] as const;

export type PriceLine = { label: string; value: string };

export type PeriodCard = {
  id: string;
  period: string;
  badge?: string;
  lines: PriceLine[];
  extraPrice?: { label: string; value: string };
};

export const PRICING_MAY = {
  monthLabel: "MAJ 2026",
  period: "1 maja – 31 maja",
  lines: [
    { label: "2 osoby", value: "160 zł / doba" },
    { label: "każda kolejna osoba", value: "25 zł / doba" },
  ] as PriceLine[],
  weekendTitle: "Weekend majowy",
  weekendLines: [
    { label: "przy 2 noclegach", value: "400 zł / doba" },
    { label: "przy 3 noclegach", value: "350 zł / doba" },
  ] as PriceLine[],
  note: "Cena dodatkowej osoby obowiązuje przez cały okres rezerwacji.",
} as const;

export const PRICING_JUNE = {
  monthLabel: "CZERWIEC 2026",
  cards: [
    {
      id: "jun-1",
      period: "31 maja – 7 czerwca",
      lines: [
        { label: "2 osoby", value: "180 zł / doba" },
        { label: "kolejna osoba", value: "25 zł / doba" },
      ],
    },
    {
      id: "jun-2",
      period: "7 czerwca – 14 czerwca",
      lines: [
        { label: "2 osoby", value: "190 zł / doba" },
        { label: "kolejna osoba", value: "25 zł / doba" },
      ],
    },
    {
      id: "jun-3",
      period: "14 czerwca – 21 czerwca",
      lines: [
        { label: "2 osoby", value: "200 zł / doba" },
        { label: "kolejna osoba", value: "25 zł / doba" },
      ],
    },
    {
      id: "jun-4",
      period: "21 czerwca – 28 czerwca",
      lines: [
        { label: "do 4 osób", value: "220 zł / doba" },
        { label: "kolejna osoba", value: "25 zł / doba" },
      ],
    },
  ] as PeriodCard[],
  turnusNote: "Zmiany turnusów wyłącznie w soboty i niedziele.",
} as const;

export const PRICING_SUMMER = {
  monthLabel: "LIPIEC I SIERPIEŃ 2026",
  popularBadge: "Najpopularniejszy termin wakacyjny",
  infoLines: [
    "Cena za domek do 4 osób.",
    "Maksymalnie 5 osób.",
    "Dopłata za piątą osobę zgodnie z cennikiem.",
  ],
  cards: [
    {
      id: "sum-1",
      period: "28.06 – 05.07",
      lines: [{ label: "", value: "300 zł / doba" }],
      extraPrice: { label: "kolejna osoba", value: "30 zł / doba" },
    },
    {
      id: "sum-2",
      period: "05.07 – 12.07",
      lines: [{ label: "", value: "350 zł / doba" }],
      extraPrice: { label: "kolejna osoba", value: "30 zł / doba" },
    },
    {
      id: "sum-3",
      period: "12.07 – 16.08",
      lines: [{ label: "", value: "390 zł / doba" }],
      extraPrice: { label: "kolejna osoba", value: "30 zł / doba" },
    },
    {
      id: "sum-4",
      period: "16.08 – 23.08",
      lines: [{ label: "", value: "320 zł / doba" }],
      extraPrice: { label: "kolejna osoba", value: "30 zł / doba" },
    },
    {
      id: "sum-5",
      period: "23.08 – 30.08",
      lines: [{ label: "", value: "260 zł / doba" }],
      extraPrice: { label: "kolejna osoba", value: "30 zł / doba" },
    },
  ] as PeriodCard[],
  turnusNote: "Zmiany turnusów wyłącznie w soboty i niedziele.",
} as const;

export const PRICING_SEPTEMBER = {
  monthLabel: "WRZESIEŃ 2026",
  period: "30 sierpnia – 30 września",
  lines: [
    { label: "2 osoby", value: "160 zł / doba" },
    { label: "każda kolejna osoba", value: "25 zł / doba" },
  ] as PriceLine[],
} as const;

export const PRICING_IMPORTANT = {
  title: "Ważne informacje",
  points: [
    "Cena noclegu zawiera wszystkie opłaty za media.",
    "Ceny obowiązują przy minimum 6 noclegach.",
    "Krótszy pobyt ustalany jest indywidualnie.",
    "Doba hotelowa rozpoczyna się o godzinie 15:00.",
    "Doba hotelowa kończy się o godzinie 10:00.",
    "W sezonie obowiązują pobyty tygodniowe.",
    "Wyjazdy i przyjazdy odbywają się wyłącznie w soboty i niedziele.",
    "Obowiązuje opłata miejscowa (klimatyczna).",
  ],
  localTax: {
    title: "Opłata miejscowa",
    amount: "3,00 zł dziennie za osobę",
    note: "W 2026 roku nie przewidziano ulg w opłacie miejscowej.",
  },
} as const;
