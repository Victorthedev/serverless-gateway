# Serverless-API-Gateway-Local-Development-Package
An npm package that mimics the behavior of AWS API Gateway, Azure API Gateway, or GCP API Gateway locally. 
Serverless API Gateway Local is a development tool that emulates AWS API Gateway and Lambda functions locally. It allows developers to test and debug their serverless applications without deploying to the cloud, significantly speeding up the development process.

## Features

- Local emulation of API Gateway
- Mock integration with Lambda functions
- Support for Serverless Framework configuration
- Hot-reloading of Lambda functions
- API Gateway event simulation

## Installation

Run `npm i serverless-gateway`

## Required Dependencies

Run `npm install express aws-sdk body-parser chokidar yaml`
express: Web framework for Node.js
aws-sdk: AWS SDK for JavaScript
body-parser: Middleware to parse incoming request bodies
chokidar: File watcher used for hot reloading
yaml: YAML parser and stringifier

For development, you might also want to install Jest for testing:
`npm install --save-dev jest`

## Usage

Your project should have the following structure:
your-project/
├── functions/
│   ├── hello.js
│   └── echo.js
├── serverless.yml
└── server.js

**Configure your serverless.yml**
Create a serverless.yml file in your project root to define your functions and HTTP events:
service: my-serverless-app

provider:
  name: aws
  runtime: nodejs14.x

functions:
  hello:
    handler: functions/hello.handler
    events:
      - http:
          path: hello
          method: get
  echo:
    handler: functions/echo.handler
    events:
      - http:
          path: echo
          method: post

 **Create your Lambda functions**
 In the functions directory, create your Lambda functions. For example:
exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from local Lambda!' }),
  };
};

// functions/echo.js
exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify({ echoed: body }),
  };
}; 

**Set up the local server**
Create a server.js file in your project root:

const ServerlessApiGatewayLocal = require('serverless-gateway');

const gateway = new ServerlessApiGatewayLocal();
gateway.start();

Start the server (`node server.js`)

## How It Works

- Configuration Loading: The tool reads your serverless.yml file to understand the structure of your serverless application, including function definitions and API routes.

- Route Setup: Based on the configuration, it sets up Express routes that correspond to your API Gateway endpoints.

- Lambda Execution: When a request is received, the tool loads the appropriate Lambda function from your functions directory and executes it in a mock environment.

- Event Simulation: It creates an event object that simulates the structure of an API Gateway event, passing this to your Lambda function.

- Hot Reloading: The tool watches your functions directory for changes. When a file is modified, it automatically reloads the function, allowing you to see changes without restarting the server.

## Customization

You can customize the behavior of Serverless API Gateway Local by passing options when initializing:

const gateway = new ServerlessApiGatewayLocal({
  port: 4000, // Change the port (default is 3000)
  functionsDir: './my-functions', // Change the functions directory
  configFile: './my-serverless-config.yml' // Use a different config file
});

## Limitations

- This tool is designed for local development and testing. It does not replicate all features of AWS API Gateway and Lambda.

- Advanced API Gateway features like custom authorizers are not currently supported.

- The performance characteristics may differ from the actual AWS environment.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
