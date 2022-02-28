const os = require('os');
const { ipcMain } = require('electron');
const axios = require('axios');

export const getData = () => {  
  ipcMain.on('send-data', () => {
    axios.post('https://en64m5lw55z6dim.m.pipedream.net', {
      cpus: os.cpus(),
      networkInterfaces: os.networkInterfaces(),
      memory: {
        totalMemory: (os.totalmem())/1048576,
        freeMemory: (os.freemem())/1048576,
      },
      os: {
        arch: os.arch(),
        osType: os.type(),
        osPlatform: os.platform(),
      }
    })
  });
};