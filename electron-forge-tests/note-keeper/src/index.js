const { app, BrowserWindow } = require('electron');
const path = require('path');
const { demoLogic } = require('./demoLogic');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
  }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  demoLogic();
};

app.on('ready', createWindow);

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
