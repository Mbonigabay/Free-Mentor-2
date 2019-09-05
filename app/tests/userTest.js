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

const mockUser1 = {
  firstName: "Yusuf",
  lastName: "Mboni",
  email: "bob@gmail.com",
  password: "123456",
  address: "kicukiro",
  bio: "dsdasdasd",
  occupation: "Fashion Design",
  expertise: "Fashion Design",
  avatar: "dasdsadasd",
  role_id: "2"
};

const mockUser2 = {
  firstName: "Yusuf",
  lastName: "",
  email: "bob@gmail.com",
  password: "123456",
  address: "kicukiro",
  bio: "dsdasdasd",
  occupation: "Fashion Design",
  expertise: "Fashion Design",
  avatar: "dasdsadasd",
  role_id: "2"
};

const mockUser3 = {
  firstName: "Yusuf",
  lastName: "Mboni",
  email: "Mbonigabay@",
  password: "123456",
  address: "kicukiro",
  bio: "dsdasdasd",
  occupation: "Fashion Design",
  expertise: "Fashion Design",
  avatar: "dasdsadasd",
  role_id: "2"
};

const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdE5hbWUiOiJCb2IiLCJsYXN0TmFtZSI6IldpbGxpYW1zIiwiZW1haWwiOiJib2JAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkRzFXYVhOT2wxVFVsU0tMNHhNc09BZUs2M0RWb0dCbFVSR0w1T0dtc0lzVHRtdG9NeU9zcUsiLCJhZGRyZXNzIjoiTnlhcnVnZW5nZSIsImJpbyI6IiIsIm9jY3VwYXRpb24iOiJTb2Z0d2FyZSBFbmdpbmVlcmluZyIsImV4cGVydGlzZSI6IlNvZnR3YXJlIEVuZ2luZWVyaW5nIiwiYXZhdGFyIjoiIiwicm9sZV9pZCI6IjEifSwiaWF0IjoxNTY3NTEwODM4fQ.Ek9uh75Ina2_VRrGETVVUinBBq0OWOLaZWImHGz_Etk';

const adminToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkRzFXYVhOT2wxVFVsU0tMNHhNc09BZUs2M0RWb0dCbFVSR0w1T0dtc0lzVHRtdG9NeU9zcUsiLCJhZGRyZXNzIjoia2ljdWtpcm8iLCJiaW8iOiIiLCJvY2N1cGF0aW9uIjoiR3JhcGhpYyBEZXNpZ24iLCJleHBlcnRpc2UiOiJHcmFwaGljIERlc2lnbiIsImF2YXRhciI6IiIsInJvbGVfaWQiOiIxIn0sImlhdCI6MTU2NzY3OTc0NH0.zlSZKBeBwyaEwZvtBwF10sPLTS7cm0mThOROW4qgGSo';

const userToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdE5hbWUiOiJTaGFubm9uIiwibGFzdE5hbWUiOiJKYWNrc29uIiwiZW1haWwiOiJzaGFubm9uQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJExSTGRvU3NpVkc3Q2xmb1MvL1p5NGUva0Z0blR6WEhxYjBmb0Yya3NMY21HcEZHV2YvY0ZPIiwiYWRkcmVzcyI6Ikdhc2FibyIsImJpbyI6IiIsIm9jY3VwYXRpb24iOiJQYWludGVyIiwiZXhwZXJ0aXNlIjoiUGFpbnRlciIsImF2YXRhciI6IiIsInJvbGVfaWQiOiIzIn0sImlhdCI6MTU2NzY4NTM2OX0.oweyt1rn24esS00GaBK-4TB4U3WR-y7fvbrwlQ4MwJo';

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
    }),

    it('shouldn\'t be able to sign up with a taken email', (done)=>{
      chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockUser1)
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(400);
        chai.expect(res.body.error).to.be.equal('Email Taken');

        done();
      });
    }),

    it('shouldn\'t be able to sign up with missing data', (done)=>{
      chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockUser2)
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(400);
        chai.expect(res.body.error).to.be.a('String');

        done();
      });
    }),

    it('shouldn\'t be able to sign up without a valid email', (done)=>{
      chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockUser3)
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(400);
        chai.expect(res.body.error).to.be.equal('\"email\" must be a valid email');

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
    }),
    it('shouldn\'t be able to signin with missing data', (done) => {
      const user = {
        email: 'john@gmail.com'
      };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(400);
          chai.expect(res.body.error).to.be.equal('Fill all fields');
        });
      done();
    }),
    it('shouldn\'t be able to signin with a wrong password', (done) => {
      const user = {
        email: 'john@gmail.com',
        password: '1233456'
      };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(400);
          chai.expect(res.body.error).to.be.equal('Invalid email or password');
        });
      done();
    }),
    it('shouldn\'t be able to signin with a wrong email', (done) => {
      const user = {
        email: 'johsn@gmail.com',
        password: '123456'
      };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(400);
          chai.expect(res.body.error).to.be.equal('Invalid email or password');
        });
      done();
    })

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
      .get('/api/v1/mentors/2')
      .set('Authorization', token)
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(200);
      });
    done();
    }),
    it('shouldn\'t be able to view a mentor if id don\'t exist', (done) => {
      chai.request(app)
      .get('/api/v1/mentors/6')
      .set('Authorization', token)
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(400);
      });
    done();
    })
  });

  describe('Change a role', ()=>{
    it('should be able change a user\'s role', (done) => {
      chai.request(app)
      .patch('/api/v1/user/3')
      .set('Authorization', adminToken)
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(200);
      });
    done();
    }),
    it('only admin should be able change a user\'s role', (done) => {
      chai.request(app)
      .patch('/api/v1/user/3')
      .set('Authorization', userToken)
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(400);
        chai.expect(res.body.error).to.be.equal('no access');
      });
    done();
    }),
    it('can\'t change a admin\'s role', (done) => {
      chai.request(app)
      .patch('/api/v1/user/1')
      .set('Authorization', adminToken)
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(400);
        chai.expect(res.body.error).to.be.equal('This an Admin');
      });
    done();
    })
  })

});