const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);

const newSession = {
    mentorId: 1,
    menteeId: 2,
    question: "What are you doing",
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

    describe('Accept a session', () => {
        it('should be able to accept session', (done) => {
            chai.request(app)
                .patch('/api/v1/sessions/1/accept')
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(200);
                    chai.expect(res.body.data.msg).to.be.equal('session accepted');
                });
            done();
        });
    })


    describe('Reject a session', () => {
        it('should be able to reject session', (done) => {
            chai.request(app)
                .patch('/api/v1/sessions/1/reject')
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(200);
                    chai.expect(res.body.data.msg).to.be.equal('session rejected');
                });
            done();
        })
    });
})