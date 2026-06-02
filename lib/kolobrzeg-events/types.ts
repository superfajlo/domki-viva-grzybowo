import type { EventSourceId } from "./constants";

export type KolobrzegEvent = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm
  location?: string;
  category: string;
  categoryId: EventSourceId;
  imageUrl?: string;
  detailUrl: string;
  sortKey: number;
};

export type EventsCachePayload = {
  fetchedAt: string;
  expiresAt: string;
  events: KolobrzegEvent[];
  sources: { id: EventSourceId; label: string; count: number }[];
  error?: string;
};

export type EventsApiResponse = {
  events: KolobrzegEvent[];
  fetchedAt: string;
  expiresAt: string;
  stale?: boolean;
  error?: string;
  sourceNote: string;
};
