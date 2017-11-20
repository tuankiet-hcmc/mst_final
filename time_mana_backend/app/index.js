/* ===================
   Import Node Modules
=================== */
var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  cors = require('cors');

var app = express();
var router = express.Router();
var authentication = require('./authentication/auth.router')(router);
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

// Middleware
app.use(cors({ origin: 'http://localhost:4200' })); // Allows cross origin in development only
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

//router
app.use('/authentication', authentication);

module.exports = app;
