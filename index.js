require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const basic = require("./routes/basic");
const auth = require("./routes/auth");
const passportConfig = require("./middleware/passportConfig");
const cookie = require("cookie-session");
const passport = require("passport");
const app = express();
const port = process.env.PORT || 3001;

//////////////////////////////////

app.use(express.json());
app.use(cors());
app.use(
  cookie({
    maxAge: 24 * 60 * 60 * 1000, //set cookie to one day exp
    keys: [process.env.key]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", basic);
app.use("/auth", auth);

//////////////////////////////////

mongoose
  .connect(
    `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${
      process.env.MONGO_HOSTNAME
    }:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch(e => console.error(`Could not connect ${e.message}`));

app.listen(port, () => {
  console.log(`server start on port ${port}`);
});
