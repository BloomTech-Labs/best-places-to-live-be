require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const basic = require('./routes/basic');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use('/', basic);

mongoose
  .connect(
    `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`,
    {useNewUrlParser: true, useFindAndModify: false},
  )
  .then(() => console.log('Connected to MongoDB...'))
  .catch((e) => console.error(`Could not connect ${e.message}`));

app.listen(port, () => {
  console.log(`server start on port ${port}`);
});
