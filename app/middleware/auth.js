import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  
  if (typeof bearerHeader !== undefined) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, process.env.JWT_KEY, (error, data) => {
      if (error) {
        throw new Error(`Authentication failed ${error}`);
      } else {
        req.userData = data;
      }
    });
    next();
  }
};

export default auth;