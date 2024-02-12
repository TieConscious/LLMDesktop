const { BrowserWindow, shell } = require('electron');

let mainWindow;

function createMainWindow(loadUrl) {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "LLM Desktop",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadURL(loadUrl);

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Uncomment below to open the DevTools for debugging
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  return mainWindow;
}

function loadUrlInMainWindow(url) {
  if (mainWindow) {
    mainWindow.loadURL(url);
  }
}

module.exports = {
  createMainWindow,
  loadUrlInMainWindow
};
