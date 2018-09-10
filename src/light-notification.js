require('dotenv').config();

const huejay = require('huejay');
const bridgeManager = require('./bridge.js');
const DeviceConstants = require('./device-constants');

bridgeManager.get()
  .then((bridge) => {
    const client = new huejay.Client({ host: bridge.ip, username: process.env.HUE_USERNAME });

    client.lights.getAll()
      .then((lights) => {
        lights.forEach((light) => {
          if (light.name === DeviceConstants.HUE_GO) {
            light.on = !light.on;
            client.lights.save(light)
          }
        });
      });
  });
