const supertest = require("supertest");
const router = require("./city");

describe("city router", () => {
  describe("Get city request to /all", () => {
    it("response with 200 OK", () => {
      supertest(router)
        .get("/city/all")
        .expect(200);
    });
    it("is JSON content", () => {
      supertest(router)
        .get("/all")
        .expect("Content-Type", /json/i);
    });
  });

  describe("Post request to /city", () => {
    it("respone with 200 OK", () => {
      const data = {
        ids: ["5dc9f97b2a65b6af02024aea", "5dc9f97b2a65b6af02024ae7"]
      };
      supertest(router)
        .post("/city")
        .send(data)
        .expect(200)
        .expect("Content-Type", /json/i);
    });
  });

  describe("Post request to /city", () => {
    it("respone with 400 error", () => {
      const data = {
        ids: []
      };
      supertest(router)
        .post("/city")
        .send(data)
        .expect(400)
        .expect("Content-Type", /json/i);
    });
  });

  describe("Post location request to /location", () => {
    let params = {
      lat: "",
      lng: "",
      zoom: "",
      limit: ""
    };
    it("response with 200 OK", () => {
      supertest(router)
        .get("/city/location?lat=20&lng=70&zoom=30&limit=50")
        .expect(400)
        .expect(params)
        .expect("Content-Type", /json/i);
    });
  });

  describe("Post location request to /location", () => {
    let params = {
      lat: "",
      lng: "",
      zoom: "",
      limit: ""
    };
    it("response with 400 error", () => {
      supertest(router)
        .get("/city/location?lat=&lng=&zoom=&limit=")
        .expect(400)
        .expect(params)
        .expect("Content-Type", /json/i);
    });
  });

  describe("Post location request to /location", () => {
    let params = {
      lat: "",
      lng: "",
      zoom: "",
      limit: ""
    };
    it("response with 400 error", () => {
      supertest(router)
        .get("/city/location?lat=&lng=&zoom=40&limit=")
        .expect(400)
        .expect(params)
        .expect("Content-Type", /json/i);
    });
  });

  describe("Post location request to /location", () => {
    let params = {
      lat: "",
      lng: "",
      zoom: "",
      limit: ""
    };
    it("response with 400 error", () => {
      supertest(router)
        .get("/city/location?lat=&lng=&zoom=&limit=50")
        .expect(400)
        .expect(params)
        .expect("Content-Type", /json/i);
    });
  });

  describe("Get  city jobs data request to /jobs", () => {
    let params = {
      l: "",
      q: "",
      country: ""
    };
    it("response with 200 OK", () => {
      supertest(router)
        .get("/city/jobs?l=atlanata&q=software&country=US")
        .expect(200)
        .expect(params)
        .expect("Contest-Type", /json/i);
    });

    it("response with 400 error", () => {
      supertest(router)
        .get("/city/jobs")
        .expect(400)
        .expect()
        .expect(
          (message =
            "Please pass at least one req params l=location, q=quries(Eg: Software), country=country")
        )
        .expect("Contest-Type", /json/i);
    });

    describe("Post city search[filter] request to /search", () => {
      let data = {
        searchTerm: "Highland"
      };
      it("should response with 200 OK", () => {
        supertest(router)
          .post("/city/search")
          .expect(200)
          .expect(data)
          .expect("Contest-Type", /json/i);
      });
      describe("Post city search without body req", () => {
        let data = {
          searchTerm: ""
        };
        it("should response with 400 bad reequest", () => {
          supertest(router)
            .post("/city/search")
            .expect(400)
            .expect(data)
            .expect("Contest-Type", /json/i);
        });
      });

      describe("Post city filter by name ", () => {
        let token = "qweds12345";
        let data = {
          searchTerm: "test"
        };
        it("Should response with 200 OK", () => {
          supertest(router)
            .post("/city/spec-search?limit=10")
            .expect(200)
            .expect(data)
            .set({ Authorization: token })
            .expect("Contest-Type", /json/i);
        });
      });
      describe("Post city filter by name ", () => {
        let token = "qweds12345";
        let data = {
          searchTerm: ""
        };
        it("Should response with 400 bad request", () => {
          supertest(router)
            .post("/city/spec-search?limit=10")
            .expect(400)
            .expect(data)
            .set({ Authorization: token })
            .expect("Contest-Type", /json/i);
        });
      });
      describe("Post city filter by name ", () => {
        let token = "";
        let data = {
          searchTerm: ""
        };
        it("Should response with 400 bad request", () => {
          supertest(router)
            .post("/city/spec-search")
            .expect(400)
            .expect(data)
            .set({ Authorization: token })
            .expect("Contest-Type", /json/i);
        });
      });
      describe("Post data getting from ds side ", () => {
        let data = {
          input1: ["population", "avg_commute_time"]
        };
        it("Should response with 200 OK", () => {
            supertest(router)
            .post("/city/ds")
            .expect(200)
            .expect(data)
            .expect("contest-Type", /json/i)
        })
      });
      describe("Post data getting from ds side ", () => {
        let data = {
          input1: []
        };
        it("Should response with 400 bad request", () => {
            supertest(router)
            .post("/city/ds")
            .expect(400)
            .expect(data)
            .expect("contest-Type", /json/i)
        })
      });
    });
  });
});
