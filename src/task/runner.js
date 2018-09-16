const sensorMetrics = require('./sensor-metrics.js');
const healthMetrics = require('./health-metrics.js');

module.exports = () => {
  setInterval(sensorMetrics, process.env.METRICS_INTERVAL);
  setInterval(healthMetrics, process.env.METRICS_INTERVAL);
};
