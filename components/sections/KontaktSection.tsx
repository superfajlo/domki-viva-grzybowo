import { ContactForm } from "@/components/ContactForm";
import { FajneWczasyVerificationCard } from "@/components/FajneWczasyVerification";
import { NocowaniePlBadge } from "@/components/NocowaniePlBadge";
import { CONTACT } from "@/lib/site";
import Link from "next/link";

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.fullAddress)}`;

export function KontaktSection() {
  return (
    <section
      id="kontakt"
      className="scroll-mt-24 bg-gradient-to-b from-white via-cream/50 to-sand/30 pb-16 pt-4 sm:pb-20 sm:pt-6"
      aria-label="Dane kontaktowe i formularz"
    >
      <div className="page-container mx-auto max-w-7xl">
        <div className="premium-frame">
          <div className="premium-frame-inner flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-center gap-4 sm:gap-5">
              <span className="icon-gold-bg h-14 w-14 shrink-0 rounded-2xl text-2xl" aria-hidden>
                📞
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">
                  Rezerwacja telefoniczna
                </p>
                <a
                  href={CONTACT.phoneHref}
                  className="mt-1 font-display text-3xl font-bold text-ink transition hover:text-secondary sm:text-4xl"
                >
                  {CONTACT.phone}
                </a>
                <p className="mt-1 text-sm text-ink-muted">Najszybszy sposób na potwierdzenie wolnego terminu</p>
              </div>
            </div>
            <a href={CONTACT.phoneHref} className="btn-cta shrink-0 px-8 sm:w-auto">
              Zadzwoń teraz
            </a>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <article className="card-surface group flex gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-md sm:p-6">
            <span className="icon-gold-bg h-12 w-12 shrink-0 rounded-xl text-xl" aria-hidden>
              ✉️
            </span>
            <div className="min-w-0">
              <h2 className="font-display text-lg font-bold text-ink">E-mail</h2>
              <a
                href={CONTACT.emailHref}
                className="mt-1 inline-block break-all text-base font-semibold text-secondary transition hover:text-amber-hover hover:underline"
              >
                {CONTACT.email}
              </a>
              <p className="mt-2 text-sm text-ink-muted">Odpowiadamy na zapytania z formularza i wiadomości e-mail</p>
            </div>
          </article>

          <article className="card-surface group flex gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-md sm:p-6">
            <span className="icon-gold-bg h-12 w-12 shrink-0 rounded-xl text-xl" aria-hidden>
              📍
            </span>
            <div className="min-w-0">
              <h2 className="font-display text-lg font-bold text-ink">Adres</h2>
              <address className="mt-1 not-italic text-base font-medium text-ink">
                {CONTACT.address}
                <br />
                {CONTACT.city}
              </address>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex text-sm font-semibold text-secondary transition hover:text-amber-hover hover:underline"
              >
                Otwórz w Google Maps →
              </a>
            </div>
          </article>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="card-surface h-full p-6 shadow-md sm:p-8">
              <p className="badge-gold w-fit">Formularz</p>
              <h2 className="font-display mt-4 text-2xl font-bold text-ink">Napisz do nas</h2>
              <p className="mt-2 text-sm text-ink-muted">
                Podaj preferowany termin i liczbę osób – wrócimy z informacją o wolnych domkach.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-6 lg:col-span-5">
            <div className="rounded-2xl border border-sand-dark bg-gradient-to-br from-primary/20 via-cream to-white p-5 sm:p-6">
              <h2 className="font-display text-lg font-bold text-ink">Przed wysłaniem zapytania</h2>
              <ul className="mt-4 space-y-3 text-sm text-ink-muted">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary" aria-hidden />
                  Domki 2, 3, 4 i 5 osobowe około 700 m od plaży w Grzybowie
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary" aria-hidden />
                  W sezonie letnim pobyt ze zwierzętami nie jest możliwy
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary" aria-hidden />
                  Aktualny cennik znajdziesz na stronie{" "}
                  <Link href="/cennik" className="font-semibold text-secondary hover:text-amber-hover hover:underline">
                    Cennik
                  </Link>
                </li>
              </ul>
            </div>

            <FajneWczasyVerificationCard />

            <NocowaniePlBadge variant="card" />

            <div className="overflow-hidden rounded-2xl border border-sand-dark bg-surface shadow-md">
              <iframe
                title="Mapa – Domki Viva Grzybowo, Łąkowa 4A"
                className="h-64 w-full border-0 lg:h-full lg:min-h-[320px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(CONTACT.fullAddress)}&z=14&output=embed`}
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
