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

    it("should have property 'score_healthcare' ", done => {
     schema.should.have.property('score_healthcare');
     schema['score_healthcare'].options.type.should.be.equal(Number);
     done();
    });

   it("should have property 'weather-average-high' ", done => {
    schema.should.have.property('weather-average-high');
    schema['weather-average-high'].options.type.should.be.equal(String);
    done();
   });

   it("should have property 'startup-jobs-available-telescore'", done => {
    schema.should.have.property('startup-jobs-available-telescore');
    schema['startup-jobs-available-telescore'].options.type.should.be.equal(Number);
    done();
   });

   it("should have property 'weather-average-low' ", done => {
    schema.should.have.property('weather-average-low');
    schema['weather-average-low'].options.type.should.equal(String);
    done();
   });
   
   it("should have property 'state' ", done => {
    schema.should.have.property('state');
    schema['state'].options.type.should.equal(String);
    done();
   });

   it("should have property 'score_taxation' ", done => {
    schema.should.have.property('score_taxation');
    schema['score_taxation'].options.type.should.equal(Number);
    done();
   });
 
  it("should have property ' score_safety' ", done => {
    schema.should.have.property('score_safety');
    schema['score_safety'].options.type.should.equal(Number);
    done();
  });

  it("should have property ' score_education' ", done => {
    schema.should.have.property('score_education');
    schema['score_education'].options.type.should.equal(Number);
    done();
  });
   
  it("should have property 'score_environmental_quality' ", done => {
    schema.should.have.property('score_environmental_quality');
    schema['score_environmental_quality'].options.type.should.equal(Number);
    done();
  });

  it("should have property 'score_housing' ", done => {
    schema.should.have.property('score_housing');
    schema['score_housing'].options.type.should.equal(Number);
    done();
  });

  it("should have property ' score_internet_access' ", done => {
    schema.should.have.property('score_internet_access');
    schema['score_internet_access'].options.type.should.equal(Number);
    done();
  });

  it("should have property 'startup-salaries' ", done => {
    schema.should.have.property('startup-salaries');
    schema['startup-salaries'].options.type.should.equal(Number);
    done();
  });

  it("should have property 'weather-type' ", done => {
    schema.should.have.property('weather-type');
    schema['weather-type'].options.type.should.equal(String);
    done();
  });

  it("should have property 'weather-type' ", done => {
    schema.should.have.property('weather-type');
    schema['weather-type'].options.type.should.equal(String);
    done();
  });

  it("should have property  'apartment-rent-large' ", done => {
    schema.should.have.property('apartment-rent-large');
    schema['apartment-rent-large'].options.type.should.equal(Number);
    done();
  });

  it("should have property  'apartment-rent-medium' ", done => {
    schema.should.have.property('apartment-rent-medium');
    schema['apartment-rent-medium'].options.type.should.equal(Number);
    done();
  });

  it("should have property  'apartment-rent-small' ", done => {
    schema.should.have.property('apartment-rent-small');
    schema['apartment-rent-small'].options.type.should.equal(Number);
    done();
  });

 
});
});
