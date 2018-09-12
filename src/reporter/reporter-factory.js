const Temperature = require('./temperature.js');
const Light = require('./light-level.js');

module.exports = {
  get: (sensor) => {
    let reporter = null;

    switch (sensor.type) {
      default:
        break;
      case 'ZLLTemperature':
        reporter = new Temperature(sensor);
        break;

      case 'ZLLLightLevel':
        reporter = new Light(sensor);
        break;
    }

    return reporter;
  }
};
