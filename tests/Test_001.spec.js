//const { test, expect} =require('@playwright/test');
const {test,expect} =require ('@playwright/test');
test('First Test', async ({page}) =>{
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle(/Google/);
})