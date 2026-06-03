import type { CitizenDocument } from "@/lib/types";

// MOCK_DELAY env var omogućuje 0 kašnjenja u testovima (usklađeno s lib/mock-katalog.ts).
const DELAY = process.env.MOCK_DELAY !== undefined ? Number(process.env.MOCK_DELAY) : 800;

/**
 * Mock dokumenti građanina (/dokumenti). Datoteke su pravi PDF-ovi u
 * `public/datoteke/<slug>.pdf` (generirani s `node scripts/generate-pdfs.cjs`),
 * pa preuzimanje i pregled rade s pravim sadržajem. Zamijeniti pravim API
 * pozivima kad backend bude spreman. Pet aktivnih + tri arhivirana dokumenta.
 */
export const DOCUMENTS: CitizenDocument[] = [
  {
    id: "doc-2001",
    slug: "potvrda-o-prebivalistu",
    name: "Potvrda o prebivalištu",
    fileType: "PDF",
    fileSize: "248 KB",
    issuedAt: "2026-05-22",
    category: "Osobni dokumenti",
    isArchived: false,
    downloadUrl: "/datoteke/potvrda-o-prebivalistu.pdf",
  },
  {
    id: "doc-2002",
    slug: "domovnica",
    name: "Domovnica",
    fileType: "PDF",
    fileSize: "312 KB",
    issuedAt: "2026-04-09",
    category: "Osobni dokumenti",
    isArchived: false,
    downloadUrl: "/datoteke/domovnica.pdf",
  },
  {
    id: "doc-2003",
    slug: "porezno-rjesenje-2025",
    name: "Porezno rješenje 2025",
    fileType: "PDF",
    fileSize: "186 KB",
    issuedAt: "2026-03-31",
    category: "Porez",
    isArchived: false,
    downloadUrl: "/datoteke/porezno-rjesenje-2025.pdf",
  },
  {
    id: "doc-2004",
    slug: "potvrda-o-studiranju",
    name: "Potvrda o studiranju",
    fileType: "PDF",
    fileSize: "142 KB",
    issuedAt: "2026-02-18",
    category: "Obrazovanje",
    isArchived: false,
    downloadUrl: "/datoteke/potvrda-o-studiranju.pdf",
  },
  {
    id: "doc-2005",
    slug: "prometna-dozvola",
    name: "Prometna dozvola",
    fileType: "PDF",
    fileSize: "204 KB",
    issuedAt: "2026-01-27",
    category: "Vozila",
    isArchived: false,
    downloadUrl: "/datoteke/prometna-dozvola.pdf",
  },
  {
    id: "doc-2006",
    slug: "rodni-list",
    name: "Rodni list",
    fileType: "PDF",
    fileSize: "276 KB",
    issuedAt: "2025-11-12",
    category: "Osobni dokumenti",
    isArchived: true,
    downloadUrl: "/datoteke/rodni-list.pdf",
  },
  {
    id: "doc-2007",
    slug: "potvrda-o-nekaznjavanju",
    name: "Potvrda o nekažnjavanju",
    fileType: "PDF",
    fileSize: "158 KB",
    issuedAt: "2025-09-05",
    category: "Osobni dokumenti",
    isArchived: true,
    downloadUrl: "/datoteke/potvrda-o-nekaznjavanju.pdf",
  },
  {
    id: "doc-2008",
    slug: "preslika-osobne-iskaznice",
    name: "Preslika osobne iskaznice",
    fileType: "PDF",
    fileSize: "390 KB",
    issuedAt: "2025-07-19",
    category: "Osobni dokumenti",
    isArchived: true,
    downloadUrl: "/datoteke/preslika-osobne-iskaznice.pdf",
  },
];

/** Pronađi dokument po slugu (za detalj/pregled `/dokumenti/[slug]`). */
export function getDocumentBySlug(slug: string): CitizenDocument | undefined {
  return DOCUMENTS.find((d) => d.slug === slug);
}

/**
 * Dohvat dokumenata građanina. Simulira mrežno kašnjenje.
 * Test seam: `EG_DOKUMENTI_ERROR=1` → baca grešku (error boundary),
 *            `EG_EMPTY_DOKUMENTI=1` → prazan popis (prazno stanje).
 */
export async function getDocuments(): Promise<CitizenDocument[]> {
  await new Promise((r) => setTimeout(r, DELAY));
  if (process.env.EG_DOKUMENTI_ERROR === "1") {
    throw new Error("Dokumenti trenutačno nisu dostupni.");
  }
  if (process.env.EG_EMPTY_DOKUMENTI === "1") return [];
  return DOCUMENTS;
}
