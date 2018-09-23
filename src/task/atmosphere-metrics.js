const Atmosphere = require('../atmosphere/reporter.js');

const apiClient = require('../api/client.js');
const formatter = require('../reporter/formatId.js');
const Constant = require('../core/constants.js');

module.exports = () => {
  Atmosphere.get()
    .then((dataPoints) => {
      const lastMetric = dataPoints[dataPoints.length - 1];

      if (typeof lastMetric === 'undefined') {
        return;
      }

      const metricId = formatter.parse(lastMetric.dataTypeName);
      const value = lastMetric.value[0].fpVal;
      console.log(`${metricId} ${value}`); // eslint-disable-line

      if (!process.env.PUSHGATEWAY_DISABLED) {
        apiClient.send(Constant.JOB_ID_HEALTH, metricId, value);
      }
    });
};
