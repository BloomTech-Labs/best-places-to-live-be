require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const basic = require('./routes/basic');
const users = require('./routes/users');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Routes
app.use('/', basic);
app.use('/users', users);

mongoose
  .connect(
        // Doesn't work!
    // `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`,

        //Locally on Compass - works!
    "mongodb://localhost/bestplaces",

      // Atlas Cloud - works! - env variables work -!
    // `mongodb+srv://${process.env.TESTING_MONGO_USERNAME}:${process.env.TESTING_MONGO_PASSWORD}@${process.env.TESTING_MONGO_HOSTNAME}?retryWrites=true&w=majority`,

    {useNewUrlParser: true, useFindAndModify: false},
  )
  .then(() => console.log('Connected to MongoDB...'))
  .catch((e) => console.error(`Could not connect ${e.message}`));

app.listen(port, () => {
  console.log(`server start on port ${port}`);
});
