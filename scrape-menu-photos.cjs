const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'public', 'menu-photos');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Ordered list matching the order Google Sites renders them on the menu page
const ORDERED_NAMES = [
  'Pork Barbeque Meal',
  'Chicken Barbeque Meal',
  'Chicken Adobo Meal',
  'Pork Adobo Meal',
  'Chicken Cutlet Meal',
  'Mini-Meal',
  'Pork Lumpia',
  'Chicken Lumpia',
  'Fried Rice',
  'Pancit Guisado',
  'Filipino Spaghetti',
  'Pork BBQ',
  'Chicken BBQ',
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();

  console.log('Navigating to menu page...');
  await page.goto('https://www.jeffscuisineinc.com/menu', { waitUntil: 'networkidle' });

  // Scroll down to trigger lazy loading, then back up
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);

  // Collect image srcs, skipping the logo (w16383 = very wide logo)
  const srcs = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs
      .map(img => img.currentSrc || img.src)
      .filter(src => src && src.includes('googleusercontent') && !src.includes('w16383'));
  });

  console.log(`Found ${srcs.length} food images`);

  for (let i = 0; i < srcs.length; i++) {
    const name = ORDERED_NAMES[i] || `Item ${i + 1}`;
    const filename = name + '.jpg';
    const dest = path.join(OUTPUT_DIR, filename);

    process.stdout.write(`Downloading: ${filename} ... `);
    const resp = await context.request.get(srcs[i]);
    if (resp.ok()) {
      const body = await resp.body();
      fs.writeFileSync(dest, body);
      console.log(`✓ ${Math.round(body.length / 1024)}KB`);
    } else {
      console.log(`✗ HTTP ${resp.status()}`);
    }
  }

  await browser.close();
  console.log('\nDone! Files saved to public/menu-photos/');
})();
