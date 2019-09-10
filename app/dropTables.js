import con from './dbConnect';

const dropTables = async () => {
  await con.query('drop table users;');
};
dropTables();

export default dropTables;
