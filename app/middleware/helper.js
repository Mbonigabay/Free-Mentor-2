const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const helper = {

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  generateToken(email, password) {
    const token = jwt.sign({
      email,
      password
    }, 'newUser', {
      expiresIn: '7d'
    });
    return token;
  },

  verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }
}
module.exports = helper;