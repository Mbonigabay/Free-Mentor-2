import dotenv from 'dotenv';
import con from './dbConnect';
import user from './model/User';
import session from './model/Session';

dotenv.config();
const createTables = async () => {
  const tableUser = user.userTable;
  cont tableSession = session.sessionTable;
  const tables = `${tableUser}; ${tableSession}`;
  
  
  await con.query(tables);
};
createTables();

export default createTables;
