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

    it('2. Login with valid credentials', async function() {
        let inputUsername = await driver.findElement(By.css('[data-test="username"]'));
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'));
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'));
        
        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonLogin.click();
    });

});