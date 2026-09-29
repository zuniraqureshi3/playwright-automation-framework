const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');
const { products } = require('../../data/products');

test.describe('Product Details', () => {
 for (const productKey in products) {
     const product = products[productKey];
     test(`should display correct details for ${product.name}`, async ({ productsPage, productDetailsPage }) => {
         await productsPage.openProduct(product.name);

         await expect(productDetailsPage.productName)
             .toHaveText(product.name);

         await expect(productDetailsPage.productImage)
             .toHaveAttribute('src', new RegExp(product.image));

         await expect(productDetailsPage.productPrice)
             .toHaveText(product.price);

         await expect(productDetailsPage.productDescription)
             .toHaveText(product.description);
     });
 }
});