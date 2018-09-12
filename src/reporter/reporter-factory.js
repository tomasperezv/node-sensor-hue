const TemperatureReporter = require('./temperature.js');

module.exports = {
  get: (sensor) => {
    let reporter = null;

    switch (sensor.type) {
      default:
        break;
      case 'ZLLTemperature':
        reporter = new TemperatureReporter(sensor);
        break;
    }

    return reporter;
  }
};
