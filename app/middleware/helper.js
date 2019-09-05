const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const helper = {

  /**
   * For hashing user's password
   * @param {String} password - user's password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  },

  /**
   * For Comparing user's password to hashed user's password
   * @param {String} hashPassword - user's hashed password
   * @param {String} password - user's password
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  /**
   * For checking if email is valid
   * @param {String} email - user's email
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  /**
   * For Generating Token
   * @param {String} email - user's email
   * @param {String} password - user's password
   */
  generateToken(email, password) {
    const token = jwt.sign({
      email,
      password
    }, process.env.JWT_KEY, {
      expiresIn: '7d'
    });
    return token;
  },

  /**
   * For verifying user's Token
   * @param  req 
   * @param  res 
   * @param  next 
   */
  verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];
    try {
      if (typeof bearerHeader !== 'undefined') {

        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
  
        next();
      } else {
        res.sendStatus(403);
      }
    } catch (error) {
      const result = this.failure('no token detected', 400);
      res.status(400).json(result);
    }
    
  },

  failure(error, status) {
    const response = {
      status,
      error,
    }
    return response;
  },

  success(message, status, data) {
    const response = {
      status,
      message,
      data,
    }
    return response;
  },

}
module.exports = helper;