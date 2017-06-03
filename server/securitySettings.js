const jwt = require('restify-jwt')
const secret = require('./.secrets')

module.exports = (server) => {
  server.use(jwt({ secret: secret.pk }))

  server.use((req, res, next) => {
    if (!!req.user) {
      next()
    } else {
      res.send(401)
    }
  })
}