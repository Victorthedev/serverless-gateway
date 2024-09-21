const fs = require('fs');
const yaml = require('yaml');
const path = require('path');
const config = require('../config');

function loadConfig() {
  const configPath = path.join(process.cwd(), config.configFile);
  const configContent = fs.readFileSync(configPath, 'utf8');
  return yaml.parse(configContent);
}

module.exports = { loadConfig };
