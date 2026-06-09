# Domena u firmy (registrator) → strona na Vercel (bez starego hostingu)

**Twój przypadek:** stary hosting **nie istnieje**, zostaje tylko **domena** u tej samej firmy (np. home.pl, nazwa.pl). Strona działa wyłącznie na **Vercel**.

---

## Co robisz (w skrócie)

1. W **Vercel** → Project → **Domains** → dodaj:
   - `www.grzybowo-noclegi.pl` (główna)
   - `grzybowo-noclegi.pl` (Vercel sam ustawi przekierowanie na www)
2. W **panelu domeny** (u tej samej firmy) ustaw **DNS** tak jak pokazuje Vercel, zwykle:
   - `www` → **CNAME** → `cname.vercel-dns.com`
   - `@` (apex) → **A** `76.76.21.21` **lub** ALIAS/ANAME (jeśli firma obsługuje)
3. W Vercel **Environment Variables**:
   ```
   NEXT_PUBLIC_SITE_URL=https://www.grzybowo-noclegi.pl
   ```
4. **Redeploy** projektu.
5. Poczekaj na propagację DNS (15 min – 48 h).

**Nie** konfigurujesz przekierowania 301 ze „starego hostingu” — go już nie ma.

---

## Co robi strona (już w projekcie)

| Element | Adres |
|---------|--------|
| Strona | `https://www.grzybowo-noclegi.pl` |
| Sitemap | `https://www.grzybowo-noclegi.pl/sitemap.xml` |
| Robots | `https://www.grzybowo-noclegi.pl/robots.txt` |
| http → https, bez www → www | `middleware.ts` + `vercel.json` |

---

## Wirtualny spacer (ważne)

Stary serwer z plikami Panotour **znika** → proxy na `www.grzybowo-noclegi.pl` **nie zadziała**.

Zrób jedno z dwóch:

1. **Zalecane:** wgraj pełny folder spaceru na Vercel  
   `npm run install:viva-tour upload/spacer.zip`  
   potem na Vercel: `VIVA_TOUR_USE_PROXY=false`
2. Tymczasowo zostaw `VIVA_TOUR_USE_PROXY=true` tylko jeśli pliki spaceru są **gdzie indziej** (inny URL w `VIVA_TOUR_PROXY_ORIGIN`).

---

## Google Search Console

1. Właściwość: `https://www.grzybowo-noclegi.pl`
2. Weryfikacja: `GOOGLE_SITE_VERIFICATION=...` w Vercel → redeploy
3. Mapa witryn: `https://www.grzybowo-noclegi.pl/sitemap.xml`

Szczegóły: [`WDROZENIE-DOMENA-GSC.md`](./WDROZENIE-DOMENA-GSC.md)

---

## Checklist

- [ ] DNS `www` wskazuje na Vercel (zielona domena w panelu Vercel)
- [ ] `https://www.grzybowo-noclegi.pl/` otwiera nową stronę
- [ ] `/sitemap.xml` i `/robots.txt` działają
- [ ] Spacer: pliki na Vercel lub działający `VIVA_TOUR_PROXY_ORIGIN`
- [ ] GSC: weryfikacja + sitemap
