const request = require('supertest');
const server = require('./server');
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('server.js', () => {
    describe('index route', () => {
        it('should return an OK status code from the index route', async () => {
            const expectedStatusCode = 200;
            const response = await request(server).get('/');
            expect(response.status).toEqual(expectedStatusCode);
        });
        it('should return a JSON object from the index route', async () => {
            const expectedBody = (200);
            const response = await request(server).get('/');
            expect(response.status).toEqual(expectedBody);
        });
        it('should return a JSON object from the index route', async () => {
            const response = await request(server).get('/');
            expect(response.type).toEqual('text/html');
        });
        
    });
});
describe('users', () => {
    describe('GET /', () => {
        it('should be able to get a positive response from the users router', (done) => {
            chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(res.status).toEqual(200);
                res.body.should.be.a('object');
                done();
            });
        });
        it('should not get a profile because you are not logged in', (done) => {
            
            chai.request(server)
            .get('/users/profile')
            .end((err, res ) => {
                expect(res.status).toEqual(403);
                done();
            });
        });
    });
});
// describe('profile', () => {
//     describe('GET /', () => {
//         it('should get NOT user info', (done) => {
//             chai.request(server)
//             .get('/profile')
//             .end((err, res) => {
//                 expect(res.status).toEqual(400);
//                 done();
//             });
//         });
//         it('should not be able to update user information', (done) => {
//             chai.request(server)
//             .put('/profile')
//             .end((err, res) => {
//                 expect(res.status).toEqual(401);
//                 done();
//             });
//         });
//     })
// })
describe('city', () => {
    describe('GET /', () => {
        it('should get city info', async (done) => {
            chai.request(server)
            .get('/city/all')
            .end((err, res) => {
                expect(res.status).toEqual(200);
                done();
            });
        });
//         it('should get top ten', async (done) => {
//             chai.request(server)
//             .get('/city/topten-score_total')
//             .end((err, res) => {
//                 expect(res.status).toEqual(200);
//                 done();
//             });
//     });
})})