import { test, expect } from "@playwright/test";
import { EMPTY_URL } from "../playwright.config";

// Prva poruka po datumu (sort desc): msg-1001 (MUP), druga: msg-1002 (Porezna).
const FIRST_SUBJECT_RE = /Vaša nova osobna iskaznica/;
const SECOND_SUBJECT = "Obavijest o povratu poreza za 2025. godinu";

test.describe("Korisnički pretinac (/poruke)", () => {
  test("lista poruka se prikazuje s mock podacima", async ({ page }) => {
    await page.goto("/poruke");
    await expect(page.getByRole("heading", { name: "Korisnički pretinac" })).toBeVisible();
    // Različiti pošiljatelji iz mocka.
    await expect(page.getByText("Porezna uprava").first()).toBeVisible();
    await expect(page.getByText("HZMO").first()).toBeVisible();
    await expect(page.getByText("HZZO").first()).toBeVisible();
    // Arhivirana poruka ne smije biti u listi.
    await expect(page.getByText("Istek valjanosti putovnice")).toHaveCount(0);
  });

  test('nepročitane poruke imaju badge "Novo"', async ({ page }) => {
    await page.goto("/poruke");
    await expect(page.getByText("Novo").first()).toBeVisible();
    expect(await page.getByText("Novo").count()).toBeGreaterThanOrEqual(3);
  });

  test("klik na poruku na desktopu prikazuje detalj u desnom stupcu", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "samo desktop split prikaz");
    await page.goto("/poruke");
    // Na desktopu se prva poruka auto-odabere TEK nakon hydration-a (client effect); čekanje na
    // bilo koji article dokazuje interaktivnost. Tek tada se klik na link presreće (preventDefault)
    // i mijenja detalj u stupcu umjesto navigacije. List item je sada pravi <a href> (P2.3).
    await expect(page.getByRole("article").first()).toBeVisible();
    await page.getByRole("link", { name: new RegExp(SECOND_SUBJECT) }).click();
    const detail = page.getByRole("article", { name: new RegExp(SECOND_SUBJECT) });
    await expect(detail).toBeVisible();
    await expect(detail.getByRole("heading", { level: 2, name: SECOND_SUBJECT })).toBeVisible();
  });

  test("klik na poruku na mobilnom navigira na /poruke/[id]", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "samo mobilni list-only prikaz");
    await page.goto("/poruke");
    // List item je pravi <a href="/poruke/[id]"> (P2.3) → navigira nativno, i prije hydration-a.
    await page.getByRole("link", { name: FIRST_SUBJECT_RE }).click();
    // Timeout s zalihom: prva navigacija na /poruke/[id] u dev modu kompajlira rutu (sporo na svježem distu).
    await expect(page).toHaveURL(/\/poruke\/msg-1001$/, { timeout: 15_000 });
    await expect(page.getByRole("link", { name: "Natrag na pretinac" })).toBeVisible();
  });

  test("nevažeći ID (/poruke/ne-postoji) vraća 404", async ({ page }) => {
    const res = await page.goto("/poruke/ne-postoji");
    expect(res?.status()).toBe(404);
  });

  test('prazno stanje sadržava tekst "Pretinac je prazan"', async ({ page }) => {
    await page.goto(`${EMPTY_URL}/poruke`);
    await expect(page.getByRole("heading", { name: "Pretinac je prazan" })).toBeVisible();
    await expect(page.getByText("Sve poruke su pročitane ili još nema poruka.")).toBeVisible();
  });

  test("navigacijska stavka Poruke postoji u navigaciji (Sidebar/BottomNav)", async ({ page }) => {
    await page.goto("/poruke");
    // Skriveni nav (display:none) nije u a11y stablu → getByRole vraća samo vidljivi.
    await expect(page.getByRole("link", { name: /Poruke, 3 nepročitane/ })).toBeVisible();
  });

  test("badge s brojem nepročitanih vidljiv je u navigaciji", async ({ page }) => {
    await page.goto("/poruke");
    await expect(page.locator("nav:visible").getByText("3", { exact: true })).toBeVisible();
  });
});
