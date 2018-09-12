const formatter = require('./formatId.js');

const Movement = function (sensor) {
  this.metricId = formatter.parse(sensor.name);
  this.value = sensor.state.attributes.attributes.presence;
};

module.exports = Movement;
