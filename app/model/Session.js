const sessionTable = `
CREATE TABLE IF NOT EXISTS session (
        "sessionId" serial primary key,
        "mentorId" varchar(5) NOT NULL,
		"menteeId" varchar(5) NOT NULL,
		question varchar(250) NOT NULL,
		"menteeEmail" varchar(30) UNIQUE,
		status varchar(10) NOT NULL
    )`;
const addSession = `insert into session ("mentorId", "menteeId", question,"menteeEmail", status)VALUES($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING returning *`;

const removeSession = 'delete from session where "sessionId" = ($1)';
const searchSession = 'select * from session where "sessionId" = ($1)';
const searchSessionById = 'select * from session where "sessionId" = ($1)';
const getAllSession = 'select * from session';
const getSessionByMentor = 'select * from session where "mentorId" = 2';
const acceptASession = 'UPDATE session SET status= \'accepted\' WHERE "sessionId"=($1)';
const rejectASession = `UPDATE session SET status= \'rejected\' WHERE "sessionId"=($1)`

export default {
  sessionTable,
  addSession,
  removeSession,
  searchSession,
  searchSessionById,
  getAllSession,
  getSessionByMentor,
  acceptASession,
  rejectASession
};