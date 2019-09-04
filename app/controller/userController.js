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
            const error = helper.failure('Email Taken', 400);
            return res.status(400).json(error);

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
            const error = helper.failure(`${result.error.details[0].message}`, 400)
            return res.status(400).json(error);
        } else {
            users.push(newUser);
            const result = helper.success('User created successfully', 201, {
                token
            })
            return res.status(201).json(result);
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
            const error = helper.failure('Wrong Email', 400);
            return res.status(400).json(error);

        }

        const hash = user.password;
        const check = bcrypt.compareSync(password, hash);
        if (!check) {
            res.status(400).json({
                status: 400,
                message: 'Wrong password'
            });
        } else {
            jwt.sign({
                user,
            }, process.env.JWT_KEY, (err, token) => {
                res.status(200).json({
                    status: 200,
                    message: 'Success',
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
                        message: `No mentor registered`
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
                        const mentorsRep = mentor;
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
                            error: `No mentor by that id`
                        })
                    }

                } else {
                    res.status(400).json({
                        error: `No mentor registered`
                    })
                }
            }
        })


    }

    /**
     * Change Role
     * @param req - request
     * @param res - response
     */
    static ChangeRole(req, res) {
        if (req.userData.user.role_id == 1) {
            const found = users.some(user => user.id === parseInt(req.params.id));
            if (found) {
                const user = users.find(user => user.id === parseInt(req.params.id));
                if (user.role_id == 3) {
                    const updUser = req.body;
                    users.forEach(user => {
                        if (user.id === parseInt(req.params.id)) {
                            user.firstName = updUser.firstName ? updUser.firstName : user.firstName;
                            user.lastName = updUser.lastName ? updUser.lastName : user.lastName;
                            user.email = updUser.email ? updUser.email : user.email;
                            user.password = updUser.password ? updUser.password : user.password;
                            user.address = updUser.address ? updUser.address : user.address;
                            user.bio = updUser.bio ? updUser.bio : user.bio;
                            user.occupation = updUser.occupation ? updUser.occupation : user.occupation;
                            user.expertise = updUser.expertise ? updUser.expertise : user.expertise;
                            user.avatar = updUser.avatar ? updUser.avatar : user.avatar;
                            user.role_id = "2";

                            res.json({
                                status: 201,
                                data: {
                                    msg: 'User changed to mentor',
                                    user
                                }
                            });
                        }
                    });
                } else if (user.role_id == 2) {
                    const updUser = req.body;
                    users.forEach(user => {
                        if (user.id === parseInt(req.params.id)) {
                            user.firstName = updUser.firstName ? updUser.firstName : user.firstName;
                            user.lastName = updUser.lastName ? updUser.lastName : user.lastName;
                            user.email = updUser.email ? updUser.email : user.email;
                            user.password = updUser.password ? updUser.password : user.password;
                            user.address = updUser.address ? updUser.address : user.address;
                            user.bio = updUser.bio ? updUser.bio : user.bio;
                            user.occupation = updUser.occupation ? updUser.occupation : user.occupation;
                            user.expertise = updUser.expertise ? updUser.expertise : user.expertise;
                            user.avatar = updUser.avatar ? updUser.avatar : user.avatar;
                            user.role_id = "3";

                            res.json({
                                status: 201,
                                data: {
                                    msg: 'Mentor changed to user',
                                    user
                                }
                            });
                        }
                    });
                } else {
                    res.json({
                        status: 400,
                        data: {
                            msg: 'This an Admin',
                        }
                    });
                }
            } else {
                res.status(400).json({
                    msg: `No user with the id of ${req.params.id}`
                });
            }
        } else {
            const error = helper.failure('No access', 400);
            return res.status(400).json(error);
        }
    }

}

export default userController;