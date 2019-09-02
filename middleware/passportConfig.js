const keys = require("../config/keys");
const passport = require("passport");
const google = require("passport-google-oauth20");
const User = require("../models/user");

//get user and add it to req.user
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//send information to google and add the user to mongodb if they arent already in the system
passport.use(
  new google(
    {
      //options for google oauth20
      callbackURL: "http://localhost:3001/auth/redirect",
      clientID: keys.googleAuth.clientId,
      clientSecret: keys.googleAuth.clientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile._json.email }).then(user => {
        if (user) {
          console.log("Already exists");
          done(null, user);
        } else {
          new User({
            name: profile.displayName,
            email: profile._json.email
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
