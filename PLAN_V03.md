# Plan v0.3 — Sanacija i poravnanje (review nalazi)

> **Namjena:** ovo je execution plan za Claude Code. Izvodi se **fazno, s gate-ovima**.
> Svaka faza ima _Acceptance kriterij_ koji mora proći (typecheck / build / Playwright)
> **prije** prelaska na sljedeću. Ne prelazi fazu dok gate nije zelen.
>
> **Izvor nalaza:** dizajn-review v0.2 (vizualna dosljednost, pristupačnost, stanja
> podataka, responzivnost, UX/hijerarhija) + nalazi koji nisu izrijekom traženi
> (slomljen build, dvostruki mock, mrtve rute).
>
> **Pravila projekta i dalje vrijede:** vidi `CLAUDE.md`. Bez hardkodiranih boja,
> svako stanje podataka ima loading/error/uspjeh/prazno, pristupačnost obavezna,
> bez `any` bez objašnjenja. Pročitaj `node_modules/next/dist/docs/` prije pisanja
> Next koda (vidi `AGENTS.md` — ovo NIJE Next koji znaš).

---

## Ground rules za izvođenje

- **Dev/build:** projekt koristi **webpack** (`next dev --webpack`), ne Turbopack.
  Playwright dev serveri u `playwright.config.ts` već su tako postavljeni. Ne mijenjaj to.
- **Gate komande (po fazi):**
  - `npx tsc --noEmit -p tsconfig.json` → 0 grešaka
  - `npm run build` → prolazi
  - `npm run test:e2e` → svi testovi zeleni (desktop + mobile projekti)
- **Ne lijepi kod bez čitanja.** Nakon svake faze pročitaj diff prije commita.
- **Commit po fazi.** Jedan commit = jedna faza, s porukom `v0.3 P{n}: <opis>`.
- **Vizualna provjera:** za faze koje mijenjaju izgled, snimi screenshot (desktop 1280px,
  mobile Pixel 5, tablet 768px) i usporedi s opisom u fazi.

---

## FAZA P0 — Popravi slomljeni build (BLOKER, prije svega)

**Zašto:** `tsc --noEmit` trenutno pada. Dok ovo stoji, ništa drugo nema smisla —
ne može se pouzdano buildati ni testirati.

### P0.1 — Oštećen `app/page.tsx`
- Datoteka je na disku oštećena: sve nakon ~38. retka su **null bajtovi (`\x00`)**.
- Rekonstruiraj je. **Ne** vraćaj staru inline-mock verziju — odmah je napiši po
  Fazi P1 obrascu (async data layer). Tj. P0.1 i P1.1 se rade zajedno za ovu datoteku.
- Sanity provjera da nema NUL bajtova nigdje drugdje:
  ```bash
  for f in $(find app components lib -name "*.ts" -o -name "*.tsx"); do
    n=$(tr -cd '\000' < "$f" | wc -c); [ "$n" -gt 0 ] && echo "CORRUPT: $f ($n NUL)";
  done
  ```

### P0.2 — Nedostaje tip `Message`
- `MessageListItem`, `MessageDetail`, `InboxView`, `lib/mock-messages.ts` svi uvoze
  `Message` iz `@/lib/types`, ali tip **nije definiran**. Dodaj u `lib/types.ts`
  (točno po obliku iz `CLAUDE.md` plana v0.2):
  ```ts
  export interface Message {
    id: string;
    senderId: string;
    senderName: string;
    subject: string;
    preview: string;
    body: string;
    sentAt: string;      // ISO 8601
    isRead: boolean;
    isArchived: boolean;
  }
  ```

### P0.3 — Razilaženje radne kopije i renderirane verzije
- Screenshotovi rade, ali disk pada typecheck → postoji druga (ispravna) kopija.
- Utvrdi izvor istine, pomiri ga s repoom, commitaj. Provjeri `git status`,
  `git stash list`, i ima li drugog clone-a/worktree-a.

