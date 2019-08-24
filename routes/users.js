const express = require('express');
const router = express.Router();

// Login Page
router.get('/login', (req, res) => {
  res.json('Login');
});

// Register Page
router.get('/register', (req, res) => {
  res.json('Register');
});

module.exports = router;
