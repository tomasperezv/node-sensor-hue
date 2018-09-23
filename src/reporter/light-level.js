const formatter = require('./formatId.js');

const Light = function (sensor) {
  this.metricId = formatter.parse(sensor.name);
  this.value = sensor.state.attributes.attributes.lightlevel / 100;
  this.labels = [
    ['label', 'val1'],
    ['battery', sensor.config.attributes.attributes.battery],
    ['on', sensor.config.attributes.attributes.on],
    ['uniqueid', sensor.attributes.attributes.uniqueid],
    ['swversion', sensor.attributes.attributes.swversion]
  ];
};

module.exports = Light;
