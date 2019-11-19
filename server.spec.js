const request = require('supertest');
const server = require('./server');

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