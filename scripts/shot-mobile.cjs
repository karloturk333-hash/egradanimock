// Mobile screenshotovi (Pixel 5) glavnih ruta — za README.
const { chromium, devices } = require("playwright");

const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT = process.env.OUT_DIR || "/work/demo";
const ROUTES = [
  { slug: "pocetna", path: "/" },
  { slug: "katalog", path: "/katalog" },
  { slug: "dokumenti", path: "/dokumenti" },
  { slug: "poruke", path: "/poruke" },
];

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ ...devices["Pixel 5"] });
  const page = await ctx.newPage();
  for (const r of ROUTES) {
    await page.goto(BASE + r.path, { waitUntil: "networkidle", timeout: 40000 });
    await page.waitForTimeout(500);
    // viewport-only (ne fullPage) → čista "slika telefona", bottom-nav ostaje pinnan.
    await page.screenshot({ path: `${OUT}/mobile-${r.slug}.png` });
    process.stdout.write(`saved mobile-${r.slug}\n`);
  }
  await b.close();
})().catch((e) => { console.error("FAIL", e.message); process.exit(1); });
