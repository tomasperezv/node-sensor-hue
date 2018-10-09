const Atmosphere = require('../atmosphere/reporter.js');

const apiClient = require('../api/client.js');
const Constant = require('../core/constants.js');

const processMetric = (result) => {
  Object.keys(result).forEach((metric) => {
    const metricId = `netatmo${result.id}${metric}`;
    console.log(`${metricId} ${result[metric]}`); // eslint-disable-line
  });

  if (!process.env.PUSHGATEWAY_DISABLED) {
    Object.keys(result).forEach((metric) => {
      const metricId = `netatmo${result.id}${metric}`;
      if (result[metric] !== null) {
        console.log(`${metricId} ${result[metric]}`); // eslint-disable-line
        apiClient.send(Constant.JOB_ID_WEATHER, metricId, result[metric]);
      }
    });
  }
};

module.exports = () => {
  Atmosphere.get()
    .then((results) => {
      results.forEach(processMetric);
    });
};
