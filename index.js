require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passportConfig = require("./middleware/passportConfig");
const cookie = require("cookie-session");
const passport = require("passport");
const users = require("./routes/users");
const auth = require("./routes/auth");
const db = require("./config/keys");
const session = require("express-session");
const city = require("./routes/city");

const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 3001;

// Passport Config
require("./config/passport")(passport);

app.use(express.json());
app.use(cors());
app.use(
  cookie({
    maxAge: 24 * 60 * 60 * 1000, //set cookie to one day exp
    keys: [process.env.key],
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use("/users", users);
app.use("/city", city);
app.use("/auth", auth);

// Express body parser
app.use(express.urlencoded({extended: true}));

// Express Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect to MongoDB
mongoose
  .connect(db.mongoURI, {useNewUrlParser: true})
  .then(() => console.log("MongoDB successfully connected."))
  .catch((e) => console.error(`Could not connect: ${e.message}`));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
