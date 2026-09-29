class ProductDetailsPage {
    constructor(page) {
        this.page = page;

        this.productName = page.locator('.inventory_details_name');
        this.productDescription = page.locator('.inventory_details_desc');
        this.productPrice = page.locator('.inventory_details_price');
        this.productImage = page.locator('.inventory_details_img');
    }
}

module.exports = { ProductDetailsPage };