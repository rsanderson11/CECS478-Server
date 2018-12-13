var mongoose = require('mongoose');

// General structure of the Message object
var MessageSchema = new mongoose.Schema({
  sender: String, //email
  recipient: String, //email
  content: String
});

mongoose.model('Message', MessageSchema);

module.exports = mongoose.model('Message');
