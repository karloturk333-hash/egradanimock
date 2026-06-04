import { test, expect } from "@playwright/test";
import { ERROR_URL } from "../playwright.config";

test.describe("Moj profil (/profil)", () => {
  test("profil se prikazuje s podacima", async ({ page }) => {
    await page.goto("/profil");
    await expect(page.getByRole("heading", { name: "Moj profil", level: 2 })).toBeVisible();
    await expect(page.getByRole("region", { name: "Moj profil" })).toBeVisible();
    await expect(page.getByText("Marko Horvat")).toBeVisible();
    await expect(page.getByText("12345678901")).toBeVisible(); // OIB
    await expect(page.getByRole("heading", { name: "Osobni podaci" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Kontakt" })).toBeVisible();
  });

  test("status vjerodajnice (badge) i kontakt vidljivi", async ({ page }) => {
    await page.goto("/profil");
    await expect(page.getByText("Potvrđen identitet")).toBeVisible();
    await expect(page.getByText("marko.horvat@example.hr")).toBeVisible();
  });

  test("toggle obavijesti je pristupačan switch i prebacuje se", async ({ page }) => {
    await page.goto("/profil");
    const email = page.getByRole("switch", { name: "E-mail obavijesti" });
    await expect(email).toHaveAttribute("aria-checked", "true"); // default uključeno
    await email.click();
    await expect(email).toHaveAttribute("aria-checked", "false");

    const sms = page.getByRole("switch", { name: "SMS obavijesti" });
    await expect(sms).toHaveAttribute("aria-checked", "false"); // default isključeno
    await sms.click();
    await expect(sms).toHaveAttribute("aria-checked", "true");
  });

  test("toggle ima dodirnu metu ≥ 44px", async ({ page }) => {
    await page.goto("/profil");
    const box = await page.getByRole("switch", { name: "E-mail obavijesti" }).boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
  });

  test("navigacijska stavka Profil postoji u navigaciji", async ({ page }) => {
    await page.goto("/profil");
    await expect(page.locator("nav:visible").getByRole("link", { name: "Profil" })).toBeVisible();
  });

  test("error stanje (EG_PROFIL_ERROR) prikazuje boundary + retry", async ({ page }) => {
    await page.goto(`${ERROR_URL}/profil`);
    const alert = page
      .getByRole("alert")
      .filter({ hasText: "Profil trenutačno nije moguće dohvatiti." });
    await expect(alert).toBeVisible();
    await expect(alert.getByRole("button", { name: "Pokušaj ponovo" })).toBeVisible();
  });
});
