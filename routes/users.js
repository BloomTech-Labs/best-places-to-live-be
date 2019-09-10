const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const tokenSecret = process.env.TokenSecret ? process.env.TokenSecret : 'privatekey:T5c!G56vff==rRm"C2q@P]3p#WMrXdKXB_S:BN.4chW,)5)x1RQ';

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
        if(req.headers && req.headers['user-type'] && req.headers['user-type'] === "ios") 
      {
        jwt.sign({user}, tokenSecret, { expiresIn: '24h' },(err, token) => {
          if(err) { console.log(err) }   
          res.status(200).json({
            token
          });
        });
      } else res.status(200).json({ user });
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

// Register Handle
router.post("/register", async (req, res) => {
  const { name, email, password, password2 } = req.body;
  // check required fields
  if (!name || !email || !password || !password2) {
    res.status(400).json({
      message: "Please fill in all fields."
    });
  }

  // check passwords match
  if (password !== password2) {
    res.status(400).json({
      message: "Passwords do not match."
    });
  }

  // check pass length
  if (password.length < 6) {
    res.status(500).json({
      message: "Password must be at least 6 characters"
    });
  }

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
        password: hashedPassword
      });
      
      const userSaved = await newUser.save();
      if(req.headers && req.headers['user-type'] && req.headers['user-type'] === "ios") 
      {
        jwt.sign({ userSaved }, tokenSecret, { expiresIn: '24h' },(err, token) => {
          if(err) { console.log(err) }   
          res.status(200).json({
            token
          });
        });
      } else res.status(200).json({ userSaved });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error registering."
    });
  }
});

module.exports = router;
