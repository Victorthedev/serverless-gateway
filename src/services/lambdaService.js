const path = require('path');
const config = require('../config');

async function mockLambdaExecution(functionName, event) {
  const context = {
    functionName,
    awsRequestId: `local-${Date.now()}`,
    logGroupName: `/aws/lambda/${functionName}`,
    logStreamName: `${Date.now()}-local`,
    invokedFunctionArn: `arn:aws:lambda:local:000000000000:function:${functionName}`
  };

  const functionPath = path.join(config.functionsDir, `${functionName}.js`);
  const lambdaFunction = require(functionPath);

  return new Promise((resolve, reject) => {
    const callback = (error, result) => {
      if (error) reject(error);
      else resolve(result);
    };

    const result = lambdaFunction.handler(event, context, callback);
    if (result instanceof Promise) {
      result.then(resolve).catch(reject);
    }
  });
}

module.exports = { mockLambdaExecution };
