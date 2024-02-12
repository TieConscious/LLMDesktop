const { ipcMain } = require('electron');
const { setSetting } = require('./settingsManager');

function setupIpcHandlers() {
  ipcMain.on('update-settings', (event, settings) => {
    setSetting('defaultLLM', settings.defaultLLM);
    setSetting('startOnStartup', settings.startOnStartup);
  });
}

module.exports = {
  setupIpcHandlers
};
