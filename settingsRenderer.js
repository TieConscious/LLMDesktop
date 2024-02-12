const { ipcRenderer } = require('electron');

document.getElementById('settingsForm').addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('Please work')
  const defaultLLM = document.querySelector('select[name="defaultLLM"]').value;
  const startOnStartup = document.querySelector('input[name="startOnStartup"]').checked;
  ipcRenderer.send('update-settings', { defaultLLM, startOnStartup });
});

ipcRenderer.on('load-settings', (event, settings) => {
  document.querySelector('select[name="defaultLLM"]').value = settings.defaultLLM || 'chatGPT';
  document.querySelector('input[name="startOnStartup"]').checked = settings.startOnStartup || false;
});
