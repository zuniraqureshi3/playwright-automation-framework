function parseCurrency(value) {
    // convert "$29.99" → 29.99
    return parseFloat(value.replace('$', ''));
}

module.exports = { parseCurrency }; 