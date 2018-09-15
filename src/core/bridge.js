const huejay = require('huejay');

module.exports = {
  get: () => new Promise((resolve) => {
    huejay.discover()
      .then((bridges) => {
        resolve(bridges[0]);
      });
  })
};
