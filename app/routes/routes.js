import express from 'express';
import usercontroller from '../controller/userController';
import mentorcontroller from '../controller/mentorController';
import admincontroller from '../controller/adminController';
import sessioncontroller from '../controller/sessionController';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/api/v1/auth/signup', usercontroller.Signup);
router.post('/api/v1/auth/signin', usercontroller.Signin);

router.get('/api/v1/mentors', auth, mentorcontroller.ViewAllMentor);
router.get('/api/v1/mentors/:id', auth, mentorcontroller.ViewAMentor);

router.patch('/api/v1/user/:id', auth, admincontroller.ChangeRole);

router.post('/api/v1/sessions', auth, sessioncontroller.CreateSession);

export default router;
