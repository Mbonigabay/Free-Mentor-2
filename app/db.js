import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import con from './dbConnect';
import user from './model/User';

dotenv.config();
const createTables = async () => {
  const passkey = bcrypt.hashSync(process.env.password, 10);
  const tableUser = user.userTable;
  const tables = `${tableUser};`;
  
  
  await con.query(tables);
};
createTables();

export default createTables;
