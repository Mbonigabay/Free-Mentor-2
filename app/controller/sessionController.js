import sessions from '../model/Session';
import users from '../model/User';
import helper from '../middleware/helper';
import sessionValidation from '../middleware/sessionValidation';
import Joi from '@hapi/joi';
import pool from '../dbConnect';


/**
 * Session controller
 */
class sessionController {

  /**
   * Create a session
   * @param req - request
   * @param res - response
   */
  static async CreateSession(req, res) {
    const newSession = {
      mentorId: req.body.mentorId,
      menteeId: req.body.menteeId,
      question: req.body.question,
      menteeEmail: req.body.menteeEmail,
      status: 'pending',
    };
    const result = Joi.validate(newSession, sessionValidation);
    if (result.error) {
      const error = helper.failure(`${result.error.details[0].message}`, 400)
      return res.status(400).json(error);
    } else {
      try {
        const result = await pool.query(sessions.addSession, [newSession.mentorId, newSession.menteeId, newSession.question, newSession.menteeEmail, newSession.status])
        if (!result.error) {
          return res.status(200).json({
            status: 200,
            newSession
          });
        }
        return res.status(401).json({
          status: 500,
          message: 'server error please try again later',
        });
      } catch (e) {
        const error = helper.failure(e.stack, 400);
        return res.status(400).json(error);
      }

    }

  }

  /**
   * Accept a session
   * @param req - request
   * @param res - response 
   */
  static async AcceptSession(req, res) {
    try {
      const session = await pool.query(sessions.searchSessionById, [req.params.sessionId])
      const auth = await pool.query(users.checkIfMentor, [req.userData.email])
      if (auth.rowCount !== 0) {
        if (auth.rows[0].id == session.rows[0].mentorId) {
          const result = await pool.query(sessions.acceptASession, [req.params.sessionId])
          const session = await pool.query(sessions.searchSessionById, [req.params.sessionId])
          if (!result.error) {
            return res.status(200).json({
              status: 200,
              data: session.rows[0],
            });
          }
        } else {
          return res.status(401).json({
            status: 401,
            error: 'Can\'t accept this session',
          });
        }
      }
      return res.status(401).json({
        status: 401,
        error: 'Only mentor allowed',
      });
    } catch (e) {
      const error = helper.failure(e.stack, 400);
      return res.status(400).json(error);
    }

  }

  /**
   * Decline a session
   * @param req - request
   * @param res - response 
   */
  static async RejectSession(req, res) {
    try {
      const session = await pool.query(sessions.searchSessionById, [req.params.sessionId])
      const auth = await pool.query(users.checkIfMentor, [req.userData.email])
            if (auth.rowCount !== 0) {
              if (auth.rows[0].id == session.rows[0].mentorId) {
                const result = await pool.query(sessions.rejectASession, [req.params.sessionId])
                const session = await pool.query(sessions.searchSessionById, [req.params.sessionId])
                if (!result.error) {
                  return res.status(200).json({
                    status: 200,
                    data: session.rows[0],});
                }
              } else {
                return res.status(400).json({
                  status: 400,
                  message: 'Can\'t reject this session',
                });
              }
            }
            return res.status(401).json({
              status: 401,
              message: 'Only mentor allowed',
            });
          } catch (e) {
            const error = helper.failure(e.stack, 400);
            return res.status(400).json(error);
          }
  }
}
export default sessionController;