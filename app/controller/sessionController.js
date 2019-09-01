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

    // Accept a session
    static AcceptSession(req, res){
        const found = sessions.some(session => session.sessionId === parseInt(req.params.sessionId))

        if (found) {
          const updSession = req.body;
          sessions.forEach(session => {
            if (session.sessionId === parseInt(req.params.sessionId)) {
              session.sessionId = updSession.sessionId ? updSession.sessionId : session.sessionId;
              session.mentorId = updSession.mentorId ? updSession.mentorId : session.mentorId;
              session.menteeId = updSession.menteeId ? updSession.menteeId : session.menteeId;
              session.question = updSession.question ? updSession.question : session.question;
              session.menteeEmail = updSession.menteeEmail ? updSession.menteeEmail : session.menteeEmail;
              session.status = "accepted";
      
              res.status(200).json({
                status: 200,
                data: {
                    msg: 'session accepted',
                    session,
                }
              });
            }
          });
        } else {
          res.status(400).json({
            msg: `No session with the id of ${req.params.sessionId}`
          });
        }
    }

    // Decline a session
    static RejectSession(req,res){
        const found = sessions.some(session => session.sessionId === parseInt(req.params.sessionId))

        if (found) {
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
                    msg: 'session rejected',
                    session,
                }
              });
            }
          });
        } else {
          res.status(400).json({
            msg: `No session with the id of ${req.params.sessionId}`
          });
        }
    }
}


export default sessionController;