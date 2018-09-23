const Netatmo = require('netatmo');

module.exports = {
  get: () => {
    const client = new Netatmo({
      client_id: process.env.NETATMO_CLIENT_ID,
      client_secret: process.env.NETATMO_CLIENT_SECRET,
      username: process.env.NETATMO_USERNAME,
      password: process.env.NETATMO_PASSWORD
    });

    client.getStationsData((err, devices) => {
      console.log(devices);
    });

    return new Promise((resolve) => {
      const options = {
        device_id: '',
        scale: 'max',
        type: ['Temperature', 'CO2', 'Humidity', 'Pressure', 'Noise']
      };

      client.getMeasure(options, (err, measure) => {
        if (!err) {
          resolve(measure);
        }
      });
    });
  }
};
