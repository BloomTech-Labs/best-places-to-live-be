const passport = require("passport");
const google = require("passport-google-oauth20");
const { User } = require("../models/User");

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
      callbackURL: "http://stagingbe.letsmovehomie.com:3001/auth/redirect",
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      User.findOne({ providerid: profile.id }).then(user => {
        if (user) {
          console.log("Already exists");
          done(null, user);
        } else {
          new User({
            accessToken,
            refreshToken,
            providerid: profile.id,
            provider: profile.provider,
            name: profile.displayName,
            email: profile._json.email,
            locale: profile._json.locale,
            created_at: Date.now()
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
