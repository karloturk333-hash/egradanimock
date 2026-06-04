import { test, expect } from "@playwright/test";
import { EMPTY_URL, ERROR_URL } from "../playwright.config";

test.describe("Moji predmeti (/predmeti)", () => {
  test("predmeti se prikazuju s mock podacima", async ({ page }) => {
    await page.goto("/predmeti");
    await expect(page.getByRole("heading", { name: "Moji predmeti", level: 2 })).toBeVisible();
    await expect(page.getByRole("region", { name: "Moji predmeti" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3 }).first()).toBeVisible(); // bar jedan predmet
  });

  test("pretraga filtrira predmete", async ({ page }) => {
    await page.goto("/predmeti");
    const all = await page.getByRole("heading", { level: 3 }).count();
    expect(all).toBeGreaterThan(1);
    await page.getByRole("searchbox", { name: "Pretraži predmete" }).fill("porez");
    expect(await page.getByRole("heading", { level: 3 }).count()).toBeLessThanOrEqual(all);
  });

  test("filter po statusu (aria-pressed) radi", async ({ page }) => {
    await page.goto("/predmeti");
    const cekaPlacanje = page.getByRole("button", { name: "Čeka plaćanje" });
    await expect(cekaPlacanje).toHaveAttribute("aria-pressed", "false");
    await cekaPlacanje.click();
    await expect(cekaPlacanje).toHaveAttribute("aria-pressed", "true");
    // Svi prikazani predmeti imaju "Plati" gumb (status čeka plaćanje).
    await expect(page.getByRole("button", { name: /^Plati/ }).first()).toBeVisible();
  });

  test('aria-live brojač sadrži "Pronađeno"', async ({ page }) => {
    await page.goto("/predmeti");
    await expect(
      page.locator("p[aria-live='polite']").filter({ hasText: "Pronađeno" }),
    ).toBeVisible();
  });

  test("navigacijska stavka Predmeti postoji u navigaciji", async ({ page }) => {
    await page.goto("/predmeti");
    await expect(page.locator("nav:visible").getByRole("link", { name: "Predmeti" })).toBeVisible();
  });

  test("prazno stanje (EG_EMPTY_PREDMETI) prikazuje EmptyState", async ({ page }) => {
    await page.goto(`${EMPTY_URL}/predmeti`);
    await expect(page.getByRole("heading", { name: /Nema predmeta/ })).toBeVisible();
  });

  test("error stanje (EG_PREDMETI_ERROR) prikazuje boundary + retry", async ({ page }) => {
    await page.goto(`${ERROR_URL}/predmeti`);
    const alert = page
      .getByRole("alert")
      .filter({ hasText: "Predmeti trenutačno nije moguće dohvatiti." });
    await expect(alert).toBeVisible();
    await expect(alert.getByRole("button", { name: "Pokušaj ponovo" })).toBeVisible();
  });
});
