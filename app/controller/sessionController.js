import sessions from '../model/Session';
import users from '../model/User';
import jwt from 'jsonwebtoken';
import helper from '../middleware/helper';

/**
 * Session controller
 */
class sessionController {

    /**
     * Create a session
     * @param req - request
     * @param res - response
     */
    static CreateSession(req, res){
        const newId = parseInt(sessions.length) + 1;
        const newSession = {
          sessionId: newId,
          mentorId: req.body.mentorId,
          menteeId: req.body.menteeId,
          question: req.body.question,
          menteeEmail: req.body.menteeEmail,
          status: 'pending',
        };
        
        jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
          const findUser = users.find(user => user.email === authData.user.email);
        
            if (err) {
              res.sendStatus(403);
            } else {
              if (!newSession.question) {
                const error = helper.failure('Please You forgot to ask a question', 400)
                return res.status(400).json(error);
              }
            if(findUser.role_id != 1){
              sessions.push(newSession);
              const result = helper.success('Session created successfully', 200, {newSession})
              return res.status(200).json(result);
            }else{
              const error = helper.failure('You are an admin', 400)
                return res.status(400).json(error);
            }
            }
          })
        
    }

    /**
     * Accept a session
     * @param req - request
     * @param res - response 
     */
    static AcceptSession(req, res){
        const found = sessions.some(session => session.sessionId === parseInt(req.params.sessionId));
        const session = sessions.find(session => session.sessionId === parseInt(req.params.sessionId));

        jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
          if (err) {
            res.sendStatus(403);
          } else {
            if (found) {
              console.log(req.userData.user.id);
              if(req.userData.user.id === session.mentorId){
              const updSession = req.body;
              sessions.forEach(session => {
                if (session.sessionId === parseInt(req.params.sessionId)) {
                  session.sessionId = updSession.sessionId ? updSession.sessionId : session.sessionId;
                  session.mentorId = updSession.mentorId ? updSession.mentorId : session.mentorId;
                  session.m0enteeId = updSession.menteeId ? updSession.menteeId : session.menteeId;
                  session.question = updSession.question ? updSession.question : session.question;
                  session.menteeEmail = updSession.menteeEmail ? updSession.menteeEmail : session.menteeEmail;
                  session.status = "accepted";
          
                  const result = helper.success('session accepted', 200, {session})
              return res.status(200).json(result);
                 
                }
              });} else {
                const result = helper.failure(`no access to this session`, 400)
              return res.status(400).json(result);
                
              }
            } else {
              const result = helper.failure(`no session with the id of ${req.params.sessionId}`, 400)
              return res.status(400).json(result);
            }
          }
        })

    }

    /**
     * Decline a session
     * @param req - request
     * @param res - response 
     */
    static RejectSession(req,res){
        const found = sessions.some(session => session.sessionId === parseInt(req.params.sessionId));
        const session = sessions.find(session => session.sessionId === parseInt(req.params.sessionId));

        jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
          if (err) {
            res.sendStatus(403);
          } else {
            if (found) {
              if(req.userData.user.id === session.mentorId){
              const updSession = req.body;
              sessions.forEach(session => {
                if (session.sessionId === parseInt(req.params.sessionId)) {
                  session.sessionId = updSession.sessionId ? updSession.sessionId : session.sessionId;
                  session.mentorId = updSession.mentorId ? updSession.mentorId : session.mentorId;
                  session.menteeId = updSession.menteeId ? updSession.menteeId : session.menteeId;
                  session.question = updSession.question ? updSession.question : session.question;
                  session.menteeEmail = updSession.menteeEmail ? updSession.menteeEmail : session.menteeEmail;
                  session.status = "rejected";
          
                  res.status(200).json({
                    status: 200,
                    data: {
                        message: 'session rejected',
                        session,
                    }
                  });
                }
              });} else {
                res.status(400).json({
                  message: `NO access to this session`
                });
              }
            } else {
              res.status(400).json({
                message: `No session with the id of ${req.params.sessionId}`
              });
            }
          }
        })

    }
}


export default sessionController;