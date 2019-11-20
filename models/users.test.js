var chai = require("chai"),
model = require("./user");

chai.should();

describe("Testing schema (/users)", function() {
  describe("User", function() {
    schema = model.schema.paths;

    it("should have property 'name' correctly", function(done) {
      schema.should.have.property("name");
      schema.name.options.type.should.be.equal(String);
      done();
    });

    it("should have property 'email' correctly", function(done) {
      schema.should.have.property("email");
      schema.email.options.type.should.be.equal(String);
      done();
    });

    it("should have property 'passsword' correctly", function(done) {
      schema.should.have.property("password");
      schema.name.options.type.should.be.equal(String);
      done();
    });

    it("should have property 'location' correctly", function(done) {
      schema.should.have.property("location");
      schema.location.options.type.should.be.equal(String);
      done();
    });
  });
});
