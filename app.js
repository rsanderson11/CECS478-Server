var express = require('express');
var app = express();
var db = require('./db');

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var UserController = require('./user/UserController');
app.use('/api/users', UserController);

var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

var MessageController = require('./message/MessageController');
app.use('/api/mess', MessageController);


// app.get('/', function(req, res) {
//   res.render('app/auth');
//   res.render('api/mess');
//   res.render('api/users');
// })



var port = 3000;
app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

module.exports = app;
