const express = require("express");
const router = express.Router();
const User = require("../models/user");
const City = require("../models/city");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const axios = require("axios");

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

router.get("/all", async (req, res) => {
  try {
    const cities = await City.find({}, { name: 1, secure_url: 1 });
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
      : await City.find({
          location: {
            $near: {
              $geometry: { type: "Point", coordinates: [lng, lat] }, //yes this is right
              $maxDistance: parseInt((50000 * 10) / zoom)
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

router.post("/spec-location", tokenAuthentication, async (req, res) => {
  const _id = req.decodedToken._id;

  const user = await User.findOne({ _id });
  let disID = [];

  for (var i = 0; i < user.dislikes.length; i++) {
    disID.push(user.dislikes[i]._id);
  }

  let lat = parseFloat(req.query.lat);
  let lng = parseFloat(req.query.lng);
  let zoom = req.query.zoom ? req.query.zoom : 10;
  let limit = req.query.limit ? parseInt(req.query.limit) : 50;
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
      : await City.find({
          location: {
            $near: {
              $geometry: { type: "Point", coordinates: [lng, lat] }, //yes this is right
              $maxDistance: parseInt((50000 * 10) / zoom)
            }
          }
        }).limit(limit);

  if (disID.length != 0) {
    let filteredSearch = cities;
    var exitData = [];

    for (var i = 0; i < disID.length; i++) {
      if (i == 0) {
        exitData = cities.filter(function(city) {
          return city._id != `${disID[i]}`;
        });
      } else {
        filteredSearch = exitData;
        exitData = exitData.filter(function(city) {
          return city._id != `${disID[i]}`;
        });
      }
    }
  } else {
    exitData = cities;
  }

  let data = [];
  if (req.body && req.body.model) {
    exitData.map(c => {
      let d = {};
      Object.keys(req.body.model).map(k => (d[k] = c[k]));
      data.push(d);
    });
  } else data = exitData;
  if (!data || data.length < 1) {
    if (disID.length < 0) {
      res.status(200).json({
        founded: false,
        message: "There are no cities in this area"
      });
    } else {
      res.status(200).json({
        founded: false,
        message: "No results after filering"
      });
    }
  } else {
    res.status(200).json({
      founded: true,
      results: [
        { wasFiltered: cities.length - exitData.length },
        { beforeFilter: cities.length },
        { afterFilter: exitData.length }
      ],
      data
    });
  }
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

router.post("/spec-search", tokenAuthentication, async (req, res) => {
  const _id = req.decodedToken._id;
  const limit = req.query.limit ? parseInt(req.query.limit) : 50;
  const { searchTerm } = req.body;

  try {
    const user = await User.findOne({ _id });
    let disID = [];

    for (var i = 0; i < user.dislikes.length; i++) {
      disID.push(user.dislikes[i]._id);
    }

    const searchResults = await City.find({
      $text: { $search: `\"${searchTerm}\"` }
    }).limit(limit);

    if (disID.length != 0) {
      let filteredSearch = searchResults;
      var exitData = [];

      for (var i = 0; i < disID.length; i++) {
        if (i == 0) {
          exitData = searchResults.filter(function(city) {
            return city._id != `${disID[i]}`;
          });
        } else {
          filteredSearch = exitData;
          exitData = exitData.filter(function(city) {
            return city._id != `${disID[i]}`;
          });
        }
      }
    } else {
      exitData = searchResults;
    }

    if (exitData.length) {
      res.status(200).json({
        founded: true,
        results: [
          { wasFiltered: searchResults.length - exitData.length },
          { beforeFilter: searchResults.length },
          { afterFilter: exitData.length }
        ],
        cities: exitData
      });
    } else if (!searchResults.length) {
      res.status(404).json({
        founded: false,
        message: "Could not find any cities with that name."
      });
    } else {
      res.status(200).json({
        founded: false,
        message: "Results was filtered and empty or no results."
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

router.post("/ds",async (req, res) => {
  const input = req.body;
  let limit = req.query.limit ? parseInt(req.query.limit) : 20;
  

  // fetching data from DS API
  async function getUser(inputData) {
    try {
      const response = await axios.post(
        "https://best-places-api.herokuapp.com/api",
        inputData
      );
      return response.data;
    } catch (error) {}
  }

  const resultPoint = await getUser(input);

  // If user
  //

  const result = resultPoint.slice(0, limit);

  try {
    if (result) {
      res.status(200).json({
        result
      });
    } else {
      res.status(400).json({
        message:
          "The browser (or proxy) sent a request that this server could not understand."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error with fetching data from DS server"
    });
  }
});

router.post("/visual", async (req, res) => {
  const input = req.body;

  async function getVisualization(inputData) {
    try {
      const response = await axios({
        method: "post",
        url: "https://best-places-api.herokuapp.com/visual",
        data: inputData,
        responseType: "arraybuffer"
      });

      return response.data;
    } catch (error) {}
  }

  const result = await getVisualization(input);

  try {
    if (result) {
      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": result.length
      });
      res.end(result, "binary");
    } else {
      res.status(400).json({
        message:
          "The browser (or proxy) sent a request that this server could not understand."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error with fetching data from DS server"
    });
  }
});

router.post("/spec-ds", tokenAuthentication, async (req, res) => {
  const input = req.body;
  const _id = req.decodedToken._id;
  let limit = req.query.limit ? parseInt(req.query.limit) : 20;

  // fetching data from DS API
  async function getUser(inputData) {
    try {
      const response = await axios.post(
        "https://best-places-api.herokuapp.com/api",
        inputData
      );
      return response.data;
    } catch (error) {}
  }

  const resultPoint = await getUser(input);

  // const result = resultPoint.slice(0, limit)

  try {
    const user = await User.findOne({ _id });
    let disID = [];

    for (var i = 0; i < user.dislikes.length; i++) {
      disID.push(user.dislikes[i]._id);
    }

    if (disID.length != 0) {
      let filteredSearch = resultPoint;
      var exitData = [];

      for (var i = 0; i < disID.length; i++) {
        if (i == 0) {
          exitData = resultPoint.filter(function(city) {
            return city._id != `${disID[i]}`;
          });
        } else {
          filteredSearch = exitData;
          exitData = exitData.filter(function(city) {
            return city._id != `${disID[i]}`;
          });
        }
      }
    } else {
      exitData = resultPoint;
    }

    const final = exitData.slice(0, limit);

    if (final) {
      res.status(200).json({
        founded: true,
        results: [
          { wasFiltered: resultPoint.length - exitData.length },
          { beforeFilter: resultPoint.length },
          { afterFilter: exitData.length }
        ],
        final
      });
    } else {
      res.status(400).json({
        founded: false,
        message:
          "The browser (or proxy) sent a request that this server could not understand."
      });
    }
  } catch (error) {
    res.status(500).json({
      founded: false,
      message: "Error with fetching data from DS server"
    });
  }
});

router.get("/jobs", async (req, res) => {
  const input = req.query; 
   // check required field
  if(!Object.keys(input).length){
    res.status(400).json({
      message: "Please pass at least one req params l=location, q=quries(Eg: Software), country=country"
    });
  }
   // fetching data from other API
  async function getJobs(params) {
    try {
      const response = await axios.get(
        `https://indreed.herokuapp.com/api/jobs`, {
          params
        }
      );
      return response.data;
    } catch (error) {}
  }
  const result = await getJobs(input);

  try {
    if (result) {
      res.status(200).json({
        result
      });
    } else {
      res.status(400).json({
        message:
          "The browser (or proxy) sent a request that this server could not understand."
      });
    }
  } catch (error) {
    res.status(500).json({

      message: "Error with fetching data from API"
    });
  }
});

module.exports = router;
