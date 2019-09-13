const express = require("express");
const router = express.Router();
const City = require("../models/city");

router.get("/", async (req, res) => {
  const cities = await City.find();

  res.status(200).json({
    cities
  });
});

router.delete("/", async (req, res) => 
{
  try{
    //throw "error";
    if (req.body && req.body.password === "q6zj5QrHdJabSRDkygbVfyagca5JhQnGuvKXTnzcAVWaR3sJGCrXZgfDh5dLB3RfNK4mnmSrmvTn4c86ZwRWT4uFbmFsjhqMLX2VTTBLCrHq5R6MKSRBbdAnb94WeAaS")
    {
      await City.remove();
      res.status(200).json({
        
          message: "hello"
        });
    }else throw "You SHALL NOT PASS"
  }catch {  
    res.status(200).json({
      message: "good bye"
    }
    );}
});

router.get("/topten-score_total", async (req, res) => {
  try {
    const sortedByAverageCommuteTime_ASC = await City.find()
      .sort({
        score_total: -1
      })
      .limit(10);

    res.status(200).json({
      cities: sortedByAverageCommuteTime_ASC
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not retrieve top 10 cities of average commute time."
    });
  }
});

router.get("/topten-average-commute-time", async (req, res) => {
  try {
    const sortedByAverageCommuteTime_ASC = await City.find()
      .sort({
        avg_commute_time: "asc"
      })
      .limit(10);

    res.status(200).json({
      cities: sortedByAverageCommuteTime_ASC
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not retrieve top 10 cities of average commute time."
    });
  }
});
router.get("/topten-cost-of-living", async (req, res) => {
  try {
    const sortedByCostOfLiving_DESC = await City.find()
      .sort({
        cost_of_living: -1
      })
      .limit(10);

    res.status(200).json({
      cities: sortedByCostOfLiving_DESC
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not retrieve top 10 cities of cost of living."
    });
  }
});

router.post("/search", async (req, res) => {
  const { searchTerm } = req.body;

  try {
    const searchResults = await City.find({
      $text: { $search: `\"${searchTerm}\"` }
    });

    if (searchResults.length) {
      res.status(200).json({
        cities: searchResults
      });
    } else {
      res.status(404).json({
        message: "Could not find any cities with that name."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error searching cities in our database."
    });
  }
});

router.post("/", async (req, res) => {
  const { name, cost_of_living, avg_commute_time } = req.body;

  const newCity = new City({
    name,
    cost_of_living,
    avg_commute_time
  });

  try {
    const citySaved = await newCity.save();

    res.status(200).json({
      citySaved
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving new city in database."
    });
  }
});

module.exports = router;
