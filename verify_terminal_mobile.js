const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:5173/terminal');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'terminal_mobile.png' });
  await browser.close();
})();
