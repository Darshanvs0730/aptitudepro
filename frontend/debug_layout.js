const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    // Login
    await page.goto('http://localhost:3000/login');
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    
    // Go to quiz
    await page.goto('http://localhost:3000/quiz');
    await page.waitForTimeout(2000);

    // Get calculated width of elements
    const dims = await page.evaluate(() => {
        const text = document.querySelector('.question-text');
        const section = document.querySelector('.question-section');
        const card = document.querySelector('.card:nth-child(2)'); // The question card usually
        const qc = document.querySelector('.quiz-container');
        
        return {
            textMax: text ? window.getComputedStyle(text).maxWidth : null,
            textWidth: text ? window.getComputedStyle(text).width : null,
            sectionWidth: section ? window.getComputedStyle(section).width : null,
            quizContainerWidth: qc ? window.getComputedStyle(qc).width : null
        }
    });

    console.log(JSON.stringify(dims, null, 2));

    await page.screenshot({ path: 'layout_debug.png' });
    await browser.close();
})();
