# Wdrożenie: domena, spacer, Google Search Console, galeria

## 1. Domena i Vercel

1. W **Vercel** → Project → **Settings** → **Environment Variables**:
   - `NEXT_PUBLIC_SITE_URL` = `https://www.grzybowo-noclegi.pl` (bez `/` na końcu)
   - `VIVA_TOUR_USE_PROXY` = `true` dopóki nie wgrasz pełnego ZIP spaceru, potem `false`
   - SMTP: `SMTP_*`, `CONTACT_TO_EMAIL` (jak w `.env.example`)
2. **Domains**: dodaj `www.grzybowo-noclegi.pl` i `grzybowo-noclegi.pl`.
3. U **registratora DNS** (domena.pl / home.pl itd.):
   - `www` → CNAME na `cname.vercel-dns.com` (lub wartość z panelu Vercel)
   - `@` (apex) → A `76.76.21.21` lub ALIAS/ANAME według instrukcji Vercel
4. W Vercel włącz **przekierowanie** `grzybowo-noclegi.pl` → `https://www.grzybowo-noclegi.pl` (kanoniczny www).
5. **Deploy** po każdej zmianie env.

## 2. Wirtualny spacer

| Etap | Działanie |
|------|-----------|
| **Teraz (proxy)** | `VIVA_TOUR_USE_PROXY=true` – pliki z `www.grzybowo-noclegi.pl` |
| **Na stałe** | ZIP z FTP → `upload/spacer.zip` → `npm run install:viva-tour upload/spacer.zip` → `VIVA_TOUR_USE_PROXY=false` → redeploy |

Nie zostawiaj niepełnego folderu `public/wirtualnyspacer/` (bez `ViVa_skin.xml`) – Next serwuje go zamiast proxy i pojawi się FATAL ERROR.

## 3. Google Search Console

1. Wejdź na [Google Search Console](https://search.google.com/search-console).
2. **Dodaj właściwość** → **Prefiks URL**: `https://www.grzybowo-noclegi.pl`
3. Weryfikacja (najprościej **tag HTML**):
   - Skopiuj wartość z `content="..."` (np. `abc123...`)
   - W Vercel dodaj zmienną: `GOOGLE_SITE_VERIFICATION=abc123...`
   - Redeploy
4. **Mapa witryn** → dodaj: `https://www.grzybowo-noclegi.pl/sitemap.xml`
5. **Sprawdzenie adresu URL** → wyślij do indeksacji `/` i ważne podstrony (`/oferta/`, `/galeria/`, …).
6. Jeśli była stara właściwość (`domkiviva.pl` / stary www):
   - W **Zmiany adresu** (Change of address) wskaż starą → nową domenę, **albo**
   - Na starym hostingu ustaw **301** na `https://www.grzybowo-noclegi.pl` + ten sam sitemap na nowej.

### Co generuje strona

- `https://www.grzybowo-noclegi.pl/robots.txt` → `Sitemap: …/sitemap.xml`
- `https://www.grzybowo-noclegi.pl/sitemap.xml` – wszystkie podstrony z `lib/seo-pages.ts`
- `metadataBase` i `canonical` używają `NEXT_PUBLIC_SITE_URL`

## 4. Galeria

Zdjęcia ze starej strony:

```bash
npm run download:gallery
npm run optimize:gallery
```

Pliki: `public/images/viva/*.webp`, lista w `lib/gallery-images.ts`, strona `/galeria/`.

## 5. Checklist po deployu

- [ ] `https://www.grzybowo-noclegi.pl/` – strona główna
- [ ] `https://www.grzybowo-noclegi.pl/sitemap.xml` – poprawne URL-e (www, https)
- [ ] `https://www.grzybowo-noclegi.pl/galeria/` – miniatury i lightbox
- [ ] `https://www.grzybowo-noclegi.pl/wirtualnyspacer/Kolor/ViVa.html` – spacer
- [ ] Formularz kontaktowy – mail z tematem „noclegi zapytanie”
- [ ] GSC: weryfikacja OK, sitemap „Pomyślnie”
