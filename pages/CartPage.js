class CartPage {
    constructor(page) {
        this.page = page;

        this.cartTitle = page.locator('.title');
        this.cartCheckoutButton = page.getByRole('button',{ name: 'Checkout'})
        this.productName = page.locator('.inventory_item_name');
        this.productPrice = page.locator('.inventory_item_price');
        this.quantity = page.locator('.cart_quantity');
    }

    async clickCheckout() {
        await this.cartCheckoutButton.click();
    }

    getCartItem(productName) {
        return this.page
            .locator('.cart_item')
            .filter({ hasText: productName });
    }

    getRemoveButton(productName) {
        return this.getCartItem(productName).locator('button');
    }
    getProductPrice(productName) {
    return this.getCartItem(productName).locator('.inventory_item_price');
    }

    getProductQuantity(productName) {
        return this.getCartItem(productName).locator('.cart_quantity');
    }
}

module.exports = { CartPage };