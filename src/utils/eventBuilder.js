function buildApiGatewayEvent(req) {
    return {
      path: req.path,
      httpMethod: req.method,
      headers: req.headers,
      queryStringParameters: req.query,
      body: JSON.stringify(req.body),
      isBase64Encoded: false,
      requestContext: {
        accountId: '123456789012',
        resourceId: 'resource-id',
        stage: 'local',
        requestId: `local-${Date.now()}`,
        identity: {
          sourceIp: req.ip,
          userAgent: req.get('User-Agent')
        },
        resourcePath: req.path,
        httpMethod: req.method,
        apiId: 'local'
      }
    };
  }
  
  module.exports = { buildApiGatewayEvent };
  