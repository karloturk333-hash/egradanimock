'use strict';
const { chromium, devices } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = process.env.QA_BASE_URL || 'http://localhost:3000';
const VIDEO_DIR = process.env.VIDEO_DIR || '/work/demo';
const OUTPUT_NAME = 'demo-mobile.webm';
const REHEARSAL = process.argv.includes('--rehearse');
fs.mkdirSync(VIDEO_DIR, { recursive: true });

async function injectCursor(page) {
  await page.evaluate(() => {
    if (document.getElementById('demo-cursor')) return;
    const c = document.createElement('div');
    c.id = 'demo-cursor';
    c.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 3L19 12L12 13L9 20L5 3Z" fill="white" stroke="black" stroke-width="1.5" stroke-linejoin="round"/></svg>`;
    c.style.cssText = 'position:fixed;z-index:999999;pointer-events:none;width:22px;height:22px;transition:left .1s,top .1s;filter:drop-shadow(1px 1px 2px rgba(0,0,0,.35));left:0;top:0';
    document.body.appendChild(c);
    document.addEventListener('mousemove', (e) => { c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px'; });
  });
}
async function injectSubtitleBar(page) {
  await page.evaluate(() => {
    if (document.getElementById('demo-subtitle')) return;
    const b = document.createElement('div');
    b.id = 'demo-subtitle';
    b.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:999998;text-align:center;padding:10px 14px;background:rgba(0,0,0,.8);color:#fff;font-family:-apple-system,"Segoe UI",sans-serif;font-size:14px;font-weight:600;letter-spacing:.2px;transition:opacity .3s;pointer-events:none;opacity:0';
    document.body.appendChild(b);
  });
}
async function showSubtitle(page, text) {
  await page.evaluate((t) => {
    const b = document.getElementById('demo-subtitle');
    if (!b) return;
    if (t) { b.textContent = t; b.style.opacity = '1'; } else { b.style.opacity = '0'; }
  }, text);
  if (text) await page.waitForTimeout(700);
}
async function ensureVisible(page, locator, label) {
  const el = typeof locator === 'string' ? page.locator(locator).first() : locator;
  const ok = await el.isVisible().catch(() => false);
  console[ok ? 'log' : 'error'](`${ok ? 'OK' : 'FAIL'}: ${label}`);
  return ok;
}
async function moveAndClick(page, locator, label, postDelay = 900) {
  const el = typeof locator === 'string' ? page.locator(locator).first() : locator;
  if (!(await el.isVisible().catch(() => false))) { console.error(`skip click: ${label}`); return false; }
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  const box = await el.boundingBox();
  if (box) { await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 12 }); await page.waitForTimeout(350); }
  await el.click();
  await page.waitForTimeout(postDelay);
  return true;
}
async function typeSlowly(page, locator, text, label, d = 45) {
  const el = typeof locator === 'string' ? page.locator(locator).first() : locator;
  if (!(await el.isVisible().catch(() => false))) { console.error(`skip type: ${label}`); return false; }
  await moveAndClick(page, el, label, 200);
  await el.fill('');
  await el.pressSequentially(text, { delay: d });
  await page.waitForTimeout(500);
  return true;
}
const reinject = async (page) => { await injectCursor(page); await injectSubtitleBar(page); };

