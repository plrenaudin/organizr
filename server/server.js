const restify = require('restify')
const logger = require('restify-bunyan-logger')

const server = restify.createServer({ name: 'organiz' })
server.on('after', logger())
server.use(restify.plugins.jsonp())
server.use(restify.plugins.gzipResponse())
server.use(restify.plugins.fullResponse())
server.use(restify.plugins.queryParser({mapParams:true}))
server.use(restify.plugins.bodyParser({mapParams:true}))

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