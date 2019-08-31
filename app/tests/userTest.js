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
        .post('/api/auth/signup')
        .send(newUser)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(200);
          chai.expect(res.body).to.be.a('object');

          done();
        });
    })

  });

});