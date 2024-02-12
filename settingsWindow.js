const { BrowserWindow } = require('electron');
const { setSetting, getSetting } = require('./settingsManager.js');

let settingsWindow;

function createSettingsWindow() {
  if (settingsWindow) {
    settingsWindow.focus();
    return;
  }

  settingsWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  settingsWindow.loadFile('settings.html');

  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });

  settingsWindow.webContents.on('did-finish-load', () => {
    // Send current settings to the renderer process
    settingsWindow.webContents.send('load-settings', {
      defaultLLM: getSetting('defaultLLM'),
      startOnStartup: getSetting('startOnStartup')
    });
  });
}

module.exports = { createSettingsWindow };
