"use client";

import {
  KOLOBRZEG_EVENT_CATEGORIES,
  type EventCategoryId,
} from "@/lib/kolobrzeg-events/constants";
import type { EventsApiResponse, KolobrzegEvent } from "@/lib/kolobrzeg-events/types";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

function formatEventDate(date: string, time?: string): string {
  const d = new Date(`${date}T12:00:00`);
  const formatted = d.toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return time ? `${formatted}, godz. ${time}` : formatted;
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
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl opacity-40" aria-hidden>
            🎉
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
          <time dateTime={event.time ? `${event.date}T${event.time}` : event.date}>
            {formatEventDate(event.date, event.time)}
          </time>
        </p>
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

type EventsExplorerProps = {
  initialData: EventsApiResponse;
};

export function EventsExplorer({ initialData }: EventsExplorerProps) {
  const [filter, setFilter] = useState<EventCategoryId>("all");
  const [data, setData] = useState<EventsApiResponse>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialData.error ?? null);

  const load = useCallback(async (refresh = false) => {
    if (refresh) setLoading(true);
    try {
      const url = refresh ? "/api/events?refresh=1" : "/api/events";
      const res = await fetch(url);
      const json = (await res.json()) as EventsApiResponse;
      if (!res.ok) {
        setError(json.error ?? "Nie udało się załadować wydarzeń.");
        setData(json);
        return;
      }
      setData(json);
      setError(json.error ?? null);
    } catch {
      setError("Brak połączenia z serwerem. Spróbuj ponownie za chwilę.");
    } finally {
      setLoading(false);
    }
  }, []);

  const filtered = useMemo(() => {
    if (!data?.events) return [];
    if (filter === "all") return data.events;
    return data.events.filter((e) => e.categoryId === filter);
  }, [data, filter]);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtr kategorii wydarzeń">
        {KOLOBRZEG_EVENT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={filter === cat.id}
            onClick={() => setFilter(cat.id)}
            className={`min-h-11 rounded-full px-4 py-2 text-sm font-medium transition ${
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

      {!loading && error && filtered.length === 0 && (
        <div className="mt-10 rounded-2xl border border-sand-dark bg-surface px-6 py-10 text-center">
          <p className="text-ink">{error}</p>
          <button type="button" onClick={() => load(true)} className="btn-cta mt-6">
            Spróbuj ponownie
          </button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p className="mt-10 rounded-2xl border border-sand-dark bg-surface px-6 py-10 text-center text-ink-muted">
          Brak aktualnych wydarzeń w wybranej kategorii. Sprawdź ponownie później lub wybierz
          „Wszystkie”.
        </p>
      )}

      {!loading && filtered.length > 0 && (
        <>
          <p className="mt-6 text-sm text-ink-muted">
            Wyświetlono {filtered.length}{" "}
            {filtered.length === 1 ? "wydarzenie" : filtered.length < 5 ? "wydarzenia" : "wydarzeń"}
            {filter !== "all"
              ? ` · kategoria: ${KOLOBRZEG_EVENT_CATEGORIES.find((c) => c.id === filter)?.label}`
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

      {data?.sourceNote && !loading && (
        <p className="mt-10 text-center text-xs text-ink-muted">
          {data.sourceNote}
          {data.fetchedAt && (
            <>
              {" "}
              · ostatnia aktualizacja:{" "}
              {new Date(data.fetchedAt).toLocaleString("pl-PL", {
                timeZone: "Europe/Warsaw",
                dateStyle: "short",
                timeStyle: "short",
              })}
            </>
          )}
        </p>
      )}
    </div>
  );
}
