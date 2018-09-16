const googleFitness = require('../health/google-fitness.js');

const apiClient = require('../api/client.js');
const Constant = require('../core/constants.js');

module.exports = () => {
  googleFitness.get()
    .then((dataPoints) => {
      const lastMetric = dataPoints[dataPoints.length - 1];

      const metricId = lastMetric.dataTypeName;
      const value = lastMetric.value[0].fpVal;
      console.log(`${metricId} ${value}`); // eslint-disable-line

      if (!process.env.PUSHGATEWAY_DISABLED) {
        apiClient.send(Constant.JOB_ID_HEALTH, metricId, value);
      }
    });
};
