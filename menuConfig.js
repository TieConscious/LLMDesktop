const { app, Menu } = require('electron');
const { createSettingsWindow } = require('./settingsWindow');
const { loadUrlInMainWindow } = require('./mainWindow');
const urls = require('./urls');

function setupMenu() {
  const menuTemplate = [
    {
      label: 'LLM Desktop',
      submenu: [
        { label: 'Settings', click: createSettingsWindow },
        { label: 'Quit', click: () => { app.quit(); }}
      ]
    },
    {
      label: 'Navigation',
      submenu: Object.entries(urls).map(([key, url]) => ({
        label: `Go to ${key}`, click: () => { loadUrlInMainWindow(url); }
      }))
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'toggleDevTools' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

module.exports = {
  setupMenu
};
