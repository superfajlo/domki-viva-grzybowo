export const KOLOBRZEG_EVENTS_BASE = "https://i-kolobrzeg.pl";

export const EVENTS_CACHE_TTL_MS = 4 * 60 * 60 * 1000; // 4 godziny

export const KOLOBRZEG_EVENT_CATEGORIES = [
  { id: "all", label: "Wszystkie" },
  { id: "concerts", label: "Koncerty" },
  { id: "cinema", label: "Kino" },
  { id: "sport", label: "Sport" },
  { id: "culture", label: "Kultura" },
  { id: "library", label: "Biblioteka" },
  { id: "theatre", label: "Teatr" },
  { id: "standup", label: "Stand-up" },
] as const;

export type EventCategoryId = (typeof KOLOBRZEG_EVENT_CATEGORIES)[number]["id"];

export const KOLOBRZEG_EVENT_SOURCES = [
  {
    id: "concerts" as const,
    label: "Koncerty",
    categoryId: 101,
    path: "/wydarzenia-kategoria-101.html",
  },
  {
    id: "cinema" as const,
    label: "Kino",
    categoryId: 114,
    path: "/wydarzenia-kategoria-114.html",
  },
  {
    id: "sport" as const,
    label: "Sport",
    categoryId: 102,
    path: "/wydarzenia-kategoria-102.html",
  },
  {
    id: "culture" as const,
    label: "Kultura",
    categoryId: 152,
    path: "/wydarzenia-kategoria-152.html",
  },
  {
    id: "library" as const,
    label: "Biblioteka",
    categoryId: 116,
    path: "/wydarzenia-kategoria-116.html",
  },
  {
    id: "theatre" as const,
    label: "Teatr",
    categoryId: 111,
    path: "/wydarzenia-kategoria-111.html",
  },
  {
    id: "standup" as const,
    label: "Stand-up",
    categoryId: 119,
    path: "/wydarzenia-kategoria-119.html",
  },
] as const;

export type EventSourceId = (typeof KOLOBRZEG_EVENT_SOURCES)[number]["id"];
