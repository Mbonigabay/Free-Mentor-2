import express from 'express';
import usercontroller from '../controller/userController';
import sessioncontroller from '../controller/sessionController'

const router = express.Router();


router.post('/api/v1/auth/signup', usercontroller.Signup);
router.post('/api/v1/auth/signin', usercontroller.Signin);
router.get('/api/v1/mentors', usercontroller.ViewAllMentor);
router.get('/api/v1/mentors/:id', usercontroller.ViewAMentor);

router.post('/api/v1/sessions', sessioncontroller.CreateSession);
router.patch('/api/v1/sessions/:sessionId/accept', sessioncontroller.AcceptSession);
router.patch('/api/v1/sessions/:sessionId/reject', sessioncontroller.RejectSession);
router.post('/api/v1/sessions', sessioncontroller.CreateSession);

export default router;