**🚦 GATE P0:**
- [ ] Nijedna `.ts`/`.tsx` datoteka ne sadrži NUL bajtove
- [ ] `npx tsc --noEmit` → 0 grešaka
- [ ] `npm run build` → prolazi
- [ ] `npm run test:e2e` → postojeći `e2e/poruke.spec.ts` zelen

---

## FAZA P1 — Data layer: dashboard na async, prava stanja, prazna stanja

**Zašto:** Dashboard ima dva izvora podataka — `lib/mock-data.ts` (async, 800ms,
`fetchCases/fetchDocuments/fetchDashboardStats`) **i** hardkodirane `MOCK_*` unutar
`app/page.tsx` (sinkrono, uvijek `status:"success"`). Loading/error grane na
dashboardu su napisane ali **fizički nedostupne** → mrtav kod. Nema empty state-a.

### P1.1 — Dashboard koristi `lib/mock-data.ts`
- Ukloni inline `MOCK_STATS / MOCK_CASES / MOCK_DOCS` iz `app/page.tsx`.
- Dohvaćaj preko `fetchDashboardStats()`, `fetchCases()`, `fetchDocuments()`.
- Odzrcali obrazac iz `/poruke`: server component + `loading.tsx` + `error.tsx`,
  **ili** klijentski `AsyncState<T>` s tri grane. Odaberi jedno i budi dosljedan
  s `/poruke` (koji koristi route-level `loading.tsx`/`error.tsx`).
- Rezultat: loading skeleton i error+retry postaju **stvarni i testabilni**.

### P1.2 — Empty state za predmete i dokumente
- Dodaj granu `data.length === 0` za obje liste. Ne smije ostati prazan ekran.
- Napravi malu reusable `EmptyState` komponentu (ikona + naslov + opis), po uzoru
  na `InboxEmptyState`, da je dijele predmeti i dokumenti.

### P1.3 — Ujednači error UX
- Dashboard error trenutno ispisuje sirovi `{MOCK_CASES.message}` bez retry-a, dok
  `/poruke/error.tsx` ima lijep inline blok + "Pokušaj ponovo". Poravnaj dashboard
  na isti standard (poruka + retry gumb, `--color-error-bg` blok).

**🚦 GATE P1:**
- [ ] `app/page.tsx` nema inline mockova; koristi `lib/mock-data.ts`
- [ ] Loading stanje dashboarda **se stvarno renderira** (provjeri s `MOCK_DELAY`>0 ili forsiranim stanjem)
- [ ] Empty state vidljiv za prazne predmete i prazne dokumente (dodaj test seam analogno `EG_EMPTY_INBOX`)
- [ ] Novi Playwright testovi: dashboard loading, dashboard empty (predmeti+dokumenti), dashboard error+retry
- [ ] `tsc` + `build` + `test:e2e` zeleni

---

## FAZA P2 — Pristupačnost: dodirne mete, semantika, brend tipografija

**Zašto:** državni portal. Kontrast je već dobar (izmjereno: sav tekst prolazi WCAG AA,
najslabiji error-pill 5.0:1). Problemi su drugdje.

### P2.1 — Dodirne mete na 44×44px (WCAG 2.5.5)
Trenutno premale (mjereno iz paddinga):
- download gumb na dokumentu: **36×36** → na 44×44 (povećaj padding ili min-width/height)
- zvono obavijesti (`TopAppBar`): **~38×38** → 44×44
- "Plati {x} €" (`CaseListItem`): **~34px visine** → min-height 44px
- akcijski gumbi u `MessageDetail` (Odgovori/Arhiviraj/Izbriši): provjeri, podigni na 44px
- Vizualno mogu ostati isti; povećaj **hit area** (padding / pseudo-element), ne nužno ikonu.

### P2.2 — Značenje ne smije ovisiti samo o boji (WCAG 1.4.1)
- Nepročitana poruka: lijevi plavi obrub + bold su jedini signali. Dodaj ne-bojni
  indikator (npr. točkica/oznaka uz pošiljatelja, ili `•` prefiks). `Novo` badge
  pomaže, ali ga nemaju sve nepročitane u svim stanjima — provjeri.
