var mongoose = require('mongoose');

// Structure for the MessageToken object
var MessageTokenSchema = new mongoose.Schema({
  email: String,
  token: String
});

mongoose.model('MessageToken', MessageTokenSchema);

module.exports = mongoose.model('MessageToken');
