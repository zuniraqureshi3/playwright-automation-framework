const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');
const { users } = require('../../data/users');

test('should login successfully with valid credentials', async ({ loginPage }) =>{
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await expect(loginPage.title).toHaveText('Products');
    });

test('should not allow locked-out user to login', async ({ loginPage }) =>{
    await loginPage.login(users.lockedOutUser.username, users.lockedOutUser.password);
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});

test('should not allow invalid user to login', async ({ loginPage }) =>{
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

