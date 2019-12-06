const request = require('supertest');
const server = require('../server');

const chai = require('chai');
const chaiHttp = require('chai-http');

//Test authCheck
describe('testing auth', () => {
    it('Should allow me to pass through', (done) => {
        
        const user = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGU3ZmZiMTFkMmFjZjAwMTc5NzJiZWIiLCJuYW1lIjoiQXJ5YSIsImVtYWlsIjoic3Rua3lAYmFieS5jb20iLCJpYXQiOjE1NzU1OTQ2NDQsImV4cCI6MTU3NTY4MTA0NH0.8RRy-Biw3EbAqJ5npn-HZkT-KWqk5URprvkKIzjhLvo";
        let res = request(server)
        .get('/')
        .send(user)
        console.log(res.json)
        expect(res.json).toEqual("")
    })
 
    //Test GETs
    
})



//Test PUTs

//Test POSTs

//Test DEL