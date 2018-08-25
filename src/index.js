const huejay = require('huejay');
const bridgeManager = require('./bridge.js');

bridgeManager.get()
  .then((bridge) => {
    const client = new huejay.Client({ host: bridge.ip, username: process.env.HUE_USERNAME });

    client.sensors.getAll()
      .then(sensors => {
        sensors.forEach((sensor) => console.log(sensor.uniqueId)); // eslint-disable-line
      });
  });
