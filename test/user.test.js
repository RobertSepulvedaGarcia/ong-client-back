const supertest = require("supertest");
const expect = require("chai").expect;
const app = require("../bin/www");
const api = supertest(app)
let tokenAdmin;
let tokenStandar;
const userAdmin = {
    email: 'Jack@test.com',
    password: 123456
}
const userStandar = {
    email: 'Virginia@test.com',
    password: 123456
}
const userData = {
    firstName: 'Test',
    lastName: "Testing",
    email: "testing@testing.com",
    password: '123456',

}
describe("GET all users ", function () {
    before((done) => {
        api
            .post('/auth/login')
            .send(userAdmin)
            .end((err, res) => {
                if (err) return done()
                tokenAdmin = res.body.token
                done()
            })
    })
    before((done) => {
        api
            .post('/auth/login')
            .send(userStandar)
            .end((err, res) => {
                if (err) return done()
                tokenStandar = res.body.token
                done()
            })

    })
    it("GET users with valid token  ", (done) => {

        api
            .get("/users")
            .set({ Authorization: tokenAdmin })
            .end((err, res) => {
                if (err) return done()
                expect(res.status).to.eql(200);
                expect(res.headers).to.have.property('content-type').eql("application/json; charset=utf-8")
                expect(res.body).to.be.an("array")
                done()
            })
    });
    it("Should response with 400 when no token is given  ", (done) => {
        api
            .get("/users")
            .end((err, res) => {
                if (err) return done()
                expect(res.status).to.eql(400);
                expect(res.headers).to.have.property('content-type').eql("text/html; charset=utf-8")
                done()
            })

    });
    it("Should response with 403 when role is invalid  ", async function () {
        api
            .get("/users")
            .set({ Authorization: tokenStandar })
            .end((err, res) => {
                if (err) return done()
                expect(res.status).to.eql(403);
                expect(res.headers).to.have.property('content-type').eql("text/html; charset=utf-8")
            })

    });
    /* 
        */
});

describe("Create  and log a User", function () {
    it("Should response with 200 and create user in db ", (done) => {
        api
            .post(`/auth/register`)
            .send(userData)
            .end((err, res) => {
                if (err) return done()
                expect(res.body).have.property('token')
                expect(res.status).to.eql(200);
                expect(res.headers).to.have.property('content-type').eql("application/json; charset=utf-8")
                expect(res.body).to.be.an("object")
                done()
            })

    });
    it("Should response with 200 and return a token ", (done) => {
        const { email, password } = userData
        api
            .post(`/auth/login`)
            .send({ email, password })
            .end((err, res) => {
                if (err) return done()
                expect(res.status).to.eql(200);
                expect(res.headers).to.have.property('content-type').eql("application/json; charset=utf-8")
                expect(res.body).to.be.an("object")
                expect(res.body).have.property('token')
                done()
            })
    });
    it("Should response with error if email/password are incorrect", (done) => {
        const email = "fake@fake.com"
        const password = "123456"
        api
            .post(`/auth/login`)
            .send({ email, password })
            .end((err, res) => {
                if (err) return done()
                expect(res.status).to.eql(409);
                expect(res.headers).to.have.property('content-type').eql("application/json; charset=utf-8")
                expect(res.body).to.be.an("object")
                expect(res.body).have.property('error')
                done()
            })


    });



})
describe("Delete a  users ", function () {
    let idUser;

    before((done) => {
        api
            .get("/users")
            .set({ Authorization: tokenAdmin })
            .end((err, res) => {
                if (err) return done()
                idUser = res.body[res.body.length - 1].id
                done()
            })
    })
    it("Should not delete  if the user doesnt exist ", (done) => {
        const fakeId = 99999999
        api
            .delete(`/users/${fakeId}`)
            .set({ Authorization: tokenAdmin })
            .end((err, res) => {
                if (err) return done()
                expect(res.status).to.eql(400);
                expect(res.headers).to.have.property('content-type').eql("application/json; charset=utf-8")
                expect(res.body).to.be.an("object")
                expect(res.body).have.property('error')
                done()
            })
    });
    it("Should delete the user that match with id  ", (done) => {
        api
            .delete(`/users/${idUser}`)
            .set({ Authorization: tokenAdmin })
            .end((err, res) => {
                if (err) return done()
                expect(res.status).to.eql(200);
                expect(res.headers).to.have.property('content-type').eql("application/json; charset=utf-8")
                expect(res.body).to.be.an("object")
                expect(res.body).have.property('message')
                done()
            })
    });
    it("Should response with 400 when no token is given  ", (done) => {
        api
            .delete(`/users/${idUser}`)
            .end((err, res) => {
                if (err) return done()
                expect(res.status).to.eql(400);
                expect(res.headers).to.have.property('content-type').eql("text/html; charset=utf-8")
                done()
            })
    });
    it("Should response with 403 when role is invalid  ", (done) => {
        api
            .delete(`/users/${idUser}`)
            .set({ Authorization: tokenStandar })
            .end((err, res) => {
                if (err) return done()
                expect(res.status).to.eql(403);
                expect(res.headers).to.have.property('content-type').eql("text/html; charset=utf-8")
                done()
            })
    });
    it("Should response with 400 when user is alredy deleted  ", (done) => {
        api
            .delete(`/users/${idUser}`)
            .set({ Authorization: tokenAdmin })
            .end((err, res) => {
                if (err) return done()
                expect(res.status).to.eql(400);
                expect(res.headers).to.have.property('content-type').eql("application/json; charset=utf-8")
                expect(res.body).have.property("error")
                done()
            })

    });
})

describe("Get auth/me return info from the logged user", function () {

    it("Should response  with 200 and data from the user", (done) => {
        api
            .get('/auth/me')
            .set({ Authorization: tokenAdmin })
            .end((err, res) => {
                if (err) return done()
                expect(res.status).to.eql(200);
                expect(res.headers).to.have.property('content-type').eql("application/json; charset=utf-8")
                expect(res.headers).to.not.have.property('erorr')
                done()
            })
    })
    it("Should response with 400 when no token is given  ", (done) => {
        api
            .get('/auth/me')
            .end((err, res) => {
                if (err) return done()
                expect(res.status).to.eql(400);
                expect(res.headers).to.have.property('content-type').eql("text/html; charset=utf-8")
                done()
            })

    });
    it("Should response with 403 when token is invalid  ", async function () {
        api
            .get("/users")
            .set({ Authorization: tokenStandar })
            .end((err, res) => {
                if (err) return done()
                expect(res.status).to.eql(403);
                expect(res.headers).to.have.property('content-type').eql("text/html; charset=utf-8")
            })

    });


})