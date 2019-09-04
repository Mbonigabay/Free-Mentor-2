const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);

const newUser = {
  firstName: "Yusuf",
  lastName: "Mboni",
  email: "Mbonigabay@gmail.com",
  password: "123456",
  address: "kicukiro",
  bio: "dsdasdasd",
  occupation: "Fashion Design",
  expertise: "Fashion Design",
  avatar: "dasdsadasd",
  role_id: "2"
};

const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdE5hbWUiOiJCb2IiLCJsYXN0TmFtZSI6IldpbGxpYW1zIiwiZW1haWwiOiJib2JAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkRzFXYVhOT2wxVFVsU0tMNHhNc09BZUs2M0RWb0dCbFVSR0w1T0dtc0lzVHRtdG9NeU9zcUsiLCJhZGRyZXNzIjoiTnlhcnVnZW5nZSIsImJpbyI6IiIsIm9jY3VwYXRpb24iOiJTb2Z0d2FyZSBFbmdpbmVlcmluZyIsImV4cGVydGlzZSI6IlNvZnR3YXJlIEVuZ2luZWVyaW5nIiwiYXZhdGFyIjoiIiwicm9sZV9pZCI6IjEifSwiaWF0IjoxNTY3NTEwODM4fQ.Ek9uh75Ina2_VRrGETVVUinBBq0OWOLaZWImHGz_Etk';

describe('User', () => {
  describe('Sign up', () => {
    it('should be able to sign up', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(201);
          chai.expect(res.body).to.be.a('object');

          done();
        });
    })

  });

  describe('Sign in', () => {
    it('should be able to signin', (done) => {
      const user = {
        email: 'john@gmail.com',
        password: '123456',
      };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(200);
          chai.expect(res.body).to.be.an('object');
        });
      done();
    });

  });

  describe('View all mentors', () => {
    it('should be able to view all mentor', (done) => {
      chai.request(app)
        .get('/api/v1/mentors')
        .set('Authorization', token)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(200);
        });
      done();
    });
  });

  describe('View a mentor', () => {
    it('should be able to view a mentor', (done) => {
      chai.request(app)
      .get('/api/v1/mentors/3')
      .set('Authorization', token)
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(200);
      });
    done();
    });
  });

});