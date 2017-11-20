const jwt = require('jsonwebtoken');
var eventController = require('./event.controller');
const User = require('../user/user.model');
const config = require('../../config/database');

module.exports = function(router) {
  router
    .route('/')
    .post(eventController.postEvent)
    .get(eventController.getEvent);

  return router;
};
