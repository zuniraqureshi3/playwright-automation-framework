const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');
const { sortingOptions } = require('../../data/sortingOptions');

test.describe('Product Sorting', () => {

    for (const option of sortingOptions) {

        test(`should sort products by ${option.name}`, async ({ productsPage }) => {

            await productsPage.sortProducts(option.value);

            const productValues =
                await productsPage[option.dataSource].allTextContents();

            const sortedProductValues =
                [...productValues].sort(option.sort);

            expect(productValues).toEqual(sortedProductValues);
        });
    }
});