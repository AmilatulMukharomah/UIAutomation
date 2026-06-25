const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Test Login SauceDemo', function() {
    let driver;

    it('Visit SauceDemo and login with valid credentials', async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://www.saucedemo.com/');
        const title = await driver.getTitle();

        // Assert that the title is correct
        assert.strictEqual(title, 'Swag Labs');

        //inputs
        let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
        await inputUsername.sendKeys('standard_user')
        await inputPassword.sendKeys('secret_sauce')
        await buttonLogin.click()

        //wait element appear
        let buttonCart = await driver.wait(
            until.elementLocated(By.xpath('//*[@data-test="shopping-cart-link"]')), 
            10000
        );
        await driver.wait(until.elementIsVisible(buttonCart), 5000, 'Button Cart is not visible');

        // Assert that the button cart is displayed
        let isButtonCartDisplayed = await buttonCart.isDisplayed();
        assert.strictEqual(isButtonCartDisplayed, true, 'Button Cart is not displayed');

        await driver.sleep(2000); // Wait for 2 seconds to see the result

        //dropdown shearch
        let dropdown = await driver.findElement(By.xpath('//*[@data-test="product-sort-container"]'));
        await dropdown.click();
        let option = await driver.findElement(By.xpath('//option[text()="Name (Z to A)"]'));
        await option.click();

        await driver.quit();
    });
});