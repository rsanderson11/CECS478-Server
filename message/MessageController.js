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


// create a message
// VerifyToken is used to verify whether you are able to send a message or not
// router.post('/send', VerifyToken, function (req, res, next) {
//   MessageToken.findOne({token: req.headers['x-access-token']}, (err, user) => {
//     let sender = user.email;
//
//     Message.create({
//       sender: req.body.sender,
//       recipient: req.body.recipient,
//       content: req.body.content
//     },
//     function(err) {
//       if (err) {
//         return res.status(500).send("There was a problem adding the message to the database.");
//       }
//       res.status(200).send(message);
//     });
//   });
// };


router.post('/send', VerifyToken, function(req, res, next) {

    MessageToken.findOne({token: req.headers['x-access-token']}, (err, user) => {
        if(!req.body.message) res.status(400).send("No message input detected");
        if(!req.body.reciever) res.status(400).send("No reciever input detected");

        let sender = user.email;

        Message.create({
            sender: sender,
            recipient: req.body.recipient,
            content: req.body.content
        },
        function(err){
            if(err) res.status(500).send("Error sending the message");
        });
        res.status(200).send(sender + ": " + req.body.message);
    });
});

//   Message.create({
//     sender: req.body.sender,
//     recipient: req.body.recipient,
//     content: req.body.content
//   },
//   function (err, message) {
//     if(err) {
//       return res.status(500).send("There was a problem adding the message to the datatbase.");
//     }
//     res.status(200).send(message);
//   });
// });








// Get a message
// router.get('/receive', VerifyToken, function(req, res, next) {
//   MessageToken.findOne({token: req.headers['x-access-token']}, (err, user) => {
//     if (err) {
//       res.status(500).send("There was a problem finding the token.");
//     }
//     let recipient = user.email;
//
//     Message.find({recipient: recipient}, (err, message) => {
//       if (err) {
//         res.status(500).send("There was a problem finding the message.");
//       }
//       res.status(200).send(message);
//     });
//     Message.find({recipient: recipient}).remove().exec();
//   });
// });


router.get('/receive', VerifyToken, function(req, res) {

    MessageToken.findOne({token: req.headers['x-access-token']}, (err , user) => {
        if(err) res.status(500).send("Internal server error");

        let reciever = user.email;

        Message.find({reciever: reciever}, (err, messages) => {
            if(err) res.status(500).send("Internal server error");

            res.status(200).send(messages);
        });
        Message.find({reciever: reciever}).remove().exec();

    });
});
























module.exports = router;
