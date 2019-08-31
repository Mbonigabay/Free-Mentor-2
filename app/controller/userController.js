//import
import moment from 'moment';
import users from '../model/User';
import helper from '../middleware/helper';

//user controller
class userController {
    //signup function
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
        if (!newUser.firstName || !newUser.email) {
            return res.status(400).json({
                msg: 'Please include a first name and email'
            });
        }

        users.push(newUser);
        res.json({
            msg: 'User created successfully',
            status: 201,
            data: newUser,
        });
    }


}

export default userController;