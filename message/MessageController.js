var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var VerifyToken = require('../auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');
var Message = require('./Message');


// create a message
router.post('/send', function (req, res) {
  Message.create({
    sender: req.body.sender,
    content: req.body.content
  },
  function (err, user) {
    if(err) {
      return res.status(500).send("There was a problem adding the message to the datatbase.");
    }
    res.status(200).send(user);
  });
});


// Get a message
router.get('/receive', function(req, res) {
  Message.find({}, function (err, messages) {
    if (err) {
      return res.status(500).send("There was a problem finding the messages.");
    }
    res.status(200).send(messages);
  });
});


module.exports = router;
