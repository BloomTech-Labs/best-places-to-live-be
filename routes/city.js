const express = require("express");
const router = express.Router();
const City = require("../models/city");

router.get("/all", async (req, res) => {
  try {
    const cities = await City.find({}, { name: 1 });
    res.status(200).json({
      cities
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving cities from database."
    });
  }
});

router.post("/location", async (req, res) => {
  let lat = parseFloat(req.query.lat);
  let lng = parseFloat(req.query.lng);
  let zoom = req.query.zoom ? req.query.zoom : 10;
  let limit = req.query.limit ? parseInt(req.query.limit) : 50;
  console.log("Info for city loc", req.query.rand === "1", zoom, limit);
  if (!lat || !lng)
    return res.status(400).json({ message: "Please Enter an area to search" });
  const cities =
    req.query.rand === "1" || zoom < 7
      ? await City.aggregate([
          {
            $geoNear: {
              near: { type: "Point", coordinates: [lng, lat] },
              spherical: true,
              distanceField: "calcDistance"
            }
          },
          { $sample: { size: limit } }
        ]).limit(limit)
      : City.find({
        location: {
          $geoWithin: {
            $centerSphere: [[lng, lat], parseInt((50000 * 10) / zoom) ]//yes this is right
          }
        }
      }).limit(limit);
  let data = [];
  if (req.body && req.body.model) {
    cities.map(c => {
      let d = {};
      Object.keys(req.body.model).map(k => (d[k] = c[k]));
      data.push(d);
    });
  } else data = cities;
  if (!data || data.length < 1)
    return res
      .status(200)
      .json({ message: "There are no cities in this area" });
  res.status(200).json({
    data
  });
});

router.post("/", async (req, res) => {
  try {
    let list = req.body.ids;
    if (!list || list.length < 1)
      return res.status(403).json({ message: "Please enter a list of ids" });
    let filter = { _id: list };
    if (list[0] === "all") filter = {};
    const cities = await City.find(filter);
    let data = [];
    if (req.body && req.body.model) {
      cities.map(c => {
        let d = {};
        Object.keys(req.body.model).map(k => (d[k] = c[k]));
        data.push(d);
      });
    } else data = cities;
    res.status(200).json({
      data
    });
  } catch (error) {
    res.status(500).json({
      message: "Could Not find this data in the data base"
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    //throw "error";
    if (
      req.body &&
      req.body.password ===
        "q6zj5QrHdJabSRDkygbVfyagca5JhQnGuvKXTnzcAVWaR3sJGCrXZgfDh5dLB3RfNK4mnmSrmvTn4c86ZwRWT4uFbmFsjhqMLX2VTTBLCrHq5R6MKSRBbdAnb94WeAaS"
    ) {
      await City.remove();
      res.status(200).json({
        message: "hello"
      });
    } else throw "You SHALL NOT PASS";
  } catch (error) {
    res.status(200).json({
      message: "good bye"
    });
  }
});

router.post("/top", async function(req, res) {
  try {
    let q = req.query.q ? req.query.q : null;
    let filter = req.query.filter ? req.query.filter : "score_total";
    let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
    let order =
      (req.query.order && req.query.order.toLowerCase() === "asc") ||
      req.query.order === "1"
        ? 1
        : -1;

    filter = filter.split("%26").join("&");

    //search the db and only get the data that matches q
    let qsort = {};
    qsort[filter] = order;
    let query = q ? { $text: { $search: `\"${q}\"` } } : {};
    const cities = await City.find(query)
      .sort({
        ...qsort,
        name: 1
      })
      .limit(limit);

    //check for model
    let data = [];
    if (req.body && req.body.model) {
      cities.map(c => {
        let d = {};
        Object.keys(req.body.model).map(k => (d[k] = c[k]));
        data.push(d);
      });
    } else data = cities;

    res.status(200).json({
      cities: data
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not retrieve top 10 cities"
    });
  }
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

router.post("/search", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 50;
  const { searchTerm } = req.body;
  console.log({ searchTerm } )

  try {
    const searchResults = await City.find({
      $text: { $search: `\"${searchTerm}\"` }
    }).limit(limit);

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
