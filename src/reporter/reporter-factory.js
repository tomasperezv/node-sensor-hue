const Temperature = require('./temperature.js');
const Light = require('./light-level.js');
const Motion = require('./movement.js');

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

      case 'ZLLPresence':
        reporter = new Motion(sensor);
        break;
    }

    return reporter;
  }
};
