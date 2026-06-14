import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-container mx-auto max-w-2xl py-32 text-center">
      <h1 className="font-display text-3xl font-bold text-ink">Strona nie istnieje</h1>
      <p className="mt-4 text-ink-muted">
        Sprawdź adres URL lub wróć na stronę główną Domków Viva w Grzybowie.
      </p>
      <Link href="/" className="btn-cta mt-8 inline-block">
        Strona główna
      </Link>
    </div>
  );
}
