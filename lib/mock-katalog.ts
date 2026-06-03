import type { ServiceCategory, SecurityLevel } from "@/lib/types";

// MOCK_DELAY env var omogućuje 0 kašnjenja u testovima (usklađeno s lib/mock-messages.ts).
const DELAY = process.env.MOCK_DELAY !== undefined ? Number(process.env.MOCK_DELAY) : 800;

/**
 * Mock katalog životnih područja (/katalog). Zamijeniti pravim API pozivima kad
 * backend bude spreman. `icon` je string ključ → vidi components/katalog/category-icons.ts.
 */
export const CATEGORIES: ServiceCategory[] = [
  {
    id: "cat-obitelj",
    slug: "obitelj-i-zivot",
    title: "Obitelj i život",
    examples:
      "Prijava novorođenog djeteta · Sklapanje braka · Rodiljne i roditeljske potpore",
    icon: "users",
    href: "/katalog/obitelj-i-zivot",
    area: "Obitelj i život",
    audiences: ["Građani"],
    security: "nias2",
  },
  {
    id: "cat-zdravlje",
    slug: "zdravlje",
    title: "Zdravlje",
    examples:
      "e-Kartoton · Narudžba kod liječnika · Europska kartica zdravstvenog osiguranja",
    icon: "heart-pulse",
    href: "/katalog/zdravlje",
    area: "Zdravlje",
    audiences: ["Građani", "Umirovljenici"],
    security: "nias1",
  },
  {
    id: "cat-rad",
    slug: "rad",
    title: "Rad",
    examples:
      "Prijava na Zavod za zapošljavanje · Mirovinski staž · Porezna kartica",
    icon: "briefcase",
    href: "/katalog/rad",
    area: "Rad",
    audiences: ["Građani", "Poslovni subjekti"],
    security: "nias2",
  },
  {
    id: "cat-obrazovanje",
    slug: "obrazovanje",
    title: "Obrazovanje",
    examples:
      "e-Dnevnik · Upisi u školu i vrtić · Stipendije i studentski krediti",
    icon: "graduation-cap",
    href: "/katalog/obrazovanje",
    area: "Obrazovanje",
    audiences: ["Građani", "Učenici i studenti"],
    security: "nias1",
  },
  {
    id: "cat-financije",
    slug: "financije-i-porezi",
    title: "Financije i porezi",
    examples: "ePorezna · Godišnja porezna prijava · Lokalni porezi i pristojbe",
    icon: "coins",
    href: "/katalog/financije-i-porezi",
    area: "Financije i porezi",
    audiences: ["Građani", "Poslovni subjekti"],
    security: "nias2",
  },
  {
    id: "cat-drzava",
    slug: "drzava-i-pravo",
    title: "Država i pravo",
    examples:
      "Zemljišne knjige · Sudski postupci · Izvadak iz kaznene evidencije",
    icon: "scale",
    href: "/katalog/drzava-i-pravo",
    area: "Država i pravo",
    audiences: ["Građani", "Poslovni subjekti"],
    security: "nias2",
  },
  {
    id: "cat-promet",
    slug: "promet",
    title: "Promet",
    examples: "Registracija vozila · Vozačka dozvola · Tehnički pregled",
    icon: "car",
    href: "/katalog/promet",
    area: "Promet",
    audiences: ["Građani"],
    security: "nias1",
  },
  {
    id: "cat-stanovanje",
    slug: "stanovanje",
    title: "Stanovanje",
    examples: "Prijava prebivališta · Energetski certifikat · Komunalne naknade",
    icon: "home",
    href: "/katalog/stanovanje",
    area: "Stanovanje",
    audiences: ["Građani"],
    security: "nias1",
  },
];

/** Opcija filtera (vrijednost + vidljiva oznaka). Vrijednost "" znači „bez filtera”. */
export interface FilterOption {
  value: string;
  label: string;
}

/** Područja: "Sve" + naziv svake kategorije (filtrira ServiceCategory.area). */
export const AREAS: FilterOption[] = [
  { value: "", label: "Sve" },
  ...CATEGORIES.map((c) => ({ value: c.area, label: c.area })),
];

/** Ciljane skupine korisnika (filtrira audiences.includes). */
export const AUDIENCES: FilterOption[] = [
  { value: "", label: "Svi" },
  { value: "Građani", label: "Građani" },
  { value: "Poslovni subjekti", label: "Poslovni subjekti" },
  { value: "Umirovljenici", label: "Umirovljenici" },
  { value: "Učenici i studenti", label: "Učenici i studenti" },
];

/**
 * Razine sigurnosti (filtrira ServiceCategory.security). Napomena: nijedna
 * kategorija nema "none" → odabir "Bez prijave" svjesno daje 0 rezultata
 * (demonstrira/testira prazno stanje filtera).
 */
export const SECURITY_LEVELS: { value: "" | SecurityLevel; label: string }[] = [
  { value: "", label: "Sve razine" },
  { value: "none", label: "Bez prijave" },
  { value: "nias1", label: "Niska razina – NIAS 1" },
  { value: "nias2", label: "Visoka razina – NIAS 2" },
];

/**
 * Dohvat kataloga. Simulira mrežno kašnjenje.
 * Test seam: `EG_EMPTY_KATALOG=1` → prazan katalog (prazno-backend stanje),
 *            `EG_KATALOG_ERROR=1` → baca grešku (error boundary).
 */
export async function getCategories(): Promise<ServiceCategory[]> {
  await new Promise((r) => setTimeout(r, DELAY));
  if (process.env.EG_KATALOG_ERROR === "1") {
    throw new Error("Katalog usluga trenutačno nije dostupan.");
  }
  if (process.env.EG_EMPTY_KATALOG === "1") return [];
  return CATEGORIES;
}
