import { defineConfig } from "cypress";
const webpackConfig = require("./config/webpack.development")

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:${webpackConfig.devServer.port}`,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig,
    }
  },
});
