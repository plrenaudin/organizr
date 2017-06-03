const restify = require('restify')
const Logger = require('bunyan')

const log = new Logger.createLogger({ name: 'organiz', serializers: { req: Logger.stdSerializers.req } })

const server = restify.createServer({ name: 'organiz', log: log })

server.use(restify.requestLogger())
server.pre((request, response, next) => {
  if (request.method !== 'OPTIONS') {
    request.log.info({ req: request }, 'REQUEST')
  }
  next()
})

server.pre(restify.CORS())
server.use(restify.jsonp())
server.use(restify.gzipResponse())
server.use(restify.fullResponse())
server.use(restify.queryParser())
server.use(restify.bodyParser())

require('./securitySettings.js')(server)
require('./routes.js')(server)
require('./handleCORS.js')(server, restify)

server.on('uncaughtException', (req, res, route, err) => {
  console.log('uncaughtException', err.stack)
  res.send(500)
})

server.listen(3003, () => {
  console.log('%s listening at %s', server.name, server.url)
})