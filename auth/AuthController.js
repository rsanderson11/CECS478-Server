// Authentication logic
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');
var MessageToken = require('./MessageToken');

/*
    A post to create a new user with the inforamtion given by the user
    Emails are what we use to send and receive messages, so we make sure no two users can have the same email
    Posts information to the server if the user is able to be created successfully.
    Returns a JWT token to be used for sending and receiving messages.
*/
// Creates a new user with hashed password
router.post('/register', function(req, res) {
    // Check the email before creating a new user
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        return res.status(500).send("Error on the server.");
      }
      // If the email isn't found under any users, then create the new user
      if (!user) {
        // Hashes the given password to store in the database
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        User.create({
          name : req.body.name,
          email : req.body.email,
          password : hashedPassword
        },
        function (err, user) {
          if (err) {
            return res.status(500).send("There was a problem registering the user.");
          }

          // If user is registered without errors
          // Create a JWT token
          var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });

          // Create a message token for the specific session to be used for message send/receive
          MessageToken.create({email: req.body.email, token: token});
          res.status(200).send({auth: true, token: token});
        });
      }
      // If the user was found with the same email, return an error
      else {
        return res.status(404).send("User found with same email.");
      }
    });
});


/*
    A login post to the server to verify if the given information by the user is
    valid by accessing the database.
    Searches through the database for the given email and compares the hashed password
    in the database to a hash of the password that was just given to log in.
    Returns a valid JWT token to be used for sending and receiving messaages.
*/
router.post('/login', function(req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      return res.status(500).send('Error on the server.');
    }
    if (!user) {
      return res.status(404).send('No user found.');
    }

    // Check if password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({auth: false, token: null});
    }

    // if user is found and password is valid
    // create token
    var token = jwt.sign({id: user._id}, config.secret, {
      expiresIn: 86400 //expires in 24 hours
    });

    // Creates a message token to be used for message sending/receiving
    MessageToken.create({email: req.body.email, token: token});

    // return the information including token as JSON
    res.status(200).send({auth: true, token: token});
  });
});


// Gets user id based on the token we got back from the register endpoint
router.get('/me', VerifyToken, function(req, res, next) {
  // Find a User with the matching id being passed in
  User.findById(req.userId, {password: 0}, function (err, user) {
    if (err) {
      return res.status(500).send("There was a problem finding the user.");
    }
    if (!user) {
      return res.status(404).send("No user found.");
    }
    res.status(200).send(user);
  });
});

// Sends an output of false Authentication
router.get('/logout', function(req, res) {
  res.status(200).send({auth: false, token: null});
});


// middleware function
router.use(function (user, req, res, next) {
  res.status(200).send(user);
});


module.exports = router;
