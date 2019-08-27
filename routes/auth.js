const router = require("express").Router();
const passport = require("passport");

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.send("you are not logged in");
  } else {
    next();
  }
};

router.get(
  "/login",
  passport.authenticate("google", {
    scope: ["profile"]
  }),
  (req, res) => {
    res.send("login");
  }
);
router.get("/logout", (req, res) => {
  req.logOut();
  req.session = null;
  res.send("you have logged out");
});
router.get("/redirect", passport.authenticate("google"), (req, res) => {
  res.send(req.user);
});

router.get("/profile", authCheck, (req, res) => {
  console.log(req.user);
  res.send(`you are logged in hello ${req.user.profile.displayName}`);
});
module.exports = router;
