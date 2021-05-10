const server = require('../bin/www');
const supertest = require('supertest');
const expect = require('chai').expect;
const request = supertest(server);
const News = require('../models/news');

const tokenAdmin =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsInJvbGVJZCI6MSwiaWF0IjoxNjE5NTU5MDUzLCJleHAiOjE2MTk2NDU0NTN9.GQspIzUY69RAuOyhF0XmCbnHX084wZ-nz6zB8khFvo0';
const tokenStandard =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsInJvbGVJZCI6MiwiaWF0IjoxNjE5NTU5MTA3LCJleHAiOjE2MTk2NDU1MDd9.CNodfUnxMrYhqpvibFzvlrUcatL4jP5eLkWdPYJfP54';

const NewsPOST = {
  name: 'test',
  content: 'testingContent',
  image: 'testingImage',
  categoryId: 2,
};
const InvalidPOST = {
  name: 'test',
  content: 1234,
  image: 'testingImage',
};

const NewsPUT = {
  name: 'test',
  content: 'testingContent',
  image: 'testingImage',
  categoryId: 2,
  type: 'news',
};

/**
 * test GET /news
 */
describe('test GET /news/', () => {
  it('Should return json with a array of all news', (done) => {
    request
      .get('/news/')
      .expect('Content-Type', /json/)
      .expect(Array)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it('Should return the news of id 3', (done) => {
    request
      .get('/news/3')
      .expect('Content-Type', /json/)
      .expect(Array)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it('Should return a error for the petition of the new of id 99', (done) => {
    request
      .get('/news/99')
      .expect('Content-Type', /json/)
      .expect(Array)
      .expect(404)

      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

/**
 * test PUT /news
 */
describe('test PUT /news/', () => {
  it('The request of PUT should return status ok', (done) => {
    request
      .put('/news/3')
      .send(NewsPUT)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.haveOwnProperty('ok', true);
        done();
      });
  });

  it('The request of PUT should return a error', (done) => {
    request
      .put('/news/99')
      .send(NewsPUT)
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.haveOwnProperty('ok', false);
        done();
      });
  });
});

/**
 * test POST /news
 */
describe('test POST /news/', () => {
  it('The request of POST for create a news should return status ok', (done) => {
    request
      .post('/news/')
      .set('Authorization', tokenAdmin)
      .send(NewsPOST)
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.haveOwnProperty('ok', true);
        done();
      });
  });

  it('The request of POST should return a error of token of a user not admin', (done) => {
    request
      .post('/news/')
      .set('Authorization', tokenStandard)
      .send(NewsPOST)
      .expect(403)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
  it('The request of POST should return a error of token invalid', (done) => {
    request
      .post('/news/')
      .set('Authorization', 'tokenfalsotokenfalsotokenfalso')
      .send(NewsPOST)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('The request of POST should return a error of missed token', (done) => {
    request
      .post('/news/')
      .send(NewsPOST)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

/**
 * test DELETE /news/
 */
 describe('test DELETE /news/', () => {
    it('The request of DELETE a new should return status ok', (done) => {
      request
        .delete('/news/2')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body).to.have.haveOwnProperty('ok', true);
          done();
        });
    });
  
    it('The request of DELETE should return a error for a id that doesnt exist', (done) => {
      request
        .delete('/news/99')
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.haveOwnProperty('ok', false);
          done();
        });
    });
  });
  