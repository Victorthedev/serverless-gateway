const path = require('path');

module.exports = {
  functionsDir: path.join(process.cwd(), 'functions'),
  configFile: 'serverless.yml',
  port: 3000
};