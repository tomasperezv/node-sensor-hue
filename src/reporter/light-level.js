const formatter = require('./formatId.js');

const Light = function (sensor) {
  this.metricId = formatter.parse(sensor.name);
  this.value = sensor.state.attributes.attributes.lightlevel / 100;
};

module.exports = Light;
