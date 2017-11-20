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
  date: {
    type: String,
    required: true,
    match: [
      /^(19|20)\d{2}\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])$/,
      'Date only allow format yyyy-mm-dd'
    ]
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
  priority: {
    type: String,
    required: true,
    validate: [
      function(priority) {
        return priority === 'Important' || priority === 'Unimportant';
      },
      "Priority must be 'Important' or 'Unimportant'"
    ]
  },
  createdBy: { type: String, required: true },
  createdAt: { type: String, required: true }
});

module.exports = mongoose.model('Event', eventSchema);
