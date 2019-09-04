//import
import dotenv from 'dotenv';
import users from '../model/User';
import helper from '../middleware/helper';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userValidation from '../middleware/validation';
import Joi from '@hapi/joi';


dotenv.config();
/**
 * User controller
 */
class userController {
    /**
     * signup function
     * @param req - request
     * @param res - response
     */
    static Signup(req, res) {
        const newId = parseInt(users.length) + 1;
        const hashedPassword = helper.hashPassword(req.body.password);
        const token = helper.generateToken(req.body.email, req.body.password);
        const email = req.body.email;
        const checkEmail = users.find(userEmail => userEmail.email === email);
        if (checkEmail) {
            return res.status(400).json({
                status: 400,
                error: 'email is taken'
            });
        }
        const newUser = {
            id: newId,
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
            token: token,
        };
        const result = Joi.validate(newUser, userValidation);
        if (result.error) {
            return res.status(400).json({
                status: 400,
                error: `${result.error.details[0].message}`,
            });
        } else {
            users.push(newUser);
            res.json({
                msg: 'User created successfully',
                status: 201,
                data: {
                    token
                },
            });
        }
    }

    /**
     * Sign in function
     * @param req - request
     * @param res - response
     */
    static Signin(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        const user = users.find(user => user.email === email);
        if (!user) {
            res.status(400).json({
                status: '400',
                message: 'Wrong Email'
            });
        }

        const hash = user.password;
        const check = bcrypt.compareSync(password, hash);
        if (!check) {
            res.status(400).json({
                status: '400',
                message: 'Wrong password'
            });
        } else {
            jwt.sign({
                user,
            }, process.env.JWT_KEY, (err, token) => {
                res.status(200).json({
                    status: 'success',
                    token
                });
            })
        }
    }

    /**
     * View all mentors function
     * @param req - request
     * @param res - response
     */
    static ViewAllMentor(req, res) {
        const found = users.some(user => user.role_id == 2);
        console.log(req.userData.user.role_id);


        jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                if (found) {
                    const mentors = users.filter(user => user.role_id == 2);
                    const mentorsRep = mentors;
                    mentorsRep.forEach((mentorRep) => {
                        delete mentorRep.password;
                    });
                    res.json({
                        status: 200,
                        data: {
                            mentorsRep
                        }
                    })
                } else {
                    res.status(400).json({
                        msg: `No mentor registered`
                    })
                }
            }
        })

    }

    /**
     * View a mentor
     * @param req - request
     * @param res - response
     */
    static ViewAMentor(req, res) {
        const found = users.some(user => user.role_id == 2);

        jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                if (found) {
                    const check = users.some(user => user.id === parseInt(req.params.id) && user.role_id == 2)
                    if (check) {
                        const mentor = users.filter(user => user.id === parseInt(req.params.id) && user.role_id == 2)
                        res.json({
                            status: 200,
                            data: {
                                mentor
                            }
                        })
                    } else {
                        res.status(400).json({
                            msg: `No mentor by that id`
                        })
                    }

                } else {
                    res.status(400).json({
                        msg: `No mentor registered`
                    })
                }
            }
        })


    }

}

export default userController;