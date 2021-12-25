const { contextBridge, ipcRenderer }  = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadPreferences: () => ipcRenderer.send('load-prefs')
})