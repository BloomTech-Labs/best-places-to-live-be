const express = require("express");
const router = express.Router();
const City = require("../models/city");

router.get("/", async (req, res) => {
  const cities = await City.find();

  res.status(200).json({
    cities,
  });
});

router.post("/", async (req, res) => {
  const {name, cost_of_living, avg_commute_time} = req.body;

  const newCity = new City({
    name,
    cost_of_living,
    avg_commute_time,
  });

  const citySaved = await newCity.save();

  res.status(200).json({
    citySaved,
  });
});

module.exports = router;
