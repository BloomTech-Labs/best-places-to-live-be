const supertest = require("supertest");
const router = require("./city");

describe("city router", () => {
  describe("Get city request to /all", () => {
    it("response with 200 OK", () => {
      supertest(router)
        .get("/all")
        .expect(200);
    });
    it("is JSON content", () => {
      supertest(router)
        .get("/all")
        .expect("Content-Type", /json/i);
    });
  });

  describe("Post request to /city",() => {
      it("respone with 200 OK", () => {
         const data = {      
	ids: ["5dc9f97b2a65b6af02024aea", "5dc9f97b2a65b6af02024ae7"]  
         } 
         supertest(router)
        .post("/city")
        .send(data)
        .expect(200)
        .expect("Content-Type", /json/i);
      });
      
  })

  describe("Post location request to /location",() => {
       let params =  
       lat = "50";
       lng = "70";
       zoom = "180";
        limit = "60";
        it("response with 200 OK", () => {
            supertest(router)
            .get("/location")
            .expect(200)
            .expect(params) 
            .expect("Content-Type", /json/i);
      })
  })

});


