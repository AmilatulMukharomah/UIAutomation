const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Test Login SauceDemo', function() {
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        if (driver) {
            await driver.sleep(2000); // wait before the browser closes completely
            await driver.quit();
        }
    });

    it('1. Visit SauceDemo and verify title', async function() {
        await driver.get('https://www.saucedemo.com/');
        const title = await driver.getTitle();
        
        // Assert that the title is correct
        assert.strictEqual(title, 'Swag Labs');
    });

});