var chai = require('chai'),
request = require('supertest'),
server = require('../server.js')
model = require('./user')


chai.should();

describe('REST API (/users)', function () {
    var json = {
        name: 'user',
        email: 'user@email.com',
        password: '1234567890',
        location:'ga',
        
      };
      describe('Schema', function (){

        schema = model.schema.paths;


    it('should have property \'name\' correctly', function (done) {

        schema.should.have.property('name');
        schema.name.options.type.should.be.equal(String);
  
        done();
  
      });
      it('should have property \'email\' correctly', function (done) {

        schema.should.have.property('email');
        schema.name.options.type.should.be.equal(String);
  
        done();
  
      });
      it('should have property \'passsword\' correctly', function (done) {

        schema.should.have.property('password');
        schema.name.options.type.should.be.equal(String);
  
        done();
  
      });

      it('should have property \'location\' correctly', function (done) {

        schema.should.have.property('location');
        schema.name.options.type.should.be.equal(String);
  
        done();
  
      });

       
      });    
});
