import type { CitizenCase, CitizenDocument, DashboardStats } from "./types"

// Simulirani API pozivi — zamijeniti pravim endpointima kada backend bude spreman.
// MOCK_DELAY env var omogućuje postavljanje kašnjenja na 0 u testovima.
const DELAY = process.env.MOCK_DELAY !== undefined ? Number(process.env.MOCK_DELAY) : 800

// Test seamovi (analogno EG_EMPTY_INBOX u mock-messages.ts):
//  - EG_EMPTY_DASHBOARD=1 → prazni predmeti i dokumenti (provjera empty stanja)
//  - EG_DASHBOARD_ERROR=1 → dohvat baca grešku (provjera error boundary + retry)
const EMPTY_DASHBOARD = process.env.EG_EMPTY_DASHBOARD === "1"
const DASHBOARD_ERROR = process.env.EG_DASHBOARD_ERROR === "1"

function wait(ms: number) {
  return new Promise<void>(r => setTimeout(r, ms))
}

function failIfSeam() {
  if (DASHBOARD_ERROR) throw new Error("Simulirana greška dohvata (EG_DASHBOARD_ERROR).")
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  await wait(DELAY * 0.7)
  failIfSeam()
  if (EMPTY_DASHBOARD) return { resolved: 0, inProgress: 0, awaitingPayment: 0 }
  return { resolved: 12, inProgress: 3, awaitingPayment: 1 }
}

export async function fetchCases(): Promise<CitizenCase[]> {
  await wait(DELAY)
  failIfSeam()
  if (EMPTY_DASHBOARD) return []
  return [
    { id: "1", title: "Zahtjev za parkirnu dozvolu", ref: "#8291", date: "2023-10-12", status: "resolved" },
    { id: "2", title: "Komunalni porez 2023", ref: "#9021", date: "2023-10-10", status: "awaiting-payment", amountDue: 48 },
    { id: "3", title: "Upit o gospodarenju otpadom", ref: "#7742", date: "2023-10-05", status: "in-progress" },
  ]
}

export async function fetchDocuments(): Promise<CitizenDocument[]> {
  await wait(DELAY * 0.8)
  failIfSeam()
  if (EMPTY_DASHBOARD) return []
  return [
    { id: "1", name: "Potvrda o plaćenom porezu", fileType: "PDF", fileSize: "1.2 MB" },
    { id: "2", name: "Preslika osobne iskaznice", fileType: "PDF", fileSize: "0.8 MB" },
  ]
}
