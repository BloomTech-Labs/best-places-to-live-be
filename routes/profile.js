const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
//check if a user is in request sent
const authCheck = (req, res, next) => {
  const user = req.body;
  if (!user) {
    res.status(401).send(false);
  } else {
    next();
  }
};

////////////////////////////////////////////////////
////////////////////////////////////////////////////
///////////////////// USER PROFILE /////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////

router.get("/", authCheck, async (req, res) => {
  // console.log('i m here')
  console.log(req.params)
  // console.log("finished")
  let user = await User.findBy(req.user._id);
  res.json(user);
});

// router.get('/', authCheck, (req, res) => {
//   console.log(profile)
//   res.render('profile', { user: req.user });
// });

router.put("/", authCheck, async (req, res) => {
  let update = {};
  if (req.body.name.length) {
    update.name = req.body.name;
  }
  if (req.body.password) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 4);
    update.password = hashedPassword;
  }
  if (req.body.email) {
    update.email = req.body.email;
  }
  let id = req.user._id;
  let user = await User.findByIdAndUpdate(id, { $set: update }, { new: true });
  res.json(user);
});

////////////////////////////////////////////////////
////////////////////////////////////////////////////
///////////////////// USER CITIES //////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////

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
