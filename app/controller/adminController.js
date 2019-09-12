//import
import dotenv from 'dotenv';
import users from '../model/User';
import helper from '../middleware/helper';
import pool from '../dbConnect';

dotenv.config(); 
/**
 *  Admin controller
 */
class adminController {

  static async ChangeRole(req, res) {
          try {
            const auth = await pool.query(users.checkIfAdmin, [req.userData.email])
            if (auth.rowCount !== 0 && req.userData.role_id){
              const userToChange = await pool.query(users.searchUserById, [req.params.id]);
              const userRole = userToChange.rows[0].role_id;
              if (userRole === 1){
                const error = helper.failure('Can\'t change admin\'s role', 401);
                return res.status(401).json(error);
              }else if (userRole === 2) {
                const result = await pool.query(users.changeToUser, [req.params.id])
                if (!result.error) {
                    const success = helper.success('success', 200, userToChange.rows[0]);
                    return res.status(200).json(success);
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
            }else {              
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