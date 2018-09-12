const formatter = require('./formatId.js');

const sensor = function(sensor) {
  this.metricId = formatter.parse(sensor.name);
  this.value = sensor.state.attributes.attributes.temperature / 100;
};

module.exports = sensor;
