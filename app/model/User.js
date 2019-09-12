
const userTable = `
CREATE TABLE IF NOT EXISTS users (
        id serial primary key,
        "firstName" varchar(30) NOT NULL,
        "lastName" varchar(25) NOT NULL,
        email varchar(30) UNIQUE,
    password varchar(100) NOT NULL,
    address varchar(30) NOT NULL,
		bio text NOT NULL,
		occupation varchar(30) NOT NULL,
		expertise varchar(30) NOT NULL,
		avatar varchar(30) NOT NULL,
		role_id integer NOT NULL
    )`;
const addUser = `insert into users (
	"firstName", "lastName", email, password,address, bio, occupation, expertise, avatar, role_id
    )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ON CONFLICT DO NOTHING returning *`;

const removeUser = 'delete from users where email = ($1)';
const searchUser = 'select * from users where email = ($1)';
const searchUserById = 'select * from users where id = ($1)';
const getAllUser = 'select * from users';
const getAllMentor = 'select * from users where role_id = 2';
const searchMentorById = 'select * from users where role_id = 2 and id =($1)';
const checkIfAdmin = 'select * from users where role_id = 1 and email =($1)';
const checkIfMentor = 'select * from users where role_id = 2 and email =($1)';
const changeToUser = 'UPDATE users SET role_id= 3 WHERE id=($1)';
const changeToMentor = 'UPDATE users SET role_id= 2 WHERE id=($1)';

export default {
  userTable,
  addUser,
  removeUser,
  searchUser,
  searchUserById,
  getAllUser,
  getAllMentor,
  searchMentorById,
  checkIfAdmin,
  checkIfMentor,
  changeToMentor,
  changeToUser
};