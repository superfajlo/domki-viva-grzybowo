# Strategia SEO – Domki Viva Grzybowo (Topic Cluster)

## Model architektury

| Rola | URL | Cel pozycjonowania |
|------|-----|-------------------|
| **Hub** | `/` | Noclegi / domki Grzybowo – prezentacja obiektu i regionu |
| **Cluster** | `/oferta/` | Konkretna oferta domków 2–5 osób |
| **Cluster** | `/cennik/` | Ceny i warunki pobytu |
| **Cluster** | `/galeria/` | Zdjęcia obiektu |
| **Cluster** | `/atrakcje-okolicy/` | Atrakcje regionu |
| **Cluster** | `/kontakt/` | Rezerwacja i dane kontaktowe |
| **Cluster** | `/regulamin-obiektu/` | Zasady pobytu |

**Zasada:** Strona główna nie zawiera pełnej treści podstron – tylko skróty + linki wewnętrzne.

---

## Strona główna `/`

**Title (bez zmian):**  
`Domki ,,Viva'' | Noclegi w Grzybowie nad morzem`

**Meta Description (bez zmian):**  
`W naszej ofercie znajdziecie Państwo domki 2, 3, 4, 5 osobowe posiadające własny aneks kuchenny oraz bogate wyposażenie.`

| Element | Wartość |
|---------|---------|
| Primary Keyword | noclegi Grzybowo |
| Secondary | domki Grzybowo, domki nad morzem, noclegi blisko plaży, wakacje Grzybowo, domki Kołobrzeg okolice |
| H1 | Domki Viva Grzybowo – noclegi nad morzem |
| H2 | Domki Viva w Grzybowie nad morzem · Dlaczego Domki Viva? · Grzybowo i okolice – atrakcje w skrócie · Informacje dla gości · Pytania o pobyt |
| H3 | Karty atutów, teasery atrakcji, kafelki podstron, FAQ |

**Linkowanie wewnętrzne:** → `/oferta/`, `/cennik/`, `/galeria/`, `/atrakcje-okolicy/`, `/kontakt/`, `/regulamin-obiektu/`, kotwica `/#wirtualny-spacer`

**Rekomendacje:** Nie rozbudowywać cennika ani regulaminu na hubie. Aktualizować sezonowe akcenty (Grzybowo, 500 m plaży) bez powielania H2 z podstron.

---

## Oferta `/oferta/`

**Title:** `Oferta Domków Viva Grzybowo | Komfortowe Domki 2-5 Osób Nad Morzem`  
**Description:** `Poznaj ofertę Domków Viva w Grzybowie...`

| Element | Wartość |
|---------|---------|
| Primary | domki Grzybowo oferta |
| Secondary | domki 2-5 osób, aneks kuchenny, domki dla rodzin |
| H1 | Oferta domków Viva w Grzybowie |
| H2 | Domki w Grzybowie · Udogodnienia · FAQ oferty |
| H3 | Domki 2/3/4/5 osób, karty udogodnień |

**Linkowanie:** Hub ← → Cennik, Galeria, Kontakt  
**Unikanie kanibalizacji:** Nie używać „cennik” jako głównego KW; ceny tylko wzmianka + link.

---

## Cennik `/cennik/`

**Title:** `Cennik | Dom Gościnny Viva - Grzybowo | Domki ,,Viva''`  
**Description:** `Cennik. Wczasy w Grzybowie...`

| Element | Wartość |
|---------|---------|
| Primary | cennik noclegów Grzybowo |
| H1 | Cennik pobytu w Domkach Viva |
| H2 | Sezony (maj–wrzesień), ważne informacje, FAQ cen |

**Linkowanie:** → Regulamin, Oferta, Kontakt  
**Kanibalizacja:** Nie konkurować z „oferta domki” – fokus na cenę i termin.

---

## Galeria `/galeria/`

**Title:** `Galeria | Dom Gościnny Viva - Grzybowo | Domki ,,Viva''`  
**Description:** `Galeria. Wczasy w Grzybowie...`

| Primary | galeria domków Grzybowo  
| H1 | Galeria Domków Viva w Grzybowie  
| H2 | Galeria (lightbox)  

**Linkowanie:** → Oferta, Atrakcje, Kontakt  
**Alt zdjęć:** unikalne, lokalne (Grzybowo, Viva, plaża).

---

## Atrakcje okolicy `/atrakcje-okolicy/`

**Title:** `Atrakcje okolicy | Domki ,,Viva''`  
**Description:** `Poznaj atrakcje Grzybowa i okolic...`

| Primary | atrakcje Grzybowo  
| H1 | Atrakcje okolicy Grzybowo i Kołobrzeg  
| H2 | Karty atrakcji · Wydarzenia · Kołobrzeg 360° · FAQ okolicy  
| H3 | Pojedyncze atrakcje, kategorie wydarzeń  

**Hub:** tylko 1-zdaniowe teasery + link tutaj.  
**Lokalne SEO:** Grzybowo, Kołobrzeg, Bałtyk, Dźwirzyno.

---

## Kontakt `/kontakt/`

**Title:** `Kontakt | Domki Viva - Grzybowo | Domki ,,Viva''`  
**Description:** `Kontakt. Wczasy w Grzybowie...`

| Primary | kontakt Domki Viva Grzybowo  
| H1 | Kontakt – Domki Viva Grzybowo  
| H2 | Telefon · Adres · Formularz · FAQ kontaktu  

**Schema:** LocalBusiness (w layout), NAP spójny: Łąkowa 4A, 507 130 571.

---

## Regulamin `/regulamin-obiektu/`

**Title:** `REGULAMIN OBIEKTU | Domki ,,Viva''`  
**Description:** `Zapoznaj się z regulaminem Domków Viva...`

| Primary | regulamin Domki Viva  
| H1 | Regulamin obiektu Domki Viva  
| H2 | Punkty 1–19 · Najważniejsze zasady  

**Linkowanie:** → Cennik, Kontakt (rezerwacja).

---

## Mapa linkowania (cluster)

```
                    [Strona główna /]
                   /    |    |    \
            oferta  cennik galeria atrakcje
               \      |      /      /
                kontakt ← regulamin
```

## Wytyczne Google (skrót)

- Intencja użytkownika na każdej podstronie osobno  
- Treść naturalna, bez upychania KW  
- Unikalne H1/H2/H3 i FAQ  
- Breadcrumbs + canonical per URL  
- Sitemap z wszystkimi URL  
- Mobile-first (zachowany design)

## Implementacja techniczna

- Metadata: `lib/seo-pages.ts`  
- Hub treści: `lib/home-hub.ts`, `components/hub/`  
- FAQ podstron: `lib/page-faqs.ts`  
- Routing: `app/*/page.tsx`
