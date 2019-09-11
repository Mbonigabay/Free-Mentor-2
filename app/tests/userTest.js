import mock from  './mockUser';
import dotenv from 'dotenv';
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
chai.use(chaiHttp);

dotenv.config();
describe('User', () => {
  describe('Sign up', () => {
    it('should be able to sign up', (done) => {
        chai.request(app).post('/api/v1/auth/signup').send(mock.newUser).end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(201);
          chai.expect(res.body).to.be.a('object');
          done();
        });
      }),
      it('shouldn\'t be able to sign up with a taken email', (done) => {
        chai.request(app).post('/api/v1/auth/signup').send(mock.newUser).end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(400);
          chai.expect(res.body.error).to.be.equal('Email Taken');
          done();
        });
      }),
      it('shouldn\'t be able to sign up with missing data', (done) => {
        chai.request(app).post('/api/v1/auth/signup').send(mock.mockUser2).end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(400);
          chai.expect(res.body.error).to.be.a('String');
          done();
        });
      }),
      it('shouldn\'t be able to sign up without a valid email', (done) => {
        chai.request(app).post('/api/v1/auth/signup').send(mock.mockUser3).end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(400);
          chai.expect(res.body.error).to.be.equal('\"email\" must be a valid email');
          done();
        });
      })
  });
  describe('Sign in', () => {
    it('should be able to signin', (done) => {
      chai.request(app).post('/api/v1/auth/signin').send(mock.loginUser).end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(200);
        chai.expect(res.body).to.be.an('object');
      });
      done();
    }), it('shouldn\'t be able to signin with missing data', (done) => {
      const user = {
        email: 'Mbonigabay@gmail.com'
      };
      chai.request(app).post('/api/v1/auth/signin').send(user).end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(400);
        chai.expect(res.body.error).to.be.equal('Fill all fields');
      });
      done();
    }), it('shouldn\'t be able to signin with a wrong password', (done) => {
      const user = {
        email: 'Mbonigabay@gmail.com',
        password: '1233456'
      };
      chai.request(app).post('/api/v1/auth/signin').send(user).end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(400);
        chai.expect(res.body.error).to.be.equal('Invalid email or password');
      });
      done();
    }), it('shouldn\'t be able to signin with a wrong email', (done) => {
      const user = {
        email: 'johsn@gmail.com',
        password: '123456'
      };
      chai.request(app).post('/api/v1/auth/signin').send(mock.loginUser).end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(400);
        chai.expect(res.body.error).to.be.equal('Invalid email or password');
      });
      done();
    })
    describe('View all mentors', () => {
      it('should be able to view all mentor', (done) => {
        chai.request(app).get('/api/v1/mentors').set('Authorization', process.env.USERTOKEN).end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(200);
        });
        done();
      });
    });
  });
});