const huejay = require('huejay');
const bridgeManager = require('./bridge.js');

bridgeManager.get()
  .then((bridge) => {
    const client = new huejay.Client({ host: bridge.ip, timeout: 60000 });
    const user = new client.users.User();

    client.users.create(user)
      .then((rawUser) => {
        console.log(`New user created - Username: ${rawUser.username}`); // eslint-disable-line
      })
      .catch((error) => {
        if (error instanceof huejay.Error && error.type === 101) {
          console.log(`Link button not pressed. Try again...`); // eslint-disable-line
        }
      });
  });
