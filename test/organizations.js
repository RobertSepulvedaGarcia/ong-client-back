const supertest = require('supertest');
const server = require('../bin/www');
const { expect } = require('chai');

const api = supertest(server);

// organizations/

describe('[GET] organizations/:id/public', () => {
  it('Should return the organization data with the matching ID', (done) => {
    const id = 1;

    api
      .get(`/organizations/${id}/public`)
      .expect(200)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        expect(res.body.data).to.be.an('object');
        done();
      });
  });

  it('Should show an error with a nonexisting ID ', (done) => {
    const id = 0;
    api
      .get(`/organizations/${id}/public`)
      .expect(500)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        expect(res.body.data).to.not.be.an('object');
        done();
      });
  });
});
