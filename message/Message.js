var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  sender: String, //VerifyToken,
  //recipient: VerifyToken,
  content: String
});

mongoose.model('Message', MessageSchema);

module.exports = mongoose.model('Message');
