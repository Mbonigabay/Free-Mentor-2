import express from 'express';
import usercontroller from '../controller/userController';

const router = express.Router();


router.post('/api/auth/signup', usercontroller.Signup);
router.post('/api/auth/signin', usercontroller.Signin);

export default router;
