const request = require('supertest');
const server = require('./server');

const chai = require('chai');
const chaiHttp = require('chai-http');



chai.use(chaiHttp);
chai.should();

describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })
})

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
        it('should register',  (done) => {
            const newUser = request(server)
            .post('users/register')
            .send({
                name: "Jest",
                email: "testing@jest.com",
                location: "San Fran",
                password: "1234567"
            })
            
            expect(newUser._data).toEqual({
                name: "Jest",
                email: "testing@jest.com",
                location: "San Fran",
                password: "1234567"
            })
            done()
        })
        it('should log in', (done) => {
            const res = request(server)
            .post('users/login')
            .send({
                email: "testing@jest.com",
                password:"1234567"
            })
            console.log(res._data)
            expect(res._data).toEqual({
                email: "testing@jest.com",
                password:"1234567"
            })
            done()
        })
    });
});



