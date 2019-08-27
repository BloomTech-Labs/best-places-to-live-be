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
// const key = fs.readFileSync("./ssl/backend.key");
// const cert = fs.readFileSync("./ssl/backend.crt");
const app = express();
const port = process.env.PORT || 3001;
// const options = {
//   key: key,
//   cert: cert
// };

//////////////////////////////////

app.use(express.json());
app.use(cors());
app.use(
  cookie({
    maxAge: 24 * 60 * 60 * 1000,
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
    `mongodb://admin:admin1@ds211268.mlab.com:11268/best-places`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch(e => console.error(`Could not connect ${e.message}`));

// const server = https.createServer(options, app);
//
// server.listen(port, () => {
//   console.log(`server start on port ${port}`);
// });

app.listen(port, () => {
  console.log(`server start on port ${port}`);
});
