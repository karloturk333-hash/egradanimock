import type { CitizenProfile } from "@/lib/types";

// MOCK_DELAY env var omogućuje 0 kašnjenja u testovima (usklađeno s ostalim mockovima).
const DELAY = process.env.MOCK_DELAY !== undefined ? Number(process.env.MOCK_DELAY) : 800;

const PROFILE: CitizenProfile = {
  id: "user-1",
  fullName: "Marko Horvat",
  initials: "MH",
  oib: "12345678901",
  dateOfBirth: "1990-04-12",
  address: "Ulica kralja Tomislava 14, 10000 Zagreb",
  email: "marko.horvat@example.hr",
  phone: "+385 91 234 5678",
  niasLevel: "nias2",
  memberSince: "2019-09-01",
  notifications: { email: true, sms: false },
};

/**
 * Dohvat profila prijavljenog korisnika. Simulira mrežno kašnjenje.
 * Test seam: `EG_PROFIL_ERROR=1` → baca grešku (error boundary + retry).
 */
export async function getProfile(): Promise<CitizenProfile> {
  await new Promise((r) => setTimeout(r, DELAY));
  if (process.env.EG_PROFIL_ERROR === "1") {
    throw new Error("Profil trenutačno nije moguće dohvatiti.");
  }
  return PROFILE;
}
