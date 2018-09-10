require('dotenv').config();

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
            const metricId = sensor.name.replace(/\s/g, '');

            const temperature = sensor.state.attributes.attributes.temperature / 100;

            console.log(`${metricId} ${temperature}`); // eslint-disable-line
            apiClient.send('job5', metricId, temperature);
          }
        });
      });
  });
