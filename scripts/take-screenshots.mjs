import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const SCREENSHOTS_DIR = 'public/screenshots';
mkdirSync(SCREENSHOTS_DIR, { recursive: true });

const APP_URL = 'https://app.archie.now';
const EMAIL = 'tester@bestroofingnow.com';
const PASSWORD = 'Test123!';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // Navigate to app
  console.log('Navigating to app...');
  await page.goto(APP_URL, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(4000);

  // Click LOGIN button to open modal
  console.log('Clicking LOGIN button...');
  await page.click('text=LOGIN');
  await page.waitForTimeout(2000);

  // Fill the modal login form
  console.log('Filling credentials...');
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await page.waitForTimeout(500);

  // Screenshot the filled login form
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/login-form.png`, fullPage: false });

  // Click "Sign In" submit button inside the modal
  console.log('Clicking Sign In...');
  await page.click('button[type="submit"]:has-text("Sign In")');
  console.log('Waiting for app to load...');
  await page.waitForTimeout(10000);

  await page.screenshot({ path: `${SCREENSHOTS_DIR}/post-login.png`, fullPage: false });
  console.log('Post-login URL:', page.url());

  // Navigate to all key pages and take screenshots
  const routes = [
    { path: '/crm', name: 'dashboard', wait: 6000 },
    { path: '/crm', name: 'crm-dashboard', wait: 6000 },
    { path: '/crm/leads', name: 'crm-leads', wait: 5000 },
    { path: '/crm/jobs', name: 'crm-jobs', wait: 5000 },
    { path: '/crm/estimates', name: 'crm-estimates', wait: 5000 },
    { path: '/crm/invoices', name: 'crm-invoices', wait: 5000 },
    { path: '/crm/calendar', name: 'crm-calendar', wait: 5000 },
    { path: '/crm/claims', name: 'crm-claims', wait: 5000 },
    { path: '/crm/reports', name: 'crm-reports', wait: 5000 },
    { path: '/crm/map', name: 'crm-map', wait: 5000 },
    { path: '/crm/documents', name: 'crm-documents', wait: 5000 },
    { path: '/crm/automations', name: 'crm-automations', wait: 5000 },
    { path: '/crm/inventory', name: 'crm-inventory', wait: 5000 },
    { path: '/crm/roof-reports', name: 'ai-roof-reports', wait: 6000 },
    { path: '/crm/photos', name: 'crm-photos', wait: 5000 },
    { path: '/salescoach', name: 'sales-coach', wait: 6000 },
    { path: '/prospector', name: 'prospector', wait: 6000 },
    { path: '/interior-pro', name: 'interior-pro', wait: 6000 },
    { path: '/storm-tool', name: 'storm-tool', wait: 6000 },
    { path: '/networking', name: 'networking', wait: 6000 },
  ];

  console.log('\n--- Taking screenshots ---\n');

  for (const route of routes) {
    try {
      console.log(`  ${route.name} -> ${APP_URL}${route.path}`);
      await page.goto(`${APP_URL}${route.path}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(route.wait);
      await page.screenshot({ path: `${SCREENSHOTS_DIR}/${route.name}.png`, fullPage: false });
      console.log(`    OK`);
    } catch (err) {
      console.log(`    FAIL: ${err.message.split('\n')[0]}`);
    }
  }

  // Full-page screenshots
  console.log('\n--- Full-page screenshots ---\n');
  try {
    await page.goto(`${APP_URL}/crm`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(6000);
    await page.screenshot({ path: `${SCREENSHOTS_DIR}/dashboard-full.png`, fullPage: true });
    console.log('  OK: dashboard-full.png');
  } catch (err) {
    console.log(`  FAIL: ${err.message.split('\n')[0]}`);
  }

  await browser.close();
  console.log('\nDone! Screenshots saved to public/screenshots/');
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
