const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    
    await page.goto('http://localhost:3000/login');
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    
    await page.goto('http://localhost:3000/quiz');
    await page.waitForTimeout(2000);
    
    // Check if isMidQuiz is true
    // Try to navigate to dashboard
    await page.click('text=Dashboard');
    await page.waitForTimeout(1000);
    
    console.log("Current URL after click:", page.url());
    
    await browser.close();
})();
