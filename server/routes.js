const eventAPI = require('./EventAPI');
const eventIdRegex = '/:id(^[a-z0-9]{24}$)';

const sendResult = (res, next) => {
  return (data) => {
    res.json(data);
    next();
  };
};

const createEvent = (req, res, next) => {
  eventAPI.createNew(req.user.email, sendResult(res,next));
};

const participate = (req, res, next) => {
  eventAPI.participate(req.params[0], req.user.email, sendResult(res,next));
};

const listUserEvents = (req, res, next) => {
  eventAPI.findByUser(req.user.email, sendResult(res,next));
};

const mutateEvent = (req, res, next) => {
  eventAPI.mutateEvent(req.user.email, req.params.idEvent, req.params.action, req.body, sendResult(res,next));
};

const deleteEvent = (req, res, next) => {
  eventAPI.deleteEvent(req.params[0], req.user.email, sendResult(res,next));
};

module.exports = (app) => {
  app.post('/', createEvent);
  app.get('/listMyEvents', listUserEvents);
  app.get(eventIdRegex, participate);
  app.del(eventIdRegex, deleteEvent);
  app.post('/:idEvent/:action', mutateEvent);
};