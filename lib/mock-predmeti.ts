import type { CitizenCase } from "@/lib/types";

// MOCK_DELAY env var omogućuje 0 kašnjenja u testovima.
const DELAY = process.env.MOCK_DELAY !== undefined ? Number(process.env.MOCK_DELAY) : 800;

const CASES: CitizenCase[] = [
  { id: "p1", title: "Zahtjev za parkirnu dozvolu", ref: "#8291", date: "2026-05-20", status: "resolved" },
  { id: "p2", title: "Komunalni porez 2026", ref: "#9021", date: "2026-05-18", status: "awaiting-payment", amountDue: 48 },
  { id: "p3", title: "Upit o gospodarenju otpadom", ref: "#7742", date: "2026-05-12", status: "in-progress" },
  { id: "p4", title: "Zahtjev za građevinsku dozvolu", ref: "#8410", date: "2026-04-30", status: "in-progress" },
  { id: "p5", title: "Prijava promjene prebivališta", ref: "#8377", date: "2026-04-22", status: "resolved" },
  { id: "p6", title: "Naknada za uređenje voda", ref: "#9133", date: "2026-04-10", status: "awaiting-payment", amountDue: 32 },
  { id: "p7", title: "Izvod iz matice rođenih", ref: "#8505", date: "2026-03-28", status: "resolved" },
  { id: "p8", title: "Prigovor na rješenje o porezu", ref: "#9088", date: "2026-03-15", status: "in-progress" },
];

/**
 * Dohvat predmeta građanina. Simulira mrežno kašnjenje.
 * Test seam: `EG_PREDMETI_ERROR=1` → greška; `EG_EMPTY_PREDMETI=1` → prazan popis.
 */
export async function getCases(): Promise<CitizenCase[]> {
  await new Promise((r) => setTimeout(r, DELAY));
  if (process.env.EG_PREDMETI_ERROR === "1") {
    throw new Error("Predmeti trenutačno nije moguće dohvatiti.");
  }
  if (process.env.EG_EMPTY_PREDMETI === "1") return [];
  return CASES;
}
