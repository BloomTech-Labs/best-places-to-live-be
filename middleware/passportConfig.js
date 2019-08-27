const passport = require("passport");
const google = require("passport-google-oauth20");
const { User } = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new google(
    {
      //options for google oauth20
      callbackURL: "http://localhost:3001/auth/redirect",
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      User.findOne({ profile }).then(user => {
        if (user) {
          console.log("Already exists");
          done(null, user);
        } else {
          new User({
            profile,
            accessToken,
            refreshToken
          })
            .save()
            .then(user => {
              done(null, user);
            });
          console.log(profile);
        }
      });
    }
  )
);
