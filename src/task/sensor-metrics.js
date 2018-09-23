const huejay = require('huejay');

const bridgeManager = require('../core/bridge.js');
const apiClient = require('../api/client.js');
const reporterFactory = require('../reporter/reporter-factory.js');
const Constant = require('../core/constants.js');

module.exports = () => {
  bridgeManager.get()
    .then((bridge) => {
      const client = new huejay.Client({ host: bridge.ip, username: process.env.HUE_USERNAME });

      client.sensors.getAll()
        .then((sensors) => {
          sensors.forEach((sensor) => {
            const reporter = reporterFactory.get(sensor);
            if (reporter !== null) {
              console.log(`${reporter.metricId} ${reporter.value} ${reporter.labels}`); // eslint-disable-line
              if (!process.env.PUSHGATEWAY_DISABLED) {
                apiClient.send(
                  Constant.JOB_ID_SENSOR,
                  reporter.metricId, reporter.value, reporter.labels
                );
              }
            }
          });
        });
    });
};
