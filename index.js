require("dotenv").config();
checkConfig();
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
const profile = require("./routes/profile");
const keys = require("./config/keys");
const https = require("https");
const credentials = require("./config/ssl");

const port = process.env.PORT || 443;

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
app.use("/profile", profile);



//Connect to MongoDB
mongoose
  .connect(keys.mongodb.dbURI, {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB successfully connected."))
  .catch(e => console.error(`Could not connect: ${e.message}`));

if (credentials) {
  const server = https.createServer(credentials, app);
  server.listen(port, () => {
    console.log("server starting on port : " + port);
  });
} else {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

function checkConfig() {
  if (
    !process.env.GOOGLE_CLIENTID ||
    !process.env.GOOGLE_CLIENTSECRET ||
    !process.env.FACEBOOK_CLIENTID ||
    !process.env.FACEBOOK_CLIENTSECRET ||
    !process.env.MONGO_USERNAME ||
    !process.env.MONGO_PASSWORD ||
    !process.env.MONGO_HOSTNAME ||
    !process.env.MONGO_PORT ||
    !process.env.MONGO_DB ||
    !process.env.COOKIE_KEY
  )
    throw "You must have the appropriate *.env File to launch this project.";
}
