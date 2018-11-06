var express = require('express');
var app = express();
var db = require('./db');

var UserController = require('./user/UserController');
app.use('/api/users', UserController);

var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

var MessageController = require('./message/MessageController');
app.use('/api/mess', MessageController);

module.exports = app;
