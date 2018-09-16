require('dotenv').config();

const http = require('http');
const urlParser = require('url');

const { google } = require('googleapis');

const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_OAUTH_REDIRECT_URL
);

const SCOPES = [
  'https://www.googleapis.com/auth/fitness.activity.read',
  'https://www.googleapis.com/auth/fitness.body.read',
  'https://www.googleapis.com/auth/fitness.reproductive_health.read',
  'https://www.googleapis.com/auth/fitness.blood_pressure.read'
];

http.createServer((request, response) => {
  let body = '';
  request.on('data', (chunk) => {
    body += chunk;
  });

  const parsedUrl = urlParser.parse(request.url, true);
  const { code } = parsedUrl.query;

  console.log(`Obtained OAUTH code ${code}`); // eslint-disable-line no-console

  oauth2Client.getToken(code, (err, tokenData) => {
    if (err) {
      console.log(err); // eslint-disable-line no-console
    } else {
      console.log(`Token is ${JSON.stringify(tokenData)}`); // eslint-disable-line no-console
    }
  });

  request.on('end', () => {
    console.log(body); // eslint-disable-line
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ request: body }));
    response.end();
  });
}).listen(8001, '0.0.0.0');

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent'
});

console.log(url); // eslint-disable-line no-console
