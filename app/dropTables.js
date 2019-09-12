import con from './dbConnect';

const dropTables = async () => {
  await con.query('drop table if exists users;');
};
dropTables();

export default dropTables;
