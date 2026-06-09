# Podłączenie domeny www.grzybowo-noclegi.pl + Google Search Console

**Kanoniczny adres w kodzie strony:** `https://www.grzybowo-noclegi.pl`

> **Tylko domena u firmy, bez starego hostingu → DNS na Vercel**  
> Instrukcja krok po kroku: [`docs/PRZEKIEROWANIE-DOMENA.md`](./PRZEKIEROWANIE-DOMENA.md)

---

## 1. Vercel – zmienne środowiskowe

W **Project → Settings → Environment Variables** (Production + Preview opcjonalnie):

| Zmienna | Wartość |
|---------|---------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.grzybowo-noclegi.pl` |
| `GOOGLE_SITE_VERIFICATION` | kod z GSC (po dodaniu właściwości) |
| `SMTP_*`, `CONTACT_TO_EMAIL` | jak w `.env.example` |
| `VIVA_TOUR_USE_PROXY` | `true` (dopóki spacer nie jest lokalnie) |

Po zapisie: **Redeploy**.

---

## 2. Vercel – domeny i DNS

1. **Domains** → dodaj:
   - `www.grzybowo-noclegi.pl` (główna)
   - `grzybowo-noclegi.pl` (przekierowanie na www – ustaw w Vercel)
2. U registratora domeny ustaw rekordy z panelu Vercel, np.:
   - `www` → CNAME → `cname.vercel-dns.com`
   - `@` → A `76.76.21.21` (lub ALIAS według Vercel)
3. Poczekaj na propagację DNS (zwykle 15 min – 48 h).

---

## 3. Co generuje strona (SEO)

| Adres | Opis |
|-------|------|
| `https://www.grzybowo-noclegi.pl/robots.txt` | Zezwala indeksowanie; blokuje `/api/`; wskazuje sitemap |
| `https://www.grzybowo-noclegi.pl/sitemap.xml` | 8 podstron + wirtualny spacer |
| Każda podstrona | `canonical`, Open Graph, Twitter – z `NEXT_PUBLIC_SITE_URL` |

### URL-e w sitemap

- `/`
- `/oferta/`
- `/cennik/`
- `/galeria/`
- `/wydarzenia/`
- `/atrakcje-okolicy/`
- `/kontakt/`
- `/regulamin-obiektu/`
- `/wirtualnyspacer/Kolor/ViVa.html`

---

## 4. Google Search Console (pierwsze podłączenie)

1. [search.google.com/search-console](https://search.google.com/search-console)
2. **Dodaj właściwość** → **Prefiks URL**:  
   `https://www.grzybowo-noclegi.pl`
3. Weryfikacja **tag HTML**:
   - Skopiuj tylko wartość z `content="..."` w instrukcji Google
   - Vercel → `GOOGLE_SITE_VERIFICATION=ta_wartosc`
   - Redeploy → w GSC **Weryfikuj**
4. **Mapy witryn** → dodaj:  
   `https://www.grzybowo-noclegi.pl/sitemap.xml`
5. **Sprawdzenie adresu URL** → wyślij do indeksacji m.in. `/`, `/oferta/`, `/galeria/`, `/kontakt/`

### Profil Firmy w Google

Jeśli w profilu jest już ten sam adres www – **nie musisz nic zmieniać**. GSC to osobny panel (statystyki + sitemap).

### Stary hosting WordPress

Gdy DNS wskazuje na Vercel, na starym serwerze opcjonalnie ustaw **301** całej domeny na `https://www.grzybowo-noclegi.pl`.

---

## 5. Checklist po podłączeniu DNS

- [ ] `https://www.grzybowo-noclegi.pl/` – strona działa, kłódka SSL
- [ ] `http://www.grzybowo-noclegi.pl/` → przekierowanie na https
- [ ] `https://grzybowo-noclegi.pl/` → przekierowanie na www
- [ ] `https://www.grzybowo-noclegi.pl/robots.txt` – widać `Sitemap: https://www.grzybowo-noclegi.pl/sitemap.xml`
- [ ] `https://www.grzybowo-noclegi.pl/sitemap.xml` – same URL-e z **https** i **www**
- [ ] GSC: weryfikacja OK, sitemap status „Pomyślnie”
- [ ] Formularz kontaktowy wysyła mail

---

## 6. Lokalnie (.env.local)

```
NEXT_PUBLIC_SITE_URL=https://www.grzybowo-noclegi.pl
```

Bez tej zmiennej kod i tak użyje domyślnego `https://www.grzybowo-noclegi.pl` z `lib/site.ts`.
