const express = require("express");
const router = express.Router();
const User = require("../models/user");
const City = require("../models/city");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

// ==== Local middleware ====

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

const cityCheck = (req, res, next) => {
  if (req.body.city_id.length) {
    next();
  } else {
    res.status(403).json({ message: "Please, include city data" });
  }
};

const cityDoubleCheck = async (req, res, next) => {
  const _id = req.decodedToken._id;
  const { city_id } = req.body;
  let found = false;

  const likedCity = {
    _id: city_id
  };

  const user = await User.findOne({ _id });

  for (var i = 0; i < user.likes.length; i++) {
    if (user.likes[i]._id == likedCity._id) {
      found = true;
      break;
    }
  }

  if (found === false) {
    next();
  } else {
    res.status(403).json({ message: "Duplicate of city" });
  }
};

const cityDoubleCheckDis = async (req, res, next) => {
  const _id = req.decodedToken._id;
  const { city_id } = req.body;
  let found = false;

  const dislikedCity = {
    _id: city_id
  };

  const user = await User.findOne({ _id });

  for (var i = 0; i < user.dislikes.length; i++) {
    if (user.dislikes[i]._id == dislikedCity._id) {
      found = true;
      break;
    }
  }

  if (found === false) {
    next();
  } else {
    res.status(403).json({ message: "Duplicate of city" });
  }
};

const factorCheck = (req, res, next) => {
  if (req.body.newFactor.length) {
    next();
  } else {
    res.status(403).json({ message: "Please, include factor data" });
  }
};

const factorPutCheck = (req, res, next) => {
  if (req.body.putFactors.length) {
    next();
  } else {
    res.status(403).json({ message: "Please, include factors data" });
  }
};

const factorDoubleCheck = async (req, res, next) => {
  const _id = req.decodedToken._id;
  const { newFactor } = req.body;
  let found = false;

  const user = await User.findOne({ _id });

  for (var i = 0; i < user.factors.length; i++) {
    if (user.factors[i] === newFactor) {
      found = true;
      break;
    }
  }

  if (found === false) {
    next();
  } else {
    res.status(403).json({ message: "Duplicate of factors" });
  }
};

// ===== End of local middleware ====

router.get("/profile", tokenAuthentication, async (req, res) => {
  const _id = req.decodedToken._id;

  try {
    const user = await User.findOne({ _id });

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
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

  if (userUpdates.location === null || userUpdates.location === "") {
    delete userUpdates.location;
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
        location: updatedUser.location,
        cities: updatedUser.cities
      });
    } else {
      res.status(400).json({
        message: "User does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating user in database."
    });
  }
});

