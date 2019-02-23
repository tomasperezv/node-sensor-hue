const sensorMetrics = require('./sensor-metrics.js');
const healthMetrics = require('./health-metrics.js');
const atmosphereMetrics = require('./atmosphere-metrics.js');
const openCityMetrics = require('./open-city-metrics.js');

module.exports = () => {
  setInterval(sensorMetrics, process.env.METRICS_INTERVAL);
  setInterval(healthMetrics, process.env.METRICS_INTERVAL);
  setInterval(atmosphereMetrics, process.env.METRICS_INTERVAL);
  setInterval(openCityMetrics, process.env.METRICS_INTERVAL);
};
