//import
import dotenv from 'dotenv';
import users from '../model/User';
import helper from '../middleware/helper';
import pool from '../dbConnect';

dotenv.config(); 
/**
 *  User controller
 */
class adminController {

  static async ChangeRole(req, res) {
          try {
            const auth = await pool.query(users.checkIfAdmin, [req.userData.email])
            if (auth.rowCount !== 0){
              const userToChange = await client.query(users.searchUserById, [req.params.id]);
              const userRole = userToChange.rows[0].role_id;
              if (userRole === 1){
                return res.status(400).json({
                  status: 400,
                  message: 'Can\'t change admin\'s role',
                });
              }else if (userRole === 2) {
                const result = await pool.query(users.changeToUser, [req.params.id])
                if (!result.error) {
                  return res.status(200).json({
                    status: 200,
                    data: userToChange.rows,
                  });
                }

              } else{
                const result = await pool.query(users.changeToMentor, [req.params.id])
                if (!result.error) {
                  return res.status(200).json({
                    status: 200,
                    data: userToChange.rows,
                  });
                }
              }
            if (!result.error) {
              return res.status(200).json({
                status: 200,
                data: mentor.rows,
              });
            }}
            else {
              return res.status(401).json({
                status: 401,
                message: 'you must be an Admin',
              });
            }
          } catch (e) {
            const error = helper.failure(e.stack, 400);
            return res.status(400).json(error);
          }
  }
  
}
export default adminController;