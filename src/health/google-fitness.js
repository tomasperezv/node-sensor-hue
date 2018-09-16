/* eslint-disable no-console */
require('dotenv').config();

const { google } = require('googleapis');

const fitness = google.fitness('v1');
const { OAuth2 } = google.auth;

const DATA_SOURCE_ID = 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm';
let refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

const fetchGoogleFitness = function (callback) {
  const localOauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  localOauth2Client.setCredentials({
    refresh_token: refreshToken
  });

  localOauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      refreshToken = tokens.refresh_token;
      console.log(`New refresh token ${tokens.refresh_token}`);
    } else {
      console.log(tokens);
    }
  });

  const startDate = new Date();
  const currentDate = new Date();
  startDate.setHours(startDate.getHours() > 0 ? startDate.getHours() - 3 : 23);

  const datasetId = `${startDate.getTime()}000000-${currentDate.getTime()}000000`;

  fitness.users.dataSources.datasets.get({
    userId: 'me',
    dataSourceId: DATA_SOURCE_ID,
    datasetId,
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
