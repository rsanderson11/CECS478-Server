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
var MessageToken = require('../auth/MessageToken');

/*
   Create a message and post to the server
   VerifyToken is used to verify whether you are able to send a message or not
   Send message requires a valid user (verified by VerifyToken), a valid user to send to, and a message to send
*/
router.post('/send', VerifyToken, function(req, res, next) {
  // Searches through message tokens to find the user associated with the jwt token created at login/register
  MessageToken.findOne({token: req.headers['x-access-token']}, (err, user) => {
    // Creates a message object
    Message.create({
      sender: user.email,
      recipient: req.body.recipient,
      content: req.body.content
    },
    // Error callback function in case of an error along the way
    function(err) {
      if (err) {
        res.status(500).send("Error sending the message.");
      }
    });
    // Sends message content to the server/database
    res.status(200).send(req.body.content);
  });
});


/*
   Get a message
   VerifyToken is used to verify whether you are able to receive a message or not
   Receive message requires a valid user to be logged in (verified by VerifyToken)
*/
router.get('/receive', VerifyToken, function(req, res) {
  // Searches through message tokens contianing the JWT matching the user that's logged in
  // Either calls an error function or goes through with the user
  MessageToken.findOne({token: req.headers['x-access-token']}, (err, user) => {
    if (err) {
      res.status(500).send("There was a problem finding the token.");
    }
    // Searches for messages (if any) with the matching email of the logged in user
    Message.find({recipient: user.email}, (err, message) => {
      if (err) {
        res.status(500).send("There was a problem finding the message.");
      }
      // The server sends the message from the database to the user's client
      res.status(200).send(message);
    });
    // Deletes messages from the database after it is viewed by the user
    Message.find({recipient: user.email}).remove().exec();
  });
});


module.exports = router;
