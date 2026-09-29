const { test, expect } = require('@playwright/test');

test.use({
    storageState: 'playwright/.auth/user.json'
});

test('should access products page with saved authentication', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
});