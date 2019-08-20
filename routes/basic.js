const express = require("express");
const router = express.Router();
const { Basic } = require("../models/");

router.get("/", (req, res) => {
  res.json("welcome to our backend api");
});

router.get("/all", (req, res) => {
  const result = Basic.find().sort("name");
  res.json(result);
});

module.exports = router;
