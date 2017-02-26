const restify = require('restify')
const jwt = require('restify-jwt')
const secret = require('./.secrets')

const server = restify.createServer()

restify.CORS.ALLOW_HEADERS.push('authorization');

server.pre(restify.CORS())
server.use(restify.jsonp())
server.use(restify.gzipResponse())
server.use(restify.fullResponse())
server.use(restify.queryParser())
server.use(restify.bodyParser())

server.use(jwt({ secret: secret.pk }))

require('./routes.js')(server)

server.on('uncaughtException', function (req, res, route, err) {
    console.log('uncaughtException', err.stack);
    res.send(500)
});

server.listen(3003, () => {
  console.log('%s listening at %s', server.name, server.url)
})