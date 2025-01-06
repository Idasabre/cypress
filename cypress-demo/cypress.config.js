const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    screenshotsFolder: 'cypress/screenshots',
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      //
      },
    baseUrl : "https://automationexercise.com/",
    chromeWebSecurity: false,
    watchForFileChanges: false,
    specPattern: 'cypress/e2e/**/*.js',
    // Use Mochawesome report
    reporter: "mochawesome", 
    reporterOptions: {
      reportDir: "cypress/reports", // Directory for storing reports
      overwrite: false,             // Do not overwrite existing reports
      html: true,                   // Generate an HTML report
      json: true,                   // Generate a JSON report
      embeddedScreenshots: true, // Embed screenshots in HTML
      inlineAssets: true,           // Embed screenshots and other assets in the report
    },
  },
}); 