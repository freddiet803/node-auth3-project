const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  //console.log(token);

  if (req.decodedJwt) {
    next();
  } else if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedJwt) => {
      if (err) {
        res.status(401).json({ message: 'token invalid', error: err });
      } else {
        req.decodedJwt = decodedJwt;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'no token set' });
  }
};
