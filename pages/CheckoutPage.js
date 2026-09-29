class CheckoutPage {
    constructor(page) {
        this.page = page;

        // Checkout information
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');

        // Checkout overview
        this.productName = page.locator('.inventory_item_name');
        this.productPrice = page.locator('.inventory_item_price');
        this.itemTotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
        this.finishButton = page.locator('#finish');

        // Order confirmation
        this.orderConfirmationMessage = page.locator('.complete-header');

        // Error message container
        this.errorMessageContainer = page.locator('.error-message-container');
    }

    async enterCustomerInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinue() {
        await this.continueButton.click();
    }
    async getTotalText() {
        return await this.total.textContent();
    }

    async clickFinish() {
        await this.finishButton.click();
    }
}

module.exports = { CheckoutPage };