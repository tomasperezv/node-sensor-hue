/* eslint-disable no-console */
const { google } = require('googleapis');

const fitness = google.fitness('v1');
const { OAuth2 } = google.auth;

/**
 * @type {Array} dataSourceIds
 */
const dataSourceIds = [
  'derived:com.google.weight:com.google.android.gms:merge_weight',
  'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm',
  'derived:com.google.step_count.delta:com.google.android.gms:merge_step_deltas',
  'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended',
  'derived:com.google.activity.segment:com.google.android.gms:merge_activity_segments',
  'derived:com.google.speed:com.google.android.gms:merge_speed'
];

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

  const currentDate = new Date();
  const datasetId = `0-${currentDate.getTime()}000000`;

  const result = [];
  let pending = dataSourceIds.length;
  dataSourceIds.forEach(id => {
    fitness.users.dataSources.datasets.get({
      userId: 'me',
      dataSourceId: id,
      datasetId,
      auth: localOauth2Client
    }, (err, response) => {
      pending--;
      if (!err && response.data.point) {
        const size = response.data.point.length;
        result.push(response.data.point[size - 1]);
      }

      if (pending === 0) {
        callback(null, result);
      }
    });
  });
};

module.exports = {
  get: () => {
    return new Promise((resolve, reject) => {
      fetchGoogleFitness((err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }
};
