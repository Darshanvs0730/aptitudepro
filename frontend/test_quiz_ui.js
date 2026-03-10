const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Login as admin
  await page.goto('http://localhost:3000/login');
  await page.fill('input[type="text"]', 'admin');
  await page.fill('input[type="password"]', 'admin123');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);
  
  // Take a quiz
  await page.goto('http://localhost:3000/quiz');
  await page.waitForTimeout(2000);
  
  // Take a screenshot
  await page.screenshot({ path: 'quiz_ui_checked.png', fullPage: true });
  await browser.close();
})();
