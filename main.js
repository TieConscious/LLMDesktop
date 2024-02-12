const { app, BrowserWindow } = require('electron');
const { createMainWindow, loadUrlInMainWindow } = require('./mainWindow');
const { setupMenu } = require('./menuConfig');
const { setupIpcHandlers } = require('./ipcHandlers');
const { getSetting } = require('./settingsManager');
const urls = require('./urls');

console.log(app.getPath('userData'));

function createWindow() {
  app.setName('LLM Desktop');
  const defaultLLM = getSetting('defaultLLM') || 'ChatGPT';
  createMainWindow(urls[defaultLLM]);
  setupMenu();
}

setupIpcHandlers();

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