- Točkica na zvonu (obavijest) nosi info samo bojom → dodaj `aria-label` koji to kaže
  (već postoji "Obavijesti (1 nova)" — provjeri da je broj dinamičan, ne hardkodiran "1").

### P2.3 — `<li role="button">` → prava semantika
- `MessageListItem` je `<li role="button" tabIndex=0>` s ručnim Enter/Space.
  Zamijeni s `<li>` koji sadrži pravi `<a href="/poruke/[id]">` (ili `<button>` za
  desktop split). Dobijaš nativni fokus, desni-klik, otvori-u-novoj-kartici, i čitači
  ekrana ga objavljuju ispravno. Pazi da desktop split prikaz i dalje radi (možda
  `<a>` s `onClick` koji preventDefault na desktopu, navigira na mobitelu).
- **Ne razbij** postojeće Playwright testove koji ciljaju `getByRole("button", ...)` —
  ažuriraj testove na `getByRole("link", ...)` gdje je primjereno.

### P2.4 — Brend tipografija ("eGradani" bez kvačice)
- Na sidebaru/mobilnom logu ime se renderira kao **"eGradani"** (bez đ), dok header
  ima "eGrađani". Uzrok: Playfair fallback (Georgia) ili font koji ne pokriva
  hrvatske dijakritike u toj težini.
- Riješi: (a) provjeri da `next/font` Playfair ima `subsets: ["latin","latin-ext"]`
  (latin-ext nosi đ/č/ž/š), i (b) osiguraj fallback font s dijakriticima. Ako se
  Playfair ne učita, đ mora i dalje biti ispravan u fallbacku.
- Provjeri **sve** statične stringove brenda da nema hardkodiranog "eGradani".

**🚦 GATE P2:**
- [ ] Sve interaktivne mete ≥ 44×44px (provjeri u DevTools/screenshotom)
- [ ] Nijedna informacija ne ovisi isključivo o boji
- [ ] `MessageListItem` koristi nativni link/button, ne `<li role=button>`
- [ ] "eGrađani" ispravno (s đ) u svim viewportima i s/bez učitanog fonta
- [ ] Postojeći a11y aspekti (skip-link, aria-current, role=list, fokus prsten) i dalje rade
- [ ] `tsc` + `build` + `test:e2e` zeleni (uklj. ažurirane selektore)

---

## FAZA P3 — Responzivnost: tablet, scroll-affordance, sticky detalj

**Zašto:** mobilni i desktop izgledaju dobro; tablet (768–1024px) je nepokriven i
sumnjiv, a dva manja UX propusta skrivaju informacije.

### P3.1 — Tablet split-view (768–1024px)
- Sidebar se uključuje na `min-width:768px`. Na 768px: sidebar 256 + lista 420 +
  gutter 24 + paddinzi ≈ premašuje 768 → detalj poruke stisnut/lomi se.
- Opcije: (a) na 768–1024 sakrij desni detalj i koristi list-only + ruta `/poruke/[id]`
  (kao mobitel), split tek od ~1024px; ili (b) smanji fiksnu širinu liste na tabletu.
- Testiraj na točno 768px i 820px.

### P3.2 — Scroll-affordance za stat kartice na mobitelu
- `.eg-stats` skriva scrollbar → korisnik ne zna da 3. kartica ("Čeka plaćanje",
  najhitnija — rok!) postoji desno. Dodaj **peek** (djelić sljedeće kartice viri,
  npr. `width: 85%` zadnje vidljive) ili točkice-indikator ispod.

### P3.3 — Sticky detalj poruke (kratke poruke)
- `MessageDetail` je `height: calc(100vh - ...)`; kod kratke poruke footer s gumbima
  "lebdi" daleko od teksta (velika praznina). Promijeni na `min-height` umjesto fiksne
  visine, ili poravnaj footer odmah ispod sadržaja (ne na dno viewporta) kad je kratko.

