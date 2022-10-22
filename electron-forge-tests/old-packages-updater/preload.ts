const { contextBridge, ipcRenderer }  = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendData: () => ipcRenderer.send('send-data')
})