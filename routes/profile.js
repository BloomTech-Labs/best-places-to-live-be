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
  let cities = await User.findById(req.user._id);
  res.json(cities.saveCities);
});
router.post("/cities", authCheck, async (req, res) => {
  //find user
  await User.findById(req.user._id).then(userbefore => {
    //find city in the user. if it doesnt exists add it.
    if (!userbefore.saveCities.includes(req.body.city)) {
      User.findByIdAndUpdate(
        req.user._id,
        { $push: { saveCities: req.body.city } },
        { new: true }
      ).then(userafter => {
        res.json(userafter);
      });
    } else {
      res.status(400).json("Already have that city");
    }
  });
});
router.delete("/cities", authCheck, async (req, res) => {
  //find user
  await User.findById(req.user._id).then(userbefore => {
    //find city in the user. if it exists remove it.
    if (userbefore.saveCities.includes(req.body.city)) {
      //filter out city
      let newCities = userbefore.saveCities.filter(item => {
        return item !== req.body.city;
      });
      //update user with the cities
      User.findByIdAndUpdate(
        req.user._id,
        { $set: { saveCities: newCities } },
        { new: true }
      ).then(userafter => {
        res.json(userafter);
      });
    } else {
      res.status(400).json("Dont have that city");
    }
  });
});

module.exports = router;
