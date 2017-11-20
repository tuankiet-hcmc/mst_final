const User = require('../user/user.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/database');

/* ==============
     Signup Route
  ============== */
exports.signup = function(req, res) {
  // Check if name was provided
  if (!req.body.name) {
    res.json({
      success: false,
      message: 'You must provide a name'
    }); // Return error
  } else {
    // Check if email was provided
    if (!req.body.email) {
      res.json({
        success: false,
        message: 'You must provide a email'
      }); // Return error
    } else {
      // Check if password was provided
      if (!req.body.password) {
        res.json({
          success: false,
          message: 'You must provide a password'
        }); // Return error
      } else {
        // Create new user object and apply user input
        let user = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        // Save user to database
        user.save(err => {
          // Check if error occured
          if (err) {
            // Check if error is an error indicating duplicate account
            if (err.code === 11000) {
              res.json({
                success: false,
                message: 'e-mail already exists'
              }); // Return error
            } else {
              // Check if error is a validation rror
              if (err.errors) {
                // Check if validation error is in the email field
                if (err.errors.name) {
                  res.json({
                    success: false,
                    message: err.errors.name.message
                  }); // Return error
                } else {
                  // Check if validation error is in the username field
                  if (err.errors.email) {
                    res.json({
                      success: false,
                      message: err.errors.email.message
                    }); // Return error
                  } else {
                    // Check if validation error is in the password field
                    if (err.errors.password) {
                      res.json({
                        success: false,
                        message: err.errors.password.message
                      }); // Return error
                    } else {
                      res.json({
                        success: false,
                        message: err
                      }); // Return any other error not already covered
                    }
                  }
                }
              } else {
                res.json({
                  success: false,
                  message: 'Could not save user. Error: ',
                  err
                }); // Return error if not related to validation
              }
            }
          } else {
            res.json({
              success: true,
              message: 'Acount registered!'
            }); // Return success
          }
        });
      }
    }
  }
};

/* ==============
     Signin Route
  ============== */
exports.signin = function(req, res) {
  // Check if username was provided
  if (!req.body.email) {
    res.json({
      success: false,
      message: 'No email was provided'
    }); // Return error
  } else {
    // Check if password was provided
    if (!req.body.password) {
      res.json({
        success: false,
        message: 'No password was provided.'
      }); // Return error
    } else {
      // Check if username exists in database
      User.findOne(
        {
          email: req.body.email.toLowerCase()
        },
        (err, user) => {
          // Check if error was found
          if (err) {
            res.json({
              success: false,
              message: err
            }); // Return error
          } else {
            // Check if email was found
            if (!user) {
              res.json({
                success: false,
                message: 'Email or password invalid'
              }); // Return error
            } else {
              // Make sure the password is correct
              user.verifyPassword(req.body.password, function(err, isMatch) {
                if (err) {
                  res.status(401);
                } else if (!isMatch) {
                  // Password did not match
                  res.json({
                    success: false,
                    message: 'Email or password invalid'
                  });
                } else {
                  const token = jwt.sign(
                    {
                      userId: user._id
                    },
                    config.secret,
                    {
                      expiresIn: '24h'
                    }
                  ); // Create a token for client
                  res.json({
                    success: true,
                    message: 'Success!',
                    token: token,
                    user: {
                      email: user.email
                    }
                  });
                }
              });
            }
          }
        }
      );
    }
  }
};

