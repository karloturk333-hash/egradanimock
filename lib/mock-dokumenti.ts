import type { CitizenDocument } from "@/lib/types";

// MOCK_DELAY env var omogućuje 0 kašnjenja u testovima (usklađeno s lib/mock-katalog.ts).
const DELAY = process.env.MOCK_DELAY !== undefined ? Number(process.env.MOCK_DELAY) : 800;

/**
 * Generira mali samostalni `data:` URI tako da gumb „Preuzmi” stvarno spremi
 * datoteku (umjesto pravog backend endpointa u mocku). Sadržaj je plain text
 * pa preuzimanje radi bez vanjskih resursa.
 */
function dataUri(text: string): string {
  return `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
}

/**
 * Mock dokumenti građanina (/dokumenti). Zamijeniti pravim API pozivima kad
 * backend bude spreman. Datumi izdavanja su ISO 8601. Pet aktivnih + tri
 * arhivirana dokumenta, raspoređena po kategorijama (Osobni dokumenti, Porez,
 * Obrazovanje, Zdravstvo, Vozila).
 */
export const DOCUMENTS: CitizenDocument[] = [
  {
    id: "doc-2001",
    name: "Potvrda o prebivalištu",
    fileType: "PDF",
    fileSize: "248 KB",
    issuedAt: "2026-05-22",
    category: "Osobni dokumenti",
    isArchived: false,
    downloadUrl: dataUri(
      "POTVRDA O PREBIVALIŠTU\n\nMinistarstvo unutarnjih poslova\nKlasa: 224-01/26-01/1234\n\nOvime se potvrđuje prijavljeno prebivalište na adresi navedenoj u sustavu e-Građani.\n\n(Mock dokument — sadržaj služi isključivo za demonstraciju preuzimanja.)",
    ),
  },
  {
    id: "doc-2002",
    name: "Domovnica",
    fileType: "PDF",
    fileSize: "312 KB",
    issuedAt: "2026-04-09",
    category: "Osobni dokumenti",
    isArchived: false,
    downloadUrl: dataUri(
      "DOMOVNICA\n\nRepublika Hrvatska\nIzvadak iz knjige državljana\n\nElektronički zapis o hrvatskom državljanstvu izdan putem sustava e-Građani.\n\n(Mock dokument — sadržaj služi isključivo za demonstraciju preuzimanja.)",
    ),
  },
  {
    id: "doc-2003",
    name: "Porezno rješenje 2025",
    fileType: "PDF",
    fileSize: "186 KB",
    issuedAt: "2026-03-31",
    category: "Porez",
    isArchived: false,
    downloadUrl: dataUri(
      "POREZNO RJEŠENJE ZA 2025. GODINU\n\nPorezna uprava\nGodišnji obračun poreza na dohodak\n\nNa temelju godišnjeg obračuna utvrđen je povrat poreza. Detalji su navedeni u rješenju.\n\n(Mock dokument — sadržaj služi isključivo za demonstraciju preuzimanja.)",
    ),
  },
  {
    id: "doc-2004",
    name: "Potvrda o studiranju",
    fileType: "PDF",
    fileSize: "142 KB",
    issuedAt: "2026-02-18",
    category: "Obrazovanje",
    isArchived: false,
    downloadUrl: dataUri(
      "POTVRDA O STUDIRANJU\n\nSveučilište u Zagrebu\nAkademska godina 2025./2026.\n\nPotvrđuje se status redovitog studenta. Izdano putem sustava e-Građani.\n\n(Mock dokument — sadržaj služi isključivo za demonstraciju preuzimanja.)",
    ),
  },
  {
    id: "doc-2005",
    name: "Prometna dozvola",
    fileType: "PDF",
    fileSize: "204 KB",
    issuedAt: "2026-01-27",
    category: "Vozila",
    isArchived: false,
    downloadUrl: dataUri(
      "PROMETNA DOZVOLA\n\nMinistarstvo unutarnjih poslova\nElektronički zapis o vozilu\n\nPodaci o registriranom vozilu i razdoblju važenja registracije.\n\n(Mock dokument — sadržaj služi isključivo za demonstraciju preuzimanja.)",
    ),
  },
  {
    id: "doc-2006",
    name: "Rodni list",
    fileType: "PDF",
    fileSize: "276 KB",
    issuedAt: "2025-11-12",
    category: "Osobni dokumenti",
    isArchived: true,
    downloadUrl: dataUri(
      "RODNI LIST\n\nMatični ured\nIzvadak iz matice rođenih\n\nElektronički zapis o činjenici rođenja izdan putem sustava e-Građani.\n\n(Mock dokument — sadržaj služi isključivo za demonstraciju preuzimanja.)",
    ),
  },
  {
    id: "doc-2007",
    name: "Potvrda o nekažnjavanju",
    fileType: "PDF",
    fileSize: "158 KB",
    issuedAt: "2025-09-05",
    category: "Osobni dokumenti",
    isArchived: true,
    downloadUrl: dataUri(
      "POTVRDA O NEKAŽNJAVANJU\n\nMinistarstvo pravosuđa i uprave\nIzvadak iz kaznene evidencije\n\nPotvrđuje se da osoba nije pravomoćno osuđivana. Izdano putem sustava e-Građani.\n\n(Mock dokument — sadržaj služi isključivo za demonstraciju preuzimanja.)",
    ),
  },
  {
    id: "doc-2008",
    name: "Preslika osobne iskaznice",
    fileType: "PDF",
    fileSize: "390 KB",
    issuedAt: "2025-07-19",
    category: "Osobni dokumenti",
    isArchived: true,
    downloadUrl: dataUri(
      "PRESLIKA OSOBNE ISKAZNICE\n\nMinistarstvo unutarnjih poslova\nDigitalna preslika identifikacijske isprave\n\nElektronička preslika osobne iskaznice pohranjena u sustavu e-Građani.\n\n(Mock dokument — sadržaj služi isključivo za demonstraciju preuzimanja.)",
    ),
  },
];

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
