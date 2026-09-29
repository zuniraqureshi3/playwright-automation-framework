const { test: base } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { ProductDetailsPage } = require('../pages/ProductDetailsPage');

//const { users } = require('../data/users');

const test = base.extend({
    loginPage: async ({page} , use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToURL();
        await use(loginPage);
    },
    productsPage: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        await page.goto('/inventory.html');
        await use(productsPage);
    },
    cartPage: async ({ page } , use ) => {
        const cartPage  = new CartPage(page);
        await use(cartPage);
    },
    checkoutPage: async ({ page } , use ) => {
        const checkoutPage  = new CheckoutPage(page);
        await use(checkoutPage);
    },
    productDetailsPage: async ({ page }, use) => {
    const productDetailsPage = new ProductDetailsPage(page);
    await use(productDetailsPage);
    },
    // loggedInPage: async ({ loginPage, page }, use) => {
    //     await loginPage.login(
    //         users.standardUser.username,
    //         users.standardUser.password
    //     );
    //     await use(page);
    // },
    // loggedInProductsPage: async ({ loggedInPage }, use) => {
    //     const productsPage = new ProductsPage(loggedInPage);
    //     await use(productsPage);
    // }


});
module.exports = { test };