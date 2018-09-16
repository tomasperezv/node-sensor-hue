/* eslint-disable no-param-reassign */
require('dotenv').config();

const huejay = require('huejay');
const bridgeManager = require('./bridge.js');
const DeviceConstants = require('./constants');

const TIMEOUT = 1000;

const notify = () => {
  bridgeManager.get()
    .then((bridge) => {
      const client = new huejay.Client({ host: bridge.ip, username: process.env.HUE_USERNAME });

      client.lights.getAll()
        .then((lights) => {
          lights.forEach((light) => {
            if (light.name === DeviceConstants.HUE_GO) {
              const {
                on, brightness, saturation, hue, colorTemp
              } = light;

              let count = 0;
              const runTimeout = () => {
                if (count < 4) {
                  setTimeout(() => {
                    light.brightness = 100;
                    light.saturation = 211;
                    light.hue = 26307;

                    light.on = !light.on;

                    client.lights.save(light)
                      .then(() => {
                        setTimeout(() => {
                          runTimeout();
                        }, TIMEOUT);
                      });
                  }, TIMEOUT);
                } else {
                  light.on = on;
                  light.brightness = brightness;
                  light.saturation = saturation;
                  light.hue = hue;
                  light.colorTemp = colorTemp;

                  client.lights.save(light);
                }

                count++;
              };

              runTimeout();
            }
          });
        });
    });
};

module.exports = {
  notify
};

notify();
