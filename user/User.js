var mongoose = require('mongoose');

// Structure for the User object
// Consists of an email, a user name, and a password (hashed)
var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
