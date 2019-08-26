const router = require("express").Router();
const passport = require("passport");
router.get(
  "/login",
  passport.authenticate("google", {
    scope: ["profile"]
  }),
  (req, res) => {
    res.send("login");
  }
);
