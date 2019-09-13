const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");

//check if a user is in request sent
const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).send(false);
  } else {
    next();
  }
};

router.get("/cities", authCheck, async (req, res) => {
  console.log(req.user);
  let cities = await User.findById(req.user._id);
  res.json(cities.saveCities);
});
router.post("/cities", authCheck, async (req, res) => {
  console.log(req.user);
  await User.findById(req.user._id).then(user => {
    if (!user.saveCities.includes(req.body.cities)) {
      User.findByIdAndUpdate(
        req.user._id,
        { $push: { saveCities: req.body.cities } },
        { new: true }
      ).then(city => {
        res.json(city);
      });
    } else {
      res.status(400).json("Already have that city");
    }
  });
});

module.exports = router;
