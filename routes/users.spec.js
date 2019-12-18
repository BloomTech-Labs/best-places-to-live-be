const supertest = require('supertest');
const router = require('./users')


describe('login router', () => {
    describe('Post request to /', () => {
        it('should responds with 200 ok', () => {
           const data = {
              "email" :"kcmanjuthapa@gmail.com",
              "password":"testing"
           }
           supertest(router)
           .post("/login")
           .send(data)
           .expect(201)
           .expect('Content-Type', /json/i)
        });
    });
});

describe('register router', () => {
    describe('Post request to /', () => {
        it('should responds with 200 ok', () => {
           const data = {
               "name":"Fredo",
              "email" :"kcmanjuthapa@gmail.com",
              "password":"testing",
              "location":"Atlanta"
           }
           supertest(router)
           .post("/register")
           .send(data)
           .expect(201)
           .expect('Content-Type', /json/i)
        });
    });
});




