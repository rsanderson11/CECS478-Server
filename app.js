var express = require('express');
var app = express();
var db = require('./db');


// Require the different controllers used for operating the application
var UserController = require('./user/UserController');
var AuthController = require('./auth/AuthController');
var MessageController = require('./message/MessageController');


// Activate the controllers with specific base routes
app.get('/', function(req, res) {
  res.send("DuoDolo Messaging");
  app.use('api/auth', AuthController);
  app.use('api/mess', MessageController);
  app.use('api/users', UserController);
});


var port = 3000;
app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

// module.exports = app;
