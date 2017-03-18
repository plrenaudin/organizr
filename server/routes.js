const eventAPI = require('./EventAPI')
const jwt = require('jsonwebtoken')
const secrets = require('./.secrets')

const createEvent = (req, res, next) => {
  eventAPI.createNew(req.user.email, (err, data) => {
    if(err) {
      return next(err)
    }
    res.json(data)
    next()
  })
}

const participate = (req, res, next) => {
  eventAPI.participate(req.params[0], req.user.email, (err, data) => {
    if(err) {
      return next(err)
    }
    res.json(data)
    next()
  })
}

const listUserEvents = (req, res, next) => {
  eventAPI.findByUser(req.user.email, (err, data) => {
    if(err) {
      return next(err)
    }
    res.json(data)
    next()
  })
}

const mutateEvent = (req, res, next) => {
  eventAPI.mutateEvent(req.user.email, req.params.idEvent, req.params.action, req.body, (err, data) => {
    if(err) {
      return next(err)
    }
    res.json(data)
    next()
  })
}

const deleteEvent = (req, res, next) => {
  eventAPI.deleteEvent(req.params[0], req.user.email, (err, data) => {
    if(err) {
      return next(err)
    }
    res.json(data)
    next()
  })
}

const eventIdRegex = /([a-z0-9]{24})/

module.exports = function (app) {
  app.post('/', createEvent)
  app.get('/listMyEvents', listUserEvents)
  app.get(eventIdRegex, participate)
  app.del(eventIdRegex, deleteEvent)
  app.post('/:idEvent/:action', mutateEvent)
}