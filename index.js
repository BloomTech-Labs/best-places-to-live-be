const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

//////////////////////////////////

app.use(express.json());
app.use(cors());

//////////////////////////////////

mongoose
  .connect(
    `mongodb://${env.USER}:${env.PASS}@${env.URL}:${
      env.PORTMONGO
    }/BPTL?authSource=admin`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch(e => console.error(`Could not connect ${e.message}`));
