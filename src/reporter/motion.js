const formatter = require('./formatId.js');

const Movement = function (sensor) {
  this.metricId = formatter.parse(`${sensor.name}${sensor.id}`);
  this.value = sensor.state.attributes.attributes.presence === true ? 1 : 0;
};

module.exports = Movement;
