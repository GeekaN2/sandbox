const Store = require('./store');
const { ipcMain } = require('electron')
const log = require('electron-log');


const store = new Store({
  configName: 'demoLogic',
  defaults: {
    users: []
  }
});

module.exports.demoLogic = () => {

  // receive message from index.html 
  ipcMain.on('save-secret', (event, args) => {
    const { user, secret } = args;

    const users = store.get('users');
  
    log.info(`Users ${JSON.stringify(users)}`);
  
    if (!users[user]) {
      store.set('users', {
        [user]: {
          secrets: [secret]
        }
      });
    } else {
      const userSecrets = users[user].secrets;

      if (userSecrets.length >= 4) {
        event.reply('ban-user', user);
        return;
      }

      store.set('users', {
        [user]: {
          secrets: [...userSecrets, secret]
        }
      })
    }

    return;
  });
}