**🚦 GATE P3:**
- [ ] Inbox upotrebljiv na 768px i 820px (screenshot dokaz)
- [ ] 3. stat kartica otkriva svoje postojanje na mobitelu (peek ili točkice)
- [ ] Kratka poruka: footer uz tekst, bez velike praznine
- [ ] `tsc` + `build` + `test:e2e` zeleni (dodaj tablet viewport projekt u `playwright.config.ts` ako treba)

---

## FAZA P4 — UX i hijerarhija: brend duplikat, mrtve rute, hitnost

**Zašto:** finalni sloj poliranja kad je sve ostalo stabilno.

### P4.1 — Ukloni duplikat brenda u headeru
- Na desktopu sidebar već nosi "eGrađani". `TopAppBar` ga **ponavlja** kao H1 +
  pozdrav. Header neka nosi **kontekst stranice** (npr. naziv trenutne rute) ili samo
  korisnika; logo ostaje u sidebaru. Na mobitelu (bez sidebara) header zadržava brend.
- Pazi na heading hijerarhiju: točno jedan H1 po stranici.

### P4.2 — Mrtve nav rute (404)
- "Predmeti", "Dokumenti", "Profil" vode u 404 (`app/predmeti` itd. ne postoje).
- Odluči po opsegu portfolija: (a) napravi minimalne rute s placeholder/empty state,
  ili (b) vizualno označi kao "uskoro" (disabled stil + `aria-disabled`), da ne
  izgledaju jednako klikabilne kao radeći linkovi. **Ne** ostavljaj tihi 404.

### P4.3 — Istakni hitnu akciju
- "Čeka plaćanje — Rok za 2 dana" je financijski i vremenski hitno, ali je 3. kartica
  (skroz desno, skrivena iza scrolla na mobitelu) i samo joj je ikona obojena.
- Pojačaj vizualnu hitnost te kartice (npr. obrub/pozadina iz `--color-error-bg`,
  ili premjesti prvu na mobitelu). Iskoristi postojeće tokene hitnosti — ne izmišljaj boje.

**🚦 GATE P4 (završni):**
- [ ] Brend se ne duplicira na desktopu; jedan H1 po stranici
- [ ] Nijedan vidljivi nav link ne vodi u tihi 404
- [ ] Hitna ("Čeka plaćanje") kartica vizualno prioritizirana
- [ ] `tsc` + `build` + `test:e2e` zeleni
- [ ] Završni screenshot-pregled: desktop / tablet / mobile za `/` i `/poruke`

---

## Redoslijed i ovisnosti

```
P0 (build)  →  P1 (data)  →  P2 (a11y)  →  P3 (responsive)  →  P4 (UX)
   BLOKER       temelj        državni req    širine            poliranje
```

P0 je tvrdi bloker. P1 mora prije P2/P3 jer stanja podataka (loading/empty) utječu na
ono što se a11y/responsive testira. P2 prije P3 jer semantika linkova (P2.3) mijenja
Playwright selektore koje P3 testovi koriste. P4 zadnji.

## Što NE raditi (iz CLAUDE.md + review)
- Ne vraćati inline mockove u `app/page.tsx`.
- Ne preskakati empty/loading/error ni na jednoj listi.
- Ne mijenjati dizajn-tokene bez razloga; hitnost/stanja već imaju tokene.
- Ne prelaziti fazu dok gate nije zelen.
- Ne razbiti postojeće `e2e/poruke.spec.ts` — ažuriraj selektore kad mijenjaš semantiku.

## Postojeći TODO (code review v0.1) — počisti usput
Ovi su već u `CLAUDE.md` i prirodno padaju u gornje faze:
- `DocListItem isLast` → CSS `.eg-divided-list` (P1, dok diraš dashboard liste)
- `StatCard iconColor` → tip `"success"|"warning"|"error"` umjesto `string` (P2)
- `TopAppBar aria-label` → dinamičan `notificationCount` (P2.2)
- `globals.css h3` konflikt → `h1, h2` (P2/P4 dok diraš headinge)
- `globals.css @theme inline` nepotpun mapping → dovrši ili ukloni (P0/P1)
- `lib/format.ts` → izvuci `formatDate`, dijeli dashboard/inbox (P1; rješava i nedosljedan datum format)
