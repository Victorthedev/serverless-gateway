const { mockLambdaExecution } = require('../services/lambdaService.js');
const { buildApiGatewayEvent } = require('../utils/eventBuilder.js');

async function handleRequest(req, res, functionName) {
  try {
    const event = buildApiGatewayEvent(req);
    const result = await mockLambdaExecution(functionName, event);
    res.json(result);
  } catch (error) {
    console.error(`Error executing Lambda function ${functionName}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { handleRequest };
