const eventAPI = require('./EventAPI')

const createEvent = (req, res, next) => {
  eventAPI.createNew(req.body.user, (data) => {
    res.json(data)
    next()
  })
}

const getEventById = (req, res, next) => {
  eventAPI.findById(req.params.eventId, (data) => {
    res.json(data)
    next()
  })
}

const mutateEvent = (req, res, next) => {
  eventAPI.mutateEvent(req.params.eventId, req.params.action, req.body, (data) => {
    res.json(data)
    next()
  })
}

module.exports = function (app) {
  app.post('/', createEvent)
  app.get('/:eventId', getEventById)
  app.patch('/:eventId/:action', mutateEvent)
}