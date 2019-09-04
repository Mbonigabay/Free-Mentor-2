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

const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdE5hbWUiOiJCb2IiLCJsYXN0TmFtZSI6IldpbGxpYW1zIiwiZW1haWwiOiJib2JAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkRzFXYVhOT2wxVFVsU0tMNHhNc09BZUs2M0RWb0dCbFVSR0w1T0dtc0lzVHRtdG9NeU9zcUsiLCJhZGRyZXNzIjoiTnlhcnVnZW5nZSIsImJpbyI6IiIsIm9jY3VwYXRpb24iOiJTb2Z0d2FyZSBFbmdpbmVlcmluZyIsImV4cGVydGlzZSI6IlNvZnR3YXJlIEVuZ2luZWVyaW5nIiwiYXZhdGFyIjoiIiwicm9sZV9pZCI6IjEifSwiaWF0IjoxNTY3NTEwODM4fQ.Ek9uh75Ina2_VRrGETVVUinBBq0OWOLaZWImHGz_Etk';

describe('Session', () => {
    describe('Create a session', () => {
        it('should be able to create session', (done) => {
            chai.request(app)
                .post('/api/v1/sessions')
                .set('Authorization', token)
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
                .set('Authorization', token)
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(200);
                    chai.expect(res.body.data.message).to.be.equal('session accepted');
                });
            done();
        });
    })


    describe('Reject a session', () => {
        it('should be able to reject session', (done) => {
            chai.request(app)
                .patch('/api/v1/sessions/1/reject')
                .set('Authorization', token)
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(200);
                    chai.expect(res.body.data.message).to.be.equal('session rejected');
                });
            done();
        })
    });
})