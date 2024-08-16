const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'https://www.saucedemo.com',
    chromeWebSecurity: false,
  },
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 200000,
});
