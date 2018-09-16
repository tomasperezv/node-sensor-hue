require('dotenv').config();

const { google } = require('googleapis');

const fitness = google.fitness('v1');
const { OAuth2 } = google.auth;

const DATA_SOURCE_ID = 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm';

const fetchGoogleFitness = function (callback) {
  const localOauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  localOauth2Client.setCredentials({
    access_token: process.env.GOOGLE_TOKEN
  });

  const endTime = `${new Date().getTime()}000000`;

  fitness.users.dataSources.datasets.get({
    userId: 'me',
    dataSourceId: DATA_SOURCE_ID,
    datasetId: `0-${endTime}`,
    auth: localOauth2Client
  }, callback);
};

module.exports = {
  get: () => {
    return new Promise((resolve, reject) => {
      fetchGoogleFitness((err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.data.point);
        }
      });
    });
  }
};
