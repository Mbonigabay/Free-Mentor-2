//import
import dotenv from 'dotenv';
import users from '../model/User';
import helper from '../middleware/helper';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userValidation from '../middleware/validation';
import Joi from '@hapi/joi';
import pool from '../dbConnect';

dotenv.config(); 
/**
 *  User controller
 */
class userController {

  /** signup function 
   * @param req - request 
   * @param res - response 
   */
  static async Signup(req, res) {
    const hashedPassword = helper.hashPassword(req.body.password);
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      address: req.body.address,
      bio: req.body.bio,
      occupation: req.body.occupation,
      expertise: req.body.expertise,
      avatar: req.body.avatar,
      role_id: req.body.role_id,
    };
    const result = Joi.validate(newUser, userValidation);
    if (result.error) {
      const error = helper.failure(`${result.error.details[0].message}`, 400)
      return res.status(400).json(error);
    } else {
        try {
          const user = await pool.query(users.searchUser, [newUser.email])
          if (user.rowCount !== 0) {
            const error = helper.failure('Email Taken', 400)
            return res.status(400).json(error);
          } else {
            const result = await pool.query(users.addUser, [newUser.firstName, newUser.lastName, newUser.email, newUser.password, newUser.address, newUser.bio, newUser.occupation, newUser.expertise, newUser.avatar, newUser.role_id])
            if (!result.error) {
              const userCreated = result.rows[0];
              delete userCreated.password;
              const success = helper.success('success', 201, userCreated);
              return res.status(201).json(success);
            }
            return res.status(400).json({
              status: 400,
              message: 'server error please try again later',
            });
          }
        } catch(e) {
          const error = helper.failure(e.stack, 400);
          return res.status(400).json(error);
        }
  }
}
  /**
   * Sign in function 
   * @param req - request 
   * @param res - response 
   */
  static async Signin(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const user = await pool.query(users.searchUser, [email]);
    const role_id = user.rows[0].role_id;
    if (req.body.email == null || req.body.password == null) {
      const error = helper.failure('Fill all fields', 400);
      return res.status(400).json(error);
    }
      try {
        if (user.rowCount === 0) {
          const error = helper.failure('Invalid email or password', 400)
          return res.status(400).json(error);
        } else {
          const hash = user.rows[0].password
          const check = await bcrypt.compareSync(password, hash);
          if (!check) {
            const error = helper.failure('Invalid email or password', 400)
            return res.status(400).json(error);
          } else {
            jwt.sign({
              email, role_id
            }, process.env.JWT_KEY, (err, token) => {
              const result = helper.success('Success', 200, {
                token
              })
              return res.status(200).json(result);
            })
          }
        }
      } catch(e) {
        const error = helper.failure(e.stack, 400);
      return res.status(400).json(error);
      }
  }

}
export default userController;