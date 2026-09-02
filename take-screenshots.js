import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const executablePath = fs.existsSync(chromePath) ? chromePath : edgePath;

  console.log('Launching browser with:', executablePath);
  const browser = await chromium.launch({
    executablePath,
    headless: true,
    args: ['--use-gl=angle', '--use-angle=default', '--enable-webgl']
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const outDir = path.resolve('./screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 1. Landing (Hero)
  await page.screenshot({ path: path.join(outDir, '01_landing_fixed.png') });
  console.log('Captured 01_landing_fixed.png');

  // Scroll to Page 2 (Universes)
  await page.evaluate(() => {
    const el = document.querySelector('div[style*="overflow"]');
    if (el) el.scrollTo({ top: window.innerHeight * 1, behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, '02_universes.png') });
  console.log('Captured 02_universes.png');

  // Scroll to Page 3 (Thread)
  await page.evaluate(() => {
    const el = document.querySelector('div[style*="overflow"]');
    if (el) el.scrollTo({ top: window.innerHeight * 2, behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, '03_thread.png') });
  console.log('Captured 03_thread.png');

  // Scroll to Page 4 (Atelier)
  await page.evaluate(() => {
    const el = document.querySelector('div[style*="overflow"]');
    if (el) el.scrollTo({ top: window.innerHeight * 3, behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, '04_atelier.png') });
  console.log('Captured 04_atelier.png');

  // Scroll to Page 5 (Gallery)
  await page.evaluate(() => {
    const el = document.querySelector('div[style*="overflow"]');
    if (el) el.scrollTo({ top: window.innerHeight * 4, behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, '05_gallery.png') });
  console.log('Captured 05_gallery.png');

  // Scroll to Page 7 (Commission)
  await page.evaluate(() => {
    const el = document.querySelector('div[style*="overflow"]');
    if (el) el.scrollTo({ top: window.innerHeight * 6, behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, '07_commission.png') });
  console.log('Captured 07_commission.png');

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch(err => {
  console.error('Screenshot error:', err);
  process.exit(1);
});
