const eventAPI = require('./EventAPI')
const jwt = require('jsonwebtoken')
const secrets = require('./.secrets')

const createEvent = (req, res, next) => {
  eventAPI.createNew(req.user.email, (data) => {
    res.json(data)
    next()
  })
}

const getEventById = (req, res, next) => {
  eventAPI.findById(req.params[0], (data) => {
    res.json(data)
    next()
  })
}

const listUserEvents = (req, res, next) => {
  eventAPI.findByAdmin(req.user.email, (data) => {
    res.json(data)
    next()
  })
}

const mutateEvent = (req, res, next) => {
  eventAPI.mutateEvent(req.user.email, req.params.idEvent, req.params.action, req.body, (data) => {
    res.json(data)
    next()
  })
}

const eventIdRegex = /([a-z0-9]{24})/

module.exports = function (app) {
  app.post('/', createEvent)
  app.get('/listMyEvents', listUserEvents)
  app.get(eventIdRegex, getEventById)
  app.post('/:idEvent/:action', mutateEvent)
}