import { test, expect } from "@playwright/test";
import { EMPTY_URL, ERROR_URL } from "../playwright.config";

test.describe("Dashboard (/)", () => {
  test("prikazuje loading skeleton dok se podaci dohvaćaju", async ({ page }) => {
    // EMPTY_URL server ima MOCK_DELAY=1500 pa je Suspense skeleton uhvatljiv.
    await page.goto(`${EMPTY_URL}/`, { waitUntil: "commit" });
    const skeleton = page.locator('[aria-label="Učitavanje predmeta"]');
    await expect(skeleton).toBeVisible();
    // Nakon dohvata skeleton nestaje (zamijenjen sadržajem / empty stanjem).
    await expect(skeleton).toBeHidden({ timeout: 10_000 });
  });

  test("empty state za predmete i dokumente kad nema podataka", async ({ page }) => {
    await page.goto(`${EMPTY_URL}/`);
    await expect(page.getByRole("heading", { name: "Nemate aktivnih predmeta" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Nemate dokumenata" })).toBeVisible();
  });

  test("error boundary s retry gumbom kad dohvat padne", async ({ page }) => {
    await page.goto(`${ERROR_URL}/`, { waitUntil: "commit" });
    // role=alert filtriran po tekstu — Next ima i prazni __next-route-announcer__ s role=alert.
    const alert = page.getByRole("alert").filter({ hasText: "Podatke trenutačno nije moguće dohvatiti." });
    await expect(alert).toBeVisible();
    await expect(alert.getByRole("button", { name: "Pokušaj ponovo" })).toBeVisible();
  });
});
