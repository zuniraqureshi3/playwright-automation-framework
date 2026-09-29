const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');
const { products } = require('../../data/products');

test.describe('Cart', () => {

    // Add to cart tests
    for (const productKey in products) {
        const product = products[productKey];

        test(`should add ${product.name} to cart and proceed to checkout`, async ({
            productsPage,
            cartPage,
            checkoutPage
        }) => {

            await productsPage.addProductToCart(product.name);

            await expect(productsPage.cartBadge).toHaveText('1');

            await productsPage.openCart();

            await expect(cartPage.cartTitle).toHaveText('Your Cart');
            await expect(cartPage.productName).toHaveText(product.name);
            await expect(cartPage.productPrice).toHaveText(product.price);
            await expect(cartPage.quantity).toHaveText('1');

            await cartPage.clickCheckout();

            await expect(checkoutPage.page)
                .toHaveURL(/checkout-step-one.html/);
        });
    }


    // Remove from cart tests
    for (const productKey in products) {
        const product = products[productKey];

        test(`should remove ${product.name} from cart`, async ({
            productsPage,
            cartPage
        }) => {

            await productsPage.addProductToCart(product.name);

            await productsPage.openCart();

            await cartPage.getRemoveButton(product.name).click();

            await expect(cartPage.getCartItem(product.name))
                .not.toBeVisible();

            await expect(productsPage.cartBadge)
                .toBeHidden();
        });
    }

    test('should add multiple products to cart', async ({ productsPage, cartPage }) => {

        const addedProducts = [products.backpack, products.bikeLight];
        for (const product of addedProducts) {
        await productsPage.addProductToCart(product.name);
        }

        await expect(productsPage.cartBadge).toHaveText('2');
 
        await productsPage.openCart();

        for (const product of addedProducts) {
            await expect(cartPage.getCartItem(product.name)).toBeVisible();
            await expect(cartPage.getProductPrice(product.name)).toHaveText(product.price);
            await expect(cartPage.getProductQuantity(product.name)).toHaveText('1');
        }
    });

});