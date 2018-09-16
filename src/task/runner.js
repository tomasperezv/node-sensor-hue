const sensorMetrics = require('./sensor-metrics.js');

module.exports = () => {
  setInterval(sensorMetrics, process.env.METRICS_INTERVAL);
};
