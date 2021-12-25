const os = require('os');
const { ipcMain } = require('electron');

export const getData = () => {
  console.log('HOSOAOSD');
  ipcMain.on('load-prefs', (event, args) => {
    console.log('aaaa');
  });
};