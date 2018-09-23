const formatter = require('./formatId.js');

const Movement = function (sensor) {
  this.metricId = formatter.parse(`${sensor.name}${sensor.id}`);
  this.value = sensor.state.attributes.attributes.presence === true ? 1 : 0;
  this.labels = [
    ['battery', sensor.config.attributes.attributes.battery],
    ['on', sensor.config.attributes.attributes.on],
    ['uniqueid', sensor.attributes.attributes.uniqueid],
    ['swversion', sensor.attributes.attributes.swversion]
  ];
};

module.exports = Movement;
