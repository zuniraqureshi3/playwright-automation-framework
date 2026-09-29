const { test } = require('@playwright/test');

const { LoginPage } = require('../../pages/LoginPage');
const { users } = require('../../data/users');

test('setup authentication', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigateToURL();

    await loginPage.login(
        process.env.TEST_USERNAME,
        process.env.TEST_PASSWORD
    );

    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });

});

module.exports = { test };
