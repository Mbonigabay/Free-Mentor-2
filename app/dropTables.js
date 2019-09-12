import con from './dbConnect';

const dropTables = async () => {
  await con.query('drop table if exists users; drop table if exists session;');
};
dropTables();

export default dropTables;
