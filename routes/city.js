const express = require("express");
const router = express.Router();
const City = require("../models/city");

router.get("/", async (req, res) => {
  const cities = await City.find();

  res.status(200).json({
    cities
  });
});

router.get("/topten-average-commute-time", async (req, res) => {
  const sortedByAverageCommuteTime_ASC = await City.find()
    .sort({
      avg_commute_time: "asc"
    })
    .limit(10);

  res.status(200).json({
    cities: sortedByAverageCommuteTime_ASC
  });
});

router.post("/", async (req, res) => {
  const { name, cost_of_living, avg_commute_time } = req.body;

  const newCity = new City({
    name,
    cost_of_living,
    avg_commute_time
  });

  const citySaved = await newCity.save();

  res.status(200).json({
    citySaved
  });
});

module.exports = router;
