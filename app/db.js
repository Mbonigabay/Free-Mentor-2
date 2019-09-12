import dotenv from 'dotenv';
import con from './dbConnect';
import user from './model/User';

dotenv.config();
const createTables = async () => {
  const tableUser = user.userTable;
  const tables = `${tableUser};`;
  
  
  await con.query(tables);
};
createTables();

export default createTables;
