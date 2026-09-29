const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');
const { products } = require('../../data/products');

test('should display products for authenticated user', async ({ productsPage }) => {
    await expect(productsPage.pageTitle).toHaveText('Products');
});

test('should display six products', async ({ productsPage }) => {

    const productCount = await productsPage.getProductCount();
    expect(productCount).toBe(6);
});

test('should add a product to cart', async ({ productsPage }) => {

    // Add Sauce Labs Backpack
    await productsPage.addProductToCart(products.backpack.name);
    // Verify cart badge
    await expect(productsPage.cartBadge).toHaveText('1');
});