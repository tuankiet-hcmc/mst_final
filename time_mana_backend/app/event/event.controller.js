const User = require('../user/user.model');
const Event = require('./event.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/database');

/* ==============
     Post event
  ============== */
exports.postEvent = function(req, res) {
  console.log(req.body);
  if (!req.body.title) {
    res.json({ success: false, message: 'Event name is required.' });
  } else {
    if (!req.body.description) {
      res.json({
        success: false,
        message: 'Event description is required.'
      });
    } else {
      if (!req.body.start) {
        res.json({
          success: false,
          message: 'Event date is required.'
        });
      } else {
        if (!req.body.location) {
          res.json({
            success: false,
            message: 'Event location is required.'
          });
        } else {
          if (!req.body.color) {
            res.json({
              success: false,
              message: 'Event color is required.'
            });
          } else {
            User.findOne({ _id: req.decoded.userId }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: err }); // Return error
              } else {
                // Check if username was found in database
                if (!user) {
                  res.json({
                    success: false,
                    message: 'Unable to authenticate user'
                  }); // Return error message
                } else {
                  console.log(req.body);
                  const event = new Event({
                    title: req.body.title,
                    description: req.body.description,
                    location: req.body.location,
                    start: new Date(req.body.start),
                    end: req.body.end,
                    color: req.body.color,
                    createdBy: user.email,
                    createdAt: new Date(Date.now()).toLocaleString() // CreatedBy field
                  });
                  // Save event into database
                  event.save(err => {
                    // Check if error
                    if (err) {
                      // Check if error is a validation error
                      if (err.errors) {
                        // Check if validation error is in the name field
                        if (err.errors.name) {
                          res.json({
                            success: false,
                            message: err.errors.name.message
                          }); // Return error message
                        } else {
                          // Check if validation error is in the description field
                          if (err.errors.description) {
                            res.json({
                              success: false,
                              message: err.errors.description.message
                            }); // Return error message
                          } else {
                            if (err.errors.date) {
                              res.json({
                                success: false,
                                message: err.errors.date.message
                              }); // Return error message
                            } else {
                              if (err.errors.location) {
                                res.json({
                                  success: false,
                                  message: err.errors.location.message
                                }); // Return error message
                              } else {
                                if (err.errors.priority) {
                                  res.json({
                                    success: false,
                                    message: err.errors.priority.message
                                  }); // Return error message
                                } else {
                                  res.json({
                                    success: false,
                                    message: err.errors
                                  }); // Return general error message
                                }
                              }
                            }
                          }
                        }
                      } else {
                        res.json({
                          success: false,
                          message: err
                        }); // Return general error message
                      }
                    } else {
                      res.json({
                        success: true,
                        message: 'Event saved!'
                      }); // Return success message
                    }
                  });
                }
              }
            });
          }
        }
      }
    }
  }
};

/* ==============
     Get list event
  ============== */
exports.getEvents = function(req, res) {
  var pageOptions = {
    page: Number(req.query.page) || 0,
    limit: Number(req.query.limit) || 10
  };
  if (req.query.name) {
    var name = req.query.name;
    User.findOne({ _id: req.decoded.userId }, (err, user) => {
      // Check if error was found
      if (err) {
        res.json({ success: false, message: err }); // Return error
      } else {
        Event.ensureIndexes({ name: 'text' });
        Event.findOne({ createdBy: user.email, name: name }, function(
          err,
          event
        ) {
          // Check if error was found or not
          if (err) {
            res.json({
              success: false,
              message: err
            }); // Return error message
          } else {
            if (!event) {
              Event.find(
                {
                  createdBy: user.email,
                  name: { $regex: name }
                },
                function(err, event2) {
                  if (err) {
                    res.json({
                      success: false,
                      message: 'No event found.'
                    });
                  } else {
                    console.log(event2);
                    res.json({
                      success: true,
                      events: event2
                    });
                  }
                }
              )
                .skip(pageOptions.page * pageOptions.limit)
                .limit(pageOptions.limit);
            } else {
              res.json({ success: true, events: event });
            }
          }
        })
          .skip(pageOptions.page * pageOptions.limit)
          .limit(pageOptions.limit)
          .sort({ date: -1 });
      }
    });
  } else {
    User.findOne({ _id: req.decoded.userId }, (err, user) => {
      // Check if error was found
      if (err) {
        res.json({ success: false, message: err }); // Return error
      } else {
        Event.find({ createdBy: user.email }, (err, events) => {
          // Check if error was found or not
          if (err) {
            res.json({ success: false, message: err }); // Return error message
          } else {
            // Check if blogs were found in database
            if (!events) {
              res.json({ success: false, message: 'No events found.' }); // Return error of no blogs found
            } else {
              res.json({ success: true, events: events }); // Return success and blogs array
            }
          }
        })
          .skip(pageOptions.page * pageOptions.limit)
          .limit(pageOptions.limit)
          .sort({ date: -1 });
      }
    });
  }
};
/* ==============
     Get an event by ID
  ============== */
exports.getEventById = function(req, res) {
  User.findOne({ _id: req.decoded.userId }, (err, user) => {
    // Check if error was found
    if (err) {
      res.json({ success: false, message: err }); // Return error
    } else {
      Event.findOne(
        { createdBy: user.email, _id: req.params.id },
        (err, event) => {
          // Check if error was found or not
          if (err) {
            res.json({
              success: false,
              message: err
            }); // Return error message
          } else {
            // Check if blogs were found in database
            if (!event) {
              res.json({
                success: false,
                message: 'No event found.'
              }); // Return error of no blogs found
            } else {
              res.json({
                success: true,
                events: event
              }); // Return success and blogs array
            }
          }
        }
      ).sort({ date: -1 });
    }
  });
};

/* ==============
     Edit event
  ============== */
exports.editEvent = function(req, res) {
  User.findOne({ _id: req.decoded.userId }, (err, user) => {
    // Check if error was found
    if (err) {
      res.json({ success: false, message: err }); // Return error
    } else {
      var doc = {
        title: req.body.title,
        description: req.body.description,
        start: new Date(req.body.start),
        end: req.body.end,
        location: req.body.location,
        color: req.body.color,
        createdAt: new Date(Date.now()).toLocaleString()
      };
      Event.update(
        { createdBy: user.email, _id: req.params.id },
        doc,
        (err, events) => {
          // Check if error was found or not
          if (err) {
            res.json({
              success: false,
              message: err
            }); // Return error message
          } else {
            // Check if blogs were found in database
            if (!events) {
              res.json({
                success: false,
                message: 'No events found.'
              }); // Return error of no blogs found
            } else {
              res.json({
                success: true,
                message: 'Edit sucessfully'
              }); // Return success and blogs array
            }
          }
        }
      );
    }
  });
};
/* ==============
     delete event
  ============== */
exports.deleteEvent = function(req, res) {
  User.findOne({ _id: req.decoded.userId }, (err, user) => {
    // Check if error was found
    if (err) {
      res.json({ success: false, message: err }); // Return error
    } else {
      Event.remove(
        { createdBy: user.email, _id: req.params.id },
        (err, events) => {
          // Check if error was found or not
          if (err) {
            res.json({
              success: false,
              message: err
            }); // Return error message
          } else {
            // Check if blogs were found in database
            if (!events) {
              res.json({
                success: false,
                message: 'No events found.'
              }); // Return error of no blogs found
            } else {
              res.json({
                success: true,
                message: 'delete sucessfully'
              }); // Return success and blogs array
            }
          }
        }
      );
    }
  });
};
