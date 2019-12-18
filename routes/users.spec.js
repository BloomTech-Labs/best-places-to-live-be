const supertest = require("supertest");
const router = require("./users");

describe("login router", () => {
  describe("Post request to /", () => {
    it("should responds with 200 ok", () => {
      const data = {
        email: "kcmanjuthapa@gmail.com",
        password: "testing"
      };
      supertest(router)
        .post("/login")
        .send(data)
        .expect(201)
        .expect("Content-Type", /json/i);
    });

    it("should responds with 400 Bad Request", () => {
      const data = {
        email: "kcmanjuthapa@gmail.com",
        password: ""
      };
      supertest(router)
        .post("/login")
        .send(data)
        .expect(400)
        .expect("Content-Type", /json/i);
    });
    it("should responds with 400 Bad Request", () => {
      const data = {
        email: "",
        password: "testing"
      };
      supertest(router)
        .post("/login")
        .send(data)
        .expect(400)
        .expect("Content-Type", /json/i);
    });
    it("should responds with 400 Bad Request", () => {
        const data = {
          email: "",
          password: ""
        };
        supertest(router)
          .post("/login")
          .send(data)
          .expect(400)
          .expect("Content-Type", /json/i);
      });
  });
});

describe("register router", () => {
  describe("Post request to /", () => {
    it("should responds with 200 ok", () => {
      const data = {
        name: "Fredo",
        email: "kcmanjuthapa@gmail.com",
        password: "testing",
        location: "Atlanta"
      };
      supertest(router)
        .post("/register")
        .send(data)
        .expect(201)
        .expect("Content-Type", /json/i);
    });
    it("should responds with 400 Bad Request", () => {
      const data = {
        name: "Fredo",
        email: "kcmanjuthapa@gmail.com",
        password: "",
        location: ""
      };
      supertest(router)
        .post("/register")
        .send(data)
        .expect(400)
        .expect("Content-Type", /json/i);
    });
    it("should responds with 400 Bad Request", () => {
      const data = {
        name: "",
        email: "",
        password: "testing",
        location: "Atlanta"
      };
      supertest(router)
        .post("/register")
        .send(data)
        .expect(400)
        .expect("Content-Type", /json/i);
    });
    it("should responds with 400 Bad Request", () => {
      const data = {
        name: "",
        email: "",
        password: "",
        location: ""
      };
      supertest(router)
        .post("/register")
        .send(data)
        .expect(400)
        .expect("Content-Type", /json/i);
    });
  });
});
