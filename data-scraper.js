import puppeteer from 'puppeteer';

// Navigate the page to a URL.
export default async function scrapeData(url) {
    const browser = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome"});
    const page = await browser.newPage();

    await page.goto(url);
    
    // Set screen size.
    await page.setViewport({width: 1080, height: 1024});

    // Type into search box.
    // await page.locator('.tournament-results-wrapper').click();

    let children = await page.$eval('tournament-results-wrapper', e => {
        const data = [];
        for (const child of e.children) {
            data.push({ tagName: child.tagName, innerText: child.innerText });
        }
        return data;
    });

    console.log('the data you fuck', children)
    await browser.close();
}
