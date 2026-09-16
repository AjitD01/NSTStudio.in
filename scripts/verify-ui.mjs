import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('audit_screenshots');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function runVisualAudit() {
  console.log('🚀 Starting AI Visual Audit using local Chrome...');

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--disable-gpu', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });

  const page = await context.newPage();

  console.log('1. Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });

  // Wait for landing screen animation to finish
  await page.waitForTimeout(3000);

  // 2. Hero Section
  console.log('2. Capturing Hero Section...');
  await page.screenshot({ path: path.join(OUT_DIR, '02_hero_section.png') });

  // 3. Floating Navigation Drawer
  console.log('3. Opening Floating Navigation Drawer...');
  const menuBtn = await page.$('.prototype-hamburger-btn');
  if (menuBtn) {
    await menuBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, '03_nav_drawer_open.png') });
    // Close drawer
    const closeBtn = await page.$('.floating-menu-close');
    if (closeBtn) await closeBtn.click();
    else await menuBtn.click();
    await page.waitForTimeout(400);
  }

  // 4. About Section & Sanskrit Grove Narrative
  console.log('4. Scrolling to About Section...');
  const aboutSec = await page.$('#about-section');
  if (aboutSec) {
    await aboutSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, '04_about_section.png') });
  }

  // 5. Services Section & Pro Plan Arpeggio Handheld Card
  console.log('5. Scrolling to Services Section...');
  const servicesSec = await page.$('#services-section');
  if (servicesSec) {
    await servicesSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, '05_services_arpeggio.png') });
  }

  // 6. What We Offer (4 Disciplines)
  console.log('6. Scrolling to What We Offer Section...');
  const offerSec = await page.$('#what-we-offer');
  if (offerSec) {
    await offerSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, '06_what_we_offer.png') });
  }

  // 7. Projects Showcase & Film Sprocket Manifesto
  console.log('7. Scrolling to Projects Section...');
  const projSec = await page.$('#projects-section');
  if (projSec) {
    await projSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, '07_projects_section.png') });
  }

  // 8. Character Walker & "Got a Project in Mind ?"
  console.log('8. Scrolling to Character Walker Section...');
  const walkerSec = await page.$('.prototype-walker-section');
  if (walkerSec) {
    await walkerSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, '08_walker_project_mind.png') });
  }

  // 9. Contact Section ("Begin your Story." & Transparent Card)
  console.log('9. Scrolling to Contact Section...');
  const contactSec = await page.$('#contact-section');
  if (contactSec) {
    await contactSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, '09_contact_section.png') });
  }

  // 10. Reviews Section
  console.log('10. Scrolling to Reviews Section...');
  const reviewsSec = await page.$('.prototype-reviews-section');
  if (reviewsSec) {
    await reviewsSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, '10_reviews_section.png') });
  }

  // 11. FAQ Section
  console.log('11. Scrolling to FAQ Section...');
  const faqSec = await page.$('#faq-section');
  if (faqSec) {
    await faqSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, '11_faq_section.png') });
  }

  // 12. Clients Section
  console.log('12. Scrolling to Clients Section...');
  const clientsSec = await page.$('.prototype-clients-section');
  if (clientsSec) {
    await clientsSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, '12_clients_marquee.png') });
  }

  // 13. Pre-footer ("Hello / Namastey" & White Emblem Card)
  console.log('13. Scrolling to Pre-Footer Section...');
  const prefooterSec = await page.$('.prefooter-composite-card');
  if (prefooterSec) {
    await prefooterSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, '13_prefooter_section.png') });
    console.log('📸 Captured 13_prefooter_section.png');
  }

  // 14. LYNIQ Architectural Footer
  console.log('14. Scrolling to LYNIQ Footer...');
  const lyniqSec = await page.$('.footer-lyniq-style-wrapper');
  if (lyniqSec) {
    await lyniqSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, '14_lyniq_footer.png') });
    console.log('📸 Captured 14_lyniq_footer.png');
  }

  await browser.close();
  console.log('✨ All 13 visual audit screenshots captured successfully!');
}

runVisualAudit().catch((err) => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
