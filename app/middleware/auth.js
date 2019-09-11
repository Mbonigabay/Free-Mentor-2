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
        res.status(401).json({
          status: 401,
          error: 'invalid token'
        })
      } else {
        const authData = data;
      }
    });
    next();
  }
};

export default auth;