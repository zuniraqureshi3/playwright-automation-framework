class ProductsPage {
    constructor(page) {
        this.page = page;

        this.pageTitle = page.locator('.title');
        this.inventoryItems = page.locator('.inventory_item');
        this.cartLink = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');

        this.sortDropdown = page.locator('.product_sort_container');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.productDescriptions = page.locator('.inventory_item_desc');
        this.productImages = page.locator('.inventory_item_img img');
    
    }

    async getProductCount() {
        return await this.inventoryItems.count();
    }

    async addProductToCart(productName) {
        const product = this.page
            .locator('.inventory_item')
            .filter({ hasText: productName });

        await product.locator('button').click();
    }

    async openCart() {
        await this.cartLink.click();
    }

    async sortProducts(option) {
        await this.sortDropdown.selectOption(option);
    }

    async openProduct(productName) {
        const product = this.getProductLocator(productName);

        await product.locator('.inventory_item_name').click();
    }
    async getProductDescription(productName) {
        const product = this.getProductLocator(productName);

        return await product.locator('.inventory_item_desc').textContent();
    }
    async getProductImageSrc(productName) {
        const product = this.getProductLocator(productName);

        return await product.locator('.inventory_item_img img').getAttribute('src');
    }
    async getProductPrice(productName) {
        
        const product = this.getProductLocator(productName);
        return await product.locator('.inventory_item_price').textContent();
    }   
    getProductLocator(productName) {
        return this.page
            .locator('.inventory_item')
            .filter({ hasText: productName });
      
    }
}

module.exports = { ProductsPage };