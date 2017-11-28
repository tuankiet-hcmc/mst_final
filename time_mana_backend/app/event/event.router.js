const jwt = require('jsonwebtoken');
var eventController = require('./event.controller');
const User = require('../user/user.model');
const config = require('../../config/database');

module.exports = function(router) {
  router
    .route('/')
    .post(eventController.postEvent)
    .get(eventController.getEvents);
  router
    .route('/:id')
    .get(eventController.getEventById)
    .put(eventController.editEvent)
    .delete(eventController.deleteEvent);

  return router;
};
