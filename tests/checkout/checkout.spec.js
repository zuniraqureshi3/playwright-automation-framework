const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');
const { products } = require('../../data/products');
const { checkoutData } = require('../../data/checkoutData');
const { parseCurrency } = require('../../utils/helpers');

test.describe('Checkout', () => {
    test.beforeEach(async ({ productsPage, cartPage }) => {
        await productsPage.addProductToCart(products.backpack.name);
        await expect(productsPage.cartBadge).toHaveText('1');
        await productsPage.openCart();
        await expect(cartPage.cartTitle).toHaveText('Your Cart');
        await cartPage.clickCheckout();
    });
    test('should complete checkout successfully with valid customer information', async ({checkoutPage }) => {
        

        await expect(checkoutPage.page).toHaveURL(/checkout-step-one.html/);
        await checkoutPage.enterCustomerInformation(
            checkoutData.validCustomer.firstName,
            checkoutData.validCustomer.lastName,
            checkoutData.validCustomer.postalCode
        );
        await checkoutPage.clickContinue();

        await expect(checkoutPage.page).toHaveURL(/checkout-step-two.html/);

        await expect(checkoutPage.productName).toHaveText(products.backpack.name);
        await expect(checkoutPage.productPrice).toHaveText(products.backpack.price);
        await expect(checkoutPage.itemTotal).toHaveText(`Item total: ${products.backpack.price}`);
        await expect(checkoutPage.tax).toHaveText(`Tax: ${products.backpack.tax}`);
        await expect(checkoutPage.total).toHaveText(`Total: ${products.backpack.total}`);
        await checkoutPage.clickFinish();
        await expect(checkoutPage.page).toHaveURL(/checkout-complete.html/);
        await expect(checkoutPage.orderConfirmationMessage).toHaveText('Thank you for your order!');

    });
    test('should calculate checkout total correctly', async ({ checkoutPage }) => {
        await expect(checkoutPage.page).toHaveURL(/checkout-step-one.html/);
        await checkoutPage.enterCustomerInformation(
            checkoutData.validCustomer.firstName,
            checkoutData.validCustomer.lastName,
            checkoutData.validCustomer.postalCode
        );
        await checkoutPage.clickContinue();

        await expect(checkoutPage.page).toHaveURL(/checkout-step-two.html/);

        const itemTotal = parseCurrency(products.backpack.price);
        const tax = parseCurrency(products.backpack.tax);
        const calculatedTotal = Number((itemTotal + tax).toFixed(2));
        const totalText = await checkoutPage.getTotalText();
        const actualTotal = parseCurrency(totalText.replace('Total: ', ''));

        await expect(checkoutPage.itemTotal).toHaveText(`Item total: $${itemTotal.toFixed(2)}`);
        await expect(checkoutPage.tax).toHaveText(`Tax: $${tax.toFixed(2)}`);
        expect(actualTotal).toBe(calculatedTotal);
    });
});
test.describe('Checkout validation', () => {
    test.beforeEach(async ({ productsPage, cartPage }) => {
        await productsPage.addProductToCart(products.backpack.name);
        await expect(productsPage.cartBadge).toHaveText('1');
        await productsPage.openCart();
        await expect(cartPage.cartTitle).toHaveText('Your Cart');
        await cartPage.clickCheckout();
    });
for (const data of checkoutData.requiredFieldValidation) {
    test(`should not proceed to checkout without ${data.field}`, async ({ checkoutPage }) => {
        await checkoutPage.enterCustomerInformation(
            data.firstName,
            data.lastName,
            data.postalCode
        );

        await checkoutPage.clickContinue();

        await expect(checkoutPage.errorMessageContainer)
            .toHaveText(data.errorMessage);
    });
}
});

