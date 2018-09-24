const Atmosphere = require('../atmosphere/reporter.js');

const apiClient = require('../api/client.js');
const Constant = require('../core/constants.js');

module.exports = () => {
  Atmosphere.get()
    .then((result) => {
      const { id, data } = result;

      data.forEach((metric) => {
        const metricId = `${id}${metric.name}`;
        console.log(`TEST-${metricId} ${metric.value}`); // eslint-disable-line
      });

      if (!process.env.PUSHGATEWAY_DISABLED) {
        data.forEach((metric) => {
          const metricId = `${id}${metric.name}`;
          console.log(`TEST-${metricId} ${metric.value}`); // eslint-disable-line
          apiClient.send(Constant.JOB_ID_WEATHER, metricId, metric.value);
        });
      }
    });
};
