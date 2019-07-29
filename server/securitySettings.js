const request = require('request');
const jwt = require('jsonwebtoken');
const restifyJwt = require('restify-jwt-community');
const env = require('./.env');
const passwordless = require('passwordless');
const MongoStore = require('passwordless-mongostore');
const email = require('emailjs');
const mongoUri = process.env.MONGODB_URI;
const storeUri = mongoUri.substring(0, mongoUri.lastIndexOf('/') + 1) + 'passwordless';

const smtpServer = email.server.connect({
  user: env.SMTP_USER,
  password: env.SMTP_PASS,
  host: env.SMTP_HOST,
  ssl: true
});

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

passwordless.init(new MongoStore(storeUri));
passwordless.addDelivery((tokenToSend, uidToSend, recipient, callback) => {
  if(!validateEmail(recipient)) {
    callback(`invalid email: ${recipient}`);
    return;
  }
  smtpServer.send({
    text: `Welcome to Organizr!

Here is your magic link: ${env.SERVER_URL}/api/auth/passwordless?token=${tokenToSend}&uid=${encodeURIComponent(uidToSend)}

This link is valid only once!`,
    from: `Organizr <${env.SMTP_USER}>`,
    to: recipient,
    subject: 'Your magic link'
  }, function (err) {
    if (err) {
      console.log(err);
    }
    callback(err);
  });
});
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

  server.get('/api/auth/passwordless', passwordless.acceptToken(), (req, res, next) => {
    if (req.user) {
      let payload = createJwt({
        email: req.user,
        exp: Math.floor(new Date().getTime() / 1000) + 3600
      });
      res.redirect(env.FRONT_URL + '/profile?token=' + payload, next);
    } else {
      res.redirect(env.FRONT_URL, next);
    }
  });

  server.post('/api/sendToken', passwordless.requestToken((user, delivery, callback) => callback(null, user)),
    (req, res) => { res.json('{sent:true}'); }
  );

  server.use(restifyJwt({ secret: env.pk }).unless({ path: ['/api/auth'] }));
};