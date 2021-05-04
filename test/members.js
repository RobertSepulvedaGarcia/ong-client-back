const supertest = require('supertest');
const server = require('../bin/www');
const expect = require('chai').expect;
const api = supertest(server);

const userAdmin = { email: 'Gustavo@test.com', password: '123456' };
const userStandard = { email: 'Victor@test.com', password: '123456' };
let tokenAdmin = null;
let tokenStandard = null;

// member example
const member = {
  name: 'Tony Stark',
  image: 'https://i.giphy.com/media/QpzPEGyOgFXxu/giphy.gif',
};

// Get token admin user
before((done) => {
  api
    .post('/auth/login')
    .send(userAdmin)
    .expect(200)
    .end((err, res) => {
      if (err) done(err);
      tokenAdmin = res.body.token;
      done();
    });
});
// Get token standard user
before((done) => {
  api
    .post('/auth/login')
    .send(userStandard)
    .expect(200)
    .end((err, res) => {
      if (err) done(err);
      tokenStandard = res.body.token;
      done();
    });
});

describe('GET /members', () => {
  it('should return a 200 status and array of members', (done) => {
    api
      .get('/members')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

describe('POST /members', () => {
  it('should insert a member successfully', (done) => {
    const expected = {
      message: 'Created Successfully',
    };
    api
      .post('/members')
      .set('Authorization', tokenAdmin)
      .send(member)
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).eqls(expected);
        done();
      });
  });

  it('should not allow insert a member because is not sending a valid token', (done) => {
    api
      .post('/members')
      .set('Authorization', 'invalid-token')
      .send(member)
      .expect(401)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('should not allow insert a member because the user does not have admin role', (done) => {
    api
      .post('/members')
      .set('Authorization', tokenStandard)
      .send(member)
      .expect(403)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('should not allow insert a member because a body is not sent.', (done) => {
    api
      .post('/members')
      .set('Authorization', tokenAdmin)
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.haveOwnProperty('errors');
        done();
      });
  });
  it('should not allow insert a member because "image" is not sent in body.', (done) => {
    api
      .post('/members')
      .set('Authorization', tokenAdmin)
      .expect(400)
      .send({ name: member.name })
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.haveOwnProperty('errors');
        done();
      });
  });
  it('should not allow insert a member because "name" is not sent in body.', (done) => {
    api
      .post('/members')
      .set('Authorization', tokenAdmin)
      .expect(400)
      .send({ image: member.image })
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.haveOwnProperty('errors');
        done();
      });
  });
});

describe('PUT /members/:id', () => {
  it('should update a member successfully', (done) => {
    const id = 1;
    api
      .put('/members/' + id)
      .set('Authorization', tokenAdmin)
      .send({ name: 'New Name' })
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('should not update a member because user is not admin', (done) => {
    const id = 1;
    api
      .put('/members/' + id)
      .set('Authorization', tokenStandard)
      .send({ name: 'New Name' })
      .expect(403)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('should not update member and return error indicating invalid id', (done) => {
    const id = 99999999;
    const expected = {
      ok: false,
      msg: 'Error, Member not exists',
    };
    api
      .put('/members/' + id)
      .set('Authorization', tokenAdmin)
      .send({ name: 'New Name' })
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).eqls(expected);
        done();
      });
  });
});

describe('DELETE /members/:id', () => {
  it('should delete a member successfully', (done) => {
    const id = 1;
    api
      .delete('/members/' + id)
      .set('Authorization', tokenAdmin)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('should not delete a member because user is not admin', (done) => {
    const id = 1;
    api
      .delete('/members/' + id)
      .set('Authorization', tokenStandard)
      .expect(403)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('should not delete member and return an error indicating that there is no member with that id value', (done) => {
    const id = 99999999;
    const expected = {
      msg: 'Member not exists',
    };
    api
      .delete('/members/' + id)
      .set('Authorization', tokenAdmin)
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).eqls(expected);
        done();
      });
  });
});
