const sortingOptions = [
    {
        name: 'Name A to Z',
        value: 'az',
        dataSource: 'productNames',
        sort: (a, b) => a.localeCompare(b)
    },
    {
        name: 'Name Z to A',
        value: 'za',
        dataSource: 'productNames',
        sort: (a, b) => b.localeCompare(a)
    },
    {
        name: 'Price Low to High',
        value: 'lohi',
        dataSource: 'productPrices',
        sort: (a, b) =>
            parseFloat(a.replace('$', '')) -
            parseFloat(b.replace('$', ''))
    },
    {
        name: 'Price High to Low',
        value: 'hilo',
        dataSource: 'productPrices',
        sort: (a, b) =>
            parseFloat(b.replace('$', '')) -
            parseFloat(a.replace('$', ''))
    }
];

module.exports = { sortingOptions };