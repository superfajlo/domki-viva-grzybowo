import { ContactForm } from "@/components/ContactForm";
import { CONTACT } from "@/lib/site";

export function KontaktSection() {
  return (
    <section id="kontakt" className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title">Kontakt</h2>
        <p className="section-lead">
          Zarezerwuj noclegi w Grzybowie nad morzem – zadzwoń lub wypełnij formularz.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <div className="rounded-2xl border border-sand-dark bg-cream/60 p-6">
              <h3 className="font-display text-lg font-bold text-ink">Telefon</h3>
              <a
                href={CONTACT.phoneHref}
                className="mt-2 inline-block text-2xl font-bold text-secondary hover:text-amber-hover hover:underline"
              >
                {CONTACT.phone}
              </a>
            </div>

            <div className="rounded-2xl border border-sand-dark bg-cream/60 p-6">
              <h3 className="font-display text-lg font-bold text-ink">Adres</h3>
              <address className="mt-2 not-italic text-ink-muted">
                {CONTACT.address}
                <br />
                {CONTACT.city}
              </address>
            </div>

            <div className="overflow-hidden rounded-2xl border border-sand-dark">
              <iframe
                title="Mapa – Domki Viva Grzybowo, Łąkowa 4A"
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(CONTACT.fullAddress)}&z=14&output=embed`}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-sand-dark bg-cream/40 p-4 sm:p-6 md:p-8">
            <h3 className="font-display text-xl font-bold text-ink">Formularz kontaktowy</h3>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
