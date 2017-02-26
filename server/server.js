const restify = require('restify')
const jwt = require('restify-jwt')
const secret = require('./.secrets')

const server = restify.createServer()

restify.CORS.ALLOW_HEADERS.push('authorization')

server.pre(restify.CORS())
server.use(restify.jsonp())
server.use(restify.gzipResponse())
server.use(restify.fullResponse())
server.use(restify.queryParser())
server.use(restify.bodyParser())

server.use(jwt({ secret: secret.pk }))

server.use(function(req, res, next) {
  if(!!req.user) {
    next()
  } else {
    res.send(401)
  }
})

require('./routes.js')(server)

server.pre(function(req, res, next) {
  req.headers.accept = 'application/json'  // screw you client!
  return next()
})

server.on( "MethodNotAllowed", function(req, res) {
  if(req.method.toUpperCase() === "OPTIONS" ) {
    // Send the CORS headers
    res.header("Access-Control-Allow-Headers", restify.CORS.ALLOW_HEADERS.join( ", " ))
    res.send(204)
  }
  else {
    res.send(new restify.MethodNotAllowedError())
  }
})

server.on('uncaughtException', function (req, res, route, err) {
    console.log('uncaughtException', err.stack)
    res.send(500)
})

server.listen(3003, () => {
  console.log('%s listening at %s', server.name, server.url)
})