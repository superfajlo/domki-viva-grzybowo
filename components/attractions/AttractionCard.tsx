import type { AreaAttraction } from "@/lib/area-attractions";
import Image from "next/image";

type AttractionCardProps = {
  attraction: AreaAttraction;
};

export function AttractionCard({ attraction }: AttractionCardProps) {
  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-sand-dark bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lg hover:shadow-primary/10">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand">
        <Image
          src={attraction.image}
          alt={attraction.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span
          className="icon-gold-bg absolute left-3 top-3 h-11 w-11 text-lg shadow-sm"
          aria-hidden
        >
          {attraction.icon}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-6">
        <h3 className="line-clamp-3 min-h-[4.75rem] font-display text-xl font-bold leading-snug text-ink sm:min-h-[3.75rem] sm:line-clamp-2 sm:text-[1.35rem]">
          {attraction.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
          {attraction.description}
        </p>
        <a
          href={attraction.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta-outline mt-auto w-full shrink-0 pt-5 sm:w-auto"
        >
          Dowiedz się więcej
        </a>
      </div>
    </article>
  );
}
