import { test, expect } from "@playwright/test";
import { EMPTY_URL, ERROR_URL } from "../playwright.config";

test.describe("Katalog usluga (/katalog)", () => {
  test("grid kategorija se prikazuje s mock podacima", async ({ page }) => {
    await page.goto("/katalog");
    await expect(page.getByRole("heading", { name: "Katalog usluga", level: 2 })).toBeVisible();
    // Nekoliko kategorija iz mocka (h3 naslovi kartica).
    await expect(page.getByRole("heading", { name: "Zdravlje", level: 3 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Promet", level: 3 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Obrazovanje", level: 3 })).toBeVisible();
    // Brojač rezultata (8 kategorija).
    await expect(page.getByText("Pronađeno 8 usluga")).toBeVisible();
  });

  test("cijela kartica je link na /katalog/[slug]", async ({ page }) => {
    await page.goto("/katalog");
    const link = page.getByRole("link", { name: /Zdravlje/ });
    await expect(link).toHaveAttribute("href", "/katalog/zdravlje");
    await link.click();
    await expect(page).toHaveURL(/\/katalog\/zdravlje$/);
    await expect(page.getByText("Stranica je u pripremi.")).toBeVisible();
    await expect(page.getByRole("link", { name: "Natrag na katalog" })).toBeVisible();
  });

  test("pretraga filtrira kartice po naslovu i primjerima", async ({ page }) => {
    await page.goto("/katalog");
    await page.getByRole("searchbox", { name: "Pretraži usluge" }).fill("vrtić");
    // "Upisi u školu i vrtić" je samo u kategoriji Obrazovanje.
    await expect(page.getByRole("heading", { name: "Obrazovanje", level: 3 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Promet", level: 3 })).toHaveCount(0);
    await expect(page.getByText("Pronađeno 1 usluga")).toBeVisible();
  });

  test('filter "Bez prijave" daje prazno stanje, reset ga poništava', async ({ page }) => {
    await page.goto("/katalog");
    await page.getByLabel("Sigurnost").selectOption({ label: "Bez prijave" });
    await expect(
      page.getByRole("heading", { name: "Nema usluga za odabrane filtre" }),
    ).toBeVisible();
    // CTA unutar praznog stanja ("Prikaži sve usluge") vraća sve kartice.
    await page.getByRole("button", { name: "Prikaži sve usluge" }).click();
    await expect(page.getByRole("heading", { name: "Zdravlje", level: 3 })).toBeVisible();
    await expect(page.getByText("Pronađeno 8 usluga")).toBeVisible();
  });

  test("nevažeći slug (/katalog/ne-postoji) vraća 404", async ({ page }) => {
    const res = await page.goto("/katalog/ne-postoji");
    expect(res?.status()).toBe(404);
  });

  test("navigacijska stavka Katalog postoji u navigaciji", async ({ page }) => {
    await page.goto("/katalog");
    // Footer ima link "Katalog usluga", a nav "Katalog" → scope na vidljivi nav landmark
    // (izbjegava strict-mode dvoznačnost; isti obrazac kao badge test u poruke.spec).
    await expect(page.locator("nav:visible").getByRole("link", { name: "Katalog" })).toBeVisible();
  });

  test("globalno podnožje je vidljivo", async ({ page }) => {
    await page.goto("/katalog");
    const footer = page.getByRole("contentinfo");
    await expect(footer).toBeVisible();
    await expect(footer.getByText("© 2026 Vlada Republike Hrvatske")).toBeVisible();
  });

  test("prazno-backend stanje (EG_EMPTY_KATALOG) prikazuje poruku o nedostupnosti", async ({ page }) => {
    await page.goto(`${EMPTY_URL}/katalog`);
    await expect(
      page.getByRole("heading", { name: "Katalog je trenutačno nedostupan" }),
    ).toBeVisible();
  });

  test("error stanje (EG_KATALOG_ERROR) prikazuje boundary + retry", async ({ page }) => {
    await page.goto(`${ERROR_URL}/katalog`);
    const alert = page
      .getByRole("alert")
      .filter({ hasText: "Katalog usluga trenutačno nije moguće dohvatiti." });
    await expect(alert.getByRole("button", { name: "Pokušaj ponovo" })).toBeVisible();
  });
});
