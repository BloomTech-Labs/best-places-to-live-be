const passport = require("passport");
const google = require("passport-google-oauth20");

passport.use(
  new google(
    {
      //options for google oauth20
      callbackURL: "/auth/google/redirect",
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET
    },
    () => {}
  )
);
