const express = require('express');
const bodyParser = require('body-parser');
const { setupRoutes } = require('./src/routes');
const { setupHotReload } = require('./src/services/hotReloadService');
const config = require('./src/config');

class ServerlessApiGatewayLocal {
  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.setupMiddleware();
    this.routes = setupRoutes(this.app);
    setupHotReload(config.functionsDir, () => this.routes.reloadRoutes());
  }

  setupMiddleware() {
    // Add any global middleware here
    this.app.use((req, res, next) => {
      console.log(`${req.method} ${req.path}`);
      next();
    });
  }

  start() {
    const port = config.port || 3000;
    this.app.listen(port, () => {
      console.log(`Serverless API Gateway Local running on port ${port}`);
    });
  }
}

module.exports = ServerlessApiGatewayLocal;
