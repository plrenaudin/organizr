const corsMiddleware = require('restify-cors-middleware');

module.exports= (server) => {

  const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['http://localhost:8080'],// add production server address
    allowHeaders: ['API-Token','authorization'],
    exposeHeaders: ['API-Token-Expiry', 'Access-Control-Allow-Headers']
  });

  server.pre(cors.preflight);
  server.use(cors.actual);
};