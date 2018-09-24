const Netatmo = require('netatmo');
const formatter = require('../reporter/formatId.js');

module.exports = {
  get: () => {
    const client = new Netatmo({
      client_id: process.env.NETATMO_CLIENT_ID,
      client_secret: process.env.NETATMO_CLIENT_SECRET,
      username: process.env.NETATMO_USERNAME,
      password: process.env.NETATMO_PASSWORD
    });

    const map = ['Temperature', 'CO2', 'Humidity', 'Pressure', 'Noise'];

    return new Promise((resolve) => {
      const options = {
        device_id: process.env.NETATMO_DEVICE_ID,
        scale: 'max',
        type: map
      };

      client.getMeasure(options, (err, measure) => {
        if (!err) {
          const data = measure[measure.length - 1].value[0].map((value, index) => {
            return {
              name: map[index],
              value
            };
          });

          resolve({ id: 'netatmo', data });
        }
      });
    });
  }
};
