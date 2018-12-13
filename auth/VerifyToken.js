var jwt = require('jsonwebtoken');
var config = require('../config');

/*
    Verifies whether the users token is valid or not.
*/
function verifyToken(req, res, next) {
  // Passed in jwt token
  var token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  // Attempts to prove if the users token is valid
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'});
    }

    // if everyting good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
