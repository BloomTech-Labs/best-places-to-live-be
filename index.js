require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const basic = require('./routes/basic');
const users = require('./routes/users');
const db = require('./config/keys')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 3001;

// Passport Config
require('./config/passport')(passport);

// app.use(express.json());
app.use(cors());

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
  next();
});

//Routes
app.use('/', basic);
app.use('/users', users);

//Connect to MongoDB
mongoose
  .connect(
     db.mongoURI,
    {useNewUrlParser: true, useFindAndModify: false},
  )
  .then(() => console.log('Connected to MongoDB...'))
  .catch((e) => console.error(`Could not connect ${e.message}`));

app.listen(port, () => {
  console.log(`server start on port ${port}`);
});
