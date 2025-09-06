const { defineConfig } = require("cypress");
module.exports = defineConfig({
  projectId: 'jztk3s',
  projectId: 'jztk3s',
   video: true,
   screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: true,
      html: true,
      json: false,
    setupNodeEvents(on, config) {
      return config;
    },
  },
},
});
