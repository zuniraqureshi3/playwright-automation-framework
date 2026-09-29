const checkoutData = {
    validCustomer: {
        firstName: 'John',
        lastName: 'Doe',
        postalCode: '12345'
    },

    requiredFieldValidation: [
        {
            field: 'firstName',
            firstName: '',
            lastName: 'Doe',
            postalCode: '12345',
            errorMessage: 'Error: First Name is required'
        },
        {
            field: 'lastName',
            firstName: 'John',
            lastName: '',
            postalCode: '12345',
            errorMessage: 'Error: Last Name is required'
        },
        {
            field: 'postalCode',
            firstName: 'John',
            lastName: 'Doe',
            postalCode: '',
            errorMessage: 'Error: Postal Code is required'
        }
    ]
};

module.exports = { checkoutData };