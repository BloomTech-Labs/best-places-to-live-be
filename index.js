require("dotenv").config();
checkConfig();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const server = require('./server');
const credentials = require("./config/ssl");
const https = require("https");
const port = process.env.PORT || 443;


//Connect to MongoDB
mongoose
  .connect(keys.mongodb.dbURI, {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB successfully connected."))
  .catch(e => console.error(`Could not connect: ${e.message}`));

if (credentials) {
  const app = https.createServer(credentials, app);
  app.listen(port, () => {
    console.log("server starting on port : " + port);
  });
} else {
  server.listen(port, () => {
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
