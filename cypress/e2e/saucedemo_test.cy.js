describe('SauceDemo E2E Test', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.blockBacktraceRequests();
        cy.modifyCORSHeaders();
    });

    it('should log in with standard_user', () => {
        cy.login('standard_user', 'secret_sauce');
        cy.url().should('include', '/inventory.html');
    });

    it('should add two products to the cart', () => {
        cy.login('standard_user', 'secret_sauce');
        cy.addProductToCartByName('Sauce Labs Backpack');
        cy.addProductToCartByName('Sauce Labs Bike Light');
    });

    it('should view the cart and verify products', () => {
        cy.login('standard_user', 'secret_sauce');
        cy.addProductToCartByName('Sauce Labs Backpack');
        cy.addProductToCartByName('Sauce Labs Bike Light');
        cy.verifyProductsInCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    });

    it('should complete the purchase flow', () => {
        cy.login('standard_user', 'secret_sauce');
        cy.addProductToCartByName('Sauce Labs Backpack');
        cy.addProductToCartByName('Sauce Labs Bike Light');
        cy.verifyProductsInCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
        cy.checkout('Homer', 'Simpson', '12345');
        cy.contains('Thank you for your order!').should('be.visible');
    });
});
