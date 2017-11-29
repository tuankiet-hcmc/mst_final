var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var eventSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: [
      function(name) {
        return name.length >= 5 && name.length <= 30;
      },
      'Name must be between 5 and 30 characters'
    ],
    match: [
      /^([^-!$%^&*()_+|~=`{}[\]:/;<>?,.@#]{1,})$/,
      'Name only letter or number are allowed'
    ]
  },
  description: {
    type: String,
    required: true,
    validate: [
      function(description) {
        return description.length >= 5 && description.length <= 30;
      },
      'Description must be between 5 and 30 characters'
    ]
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    validate: [
      function(location) {
        return location.length >= 5 && location.length <= 30;
      },
      'Location must be between 5 and 30 characters'
    ]
  },
  color: {
    type: String,
    required: true
  },
  createdBy: { type: String, required: true },
  createdAt: { type: String, required: true }
});

module.exports = mongoose.model('Event', eventSchema);
