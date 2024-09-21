const { loadConfig } = require('../utils/configLoader.js');
const { mockLambdaExecution } = require('../services/lambdaService.js');
const { buildApiGatewayEvent } = require('../utils/eventBuilder.js');

function setupRoutes(app) {
  let routes = new Map();

  function loadRoutes() {
    const config = loadConfig();
    routes.clear();

    Object.entries(config.functions).forEach(([functionName, functionConfig]) => {
      const { events } = functionConfig;
      events.forEach(event => {
        if (event.http) {
          const { path, method } = event.http;
          routes.set(`${method.toUpperCase()}:${path}`, { functionName, handler: functionConfig.handler });
          app[method.toLowerCase()](path, async (req, res) => {
            const result = await mockLambdaExecution(functionName, buildApiGatewayEvent(req));
            res.json(result);
          });
        }
      });
    });
  }

  loadRoutes();

  return {
    reloadRoutes: loadRoutes
  };
}

module.exports = { setupRoutes };
