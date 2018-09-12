const formatter = require('./formatId.js');

const temperature = function (sensor) {
  this.metricId = formatter.parse(sensor.name);
  this.value = sensor.state.attributes.attributes.temperature / 100;
};

module.exports = temperature;
