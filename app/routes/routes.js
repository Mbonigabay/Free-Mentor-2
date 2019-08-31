import express from 'express';
import usercontroller from '../controller/userController';

const router = express.Router();


router.post('/api/v1/auth/signup', usercontroller.Signup);
router.post('/api/v1/auth/signin', usercontroller.Signin);
router.get('/api/v1/users/mentors', usercontroller.ViewAllMentor);

export default router;
