const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);

const newSession = {
    mentorId: 1,
    menteeId: 2,
    question: "What",
    menteeEmail: "Mbonigaba@gmail.com",
  };

describe('Session', () => {
    describe('Create a session', () => {
it('should be able to create session', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .send(newSession)
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(200);
      });
    done();
  });
});
})

