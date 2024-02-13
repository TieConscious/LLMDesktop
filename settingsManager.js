const Store = require('electron-store');
const store = new Store();

function setSetting(key, value) {
  console.log(`Setting ${key}: ${value}`);
  store.set(key, value);
}

function getSetting(key) {
  try {
    return store.get(key);
  } catch (error) {
    console.error(`Error getting setting for key ${key}:`, error);
    return null; // or a sensible default
  }
}

module.exports = {
  setSetting,
  getSetting
};
