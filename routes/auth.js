const router = require("express").Router();
const passport = require("passport");
const options = {
  maxAge: 24 * 60 * 60 * 1000, //set cookie to one day exp
  keys: [process.env.key]
};
//check if a user is in request sent
const authCheck = (req, res, next) => {
  if (!req.user) {
    res.send("you are not logged in");
  } else {
    next();
  }
};

//send a request to google to have or see if user is logged in
router.get(
  "/login",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  (req, res) => {
    res.send("login");
  },
);
//clear all sessions of cookies etc
router.get("/logout", (req, res) => {
  req.logOut();
  req.session = null;
  res.send("you have logged out");
});
//Redirect url for user
router.get("/redirect", passport.authenticate("google"), (req, res) => {
  console.log(req.cookies["express:sess"]);
  res.cookie("express:sess", req.cookies["express:sess"]);
  res.cookie("express:sess.sig", req.cookies["express:sess.sig"]);
  console.log(res.cookie);
  res.status(303).redirect("http://stagefe.letsmovehomie.com/topten");
});
//Check for authentication
router.get("/profile", authCheck, (req, res) => {
  console.log(req.user);
  res.send(`you are logged in hello ${req.user.name}`);
});
module.exports = router;
