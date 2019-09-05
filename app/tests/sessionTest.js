const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);

const newSession = {
    mentorId: 1,
    menteeId: 2,
    question: "What are you doing!",
    menteeEmail: "yusuf@gmail.com",
};

const userToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdE5hbWUiOiJTaGFubm9uIiwibGFzdE5hbWUiOiJKYWNrc29uIiwiZW1haWwiOiJzaGFubm9uQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJExSTGRvU3NpVkc3Q2xmb1MvL1p5NGUva0Z0blR6WEhxYjBmb0Yya3NMY21HcEZHV2YvY0ZPIiwiYWRkcmVzcyI6Ikdhc2FibyIsImJpbyI6IiIsIm9jY3VwYXRpb24iOiJQYWludGVyIiwiZXhwZXJ0aXNlIjoiUGFpbnRlciIsImF2YXRhciI6IiIsInJvbGVfaWQiOiIzIn0sImlhdCI6MTU2NzY4NTM2OX0.oweyt1rn24esS00GaBK-4TB4U3WR-y7fvbrwlQ4MwJo';

const adminToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkRzFXYVhOT2wxVFVsU0tMNHhNc09BZUs2M0RWb0dCbFVSR0w1T0dtc0lzVHRtdG9NeU9zcUsiLCJhZGRyZXNzIjoia2ljdWtpcm8iLCJiaW8iOiIiLCJvY2N1cGF0aW9uIjoiR3JhcGhpYyBEZXNpZ24iLCJleHBlcnRpc2UiOiJHcmFwaGljIERlc2lnbiIsImF2YXRhciI6IiIsInJvbGVfaWQiOiIxIn0sImlhdCI6MTU2NzY3OTc0NH0.zlSZKBeBwyaEwZvtBwF10sPLTS7cm0mThOROW4qgGSo';

const mentorToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdE5hbWUiOiJCb2IiLCJsYXN0TmFtZSI6IldpbGxpYW1zIiwiZW1haWwiOiJib2JAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkRzFXYVhOT2wxVFVsU0tMNHhNc09BZUs2M0RWb0dCbFVSR0w1T0dtc0lzVHRtdG9NeU9zcUsiLCJhZGRyZXNzIjoiTnlhcnVnZW5nZSIsImJpbyI6IiIsIm9jY3VwYXRpb24iOiJTb2Z0d2FyZSBFbmdpbmVlcmluZyIsImV4cGVydGlzZSI6IlNvZnR3YXJlIEVuZ2luZWVyaW5nIiwiYXZhdGFyIjoiIiwicm9sZV9pZCI6IjMifSwiaWF0IjoxNTY3Njc0MzczfQ.LaCqOCKobBdVQeFbCwVtafrKpv-xhiHlrgfFxm-hY1I'

describe('Session', () => {
    describe('Create a session', () => {
        it('should be able to create session', (done) => {
            chai.request(app)
                .post('/api/v1/sessions')
                .set('Authorization', userToken)
                .send(newSession)
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(200);
                });
            done();
        }),
        it('shouldn\t be able to create session as admin', (done) => {
            chai.request(app)
                .post('/api/v1/sessions')
                .set('Authorization', adminToken)
                .send(newSession)
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(400);
                    chai.expect(res.body.error).to.be.equal('You are an admin')
                });
            done();
        })
    });

    describe('Accept a session', () => {
        it('should be able to accept session', (done) => {
            chai.request(app)
                .patch('/api/v1/sessions/3/accept')
                .set('Authorization', mentorToken)
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(200);
                });
            done();
        }),
        it('shouldn\'t be able to accept session that is not yours', (done) => {
            chai.request(app)
                .patch('/api/v1/sessions/3/accept')
                .set('Authorization', adminToken)
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(400);
                });
            done();
        });

    })


    describe('Reject a session', () => {
        it('should be able to reject session', (done) => {
            chai.request(app)
                .patch('/api/v1/sessions/3/reject')
                .set('Authorization', mentorToken)
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(200);
                });
            done();
        }),
        it('shouldn\'t be able to reject session that is not yours', (done) => {
            chai.request(app)
                .patch('/api/v1/sessions/3/reject')
                .set('Authorization', adminToken)
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(400);
                });
            done();
        });
    });
})