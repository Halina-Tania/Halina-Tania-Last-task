const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        listFiles(dir) {
          const fs = require('fs');
          const path = require('path');
          const files = fs.readdirSync(dir);
          return files;
        },
      });
    },
  },
  viewportHeight: 720,
  viewportWidth: 1280
});