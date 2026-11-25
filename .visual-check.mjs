import { chromium } from 'playwright-core';

const BASE = 'http://localhost:5173/';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const report = { errors: [], failedRequests: [], checks: [] };
const check = (name, value) => report.checks.push({ name, value });

async function makePage(width, height = 900, reducedMotion = 'no-preference') {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion,
    permissions: ['clipboard-read', 'clipboard-write'],
  });
  const page = await context.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      report.errors.push(`[${msg.type()}] ${msg.text()}`);
    }
  });
  page.on('pageerror', (err) => report.errors.push(`[pageerror] ${err.message}`));
  page.on('requestfailed', (req) =>
    report.failedRequests.push(`${req.url()} :: ${req.failure()?.errorText}`),
  );
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(900);
  return { context, page };
}

// ---------- Desktop ----------
const { context: desktopCtx, page } = await makePage(1440, 900);

check('title', await page.title());
check('h1', await page.locator('h1').innerText());
check('fontsLoaded', await page.evaluate(() => ({
  anton: document.fonts.check('16px Anton'),
  serif: document.fonts.check('16px "Instrument Serif"'),
  sans: document.fonts.check('16px "Space Grotesk"'),
  mono: document.fonts.check('16px "JetBrains Mono"'),
})));
check('desktopOverflow', await page.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  innerWidth: window.innerWidth,
  overflow: document.documentElement.scrollWidth > window.innerWidth,
})));
check('visibleNav', await page.locator('nav[aria-label="Primary"] a').allInnerTexts());
check('sections', await page.locator('main > section').evaluateAll((els) => els.map((el) => el.id)));

await page.screenshot({ path: '.screens/01-desktop-hero.png' });
await page.screenshot({ path: '.screens/02-desktop-full.png', fullPage: true });

// navigation
await page.locator('nav[aria-label="Primary"] a', { hasText: 'About' }).click();
await page.waitForTimeout(1400);
check('navHashAfterAboutClick', await page.evaluate(() => location.hash));
check('aboutTopAfterNav', await page.evaluate(() => {
  const el = document.getElementById('about');
  return el ? Math.round(el.getBoundingClientRect().top) : null;
}));

// project dialog
await page.locator('#projects').scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
const titles = page.locator('#projects h3 button');
await titles.first().click();
await page.waitForTimeout(700);
check('dialogOpen', await page.getByRole('dialog').isVisible());
check('dialogTitle', await page.locator('#project-dialog-title').innerText());
check('dialogFocused', await page.evaluate(() => document.activeElement?.getAttribute('aria-label')));
await page.screenshot({ path: '.screens/03-desktop-project-drawer.png' });

// next project
await page.getByRole('button', { name: /next/i }).click();
await page.waitForTimeout(500);
check('dialogTitleAfterNext', await page.locator('#project-dialog-title').innerText());

await page.keyboard.press('Escape');
await page.waitForTimeout(600);
check('dialogClosed', (await page.getByRole('dialog').count()) === 0);
check('focusRestored', await page.evaluate(() => document.activeElement?.tagName + ':' + (document.activeElement?.textContent ?? '').trim().slice(0, 20)));

// copy email
const copyButton = page.getByRole('button', { name: /copy email/i });
await copyButton.click();
await page.waitForTimeout(300);
check('copyButtonLabel', await copyButton.innerText());
check('clipboard', await page.evaluate(() => navigator.clipboard.readText()));
check('copyLiveRegion', await page.locator('[role="status"]').innerText());

// contact screenshot
await page.locator('#contact').scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
await page.screenshot({ path: '.screens/04-desktop-contact.png' });

await desktopCtx.close();

// ---------- Tablet ----------
const { context: tabletCtx, page: tablet } = await makePage(768, 1024);
check('tabletOverflow', await tablet.evaluate(() => document.documentElement.scrollWidth > window.innerWidth));
await tablet.screenshot({ path: '.screens/05-tablet-hero.png' });
await tablet.locator('#projects').scrollIntoViewIfNeeded();
await tablet.waitForTimeout(500);
await tablet.screenshot({ path: '.screens/06-tablet-projects.png' });
await tabletCtx.close();

// ---------- Mobile ----------
const { context: mobileCtx, page: mobile } = await makePage(390, 844);
check('mobileOverflow', await mobile.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  innerWidth: window.innerWidth,
  overflow: document.documentElement.scrollWidth > window.innerWidth,
})));
await mobile.screenshot({ path: '.screens/07-mobile-hero.png' });
check('mobileNavHidden', await mobile.locator('nav[aria-label="Primary"]').isHidden());

const menuButton = mobile.getByRole('button', { name: /open menu/i });
await menuButton.click();
await mobile.waitForTimeout(500);
check('mobileMenuOpen', await mobile.locator('#mobile-menu').isVisible());
check('mobileBodyLocked', await mobile.evaluate(() => getComputedStyle(document.body).overflow));
await mobile.screenshot({ path: '.screens/08-mobile-menu.png' });

await mobile.locator('#mobile-menu a', { hasText: 'Contact' }).click();
await mobile.waitForTimeout(1400);
check('mobileMenuClosedAfterNav', (await mobile.locator('#mobile-menu').count()) === 0);
check('mobileHash', await mobile.evaluate(() => location.hash));

await mobile.locator('#projects').scrollIntoViewIfNeeded();
await mobile.waitForTimeout(500);
await mobile.screenshot({ path: '.screens/09-mobile-projects.png' });

await mobile.locator('#projects h3 button').first().click();
await mobile.waitForTimeout(700);
check('mobileDialogVisible', await mobile.getByRole('dialog').isVisible());
await mobile.screenshot({ path: '.screens/10-mobile-drawer.png' });
await mobile.keyboard.press('Escape');
await mobile.waitForTimeout(500);
await mobileCtx.close();

// ---------- Reduced motion ----------
const { context: rmCtx, page: rm } = await makePage(1280, 900, 'reduce');
check('reducedMotionHeroVisible', await rm.locator('h1').isVisible());
check('reducedMotionOpacity', await rm.locator('#projects').evaluate((el) => {
  const first = el.querySelector('article');
  return first ? getComputedStyle(first).opacity : 'no-article';
}));
await rm.screenshot({ path: '.screens/11-reduced-motion.png' });
await rmCtx.close();

await browser.close();

console.log(JSON.stringify(report, null, 2));
