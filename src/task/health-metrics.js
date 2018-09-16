const googleFitness = require('../health/google-fitness.js');

const huejay = require('huejay');

const bridgeManager = require('../core/bridge.js');
const apiClient = require('../api/client.js');
const reporterFactory = require('../reporter/reporter-factory.js');
const Constant = require('../core/constants.js');

module.exports = () => {

  googleFitness.get()
    .then((dataPoints) => {
      const lastMetric = dataPoints[dataPoints.length - 1];

      console.log(`${lastMetric.dataTypeName} ${lastMetric.value.fpVal}`); // eslint-disable-line

      if (!process.env.PUSHGATEWAY_DISABLED) {
        apiClient.send(Constant.JOB_ID_HEALTH, lastMetric.dataTypeName, lastMetric.fpVal);
      }
    });
