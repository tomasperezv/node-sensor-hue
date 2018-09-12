require('dotenv').config();

const huejay = require('huejay');
const bridgeManager = require('./bridge.js');
const apiClient = require('./api-client.js');
const reporterFactory = require('./reporter/reporter-factory.js');

bridgeManager.get()
  .then((bridge) => {
    const client = new huejay.Client({ host: bridge.ip, username: process.env.HUE_USERNAME });

    client.sensors.getAll()
      .then((sensors) => {
        sensors.forEach((sensor) => {
          const reporter = reporterFactory.get(sensor);
          if (reporter !== null) {
            console.log(`${reporter.metricId} ${reporter.value}`); // eslint-disable-line
            apiClient.send(reporter.jobId, reporter.metricId, reporter.value);
          }
        });
      });
  });
