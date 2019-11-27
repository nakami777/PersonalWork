const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    page.setViewport({width: 1024, height: 800})
    const url = 'https://tgs.jp.net/event/futomomoart-nagoya'

    let counter = 0;
    page.on('response', async (response) => {
        const matches = /.*\.(jpg|png)$/.exec(response.url());
        if (matches && (matches.length === 2)) {
            const extension = matches[1];
            const buffer = await response.buffer();
            try {
                fs.writeFileSync(
                    `Download/image-${counter}.${extension}`, 
                    buffer, 
                    'base64')
            } catch (err) {
                console.log(err)
            }
            counter += 1;
        }
    });
    await page.goto(url)
    await page.waitFor(10000);
    await browser.close()
})();