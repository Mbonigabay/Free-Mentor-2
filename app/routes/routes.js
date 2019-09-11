import express from 'express';
import usercontroller from '../controller/userController';
import helper from '../middleware/helper';

const router = express.Router();

router.post('/api/v1/auth/signup', usercontroller.Signup);



export default router;
