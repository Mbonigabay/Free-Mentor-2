import express from 'express';
import usercontroller from '../controller/userController';
import sessioncontroller from '../controller/sessionController';
import helper from '../middleware/helper';
import auth from '../middleware/auth';

const router = express.Router();


router.post('/api/v1/auth/signup', usercontroller.Signup);
router.post('/api/v1/auth/signin', usercontroller.Signin);
router.get('/api/v1/mentors', auth, helper.verifyToken, usercontroller.ViewAllMentor);
router.get('/api/v1/mentors/:id', helper.verifyToken, usercontroller.ViewAMentor);

router.post('/api/v1/sessions', helper.verifyToken, sessioncontroller.CreateSession);
router.patch('/api/v1/sessions/:sessionId/accept', auth, helper.verifyToken, sessioncontroller.AcceptSession);
router.patch('/api/v1/sessions/:sessionId/reject', auth, helper.verifyToken, sessioncontroller.RejectSession);
router.post('/api/v1/sessions', helper.verifyToken, sessioncontroller.CreateSession);

export default router;
