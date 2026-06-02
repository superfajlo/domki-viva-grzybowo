import { SEO_KEYWORDS } from "@/lib/site";

export function SeoIntro() {
  return (
    <section className="border-y border-sand-dark bg-sand/40 py-10">
      <div className="page-container mx-auto max-w-4xl text-center">
        <p className="text-sm leading-relaxed text-ink-muted">
          <strong className="text-ink">Domki Viva</strong> to sprawdzone{" "}
          <strong>noclegi w Grzybowie nad morzem</strong> –{" "}
          <strong>domki Grzybowo</strong> i <strong>domki nad morzem Grzybowo</strong> dla
          rodzin szukających <strong>domków letniskowych Grzybowo</strong> oraz{" "}
          <strong>domków blisko plaży Grzybowo</strong>. Około 500 metrów dzieli Was od
          plaży, a <strong>noclegi blisko Kołobrzegu</strong> ułatwiają zwiedzanie portu i
          molo. Zapraszamy na <strong>wakacje Grzybowo</strong>,{" "}
          <strong>wakacje nad morzem</strong> i <strong>rodzinne wakacje nad morzem</strong>{" "}
          w woj. <strong>zachodniopomorskim</strong> – nad <strong>Bałtykiem</strong>, między{" "}
          <strong>Grzybowem</strong> a <strong>Kołobrzegiem</strong>. Zapraszamy na{" "}
          <strong>wirtualny spacer Grzybowo</strong> – zobaczycie{" "}
          <strong>domki Grzybowo wirtualny spacer</strong> jeszcze przed przyjazdem.
        </p>
        <p className="mt-3 text-xs text-ink-muted/80">{SEO_KEYWORDS.join(" · ")}</p>
      </div>
    </section>
  );
}
