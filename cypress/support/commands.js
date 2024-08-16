Cypress.Commands.add('login', (username, password) => {
    cy.visit('/', {
        timeout: 200000,
        onBeforeLoad: (win) => {
            Object.defineProperty(win, 'onload', { value: () => { } });
        }
    });

    cy.get('#user-name', { timeout: 10000 }).should('be.visible').type(username);
    cy.get('#password', { timeout: 10000 }).should('be.visible').type(password);
    cy.get('#login-button', { timeout: 10000 }).should('be.visible').click();
});

Cypress.Commands.add('addProductToCartByName', (productName) => {
    cy.get('.inventory_item', { timeout: 10000 }).should('be.visible');

    cy.contains('.inventory_item_name', productName)
        .parents('.inventory_item')
        .find('button')
        .click();
});

Cypress.Commands.add('verifyProductsInCart', (productNames) => {
    cy.get('.shopping_cart_link').click();
    productNames.forEach((productName) => {
        cy.contains('.inventory_item_name', productName).should('be.visible');
    });
});

Cypress.Commands.add('checkout', (firstName, lastName, postalCode) => {
    cy.get('#checkout').click();
    cy.get('#first-name').type(firstName);
    cy.get('#last-name').type(lastName);
    cy.get('#postal-code').type(postalCode);
    cy.get('#continue').click();
    cy.get('#finish').click();
});

Cypress.Commands.add('blockBacktraceRequests', () => {
    cy.intercept('POST', 'https://events.backtrace.io/**', (req) => {
        req.reply((res) => {
            res.send({ statusCode: 200, body: {} });
        });
    }).as('blockBacktrace');
});

Cypress.Commands.add('modifyCORSHeaders', () => {
    cy.intercept({
        method: 'GET',
        url: '**/api/**',
    }, (req) => {
        req.on('response', (res) => {
            res.headers['Access-Control-Allow-Origin'] = '*';
        });
    });
});
