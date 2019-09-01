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
  bio: "",
  occupation: "Fashion Design",
  expertise: "Fashion Design",
  avatar: "",
  role_id: "2"
};

describe('User', () => {
  describe('Sign up', () => {
    it('should be able to sign up', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(200);
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
            chai.expect(res.body.status).to.be.equal('success');
            chai.expect(res.body).to.be.an('object');
          });
        done();
      });

  });

  describe('View all mentor', () => {
      it('should be able to view all mentor', (done) => {
    chai.request(app)
      .get('/api/v1/mentors')
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(200);
      });
    done();
    });
  });

});