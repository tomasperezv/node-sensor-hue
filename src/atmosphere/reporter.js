const Netatmo = require('netatmo');

const client = new Netatmo({
  client_id: process.env.NETATMO_CLIENT_ID,
  client_secret: process.env.NETATMO_CLIENT_SECRET,
  username: process.env.NETATMO_USERNAME,
  password: process.env.NETATMO_PASSWORD
});

const appendValue = (result, device) => {
  const data = device.dashboard_data;
  if (typeof data !== 'undefined') {
    data.id = device._id.split(':')[0]; // eslint-disable-line
    result.push(data);
  }
};

module.exports = {
  get: () => {
    return new Promise((resolve) => {
      client.getStationsData((err, devices) => {
        const result = [];

        appendValue(result, devices[0]);
        devices[0].modules.forEach((device) => {
          appendValue(result, device);
        });

        resolve(result);
      });
    });
  }
};
