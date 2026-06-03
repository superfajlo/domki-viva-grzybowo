"use client";

import { EventCategoryFallback } from "@/components/events/EventCategoryFallback";
import {
  KOLOBRZEG_EVENT_CATEGORIES,
  type EventCategoryId,
} from "@/lib/kolobrzeg-events/constants";
import type { EventsApiResponse, KolobrzegEvent } from "@/lib/kolobrzeg-events/types";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

function formatEventDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function EventCard({ event, index }: { event: KolobrzegEvent; index: number }) {
  return (
    <article
      className="pricing-reveal pricing-reveal--visible group flex flex-col overflow-hidden rounded-2xl border border-sand-dark bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lg hover:shadow-primary/10"
      style={{ transitionDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl opacity-40" aria-hidden>
            📅
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-surface/95 px-3 py-1 text-xs font-semibold text-ink shadow-sm">
          {event.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-lg font-bold leading-snug text-ink sm:text-xl">
          {event.title}
        </h3>
        <p className="mt-2 text-sm font-medium text-secondary">
          <time dateTime={event.date}>{formatEventDate(event.date)}</time>
        </p>
        {event.time ? (
          <p className="mt-1 text-sm text-ink-muted">
            Godzina: <time dateTime={`${event.date}T${event.time}`}>{event.time}</time>
          </p>
        ) : null}
        {event.location ? (
          <p className="mt-2 text-sm leading-relaxed text-ink-muted line-clamp-3">
            <span className="font-medium text-ink">Miejsce: </span>
            {event.location}
          </p>
        ) : null}

        <a
          href={event.detailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta-outline mt-5 w-full sm:w-auto"
        >
          Zobacz szczegóły
        </a>
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-sand-dark bg-surface">
      <div className="aspect-[16/10] bg-sand" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 rounded bg-sand" />
        <div className="h-4 w-1/2 rounded bg-sand" />
        <div className="h-10 w-full rounded-full bg-sand" />
      </div>
    </div>
  );
}

const DEFAULT_SOURCE_NOTE =
  "Dane z kalendarza UM Kołobrzeg (i-kolobrzeg.pl). Odświeżane automatycznie co 4 godziny.";

type EventsExplorerProps = {
  initialData?: EventsApiResponse | null;
};

export function EventsExplorer({ initialData = null }: EventsExplorerProps) {
  const [filter, setFilter] = useState<EventCategoryId>("all");
  const [data, setData] = useState<EventsApiResponse>(() =>
    initialData?.events?.length
      ? initialData
      : { events: [], fetchedAt: "", expiresAt: "", sourceNote: DEFAULT_SOURCE_NOTE },
  );
  const [loading, setLoading] = useState(!initialData?.events?.length);
  const [error, setError] = useState<string | null>(initialData?.error ?? null);

  const load = useCallback(async (refresh = false, silent = false) => {
    if (!silent) setLoading(true);
    try {
      const url = refresh ? "/api/events?refresh=1" : "/api/events";
      const res = await fetch(url, { cache: "no-store" });
      const json = (await res.json()) as EventsApiResponse;
      setData({
        events: Array.isArray(json.events) ? json.events : [],
        fetchedAt: json.fetchedAt ?? "",
        expiresAt: json.expiresAt ?? "",
        stale: json.stale,
        error: json.error,
        sourceNote: json.sourceNote ?? DEFAULT_SOURCE_NOTE,
      });
      setError(json.error ?? null);
    } catch {
      setError("Brak połączenia z serwerem. Spróbuj ponownie za chwilę.");
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialData?.events?.length) {
      void load(false, true);
    } else {
      void load(false);
    }
  }, [initialData?.events?.length, load]);

  const events = data.events;
  const filtered = useMemo(() => {
    if (filter === "all") return events;
    return events.filter((e) => e.categoryId === filter);
  }, [events, filter]);

  const showCards = !loading && filtered.length > 0;
  const showFilterFallback = !loading && events.length > 0 && filtered.length === 0;
  const showGlobalFallback = !loading && events.length === 0;

  return (
    <div>
      <div
        className="-mx-4 flex gap-2 overflow-x-auto overscroll-x-contain px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Filtr kategorii wydarzeń"
      >
        {KOLOBRZEG_EVENT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={filter === cat.id}
            onClick={() => setFilter(cat.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition min-h-11 ${
              filter === cat.id
                ? "bg-gradient-to-r from-primary to-secondary text-ink shadow-md"
                : "border border-sand-dark bg-surface text-ink-muted hover:border-secondary/50 hover:bg-sand"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {showCards && (
        <>
          <p className="mt-6 text-sm text-ink-muted">
            Wyświetlono {filtered.length}{" "}
            {filtered.length === 1 ? "wydarzenie" : filtered.length < 5 ? "wydarzenia" : "wydarzeń"}
            {filter !== "all"
              ? ` · ${KOLOBRZEG_EVENT_CATEGORIES.find((c) => c.id === filter)?.label}`
              : ""}
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((event, index) => (
              <li key={event.detailUrl}>
                <EventCard event={event} index={index} />
              </li>
            ))}
          </ul>
        </>
      )}

      {showFilterFallback && (
        <EventCategoryFallback activeFilter={filter} />
      )}

      {showGlobalFallback && (
        <>
          {error ? (
            <div className="mt-8 rounded-2xl border border-sand-dark bg-surface px-6 py-5 text-center">
              <p className="text-sm text-ink-muted">{error}</p>
              <button type="button" onClick={() => load(true)} className="btn-cta mt-4">
                Odśwież kalendarz
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => load(true)} className="btn-cta-outline mt-8">
              Spróbuj pobrać wydarzenia ponownie
            </button>
          )}
          <EventCategoryFallback />
        </>
      )}

      {!loading && events.length > 0 && (
        <p className="mt-10 text-center text-xs text-ink-muted">
          {data.sourceNote}
          {data.fetchedAt ? (
            <>
              {" "}
              · ostatnia aktualizacja:{" "}
              {new Date(data.fetchedAt).toLocaleString("pl-PL", {
                timeZone: "Europe/Warsaw",
                dateStyle: "short",
                timeStyle: "short",
              })}
            </>
          ) : null}
        </p>
      )}
    </div>
  );
}
