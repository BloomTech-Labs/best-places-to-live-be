const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const basic = require("./routes/basic");
const key = fs.readFileSync("./ssl/backend.key");
const cert = fs.readFileSync("./ssl/backend.crt");
const app = express();
const port = env.PORT || 3001;
const options = {
  key: key,
  cert: cert
};

//////////////////////////////////

app.use(express.json());
app.use(cors());
app.use("/", basic);

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

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`server start on port ${port}`);
});
