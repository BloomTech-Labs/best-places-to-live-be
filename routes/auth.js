const router = require("express").Router();
const passport = require("passport");

//check if a user is in request sent
const authCheck = (req, res, next) => {
  if (!req.user) {
    res.send(false);
  } else {
    next();
  }
};

//send a request to google to have or see if user is logged in
router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  }),
  (req, res) => {
    res.send("login");
  }
);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

router.get(
  "/login/facebook/cb",
  passport.authenticate("facebook", {
    successRedirect: '/',
    failureRedirect: '/login'
  }),
  (req, res) => {
    res.send("login");
  }
);

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { successRedirect: '/',
//                                       failureRedirect: '/login' }));

//clear all sessions of cookies etc
router.get("/logout", (req, res) => {
  req.logOut();
  req.session = null;
  res.send("you have logged out");
});

//Redirect url for user
router.get("/redirect/google", passport.authenticate("google"), (req, res) => {
  console.log(req.cookies["letsmovehomie"]);
  res.cookie("letsmovehomie", req.cookies["letsmovehomie"], {
    domain: "letsmovehomie.com"
  });
  res.cookie("letsmovehomie.sig", req.cookies["letsmovehomie.sig"], {
    domain: "letsmovehomie.com"
  });
  res.status(303).redirect("https://stagefe.letsmovehomie.com/topten");
});
//Redirect url for user
// router.get(
//   "/redirect/facebook",
//   passport.authenticate("facebook"),
//   (req, res) => {
//     console.log(req.cookies["letsmovehomie"]);
//     res.cookie("letsmovehomie", req.cookies["letsmovehomie"], {
//       domain: "letsmovehomie.com"
//     });
//     res.cookie("letsmovehomie.sig", req.cookies["letsmovehomie.sig"], {
//       domain: "letsmovehomie.com"
//     });
//     res.status(303).redirect("https://stagefe.letsmovehomie.com/topten");
//   }
// );

//Check for authentication
router.get("/validation", authCheck, (req, res) => {
  res.send(true);
});

module.exports = router;