router.get("/info", tokenAuthentication, async (req, res) => {
  const _id = req.decodedToken._id;

  try {
    const user = await User.findOne({ _id });

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        appleId: user.appleId,
        location: user.location,
        cities: user.cities,
        likes: user.likes,
        dislikes: user.dislikes,
        factors: user.factors
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

// ===== Likes =====

router.post(
  "/likes",
  tokenAuthentication,
  cityCheck,
  cityDoubleCheck,
  async (req, res) => {
    const _id = req.decodedToken._id;
    const { city_id } = req.body;

    const likedCity = {
      _id: city_id
    };
    try {
      const user = await User.findOne({ _id });
      if (user) {
        const cities = await City.find(likedCity);
        const newLike = [...user.likes].concat([cities[0]]);

        const updatedUser = await User.findOneAndUpdate(
          {
            _id
          },
          {
            $set: {
              likes: newLike
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
          likes: updatedUser.likes,
          dislikes: updatedUser.dislikes,
          factors: updatedUser.factors
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
  }
);

router.delete("/likes", tokenAuthentication, async (req, res) => {
  const _id = req.decodedToken._id;
  const { city_id } = req.body;
  try {
    const user = await User.findOne({ _id });
    if (user) {
      const newLikes = [...user.likes].filter(city => city._id != city_id);
      const updatedUser = await User.findOneAndUpdate(
        {
          _id
        },
        {
          $set: {
            likes: newLikes
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
        likes: updatedUser.likes,
        dislikes: updatedUser.dislikes,
        factors: updatedUser.factors
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

// ===== End of Likes =====

// ===== Dislikes =====

router.post(
  "/dislikes",
  tokenAuthentication,
  cityCheck,
  cityDoubleCheckDis,
  async (req, res) => {
    const _id = req.decodedToken._id;
    const { city_id } = req.body;

    const dislikedCity = {
      _id: city_id
    };
    try {
      const user = await User.findOne({ _id });

      if (user) {
        const cities = await City.find(dislikedCity);
        const newDislike = [...user.dislikes].concat([cities[0]]);

        const updatedUser = await User.findOneAndUpdate(
          {
            _id
          },
          {
            $set: {
              dislikes: newDislike
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
          likes: updatedUser.likes,
          dislikes: updatedUser.dislikes,
          factors: updatedUser.factors
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
  }
);

router.delete("/dislikes", tokenAuthentication, async (req, res) => {
  const _id = req.decodedToken._id;
  const { city_id } = req.body;
  try {
    const user = await User.findOne({ _id });
    if (user) {
      const newDislikes = [...user.dislikes].filter(
        city => city._id != city_id
      );
      const updatedUser = await User.findOneAndUpdate(
        {
          _id
        },
        {
          $set: {
            dislikes: newDislikes
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
        likes: updatedUser.likes,
        dislikes: updatedUser.dislikes,
        factors: updatedUser.factors
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

// ===== End of dislikes =====

// ===== Factors =====

router.post(
  "/factors",
  tokenAuthentication,
  factorCheck,
  factorDoubleCheck,
  async (req, res) => {
    const _id = req.decodedToken._id;
    const { newFactor } = req.body;
    try {
      const user = await User.findOne({ _id });
      if (user) {
        const newFactors = [...user.factors].concat([newFactor]);

        const updatedUser = await User.findOneAndUpdate(
          {
            _id
          },
          {
            $set: {
              factors: newFactors
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
          likes: updatedUser.likes,
          dislikes: updatedUser.dislikes,
          factors: updatedUser.factors
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
  }
);

router.delete("/factors", tokenAuthentication, async (req, res) => {
  const _id = req.decodedToken._id;
  const { delFactor } = req.body;
  try {
    const user = await User.findOne({ _id });
    if (user) {
      const newFactors = [...user.factors].filter(
        factors => factors !== delFactor
      );
      const updatedUser = await User.findOneAndUpdate(
        {
          _id
        },
        {
          $set: {
            factors: newFactors
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
        likes: updatedUser.likes,
        dislikes: updatedUser.dislikes,
        factors: updatedUser.factors
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

router.put(
  "/factors",
  tokenAuthentication,
  factorPutCheck,
  async (req, res) => {
    const _id = req.decodedToken._id;
    const { putFactors } = req.body;
    try {
      const user = await User.findOne({ _id });

      if (user) {
        const updatedUser = await User.findOneAndUpdate(
          {
            _id
          },
          {
            $set: {
              factors: putFactors
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
          likes: updatedUser.likes,
          dislikes: updatedUser.dislikes,
          factors: updatedUser.factors
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
  }
);

// ===== End of factors =====

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

// Login Page
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // check required fields
  if (!email || !password) {
    res.status(400).json({
      message: "Please fill in all fields."
    });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      const comparePasswords = bcrypt.compareSync(password, user.password);
      if (comparePasswords) {
        const token = jwt.sign(
          {
            _id: user._id,
            name: user.name,
            email: user.email
          },
          keys.jwtAuth.secret,
          { expiresIn: "24h" }
        );
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          appleId: user.appleId,
          location: user.location,
          token,
          likes: user.likes,
          dislikes: user.dislikes,
          factors: user.factors
        });
      } else {
        res.status(500).json({
          message: "Invalid password"
        });
      }
    } else {
      res.status(400).json({
        message: "User not found."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error logging in."
    });
  }
});

//ISO login page
router.post("/signin", async (req, res) => {
  const { appleId, password } = req.body;
  // check required fields
  if (!appleId || !password) {
    res.status(400).json({
      message: "Please fill in all fields."
    });
  }
  try {
    const user = await User.findOne({ appleId });
    if (user) {
      const comparePasswords = bcrypt.compareSync(password, user.password);
      if (comparePasswords) {
        const token = jwt.sign(
          {
            _id: user._id,
            name: user.name,
            appleId: user.appleId
          },
          keys.jwtAuth.secret,
          { expiresIn: "24h" }
        );
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          appleId: user.appleId,
          location: user.location,
          token
        });
      } else {
        res.status(500).json({
          message: "Invalid password"
        });
      }
    } else {
      res.status(400).json({
        message: "User not found."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error logging in."
    });
  }
});

//Register Handle for IOS
router.post("/signup", async (req, res) => {
  // check required fields
  const { name, email, password, location, appleId } = req.body;
  if (!name || !email || !password || !location || !appleId) {
    res.status(400).json({
      message: "Please fill in all fields."
    }); // check pass length
  } else if (password.length < 6) {
    res.status(500).json({
      message: "Password must be at least 6 characters"
    });
  } else {
    try {
      const user = await User.findOne({ appleId });
      if (user) {
        res.status(500).json({
          message: "User already exists. Please login to continue"
        });
      } else {
        const hashedPassword = bcrypt.hashSync(password, 4);
        const newUser = new User({
          name,
          email,
          appleId,
          location,
          password: hashedPassword
        });
        const userSaved = await newUser.save();
        const token = jwt.sign(
          {
            _id: userSaved._id,
            name: userSaved.name,
            email: userSaved.email,
            appleId: userSaved.appleId,
            location: userSaved.location
          },
          keys.jwtAuth.secret,
          { expiresIn: "24h" }
        );
        res.status(200).json({
          _id: userSaved._id,
          name: userSaved.name,
          email: userSaved.email,
          appleId: userSaved.appleId,
          location: userSaved.location,
          token
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error registering."
      });
    }
  }
});

// Register Handle for web
router.post("/register", async (req, res) => {
  // check required fields
  const { name, email, password, location } = req.body;
  if (!name || !email || !password || !location) {
    res.status(400).json({
      message: "Please fill in all fields."
    });
    // check pass length
  } else if (password.length < 6) {
    res.status(500).json({
      message: "Password must be at least 6 characters"
    });
  } else {
    try {
      const user = await User.findOne({ email });
      if (user) {
        res.status(500).json({
          message: "User already exists. Please login to continue"
        });
      } else {
        const hashedPassword = bcrypt.hashSync(password, 4);

        const newUser = new User({
          name,
          email,
          location,
          password: hashedPassword
        });
        const userSaved = await newUser.save();

        const token = jwt.sign(
          {
            _id: userSaved._id,
            name: userSaved.name,
            email: userSaved.email,
            location: userSaved.location
          },
          keys.jwtAuth.secret,
          { expiresIn: "24h" }
        );
        res.status(200).json({
          _id: userSaved._id,
          name: userSaved.name,
          email: userSaved.email,
          location: userSaved.location,
          token,
          likes: userSaved.likes,
          dislikes: userSaved.dislikes,
          factors: userSaved.factors
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error registering."
      });
    }
  }
});

module.exports = router;
