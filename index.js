require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const passportConfig = require("./middleware/passportConfig");
const cookie = require("cookie-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const users = require("./routes/users");
const auth = require("./routes/auth");
const city = require("./routes/city");
const keys = require("./config/keys");
const https = require("https");
const fs = require("fs");
// const privateKey = fs.readFileSync(
//   "/etc/letsencrypt/live/stagebe.letsmovehomie.com/privkey.pem",
//   "utf8"
// );
// const certificate = fs.readFileSync(
//   "/etc/letsencrypt/live/stagebe.letsmovehomie.com/cert.pem",
//   "utf8"
// );
// const ca = fs.readFileSync(
//   "/etc/letsencrypt/live/stagebe.letsmovehomie.com/chain.pem",
//   "utf8"
// );

// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca
// };
const port = process.env.PORT || 80;

app.use(express.json());
app.use(cors());
app.use(
  cookie({
    name: "letsmovehomie",
    maxAge: 24 * 60 * 60 * 1000, //set cookie to one day exp
    keys: [keys.session.cookieKey],
    domain: "letsmovehomie.com"
  })
);
app.use(express.static(__dirname, { dotfiles: "allow" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use("/city", city);
app.use("/users", users);
app.use("/auth", auth);

//Connect to MongoDB
mongoose
  .connect(keys.mongodb.dbURI, {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB successfully connected."))
  .catch(e => console.error(`Could not connect: ${e.message}`));

// const server = https.createServer(credentials, app);
// server.listen(port, () => {
//   console.log("server starting on port : " + port);
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
