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

### v0.2 — Korisnički pretinac (Poruke)

- [ ] Ruta `/poruke` s listom poruka (primljene, nepročitane, arhivirane)
- [ ] `MessageListItem` komponenta — pošiljatelj, naslov, datum, badge nepročitano
- [ ] Detalj poruke — expand/collapse ili zasebna ruta `/poruke/[id]`
- [ ] Paginacija ili infinite scroll za listu poruka
- [ ] Prazno stanje (inbox zero ilustracija + poruka)
- [ ] Loading skeleton i error stanje za svaki blok
- [ ] Broj nepročitanih poruka u Sidebaru i BottomNav (badge na ikoni)
- [ ] Playwright testovi: lista, detalj, mark-as-read, prazno stanje

### Refaktori (code review nalazi)

- [ ] **`DocListItem`** — ukloniti `isLast` prop, zamijeniti s CSS `.eg-divided-list > li:not(:last-child)` klasom
- [ ] **`StatCard`** — `iconColor: string` zamijeniti semantičkim unionom (`"success" | "warning" | "error"`) umjesto raw CSS var stringa
- [ ] **`TopAppBar`** — hardkodirani `aria-label="Obavijesti (1 nova)"` zamijeniti s `notificationCount` propom
- [ ] **`globals.css`** — CSS pravilo `h1, h2, h3 { font-family: var(--font-display) }` promijeniti u `h1, h2` jer `h3` u dashboard komponentama overridea natrag na sans-serif inline stilom
- [ ] **`globals.css`** — `@theme inline` blok je nepotpun (7/25 varijabli) — ili sve dodati ili ukloniti blok i ostati na čistim CSS varijablama
- [ ] **Section-level error stanja** — dodati React ErrorBoundary wrappers po sekcijama (stats, predmeti, dokumenti) za granularniji error handling umjesto samo page-level `error.tsx`

### Ostalo

- [ ] Stranica Dokumenti
- [ ] Stranica Zahtjevi (forma za novi zahtjev)
- [ ] Stranica Profil
- [ ] Animacije prijelaza između stranica
