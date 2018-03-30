const restify = require('restify')
const Logger = require('bunyan');
const bunyanLogger = require('restify-bunyan-logger')
const cacheControl = require('./cacheControl')

const server = restify.createServer({
  name: 'organiz',
  log: Logger.createLogger({
    name: 'organizr.io'
  })
})
server.on('after', bunyanLogger())
server.use(restify.plugins.jsonp())
server.use(restify.plugins.gzipResponse())
server.use(restify.plugins.fullResponse())
server.use(restify.plugins.queryParser({mapParams:true}))
server.use(restify.plugins.bodyParser({mapParams:true}))
server.use(cacheControl)

require('./handleCORS.js')(server)
require('./securitySettings.js')(server)
require('./routes.js')(server)

server.on('uncaughtException', (req, res, route, err) => {
  console.log('uncaughtException', err.stack)
  res.send(500)
})

server.listen(3003, () => {
  console.log('%s listening at %s', server.name, server.url)
})