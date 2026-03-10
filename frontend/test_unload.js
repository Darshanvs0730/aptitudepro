const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false }); // Needs to be false to see prompt if possible, or headless true but handle dialog
    const context = await browser.newContext();
    const page = await context.newPage();
    
    let dialogAppeared = false;
    
    page.on('dialog', async dialog => {
        console.log(`Dialog appeared: type=${dialog.type()}, message="${dialog.message()}"`);
        dialogAppeared = true;
        await dialog.dismiss();
    });
    
    await page.goto('http://localhost:3000/login');
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    
    await page.goto('http://localhost:3000/quiz');
    // Wait for questions to load
    await page.waitForSelector('.question-text');
    console.log("Quiz loaded.");
    
    // Attempt reload without interaction
    console.log("Reloading without interaction...");
    await page.reload();
    console.log("Reloaded without interaction.");
    console.log("Did dialog appear? ", dialogAppeared);
    
    // Wait for questions to load again
    await page.waitForSelector('.question-text');
    console.log("Quiz loaded second time.");
    
    // Interact with the page
    console.log("Clicking an option...");
    await page.click('.answer-option');
    await page.waitForTimeout(500);
    
    // Attempt reload with interaction
    console.log("Reloading WITH interaction...");
    // page.reload might hang if prompt appears, let's trigger it without await
    page.reload().catch(() => {});
    await page.waitForTimeout(2000);
    
    console.log("Did dialog appear after interaction? ", dialogAppeared);
    
    await browser.close();
})();
