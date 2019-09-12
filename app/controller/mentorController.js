//import
import dotenv from 'dotenv';
import users from '../model/User';
import helper from '../middleware/helper';
import pool from '../dbConnect';

dotenv.config();
/**
 *  User controller
 */
class mentorController {

    static async ViewAllMentor(req, res) {
        try {
            const allMentors = await pool.query(users.getAllMentor)
            const mentors = allMentors.rows
            mentors.forEach((mentor) => {
                delete mentor.password;
            });
            if (!allMentors.error) {
                const result = helper.success('success', 200, mentors)
                return res.status(200).json(result);
            }
            const error = helper.failure('server error please try again later', 404);
            return res.status(404).json(error);
        } catch (e) {
            const error = helper.failure(e.stack, 400);
            return res.status(400).json(error);
        }
    }

    static async ViewAMentor(req, res) {
        try {
            const mentor = await pool.query(users.searchMentorById, [req.params.id])
            if (mentor.rowCount !== 0 && !mentor.error) {
                const result = helper.success('success', 200,  mentor.rows)
                return res.status(200).json(result);
            } else {
                const result = helper.failure('no mentor by that id', 400,  mentor.rows)
                return res.status(400).json(result);
            }
        } catch (e) {
            const error = helper.failure(e.stack, 400);
            return res.status(400).json(error);
        }
    }

}
export default mentorController;