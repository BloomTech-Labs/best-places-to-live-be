const keys = require("../config/keys");
const passport = require("passport");
const google = require("passport-google-oauth20");
const facebook = require("passport-facebook");
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
      callbackURL: "/auth/redirect/facebook",
      clientID: keys.googleAuth.googleClientId,
      clientSecret: keys.googleAuth.googleClientSecret
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

//send information to google and add the user to mongodb if they arent already in the system
passport.use(
  new facebook(
    {
      //options for google oauth20
      callbackURL: "/auth/redirect",
      clientID: keys.facebookAuth.facebookClientId,
      clientSecret: keys.facebookAuth.facebookClientSecret
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
