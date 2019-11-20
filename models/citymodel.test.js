var chai = require("chai"),
  model = require("./city");

chai.should();

describe("Testing schema (/city)", () => {
  describe("City", () => {
    schema = model.schema.paths;

    it("should have property 'air-pollution-telescore' ", done => {
      schema.should.have.property("air-pollution-telescore");
      schema["air-pollution-telescore"].options.type.should.be.equal(Number);
      done();
    });

    it("should have property 'grade_business_freedom' ", done => {
      schema.should.have.property("grade_business_freedom");
      schema["grade_business_freedom"].options.type.should.be.equal(String);
      done();
    });
    
    it("should have property 'score_cost_of_living' ", done => {
      schema.should.have.property('score_cost_of_living');
      schema['score_cost_of_living'].options.type.should.be.equal(Number);
      done();
    });

    
  });
});
