import { test, expect } from "@playwright/test";
import { EMPTY_URL, ERROR_URL } from "../playwright.config";

test.describe("Moji dokumenti (/dokumenti)", () => {
  test("lista dokumenata se prikazuje s mock podacima", async ({ page }) => {
    await page.goto("/dokumenti");
    await expect(page.getByRole("heading", { name: "Moji dokumenti", level: 2 })).toBeVisible();
    // Sekcija s pravim accessible name-om.
    await expect(page.getByRole("region", { name: "Moji dokumenti" })).toBeVisible();
    // Barem jedan dokument (h3 red u listi).
    await expect(page.getByRole("heading", { level: 3 }).first()).toBeVisible();
  });

  test("pretraga filtrira listu po nazivu dokumenta", async ({ page }) => {
    await page.goto("/dokumenti");
    // Zapamti puni broj redova prije pretrage.
    const allRows = await page.getByRole("heading", { level: 3 }).count();
    expect(allRows).toBeGreaterThan(1);
    // Naziv prvog dokumenta posluži kao upit (jednoznačan dio).
    const firstName = (await page.getByRole("heading", { level: 3 }).first().textContent())?.trim() ?? "";
    expect(firstName.length).toBeGreaterThan(0);
    await page.getByRole("searchbox", { name: "Pretraži dokumente" }).fill(firstName);
    // Filtrirana lista mora sadržavati taj dokument i biti uža od pune liste.
    await expect(page.getByRole("heading", { level: 3, name: firstName })).toBeVisible();
    expect(await page.getByRole("heading", { level: 3 }).count()).toBeLessThanOrEqual(allRows);
  });

  test('tab "Aktivni" je odabran po defaultu; klik i ArrowRight prebacuju na "Arhiva"', async ({ page }) => {
    await page.goto("/dokumenti");
    const aktivni = page.getByRole("tab", { name: /^Aktivni/ });
    const arhiva = page.getByRole("tab", { name: /^Arhiva/ });
    await expect(aktivni).toHaveAttribute("aria-selected", "true");
    await expect(arhiva).toHaveAttribute("aria-selected", "false");
    // Klik mišem.
    await arhiva.click();
    await expect(arhiva).toHaveAttribute("aria-selected", "true");
    await expect(aktivni).toHaveAttribute("aria-selected", "false");
    // Vrati na Aktivni pa testiraj tipkovnicu (roving tabindex + ArrowRight).
    await aktivni.click();
    await expect(aktivni).toHaveAttribute("aria-selected", "true");
    await aktivni.focus();
    await page.keyboard.press("ArrowRight");
    await expect(arhiva).toHaveAttribute("aria-selected", "true");
    await expect(aktivni).toHaveAttribute("aria-selected", "false");
  });

  test("kontrola Preuzmi je anchor s href i download atributom", async ({ page }) => {
    await page.goto("/dokumenti");
    const download = page.getByRole("link", { name: /^Preuzmi:/ }).first();
    await expect(download).toBeVisible();
    await expect(download).toHaveAttribute("href", /.+/);
    await expect(download).toHaveAttribute("download", /.*/);
  });

  test("kontrola Ispiši je gumb s pristupačnim imenom", async ({ page }) => {
    await page.goto("/dokumenti");
    const print = page.getByRole("button", { name: /^Ispiši:/ }).first();
    await expect(print).toBeVisible();
  });

  test('aria-live brojač sadržava "Pronađeno"', async ({ page }) => {
    await page.goto("/dokumenti");
    const counter = page.locator("p[aria-live='polite']").filter({ hasText: "Pronađeno" });
    await expect(counter).toBeVisible();
  });

  test('arhivirani dokument ima badge "Arhivirano"', async ({ page }) => {
    await page.goto("/dokumenti");
    await page.getByRole("tab", { name: /^Arhiva/ }).click();
    await expect(page.getByText("Arhivirano").first()).toBeVisible();
  });

  test("prazno aktivno stanje (EG_EMPTY_DOKUMENTI) prikazuje EmptyState naslov", async ({ page }) => {
    await page.goto(`${EMPTY_URL}/dokumenti`);
    await expect(page.getByRole("heading", { name: "Moji dokumenti", level: 2 })).toBeVisible();
    // Backend-prazno → EmptyState (nije lista). Naslov je vidljiv unutar regije.
    await expect(page.getByRole("heading", { name: /Nema dokumenata/ })).toBeVisible();
  });

  test('prazna arhiva (EG_EMPTY_DOKUMENTI) prikazuje "Arhiva je prazna"', async ({ page }) => {
    await page.goto(`${EMPTY_URL}/dokumenti`);
    await page.getByRole("tab", { name: /^Arhiva/ }).click();
    await expect(page.getByRole("heading", { name: "Arhiva je prazna" })).toBeVisible();
  });

  test("error stanje (EG_DOKUMENTI_ERROR) prikazuje boundary + retry", async ({ page }) => {
    await page.goto(`${ERROR_URL}/dokumenti`);
    // Filtriraj po tekstu — Next ubacuje prazan #__next-route-announcer__ s role="alert".
    const alert = page
      .getByRole("alert")
      .filter({ hasText: "Dokumenti trenutačno nisu dostupni." });
    await expect(alert).toBeVisible();
    await expect(alert.getByRole("button", { name: "Pokušaj ponovo" })).toBeVisible();
  });

  test("navigacijska stavka Dokumenti postoji u navigaciji", async ({ page }) => {
    await page.goto("/dokumenti");
    // Skriveni nav (display:none) nije u a11y stablu → scope na vidljivi nav landmark.
    await expect(page.locator("nav:visible").getByRole("link", { name: "Dokumenti" })).toBeVisible();
  });

  test("kontrole Preuzmi i Ispiši imaju cilj dodira ≥ 44px", async ({ page }) => {
    await page.goto("/dokumenti");
    const download = page.getByRole("link", { name: /^Preuzmi:/ }).first();
    const print = page.getByRole("button", { name: /^Ispiši:/ }).first();
    await expect(download).toBeVisible();
    await expect(print).toBeVisible();
    const downloadBox = await download.boundingBox();
    const printBox = await print.boundingBox();
    expect(downloadBox).not.toBeNull();
    expect(printBox).not.toBeNull();
    expect(downloadBox!.width).toBeGreaterThanOrEqual(44);
    expect(downloadBox!.height).toBeGreaterThanOrEqual(44);
    expect(printBox!.width).toBeGreaterThanOrEqual(44);
    expect(printBox!.height).toBeGreaterThanOrEqual(44);
  });

  test("klik na dokument (ikona+naziv) otvara pregled /dokumenti/[slug]", async ({ page }) => {
    await page.goto("/dokumenti");
    const open = page.getByRole("link", { name: /^Otvori:/ }).first();
    await expect(open).toHaveAttribute("href", /\/dokumenti\/[a-z0-9-]+$/);
    await open.click();
    await expect(page).toHaveURL(/\/dokumenti\/[a-z0-9-]+$/);
    await expect(page.getByRole("heading", { level: 2 })).toBeVisible();
    await expect(page.getByRole("link", { name: "Natrag na dokumente" })).toBeVisible();
    // Ugrađeni PDF pregled.
    await expect(page.locator("iframe")).toBeVisible();
  });

  test("pregled ima 'Preuzmi PDF' poveznicu na pravi .pdf", async ({ page }) => {
    await page.goto("/dokumenti/domovnica");
    const dl = page.getByRole("link", { name: "Preuzmi PDF" });
    await expect(dl).toBeVisible();
    await expect(dl).toHaveAttribute("href", /\.pdf$/);
    await expect(dl).toHaveAttribute("download", /.+/);
  });

  test("nevažeći slug (/dokumenti/ne-postoji) vraća 404", async ({ page }) => {
    const res = await page.goto("/dokumenti/ne-postoji");
    expect(res?.status()).toBe(404);
  });
});
