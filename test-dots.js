import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

async function testClickDots() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const outDir = path.resolve('./screenshots');

  const dotLabels = [
    'prologue',
    'universes',
    'thread',
    'atelier',
    'gallery',
    'archive',
    'commission',
    'maison',
  ];

  for (let i = 0; i < dotLabels.length; i++) {
    const label = dotLabels[i];
    console.log(`Clicking dot index ${i} (${label})...`);
    
    // Target the specific section dot item
    await page.locator(`.section-dot-item[data-index="${i}"]`).click();
    await page.waitForTimeout(1600); // Allow smooth scroll to settle

    const filename = `dot_${String(i + 1).padStart(2, '0')}_${label}.png`;
    await page.screenshot({ path: path.join(outDir, filename) });
    console.log(`Saved: ${filename}`);
  }

  await browser.close();
  console.log('All dot clicks verified successfully!');
}

testClickDots().catch(console.error);
