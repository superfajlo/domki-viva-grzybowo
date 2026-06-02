import { AMENITIES } from "@/lib/site";

const ICONS: Record<string, string> = {
  beach: "🏖️",
  kitchen: "🍳",
  comfort: "✨",
  family: "👨‍👩‍👧‍👦",
  city: "🏙️",
};

export function UdogodnieniaSection() {
  return (
    <section id="udogodnienia" className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title">Udogodnienia</h2>
        <p className="section-lead">
          Domki blisko plaży w Grzybowie – komfort, aneks kuchenny i rodzinna atmosfera na
          wakacje nad morzem w woj. zachodniopomorskim.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((item) => (
            <article
              key={item.title}
              className="flex gap-4 rounded-2xl border border-sand-dark bg-cream/60 p-6"
            >
              <span className="text-3xl" aria-hidden>
                {ICONS[item.icon]}
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
