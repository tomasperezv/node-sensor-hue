const TemperatureReporter = require('./temperature.js');
const LightReporter = require('./light-level.js');

module.exports = {
  get: (sensor) => {
    let reporter = null;

    switch (sensor.type) {
      default:
        break;
      case 'ZLLTemperature':
        reporter = new TemperatureReporter(sensor);
        break;
      case 'ZLLLightLevel':
        reporter = new LightReporter(sensor);
        break;
    }

    return reporter;
  }
};
