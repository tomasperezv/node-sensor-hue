const formatter = require('./formatId.js');

const temperature = function (sensor) {
  this.metricId = formatter.parse(sensor.name);
  this.value = sensor.state.attributes.attributes.temperature / 100;
  this.labels = [
    ['label', 'val1'],
    ['battery', sensor.config.attributes.attributes.battery],
    ['on', sensor.config.attributes.attributes.on],
    ['uniqueid', sensor.attributes.attributes.uniqueid],
    ['swversion', sensor.attributes.attributes.swversion]
  ];
};

module.exports = temperature;
