import { defineConfig, devices } from "@playwright/test";

/**
 * Dva dev servera (webpack — stabilno na WSL/DrvFs):
 *  - 3210: normalni pretinac (mock poruke)
 *  - 3211: prazni pretinac (EG_EMPTY_INBOX=1) za provjeru praznog stanja
 * Različiti NEXT_DIST_DIR da serveri ne dijele .next.
 *
 * Napomena: inline env varijable (VAR=val) pretpostavljaju POSIX shell
 * (Linux/macOS/WSL). Na čistom Windowsu koristiti cross-env.
 */
export const BASE_URL = "http://localhost:3210";
export const EMPTY_URL = "http://localhost:3211";

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
      command: "MOCK_DELAY=0 EG_EMPTY_INBOX=1 NEXT_DIST_DIR=.next-e2e-empty npx next dev --webpack -p 3211",
      url: `${EMPTY_URL}/poruke`,
      timeout: 120_000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
