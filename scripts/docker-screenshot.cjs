// Ad-hoc screenshot runner — pokreće se UNUTAR Playwright Docker imagea.
// Koristi browsere iz containera (PLAYWRIGHT_BROWSERS_PATH=/ms-playwright)
// i playwright modul mountiran s hosta (/work/node_modules/playwright).
const { chromium } = require("playwright");

const BASE_URL = process.env.BASE_URL || "http://localhost:3210";
const OUT_DIR = process.env.OUT_DIR || "/work/screenshots";
const ROUTES = (process.env.ROUTES || "/,/poruke").split(",").map((r) => r.trim());

const slug = (r) => (r === "/" ? "home" : r.replace(/^\//, "").replace(/\//g, "-"));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  for (const route of ROUTES) {
    const url = BASE_URL + route;
    process.stdout.write(`→ ${url}\n`);
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    const path = `${OUT_DIR}/${slug(route)}.png`;
    await page.screenshot({ path, fullPage: true });
    process.stdout.write(`  saved ${path}\n`);
  }
  await browser.close();
})().catch((e) => {
  console.error("SCREENSHOT_FAILED:", e.message);
  process.exit(1);
});
