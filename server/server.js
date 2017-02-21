const restify = require('restify')

const server = restify.createServer()

server.pre(restify.CORS())
server.use(restify.jsonp())
server.use(restify.gzipResponse())
server.use(restify.fullResponse())
server.use(restify.queryParser())
server.use(restify.bodyParser())

require('./routes.js')(server)

server.listen(3003, () => {
  console.log('%s listening at %s', server.name, server.url)
})