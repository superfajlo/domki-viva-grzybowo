import { AMENITIES } from "@/lib/site";

export function UdogodnieniaSection() {
  return (
    <section id="udogodnienia" className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title">Udogodnienia</h2>
        <p className="section-lead">
          W murowanych domkach letniskowych z antresolą (37 m²) czeka m.in. bezpłatne Wi-Fi,
          parking, plac zabaw, ogród z grillem, sprzęt plażowy i pralka w każdym domku – wygodny
          pobyt ok. 500 m od morza, w spokojnej okolicy Grzybowa.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((item) => (
            <article
              key={item.title}
              className="flex gap-4 rounded-2xl border border-sand-dark bg-cream/60 p-6"
            >
              <span className="text-3xl" aria-hidden>
                {item.emoji}
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
