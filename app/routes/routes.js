import express from 'express';
import usercontroller from '../controller/userController';
import mentorcontroller from '../controller/mentorController'
import auth from '../middleware/auth';

const router = express.Router();

router.post('/api/v1/auth/signup', usercontroller.Signup);
router.post('/api/v1/auth/signin', usercontroller.Signin);

router.get('/api/v1/mentors', auth, mentorcontroller.ViewAllMentor);
router.get('/api/v1/mentors/:id', auth, mentorcontroller.ViewAMentor);


export default router;
