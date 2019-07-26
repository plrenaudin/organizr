const request = require('request');
const jwt = require('jsonwebtoken');
const restifyJwt = require('restify-jwt-community');
const env = require('./.env');

let providers = {
  facebook: { url: 'https://graph.facebook.com/me' },
  google: { url: 'https://www.googleapis.com/oauth2/v3/tokeninfo' }
};

const createJwt = profile => {
  let payload = JSON.parse(JSON.stringify(profile));
  payload.exp = Number(payload.exp);
  return jwt.sign(payload, env.pk, { issuer: 'Organizr' });
};

const validateWithProvider = (network, socialToken) =>
  new Promise((resolve, reject) => {
    // Send a GET request to Facebook with the token as query string
    request({
      url: providers[network].url,
      qs: { access_token: socialToken }
    },
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
      } else {
        reject(error);
      }
    }
    );
  });

module.exports = server => {

  server.post('/api/auth', (req, res) => {
    let { network, socialToken } = req.body;

    validateWithProvider(network, socialToken).then(profile => {
      res.send(createJwt(profile));
    }).catch(function (err) {
      res.send('Failed!' + err);
    });
  });

  server.use(restifyJwt({ secret: env.pk }).unless({ path: ['/api/auth'] }));
};