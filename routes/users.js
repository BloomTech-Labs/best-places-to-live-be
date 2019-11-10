const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const secrets = require('../config/secrets');
const tokenAuthentication = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, keys.jwtAuth.secret, (error, decodedToken) => {
    if (error) {
      res.status(403).json({
        message: "Please login to continue."
      });
    } else {
      req.decodedToken = decodedToken;
      next();
    }
  });
};

router.get("/profile", tokenAuthentication, async (req, res) => {
  const _id = req.decodedToken._id;

  try {
    const user = await User.findOne({ _id });

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        cities: user.cities
      });
    } else {
      res.status(400).json({
        message: "User does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving user from database."
    });
  }
});

router.put("/profile", tokenAuthentication, async (req, res) => {
  const _id = req.decodedToken._id;
  const userUpdates = req.body;

  if (userUpdates.name === null || userUpdates.name === "") {
    delete userUpdates.name;
  }

  if (userUpdates.email === null || userUpdates.email === "") {
    delete userUpdates.email;
  }

  if (userUpdates.password === null || userUpdates.password === "") {
    delete userUpdates.password;
  }

  try {
    const user = await User.findById(_id);

    if (user) {
      if (req.body.password) {
        const hashedPassword = bcrypt.hashSync(req.body.password, 4);
        userUpdates.password = hashedPassword;
      }

      const updatedUser = await User.findOneAndUpdate(
        {
          _id
        },
        {
          $set: userUpdates
        },
        {
          new: true
        }
      );

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        cities: updatedUser.cities
      });
    } else {
      res.status(400).json({
        message: "User does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating user in database."
    });
  }
});

router.post("/profile/cities", tokenAuthentication, async (req, res) => {
  const _id = req.decodedToken._id;
  const { city_name, city_id, city_photo } = req.body;

  const city = {
    _id: city_id,
    name: city_name,
    photo: city_photo
  };

  try {
    const user = await User.findOne({ _id });

    if (user) {
      const newCities = [...user.cities].concat([city]);

      const updatedUser = await User.findOneAndUpdate(
        {
          _id
        },
        {
          $set: {
            cities: newCities
          }
        },
        {
          new: true
        }
      );

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        cities: updatedUser.cities
      });
    } else {
      res.status(400).json({
        message: "User does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving user from database."
    });
  }
});

router.delete("/profile/cities", tokenAuthentication, async (req, res) => {
  const _id = req.decodedToken._id;
  const { city_id } = req.body;

  try {
    const user = await User.findOne({ _id });

    if (user) {
      const newCities = [...user.cities].filter(city => city._id !== city_id);

      const updatedUser = await User.findOneAndUpdate(
        {
          _id
        },
        {
          $set: {
            cities: newCities
          }
        },
        {
          new: true
        }
      );

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        cities: updatedUser.cities
      });
    } else {
      res.status(400).json({
        message: "User does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving user from database."
    });
  }
});
//Re-vamped this. It is readable now and DRY
// Login Page
router.post("/login", async (req, res) => {
  const credentials = req.body;
  
  // check required fields
  User.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({message: 'Welcome!'})
        console.log(token)
      } else {
        res.status(401).json({message: 'Invalid Credentials'});
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
  

  
});
//Most of this is old code and I need to come back to this to make sure it is working.
// Register Handle
router.post("/register", async (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 7)

  // check required fields
  if (!name || !email || !password || !password2) {
    res.status(400).json({
      message: "Please fill in all fields."
    });
    // check pass length
  } else if (password.length < 6) {
    res.status(500).json({
      message: "Password must be at least 6 characters"
    });
    // check passwords match
  } else if (password !== password2) {
    res.status(400).json({
      message: "Passwords do not match."
    });
  } else {
    try {
      const user = await User.findOne({ email });

      if (user) {
        res.status(500).json({
          message: "User already exists. Please login to continue"
        });
      } else {
        const hashedPassword = bcrypt.hashSync(password, 6);

        const newUser = new User({
          name,
          email,
          password: hashedPassword
        });

        const userSaved = await newUser.save();

        const token = jwt.sign(
          {
            _id: userSaved._id,
            name: userSaved.name,
            email: userSaved.email
          },
          keys.jwtAuth.secret,
          { expiresIn: "24h" }
        );

        res.status(200).json({
          _id: userSaved._id,
          name: userSaved.name,
          email: userSaved.email,
          token
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error registering."
      });
    }
  }
});
//Creates token used in login
function generateToken(user){
  const payload = {
    subject: user.id,
    email: user.email
  }
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
