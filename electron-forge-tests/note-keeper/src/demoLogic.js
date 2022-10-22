const Store = require('./store');
const { ipcMain } = require('electron')
const DEFAULT_TIME = 300;

const store = new Store({
  configName: 'demoLogic',
  defaults: {
    users: [],
    time: DEFAULT_TIME,
  }
});

module.exports.demoLogic = () => {
  ipcMain.on('save-secret', (event, args) => {
    const { user, secret } = args;

    const users = store.get('users');
    
    if (!users[user]) {
      store.set('users', {
        [user]: {
          secrets: [secret]
        }
      });

      event.reply('show-secrets', {
        secrets: [secret],
        user,
      });
    } else {
      const userSecrets = users[user].secrets;

      if (userSecrets.length >= 4) {
        event.reply('ban-user', user);

        if (userSecrets.length === 4) {
          store.set('users', {
            [user]: {
              secrets: [...userSecrets, secret]
            }
          });

          event.reply('show-secrets', {
            secrets: [...userSecrets, secret],
            user,
          });

          return
        }

        event.reply('show-secrets', {
          secrets: userSecrets,
          user,
        });

        return;
      }

      store.set('users', {
        [user]: {
          secrets: [...userSecrets, secret]
        }
      });

      event.reply('show-secrets', {
        secrets: [...userSecrets, secret],
        user,
      });
    }

    return;
  });

  ipcMain.on('time-decrease', (event, arg) => {
    let time = store.get('time');

    if (time === null) {
      store.set('time', DEFAULT_TIME);
      time = DEFAULT_TIME;
    } 
    
    if (time <= 0) {
      event.reply('on-time-exceeded');
    } else {
      store.set('time', time - 1);
    }
  })

}