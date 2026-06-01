import type { CitizenCase, CitizenDocument, DashboardStats } from "./types"

// Simulirani API pozivi — zamijeniti pravim endpointima kada backend bude spreman.
// MOCK_DELAY env var omogućuje postavljanje kašnjenja na 0 u testovima.
const DELAY = process.env.MOCK_DELAY !== undefined ? Number(process.env.MOCK_DELAY) : 800

function wait(ms: number) {
  return new Promise<void>(r => setTimeout(r, ms))
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  await wait(DELAY * 0.7)
  return { resolved: 12, inProgress: 3, awaitingPayment: 1 }
}

export async function fetchCases(): Promise<CitizenCase[]> {
  await wait(DELAY)
  return [
    { id: "1", title: "Zahtjev za parkirnu dozvolu", ref: "#8291", date: "2023-10-12", status: "resolved" },
    { id: "2", title: "Komunalni porez 2023", ref: "#9021", date: "2023-10-10", status: "awaiting-payment", amountDue: 48 },
    { id: "3", title: "Upit o gospodarenju otpadom", ref: "#7742", date: "2023-10-05", status: "in-progress" },
  ]
}

export async function fetchDocuments(): Promise<CitizenDocument[]> {
  await wait(DELAY * 0.8)
  return [
    { id: "1", name: "Potvrda o plaćenom porezu", fileType: "PDF", fileSize: "1.2 MB" },
    { id: "2", name: "Preslika osobne iskaznice", fileType: "PDF", fileSize: "0.8 MB" },
  ]
}
