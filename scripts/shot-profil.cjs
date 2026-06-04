const { chromium, devices } = require("playwright");
const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT = process.env.OUT_DIR || "/work/demo";

(async () => {
  const b = await chromium.launch();
  const d = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await d.goto(BASE + "/profil", { waitUntil: "networkidle", timeout: 40000 });
  await d.waitForTimeout(400);
  await d.screenshot({ path: `${OUT}/profil-desktop.png`, fullPage: true });
  process.stdout.write("saved profil-desktop\n");

  const ctx = await b.newContext({ ...devices["Pixel 5"] });
  const m = await ctx.newPage();
  await m.goto(BASE + "/profil", { waitUntil: "networkidle", timeout: 40000 });
  await m.waitForTimeout(400);
  await m.screenshot({ path: `${OUT}/mobile-profil.png` });
  process.stdout.write("saved mobile-profil\n");
  await b.close();
})().catch((e) => { console.error("FAIL", e.message); process.exit(1); });
