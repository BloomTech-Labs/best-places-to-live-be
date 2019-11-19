const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
    describe('index route', () => {
        it('should return an OK status code from the index route', async () => {
            const expectedStatusCode = 200;
            const response = await request(server).get('/');
            expectedStatusCode(response.status).toEqual(expectedStatusCode);
        });
    })
})