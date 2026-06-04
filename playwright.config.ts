import { defineConfig, devices } from "@playwright/test";

/**
 * Dev serveri (webpack — stabilno na WSL/DrvFs), svaki s vlastitim NEXT_DIST_DIR:
 *  - 3210: normalni podaci (mock poruke + dashboard)
 *  - 3211: prazno + sporo (EG_EMPTY_INBOX + EG_EMPTY_DASHBOARD + EG_EMPTY_KATALOG, MOCK_DELAY=1500)
 *          → provjera empty stanja i vidljivog loading skeletona
 *  - 3212: greška dohvata (EG_DASHBOARD_ERROR + EG_KATALOG_ERROR) → provjera error boundary + retry
 *
 * Napomena: inline env varijable (VAR=val) pretpostavljaju POSIX shell
 * (Linux/macOS/WSL). Na čistom Windowsu koristiti cross-env.
 */
export const BASE_URL = "http://localhost:3210";
export const EMPTY_URL = "http://localhost:3211";
export const ERROR_URL = "http://localhost:3212";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
    {
      name: "tablet",
      use: { ...devices["Desktop Chrome"], viewport: { width: 820, height: 1180 } },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 5"] },
    },
  ],
  webServer: [
    {
      command: "MOCK_DELAY=0 NEXT_DIST_DIR=.next-e2e npx next dev --webpack -p 3210",
      url: `${BASE_URL}/poruke`,
      timeout: 120_000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command:
        "MOCK_DELAY=1500 EG_EMPTY_INBOX=1 EG_EMPTY_DASHBOARD=1 EG_EMPTY_KATALOG=1 EG_EMPTY_DOKUMENTI=1 EG_EMPTY_PREDMETI=1 NEXT_DIST_DIR=.next-e2e-empty npx next dev --webpack -p 3211",
      url: `${EMPTY_URL}/poruke`,
      timeout: 120_000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command:
        "MOCK_DELAY=0 EG_DASHBOARD_ERROR=1 EG_KATALOG_ERROR=1 EG_DOKUMENTI_ERROR=1 EG_PROFIL_ERROR=1 EG_PREDMETI_ERROR=1 NEXT_DIST_DIR=.next-e2e-error npx next dev --webpack -p 3212",
      url: `${ERROR_URL}/poruke`,
      timeout: 120_000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
