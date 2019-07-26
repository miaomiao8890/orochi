// 'use strict'

// const puppeteer = require('puppeteer')
// const seo = require('./orochi/seo')

// module.exports = async function(host) {
//     const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
//     const page = await browser.newPage()
//     await page.goto(host)

//     // SEO
//     const seoResult = await seo(page)
//     console.log(seoResult)

//     browser.close()
// }

const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

function launchChromeAndRunLighthouse(url, opts, config = null) {
    return chromeLauncher
        .launch({ chromeFlags: opts.chromeFlags })
        .then(chrome => {
            opts.port = chrome.port;
            return lighthouse(url, opts, config).then(results => {
                // use results.lhr for the JS-consumeable output
                // https://github.com/GoogleChrome/lighthouse/blob/master/typings/lhr.d.ts
                // use results.report for the HTML/JSON/CSV output as a string
                // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
                return chrome.kill().then(() => results.lhr);
            });
    });
}

module.exports = launchChromeAndRunLighthouse

const opts = {
    // chromeFlags: ["--show-paint-rects"]
    chromeFlags: ["--no-sandbox", "--headless"],
    onlyCategories: ['performance']
};

// Usage:
// launchChromeAndRunLighthouse("https://www.cmcm.com", opts).then(results => {
//     // Use results!
//     console.log(results.audits)
// });
