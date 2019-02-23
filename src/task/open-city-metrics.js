const openCity = require('../external/open-city-api/reporter.js');

const apiClient = require('../api/client.js');
const formatter = require('../reporter/formatId.js');
const Constant = require('../core/constants.js');

module.exports = () => {
  openCity.get()
    .then((dataPoints) => {
      dataPoints.forEach((point) => {
        const metricId = formatter.parse(point.id);
        console.log(`${metricId} ${point.value}`); // eslint-disable-line

        if (!process.env.PUSHGATEWAY_DISABLED) {
          apiClient.send(Constant.JOB_ID_CITY_AIR, metricId, point.value);
        }
      });
    });
};
