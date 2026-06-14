import { GALLERY_SECTIONS } from "@/lib/gallery-images";
import Image from "next/image";
import Link from "next/link";

const PREVIEW = GALLERY_SECTIONS.flatMap((s) => s.images).slice(0, 4);

export function HomeGalleryPreview() {
  if (PREVIEW.length < 4) return null;

  const [main, ...rest] = PREVIEW;

  return (
    <section className="section-padding bg-white" aria-labelledby="home-gallery-heading">
      <div className="page-container mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="badge-gold w-fit">Galeria</p>
            <h2 id="home-gallery-heading" className="section-title mt-4">
              Zobacz Domki Viva na zdjęciach
            </h2>
            <p className="section-lead">
              Ogród, domki z zewnątrz i wnętrza – zanim zdecydujesz się na termin pobytu.
            </p>
          </div>
          <Link href="/galeria/" className="btn-cta-outline shrink-0">
            Cała galeria
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
          <Link
            href="/galeria/"
            className="group relative col-span-2 row-span-2 min-h-[220px] overflow-hidden rounded-3xl sm:min-h-[320px] lg:min-h-[380px]"
          >
            <Image
              src={main.src}
              alt={main.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink">
              Zobacz więcej zdjęć →
            </span>
          </Link>
          {rest.map((img) => (
            <Link
              key={img.src}
              href="/galeria/"
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-auto lg:min-h-[180px]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
