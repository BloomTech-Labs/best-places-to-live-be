const supertest = require("supertest");
const router = require("./users");

describe("login router", () => {
  describe("Post request to /login", () => {
    it("should responds with 200 ok", () => {
      let token = "";
      const data = {
        email: "kcmanjuthapa@gmail.com",
        password: "testing"
      };
      supertest(router)
        .post("/login")
        .send(data)
        .expect(200)
        .set({ Authorization: (token) })
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
        email: "testing@gmail.com",
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
  describe("Post request to /register", () => {
    it("should responds with 200 ok", () => {
      let token
      const data = {
        name: "Fredo",
        email: "kcmanjuthapa@gmail.com",
        password: "testing",
        location: "Atlanta"
      };
      supertest(router)
        .post("/register")
        .send(data)
        .expect(200)
        .set({ Authorization: (token) })
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

describe("signup router", () => {
  describe("Post request to /signup", () => {
    it("should responds with 200 ok", () => {
      let token
      const data = {
        name: "Fredo",
        email: "kcmanjuthapa@gmail.com",
        password: "testing",
        location: "Atlanta",
        AppleId: "1235467890"
      };
      supertest(router)
        .post("/register")
        .send(data)
        .expect(200)
        .set({ Authorization: (token) })
        .expect("Content-Type", /json/i);
    });
    it("should responds with 400 Bad Response", () => {
      const data = {
        name: "",
        email: "kcmanjuthapa@gmail.com",
        password: "",
        location: "Atlanta",
        appleId: ""
      };
      supertest(router)
        .post("/signup")
        .send(data)
        .expect(400)
        .expect("Content-Type", /json/i);
    });
    it("should response with 400 Bad Response", () => {
      const data = {
        name: "Fredo",
        email: "",
        password: "",
        location: "",
        appleId: "1234567890"
      };
      supertest(router)
        .post("/signup")
        .send(data)
        .expect(400)
        .expect("Content-Type", /json/i);
    });
    it("should response with 400 Bad Response", () => {
      const data = {
        name: "Fredo",
        email: "",
        password: "",
        location: "",
        appleId: ""
      };
      supertest(router)
        .post("/signup")
        .send(data)
        .expect(400)
        .expect("Content-Type", /json/i);
    });
    it("should response with 400 Bad Response", () => {
      const data = {
        name: "",
        email: "",
        password: "",
        location: "",
        appleId: ""
      };
      supertest(router)
        .post("/signup")
        .send(data)
        .expect(400)
        .expect("Content-Type", /json/i);
    });
  });
});

describe("signin router /signin", () => {
  it("should response with 200 ok ", () => {
    let token
    const data = {
      appleId: "1234567890",
      password: "testing"
    };
    supertest(router)
      .post("/signin")
      .send(data)
      .expect(200)
      .set({ Authorization: (token) })
      .expect("Content-Type", /json/i);
  });
  it("should response with 400 bad response", () => {
    const data = {
      appleId: "",
      password: "testing"
    };
    supertest(router)
      .post("/signin")
      .send(data)
      .expect(400)
      .expect("Contest-Type", /json/i);
  });
  it("should response with 400 bad response", () => {
    const data = {
      appleId: "",
      password: ""
    };
    supertest(router)
      .post("/signin")
      .send(data)
      .expect(400)
      .expect("contest-Type", /json/i);
  });
});

describe("Post require to /factors", () => {
  it("should response with 200 ok", () => {
    const data = {
      newFactor: "Schools"
    };
    supertest(router)
      .post("/factors")
      .send(data)
      .expect(200)
      .expect("contest-Type", /json/i);
  });
  it("should response with 400 bad request", () => {
    const data = {
      newFactor: ""
    };
    supertest(router)
      .post("/factors")
      .send(data)
      .expect(400)
      .expect("contest-Type", /json/i);
  });
});

describe("Factors router", () => {
  describe("Put require to /factors", () => {
    it("should response with 200 ok", () => {
      const data = {
        putFactor: "ololo"
      };
      supertest(router)
        .put("/factors")
        .send(data)
        .expect(200)
        .expect("contest-Type", /json/i);
    });
  });
  
});
