require("dotenv").config();
checkConfig();
const server = require('./server');


const port = process.env.PORT || 27017;
//Server should run this if it is working
server.listen(port, () => {
  console.log(`I'm up and running on port ${port}`);
});

 //From previous code. Checks environment variables
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
