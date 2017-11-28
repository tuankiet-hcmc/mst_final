/* ===================
   Import Node Modules
=================== */
var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  cors = require('cors');

var Session = require('express-session');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var plus = google.plus('v1');
const ClientId =
  '1094410782007-decvuprrla35gfao1va4f0k1d2j47jio.apps.googleusercontent.com';
const ClientSecret = 'DqfNgyIu3-ca53Mt7T4DHt9x';
const RedirectionUrl = 'http://localhost:4200/register';

var app = express();
var router = express.Router();
var auth = require('./auth/auth.router')(router);
var events = require('./event/event.router')(router);
/**
 * Connect DB
 */
const configDB = require('../config/database.js');
mongoose.Promise = global.Promise;
mongoose.connect(
  configDB.uri,
  {
    useMongoClient: true
  },
  err => {
    // Check if database was able to connect
    if (err) {
      console.log('Could NOT connect to database: ', err); // Return error message
    } else {
      console.log('Connected to ' + configDB.db); // Return success message
    }
  }
);
//using session in express
app.use(Session({
    secret: 'your-random-secret-19890913007',
    resave: true,
    saveUninitialized: true
}));
// Middleware
//app.use(cors({ origin: 'http://localhost:4200' })); // Allows cross origin in development only
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization'
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

//router
app.use('/auth', auth);
app.use('/events', events);

module.exports = app;
