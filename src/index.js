const huejay = require('huejay');
const bridgeManager = require('./bridge.js');
const apiClient = require('./api-client.js');

bridgeManager.get()
  .then((bridge) => {
    const client = new huejay.Client({ host: bridge.ip, username: process.env.HUE_USERNAME });

    client.sensors.getAll()
      .then((sensors) => {
        sensors.forEach((sensor) => {
          if (typeof sensor.uniqueId === 'undefined') {
            return;
          }

          if (sensor.type === 'ZLLTemperature') {
            const temperature = sensor.state.attributes.attributes.temperature / 100;
            apiClient.send('job5', sensor.uniqueId, temperature);
          }
        });
      });
  });
