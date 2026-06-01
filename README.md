# eGrađani — Redizajn citizen dashboarda

Moderan, pristupačan redizajn korisničkog portala za fiktivni državni e-servis.
Portfolio projekt. **v0.1**

## Pregled

Aktualni dizajn eGrađani portala pokazuje znakove starenja — zastarjeli UI, nedostupnost na mobilnim uređajima i nekonzistentni vizualni jezik. Ovaj projekt demonstrira kako bi moderni redizajn mogao izgledati uz naglasak na:

- **Pristupačnost** — WCAG AA kontrast, skip link, `aria-*` atributi, keyboard navigacija
- **Mobile-first** — bottom navigation bar na mobilnom, sidebar na desktopu
- **Čisto upravljanje stanjima** — svaki dohvat podataka ima loading, error i success stanje
- **Dizajn sistem** — CSS tokeni, reusable komponente, nema hardkodiranih vrijednosti

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Jezik | TypeScript |
| Stilovi | Tailwind CSS v4 + CSS custom properties |
| Fontovi | Inter (body), Playfair Display (naslovi) |

## Struktura projekta

```
app/
  globals.css        — dizajn tokeni i globalni stilovi
  layout.tsx         — root layout (sidebar, top bar, bottom nav)
  page.tsx           — citizen dashboard

components/
  ui/
    Badge.tsx        — status pill (success / warning / error / info / neutral)
    Card.tsx         — površina s opcionalnim paddingom i clip
    Icon.tsx         — Lucide icon wrapper
    Skeleton.tsx     — shimmer loading placeholder
    Spinner.tsx      — loading indikator
  dashboard/
    StatCard.tsx     — kartica statistike s 3 stanja
    CaseListItem.tsx — predmet s badge statusom i iznosom
    DocListItem.tsx  — dokument s preuzimanjem
  layout/
    Sidebar.tsx      — desktop navigacija (sticky)
    TopAppBar.tsx    — mobile header s pozdravom
    BottomNav.tsx    — mobile bottom navigation

lib/
  types.ts           — AsyncState<T>, CitizenCase, CitizenDocument, DashboardStats
```

## Pokretanje

```bash
npm install
npm run dev
```

Otvori `http://localhost:3000`.

## v0.1 — što je implementirano

- [x] Dashboard skeleton s mock podacima
- [x] Stat kartice: Riješeno / U obradi / Čeka plaćanje
- [x] Lista predmeta s badge statusima
- [x] Lista dokumenata s preuzimanjem
- [x] Responsive layout (mobile bottom nav + desktop sidebar)
- [x] Loading i error stanja za svaki blok
- [x] Skip link, focus ring, ARIA labeli
- [x] Dizajn sistem (CSS tokeni, Inter + Playfair Display)

## Roadmap

- [ ] Stranica Dokumenti
- [ ] Stranica Zahtjevi (forma za novi zahtjev)
- [ ] Stranica Poruke
- [ ] Stranica Profil
- [ ] Playwright testovi za svaki feature
- [ ] Animacije prijelaza između stranica
