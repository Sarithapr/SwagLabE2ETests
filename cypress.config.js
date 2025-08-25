const { defineConfig } = require("cypress");
const codeCoverageTask = require('@cypress/code-coverage/task');
module.exports = defineConfig({
  projectId: 'jztk3s',
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: true,
      html: true,
      json: false,
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
  },
},
});
