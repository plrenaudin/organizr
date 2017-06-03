module.exports= (server, restify) => {

  restify.CORS.ALLOW_HEADERS.push('authorization')

  server.pre((req, res, next) => {
    req.headers.accept = 'application/json'
    return next()
  })

  server.on("MethodNotAllowed", (req, res) => {
    if (req.method.toUpperCase() === "OPTIONS") {
      // Send the CORS headers
      res.header("Access-Control-Allow-Headers", restify.CORS.ALLOW_HEADERS.join(", "))
      res.send(204)
    }
    else {
      res.send(new restify.MethodNotAllowedError())
    }
  })
}