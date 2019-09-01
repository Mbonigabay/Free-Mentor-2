import sessions from '../model/Session';

//session controller
class sessionController {

    // Create a session function
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
        
          if (!newSession.question) {
            return res.status(400).json({
              msg: 'Please You forgot to ask a question'
            });
          }
        
          sessions.push(newSession);
          res.json({
            status: 200,
            data: {
              newSession,
            }
          });
    }
}


export default sessionController;