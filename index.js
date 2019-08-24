require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const basic = require('./routes/basic');
const users = require('./routes/users');
const db = require('./config/keys')

const app = express();
const port = process.env.PORT || 3001;

// app.use(express.json());
app.use(cors());

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

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