async function run(page) {
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await reinject(page);

  if (REHEARSAL) {
    let ok = true;
    for (const name of ['Katalog', 'Predmeti', 'Dokumenti', 'Profil']) {
      ok &= await ensureVisible(page, page.getByRole('link', { name, exact: true }), `nav ${name}`);
    }
    ok &= await ensureVisible(page, page.getByRole('link', { name: /Poruke/ }), 'nav Poruke');
    await page.goto(BASE + '/katalog', { waitUntil: 'networkidle' });
    ok &= await ensureVisible(page, page.getByRole('searchbox').first(), 'katalog search');
    await page.goto(BASE + '/predmeti', { waitUntil: 'networkidle' });
    ok &= await ensureVisible(page, page.getByRole('button', { name: 'Čeka plaćanje' }), 'predmeti filter');
    await page.goto(BASE + '/dokumenti', { waitUntil: 'networkidle' });
    ok &= await ensureVisible(page, page.getByRole('tab', { name: /Arhiva/ }), 'dokumenti Arhiva');
    ok &= await ensureVisible(page, page.getByRole('link', { name: /^Otvori:/ }).first(), 'dokument open');
    await page.goto(BASE + '/profil', { waitUntil: 'networkidle' });
    ok &= await ensureVisible(page, page.getByRole('switch', { name: 'SMS obavijesti' }), 'profil switch');
    if (!ok) { console.error('REHEARSAL FAILED'); process.exit(1); }
    console.log('REHEARSAL PASSED'); return;
  }

  // 1) Dashboard
  await showSubtitle(page, 'eGrađani — redizajn portala (mobilni prikaz)');
  await page.waitForTimeout(1400);
  await showSubtitle(page, 'Dashboard: predmeti, dokumenti, statusi');
  await page.evaluate(() => window.scrollTo({ top: 280, behavior: 'smooth' }));
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(800);

  // 2) Katalog
  await showSubtitle(page, 'Katalog usluga — pretraga');
  await moveAndClick(page, page.getByRole('link', { name: 'Katalog', exact: true }), 'nav Katalog', 1200);
  await reinject(page);
  await showSubtitle(page, 'Pretraga usluga');
  await typeSlowly(page, page.getByRole('searchbox').first(), 'putovnica', 'pretraga');
  await page.waitForTimeout(1200);

  // 3) Predmeti
  await showSubtitle(page, 'Moji predmeti — filter po statusu');
  await moveAndClick(page, page.getByRole('link', { name: 'Predmeti', exact: true }), 'nav Predmeti', 1200);
  await reinject(page);
  await showSubtitle(page, 'Filter: Čeka plaćanje');
  await moveAndClick(page, page.getByRole('button', { name: 'Čeka plaćanje' }), 'filter ceka', 1100);
  await moveAndClick(page, page.getByRole('button', { name: 'Svi' }), 'filter svi', 800);

  // 4) Dokumenti
  await showSubtitle(page, 'Dokumenti — Aktivni / Arhiva');
  await moveAndClick(page, page.getByRole('link', { name: 'Dokumenti', exact: true }), 'nav Dokumenti', 1200);
  await reinject(page);
  await moveAndClick(page, page.getByRole('tab', { name: /Arhiva/ }), 'tab Arhiva', 1000);
  await moveAndClick(page, page.getByRole('tab', { name: /Aktivni/ }), 'tab Aktivni', 700);
  await showSubtitle(page, 'Otvori dokument → pregled (PDF)');
  await moveAndClick(page, page.getByRole('link', { name: /^Otvori:/ }).first(), 'otvori dokument', 1700);
  await reinject(page);
  await page.waitForTimeout(1200);

  // 5) Profil
  await showSubtitle(page, 'Moj profil — postavke');
  await moveAndClick(page, page.getByRole('link', { name: 'Profil', exact: true }), 'nav Profil', 1200);
  await reinject(page);
  await showSubtitle(page, 'Postavke obavijesti (toggle)');
  await moveAndClick(page, page.getByRole('switch', { name: 'SMS obavijesti' }), 'toggle SMS', 1200);

  // 6) Poruke
  await showSubtitle(page, 'Korisnički pretinac (poruke)');
  await moveAndClick(page, page.getByRole('link', { name: /Poruke/ }), 'nav Poruke', 1400);
  await reinject(page);
  await page.waitForTimeout(1400);
  await showSubtitle(page, 'Pristupačan · mobile-first · 3 stanja podataka');
  await page.waitForTimeout(1600);
  await showSubtitle(page, '');
  await page.waitForTimeout(700);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const pixel = devices['Pixel 5'];
  if (REHEARSAL) {
    const ctx = await browser.newContext({ ...pixel });
    await run(await ctx.newPage());
    await browser.close();
    return;
  }
  const ctx = await browser.newContext({ ...pixel, recordVideo: { dir: VIDEO_DIR, size: pixel.viewport } });
  const page = await ctx.newPage();
  try { await run(page); }
  catch (e) { console.error('DEMO ERROR:', e.message); }
  finally {
    await ctx.close();
    const v = page.video();
    if (v) { const src = await v.path(); fs.copyFileSync(src, path.join(VIDEO_DIR, OUTPUT_NAME)); console.log('Video saved:', path.join(VIDEO_DIR, OUTPUT_NAME)); }
    await browser.close();
  }
})();
