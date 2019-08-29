require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const basic = require("./routes/basic");
const auth = require("./routes/auth");
const passportConfig = require("./middleware/passportConfig");
const cookie = require("cookie-session");
const passport = require("passport");
const expressLayouts = require('express-ejs-layouts');
const users = require('./routes/users');
const db = require('./config/keys')
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3001;

// Passport Config
require('./config/passport')(passport);

// app.use(express.json());
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

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars - custom middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Routes
app.use('/', basic);
app.use('/users', users);

//Connect to MongoDB
mongoose
  .connect(
    `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${
      process.env.MONGO_HOSTNAME
    }:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch(e => console.error(`Could not connect ${e.message}`));

app.listen(port, () => {
  console.log(`server start on port ${port}`);
});