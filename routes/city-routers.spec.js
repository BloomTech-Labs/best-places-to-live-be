const supertest = require("supertest");
const router = require("./city");

describe("city router", () => {
  describe("Get request to /all", () => {
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

  describe("Post location request to /location",() => {
       let params =  lat = "";
       lng = "";
       zoom = "";
        limit = "";
        it("response with 200 OK", () => {
            supertest(router)
            .get("/location")
            .expect(200)
            .expect(params) 
            .expect("Content-Type", /json/i);
      })
  })
});
