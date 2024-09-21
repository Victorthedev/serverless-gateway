const chokidar = require('chokidar');
const path = require('path');

function setupHotReload(functionsDir, reloadCallback) {
  const watcher = chokidar.watch(functionsDir, {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });

  watcher.on('change', (filePath) => {
    console.log(`File ${filePath} has been changed. Reloading...`);
    Object.keys(require.cache).forEach(id => {
      if (id.startsWith(functionsDir)) {
        delete require.cache[id];
      }
    });
    reloadCallback();
  });
}

module.exports = { setupHotReload };
