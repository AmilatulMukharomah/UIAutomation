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

    it('3. Display main page and verify cart button', async function() {
        // wait element appear
        let buttonCart = await driver.wait(
            until.elementLocated(By.xpath('//*[@data-test="shopping-cart-link"]')), 
            10000
        );
        await driver.wait(until.elementIsVisible(buttonCart), 5000, 'Button Cart is not visible');

        // Assert that the button cart is displayed
        let isButtonCartDisplayed = await buttonCart.isDisplayed();
        assert.strictEqual(isButtonCartDisplayed, true, 'Button Cart is not displayed');
    });

    it('4. Display and test sorting dropdown', async function() {
        let dropdown = await driver.findElement(By.xpath('//*[@data-test="product-sort-container"]'));
        
        // click dropdown and select Z to A
        await dropdown.click();
        await driver.findElement(By.xpath('//option[text()="Name (Z to A)"]')).click();
        await driver.sleep(1000); // Jeda agar transisi terlihat

        // select A to Z
        await driver.findElement(By.xpath('//option[text()="Name (A to Z)"]')).click();

        // Assert dropdown A to Z
        let selectedOption = await driver.findElement(By.xpath('//option[text()="Name (A to Z)"]'));
        let selectedText = await selectedOption.getText();
        assert.strictEqual(selectedText, 'Name (A to Z)', 'Dropdown selection is not correct');
    });


});